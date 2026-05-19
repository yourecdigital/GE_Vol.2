/**
 * Animated Telegram-style emojis (WebP).
 * Assets: Tarikul-Islam-Anik/Telegram-Animated-Emojis — run `npm run telegram-emojis`
 */
export const TELEGRAM_EMOJI_IDS = [
  "fire",
  "herb",
  "rocket",
  "heart",
  "party",
  "gift",
  "fork_plate",
  "bento",
  "flatbread",
  "bun",
  "mushroom",
  "clover",
  "hot_face",
  "stew",
  "fries",
  "sauce",
  "stopwatch",
  "money",
  "compass",
  "check",
  "phone",
  "mobile",
  "speech",
  "wine",
  "meat",
  "cooking",
  "confetti",
  "cart",
] as const;

export type TelegramEmojiId = (typeof TELEGRAM_EMOJI_IDS)[number];

export function telegramEmojiSrc(id: TelegramEmojiId, basePath = ""): string {
  const prefix = basePath.replace(/\/$/, "");
  return `${prefix}/telegram-emojis/${id}.webp`;
}
