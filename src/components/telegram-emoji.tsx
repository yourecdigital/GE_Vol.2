"use client";

import { cn } from "@/lib/utils";
import { telegramEmojiSrc, type TelegramEmojiId } from "@/lib/telegram-emoji";

type TelegramEmojiProps = {
  name: TelegramEmojiId;
  size?: number;
  className?: string;
  /** Decorative — no alt text */
  label?: string;
};

export function TelegramEmoji({
  name,
  size = 32,
  className,
  label,
}: TelegramEmojiProps) {
  const basePath =
    typeof process !== "undefined" && process.env.NEXT_PUBLIC_BASE_PATH
      ? process.env.NEXT_PUBLIC_BASE_PATH
      : "";

  return (
    <img
      src={telegramEmojiSrc(name, basePath)}
      alt={label ?? ""}
      width={size}
      height={size}
      className={cn("inline-block shrink-0 object-contain", className)}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );
}
