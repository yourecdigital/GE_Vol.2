"use client";

import { telegramEmojiSrc, type TelegramEmojiId } from "@/lib/telegram-emoji";

type TelegramEmojiProps = {
  name: TelegramEmojiId;
  size?: number;
  className?: string;
  label?: string;
};

const basePath =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_BASE_PATH
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : "";

export function TelegramEmoji({ name, size = 32, className, label }: TelegramEmojiProps) {
  return (
    <img
      src={telegramEmojiSrc(name, basePath)}
      alt={label ?? ""}
      width={size}
      height={size}
      className={`inline-block shrink-0 object-contain${className ? ` ${className}` : ""}`}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );
}
