/**
 * Классическая стрелка Windows 9x для CSS `cursor:` (data-URI SVG).
 * Hotspot — верхний левый угол (остриё).
 */

const W = 12;
const H = 16;

const COLORS: Record<string, string> = {
  b: "#000000",
  w: "#ffffff",
  s: "#808080",
};

/** 'b' black, 'w' white, 's' shadow #808080, '.' transparent */
const GRID: string[] = [
  "b..........",
  "bw.........",
  "bwwb.......",
  "bwwwb......",
  "bwwwwb.....",
  "bwwwwwb....",
  "bwwwwwwb...",
  "bwwwwwwwb..",
  "bwwwwwwwwb.",
  "bwwwwwwwwwb",
  "bwwbbbwwwwb",
  "bwb.sbwbb...",
  "bb..sbwbb...",
  "....sbwb....",
  "....sbb.....",
  ".....b......",
];

export const WIN98_CURSOR_GRID = GRID;
export const WIN98_CURSOR_W = W;
export const WIN98_CURSOR_H = H;
export const WIN98_CURSOR_COLORS = COLORS;

export const WIN98_CURSOR_SVG_DATA_URI: string = (() => {
  let body = "";
  for (let y = 0; y < H; y++) {
    const row = GRID[y] ?? "";
    for (let x = 0; x < W; x++) {
      const ch = row[x] ?? ".";
      if (ch === ".") continue;
      body += `<rect x="${x}" y="${y}" width="1" height="1" fill="${COLORS[ch] ?? "#000"}"/>`;
    }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="32" height="32">${body}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") 0 0, auto`;
})();
