// The Daily Woo — app logic.
// Everything is deterministic: same person + same day = same memo, on any device.

const STORE_KEY = "dailywoo.profile";
const FEEDBACK_KEY = "dailywoo.feedback";

// ---------- tiny deterministic toolkit ----------

function hashStr(s) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h >>> 0;
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function dateKey(d) {
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

function dayIndex(d) {
  // Local-noon day counter so DST never skips or doubles a day.
  return Math.floor(new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12).getTime() / 86400000);
}

// Rotation pick: cycles the whole list before repeating, offset per person per list.
function rotateIdx(list, listName, profile, today) {
  const offset = hashStr(profile.name + "|" + profile.birthday + "|" + listName) % list.length;
  return (dayIndex(today) + offset) % list.length;
}

function rotate(list, listName, profile, today) {
  return list[rotateIdx(list, listName, profile, today)];
}

// ---------- astro math ----------
// Real formulas, entertainment-grade tolerances. Sources: Meeus-style low-precision series.

const DEG = Math.PI / 180;
const SIGN_ORDER = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];

function norm360(x) { return ((x % 360) + 360) % 360; }

function signAtLongitude(lon) {
  return WOO.signs.find(s => s.name === SIGN_ORDER[Math.floor(norm360(lon) / 30)]);
}

function parseBirthday(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m, d };
}

function sunSign(iso) {
  const { m, d } = parseBirthday(iso);
  const md = m * 100 + d;
  // Latest sign whose start (as mmdd) is on/before the date; before Jan 20 wraps to Capricorn.
  let best = null;
  for (const s of WOO.signs) {
    const smd = s.start[0] * 100 + s.start[1];
    if (smd <= md && (best === null || smd > best.start[0] * 100 + best.start[1])) best = s;
  }
  return best || WOO.signs.find(s => s.name === "Capricorn");
}

// What time was it in UTC when the wall clock at `tz` read this local moment?
function tzOffsetMs(utcMs, tz) {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
  });
  const p = {};
  for (const part of dtf.formatToParts(new Date(utcMs))) p[part.type] = part.value;
  const asUTC = Date.UTC(+p.year, p.month - 1, +p.day, p.hour === "24" ? 0 : +p.hour, +p.minute, +p.second);
  return asUTC - utcMs;
}

function birthUTC(profile) {
  const { y, m, d } = parseBirthday(profile.birthday);
  const [hh, mm] = (profile.birthTime || "12:00").split(":").map(Number);
  const wall = Date.UTC(y, m - 1, d, hh, mm);
  const tz = profile.birthPlace && profile.birthPlace.tz;
  if (!tz) return wall;
  let utc = wall - tzOffsetMs(wall, tz);
  utc = wall - tzOffsetMs(utc, tz);
  return utc;
}

// Lunar ecliptic longitude with the main periodic terms (~1° accuracy — plenty for sign-level).
function moonLongitude(utcMs) {
  const d = (utcMs - Date.UTC(2000, 0, 1, 12)) / 86400000;
  const Lp = 218.316 + 13.176396 * d;   // mean longitude
  const Mp = 134.963 + 13.064993 * d;   // moon mean anomaly
  const M = 357.529 + 0.98560028 * d;   // sun mean anomaly
  const D = 297.850 + 12.190749 * d;    // mean elongation
  return norm360(
    Lp
    + 6.289 * Math.sin(Mp * DEG)
    + 1.274 * Math.sin((2 * D - Mp) * DEG)
    + 0.658 * Math.sin(2 * D * DEG)
    - 0.186 * Math.sin(M * DEG)
    - 0.059 * Math.sin((2 * Mp - 2 * D) * DEG)
    - 0.057 * Math.sin((Mp - 2 * D + M) * DEG)
  );
}

function moonSignAtBirth(profile) {
  return signAtLongitude(moonLongitude(birthUTC(profile)));
}

// True ascendant from birth moment + coordinates.
function ascendantLongitude(utcMs, lat, lon) {
  const jd = utcMs / 86400000 + 2440587.5;
  const T = (jd - 2451545.0) / 36525;
  const gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T;
  const ramc = norm360(gmst + lon) * DEG; // east longitude positive
  const eps = (23.4392911 - 0.0130042 * T) * DEG;
  const asc = Math.atan2(Math.cos(ramc), -(Math.sin(ramc) * Math.cos(eps) + Math.tan(lat * DEG) * Math.sin(eps)));
  return norm360(asc / DEG);
}

function risingSign(profile) {
  if (!profile.birthTime) return null;
  const place = profile.birthPlace;
  if (place && place.lat != null && place.tz) {
    return { sign: signAtLongitude(ascendantLongitude(birthUTC(profile), place.lat, place.lon)), approx: false };
  }
  // Folk fallback when no birthplace: sun sign at sunrise, +1 sign per 2 hours.
  const sun = sunSign(profile.birthday);
  const [hh] = profile.birthTime.split(":").map(Number);
  const offset = Math.floor(((hh - 6 + 24) % 24) / 2);
  const idx = (SIGN_ORDER.indexOf(sun.name) + offset) % 12;
  return { sign: WOO.signs.find(s => s.name === SIGN_ORDER[idx]), approx: true };
}

const SYNODIC = 29.53058867;

function moonPhase(d) {
  const epoch = Date.UTC(2000, 0, 6, 18, 14); // known new moon
  const age = (((d.getTime() - epoch) / 86400000) % SYNODIC + SYNODIC) % SYNODIC;
  const idx = Math.round(age / SYNODIC * 8) % 8;
  return { name: WOO.moonPhases[idx], idx, age };
}

function luckyNumber(profile, today) {
  let total = 0;
  for (const ch of (profile.name + dateKey(today)).toLowerCase()) {
    if (ch >= "a" && ch <= "z") total += ch.charCodeAt(0) - 96;
    if (ch >= "0" && ch <= "9") total += Number(ch);
  }
  while (total > 9) total = String(total).split("").reduce((a, c) => a + Number(c), 0);
  return total === 0 ? 7 : total;
}

// ---------- geocoding (one call at save time; result stored on-device) ----------

async function geocode(placeText) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 7000);
  try {
    const url = "https://geocoding-api.open-meteo.com/v1/search?count=1&language=en&format=json&name=" + encodeURIComponent(placeText);
    const res = await fetch(url, { signal: ctl.signal });
    const data = await res.json();
    const hit = data.results && data.results[0];
    if (!hit) return { name: placeText };
    const label = [hit.name, hit.admin1, hit.country_code].filter(Boolean).join(", ");
    return { name: label, lat: hit.latitude, lon: hit.longitude, tz: hit.timezone };
  } catch {
    return { name: placeText };
  } finally {
    clearTimeout(timer);
  }
}

// ---------- the daily memo ----------

function fill(template, ctx) {
  return template.replace(/\{(\w+)\}/g, (_, k) => ctx[k] ?? "");
}

function buildMemo(profile, today) {
  const sign = sunSign(profile.birthday);
  const rand = mulberry32(hashStr(dateKey(today) + "|" + profile.name + "|" + profile.birthday));
  const trait = sign.traits[Math.floor(rand() * sign.traits.length)];
  const color = rotate(WOO.colors, "colors", profile, today);
  const ctx = { name: profile.name.split(" ")[0], sign: sign.name, trait, color: color.name.toLowerCase() };

  const read = [
    fill(rotate(WOO.openers, "openers", profile, today), ctx),
    fill(rotate(WOO.cores, "cores", profile, today), ctx),
    fill(rotate(WOO.closers, "closers", profile, today), ctx)
  ].join(" ");

  let chartNote = null;
  if (profile.birthTime) {
    const moon = moonSignAtBirth(profile);
    const rising = risingSign(profile);
    chartNote = "Chart notes: " + WOO.risingFlavor[rising.sign.name] + ", and " + WOO.moonFlavor[moon.name] + ".";
  }

  const tarotIdx = rotateIdx(WOO.tarot, "tarot", profile, today);
  const card = WOO.tarot[tarotIdx];
  const reversed = rand() < 0.3;
  const phase = moonPhase(today);
  const moonLine = rotate(WOO.moonLines[phase.name], "moon-" + phase.name, profile, today);

  return {
    sign, color, phase, moonLine, chartNote, read,
    lucky: luckyNumber(profile, today),
    tarotIdx, tarotReversed: reversed,
    tarot: { name: card.name + (reversed ? " (reversed)" : ""), text: reversed ? card.rev : card.up },
    fashion: fill(rotate(WOO.fashion, "fashion", profile, today), ctx),
    gratitude: rotate(WOO.gratitude, "gratitude", profile, today)
  };
}

// ---------- profile & feedback storage ----------

function loadProfile() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)); } catch { return null; }
}

function saveProfile(p) {
  localStorage.setItem(STORE_KEY, JSON.stringify(p));
}

function loadFeedback() {
  try { return JSON.parse(localStorage.getItem(FEEDBACK_KEY)) || []; } catch { return []; }
}

function saveVote(vote) {
  const { memo } = window._memo;
  const log = loadFeedback().filter(e => e.date !== dateKey(new Date()));
  log.push({
    date: dateKey(new Date()),
    vote,
    sign: memo.sign.name,
    tarot: memo.tarot.name,
    read: memo.read.slice(0, 90)
  });
  localStorage.setItem(FEEDBACK_KEY, JSON.stringify(log));
}

function todaysVote() {
  const entry = loadFeedback().find(e => e.date === dateKey(new Date()));
  return entry ? entry.vote : null;
}

// ---------- rendering ----------

const $ = (sel) => document.querySelector(sel);

function greeting(d) {
  const h = d.getHours();
  return h < 12 ? "Morning" : h < 17 ? "Afternoon" : "Evening";
}

function seasonLine(today, userSign) {
  const seasonSign = sunSign(dateKey(today));
  return seasonSign.name + " season · " + userSign.vibe;
}

function renderFeedbackButtons() {
  const vote = todaysVote();
  $("#fb-up").classList.toggle("voted", vote === "up");
  $("#fb-down").classList.toggle("voted", vote === "down");
  $("#fb-thanks").hidden = !vote;
}

function renderToday() {
  const profile = loadProfile();
  const today = new Date();
  const memo = buildMemo(profile, today);
  const dateLabel = today.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });

  $("#hdr-date").textContent = dateLabel;
  $("#hdr-moon").textContent = "☾ " + memo.phase.name;
  $("#hdr-greeting").textContent = greeting(today) + ", " + profile.name.split(" ")[0];
  $("#hdr-sub").textContent = seasonLine(today, memo.sign);

  $("#read-text").textContent = memo.read;
  $("#chart-note").textContent = memo.chartNote || "";
  $("#chart-note").hidden = !memo.chartNote;

  $("#vibe-text").textContent = memo.moonLine;
  $("#lucky-num").textContent = memo.lucky;
  $("#color-dot").style.background = memo.color.hex;
  $("#color-name").textContent = memo.color.name;

  $("#tarot-name").textContent = "Tarot pull · " + memo.tarot.name;
  $("#tarot-text").textContent = memo.tarot.text;
  $("#tarot-art").innerHTML = tarotArt(memo.tarotIdx);
  $("#tarot-art").classList.toggle("reversed", memo.tarotReversed);

  $("#fashion-text").textContent = memo.fashion;
  $("#gratitude-text").textContent = memo.gratitude;

  window._memo = { memo, dateLabel, profile };
  renderFeedbackButtons();
}

function renderYou() {
  const profile = loadProfile();
  const sun = sunSign(profile.birthday);
  let badges = `<span class="badge">${sun.glyph} ${sun.name} sun</span>`;
  if (profile.birthTime) {
    const moon = moonSignAtBirth(profile);
    const rising = risingSign(profile);
    badges += `<span class="badge">${moon.glyph} ${moon.name} moon</span>`;
    badges += `<span class="badge">${rising.sign.glyph} ${rising.sign.name} rising${rising.approx ? " ~" : ""}</span>`;
  }
  $("#you-badges").innerHTML = badges;
  $("#you-place-hint").textContent = profile.birthPlace
    ? (profile.birthPlace.lat != null ? "Charted: " + profile.birthPlace.name : "Couldn't chart \"" + profile.birthPlace.name + "\" — rising stays approximate (~)")
    : (profile.birthTime ? "Add a birth place to sharpen your rising sign" : "");
  $("#you-name").value = profile.name;
  $("#you-birthday").value = profile.birthday;
  $("#you-time").value = profile.birthTime || "";
  $("#you-place").value = profile.birthPlace ? profile.birthPlace.name : "";

  const log = loadFeedback();
  const ups = log.filter(e => e.vote === "up").length;
  $("#fb-stats").textContent = log.length
    ? log.length + " day" + (log.length === 1 ? "" : "s") + " rated · " + ups + " up · " + (log.length - ups) + " down"
    : "No ratings yet — the thumbs live at the bottom of Today.";
  $("#fb-export").hidden = log.length === 0;
}

function show(screen) {
  for (const id of ["onboarding", "today", "you"]) $("#" + id).hidden = id !== screen;
  for (const btn of document.querySelectorAll(".nav-btn")) {
    btn.classList.toggle("active", btn.dataset.screen === screen);
  }
  $("#nav").hidden = screen === "onboarding";
  if (screen === "today") renderToday();
  if (screen === "you") renderYou();
}

// ---------- share & export ----------

async function shareText(text, copiedMsg) {
  if (navigator.share) {
    try { await navigator.share({ title: "The Daily Woo", text }); return; } catch { /* user cancelled */ }
  } else {
    try { await navigator.clipboard.writeText(text); toast(copiedMsg); }
    catch { toast("Couldn't copy on this browser"); }
  }
}

function shareMemo() {
  const { memo, dateLabel } = window._memo;
  return shareText([
    "The Daily Woo ✨ " + dateLabel,
    "",
    memo.read,
    "",
    memo.tarot.name + ": " + memo.tarot.text,
    "Lucky number " + memo.lucky + " · Power color: " + memo.color.name,
    "Fashion boost: " + memo.fashion,
    "Gratitude: " + memo.gratitude
  ].join("\n"), "Copied — paste it in the group chat");
}

function exportFeedback() {
  const log = loadFeedback();
  const lines = log.map(e => e.date + " " + (e.vote === "up" ? "👍" : "👎") + " [" + e.tarot + "] " + e.read + "…");
  return shareText("The Daily Woo — feedback log\n" + lines.join("\n"), "Log copied — send it to Mary");
}

let toastTimer;
function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("on"), 2600);
}

// ---------- wiring ----------

async function readForm(prefix) {
  const name = $("#" + prefix + "-name").value.trim();
  const birthday = $("#" + prefix + "-birthday").value;
  const birthTime = $("#" + prefix + "-time").value || null;
  const placeText = $("#" + prefix + "-place").value.trim();
  if (!name || !birthday) { toast("Name and birthday, please — the stars need coordinates"); return null; }

  let birthPlace = null;
  if (placeText) {
    const prev = loadProfile() && loadProfile().birthPlace;
    if (prev && prev.name.toLowerCase() === placeText.toLowerCase()) {
      birthPlace = prev; // unchanged — keep coordinates, skip the network
    } else {
      toast("Consulting the atlas…");
      birthPlace = await geocode(placeText);
      if (birthPlace.lat == null) toast("Couldn't find that city — rising sign stays approximate");
    }
  }
  return { name, birthday, birthTime, birthPlace };
}

document.addEventListener("DOMContentLoaded", () => {
  $("#ob-go").addEventListener("click", async () => {
    const p = await readForm("ob");
    if (!p) return;
    saveProfile(p);
    show("today");
  });

  $("#you-save").addEventListener("click", async () => {
    const p = await readForm("you");
    if (!p) return;
    saveProfile(p);
    toast("Saved — the cosmos has been notified");
    renderYou();
  });

  $("#fb-up").addEventListener("click", () => { saveVote("up"); renderFeedbackButtons(); toast("Noted — more of this energy coming up"); });
  $("#fb-down").addEventListener("click", () => { saveVote("down"); renderFeedbackButtons(); toast("Noted — the stars will workshop it"); });
  $("#fb-export").addEventListener("click", exportFeedback);

  for (const btn of document.querySelectorAll(".nav-btn")) {
    btn.addEventListener("click", () => {
      if (btn.dataset.screen === "share") { shareMemo(); return; }
      show(btn.dataset.screen);
    });
  }

  show(loadProfile() ? "today" : "onboarding");
});

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js"));
}
