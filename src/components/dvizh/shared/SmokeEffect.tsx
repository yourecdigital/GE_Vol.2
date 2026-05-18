"use client";

import { useCallback } from "react";
import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const SMOKE_CONFIG = {
  fullScreen: false,
  background: { color: { value: "transparent" } },
  fpsLimit: 24,
  particles: {
    number: { value: 0 },
    color: {
      value: ["#1a1a1a", "#252525", "#2e2e2e", "#3a1000", "#5a2000"],
    },
    shape: { type: "circle" },
    opacity: {
      value: { min: 0.04, max: 0.45 },
      animation: {
        enable: true,
        speed: 0.5,
        sync: false,
        destroy: "max" as const,
        startValue: "random" as const,
      },
    },
    size: {
      value: { min: 15, max: 80 },
      animation: {
        enable: true,
        speed: 6,
        sync: false,
        destroy: "max" as const,
        startValue: "min" as const,
      },
    },
    move: {
      enable: true,
      speed: { min: 0.6, max: 2 },
      direction: "top" as const,
      random: true,
      straight: false,
      outModes: { top: "destroy" as const, default: "out" as const },
    },
  },
  emitters: {
    position: { x: 50, y: 115 },
    rate: { quantity: 2, delay: 0.5 },
    life: { count: 0 },
    size: { width: 110, height: 5, mode: "percent" as const },
  },
};

function SmokeParticles() {
  return (
    <Particles
      id="dvizh-smoke"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      options={SMOKE_CONFIG}
    />
  );
}

export function SmokeEffect() {
  const init = useCallback(async (engine: Parameters<typeof loadSlim>[0]) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="smoke-canvas-wrap" aria-hidden="true">
      <ParticlesProvider init={init}>
        <SmokeParticles />
      </ParticlesProvider>
    </div>
  );
}
