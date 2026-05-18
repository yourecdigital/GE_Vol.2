"use client";

import { motion, useDragControls } from "framer-motion";
import { GripHorizontal, Maximize2, Minimize2, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

const VIDEO_SRC = "/disco/mtv-eurodance-corner.mp4";
/** Опционально: положите сжатый mp4 (например 540p) — меньше трафика на телефонах */
const VIDEO_SRC_MOBILE = "/disco/mtv-eurodance-corner-mobile.mp4";

/** Safari / iOS (вкл. iPadOS 13+) — без отложенного src и с агрессивным preload, иначе автовоспроизведение не стартует */
function isWebKitAutoplayHost(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  if (/iP(hone|od|ad)/i.test(ua)) return true;
  if (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1) return true;
  return /^((?!chrome|android).)*safari/i.test(ua);
}

const mtvButton =
  "pointer-events-auto z-30 flex items-center justify-center gap-1 border-[3px] border-black bg-[#fff200] px-2 py-1 font-black uppercase tracking-[0.15em] text-black shadow-[3px_3px_0_#000] transition-transform max-[380px]:px-1.5 max-[380px]:text-[7px] text-[8px] active:translate-x-px active:translate-y-px active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1";

type NetTailored = {
  deferMaxMs: number;
  idleTimeoutMs: number;
  preloadAfterSrc: "none" | "metadata" | "auto";
};

function getNetworkTailored(): NetTailored {
  if (typeof navigator === "undefined") {
    return { deferMaxMs: 600, idleTimeoutMs: 1600, preloadAfterSrc: "metadata" };
  }
  const c = (
    navigator as Navigator & {
      connection?: { effectiveType?: string; saveData?: boolean };
    }
  ).connection;
  if (!c) {
    return { deferMaxMs: 500, idleTimeoutMs: 1400, preloadAfterSrc: "metadata" };
  }
  if (c.saveData) {
    return { deferMaxMs: 2200, idleTimeoutMs: 5500, preloadAfterSrc: "none" };
  }
  switch (c.effectiveType) {
    case "4g":
      return { deferMaxMs: 80, idleTimeoutMs: 400, preloadAfterSrc: "auto" };
    case "3g":
      return { deferMaxMs: 650, idleTimeoutMs: 2400, preloadAfterSrc: "metadata" };
    default:
      return { deferMaxMs: 1200, idleTimeoutMs: 4000, preloadAfterSrc: "none" };
  }
}

function formatClock(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return "0:00";
  const s = Math.floor(sec % 60);
  const m = Math.floor(sec / 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

type MtvCornerPlayerProps = {
  /**
   * Мобильная колонка CTA: плеер в потоке над «Купить билет», без fixed-угла.
   * На ПК не используется.
   */
  embedded?: boolean;
};

export function MtvCornerPlayer({ embedded = false }: MtvCornerPlayerProps) {
  const narrow = useMediaQuery("(max-width: 767px)");
  const rootRef = useRef<HTMLDivElement>(null);
  const dragBoundsRef = useRef<HTMLDivElement | null>(null);
  const dragControls = useDragControls();
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrubRef = useRef(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [srcOn, setSrcOn] = useState(false);
  const [preloadMode, setPreloadMode] = useState<"none" | "metadata" | "auto">("metadata");
  const [muted, setMuted] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [bufferedRatio, setBufferedRatio] = useState(0);
  /** Лёгкий ролик отсутствует — падаем на основной mp4 */
  const [mobileClipFailed, setMobileClipFailed] = useState(false);

  useEffect(() => {
    setMobileClipFailed(false);
  }, [narrow]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const onFs = () => {
      const r = rootRef.current;
      setFullscreen(!!r && document.fullscreenElement === r);
    };
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  /** Невидимая граница по вьюпорту — окно не уезжает с экрана */
  useLayoutEffect(() => {
    const el = document.createElement("div");
    el.setAttribute("aria-hidden", "true");
    el.className = "pointer-events-none fixed inset-0 z-0";
    document.body.appendChild(el);
    dragBoundsRef.current = el;
    return () => {
      dragBoundsRef.current = null;
      el.remove();
    };
  }, []);

  useLayoutEffect(() => {
    if (!srcOn) return;
    const v = videoRef.current;
    if (!v) return;
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");
  }, [srcOn]);

  useLayoutEffect(() => {
    if (reduceMotion) {
      const t = window.setTimeout(() => setSrcOn(true), 280);
      return () => clearTimeout(t);
    }
    if (isWebKitAutoplayHost()) {
      setPreloadMode("metadata");
      setSrcOn(true);
      return;
    }
    const net = getNetworkTailored();
    setPreloadMode(net.preloadAfterSrc);
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      setSrcOn(true);
    };
    const t = window.setTimeout(go, net.deferMaxMs);
    let idleId: number | undefined;
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(go, { timeout: net.idleTimeoutMs });
    }
    return () => {
      window.clearTimeout(t);
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (!srcOn) return;
    const v = videoRef.current;
    if (!v) return;
    v.defaultMuted = true;
    v.muted = muted;
    v.preload = narrow ? "metadata" : preloadMode;
    if (reduceMotion) {
      v.pause();
      return;
    }
    const tryPlay = () => {
      void v.play().catch(() => {});
    };
    tryPlay();
    v.addEventListener("loadeddata", tryPlay);
    v.addEventListener("canplay", tryPlay);
    return () => {
      v.removeEventListener("loadeddata", tryPlay);
      v.removeEventListener("canplay", tryPlay);
    };
  }, [srcOn, reduceMotion, muted, preloadMode, narrow]);

  /** iOS / Safari: автозапуск часто требует жеста; один раз подталкиваем play() без остального мира. */
  useEffect(() => {
    if (!srcOn || reduceMotion || !isWebKitAutoplayHost()) return;
    const v = videoRef.current;
    if (!v) return;
    let done = false;
    const unlock = () => {
      if (done) return;
      done = true;
      if (!v.paused) return;
      v.defaultMuted = true;
      v.muted = true;
      setMuted(true);
      void v.play().catch(() => {});
    };
    window.addEventListener("touchend", unlock, { capture: true, passive: true });
    window.addEventListener("click", unlock, { capture: true });
    return () => {
      window.removeEventListener("touchend", unlock, { capture: true });
      window.removeEventListener("click", unlock, { capture: true });
    };
  }, [srcOn, reduceMotion]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !srcOn) return;

    const onMeta = () => setDuration(v.duration || 0);
    let lastUiMs = 0;
    const uiGap = narrow ? 320 : 200;
    const onTime = () => {
      if (scrubRef.current) return;
      const now = performance.now();
      if (now - lastUiMs < uiGap) return;
      lastUiMs = now;
      setCurrentTime(v.currentTime);
    };
    const onProgress = () => {
      const d = v.duration;
      if (!d || !Number.isFinite(d)) return;
      let end = 0;
      for (let i = 0; i < v.buffered.length; i++) {
        end = Math.max(end, v.buffered.end(i));
      }
      setBufferedRatio(Math.min(1, end / d));
    };

    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("durationchange", onMeta);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("progress", onProgress);

    return () => {
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("durationchange", onMeta);
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("progress", onProgress);
    };
  }, [srcOn, narrow]);

  const toggleSound = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    setMuted(next);
    if (!reduceMotion) void v.play().catch(() => {});
  }, [reduceMotion]);

  const toggleFullscreen = useCallback(async () => {
    const root = rootRef.current;
    const video = videoRef.current;
    if (!root || !video) return;

    try {
      if (document.fullscreenElement === root) {
        await document.exitFullscreen();
        return;
      }
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
      if (root.requestFullscreen) {
        await root.requestFullscreen();
        return;
      }
    } catch {
      /* iOS */
    }
    const vv = video as HTMLVideoElement & { webkitEnterFullscreen?: () => void };
    if (typeof vv.webkitEnterFullscreen === "function") {
      vv.webkitEnterFullscreen();
    }
  }, []);

  const seekTo = useCallback((ratio: number) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    const t = Math.max(0, Math.min(duration, Number(ratio) * duration));
    v.currentTime = t;
    setCurrentTime(t);
  }, [duration]);

  const durSafe = duration > 0 && Number.isFinite(duration) ? duration : 1;
  const playRatio = currentTime / durSafe;

  const showDragChrome = !fullscreen && !reduceMotion && !embedded;

  return (
    <motion.div
      ref={rootRef}
      drag={showDragChrome}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0.06}
      dragConstraints={dragBoundsRef}
      whileDrag={{ cursor: "grabbing", zIndex: 220 }}
      className={cn(
        "pointer-events-auto relative isolate mc-cursor-disk-discount overflow-hidden rounded-[2px] border-[3px] border-black bg-black",
        "shadow-[4px_4px_0_#111,0_0_0_2px_#fff200]",
        fullscreen
          ? "fixed inset-0 z-[200] flex h-[100dvh] max-h-[100dvh] w-full max-w-none flex-col rounded-none border-0 shadow-none"
          : embedded
            ? "z-[1] w-full max-w-[min(46vw,220px)] touch-manipulation"
            : [
                "w-[min(46vw,220px)] md:w-[min(45vw,450px)]",
                "z-[210] touch-manipulation",
                "fixed right-[max(2px,env(safe-area-inset-right,0px))] bottom-[max(2px,env(safe-area-inset-bottom,0px))]",
              ].join(" "),
      )}
    >
      {showDragChrome ? (
        <div
          className={cn(
            "flex h-6 shrink-0 cursor-grab items-center justify-center border-b-2 border-black bg-zinc-800 touch-none select-none active:cursor-grabbing",
            "z-40",
          )}
          onPointerDown={(e) => dragControls.start(e)}
          role="button"
          tabIndex={0}
          aria-label="Переместить окно видео"
        >
          <GripHorizontal className="size-4 text-[#fff200]" aria-hidden />
        </div>
      ) : null}

      <div
        className={cn(
          "relative z-0 aspect-video w-full bg-black",
          fullscreen && "aspect-auto min-h-0 flex-1",
        )}
      >
        <video
          key={`${srcOn}-${narrow}-${mobileClipFailed}`}
          ref={videoRef}
          className={cn(
            "pointer-events-none h-full w-full object-cover",
            fullscreen && "object-contain",
          )}
          playsInline
          muted={muted}
          loop
          preload={srcOn ? (narrow ? "metadata" : preloadMode) : "none"}
          autoPlay={!reduceMotion}
          controls={false}
          disablePictureInPicture
          aria-label="Видео: Eurodance 90s (MTV)"
          onError={() => {
            if (narrow && !mobileClipFailed) setMobileClipFailed(true);
          }}
        >
          {srcOn && narrow && !mobileClipFailed ? (
            <source src={VIDEO_SRC_MOBILE} type="video/mp4" />
          ) : null}
          {srcOn ? <source src={VIDEO_SRC} type="video/mp4" /> : null}
        </video>
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-[1] hidden mix-blend-overlay opacity-[0.2] md:block",
          )}
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.13) 2px, rgba(0,0,0,0.13) 3px)",
          }}
        />

        {/* Таймлайн — овлей снизу кадра */}
        <div
          className={cn(
            "pointer-events-auto absolute inset-x-0 bottom-0 z-20 flex items-center gap-1.5",
            "border-t-2 border-black bg-zinc-950 px-1.5 py-1 md:gap-2 md:px-2",
          )}
        >
          <span
            className="min-w-[2rem] font-mono text-[9px] font-bold tabular-nums text-[#fff200] md:min-w-[2.25rem] md:text-[10px]"
            aria-hidden
          >
            {formatClock(currentTime)}
          </span>
          <div className="relative h-2 min-w-0 flex-1 rounded-sm border border-black bg-black">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 rounded-sm bg-zinc-600/90"
              style={{ width: `${bufferedRatio * 100}%` }}
              title="Буфер"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 left-0 rounded-sm bg-[#fff200]"
              style={{ width: `${playRatio * 100}%` }}
              aria-hidden
            />
            <input
              type="range"
              min={0}
              max={1}
              step={0.001}
              value={playRatio}
              className={cn(
                "absolute inset-0 h-full w-full cursor-pointer opacity-0",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#fff200]",
              )}
              aria-label="Позиция воспроизведения"
              onInput={(e) => seekTo(Number(e.currentTarget.value))}
              onChange={(e) => seekTo(Number(e.currentTarget.value))}
              onMouseDown={() => {
                scrubRef.current = true;
              }}
              onMouseUp={() => {
                scrubRef.current = false;
              }}
              onTouchStart={() => {
                scrubRef.current = true;
              }}
              onTouchEnd={() => {
                scrubRef.current = false;
              }}
            />
          </div>
          <span
            className="min-w-[2rem] font-mono text-[9px] font-bold tabular-nums text-white/75 md:min-w-[2.25rem] md:text-[10px]"
            aria-hidden
          >
            {duration > 0 ? formatClock(duration) : "—:—"}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={toggleSound}
        className={cn(
          mtvButton,
          "absolute",
          showDragChrome ? "max-md:top-8 max-md:right-1" : "max-md:right-1 max-md:top-1",
          "md:right-1 md:top-auto md:bottom-10",
        )}
        aria-pressed={!muted}
        aria-label={muted ? "Включить звук" : "Выключить звук"}
      >
        {muted ? (
          <VolumeX className="size-3.5 shrink-0 md:size-4" aria-hidden />
        ) : (
          <Volume2 className="size-3.5 shrink-0 md:size-4" aria-hidden />
        )}
        <span>Звук</span>
      </button>

      <button
        type="button"
        onClick={() => void toggleFullscreen()}
        className={cn(
          mtvButton,
          "absolute",
          showDragChrome ? "max-md:left-1 max-md:top-8" : "max-md:left-1 max-md:top-1",
          "md:left-1 md:top-auto md:bottom-10",
        )}
        aria-pressed={fullscreen}
        aria-label={fullscreen ? "Выйти из полноэкранного режима" : "На весь экран"}
      >
        {fullscreen ? (
          <Minimize2 className="size-3.5 shrink-0 md:size-4" aria-hidden />
        ) : (
          <Maximize2 className="size-3.5 shrink-0 md:size-4" aria-hidden />
        )}
        <span className="max-md:sr-only">Экран</span>
        <span className="hidden md:inline">Весь экран</span>
      </button>
    </motion.div>
  );
}
