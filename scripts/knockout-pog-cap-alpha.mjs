/**
 * Чёрный квадратный мат за круглым POG — делаем прозрачным (краевой flood-fill).
 * Запуск: node scripts/knockout-pog-cap-alpha.mjs
 */
import { existsSync, renameSync, unlinkSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imgDir = path.join(__dirname, "..", "public", "images");

function isMatte(r, g, b) {
  return r < 22 && g < 22 && b < 22;
}

async function knockoutToPng(inFile, outFile) {
  if (!existsSync(inFile)) {
    console.warn("skip (missing):", inFile);
    return;
  }

  const { data, info } = await sharp(inFile)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;
  const visited = new Uint8Array(w * h);
  const q = [];

  function tryPush(x, y) {
    if (x < 0 || x >= w || y < 0 || y >= h) return;
    const p = y * w + x;
    if (visited[p]) return;
    const i = p * 4;
    if (!isMatte(data[i], data[i + 1], data[i + 2])) return;
    visited[p] = 1;
    q.push(p);
  }

  for (let x = 0; x < w; x++) {
    tryPush(x, 0);
    tryPush(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    tryPush(0, y);
    tryPush(w - 1, y);
  }

  while (q.length) {
    const p = q.pop();
    const x = p % w;
    const y = Math.floor(p / w);
    if (x > 0) tryPush(x - 1, y);
    if (x + 1 < w) tryPush(x + 1, y);
    if (y > 0) tryPush(x, y - 1);
    if (y + 1 < h) tryPush(x, y + 1);
  }

  let cleared = 0;
  for (let p = 0; p < w * h; p++) {
    if (visited[p]) {
      data[p * 4 + 3] = 0;
      cleared++;
    }
  }

  const tmpFile = `${outFile}.tmp.${process.pid}.png`;

  await sharp(data, {
    raw: { width: w, height: h, channels: 4 },
  })
    .png({ compressionLevel: 9, effort: 10 })
    .toFile(tmpFile);

  try {
    unlinkSync(outFile);
  } catch {
    /* ok */
  }
  renameSync(tmpFile, outFile);

  const outWebp = outFile.replace(/\.png$/i, ".webp");
  await sharp(outFile)
    .webp({ quality: 88, effort: 5, alphaQuality: 92 })
    .toFile(`${outWebp}.tmp.${process.pid}`);

  try {
    unlinkSync(outWebp);
  } catch {
    /* ok */
  }
  renameSync(`${outWebp}.tmp.${process.pid}`, outWebp);

  console.log(
    path.basename(outFile),
    `${w}×${h}`,
    `cleared ${cleared} (${((100 * cleared) / (w * h)).toFixed(1)}%)`,
    "+ webp",
  );
}

const png = path.join(imgDir, "pokemon-pog-cap.png");
await knockoutToPng(png, png);
