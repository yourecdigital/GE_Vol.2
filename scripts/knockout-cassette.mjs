/**
 * Убирает светлый студийный фон с фото кассеты (заливка с краёв кадра).
 * Края часто ~220–235 RGB, не #fff — пороги под реальный экспорт.
 * Запуск: node scripts/knockout-cassette.mjs
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const input = path.join(root, "public/disco/cassette-orwo-source.png");
const output = path.join(root, "public/disco/cassette-orwo.png");

const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({
  resolveWithObject: true,
});

const w = info.width;
const h = info.height;
const bytes = new Uint8ClampedArray(data);

const pos = (x, y) => (y * w + x) * 4;
const cell = (x, y) => y * w + x;

/** Светлый низконтрастный фон / мягкая кайма у корпуса кассеты */
function isBackgroundLike(i) {
  const r = bytes[i];
  const g = bytes[i + 1];
  const b = bytes[i + 2];
  const mx = Math.max(r, g, b);
  const mn = Math.min(r, g, b);
  const avg = (r + g + b) / 3;
  if (mx > 200 && mx - mn < 48 && avg > 196) return true;
  if (mx > 185 && mx - mn < 38 && avg > 176) return true;
  return false;
}

const seen = new Uint8Array(w * h);
const q = [];

for (let x = 0; x < w; x++) {
  for (const y of [0, h - 1]) {
    const p = pos(x, y);
    const c = cell(x, y);
    if (!seen[c] && isBackgroundLike(p)) {
      seen[c] = 1;
      q.push([x, y]);
    }
  }
}
for (let y = 0; y < h; y++) {
  for (const x of [0, w - 1]) {
    const p = pos(x, y);
    const c = cell(x, y);
    if (!seen[c] && isBackgroundLike(p)) {
      seen[c] = 1;
      q.push([x, y]);
    }
  }
}

const dirs = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

while (q.length) {
  const [x, y] = q.shift();
  const i = pos(x, y);
  bytes[i + 3] = 0;

  for (const [dx, dy] of dirs) {
    const nx = x + dx;
    const ny = y + dy;
    if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
    const nc = cell(nx, ny);
    if (seen[nc]) continue;
    const ni = pos(nx, ny);
    if (!isBackgroundLike(ni)) continue;
    seen[nc] = 1;
    q.push([nx, ny]);
  }
}

await sharp(Buffer.from(bytes), {
  raw: { width: w, height: h, channels: 4 },
})
  .png({ compressionLevel: 9 })
  .toFile(output);

console.log("OK:", output, `${w}×${h}`);
