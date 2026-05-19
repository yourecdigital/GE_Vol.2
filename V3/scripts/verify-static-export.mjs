/**
 * После `next build` (output: "export") Next копирует в out/ только то, что уже есть в public/.
 * Проверяем наличие ключевых медиа-файлов грузинского сайта.
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

/** Обязательные URL-пути — должны существовать в public/ и out/ после экспорта */
const REQUIRED_IN_OUT = [
  "og-image.png",
  "mountains/caucasus-far.png",
  "mountains/caucasus-mid.png",
  "mountains/caucasus-near.png",
  "menu/mangal/kare-yagnenka.png",
  "menu/mangal/myakot-baraniny.png",
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
    "\n❌ В public/ нет файлов, без них статический сайт будет неполным:\n",
    missingPublic.map((f) => `   - public/${f}`).join("\n"),
    "\n\nСкопируйте медиа в public/, затем снова npm run build.\n",
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

console.log("✅ verify-static-export: все обязательные медиа на месте в out/.");
