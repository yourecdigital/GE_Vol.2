/**
 * После `next build` (output: "export") Next копирует в out/ только то, что уже есть в public/.
 * Если public/disco или public/images не лежат в репозитории/архиве, билд «успешен», а сайт — без медиа.
 *
 * Отключить: SKIP_VERIFY_EXPORT=1 npm run build
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "out");
const publicDir = path.join(root, "public");

/** Обязательные URL-пути (как в браузере) — должны существовать в out/ после экспорта */
const REQUIRED_IN_OUT = [
  "poster.png",
  "poster.webp",
  "disco/mtv-eurodance-corner.mp4",
  "disco/cassette-orwo.png",
  "disco/cassette-orwo.webp",
  "disco/street-paper-notes-mobile.png",
  "disco/street-paper-notes-mobile.webp",
  "disco/street-paper-notes-desktop.png",
  "disco/street-paper-notes-desktop.webp",
  "images/organizer-deck.png",
  "images/organizer-deck.webp",
  "images/pokemon-pog-cap.png",
  "images/pokemon-pog-cap.webp",
  "cursors/csgo-crosshair-2x.png",
  "cursors/cursor-17-discount.png",
];

function exists(p) {
  try {
    fs.accessSync(p, fs.constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

if (process.env.SKIP_VERIFY_EXPORT === "1") {
  console.log("verify-static-export: пропущено (SKIP_VERIFY_EXPORT=1)");
  process.exit(0);
}

if (!exists(outDir)) {
  console.error("verify-static-export: нет папки out/. Сначала npm run build.");
  process.exit(1);
}

const missingOut = [];
const missingPublic = [];

for (const rel of REQUIRED_IN_OUT) {
  const o = path.join(outDir, rel);
  const p = path.join(publicDir, rel);
  if (!exists(o)) missingOut.push(rel);
  if (!exists(p)) missingPublic.push(rel);
}

if (missingPublic.length) {
  console.error(
    "\n❌ В public/ нет файлов, без них статический сайт будет пустой:\n",
    missingPublic.map((f) => `   - public/${f}`).join("\n"),
    "\n\nСкопируйте медиа в public/ (или клонируйте репозиторий с этими файлами), затем снова npm run build.",
    "\nВидео большое — его часто хранят вне Git (LFS или отдельная загрузка на хостинг в out/disco/).",
    "\n",
  );
  process.exit(1);
}

if (missingOut.length) {
  console.error(
    "\n❌ В out/ отсутствуют файлы после сборки (ожидалось копирование из public/):\n",
    missingOut.map((f) => `   - out/${f}`).join("\n"),
    "\n\nУдалите кэш (.next), проверьте права на файлы и пересоберите: npm run build\n",
  );
  process.exit(1);
}

console.log("verify-static-export: все обязательные медиа на месте в out/.");
