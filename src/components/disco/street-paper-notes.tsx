"use client";

const BASE = "/disco";

/** Натуральные размеры PNG-фолбэка (мобильный арт) — для CLS и без layout shift */
const MOBILE_NATURAL = { w: 686, h: 1024 };

/**
 * Три листка «с столба» одной картинкой: мобильная и десктопная версии
 * через picture (WebP + lazy).
 */
export function StreetPaperNotes() {
  return (
    <div className="mx-auto w-full max-w-[min(100%,520px)] bg-transparent md:max-w-[min(100%,960px)] [aspect-ratio:520/776] md:[aspect-ratio:960/461] [content-visibility:auto] [contain-intrinsic-size:auto_420px]">
      <picture className="relative block h-full w-full bg-transparent">
        <source
          media="(min-width: 768px)"
          srcSet={`${BASE}/street-paper-notes-desktop.webp`}
          type="image/webp"
        />
        <source
          media="(min-width: 768px)"
          srcSet={`${BASE}/street-paper-notes-desktop.png`}
        />
        <source
          srcSet={`${BASE}/street-paper-notes-mobile.webp`}
          type="image/webp"
        />
        <img
          src={`${BASE}/street-paper-notes-mobile.png`}
          alt="Объявления на столбе: ДК Ломоносов, биржа слухов, от микрохвоста"
          width={MOBILE_NATURAL.w}
          height={MOBILE_NATURAL.h}
          className="h-full w-full bg-transparent object-contain object-center"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          sizes="(min-width: 768px) min(960px, 100vw), min(520px, 100vw)"
        />
      </picture>
    </div>
  );
}
