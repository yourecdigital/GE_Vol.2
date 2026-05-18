"use client";

import type { RefObject } from "react";
import dynamic from "next/dynamic";
import {
  createContext,
  forwardRef,
  type ReactNode,
  type Ref,
  useContext,
} from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";

import { GumBubbleInteractive } from "@/components/disco/gum-bubble-interactive";
import { PokemonPogCap } from "@/components/disco/pokemon-pog-cap";

const HeroSpotlight3D = dynamic(
  () =>
    import("@/components/disco/hero-spotlight-3d").then((m) => ({
      default: m.HeroSpotlight3D,
    })),
  { ssr: false },
);

export const HeroSmoothContext = createContext<MotionValue<number> | null>(null);

export function useHeroSmoothProgress(): MotionValue<number> | null {
  return useContext(HeroSmoothContext);
}

/** Питерский двор + «разборки» в слое: кирпич, Pokémon-кэпс на заднем плане, жвачка-бабл, афиша без резкого обрыва */
export const HeroStreetScene = forwardRef(function HeroStreetScene(
  { children }: { children: ReactNode },
  ref: Ref<HTMLDivElement | null>
) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref as RefObject<HTMLDivElement | null>,
    /**
     * Как «верх героя у верха вьюпорта → 0, низ героя у верха вьюпорта → 1»,
     * но вторая точка чуть не [1,0], чтобы не совпасть с пресетом Exit и не включить
     * scroll-driven View Timeline (с Lenis прогресс тогда не едет).
     */
    offset: [
      [0, 0],
      [0.9999, 0],
    ],
    trackContentSize: true,
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 24,
    damping: 44,
    mass: 1.2,
  });

  const slingRot = useTransform(
    smooth,
    [0, 0.22, 0.48, 0.78, 1],
    [26, 10, -8, -18, -22]
  );
  /**
   * Кэпс слева: на первом экране выше (рядом с Пикачу в зоне героя), по скроллу плавно опускается и
   * заранее тормозит — не доезжает до стыка с «компами» (плато с ~0.72 прогресса героя).
   */
  const capSlideY = useTransform(
    smooth,
    [0, 0.14, 0.32, 0.5, 0.62, 0.72, 0.78, 1],
    [-288, -228, -168, -105, -52, -12, 0, 0],
  );
  const gumScale = useTransform(smooth, [0, 0.28, 0.52, 0.82, 1], [0.12, 0.55, 1.05, 1.2, 1]);
  const gumY = useTransform(smooth, [0, 1], [40, -8]);
  const vignette = useTransform(smooth, [0, 0.55, 1], [0.35, 0.55, 0.78]);

  return (
    <div
      ref={ref}
      className="relative isolate z-[20] min-h-[108vh] overflow-x-clip overflow-y-visible md:min-h-[138vh] md:overflow-x-visible"
      style={{ perspective: "1200px" }}
    >
      <div className="sticky top-0 flex min-h-svh min-h-0 flex-col items-center justify-start overflow-x-clip overflow-y-visible pt-[4.25rem] md:overflow-x-visible">
        <BrickAndAsphalt reduce={!!reduce} />

        <GumBubbleInteractive gumScale={gumScale} gumY={gumY} reduce={!!reduce} />

        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 z-[6] h-1/2 bg-gradient-to-b from-[#ff4d2d]/16 via-[#ff9a45]/10 to-transparent mix-blend-screen"
          animate={
            reduce
              ? undefined
              : { opacity: [0.11, 0.32, 0.13], x: ["-2%", "3%", "0%"] }
          }
          transition={{
            duration: 4.2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <HeroSpotlight3D />

        {!reduce && (
          <>
            <motion.div
              className="pointer-events-none absolute bottom-[11%] left-[max(0.3rem,env(safe-area-inset-left,0px))] z-[16] aspect-square w-[min(7.25rem,30vw)] opacity-[0.97] drop-shadow-[0_16px_38px_rgba(0,0,0,0.68)] max-[380px]:bottom-[13%] max-[380px]:w-[min(6.75rem,32vw)] md:bottom-[9.5%] md:left-12 md:w-[min(18.5rem,42vw)] lg:left-16"
              style={{ y: capSlideY, rotate: slingRot }}
              aria-hidden
            >
              <PokemonPogCap className="h-full w-full" />
            </motion.div>
            <motion.div
              className="pointer-events-none absolute inset-0 z-[4] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.1)_55%,rgba(0,0,0,0.75)_100%)]"
              style={{ opacity: vignette }}
            />
          </>
        )}

        {/*
          ПК: Sega Mega Drive справа — премиальное золотое свечение.
        */}
        <div
          className="mc-cursor-disk-discount pointer-events-auto absolute right-[max(0px,env(safe-area-inset-right))] top-[min(24%,7.5rem)] z-[8] hidden w-[min(44vw,440px)] max-w-[96vw] md:block lg:right-1 lg:top-[22%] lg:w-[min(38vw,460px)]"
          aria-hidden
        >
          <div className="relative translate-x-[4%] lg:translate-x-[7%]">
            <div
              className="disco-sega-hero-bloom pointer-events-none absolute -inset-8 -z-10 rounded-[42%] md:-inset-12"
              aria-hidden
            />
            <motion.div
              className="disco-sega-hero-glow relative"
              animate={
                reduce
                  ? undefined
                  : { y: [0, -3, 0], rotate: [0, 0.4, 0] }
              }
              transition={{
                duration: 5.2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/disco/sega-mega-drive-hero.png"
                alt=""
                width={720}
                height={540}
                className="h-auto w-full object-contain object-right drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)]"
                sizes="(min-width: 1024px) 38vw, 44vw"
                priority={false}
              />
            </motion.div>
          </div>
        </div>

        <div className="relative z-10 flex min-h-min w-full flex-1 flex-col items-stretch gap-1.5 px-3 pb-2 sm:px-5 md:gap-2 md:pb-3 lg:px-8 pointer-events-none">
          <HeroSmoothContext.Provider value={smooth}>{children}</HeroSmoothContext.Provider>
        </div>
      </div>
    </div>
  );
});

function BrickAndAsphalt({ reduce }: { reduce: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      <div
        className="absolute inset-0 opacity-55 mix-blend-overlay"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 23px, rgba(0,0,0,0.45) 23px, rgba(0,0,0,0.45) 24px),
            repeating-linear-gradient(90deg, rgba(140,24,28,0.55) 0px, rgba(140,24,28,0.55) 38px, rgba(28,8,12,0.88) 38px, rgba(28,8,12,0.88) 40px)
          `,
          backgroundSize: "100% 100%, 80px 24px",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.38] mix-blend-screen"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 55% 45% at 8% 55%, rgba(255,70,45,0.42), transparent 62%),
            radial-gradient(ellipse 50% 40% at 92% 40%, rgba(255,160,55,0.2), transparent 58%),
            radial-gradient(ellipse 70% 55% at 48% -5%, rgba(255,200,80,0.12), transparent 55%)
          `,
        }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#20080c]/82 via-[#0f0308]/90 to-[#060102]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 90% 50% at 50% 0%, rgba(220,40,50,0.38), transparent 55%)",
        }}
      />
      {!reduce && (
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black via-transparent to-transparent" />
      )}
    </div>
  );
}

