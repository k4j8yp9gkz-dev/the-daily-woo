// The Daily Woo — hand-drawn SVG tarot art for the 22 major arcana.
// Style: gold + lavender line art on deep plum, ornate double frame, corner stars.
// Reversed cards are rendered upside down, as tradition demands.

const TAROT_NUMERALS = ["0", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI"];

const tarotArt = (() => {
  const G = "#D8AC55"; // gold
  const L = "#AFA9EC"; // lavender
  const C = "#FBF7F0"; // cream

  const star = (x, y, r, fill) =>
    `<path d="M${x} ${y - r} L${x + r * 0.28} ${y - r * 0.28} L${x + r} ${y} L${x + r * 0.28} ${y + r * 0.28} L${x} ${y + r} L${x - r * 0.28} ${y + r * 0.28} L${x - r} ${y} L${x - r * 0.28} ${y - r * 0.28} Z" fill="${fill}"/>`;

  // Each glyph is drawn centered in a 90x110 box (translated to 30,58 in the frame).
  const glyphs = [
    // 0 The Fool — leap: open arc off a cliff edge, trailing sparkle
    `<path d="M15 95 L42 95 L42 78" stroke="${G}" fill="none" stroke-width="2.5"/>
     <path d="M42 78 Q45 30 76 26" stroke="${L}" fill="none" stroke-width="2.5" stroke-dasharray="1 6" stroke-linecap="round"/>
     <circle cx="76" cy="24" r="9" stroke="${C}" fill="none" stroke-width="2.5"/>
     ${star(22, 40, 6, L)}`,
    // I The Magician — lemniscate above an upright wand
    `<path d="M25 32 C25 20 45 20 45 32 C45 44 25 44 25 32 M45 32 C45 20 65 20 65 32 C65 44 45 44 45 32" stroke="${G}" fill="none" stroke-width="2.5"/>
     <line x1="45" y1="52" x2="45" y2="96" stroke="${C}" stroke-width="2.5"/>
     ${star(45, 47, 4, L)}<circle cx="45" cy="96" r="3" fill="${G}"/>`,
    // II The High Priestess — crescent between two pillars
    `<line x1="20" y1="22" x2="20" y2="96" stroke="${G}" stroke-width="3"/>
     <line x1="70" y1="22" x2="70" y2="96" stroke="${G}" stroke-width="3"/>
     <path d="M52 36 A20 20 0 1 0 52 82 A16 20 0 1 1 52 36" fill="${L}"/>`,
    // III The Empress — venus glyph crowned with wheat
    `<circle cx="45" cy="42" r="17" stroke="${G}" fill="none" stroke-width="2.5"/>
     <line x1="45" y1="59" x2="45" y2="92" stroke="${G}" stroke-width="2.5"/>
     <line x1="33" y1="78" x2="57" y2="78" stroke="${G}" stroke-width="2.5"/>
     <path d="M28 22 Q34 14 40 22 M50 22 Q56 14 62 22" stroke="${L}" fill="none" stroke-width="2"/>
     ${star(45, 42, 5, C)}`,
    // IV The Emperor — throne square with ram horns
    `<rect x="24" y="42" width="42" height="42" stroke="${G}" fill="none" stroke-width="2.5"/>
     <path d="M24 42 Q10 34 18 22 M66 42 Q80 34 72 22" stroke="${L}" fill="none" stroke-width="2.5"/>
     <circle cx="45" cy="63" r="8" stroke="${C}" fill="none" stroke-width="2.5"/>`,
    // V The Hierophant — crossed keys
    `<circle cx="32" cy="32" r="9" stroke="${G}" fill="none" stroke-width="2.5"/>
     <line x1="36" y1="40" x2="62" y2="88" stroke="${G}" stroke-width="2.5"/>
     <path d="M58 80 L66 76 M62 88 L70 84" stroke="${G}" stroke-width="2.5"/>
     <circle cx="58" cy="32" r="9" stroke="${L}" fill="none" stroke-width="2.5"/>
     <line x1="54" y1="40" x2="28" y2="88" stroke="${L}" stroke-width="2.5"/>
     <path d="M32 80 L24 76 M28 88 L20 84" stroke="${L}" stroke-width="2.5"/>`,
    // VI The Lovers — two rings interlocked beneath a star
    `${star(45, 26, 9, G)}
     <circle cx="35" cy="66" r="17" stroke="${C}" fill="none" stroke-width="2.5"/>
     <circle cx="55" cy="66" r="17" stroke="${L}" fill="none" stroke-width="2.5"/>`,
    // VII The Chariot — canopy over twin wheels
    `<path d="M20 30 L70 30 L64 52 L26 52 Z" stroke="${G}" fill="none" stroke-width="2.5"/>
     <circle cx="30" cy="78" r="13" stroke="${L}" fill="none" stroke-width="2.5"/>
     <circle cx="60" cy="78" r="13" stroke="${L}" fill="none" stroke-width="2.5"/>
     <line x1="30" y1="65" x2="30" y2="91" stroke="${L}" stroke-width="2"/><line x1="17" y1="78" x2="43" y2="78" stroke="${L}" stroke-width="2"/>
     <line x1="60" y1="65" x2="60" y2="91" stroke="${L}" stroke-width="2"/><line x1="47" y1="78" x2="73" y2="78" stroke="${L}" stroke-width="2"/>
     ${star(45, 41, 5, C)}`,
    // VIII Strength — heart under a small crown, infinity halo
    `<path d="M30 20 C30 14 40 14 40 20 C40 14 50 14 50 20 C50 14 60 14 60 20 L58 30 L32 30 Z" stroke="${G}" fill="none" stroke-width="2.5"/>
     <path d="M45 92 C20 72 24 48 45 56 C66 48 70 72 45 92 Z" stroke="${C}" fill="none" stroke-width="2.5"/>
     ${star(45, 70, 5, L)}`,
    // IX The Hermit — lantern on a staff, radiating
    `<line x1="26" y1="20" x2="26" y2="96" stroke="${G}" stroke-width="2.5"/>
     <path d="M26 20 Q38 18 40 30" stroke="${G}" fill="none" stroke-width="2.5"/>
     <rect x="48" y="40" width="24" height="30" rx="4" stroke="${L}" fill="none" stroke-width="2.5"/>
     ${star(60, 55, 6, C)}
     <path d="M60 30 L60 24 M74 42 L80 38 M74 66 L80 70 M46 42 L40 38" stroke="${L}" stroke-width="2" stroke-linecap="round"/>`,
    // X Wheel of Fortune — eight-spoked wheel
    `<circle cx="45" cy="58" r="30" stroke="${G}" fill="none" stroke-width="2.5"/>
     <circle cx="45" cy="58" r="9" stroke="${L}" fill="none" stroke-width="2.5"/>
     <path d="M45 28 V49 M45 67 V88 M15 58 H36 M54 58 H75 M24 37 L38 51 M52 65 L66 79 M66 37 L52 51 M38 65 L24 79" stroke="${G}" stroke-width="2"/>`,
    // XI Justice — the scales
    `<line x1="45" y1="20" x2="45" y2="90" stroke="${G}" stroke-width="2.5"/>
     <line x1="18" y1="32" x2="72" y2="32" stroke="${G}" stroke-width="2.5"/>
     <path d="M18 32 L10 52 L26 52 Z M72 32 L64 52 L80 52 Z" stroke="${L}" fill="none" stroke-width="2"/>
     <path d="M10 52 A8 8 0 0 0 26 52 M64 52 A8 8 0 0 0 80 52" stroke="${L}" fill="none" stroke-width="2"/>
     <line x1="34" y1="90" x2="56" y2="90" stroke="${G}" stroke-width="2.5"/>`,
    // XII The Hanged Man — inverted triangle, haloed
    `<path d="M22 30 L68 30 L45 78 Z" stroke="${G}" fill="none" stroke-width="2.5"/>
     <circle cx="45" cy="88" r="8" stroke="${L}" fill="none" stroke-width="2.5"/>
     <path d="M45 96 L45 102 M37 94 L32 99 M53 94 L58 99" stroke="${L}" stroke-width="2" stroke-linecap="round"/>`,
    // XIII Death — a rose blooming (transformation)
    `<circle cx="45" cy="42" r="16" stroke="${C}" fill="none" stroke-width="2.5"/>
     <path d="M45 42 C51 42 51 34 45 34 C36 34 36 46 45 46 C56 46 56 32 45 32" stroke="${C}" fill="none" stroke-width="2"/>
     <line x1="45" y1="58" x2="45" y2="96" stroke="${G}" stroke-width="2.5"/>
     <path d="M45 76 Q30 74 27 62 Q42 64 45 76 Z M45 86 Q60 84 63 72 Q48 74 45 86 Z" stroke="${G}" fill="none" stroke-width="2"/>
     ${star(68, 26, 5, L)}${star(22, 30, 4, L)}`,
    // XIV Temperance — water poured between two cups
    `<path d="M18 34 L38 34 L34 50 L22 50 Z" stroke="${G}" fill="none" stroke-width="2.5"/>
     <path d="M52 74 L72 74 L68 90 L56 90 Z" stroke="${G}" fill="none" stroke-width="2.5"/>
     <path d="M30 50 Q46 58 60 74" stroke="${L}" fill="none" stroke-width="2.5" stroke-dasharray="4 4"/>
     ${star(64, 30, 6, C)}`,
    // XV The Devil — horns above a chain breaking free
    `<path d="M22 34 Q26 18 38 26 M68 34 Q64 18 52 26" stroke="${G}" fill="none" stroke-width="2.5"/>
     <path d="M38 26 Q45 32 52 26" stroke="${G}" fill="none" stroke-width="2.5"/>
     <ellipse cx="45" cy="54" rx="10" ry="14" stroke="${L}" fill="none" stroke-width="2.5"/>
     <ellipse cx="45" cy="78" rx="10" ry="14" stroke="${L}" fill="none" stroke-width="2.5" stroke-dasharray="14 8"/>
     <path d="M58 90 L68 98 M62 86 L72 90" stroke="${C}" stroke-width="2" stroke-linecap="round"/>`,
    // XVI The Tower — struck by lightning
    `<rect x="32" y="40" width="26" height="52" stroke="${G}" fill="none" stroke-width="2.5"/>
     <path d="M28 40 L62 40 M32 30 L36 40 M45 28 L45 40 M58 30 L54 40" stroke="${G}" stroke-width="2.5" fill="none"/>
     <path d="M70 16 L52 40 L62 42 L44 66" stroke="${C}" fill="none" stroke-width="2.5" stroke-linejoin="round"/>
     <circle cx="24" cy="70" r="2.5" fill="${L}"/><circle cx="68" cy="80" r="2.5" fill="${L}"/><circle cx="20" cy="88" r="2" fill="${L}"/>`,
    // XVII The Star — one grand star over water
    `${star(45, 44, 22, G)}
     ${star(20, 24, 5, L)}${star(70, 28, 5, L)}
     <path d="M18 84 Q28 78 38 84 T58 84 T78 84" stroke="${L}" fill="none" stroke-width="2.5"/>
     <path d="M24 94 Q34 88 44 94 T64 94" stroke="${L}" fill="none" stroke-width="2" opacity="0.6"/>`,
    // XVIII The Moon — crescent with falling drops
    `<path d="M56 22 A30 30 0 1 0 56 90 A24 30 0 1 1 56 22" fill="${C}"/>
     <circle cx="24" cy="34" r="2.5" fill="${L}"/><circle cx="20" cy="52" r="2" fill="${L}"/><circle cx="26" cy="70" r="2.5" fill="${L}"/>
     ${star(70, 30, 4, G)}`,
    // XIX The Sun — radiant with alternating rays
    `<circle cx="45" cy="56" r="19" stroke="${G}" fill="none" stroke-width="2.5"/>
     <circle cx="45" cy="56" r="7" fill="${G}"/>
     <path d="M45 24 V32 M45 80 V88 M13 56 H21 M69 56 H77 M23 34 L29 40 M61 72 L67 78 M67 34 L61 40 M29 72 L23 78" stroke="${C}" stroke-width="2.5" stroke-linecap="round"/>`,
    // XX Judgement — trumpet with banner and rays
    `<path d="M24 30 L60 58 L52 66 Z" stroke="${G}" fill="none" stroke-width="2.5" stroke-linejoin="round"/>
     <circle cx="66" cy="66" r="9" stroke="${G}" fill="none" stroke-width="2.5"/>
     <path d="M20 22 L26 28 M34 18 L36 26 M14 36 L22 38" stroke="${L}" stroke-width="2" stroke-linecap="round"/>
     <path d="M40 78 Q50 86 44 96" stroke="${L}" fill="none" stroke-width="2.5"/>`,
    // XXI The World — laurel wreath around a star
    `<ellipse cx="45" cy="58" rx="27" ry="36" stroke="${G}" fill="none" stroke-width="2.5"/>
     <path d="M24 40 L18 36 M22 58 L15 58 M24 76 L18 80 M66 40 L72 36 M68 58 L75 58 M66 76 L72 80" stroke="${G}" stroke-width="2" stroke-linecap="round"/>
     ${star(45, 58, 12, C)}`
  ];

  return function (index) {
    return `<svg viewBox="0 0 150 240" role="img" aria-label="Tarot card art">
      <rect x="0" y="0" width="150" height="240" rx="12" fill="#1C1536"/>
      <rect x="6" y="6" width="138" height="228" rx="8" fill="none" stroke="${G}" stroke-width="1.5"/>
      <rect x="12" y="12" width="126" height="216" rx="5" fill="none" stroke="${L}" stroke-width="0.75" opacity="0.55"/>
      ${star(24, 24, 4, G)}${star(126, 24, 4, G)}${star(24, 216, 4, G)}${star(126, 216, 4, G)}
      <text x="75" y="38" text-anchor="middle" font-family="Georgia, serif" font-size="17" fill="${G}">${TAROT_NUMERALS[index]}</text>
      <line x1="55" y1="46" x2="95" y2="46" stroke="${L}" stroke-width="0.75" opacity="0.55"/>
      <g transform="translate(30, 58)">${glyphs[index]}</g>
      <line x1="55" y1="196" x2="95" y2="196" stroke="${L}" stroke-width="0.75" opacity="0.55"/>
      <circle cx="75" cy="208" r="2.5" fill="${G}"/>
    </svg>`;
  };
})();
