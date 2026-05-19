/**
 * Downloads animated Telegram emojis (animated WebP) into public/telegram-emojis/
 * Source: https://github.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const BASE =
  "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main";

/** id → path inside repo (exact filenames from GitHub) */
const EMOJIS = {
  fire: "Animals and Nature/Fire.webp",
  herb: "Animals and Nature/Herb.webp",
  rocket: "Travel and Places/Rocket.webp",
  heart: "Symbols/Red Heart.webp",
  party: "Activity/Party Popper.webp",
  gift: "Symbols/Heart With Ribbon.webp",
  fork_plate: "Food and Drink/Fork And Knife With Plate.webp",
  bento: "Food and Drink/Bento Box.webp",
  flatbread: "Food and Drink/Stuffed Flatbread.webp",
  bun: "Food and Drink/Pretzel.webp",
  mushroom: "Animals and Nature/Mushroom.webp",
  clover: "Animals and Nature/Four Leaf Clover.webp",
  hot_face: "Smileys/Hot Face.webp",
  stew: "Food and Drink/Oden.webp",
  fries: "Food and Drink/French Fries.webp",
  sauce: "Food and Drink/Canned Food.webp",
  stopwatch: "Objects/Hourglass Done.webp",
  money: "Objects/Money Bag.webp",
  compass: "Travel and Places/Compass.webp",
  check: "Symbols/Check Mark Button.webp",
  phone: "Objects/Telephone.webp",
  mobile: "Objects/Mobile Phone.webp",
  speech: "Symbols/Speech Balloon.webp",
  wine: "Food and Drink/Wine Glass.webp",
  meat: "Food and Drink/Meat On Bone.webp",
  cooking: "Food and Drink/Cooking.webp",
  confetti: "Activity/Confetti Ball.webp",
  cart: "Objects/Shopping Cart.webp",
};

/** Fallback when emoji is missing from Telegram-Animated-Emojis (🍄 U+1F344) */
const EXTRA_URLS = {
  mushroom:
    "https://fonts.gstatic.com/s/e/notoemoji/latest/1f344/512.webp",
};

const outDir = join(process.cwd(), "public", "telegram-emojis");

function buildUrl(path) {
  return `${BASE}/${path.split("/").map(encodeURIComponent).join("/")}`;
}

async function main() {
  await mkdir(outDir, { recursive: true });
  let ok = 0;
  let fail = 0;

  async function save(id, url, label) {
    const dest = join(outDir, `${id}.webp`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(dest, buf);
    console.log(`✓ ${id} (${Math.round(buf.length / 1024)} KB)${label ? ` — ${label}` : ""}`);
  }

  for (const [id, path] of Object.entries(EMOJIS)) {
    const url = buildUrl(path);
    try {
      await save(id, url);
      ok++;
    } catch {
      if (EXTRA_URLS[id]) {
        try {
          await save(id, EXTRA_URLS[id], "fallback");
          ok++;
          continue;
        } catch (e) {
          console.error(`✗ ${id} (${path}, fallback): ${e.message}`);
        }
      } else {
        console.error(`✗ ${id} (${path})`);
      }
      fail++;
    }
  }

  console.log(`\nDone: ${ok} ok, ${fail} failed`);
  if (fail > 0) process.exit(1);
}

main();
