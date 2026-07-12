// The Daily Woo — the deck. 22 major arcana as layered SVG scenes with
// gold-foil frames, meant to read like a high-end physical deck.
// Reversed cards are rendered upside down, as tradition demands.

const TAROT_NUMERALS = ["0", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI"];

const tarotArt = (() => {
  const GOLD = "url(#dwGold)";
  const PALE = "#E8C97A";  // pale gold
  const DEEP = "#B8892F";  // deep gold
  const LAV = "#AFA9EC";   // lavender
  const CREAM = "#FBF7F0"; // cream
  const INK = "#171129";   // darkest plum
  const PLUM = "#241B44";  // scene mid plum
  const SERIF = "Georgia, 'Times New Roman', serif";

  const star4 = (x, y, r, fill, o) =>
    `<path d="M${x} ${y - r} Q${x + r * 0.12} ${y - r * 0.12} ${x + r} ${y} Q${x + r * 0.12} ${y + r * 0.12} ${x} ${y + r} Q${x - r * 0.12} ${y + r * 0.12} ${x - r} ${y} Q${x - r * 0.12} ${y - r * 0.12} ${x} ${y - r} Z" fill="${fill}"${o ? ` opacity="${o}"` : ""}/>`;

  const star8 = (x, y, r, fill) =>
    star4(x, y, r, fill) + star4(x, y, r * 0.62, fill).replace("<path ", `<path transform="rotate(45 ${x} ${y})" `);

  const rays = (x, y, inner, outer, n, stroke, w) => {
    let s = "";
    for (let i = 0; i < n; i++) {
      const a = (i * 360 / n) * Math.PI / 180;
      s += `<line x1="${(x + inner * Math.cos(a)).toFixed(1)}" y1="${(y + inner * Math.sin(a)).toFixed(1)}" x2="${(x + outer * Math.cos(a)).toFixed(1)}" y2="${(y + outer * Math.sin(a)).toFixed(1)}" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round"/>`;
    }
    return s;
  };

  // Deterministic scatter of tiny stars per card.
  const field = (index) => {
    let s = "";
    for (let k = 0; k < 14; k++) {
      const x = 34 + ((index * 53 + k * 97) % 232);
      const y = 96 + ((index * 71 + k * 139) % 260);
      const r = 1 + ((index + k) % 3) * 0.7;
      s += ((index + k) % 4 === 0)
        ? star4(x, y, r + 2.4, LAV, 0.7)
        : `<circle cx="${x}" cy="${y}" r="${r * 0.55}" fill="${CREAM}" opacity="${0.35 + ((k * 7) % 4) * 0.12}"/>`;
    }
    return s;
  };

  const cornerFiligree = () => {
    const one = `<path d="M26 44 Q26 26 44 26 M31 52 Q31 31 52 31 M26 26 L34 34" stroke="${GOLD}" stroke-width="2" fill="none" stroke-linecap="round"/>` + star4(40, 40, 4.5, PALE);
    return `<g>${one}</g>
      <g transform="translate(300,0) scale(-1,1)">${one}</g>
      <g transform="translate(0,480) scale(1,-1)">${one}</g>
      <g transform="translate(300,480) scale(-1,-1)">${one}</g>`;
  };

  const ground = (y, color, o) =>
    `<path d="M24 ${y + 26} L24 376 L276 376 L276 ${y + 26} Q150 ${y - 14} 24 ${y + 26} Z" fill="${color}" opacity="${o || 1}"/>`;

  const scenes = [
    // 0 THE FOOL — mid-leap off the cliff, sun watching, loyal star at heel
    () => `${rays(236, 132, 18, 30, 12, DEEP, 2)}<circle cx="236" cy="132" r="15" fill="${GOLD}"/>
      <path d="M24 330 L96 330 L120 352 L24 376 Z" fill="${PLUM}"/>
      <path d="M96 330 L120 352" stroke="${DEEP}" stroke-width="2"/>
      <path d="M96 300 Q104 236 150 208" stroke="${LAV}" stroke-width="2.5" fill="none" stroke-dasharray="2 8" stroke-linecap="round"/>
      <circle cx="158" cy="196" r="13" fill="none" stroke="${CREAM}" stroke-width="3"/>
      <path d="M150 208 Q128 224 118 256 Q142 250 158 232 Z" fill="${LAV}" opacity="0.85"/>
      <line x1="162" y1="206" x2="196" y2="180" stroke="${GOLD}" stroke-width="2.5"/>
      <circle cx="202" cy="176" r="7" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
      ${star8(70, 300, 9, PALE)}
      <path d="M60 356 Q76 348 92 356" stroke="${DEEP}" stroke-width="1.5" fill="none"/>`,

    // I THE MAGICIAN — as above, so below: wand up, altar of four suits
    () => `<path d="M96 148 C96 128 128 128 128 148 C128 168 96 168 96 148 M128 148 C128 128 160 128 160 148 C160 168 128 168 128 148"
        transform="translate(22,0)" stroke="${GOLD}" stroke-width="3" fill="none"/>
      <line x1="150" y1="176" x2="150" y2="288" stroke="${CREAM}" stroke-width="3.5"/>
      ${star8(150, 170, 8, PALE)}
      <path d="M150 288 L150 300" stroke="${GOLD}" stroke-width="5" stroke-linecap="round"/>
      <rect x="66" y="308" width="168" height="10" rx="3" fill="${GOLD}"/>
      <line x1="80" y1="318" x2="80" y2="352" stroke="${DEEP}" stroke-width="3"/>
      <line x1="220" y1="318" x2="220" y2="352" stroke="${DEEP}" stroke-width="3"/>
      <path d="M92 294 L104 294 L102 302 L94 302 Z M98 294 L98 288" stroke="${LAV}" stroke-width="2" fill="none"/>
      <circle cx="128" cy="297" r="6" stroke="${PALE}" stroke-width="2" fill="none"/><line x1="128" y1="291" x2="128" y2="303" stroke="${PALE}" stroke-width="1"/>
      <line x1="170" y1="290" x2="182" y2="302" stroke="${LAV}" stroke-width="2"/><line x1="170" y1="296" x2="175" y2="291" stroke="${LAV}" stroke-width="2"/>
      <line x1="204" y1="290" x2="204" y2="303" stroke="${PALE}" stroke-width="3"/>
      <path d="M60 236 Q90 218 96 190 M240 236 Q210 218 204 190" stroke="${DEEP}" stroke-width="1.5" fill="none"/>
      <circle cx="60" cy="238" r="4" fill="${LAV}"/><circle cx="240" cy="238" r="4" fill="${LAV}"/>`,

    // II THE HIGH PRIESTESS — pillars B & J, veil of pomegranates, crescent
    () => `<rect x="52" y="128" width="26" height="224" rx="4" fill="${INK}" stroke="${GOLD}" stroke-width="2"/>
      <rect x="222" y="128" width="26" height="224" rx="4" fill="${CREAM}" opacity="0.9"/>
      <rect x="46" y="116" width="38" height="14" rx="3" fill="${GOLD}"/>
      <rect x="216" y="116" width="38" height="14" rx="3" fill="${GOLD}"/>
      <path d="M88 140 Q150 108 212 140 L212 300 L88 300 Z" fill="${PLUM}" opacity="0.85"/>
      <circle cx="116" cy="176" r="6" fill="${DEEP}"/><circle cx="150" cy="164" r="6" fill="${DEEP}"/><circle cx="184" cy="176" r="6" fill="${DEEP}"/>
      <circle cx="133" cy="206" r="6" fill="${DEEP}"/><circle cx="167" cy="206" r="6" fill="${DEEP}"/>
      <circle cx="150" cy="244" r="26" fill="none" stroke="${PALE}" stroke-width="2.5"/>
      <path d="M150 226 A18 18 0 1 0 150 262 A14 18 0 1 1 150 226" fill="${LAV}"/>
      <rect x="128" y="286" width="44" height="26" rx="4" fill="${CREAM}" opacity="0.92"/>
      <text x="150" y="304" text-anchor="middle" font-family="${SERIF}" font-size="13" fill="${INK}">TORA</text>
      <path d="M112 344 A38 20 0 0 0 188 344" stroke="${GOLD}" stroke-width="3.5" fill="none"/>`,

    // III THE EMPRESS — crown of stars over venus shield, wheat and river
    () => `<g>${[0,1,2,3,4,5].map(i => star4(96 + i * 22, 128 - (i===0||i===5?0:(i===1||i===4?8:12)), 5.5, PALE)).join("")}</g>
      <circle cx="150" cy="208" r="42" fill="none" stroke="${GOLD}" stroke-width="3.5"/>
      <circle cx="150" cy="208" r="42" fill="${LAV}" opacity="0.14"/>
      <line x1="150" y1="250" x2="150" y2="296" stroke="${GOLD}" stroke-width="3.5"/>
      <line x1="128" y1="274" x2="172" y2="274" stroke="${GOLD}" stroke-width="3.5"/>
      ${star8(150, 208, 14, PALE)}
      <path d="M24 330 Q150 306 276 330 L276 376 L24 376 Z" fill="${PLUM}"/>
      ${[0,1,2,3,4,5,6].map(i => { const x = 48 + i * 34; return `<line x1="${x}" y1="352" x2="${x}" y2="322" stroke="${DEEP}" stroke-width="2.5"/><path d="M${x} 322 L${x-6} 312 M${x} 322 L${x+6} 312 M${x} 330 L${x-6} 320 M${x} 330 L${x+6} 320" stroke="${DEEP}" stroke-width="2" fill="none"/>`; }).join("")}
      <path d="M24 366 Q80 358 130 366 T240 366 T276 362" stroke="${LAV}" stroke-width="3" fill="none" opacity="0.8"/>`,

    // IV THE EMPEROR — ram throne against the mountains
    () => `<path d="M48 300 L96 208 L134 280 L170 196 L216 300 Z" fill="${PLUM}" opacity="0.9"/>
      <path d="M96 208 L88 224 L104 224 Z M170 196 L162 212 L178 212 Z" fill="${CREAM}" opacity="0.85"/>
      <rect x="92" y="228" width="116" height="112" rx="6" fill="${INK}" stroke="${GOLD}" stroke-width="3"/>
      <path d="M92 228 Q64 216 70 190 Q88 196 96 214 M208 228 Q236 216 230 190 Q212 196 204 214" stroke="${GOLD}" stroke-width="3" fill="none"/>
      <circle cx="74" cy="196" r="5" fill="${PALE}"/><circle cx="226" cy="196" r="5" fill="${PALE}"/>
      <path d="M120 262 L150 240 L180 262 L180 296 L120 296 Z" fill="none" stroke="${PALE}" stroke-width="2.5"/>
      <circle cx="150" cy="272" r="9" fill="${GOLD}"/>
      <line x1="108" y1="340" x2="108" y2="360" stroke="${DEEP}" stroke-width="4"/>
      <line x1="192" y1="340" x2="192" y2="360" stroke="${DEEP}" stroke-width="4"/>
      <circle cx="108" cy="336" r="6" fill="none" stroke="${DEEP}" stroke-width="2.5"/>
      <path d="M188 336 L196 336 M192 332 L192 340" stroke="${DEEP}" stroke-width="2.5"/>`,

    // V THE HIEROPHANT — triple crown, blessing rays, crossed keys
    () => `<path d="M122 150 L178 150 L170 128 L158 138 L150 118 L142 138 L130 128 Z" fill="${GOLD}"/>
      <circle cx="150" cy="196" r="30" fill="none" stroke="${PALE}" stroke-width="3"/>
      ${rays(150, 196, 36, 52, 8, DEEP, 2)}
      <rect x="60" y="150" width="16" height="180" rx="3" fill="${PLUM}" stroke="${DEEP}" stroke-width="1.5"/>
      <rect x="224" y="150" width="16" height="180" rx="3" fill="${PLUM}" stroke="${DEEP}" stroke-width="1.5"/>
      <path d="M150 230 L150 292" stroke="${GOLD}" stroke-width="4"/>
      <path d="M132 250 L168 250 M138 268 L162 268" stroke="${GOLD}" stroke-width="3.5"/>
      <circle cx="118" cy="318" r="11" fill="none" stroke="${PALE}" stroke-width="3"/>
      <line x1="126" y1="326" x2="158" y2="352" stroke="${PALE}" stroke-width="3"/>
      <path d="M150 346 L158 340 M154 352 L162 346" stroke="${PALE}" stroke-width="2.5"/>
      <circle cx="182" cy="318" r="11" fill="none" stroke="${LAV}" stroke-width="3"/>
      <line x1="174" y1="326" x2="142" y2="352" stroke="${LAV}" stroke-width="3"/>
      <path d="M150 346 L142 340 M146 352 L138 346" stroke="${LAV}" stroke-width="2.5"/>`,

    // VI THE LOVERS — radiant sun, wings, two souls and the mountain between
    () => `${rays(150, 130, 22, 38, 16, DEEP, 2)}<circle cx="150" cy="130" r="18" fill="${GOLD}"/>
      <path d="M62 186 Q104 148 150 168 Q196 148 238 186 Q196 172 150 186 Q104 172 62 186 Z" fill="${LAV}" opacity="0.5"/>
      <path d="M126 246 L150 200 L174 246 Z" fill="${PLUM}" stroke="${DEEP}" stroke-width="1.5"/>
      <circle cx="96" cy="238" r="14" fill="none" stroke="${CREAM}" stroke-width="3"/>
      <path d="M82 258 Q96 250 110 258 L106 330 L86 330 Z" fill="${CREAM}" opacity="0.85"/>
      <circle cx="204" cy="238" r="14" fill="none" stroke="${LAV}" stroke-width="3"/>
      <path d="M190 258 Q204 250 218 258 L214 330 L194 330 Z" fill="${LAV}" opacity="0.85"/>
      <path d="M110 296 Q150 276 190 296" stroke="${GOLD}" stroke-width="2" fill="none" stroke-dasharray="1 7" stroke-linecap="round"/>
      ${star4(150, 292, 7, PALE)}
      ${ground(340, PLUM, 0.9)}`,

    // VII THE CHARIOT — starred canopy, armored driver, twin sphinxes
    () => `<rect x="78" y="122" width="144" height="10" rx="3" fill="${GOLD}"/>
      <line x1="84" y1="132" x2="84" y2="212" stroke="${DEEP}" stroke-width="3"/>
      <line x1="216" y1="132" x2="216" y2="212" stroke="${DEEP}" stroke-width="3"/>
      <rect x="84" y="132" width="132" height="80" fill="${PLUM}" opacity="0.55"/>
      ${[0,1,2,3,4].map(i => star4(102 + i * 24, 152 + (i % 2) * 22, 4.5, PALE)).join("")}
      <circle cx="150" cy="224" r="17" fill="none" stroke="${CREAM}" stroke-width="3"/>
      <path d="M138 212 L134 200 L142 206 M162 212 L166 200 L158 206" stroke="${PALE}" stroke-width="2.5" fill="none"/>
      <path d="M120 244 L180 244 L172 296 L128 296 Z" fill="${INK}" stroke="${GOLD}" stroke-width="2.5"/>
      ${star8(150, 268, 10, PALE)}
      <path d="M84 322 Q102 300 122 322 L122 344 L84 344 Z" fill="${CREAM}" opacity="0.9"/>
      <path d="M178 322 Q196 300 216 322 L216 344 L178 344 Z" fill="${INK}" stroke="${LAV}" stroke-width="2"/>
      <circle cx="103" cy="330" r="3" fill="${INK}"/><circle cx="197" cy="330" r="3" fill="${LAV}"/>
      <circle cx="122" cy="344" r="13" fill="none" stroke="${GOLD}" stroke-width="3"/>
      <circle cx="178" cy="344" r="13" fill="none" stroke="${GOLD}" stroke-width="3"/>
      ${rays(122, 344, 4, 11, 6, DEEP, 1.5)}${rays(178, 344, 4, 11, 6, DEEP, 1.5)}`,

    // VIII STRENGTH — the lion's sunburst mane, gentled; infinity above
    () => `<path d="M112 138 C112 120 140 120 140 138 C140 156 112 156 112 138 M140 138 C140 120 168 120 168 138 C168 156 140 156 140 138" transform="translate(10,0)" stroke="${PALE}" stroke-width="3" fill="none"/>
      ${rays(150, 258, 52, 78, 18, DEEP, 3)}
      <circle cx="150" cy="258" r="48" fill="${GOLD}" opacity="0.92"/>
      <circle cx="150" cy="258" r="48" fill="none" stroke="${DEEP}" stroke-width="2"/>
      <circle cx="134" cy="248" r="4.5" fill="${INK}"/><circle cx="166" cy="248" r="4.5" fill="${INK}"/>
      <path d="M138 276 Q150 286 162 276" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M144 258 L150 266 L156 258" stroke="${INK}" stroke-width="2.5" fill="none" stroke-linejoin="round"/>
      <path d="M96 200 Q124 186 150 196 Q176 186 204 200" stroke="${LAV}" stroke-width="2.5" fill="none"/>
      <circle cx="96" cy="200" r="4" fill="${LAV}"/><circle cx="204" cy="200" r="4" fill="${LAV}"/>
      <path d="M76 336 Q150 316 224 336" stroke="${DEEP}" stroke-width="2" fill="none"/>
      <circle cx="88" cy="334" r="5" fill="${LAV}"/><circle cx="150" cy="325" r="5" fill="${PALE}"/><circle cx="212" cy="334" r="5" fill="${LAV}"/>`,

    // IX THE HERMIT — the mountaintop lantern that lights one step at a time
    () => `<path d="M24 376 L120 200 L180 300 L240 220 L276 376 Z" fill="${PLUM}" opacity="0.85"/>
      <path d="M120 200 L110 220 L130 220 Z" fill="${CREAM}" opacity="0.8"/>
      <path d="M150 168 L128 208 L150 200 L172 208 Z" fill="${INK}" stroke="${LAV}" stroke-width="2"/>
      <circle cx="150" cy="156" r="13" fill="none" stroke="${LAV}" stroke-width="2.5"/>
      <line x1="196" y1="176" x2="196" y2="300" stroke="${DEEP}" stroke-width="3.5"/>
      <path d="M196 176 Q208 172 210 160" stroke="${DEEP}" stroke-width="3" fill="none"/>
      <rect x="88" y="212" width="34" height="42" rx="6" fill="${INK}" stroke="${GOLD}" stroke-width="2.5"/>
      <path d="M96 212 L96 204 L114 204 L114 212" stroke="${GOLD}" stroke-width="2.5" fill="none"/>
      ${star8(105, 233, 9, PALE)}
      ${rays(105, 233, 26, 40, 8, PALE, 1.2)}
      <path d="M60 348 Q90 338 120 348 T200 348" stroke="${LAV}" stroke-width="1.5" fill="none" opacity="0.5"/>`,

    // X WHEEL OF FORTUNE — the great gilded wheel among clouds
    () => `<path d="M40 140 Q56 120 76 132 Q84 116 102 124" stroke="${LAV}" stroke-width="2.5" fill="none" opacity="0.7"/>
      <path d="M198 350 Q216 364 236 354 Q246 368 262 360" stroke="${LAV}" stroke-width="2.5" fill="none" opacity="0.7"/>
      <circle cx="150" cy="240" r="82" fill="none" stroke="${GOLD}" stroke-width="5"/>
      <circle cx="150" cy="240" r="60" fill="none" stroke="${PALE}" stroke-width="2"/>
      <circle cx="150" cy="240" r="20" fill="${INK}" stroke="${GOLD}" stroke-width="3"/>
      ${star8(150, 240, 11, PALE)}
      ${rays(150, 240, 20, 60, 8, DEEP, 3)}
      <text x="150" y="176" text-anchor="middle" font-family="${SERIF}" font-size="15" fill="${CREAM}">☉</text>
      <text x="216" y="246" text-anchor="middle" font-family="${SERIF}" font-size="15" fill="${CREAM}">☽</text>
      <text x="150" y="312" text-anchor="middle" font-family="${SERIF}" font-size="15" fill="${CREAM}">☿</text>
      <text x="84" y="246" text-anchor="middle" font-family="${SERIF}" font-size="15" fill="${CREAM}">♃</text>
      <path d="M118 140 L150 118 L182 140 L150 132 Z" fill="${LAV}" opacity="0.9"/>`,

    // XI JUSTICE — the sword upright, the scales in perfect agreement
    () => `<path d="M128 132 L172 132 L164 114 L150 124 L136 114 Z" fill="${GOLD}"/>
      <rect x="70" y="150" width="12" height="200" fill="${PLUM}" stroke="${DEEP}" stroke-width="1.5"/>
      <rect x="218" y="150" width="12" height="200" fill="${PLUM}" stroke="${DEEP}" stroke-width="1.5"/>
      <line x1="150" y1="150" x2="150" y2="330" stroke="${CREAM}" stroke-width="4"/>
      <path d="M150 150 L142 164 L158 164 Z" fill="${CREAM}"/>
      <line x1="138" y1="330" x2="162" y2="330" stroke="${CREAM}" stroke-width="4"/>
      <line x1="96" y1="196" x2="204" y2="196" stroke="${GOLD}" stroke-width="4"/>
      <line x1="96" y1="196" x2="96" y2="228" stroke="${DEEP}" stroke-width="2"/>
      <line x1="204" y1="196" x2="204" y2="228" stroke="${DEEP}" stroke-width="2"/>
      <path d="M78 228 A18 10 0 0 0 114 228 Z" fill="${GOLD}"/>
      <path d="M186 228 A18 10 0 0 0 222 228 Z" fill="${GOLD}"/>
      ${star4(150, 260, 8, LAV)}`,

    // XII THE HANGED MAN — serene inversion beneath the living tree
    () => `<line x1="70" y1="140" x2="230" y2="140" stroke="${DEEP}" stroke-width="7"/>
      <path d="M70 140 Q62 122 76 112 M230 140 Q238 122 224 112 M110 140 Q106 126 116 120 M190 140 Q194 126 184 120" stroke="${DEEP}" stroke-width="3" fill="none"/>
      <circle cx="76" cy="110" r="5" fill="${LAV}"/><circle cx="224" cy="110" r="5" fill="${LAV}"/><circle cx="117" cy="118" r="4" fill="${LAV}"/><circle cx="183" cy="118" r="4" fill="${LAV}"/>
      <line x1="150" y1="140" x2="150" y2="180" stroke="${CREAM}" stroke-width="3"/>
      <path d="M150 180 L150 250 M150 196 L124 224 M150 196 L176 224 M150 250 L128 282 M150 250 L150 292" stroke="${CREAM}" stroke-width="4" stroke-linecap="round"/>
      <circle cx="150" cy="308" r="16" fill="none" stroke="${PALE}" stroke-width="3"/>
      ${rays(150, 308, 22, 34, 10, DEEP, 2)}`,

    // XIII DEATH — the white rose banner and the sun rising anyway
    () => `<path d="M96 356 A64 64 0 0 1 204 356" fill="${GOLD}" opacity="0.9"/>
      ${[200, 222, 244, 266, 288, 310, 332, 354].map(deg => { const a = deg * Math.PI / 180; return `<line x1="${(150 + 70 * Math.cos(a)).toFixed(1)}" y1="${(356 + 70 * Math.sin(a)).toFixed(1)}" x2="${(150 + 90 * Math.cos(a)).toFixed(1)}" y2="${(356 + 90 * Math.sin(a)).toFixed(1)}" stroke="${DEEP}" stroke-width="2.5" stroke-linecap="round"/>`; }).join("")}
      <rect x="76" y="180" width="20" height="150" fill="${INK}" stroke="${DEEP}" stroke-width="1.5"/>
      <rect x="204" y="180" width="20" height="150" fill="${INK}" stroke="${DEEP}" stroke-width="1.5"/>
      <path d="M76 180 L86 166 L96 180 M204 180 L214 166 L224 180" stroke="${DEEP}" stroke-width="2" fill="none"/>
      <line x1="150" y1="120" x2="150" y2="280" stroke="${DEEP}" stroke-width="4"/>
      <path d="M150 124 L230 124 L214 152 L230 180 L150 180 Z" fill="${INK}" stroke="${GOLD}" stroke-width="2.5"/>
      <circle cx="186" cy="152" r="15" fill="none" stroke="${CREAM}" stroke-width="2.5"/>
      <path d="M186 152 C191 152 191 145 186 145 C179 145 179 155 186 155" stroke="${CREAM}" stroke-width="1.8" fill="none"/>
      <path d="M180 165 Q174 170 172 176 M192 165 Q198 170 200 176" stroke="${CREAM}" stroke-width="1.8" fill="none"/>`,

    // XIV TEMPERANCE — the angel blending water and light
    () => `<path d="M150 128 L138 148 L162 148 Z" fill="none" stroke="${PALE}" stroke-width="2.5"/>
      <rect x="134" y="144" width="32" height="32" fill="none" stroke="${PALE}" stroke-width="2.5" transform="rotate(45 150 160)"/>
      <path d="M70 220 Q110 180 150 208 M230 220 Q190 180 150 208" stroke="${LAV}" stroke-width="3" fill="none" opacity="0.8"/>
      <path d="M92 238 L124 238 L118 264 L98 264 Z" fill="${GOLD}"/>
      <path d="M176 288 L208 288 L202 314 L182 314 Z" fill="${GOLD}"/>
      <path d="M112 262 Q150 268 186 290" stroke="${CREAM}" stroke-width="3.5" fill="none" stroke-dasharray="7 5"/>
      <ellipse cx="112" cy="352" rx="70" ry="14" fill="${PLUM}"/>
      <path d="M52 350 Q82 342 112 350 T172 350" stroke="${LAV}" stroke-width="2" fill="none" opacity="0.8"/>
      <path d="M240 352 L240 316 M240 330 L230 318 M240 330 L250 318 M240 336 L233 328" stroke="${LAV}" stroke-width="2.5" fill="none"/>
      ${star4(150, 240, 6, PALE)}`,

    // XV THE DEVIL — the inverted star, the chains already loosening
    () => `<circle cx="150" cy="172" r="40" fill="none" stroke="${GOLD}" stroke-width="3"/>
      <path d="M150 212 L126 146 L184 188 L116 188 L174 146 Z" fill="none" stroke="${PALE}" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M96 150 Q104 118 128 128 M204 150 Q196 118 176 128" stroke="${DEEP}" stroke-width="3.5" fill="none"/>
      <rect x="70" y="252" width="14" height="66" rx="7" fill="none" stroke="${LAV}" stroke-width="3"/>
      <rect x="216" y="252" width="14" height="66" rx="7" fill="none" stroke="${LAV}" stroke-width="3"/>
      <circle cx="77" cy="244" r="8" fill="none" stroke="${LAV}" stroke-width="2.5"/>
      <circle cx="223" cy="244" r="8" fill="none" stroke="${LAV}" stroke-width="2.5"/>
      <path d="M90 286 Q120 306 144 296" stroke="${DEEP}" stroke-width="2.5" fill="none" stroke-dasharray="9 7"/>
      <path d="M210 286 Q180 306 156 296" stroke="${DEEP}" stroke-width="2.5" fill="none" stroke-dasharray="9 7"/>
      <path d="M144 330 L150 316 L156 330 L150 342 Z" fill="${GOLD}"/>
      <path d="M150 316 Q146 306 150 298 Q154 306 150 316" fill="${PALE}"/>`,

    // XVI THE TOWER — the crown blown clean off, the useful catastrophe
    () => `<path d="M60 376 L96 320 L204 320 L240 376 Z" fill="${PLUM}"/>
      <rect x="118" y="170" width="64" height="156" fill="${INK}" stroke="${GOLD}" stroke-width="2.5"/>
      <path d="M112 170 L188 170 L182 152 L118 152 Z" fill="${INK}" stroke="${GOLD}" stroke-width="2.5"/>
      <path d="M96 122 L134 138 L112 148 Z" fill="${GOLD}" transform="rotate(-24 112 136)"/>
      <path d="M236 108 L196 150 L216 154 L172 206" stroke="${CREAM}" stroke-width="4" fill="none" stroke-linejoin="round"/>
      <path d="M236 108 L226 104 M236 108 L238 118" stroke="${CREAM}" stroke-width="3"/>
      <rect x="134" y="192" width="12" height="18" fill="${GOLD}" opacity="0.9"/>
      <rect x="156" y="236" width="12" height="18" fill="${GOLD}" opacity="0.9"/>
      <path d="M134 210 Q130 202 134 196 Q140 204 134 210 M168 254 Q164 246 168 240 Q174 248 168 254" fill="${PALE}"/>
      ${[0,1,2,3,4,5].map(i => `<path d="M${86 + i * 26} ${268 + (i % 3) * 26} q3 -6 6 0 q-3 8 -6 0" fill="${LAV}"/>`).join("")}
      <path d="M96 320 L84 296 M204 320 L218 292" stroke="${LAV}" stroke-width="3" stroke-linecap="round"/>
      <circle cx="82" cy="290" r="6" fill="${LAV}"/><circle cx="220" cy="286" r="6" fill="${LAV}"/>`,

    // XVII THE STAR — the grand star, the pool, the two poured streams
    () => `${star8(150, 178, 44, GOLD)}
      ${star8(150, 178, 20, CREAM)}
      ${[[74,130],[226,130],[62,208],[238,208],[104,110],[196,110],[150,96]].map(([x,y]) => star4(x, y, 6.5, LAV)).join("")}
      <ellipse cx="150" cy="344" rx="96" ry="20" fill="${PLUM}"/>
      <path d="M70 342 Q100 334 130 342 T210 342" stroke="${LAV}" stroke-width="2.5" fill="none" opacity="0.85"/>
      <path d="M118 250 Q108 290 122 332" stroke="${CREAM}" stroke-width="3.5" fill="none"/>
      <path d="M182 250 Q192 288 176 318" stroke="${CREAM}" stroke-width="3.5" fill="none"/>
      <circle cx="122" cy="336" r="3" fill="${CREAM}"/><circle cx="176" cy="322" r="3" fill="${CREAM}"/>
      <path d="M118 244 L126 250 L118 256 M182 244 L174 250 L182 256" stroke="${PALE}" stroke-width="2.5" fill="none"/>`,

    // XVIII THE MOON — the double moon, twin towers, the long path between
    () => `${rays(150, 168, 52, 68, 16, DEEP, 1.6)}
      <circle cx="150" cy="168" r="42" fill="${CREAM}" opacity="0.14"/>
      <path d="M164 128 A42 42 0 1 0 164 208 A33 42 0 1 1 164 128" fill="${CREAM}"/>
      <circle cx="138" cy="162" r="3" fill="${LAV}" opacity="0.6"/><circle cx="148" cy="182" r="2.4" fill="${LAV}" opacity="0.6"/>
      <rect x="48" y="216" width="30" height="92" fill="${INK}" stroke="${DEEP}" stroke-width="2"/>
      <rect x="222" y="216" width="30" height="92" fill="${INK}" stroke="${DEEP}" stroke-width="2"/>
      <path d="M44 216 L82 216 L74 200 L52 200 Z M218 216 L256 216 L248 200 L226 200 Z" fill="${INK}" stroke="${DEEP}" stroke-width="2"/>
      <path d="M150 376 Q120 340 156 312 Q186 288 150 262 Q126 244 150 224" stroke="${PALE}" stroke-width="3" fill="none" stroke-dasharray="10 7"/>
      ${[[108,236],[192,236],[126,214],[174,214]].map(([x,y]) => `<path d="M${x} ${y} q3 -7 6 0 q-3 9 -6 0" fill="${LAV}"/>`).join("")}
      <ellipse cx="150" cy="368" rx="86" ry="13" fill="${PLUM}"/>
      <path d="M136 368 Q142 356 152 360 Q162 364 158 372" stroke="${LAV}" stroke-width="2.5" fill="none"/>`,

    // XIX THE SUN — full radiance over the sunflower wall
    () => `${rays(150, 190, 58, 86, 12, GOLD, 5)}
      ${rays(150, 190, 58, 80, 12, PALE, 2).replace(/<line/g, '<line transform="rotate(15 150 190)"')}
      <circle cx="150" cy="190" r="52" fill="${GOLD}"/>
      <circle cx="150" cy="190" r="52" fill="none" stroke="${DEEP}" stroke-width="2.5"/>
      <circle cx="150" cy="190" r="38" fill="none" stroke="${DEEP}" stroke-width="1.2" opacity="0.6"/>
      <rect x="24" y="306" width="252" height="26" fill="${PLUM}"/>
      <line x1="24" y1="306" x2="276" y2="306" stroke="${DEEP}" stroke-width="2"/>
      ${[0,1,2,3].map(i => { const x = 66 + i * 56; return `${rays(x, 288, 10, 18, 10, DEEP, 2.5)}<circle cx="${x}" cy="288" r="9" fill="${INK}" stroke="${PALE}" stroke-width="2"/><line x1="${x}" y1="298" x2="${x}" y2="306" stroke="${DEEP}" stroke-width="2.5"/>`; }).join("")}
      <path d="M40 352 Q80 336 120 352 T200 352 T276 348" stroke="${GOLD}" stroke-width="4" fill="none"/>`,

    // XX JUDGEMENT — the horn sounds and everything rises
    () => `<path d="M56 142 Q76 118 104 132 Q116 112 140 122" stroke="${LAV}" stroke-width="3" fill="none" opacity="0.75"/>
      ${rays(190, 150, 26, 44, 9, DEEP, 2)}
      <path d="M112 128 L196 176 L180 196 Z" fill="${INK}" stroke="${GOLD}" stroke-width="2.5" stroke-linejoin="round"/>
      <circle cx="204" cy="188" r="15" fill="none" stroke="${GOLD}" stroke-width="3"/>
      <path d="M112 128 L112 168 M112 148 L134 148" stroke="${PALE}" stroke-width="3"/>
      <rect x="112" y="128" width="22" height="20" fill="none" stroke="${PALE}" stroke-width="2.5"/>
      <path d="M118 134 L128 142 M128 134 L118 142" stroke="${PALE}" stroke-width="2"/>
      ${[[84, 300],[150, 288],[216, 300]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="11" fill="none" stroke="${CREAM}" stroke-width="2.5"/><path d="M${x-14} ${y+40} Q${x} ${y+8} ${x+14} ${y+40}" stroke="${CREAM}" stroke-width="2.5" fill="none"/><path d="M${x-10} ${y+22} L${x-18} ${y+12} M${x+10} ${y+22} L${x+18} ${y+12}" stroke="${CREAM}" stroke-width="2.5"/>`).join("")}
      <path d="M24 356 L84 344 L150 352 L216 344 L276 356 L276 376 L24 376 Z" fill="${PLUM}"/>`,

    // XXI THE WORLD — the laurel complete, the dance at the center
    () => `<ellipse cx="150" cy="240" rx="86" ry="118" fill="none" stroke="${GOLD}" stroke-width="5"/>
      ${[0,1,2,3,4,5,6,7,8,9,10,11].map(i => { const a = (i * 30 + 15) * Math.PI / 180; const x = 150 + 86 * Math.cos(a); const y = 240 + 118 * Math.sin(a); const dx = Math.cos(a + Math.PI / 2) * 12; const dy = Math.sin(a + Math.PI / 2) * 12; return `<path d="M${(x - dx).toFixed(1)} ${(y - dy).toFixed(1)} Q${x.toFixed(1)} ${(y - 14).toFixed(1)} ${(x + dx).toFixed(1)} ${(y + dy).toFixed(1)}" stroke="${DEEP}" stroke-width="2.5" fill="none"/>`; }).join("")}
      <path d="M150 296 Q118 262 150 228 Q182 262 150 296 Z" fill="${LAV}" opacity="0.35"/>
      <circle cx="150" cy="204" r="13" fill="none" stroke="${CREAM}" stroke-width="3"/>
      <path d="M150 217 Q136 244 150 272 Q164 244 150 217" stroke="${CREAM}" stroke-width="3" fill="none"/>
      <line x1="128" y1="238" x2="112" y2="222" stroke="${CREAM}" stroke-width="3" stroke-linecap="round"/>
      <line x1="172" y1="238" x2="188" y2="222" stroke="${CREAM}" stroke-width="3" stroke-linecap="round"/>
      ${star4(112, 218, 5, PALE)}${star4(188, 218, 5, PALE)}
      <path d="M64 130 Q72 118 84 122 M216 130 Q228 118 236 122 M64 350 Q72 362 84 358 M216 350 Q228 362 236 358" stroke="${LAV}" stroke-width="2.5" fill="none"/>`
  ];

  return function (index) {
    return `<svg viewBox="0 0 300 480" role="img" aria-label="Tarot card: ${WOO.tarot[index].name}">
      <defs>
        <linearGradient id="dwGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#F2DCA0"/><stop offset="0.45" stop-color="#C89A3F"/>
          <stop offset="0.55" stop-color="#E8C97A"/><stop offset="1" stop-color="#A87B28"/>
        </linearGradient>
        <radialGradient id="dwSky" cx="0.5" cy="0.36" r="0.85">
          <stop offset="0" stop-color="#2E2352"/><stop offset="0.65" stop-color="#1D163A"/><stop offset="1" stop-color="#120D26"/>
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="300" height="480" rx="18" fill="url(#dwSky)"/>
      <rect x="8" y="8" width="284" height="464" rx="13" fill="none" stroke="url(#dwGold)" stroke-width="4"/>
      <rect x="17" y="17" width="266" height="446" rx="8" fill="none" stroke="#B8892F" stroke-width="1" opacity="0.7"/>
      ${cornerFiligree()}
      ${field(index)}
      ${scenes[index]()}
      <path d="M118 66 L150 52 L182 66 L150 80 Z" fill="none" stroke="url(#dwGold)" stroke-width="2"/>
      <text x="150" y="72" text-anchor="middle" font-family="${SERIF}" font-size="17" fill="#E8C97A">${TAROT_NUMERALS[index]}</text>
      <line x1="60" y1="66" x2="112" y2="66" stroke="#B8892F" stroke-width="1"/>
      <line x1="188" y1="66" x2="240" y2="66" stroke="#B8892F" stroke-width="1"/>
      <rect x="52" y="404" width="196" height="34" rx="6" fill="#120D26" stroke="url(#dwGold)" stroke-width="1.5"/>
      <text x="150" y="426" text-anchor="middle" font-family="${SERIF}" font-size="15" letter-spacing="3" fill="#E8C97A">${WOO.tarot[index].name.toUpperCase()}</text>
      ${star4(40, 421, 5, "#E8C97A")}${star4(260, 421, 5, "#E8C97A")}
    </svg>`;
  };
})();
