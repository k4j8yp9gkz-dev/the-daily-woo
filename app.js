// The Daily Woo — app logic.
// Everything is deterministic: same person + same day = same memo, on any device.

const STORE_KEY = "dailywoo.profile";

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
  // People type "Halifax, Nova Scotia, Canada" — the API wants just the city,
  // so search on the first part and use the rest to pick among matches.
  const parts = placeText.split(",").map(s => s.trim()).filter(Boolean);
  const hint = parts.slice(1).join(" ").toLowerCase();
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 7000);
  try {
    const url = "https://geocoding-api.open-meteo.com/v1/search?count=5&language=en&format=json&name=" + encodeURIComponent(parts[0] || placeText);
    const res = await fetch(url, { signal: ctl.signal });
    const data = await res.json();
    const results = data.results || [];
    let hit = results[0];
    if (hint) {
      const better = results.find(r => {
        const meta = [r.admin1, r.admin2, r.country, r.country_code].filter(Boolean).join(" ").toLowerCase();
        return hint.split(/\s+/).every(w => meta.includes(w));
      });
      if (better) hit = better;
    }
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

function pickMeal(profile, today) {
  const diet = profile.diet || "omni";
  const pool = WOO.meals.filter(m => m.diets.includes(diet));
  const element = WOO.elementOf[sunSign(profile.birthday).name];
  return {
    intro: rotate(WOO.elementIntros[element], "mealintro", profile, today),
    meal: rotate(pool, "meals-" + diet, profile, today)
  };
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
    kitchen: pickMeal(profile, today),
    gratitude: rotate(WOO.gratitude, "gratitude", profile, today)
  };
}

// ---------- profile storage ----------

function loadProfile() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)); } catch { return null; }
}

function saveProfile(p) {
  localStorage.setItem(STORE_KEY, JSON.stringify(p));
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

let dayOffset = 0; // 0 = today, 1 = peeking at tomorrow

function viewDate() {
  const n = new Date();
  return new Date(n.getFullYear(), n.getMonth(), n.getDate() + dayOffset, n.getHours(), n.getMinutes());
}

function renderToday() {
  const profile = loadProfile();
  const today = viewDate();
  const memo = buildMemo(profile, today);
  const dateLabel = today.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });

  $("#hdr-date").textContent = dateLabel;
  $("#hdr-moon").textContent = "☾ " + memo.phase.name;
  $("#hdr-greeting").textContent = (dayOffset === 1 ? "Tomorrow" : greeting(today)) + ", " + profile.name.split(" ")[0];
  $("#hdr-sub").textContent = dayOffset === 1
    ? "A sneak preview — subject to cosmic revision"
    : seasonLine(today, memo.sign);
  $("#peek-btn").textContent = dayOffset === 1 ? "☀ Back to today" : "☾ Peek at tomorrow";

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
  $("#meal-intro").textContent = memo.kitchen.intro;
  $("#meal-name").textContent = memo.kitchen.meal.name;
  $("#meal-line").textContent = memo.kitchen.meal.line;
  $("#gratitude-text").textContent = memo.gratitude;

  window._memo = { memo, dateLabel, profile };
}

function renderYou() {
  const profile = loadProfile();
  const sun = sunSign(profile.birthday);
  const TEASERS = {
    sun: "The engine — what actually drives you",
    moon: "Your inner operating system",
    rising: "The entrance you make"
  };
  const tile = (placement, sign, approx) =>
    `<button class="tile" data-placement="${placement}" data-sign="${sign.name}"${approx ? ' data-approx="1"' : ""}>
      <span class="tile-glyph">${sign.glyph}</span>
      <span class="tile-body">
        <span class="tile-title">${sign.name} ${placement}${approx ? " ~" : ""}</span>
        <span class="tile-sub">${TEASERS[placement]}${approx ? " · tap for the fine print" : " · tap to read yours"}</span>
      </span>
      <span class="tile-chev">›</span>
    </button>`;
  let tiles = tile("sun", sun);
  if (profile.birthTime) {
    const moon = moonSignAtBirth(profile);
    const rising = risingSign(profile);
    tiles += tile("moon", moon) + tile("rising", rising.sign, rising.approx);
  } else {
    tiles += `<div class="tile tile-locked">
      <span class="tile-glyph">☾</span>
      <span class="tile-body">
        <span class="tile-title">Moon &amp; rising</span>
        <span class="tile-sub">Add your birth time below to unlock these</span>
      </span>
      <span class="tile-chev">🔒</span>
    </div>`;
  }
  $("#you-badges").innerHTML = tiles;
  for (const pill of document.querySelectorAll("#you-diet .diet-pill")) {
    pill.classList.toggle("selected", pill.dataset.diet === (profile.diet || "omni"));
  }
  $("#you-place-hint").textContent = profile.birthPlace
    ? (profile.birthPlace.lat != null ? "Charted: " + profile.birthPlace.name : "Couldn't chart \"" + profile.birthPlace.name + "\" — rising stays approximate (~)")
    : (profile.birthTime ? "Add a birth place to sharpen your rising sign" : "");
  $("#you-name").value = profile.name;
  $("#you-birthday").value = profile.birthday;
  $("#you-time").value = profile.birthTime || "";
  $("#you-place").value = profile.birthPlace ? profile.birthPlace.name : "";
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

// ---------- overlays (placement sheet + tarot zoom) ----------

function openOverlay(which) {
  $("#overlay").hidden = false;
  $("#sheet").hidden = which !== "sheet";
  $("#zoom").hidden = which !== "zoom";
  document.body.style.overflow = "hidden";
}

function closeOverlay() {
  $("#overlay").hidden = true;
  document.body.style.overflow = "";
}

function openPlacement(placement, signName, approx) {
  const sign = WOO.signs.find(s => s.name === signName);
  $("#sheet-title").textContent = sign.glyph + " " + signName + " " + placement;
  $("#sheet-intro").textContent = WOO.placements[placement].intro;
  $("#sheet-text").textContent = WOO.placements[placement][signName];
  $("#sheet-note").textContent = approx
    ? "This one's approximate — it's based on your birth time alone. Add a birth city and the math gets serious."
    : "";
  $("#sheet-note").hidden = !approx;
  openOverlay("sheet");
}

function openTarotZoom() {
  const { memo } = window._memo;
  $("#zoom-card").innerHTML = tarotArt(memo.tarotIdx);
  $("#zoom-card").classList.toggle("reversed", memo.tarotReversed);
  $("#zoom-caption").textContent = memo.tarot.name;
  openOverlay("zoom");
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
    "On the menu: " + memo.kitchen.meal.name,
    "Gratitude: " + memo.gratitude
  ].join("\n"), "Copied — paste it in the group chat");
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
  const dietPill = document.querySelector("#" + prefix + "-diet .diet-pill.selected");
  const diet = dietPill ? dietPill.dataset.diet : (loadProfile() && loadProfile().diet) || "omni";
  if (!name || !birthday) { toast("Name and birthday, please — the stars need coordinates"); return null; }

  let birthPlace = null;
  if (placeText) {
    const prev = loadProfile() && loadProfile().birthPlace;
    if (prev && prev.lat != null && prev.name.toLowerCase() === placeText.toLowerCase()) {
      birthPlace = prev; // unchanged and already charted — skip the network
    } else {
      toast("Consulting the atlas…");
      birthPlace = await geocode(placeText);
      if (birthPlace.lat == null) toast("Couldn't find that city — rising sign stays approximate");
    }
  }
  return { name, birthday, birthTime, birthPlace, diet };
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

  for (const btn of document.querySelectorAll(".nav-btn")) {
    btn.addEventListener("click", () => {
      if (btn.dataset.screen === "share") { shareMemo(); return; }
      dayOffset = 0;
      show(btn.dataset.screen);
    });
  }

  $("#peek-btn").addEventListener("click", () => {
    dayOffset = dayOffset === 0 ? 1 : 0;
    renderToday();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  $("#you-badges").addEventListener("click", (e) => {
    const b = e.target.closest("[data-placement]");
    if (b) openPlacement(b.dataset.placement, b.dataset.sign, !!b.dataset.approx);
  });

  $("#you-diet").addEventListener("click", (e) => {
    const pill = e.target.closest(".diet-pill");
    if (!pill) return;
    for (const p of document.querySelectorAll("#you-diet .diet-pill")) p.classList.toggle("selected", p === pill);
  });

  $("#tarot-art").addEventListener("click", openTarotZoom);
  $("#overlay").addEventListener("click", (e) => {
    if (e.target.closest("#sheet-close") || !e.target.closest("#sheet, #zoom-card")) closeOverlay();
  });

  show(loadProfile() ? "today" : "onboarding");
});

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js");
    // When a new version's worker takes over, refresh once so updates
    // appear immediately instead of on the next-next visit.
    const hadController = !!navigator.serviceWorker.controller;
    let reloaded = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (reloaded || !hadController) return;
      reloaded = true;
      location.reload();
    });
  });
}
