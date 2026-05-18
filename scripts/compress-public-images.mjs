/**
 * Сжатие растров под продакшен (WebP, целевой потолок ~0.45 МБ на файл).
 * Аналог «TinyPNG» на базе sharp — без внешних API.
 *
 * Запуск: npm run assets:compress
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");

/** Верхняя граница размера файла (~0.45 МБ; в диапазоне 0.3–0.5 МБ по запросу) */
const MAX_BYTES = Math.floor(0.45 * 1024 * 1024);

/** Вход (относительно public/) → выход .webp (рядом или явный путь) */
const JOBS = [
  ["poster.png", "poster.webp"],
  ["disco/cassette-orwo.png", "disco/cassette-orwo.webp"],
  ["images/pokemon-pog-cap.png", "images/pokemon-pog-cap.webp"],
  ["images/organizer-deck.png", "images/organizer-deck.webp"],
  ["disco/street-paper-notes-mobile.png", "disco/street-paper-notes-mobile.webp"],
  ["disco/street-paper-notes-desktop.png", "disco/street-paper-notes-desktop.webp"],
];

async function webpUnderBudget(absIn, absOut) {
  const input = await fs.readFile(absIn);
  const meta = await sharp(input).metadata();
  let width = meta.width ?? 1600;
  let quality = 86;
  let buf = null;

  for (let i = 0; i < 22; i++) {
    buf = await sharp(input)
      .rotate()
      .resize({
        width,
        withoutEnlargement: true,
        fit: "inside",
      })
      .webp({
        quality,
        effort: 5,
        smartSubsample: true,
        alphaQuality: quality > 70 ? 85 : 75,
      })
      .toBuffer();

    if (buf.length <= MAX_BYTES) break;
    if (quality > 52) quality -= 4;
    else width = Math.max(480, Math.floor(width * 0.88));
  }

  await fs.mkdir(path.dirname(absOut), { recursive: true });
  await fs.writeFile(absOut, buf);
  const inStat = await fs.stat(absIn);
  const tag =
    buf.length <= MAX_BYTES ? "ok" : `warn>${Math.round(MAX_BYTES / 1024)}KB`;
  console.log(
    path.relative(publicDir, absOut),
    `${(buf.length / 1024).toFixed(1)} KB`,
    `(was ${(inStat.size / 1024).toFixed(1)} KB png)`,
    tag,
  );
}

async function main() {
  for (const [inp, out] of JOBS) {
    const absIn = path.join(publicDir, inp);
    const absOut = path.join(publicDir, out);
    try {
      await fs.access(absIn);
    } catch {
      console.warn("skip (missing):", inp);
      continue;
    }
    await webpUnderBudget(absIn, absOut);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
