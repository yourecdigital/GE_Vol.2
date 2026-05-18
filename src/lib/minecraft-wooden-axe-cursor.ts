/**
 * Курсор мыши: деревянный топор из Minecraft (пиксель‑арт 32×32).
 * Горячая точка — кончик лезвия. Fallback — pointer.
 */
const PALETTE: Record<string, string> = {
  ".": "",
  o: "#0f0b08",
  W: "#f0dcc8",
  w: "#c9a064",
  u: "#a67c3a",
  b: "#4a3018",
  h: "#6b4423",
  H: "#8b5a2b",
};

const GW = 22;
const GH = 18;
const OFF_X = 5;
const OFF_Y = 7;

const GRID = `
.............Wwu.......
............WWwwW......
..........WWwwwwuW.....
.........WWwwwwuwW.....
........hhWWwwwwuW.....
.......hhhWwuwwuw......
......hhhHWWuwwuw......
.....hhhHHWWuwwuw......
....hhhHHWWwuwwuw......
...hhhHHWWwuuwwu.......
..hhhHHWwbbuuwu........
.hhhHHWwbbbuuu.........
..hhHWwbbbbbu..........
...hHwbbbbbb...........
....Hwbbbb.............
.....hbbbb.............
......hbb..............
.......hb..............
`.trim();

/** Клик — у острия рубящей кромки */
const HOTSPOT_X = 20;
const HOTSPOT_Y = 8;

function buildSvgBody(): string {
  const lines = GRID.split("\n");
  let body = "";
  for (let y = 0; y < GH; y++) {
    const row = (lines[y] ?? "").slice(0, GW).padEnd(GW, ".");
    for (let x = 0; x < GW; x++) {
      const ch = row[x] ?? ".";
      const fill = PALETTE[ch];
      if (!fill) continue;
      body += `<rect x="${x + OFF_X}" y="${y + OFF_Y}" width="1" height="1" fill="${fill}"/>`;
    }
  }
  return body;
}

const svgInner = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">${buildSvgBody()}</svg>`;

export const MINECRAFT_WOODEN_AXE_CURSOR = `url("data:image/svg+xml,${encodeURIComponent(svgInner)}") ${HOTSPOT_X} ${HOTSPOT_Y}, pointer`;

/* ─── Верстак (интерактив при наведении) ─── */

const CPL = 22;
const CP_LINES = 17;
const COFF_X = 5;
const COFF_Y = 8;

const CRAFT_GRID = `
......oooooooo......
.....oPPPPPPPPo.....
....oPGgggGgGGo.....
....oGgGGgGgGGo.....
....oGgGGgGgGGo.....
....oPGgggGgGGo.....
....oPPPPPPPPo......
....oooooooooo......
...ooppppppppoo.....
...ooppppppppoo.....
..oooppppppppooo....
..oooppppppppooo....
..oooppppppppooo....
...ooppppppppoo.....
...ooppppppppoo.....
....ooppppppo.......
....o........o......
`.trim();

const CPAL: Record<string, string> = {
  ".": "",
  o: "#1a0f08",
  P: "#c4a060",
  p: "#8b5a2b",
  G: "#5c3d22",
  g: "#3d2818",
};

const CRAFT_HOT_X = 16;
const CRAFT_HOT_Y = 14;

function buildCraftBody(): string {
  const lines = CRAFT_GRID.split("\n");
  let body = "";
  for (let y = 0; y < CP_LINES; y++) {
    const row = (lines[y] ?? "").slice(0, CPL).padEnd(CPL, ".");
    for (let x = 0; x < CPL; x++) {
      const ch = row[x] ?? ".";
      const fill = CPAL[ch];
      if (!fill) continue;
      body += `<rect x="${x + COFF_X}" y="${y + COFF_Y}" width="1" height="1" fill="${fill}"/>`;
    }
  }
  return body;
}

const craftSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">${buildCraftBody()}</svg>`;

/** Верстак — «тут крафтят»; hotspot на сетке 3×3 */
export const MINECRAFT_CRAFTING_TABLE_CURSOR = `url("data:image/svg+xml,${encodeURIComponent(craftSvg)}") ${CRAFT_HOT_X} ${CRAFT_HOT_Y}, pointer`;
