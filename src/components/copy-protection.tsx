"use client";

import { useEffect } from "react";

/** Блокирует копирование/вырезание текста на уровне документа (надёжнее, чем только CSS). */
export function CopyProtection() {
  useEffect(() => {
    const block = (e: ClipboardEvent) => {
      e.preventDefault();
    };
    document.addEventListener("copy", block, true);
    document.addEventListener("cut", block, true);
    return () => {
      document.removeEventListener("copy", block, true);
      document.removeEventListener("cut", block, true);
    };
  }, []);

  return null;
}
