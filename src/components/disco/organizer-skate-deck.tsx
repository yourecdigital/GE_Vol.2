"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import { useMediaQuery } from "@/hooks/use-media-query";
import { EVENT_COPY } from "@/lib/disco-config";
import { cn } from "@/lib/utils";

/** Начало «выезда» деки (легче стартовать раньше 5/6, чтобы успел флип) */
export const ORGANIZER_FLIP_START = 0.72;
/** Плоская доска у верхней границы зоны ~5/6 страницы */
export const ORGANIZER_FLIP_END = 5 / 6;

/** Одна шкала размера и интерлиньяжа для всех строк блока организатора */
const ORG_DECK_LINE =
  "w-full text-balance text-[clamp(0.56rem,3.85cqw,min(1.06rem,5.85cqw))] uppercase leading-[1.05] tracking-[-0.045em]";

/** Две строки: «ИП …» / фамилия имя отчество — единый блок по центру */
function splitOrganizerNameUpper(name: string): [string, string] {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 2) {
    const single = parts.join(" ").toLocaleUpperCase("ru-RU");
    return [single, ""];
  }
  const head = parts.slice(0, 2).join(" ").toLocaleUpperCase("ru-RU");
  const tail = parts.slice(2).join(" ").toLocaleUpperCase("ru-RU");
  return [head, tail];
}

/** Полных оборотов «флипа» по оси X за интервал скролла (в 2 раза меньше, чем 1½ оборота) */
const FLIP_FULL_TURNS = 0.75;
const FLIP_TOTAL_DEG = 360 * FLIP_FULL_TURNS;

function flipDegFromProgress(p: number, reduce: boolean): number {
  if (reduce) return 0;
  if (p < ORGANIZER_FLIP_START) return FLIP_TOTAL_DEG;
  if (p >= ORGANIZER_FLIP_END) return 0;
  const t = (p - ORGANIZER_FLIP_START) / (ORGANIZER_FLIP_END - ORGANIZER_FLIP_START);
  return FLIP_TOTAL_DEG * (1 - t);
}

/** Убираем субпиксельное «мажущее» кольцо в начале/конце флипа (особенно WebKit). */
function snapDeckAngleDeg(deg: number, reduce: boolean): number {
  if (reduce) return deg;
  const nearFlat = 2.25;
  const nearFlip = 3.1;
  if (Math.abs(deg) <= nearFlat) return 0;
  if (Math.abs(deg - FLIP_TOTAL_DEG) <= nearFlip) return FLIP_TOTAL_DEG;
  return deg;
}

/**
 * Фото доски + текст; при «изнанке» к зрителю надписи полностью скрыты (opacity по нормали).
 * Размытие по |sin(угол)| имитирует motion blur при вращении.
 */
export function OrganizerSkateDeck({
  className,
  /** Блок внизу экрана раскрыт (maxHeight > 0) — иначе скролл уже «докручен» и флип не виден */
  revealOpen = false,
}: {
  className?: string;
  revealOpen?: boolean;
}) {
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { scrollYProgress } = useScroll();

  /**
   * Десктоп: spring в паре с Lenis — мягче флип. Мобилка: прямо scrollYProgress (без «двойного»
   * сглаживания и с меньшей задержкой относительно нативного скролла).
   */
  const scrollSmooth = useSpring(scrollYProgress, {
    stiffness: 32,
    damping: 46,
    mass: 1.05,
    restDelta: 0.0012,
  });

  const driveMode = useMotionValue(0);
  useEffect(() => {
    let v = 0;
    if (reduce) v |= 1;
    if (isDesktop) v |= 2;
    driveMode.set(v);
  }, [reduce, isDesktop, driveMode]);

  const drive = useTransform(
    [scrollYProgress, scrollSmooth, driveMode],
    ([raw, smooth, mode]) => {
      const m = mode as number;
      if (m & 1) return raw as number;
      return m & 2 ? (smooth as number) : (raw as number);
    },
  );

  const scrollRotateX = useTransform(drive, (p) =>
    snapDeckAngleDeg(flipDegFromProgress(p, !!reduce), !!reduce),
  );

  /** Выводим угол сюда: при раскрытии панели дорисовываем флип, затем синхрон со скроллом */
  const displayRotateX = useMotionValue(0);

  useLayoutEffect(() => {
    let unsubScroll: (() => void) | undefined;
    let ctrl: ReturnType<typeof animate> | null = null;

    if (!revealOpen) {
      return () => {
        ctrl?.stop();
        unsubScroll?.();
      };
    }

    if (reduce) {
      displayRotateX.set(scrollRotateX.get());
      unsubScroll = scrollRotateX.on("change", (v) => {
        displayRotateX.set(v);
      });
      return () => {
        unsubScroll?.();
      };
    }

    displayRotateX.set(FLIP_TOTAL_DEG);
    const target = scrollRotateX.get();
    ctrl = animate(displayRotateX, target, {
      duration: 0.88,
      ease: [0.22, 1, 0.36, 1],
    });
    void ctrl.then(() => {
      unsubScroll = scrollRotateX.on("change", (v) => {
        displayRotateX.set(v);
      });
      displayRotateX.set(scrollRotateX.get());
    });

    return () => {
      ctrl?.stop();
      unsubScroll?.();
    };
  }, [revealOpen, reduce, displayRotateX, scrollRotateX]);

  const opacity = useTransform(drive, (p) => {
    if (reduce) return p >= ORGANIZER_FLIP_START - 0.04 ? 1 : 0;
    const a = ORGANIZER_FLIP_START - 0.055;
    if (p <= a) return 0;
    if (p >= ORGANIZER_FLIP_START - 0.005) return 1;
    return (p - a) / (ORGANIZER_FLIP_START - 0.005 - a);
  });

  /** 1 = лицевая сторона к зрителю, 0 = перегородка с другой стороны */
  const textFaceOpacity = useTransform(drive, (p) => {
    if (reduce) return 1;
    const deg = flipDegFromProgress(p, false);
    return Math.cos((deg * Math.PI) / 180) > 0 ? 1 : 0;
  });

  /** Motion blur: максимум у «ребра» (90°/270° mod …) */
  const deckSpinBlur = useTransform(drive, (p) => {
    if (reduce) return "none";
    const deg = flipDegFromProgress(p, false);
    const rad = (deg * Math.PI) / 180;
    const px = Math.round(5 * Math.abs(Math.sin(rad)));
    if (px < 1) return "none";
    return `blur(${px}px)`;
  });

  const useSpinBlur = isDesktop && !reduce;

  const [orgHead, orgTail] = splitOrganizerNameUpper(EVENT_COPY.organizer.name);

  return (
    <aside
      className={cn("mx-auto w-full max-w-[min(94vw,580px)] select-none", className)}
      aria-label={`Организатор: ${EVENT_COPY.organizer.name}, ИНН ${EVENT_COPY.organizer.inn}`}
    >
      <div className="relative [perspective:1100px] [transform:translateZ(0)]">
        <motion.div
          className="relative isolate transform-gpu [-webkit-transform-style:preserve-3d]"
          style={{
            opacity,
            rotateX: displayRotateX,
            ...(useSpinBlur ? { filter: deckSpinBlur } : undefined),
            transformOrigin: "50% 50%",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="relative [container-type:inline-size]">
            <picture className="block leading-none">
              <source srcSet="/images/organizer-deck.webp" type="image/webp" />
              <Image
                src="/images/organizer-deck.png"
                width={800}
                height={300}
                sizes="(max-width: 580px) 94vw, 580px"
                className="relative z-[1] block h-auto w-full object-contain shadow-none"
                draggable={false}
                priority={false}
                decoding="async"
                alt=""
              />
            </picture>

            <motion.div
              className={cn(
                "pointer-events-none absolute inset-0 z-[2] flex items-center justify-start",
                "pl-[15%] pr-[30%] sm:pl-[18%] sm:pr-[32%]",
                "text-white"
              )}
              style={{
                opacity: textFaceOpacity,
                transform: "translateZ(0.01px)",
              }}
              aria-hidden
            >
              <div
                className={cn(
                  "mx-auto flex w-full max-w-[min(92%,52cqw)] flex-col items-center text-center text-[#f4f1ea]",
                  "origin-center gap-[0.42cqw]",
                )}
                style={{
                  fontFamily: "var(--font-marker-deck), var(--font-disco-hand), cursive",
                }}
              >
                <p className={ORG_DECK_LINE}>Организатор</p>
                <p className={ORG_DECK_LINE} title={EVENT_COPY.organizer.name}>
                  {orgHead}
                </p>
                {orgTail ? (
                  <p className={ORG_DECK_LINE} title={EVENT_COPY.organizer.name}>
                    {orgTail}
                  </p>
                ) : null}
                <p className={ORG_DECK_LINE}>ИНН&nbsp;{EVENT_COPY.organizer.inn}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </aside>
  );
}
