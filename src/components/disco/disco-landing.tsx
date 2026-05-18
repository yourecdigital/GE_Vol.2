"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef, useLayoutEffect, type RefObject } from "react";

import { buttonVariants } from "@/components/ui/button";
import { CassetteTapeCard } from "@/components/disco/cassette-tape-card";
import { FireworksBackground } from "@/components/disco/fireworks";
import { FloatingScreenBubbles } from "@/components/disco/floating-screen-bubbles";
import { HeroStreetScene } from "@/components/disco/hero-street-scene";
import { KineticLetters, useKeyboardGlitch } from "@/components/disco/kinetic-letters";
import { MtvCornerPlayer } from "@/components/disco/mtv-corner-player";
import {
  OrganizerSkateDeck,
  ORGANIZER_FLIP_START,
} from "@/components/disco/organizer-skate-deck";
import { PosterBanditBlock } from "@/components/disco/poster-bandit";
import { RepostTelegramStrip } from "@/components/disco/repost-telegram-strip";
import { VhsCamcorderDateStamp } from "@/components/disco/vhs-date-stamp";
import { VhsOverlay } from "@/components/disco/vhs-overlay";
import {
  EVENT_COPY,
  QTICKETS_URL,
  QUOTE_BLOCK,
  TELEGRAM_REPOST_URL,
} from "@/lib/disco-config";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

const StreetPaperNotes = dynamic(
  () =>
    import("@/components/disco/street-paper-notes").then((m) => ({
      default: m.StreetPaperNotes,
    })),
  {
    loading: () => (
      <div
        className="mx-auto min-h-[min(76vw,420px)] w-full max-w-[520px] bg-transparent md:max-w-[960px] md:min-h-[min(46vw,280px)]"
        aria-hidden
      />
    ),
  },
);

export function DiscoLanding() {
  const reduce = useReducedMotion();
  const glitch = useKeyboardGlitch(true);
  const scrollRootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleLineMeasureRef = useRef<HTMLDivElement>(null);
  const streetNotesAlignRef = useRef<HTMLDivElement>(null);
  const [titleLineWidthPx, setTitleLineWidthPx] = useState<number | null>(null);
  const wideHero = useMediaQuery("(min-width: 768px)");

  useLayoutEffect(() => {
    const el = titleLineMeasureRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const update = () => {
      const w = Math.round(el.getBoundingClientRect().width * 100) / 100;
      if (w > 0) setTitleLineWidthPx(w);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={scrollRootRef}
      className="relative min-h-svh bg-[#0b0908] text-white"
    >
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.07] mix-blend-soft-light"
        aria-hidden
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="disco-rave-mesh" aria-hidden />
      <div className="disco-cyber-grid" aria-hidden />
      <FireworksBackground />
      <FloatingScreenBubbles scrollRootRef={scrollRootRef} />
      <VhsOverlay />

      <motion.header
        className="fixed left-0 right-0 top-0 z-[70] flex items-center justify-between gap-3 border-b border-[#ff7a3d]/45 bg-black/50 px-3 py-3 shadow-[0_10px_48px_rgba(0,0,0,0.72),0_0_32px_rgba(255,90,40,0.14)] max-md:backdrop-blur-none md:border-[#ff9a4d]/35 md:bg-black/30 md:px-6 md:backdrop-blur-md lg:px-8"
        style={{
          background:
            "linear-gradient(to bottom, rgba(22,6,4,0.96), rgba(12,4,3,0.82), transparent)",
        }}
        initial={{ y: -48 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex min-w-0 flex-col gap-1">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffb366]/95 md:text-xs"
            style={{ fontFamily: "var(--font-disco-display)" }}
          >
            Ломоносов · {EVENT_COPY.venueName}
          </span>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-xs text-white/70">{EVENT_COPY.age} · секретный сет</span>
            <span className="hidden h-3 w-px bg-[#ff4460]/50 sm:block" aria-hidden />
            <span className="hidden items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-[#7df4ff]/90 sm:flex">
              <span className="rounded border border-[#00e8d5]/45 bg-black/45 px-1 py-px text-[8px] text-[#a8fffa]">
                CRT
              </span>
              <span className="rounded border border-[#e31837]/55 bg-black/45 px-1 py-px text-[8px] text-[#ff9a9a]">
                LAN
              </span>
              <span className="rounded border border-amber-300/45 bg-black/40 px-1 py-px text-[8px] text-amber-100/90">
                56k
              </span>
            </span>
          </div>
        </div>
        <motion.span
          className="shrink-0 rounded border border-[#ff9a40]/90 bg-gradient-to-br from-[#2a1208] to-black/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#ffe8c4] shadow-[0_0_26px_rgba(255,120,50,0.45),inset_0_1px_0_rgba(255,220,180,0.12)] md:text-xs"
          animate={
            reduce
              ? undefined
              : {
                  scale: [1, 1.04, 1],
                  boxShadow: [
                    "0 0 0 rgba(255,90,40,0)",
                    "0 0 22px rgba(255,200,80,0.35), 0 0 34px rgba(255,60,30,0.65)",
                    "0 0 0 rgba(255,90,40,0)",
                  ],
                }
          }
          transition={{ duration: 2.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          {EVENT_COPY.age}
        </motion.span>
      </motion.header>

      <HeroStreetScene ref={heroRef}>
        <motion.div
          className="pointer-events-none relative z-10 flex w-full shrink-0 flex-col items-center px-0 sm:px-1"
          style={{
            transform: `translateX(${glitch.shift}) skewX(${glitch.skew})`,
          }}
        >
          <RepostTelegramStrip
            className="pointer-events-auto shrink-0 !mb-4 md:!mb-5"
            matchWidthPx={titleLineWidthPx}
          />
          <div
            ref={titleLineMeasureRef}
            className="pointer-events-auto mb-1 w-full max-w-full font-black leading-[0.95] md:mb-1.5 md:w-fit md:max-w-full text-[clamp(2.1rem,6vw,3.8rem)]"
            style={{ fontFamily: "var(--font-disco-display)" }}
          >
            <div className="flex w-full max-w-[100vw] flex-col gap-0.5 px-3 text-center text-[clamp(2rem,8vw,3.15rem)] uppercase tracking-tight leading-[0.92] sm:px-4 max-md:relative max-md:left-1/2 max-md:w-screen max-md:-translate-x-1/2 md:hidden">
              <KineticLetters
                text={EVENT_COPY.titleLineMobileLines[0]}
                className="block w-full"
                radioRecord
              />
              <KineticLetters
                text={EVENT_COPY.titleLineMobileLines[1]}
                className="block w-full"
                radioRecord
                colorIndexOffset={EVENT_COPY.titleLineMobileLines[0].length}
              />
            </div>
            <div className="hidden md:block">
              <KineticLetters text={EVENT_COPY.titleLine} radioRecord />
            </div>
          </div>
          <div
            className={cn(
              "pointer-events-none mb-1.5 w-full text-center font-black uppercase leading-[0.95] tracking-tight text-[clamp(6.3rem,22.5vw,9.75rem)] md:mb-2 md:text-[clamp(5.85rem,12.75vw,8.625rem)]",
            )}
            style={{
              fontFamily: "var(--font-marker-deck), var(--font-disco-display), cursive",
              ...(wideHero && titleLineWidthPx
                ? {
                    width: titleLineWidthPx,
                    maxWidth: "100%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }
                : undefined),
            }}
          >
            <span className="pointer-events-auto inline-block">
              <KineticLetters text={EVENT_COPY.venueName} heavy className="inline-block" />
            </span>
          </div>
        </motion.div>
        <div className="pointer-events-auto mt-0.5 flex w-full shrink-0 flex-col items-center pb-2 md:mt-1 md:pb-[max(0.5rem,calc(0.35rem+env(safe-area-inset-bottom)))]">
          <PosterBanditBlock />
        </div>
      </HeroStreetScene>

      <section
        id="disco-2000"
        className="relative z-[32] w-full space-y-10 overflow-x-clip bg-[#080605] px-3 pt-10 max-md:pb-[clamp(11rem,46svh,22rem)] sm:px-6 md:overflow-x-visible md:pb-[max(22rem,32svh)] md:pt-14 lg:px-10"
      >
        {/*
          ПК: два снимка «компьютерки» на стыке с героем (верхняя граница блока),
          вровень с левым и правым краем вьюпорта (breakout из padding секции).
        */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 z-0 hidden h-0 w-screen max-w-[100vw] -translate-x-1/2 overflow-visible md:block"
          aria-hidden
        >
          {/*
            Якорь нулевой высоты на верхней границе секции:
            низ PNG на линии стыка с героем; изображение уходит вверх.
          */}
          <Image
            src="/disco/computer-club-seam-left.png"
            alt=""
            width={960}
            height={720}
            className="mc-cursor-disk-discount pointer-events-auto absolute bottom-0 left-0 w-[min(44vw,520px)] max-w-none object-contain object-left-bottom opacity-[0.97]"
            sizes="(min-width: 768px) 44vw, 0"
          />
          <Image
            src="/disco/computer-club-seam-right.png"
            alt=""
            width={960}
            height={720}
            className="mc-cursor-disk-discount pointer-events-auto absolute bottom-0 right-0 w-[min(44vw,520px)] max-w-none object-contain object-right-bottom opacity-[0.97]"
            sizes="(min-width: 768px) 44vw, 0"
          />
        </div>

        <motion.div
          className="relative z-[20] w-full text-center md:text-balance"
          initial={reduce ? false : { opacity: 0, y: 40 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="bg-gradient-to-r from-[#ffe566] via-[#ffb347] to-[#ff6b2a] bg-clip-text text-lg font-bold uppercase tracking-widest text-transparent md:text-xl"
            style={{ fontFamily: "var(--font-disco-display)" }}
          >
            Зажги как в 2000-х
          </h2>
          <blockquote className="mt-4 space-y-3 text-sm leading-relaxed text-white/85 md:text-base">
            <p className="text-balance italic text-white/90">{QUOTE_BLOCK.filmLine}</p>
            <p className="text-balance text-[15px] text-white/75 md:text-[16px]">
              {QUOTE_BLOCK.bridge}
            </p>
          </blockquote>
        </motion.div>

        <div className="relative z-[1] grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-6">
          <CassetteTapeCard delay={0.05} shell="teal" sideLabel="A">
            <p className="font-bold text-teal-950">{EVENT_COPY.headliner}</p>
            <p className="mt-2 text-zinc-900">{EVENT_COPY.secretGuest}</p>
          </CassetteTapeCard>
          <CassetteTapeCard delay={0.12} shell="orange" sideLabel="B">
            <p className="font-bold text-orange-950">Дата · время</p>
            <p className="mt-2 text-lg font-bold text-zinc-950">
              {EVENT_COPY.date} · {EVENT_COPY.time}
            </p>
            <p className="mt-2 text-xs uppercase tracking-widest text-zinc-700">
              {EVENT_COPY.dressCode}
            </p>
          </CassetteTapeCard>
          <CassetteTapeCard delay={0.08} shell="purple" sideLabel="A">
            <p className="font-bold text-fuchsia-950">{EVENT_COPY.location}</p>
            <p className="mt-2 text-sm font-semibold leading-snug text-fuchsia-900">
              {EVENT_COPY.address}
            </p>
          </CassetteTapeCard>
          <CassetteTapeCard delay={0.15} shell="teal" sideLabel="B">
            <p className="font-bold text-amber-950">{EVENT_COPY.lottery}</p>
            <p className="mt-1 text-zinc-900">{EVENT_COPY.prize}</p>
          </CassetteTapeCard>
          <CassetteTapeCard delay={0.18} shell="orange" sideLabel="A">
            <p className="font-bold uppercase tracking-wider text-sky-950">
              {EVENT_COPY.ticketsOffline}
            </p>
            <p className="mt-3 text-sm leading-snug text-zinc-800">
              {EVENT_COPY.ticketsJoke}
            </p>
            <p className="mt-3 text-xs text-zinc-600">
              Онлайн — как всегда, зелёная кнопка внизу (не перепутай с «закрыть
              объявление» на столбе).
            </p>
          </CassetteTapeCard>
          <CassetteTapeCard delay={0.22} shell="ruby" sideLabel="B">
            <p className="font-bold text-rose-950">{EVENT_COPY.bonusTape.title}</p>
            <p className="mt-2 text-zinc-900">{EVENT_COPY.bonusTape.body}</p>
            <p className="mt-3 text-xs text-zinc-600">
              <a
                href={TELEGRAM_REPOST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-rose-900 underline decoration-rose-400/90 underline-offset-2 hover:text-rose-950"
              >
                {EVENT_COPY.bonusTape.linkLabel}
              </a>
              {" — пока буфер обмена не просел в ноль."}
            </p>
          </CassetteTapeCard>
        </div>

        <div
          ref={streetNotesAlignRef}
          className="relative z-[1] max-md:relative max-md:z-[28] max-md:-mb-[clamp(3.25rem,11vmin,5.25rem)] bg-transparent md:-mb-5"
        >
          <StreetPaperNotes />
        </div>
      </section>

      <StickyTicketCta
        matchWidthPx={titleLineWidthPx}
        pngBottomRef={streetNotesAlignRef}
      />
    </div>
  );
}

/** Чуть раньше старта флипа показываем область, чтобы анимация не резалась */
const ORGANIZER_MOUNT_LEAD = 0.028;
/** Гистерезис: не прятать блок при дрожании progress у порога (резкий maxHeight / обрезка на мобильных) */
const ORGANIZER_HIDE_BACKOFF = 0.072;

function StickyTicketCta({
  matchWidthPx,
  pngBottomRef,
}: {
  matchWidthPx?: number | null;
  pngBottomRef?: RefObject<HTMLDivElement | null>;
}) {
  const reduce = useReducedMotion();
  const narrow = useMediaQuery("(max-width: 767px)");
  const [showOrganizer, setShowOrganizer] = useState(false);
  const buyButtonRef = useRef<HTMLAnchorElement>(null);
  const [mobileAlignPx, setMobileAlignPx] = useState(0);

  useEffect(() => {
    const showAt = reduce ? ORGANIZER_FLIP_START : ORGANIZER_FLIP_START - ORGANIZER_MOUNT_LEAD;
    const hideBelow = showAt - ORGANIZER_HIDE_BACKOFF;

    const update = () => {
      const doc = document.documentElement;
      const maxScroll = Math.max(0, doc.scrollHeight - window.innerHeight);
      const y = window.scrollY;
      const progress = maxScroll <= 0 ? 1 : y / maxScroll;
      setShowOrganizer((prev) => {
        if (reduce) {
          return progress >= ORGANIZER_FLIP_START;
        }
        if (prev) {
          return progress >= hideBelow;
        }
        return progress >= showAt;
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [reduce]);

  useLayoutEffect(() => {
    const edgeEl = pngBottomRef?.current;
    if (!pngBottomRef || !edgeEl) return;

    const mq = window.matchMedia("(max-width: 767px)");
    let rafId = 0;

    const align = () => {
      if (!mq.matches) {
        setMobileAlignPx(0);
        return;
      }
      /**
       * Пока открыта доска организатора, не трогаем translate: spring высоты + флип двигают кнопку,
       * пересчёт «прижать к PNG» даёт дрожание и визульный уезд блока вниз к концу скролла.
       */
      if (showOrganizer) {
        setMobileAlignPx(0);
        return;
      }
      const edge = pngBottomRef.current;
      const btn = buyButtonRef.current;
      if (!edge || !btn) {
        setMobileAlignPx(0);
        return;
      }
      const vr = edge.getBoundingClientRect();
      const vh = window.innerHeight;
      /** Якорь ещё ниже экрана (верх страницы) — коррекция не нужна */
      if (vr.top > vh + 120) {
        setMobileAlignPx(0);
        return;
      }
      /**
       * Якорь уехал вверх (доска уже «докручена») — не сбрасываем выравнивание в 0:
       * резкий translate ломал колонку и утаскивал организатора под край экрана.
       */
      if (vr.bottom < 0) {
        return;
      }
      const br = btn.getBoundingClientRect();
      const pngBottom = vr.bottom;
      const mid = br.top + br.height / 2;
      let nudge = pngBottom - mid;
      nudge = Math.max(-160, Math.min(160, nudge));
      const rounded = Math.round(nudge * 10) / 10;
      setMobileAlignPx((p) => (Math.abs(p - rounded) < 0.25 ? p : rounded));
    };

    const schedule = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        align();
      });
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const ro = new ResizeObserver(schedule);
    ro.observe(edgeEl);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      ro.disconnect();
    };
  }, [pngBottomRef, showOrganizer]);

  return (
    <>
      {/*
        ПК: VHS — фиксированный нижний левый угол; мобильный — тот же штамп в колонке над кнопкой.
        MTV: всегда фиксированный нижний правый угол.
      */}
      <div
        className="pointer-events-none fixed bottom-[max(2px,env(safe-area-inset-bottom,0px))] left-[max(2px,env(safe-area-inset-left,0px))] z-[210] hidden md:block"
        aria-hidden
      >
        <VhsCamcorderDateStamp className="inline-block max-w-[min(88vw,19rem)]" />
      </div>

      <MtvCornerPlayer />

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex justify-stretch max-md:bottom-[calc(80px+env(safe-area-inset-bottom,0px))] md:bottom-0">
        {narrow ? (
          <div
            className={cn(
              "pointer-events-auto flex w-full flex-col items-stretch gap-2 px-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 sm:px-4",
              mobileAlignPx !== 0 && "will-change-transform",
            )}
            style={
              mobileAlignPx !== 0
                ? { transform: `translate3d(0,${mobileAlignPx}px,0)` }
                : undefined
            }
          >
            <div
              className="pointer-events-none max-w-[min(72vw,17rem)] self-start pr-2"
              aria-hidden
            >
              <VhsCamcorderDateStamp className="inline-block max-w-full" />
            </div>

            <motion.div
              className="relative w-full"
              initial={false}
              animate={{
                maxHeight: showOrganizer ? 640 : 0,
              }}
              transition={{
                maxHeight: reduce
                  ? { duration: 0.32, ease: [0.22, 1, 0.36, 1] }
                  : {
                      type: "tween",
                      duration: 0.42,
                      ease: [0.22, 1, 0.36, 1],
                    },
              }}
              style={{
                pointerEvents: showOrganizer ? "auto" : "none",
                overflow: showOrganizer ? "visible" : "hidden",
              }}
            >
              <OrganizerSkateDeck revealOpen={showOrganizer} />
            </motion.div>

            <motion.a
              ref={buyButtonRef}
              href={QTICKETS_URL}
              target="_blank"
              rel="noopener noreferrer"
              animate={reduce ? undefined : { scale: [1, 1.035, 1] }}
              transition={{
                duration: 2.4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className={cn(
                buttonVariants({ size: "lg" }),
                "relative box-border h-14 min-h-[3.5rem] w-full max-w-full shrink-0 rounded-2xl border-2 border-[#ffb347]/90 bg-gradient-to-r from-[#b71c1c] via-[#e53935] to-[#ff9100] px-5 py-3 text-lg font-black uppercase tracking-wider text-white shadow-[0_0_36px_rgba(255,60,30,0.55),0_12px_36px_rgba(255,160,40,0.28)] sm:px-8",
                "md:!w-auto md:max-w-[min(40rem,96vw)] md:min-h-[142px] md:min-w-[414px] md:rounded-3xl md:border-[3px] md:px-14 md:py-5 md:text-3xl md:tracking-wide md:shadow-[0_0_52px_rgba(255,70,35,0.62),0_20px_48px_rgba(255,140,50,0.3)]",
                "transition-[transform,box-shadow,border-color,filter] duration-300 hover:brightness-110 hover:border-[#ffe082] hover:shadow-[0_0_28px_rgba(255,200,100,0.5),0_0_52px_rgba(255,80,30,0.42)] md:hover:shadow-[0_0_36px_rgba(255,190,90,0.45),0_0_72px_rgba(255,70,25,0.35)]",
                "focus-visible:ring-4 focus-visible:ring-[#ffb74d]/55 md:focus-visible:ring-[6px]",
              )}
              whileTap={reduce ? undefined : { scale: 0.96 }}
              whileHover={reduce ? undefined : { y: -2 }}
              aria-label="Купить билет на супер-дискотеку через Qtickets"
            >
              <span className="drop-shadow-[0_2px_0_#000a]">Купить билет</span>
              {!reduce && (
                <motion.span
                  className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-white/20 md:rounded-3xl md:ring-[3px]"
                  animate={{ opacity: [0.4, 0.9, 0.4] }}
                  transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY }}
                />
              )}
            </motion.a>
          </div>
        ) : (
          <div className="pointer-events-auto flex w-full flex-col-reverse items-center gap-3 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:px-8 lg:px-10">
            <div className="flex w-full max-w-[min(96vw,720px)] flex-col-reverse items-center gap-3">
              <motion.div
                className="relative w-full max-w-[min(96vw,720px)]"
                initial={false}
                animate={{
                  maxHeight: showOrganizer ? 640 : 0,
                }}
                transition={{
                  maxHeight: reduce
                    ? { duration: 0.32, ease: [0.22, 1, 0.36, 1] }
                    : {
                        type: "spring",
                        stiffness: 108,
                        damping: 26,
                        mass: 0.82,
                      },
                }}
                style={{
                  pointerEvents: showOrganizer ? "auto" : "none",
                  overflow: showOrganizer ? "visible" : "hidden",
                }}
              >
                <OrganizerSkateDeck revealOpen={showOrganizer} />
              </motion.div>

              <motion.a
                ref={buyButtonRef}
                href={QTICKETS_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={
                  matchWidthPx != null && matchWidthPx > 0
                    ? { width: matchWidthPx, maxWidth: "100%" }
                    : undefined
                }
                animate={reduce ? undefined : { scale: [1, 1.035, 1] }}
                transition={{
                  duration: 2.4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "relative box-border h-14 min-h-[3.5rem] shrink-0 rounded-2xl border-2 border-[#ffb347]/90 bg-gradient-to-r from-[#b71c1c] via-[#e53935] to-[#ff9100] px-6 py-3 text-lg font-black uppercase tracking-wider text-white shadow-[0_0_36px_rgba(255,60,30,0.55),0_12px_36px_rgba(255,160,40,0.28)] sm:px-10",
                  "md:!w-auto md:max-w-[min(40rem,96vw)] md:min-h-[142px] md:min-w-[414px] md:rounded-3xl md:border-[3px] md:px-14 md:py-5 md:text-3xl md:tracking-wide md:shadow-[0_0_52px_rgba(255,70,35,0.62),0_20px_48px_rgba(255,140,50,0.3)]",
                  matchWidthPx == null || matchWidthPx <= 0 ? "w-full" : "max-w-full",
                  "transition-[transform,box-shadow,border-color,filter] duration-300 hover:brightness-110 hover:border-[#ffe082] hover:shadow-[0_0_28px_rgba(255,200,100,0.5),0_0_52px_rgba(255,80,30,0.42)] md:hover:shadow-[0_0_36px_rgba(255,190,90,0.45),0_0_72px_rgba(255,70,25,0.35)]",
                  "focus-visible:ring-4 focus-visible:ring-[#ffb74d]/55 md:focus-visible:ring-[6px]",
                )}
                whileTap={reduce ? undefined : { scale: 0.96 }}
                whileHover={reduce ? undefined : { y: -2 }}
                aria-label="Купить билет на супер-дискотеку через Qtickets"
              >
                <span className="drop-shadow-[0_2px_0_#000a]">Купить билет</span>
                {!reduce && (
                  <motion.span
                    className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-white/20 md:rounded-3xl md:ring-[3px]"
                    animate={{ opacity: [0.4, 0.9, 0.4] }}
                    transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY }}
                  />
                )}
              </motion.a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
