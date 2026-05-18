/**
 * Сжимает ассеты «уличных листков» в WebP для продакшена.
 * Исходники: public/disco/street-paper-notes-mobile.png, ...-desktop.png
 * Результат: рядом .webp (уменьшенные max-width для слабых сетей).
 *
 * Запуск: npm run assets:street-notes
 */
import { mkdirSync, existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "public", "disco");

const JOBS = [
  {
    base: "street-paper-notes-mobile",
    maxWidth: 520,
    quality: 80,
  },
  {
    base: "street-paper-notes-desktop",
    maxWidth: 960,
    quality: 80,
  },
];

async function run() {
  mkdirSync(root, { recursive: true });

  for (const { base, maxWidth, quality } of JOBS) {
    const pngPath = path.join(root, `${base}.png`);
    if (!existsSync(pngPath)) {
      console.warn(`skip (no file): ${pngPath}`);
      continue;
    }

    const meta = await sharp(pngPath).metadata();
    let pipeline = sharp(pngPath).resize(maxWidth, null, {
      fit: "inside",
      withoutEnlargement: true,
    });

    const webpPath = path.join(root, `${base}.webp`);
    await pipeline
      .webp({ quality, effort: 5, alphaQuality: 88 })
      .toFile(webpPath);

    const outMeta = await sharp(webpPath).metadata();
    console.log(
      base,
      "png",
      `${meta.width}×${meta.height}`,
      "→ webp",
      `${outMeta.width}×${outMeta.height}`,
      `${(statSync(webpPath).size / 1024).toFixed(1)} KB`,
    );
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
