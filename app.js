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
function rotate(list, listName, profile, today) {
  const offset = hashStr(profile.name + "|" + profile.birthday + "|" + listName) % list.length;
  return list[(dayIndex(today) + offset) % list.length];
}

// ---------- astrology-ish math ----------

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

function moonSignAtBirth(iso) {
  // Mean lunar longitude — sign-level accuracy, entertainment-grade by design.
  const { y, m, d } = parseBirthday(iso);
  const days = (Date.UTC(y, m - 1, d, 12) - Date.UTC(2000, 0, 1, 12)) / 86400000;
  const lon = ((218.316 + 13.176396 * days) % 360 + 360) % 360;
  const order = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
  return WOO.signs.find(s => s.name === order[Math.floor(lon / 30)]);
}

function risingSign(iso, birthTime) {
  // Folk method: rising ≈ sun sign at sunrise, advancing one sign every 2 hours.
  const sun = sunSign(iso);
  const [hh] = birthTime.split(":").map(Number);
  const offset = Math.floor(((hh - 6 + 24) % 24) / 2);
  const order = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
  const idx = (order.indexOf(sun.name) + offset) % 12;
  return WOO.signs.find(s => s.name === order[idx]);
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
    const moon = moonSignAtBirth(profile.birthday);
    const rising = risingSign(profile.birthday, profile.birthTime);
    chartNote = "Chart notes: " + WOO.risingFlavor[rising.name] + ", and " + WOO.moonFlavor[moon.name] + ".";
  }

  const card = rotate(WOO.tarot, "tarot", profile, today);
  const reversed = rand() < 0.3;
  const phase = moonPhase(today);
  const moonLine = rotate(WOO.moonLines[phase.name], "moon-" + phase.name, profile, today);

  return {
    sign, color, phase, moonLine, chartNote, read,
    lucky: luckyNumber(profile, today),
    tarot: { name: card.name + (reversed ? " (reversed)" : ""), text: reversed ? card.rev : card.up, icon: card.icon },
    fashion: fill(rotate(WOO.fashion, "fashion", profile, today), ctx),
    gratitude: rotate(WOO.gratitude, "gratitude", profile, today)
  };
}

// ---------- profile ----------

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
  $("#tarot-icon").textContent = memo.tarot.icon;

  $("#fashion-text").textContent = memo.fashion;
  $("#gratitude-text").textContent = memo.gratitude;

  window._memo = { memo, dateLabel, profile };
}

function renderYou() {
  const profile = loadProfile();
  const sun = sunSign(profile.birthday);
  let badges = `<span class="badge">${sun.glyph} ${sun.name} sun</span>`;
  if (profile.birthTime) {
    const moon = moonSignAtBirth(profile.birthday);
    const rising = risingSign(profile.birthday, profile.birthTime);
    badges += `<span class="badge">${moon.glyph} ${moon.name} moon</span><span class="badge">${rising.glyph} ${rising.name} rising</span>`;
  }
  $("#you-badges").innerHTML = badges;
  $("#you-name").value = profile.name;
  $("#you-birthday").value = profile.birthday;
  $("#you-time").value = profile.birthTime || "";
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

// ---------- share ----------

async function shareMemo() {
  const { memo, dateLabel, profile } = window._memo;
  const text = [
    "The Daily Woo ✨ " + dateLabel,
    "",
    memo.read,
    "",
    memo.tarot.name + ": " + memo.tarot.text,
    "Lucky number " + memo.lucky + " · Power color: " + memo.color.name,
    "Fashion boost: " + memo.fashion,
    "Gratitude: " + memo.gratitude
  ].join("\n");
  if (navigator.share) {
    try { await navigator.share({ title: "The Daily Woo", text }); return; } catch { /* user cancelled */ }
  } else {
    try {
      await navigator.clipboard.writeText(text);
      toast("Copied — paste it in the group chat");
    } catch {
      toast("Couldn't copy on this browser");
    }
  }
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

function readForm(prefix) {
  const name = $("#" + prefix + "-name").value.trim();
  const birthday = $("#" + prefix + "-birthday").value;
  const birthTime = $("#" + prefix + "-time").value || null;
  if (!name || !birthday) { toast("Name and birthday, please — the stars need coordinates"); return null; }
  return { name, birthday, birthTime };
}

document.addEventListener("DOMContentLoaded", () => {
  $("#ob-go").addEventListener("click", () => {
    const p = readForm("ob");
    if (!p) return;
    saveProfile(p);
    show("today");
  });

  $("#you-save").addEventListener("click", () => {
    const p = readForm("you");
    if (!p) return;
    saveProfile(p);
    toast("Saved — the cosmos has been notified");
    renderYou();
  });

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
