/**
 * Open Gym — equipment illustrations.
 *
 * Hand-authored SVG schematics (240×160, ground at y=134). The style is a
 * printed field-guide plate: deep-green frame, terracotta pads, one ink figure
 * showing the working posture. Vector on purpose — it stays sharp at 320 px,
 * weighs nothing offline, and cannot misrepresent a brand product.
 */

const FRAME = "#33463F";
const METAL = "#7C8C82";
const PAD = "#B04A28";
const PAD_DARK = "#8A3A20";
const INK = "#1F1C17";

const frame = (d: string, w = 8) =>
  `<path d="${d}" fill="none" stroke="${FRAME}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;

const thin = (d: string, w = 3) =>
  `<path d="${d}" fill="none" stroke="${METAL}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;

const bar = (x1: number, y1: number, x2: number, y2: number, w = 5) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${FRAME}" stroke-width="${w}" stroke-linecap="round"/>`;

const pad = (x: number, y: number, w: number, h: number, r = 5, fill = PAD) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"/>`;

const pivot = (x: number, y: number, r = 5) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${FRAME}"/>`;

const wheel = (x: number, y: number, r: number, w = 6) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${FRAME}" stroke-width="${w}"/>`;

const fig = (d: string, w = 7) =>
  `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;

const head = (x: number, y: number, r = 7) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${INK}"/>`;

const arc = (d: string, w = 2.5) =>
  `<path d="${d}" fill="none" stroke="${PAD}" stroke-width="${w}" stroke-linecap="round" stroke-dasharray="1 6"/>`;

export const ART: Record<string, string> = {
  /* ---------------- cardio ---------------- */

  "air-walker": `
    ${frame("M64 134 V46 H176 V134")}
    ${frame("M120 54 L98 104", 6)}
    ${frame("M120 54 L142 104", 6)}
    ${pivot(120, 50, 6)}
    ${pad(84, 100, 28, 9)}
    ${pad(128, 100, 28, 9)}
    ${bar(78, 66, 78, 92, 5)}
    ${bar(162, 66, 162, 92, 5)}
    ${head(146, 58)}
    ${fig("M146 65 L146 92 M146 92 L140 104 M146 74 L160 80 M146 74 L130 82")}
  `,

  "moon-walker": `
    ${frame("M66 134 V50 H174 V134")}
    ${frame("M120 56 C96 66 88 92 90 112", 6)}
    ${frame("M120 56 C144 66 152 92 150 112", 6)}
    ${pivot(120, 52, 6)}
    ${pad(78, 110, 28, 8)}
    ${pad(134, 110, 28, 8)}
    ${pad(106, 74, 28, 8)}
    ${head(124, 54)}
    ${fig("M124 61 L120 84 M120 84 L112 96 L108 110 M120 84 L130 96 L142 108 M122 68 L106 74 M122 68 L140 76")}
  `,

  "cross-trainer": `
    ${frame("M60 134 H180")}
    ${frame("M124 134 V62")}
    ${wheel(158, 108, 26)}
    ${pivot(158, 108, 4)}
    ${frame("M124 62 L96 96", 6)}
    ${frame("M124 62 L150 92", 6)}
    ${thin("M96 96 L74 108", 7)}
    ${thin("M150 92 L172 104", 7)}
    ${pad(62, 106, 24, 8)}
    ${pad(164, 102, 24, 8)}
    ${head(126, 60)}
    ${fig("M126 67 L122 92 M122 92 L108 106 M122 92 L136 104 M124 74 L98 84 M124 74 L152 82")}
  `,

  rider: `
    ${frame("M62 134 H182")}
    ${frame("M104 134 L112 92 M166 134 V80")}
    ${pad(96, 84, 34, 9)}
    ${pad(88, 74, 10, 16, 4)}
    ${bar(154, 80, 182, 80, 6)}
    ${frame("M120 92 L104 116", 5)}
    ${frame("M120 92 L138 118", 5)}
    ${pad(94, 114, 22, 8)}
    ${pad(132, 116, 22, 8)}
    ${head(130, 56)}
    ${fig("M130 63 L120 84 M120 84 L110 96 L104 104 M120 84 L134 96 L140 104 M126 70 L146 78 M126 70 L110 76")}
  `,

  stepper: `
    ${frame("M70 134 V44 H170 V134")}
    ${frame("M92 134 L92 78", 6)}
    ${frame("M148 134 L148 78", 6)}
    ${pad(76, 74, 34, 9)}
    ${pad(132, 88, 34, 9)}
    ${bar(70, 62, 70, 84, 5)}
    ${bar(170, 62, 170, 84, 5)}
    ${head(120, 46)}
    ${fig("M120 53 L118 80 M118 80 L100 90 L92 104 M118 80 L138 92 L142 88 M119 60 L84 68 M119 60 L158 70")}
  `,

  "exercise-bike": `
    ${frame("M58 134 H184")}
    ${frame("M92 134 L104 92 M160 134 V84")}
    ${wheel(152, 112, 24)}
    ${pivot(152, 112, 4)}
    ${pad(84, 84, 36, 9)}
    ${pad(80, 96, 9, 12, 3, PAD_DARK)}
    ${bar(160, 84, 186, 72, 6)}
    ${frame("M104 96 L134 104", 5)}
    ${pivot(134, 104, 4)}
    ${head(110, 58)}
    ${fig("M110 65 L100 86 M100 86 L118 98 L130 104 M100 86 L90 100 M106 72 L150 74 M106 72 L94 80")}
  `,

  /* ---------------- mobility ---------------- */

  pendulum: `
    ${frame("M74 134 V40 H166")}
    ${frame("M162 40 V134")}
    ${pivot(120, 46, 6)}
    ${frame("M120 46 L120 104", 6)}
    ${pad(108, 100, 24, 8)}
    ${bar(74, 72, 74, 104, 5)}
    ${bar(150, 72, 150, 104, 5)}
    ${arc("M96 118 C104 130 130 132 142 120")}
    ${head(120, 58)}
    ${fig("M120 64 L122 88 M122 88 L126 102 M122 88 L108 100 M120 72 L104 80 M120 72 L136 78")}
  `,

  twister: `
    ${frame("M120 134 V48")}
    ${pad(84, 118, 72, 12, 6)}
    ${pivot(120, 118, 5)}
    ${wheel(120, 62, 22, 5)}
    ${bar(98, 62, 142, 62, 4)}
    ${bar(120, 40, 120, 84, 4)}
    ${arc("M76 104 C84 118 96 124 108 126")}
    ${arc("M164 104 C156 118 144 124 132 126")}
    ${head(120, 52)}
    ${fig("M120 58 L120 84 M120 84 L110 96 L104 112 M120 84 L130 96 L136 112 M118 66 L96 60 M118 66 L144 60")}
  `,

  "waist-bend": `
    ${frame("M120 134 V54")}
    ${frame("M120 54 C96 54 88 70 88 88", 6)}
    ${frame("M120 54 C144 54 152 70 152 88", 6)}
    ${bar(96, 82, 96, 98, 4)}
    ${bar(144, 82, 144, 98, 4)}
    ${arc("M150 108 C158 118 168 120 178 118")}
    ${head(118, 60)}
    ${fig("M118 66 L110 88 M110 88 L104 112 M110 88 L120 110 M114 74 L96 88 M114 74 L136 66 M110 88 L122 96")}
  `,

  "ski-walker": `
    ${frame("M56 134 H184")}
    ${frame("M76 134 V44 H164 V134")}
    ${bar(66, 60, 66, 92, 5)}
    ${bar(174, 60, 174, 92, 5)}
    ${pad(66, 122, 40, 7)}
    ${pad(126, 122, 44, 7)}
    ${head(112, 50)}
    ${fig("M112 57 L104 84 M104 84 L96 104 L88 122 M104 84 L120 106 L128 122 M108 64 L86 78 M108 64 L132 76")}
  `,

  "treadmill-rollers": `
    ${frame("M54 134 H186")}
    ${frame("M54 118 H186")}
    ${frame("M64 118 V80 M96 118 V80 M128 118 V80 M160 118 V80", 3)}
    ${wheel(58, 124, 7, 4)}
    ${wheel(182, 124, 7, 4)}
    ${bar(70, 80, 70, 62, 5)}
    ${bar(170, 80, 170, 62, 5)}
    ${head(118, 44)}
    ${fig("M118 51 L116 78 M116 78 L102 96 L96 112 M116 78 L132 94 L140 110 M114 58 L136 58 M114 58 L100 64")}
  `,

  /* ---------------- upper ---------------- */

  "chest-press": `
    ${frame("M62 134 H182")}
    ${frame("M96 134 V56")}
    ${frame("M96 56 L96 108", 6)}
    ${pad(86, 62, 9, 26, 3, PAD_DARK)}
    ${pad(86, 96, 40, 9)}
    ${frame("M126 88 H166", 6)}
    ${pad(160, 78, 9, 24, 4)}
    ${head(112, 56)}
    ${fig("M112 63 L106 86 M106 86 L110 96 M106 86 L118 96 M110 70 L142 82 M110 70 L142 74")}
  `,

  "shoulder-press": `
    ${frame("M62 134 H182")}
    ${frame("M104 134 V54")}
    ${pad(92, 58, 9, 24, 3, PAD_DARK)}
    ${pad(92, 94, 42, 9)}
    ${frame("M134 86 L158 86 M158 86 L158 66", 6)}
    ${pad(150, 58, 22, 8)}
    ${head(116, 50)}
    ${fig("M116 57 L112 82 M112 82 L116 94 M112 82 L126 94 M114 66 L138 62 M114 66 L110 44 M110 44 L122 40")}
  `,

  "lat-pulldown": `
    ${frame("M62 134 H182")}
    ${frame("M146 134 V40 H80")}
    ${pivot(80, 40, 5)}
    ${thin("M80 44 L80 68", 3)}
    ${bar(60, 68, 100, 68, 5)}
    ${pad(90, 96, 38, 9)}
    ${frame("M86 134 L96 96", 5)}
    ${head(112, 62)}
    ${fig("M112 69 L110 90 M110 90 L104 96 M110 90 L120 96 M110 76 L96 64 M110 76 L124 64")}
  `,

  "seated-row": `
    ${frame("M60 134 H182")}
    ${pad(84, 100, 44, 10)}
    ${frame("M84 110 L84 134", 6)}
    ${frame("M150 134 V78", 7)}
    ${pad(140, 74, 22, 20, 4)}
    ${thin("M112 104 L136 78", 4)}
    ${head(122, 66)}
    ${fig("M122 73 L110 96 M110 96 L98 104 M110 96 L108 110 M120 80 L140 88 M120 80 L136 96")}
  `,

  "rowing-machine": `
    ${frame("M54 134 H188")}
    ${frame("M54 118 H188", 6)}
    ${pad(96, 110, 40, 9)}
    ${frame("M88 118 L96 110 M144 118 L136 110", 4)}
    ${frame("M60 118 V86", 6)}
    ${pad(52, 80, 9, 26, 4)}
    ${pivot(72, 92, 4)}
    ${thin("M72 92 L118 78", 4)}
    ${head(118, 52)}
    ${fig("M118 59 L108 84 M108 84 L114 106 L134 112 M108 84 L96 100 M114 68 L88 88 M114 68 L136 82")}
  `,

  "arm-wheel": `
    ${frame("M62 134 V44 H178 V134")}
    ${wheel(96, 78, 20, 6)}
    ${wheel(156, 78, 20, 6)}
    ${bar(96, 78, 96, 70, 4)}
    ${bar(156, 78, 156, 70, 4)}
    ${pivot(120, 96, 4)}
    ${head(120, 52)}
    ${fig("M120 59 L120 84 M120 84 L110 98 L104 112 M120 84 L130 98 L136 112 M116 68 L96 74 M116 68 L156 72")}
    ${arc("M78 100 C86 108 92 112 98 112")}
  `,

  "pull-up-bar": `
    ${frame("M74 134 V36")}
    ${frame("M166 134 V36")}
    ${bar(64, 36, 176, 36, 8)}
    ${thin("M80 44 V56 M160 44 V56", 3)}
    ${head(120, 56)}
    ${fig("M120 63 L120 88 M120 88 L110 108 M120 88 L130 108 M118 70 L104 50 M118 70 L136 50")}
  `,

  "parallel-bars": `
    ${frame("M62 134 V64")}
    ${frame("M92 134 V64")}
    ${frame("M148 134 V64")}
    ${frame("M178 134 V64")}
    ${bar(56, 64, 98, 64, 8)}
    ${bar(142, 64, 184, 64, 8)}
    ${head(120, 44)}
    ${fig("M120 51 L118 80 M118 80 L110 104 M118 80 L128 104 M116 58 L102 64 M116 58 L140 64")}
  `,

  "push-up-bars": `
    ${frame("M64 134 H180")}
    ${frame("M78 110 V78")}
    ${frame("M162 110 V78")}
    ${bar(66, 78, 174, 78, 8)}
    ${head(92, 74)}
    ${fig("M92 81 C104 92 138 92 156 84 M100 90 L96 112 M132 90 L138 110 M104 86 L84 78 M140 86 L168 78")}
  `,

  /* ---------------- lower ---------------- */

  "leg-press": `
    ${frame("M60 134 H184")}
    ${pad(78, 96, 40, 10)}
    ${pad(72, 78, 10, 26, 4, PAD_DARK)}
    ${frame("M108 100 L142 86", 6)}
    ${frame("M150 134 L150 68", 6)}
    ${pad(140, 60, 20, 34, 5)}
    ${head(88, 72)}
    ${fig("M88 79 L96 96 M96 96 L124 92 L142 88 M96 96 L108 104 M92 84 L104 76")}
  `,

  "leg-extension": `
    ${frame("M62 134 H182")}
    ${pad(88, 96, 40, 10)}
    ${pad(82, 78, 10, 26, 4, PAD_DARK)}
    ${frame("M96 134 V110", 6)}
    ${pivot(132, 96, 6)}
    ${frame("M132 96 L156 74", 7)}
    ${pad(148, 66, 20, 12, 5)}
    ${head(94, 70)}
    ${fig("M94 77 L106 96 M106 96 L130 96 M106 96 L114 108 M100 84 L118 78")}
  `,

  "hip-adductor": `
    ${frame("M60 134 H180")}
    ${pad(92, 92, 56, 10)}
    ${frame("M96 134 V102", 6)}
    ${frame("M146 134 V102", 6)}
    ${pad(78, 74, 14, 24, 6)}
    ${pad(152, 74, 14, 24, 6)}
    ${arc("M92 88 L78 84")}
    ${arc("M152 88 L166 84")}
    ${head(120, 62)}
    ${fig("M120 69 L120 92 M120 92 L106 100 M120 92 L134 100 M118 76 L98 76 M118 76 L142 76")}
  `,

  "calf-raise": `
    ${frame("M70 134 V44 H170 V134")}
    ${pad(96, 116, 52, 10, 3)}
    ${pad(108, 108, 28, 8, 2, PAD_DARK)}
    ${bar(70, 66, 70, 96, 5)}
    ${bar(170, 66, 170, 96, 5)}
    ${head(124, 48)}
    ${fig("M124 55 L122 82 M122 82 L118 100 L116 108 M122 82 L130 100 L132 108 M120 62 L100 74 M120 62 L148 74")}
    ${arc("M156 116 C162 108 162 100 158 94")}
  `,

  /* ---------------- core ---------------- */

  "sit-up-board": `
    ${frame("M64 134 L174 96")}
    ${frame("M64 134 V110 M174 96 V72", 6)}
    ${pad(78, 124, 34, 7)}
    ${pad(148, 92, 30, 7)}
    ${bar(76, 100, 92, 104, 4)}
    ${head(150, 70)}
    ${fig("M150 77 L126 92 M126 92 L104 110 M126 92 L112 104 M144 82 L120 74 M144 82 L136 96")}
  `,

  "back-extension": `
    ${frame("M62 134 H178")}
    ${frame("M84 134 V104", 6)}
    ${frame("M150 134 V86", 6)}
    ${frame("M84 104 L150 84", 6)}
    ${pad(96, 100, 34, 8)}
    ${pad(138, 80, 26, 8)}
    ${head(164, 74)}
    ${fig("M164 81 L138 90 M138 90 L112 100 M112 100 L92 108 M138 90 L146 108 M138 90 L152 104 M156 86 L172 92 M156 86 L170 80")}
  `,

  /* ---------------- stretch / balance / play ---------------- */

  "stretch-station": `
    ${frame("M76 134 V36")}
    ${frame("M164 134 V36")}
    ${bar(68, 36, 172, 36, 7)}
    ${bar(76, 66, 164, 66, 5)}
    ${bar(76, 94, 164, 94, 5)}
    ${pad(108, 118, 24, 8)}
    ${head(96, 58)}
    ${fig("M96 65 L104 90 M104 90 L96 112 L92 120 M104 90 L116 110 L112 120 M96 72 L82 66 M100 78 L120 78")}
  `,

  "shoulder-wheel": `
    ${frame("M78 134 V40 H164 V134")}
    ${wheel(122, 84, 30, 6)}
    ${pivot(122, 84, 5)}
    ${bar(122, 84, 122, 62, 5)}
    ${head(122, 44)}
    ${fig("M122 51 L120 92 M120 92 L108 112 M120 92 L132 112 M116 60 L122 74 M116 60 L138 54")}
    ${arc("M100 60 C106 52 114 50 122 50")}
  `,

  "balance-beam": `
    ${frame("M52 134 V110")}
    ${frame("M188 134 V110")}
    ${bar(44, 110, 196, 110, 10)}
    ${head(126, 56)}
    ${fig("M126 63 L124 92 M124 92 L112 110 M124 92 L138 110 M122 70 L96 62 M122 70 L154 64")}
  `,

  "monkey-bars": `
    ${frame("M66 134 V34")}
    ${frame("M174 134 V34")}
    ${bar(58, 34, 182, 34, 7)}
    ${bar(58, 56, 182, 56, 7)}
    ${bar(58, 78, 182, 78, 7)}
    ${head(124, 56)}
    ${fig("M124 63 L124 88 M124 88 L112 108 M124 88 L136 108 M122 70 L108 50 M122 70 L140 50")}
  `,

  "climbing-net": `
    ${frame("M62 134 V34")}
    ${frame("M178 134 V34")}
    ${thin("M62 40 L178 134 M178 40 L62 134", 3)}
    ${thin("M62 68 L178 68 M62 96 L178 96 M84 34 L84 134 M120 34 L120 134 M156 34 L156 134", 3)}
    ${head(120, 62)}
    ${fig("M120 69 L118 92 M118 92 L106 106 M118 92 L130 106 M116 76 L96 64 M116 76 L140 60")}
  `,

  /* ---------------- multi ---------------- */

  "multi-gym": `
    ${frame("M58 134 V36 H182 V134")}
    ${bar(58, 56, 182, 56, 6)}
    ${pad(88, 100, 46, 9)}
    ${frame("M88 134 V109", 6)}
    ${frame("M150 134 V84", 6)}
    ${pad(138, 74, 26, 8)}
    ${pivot(150, 100, 5)}
    ${frame("M150 100 L172 92", 5)}
    ${pad(168, 86, 16, 10, 4)}
    ${head(104, 66)}
    ${fig("M104 73 L98 98 M98 98 L100 109 M98 98 L110 109 M102 80 L84 62 M102 80 L124 88")}
  `,
};

export const hasArt = (id: string) => Object.prototype.hasOwnProperty.call(ART, id);
