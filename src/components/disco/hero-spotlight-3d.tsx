"use client";

/**
 * Два прожектора: длинные конусы + «жилки» луча, интенсивное сканирование к центру (афиша).
 * В центре — овальный ореол + PNG-контур бэтмена (public/disco/bat-signal-outline.png), масштаб ⅓.
 */
import { Billboard, SpotLight } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import {
  Suspense,
  useLayoutEffect,
  useMemo,
  useRef,
  type MutableRefObject,
  type RefObject,
} from "react";
import {
  AdditiveBlending,
  CanvasTexture,
  DoubleSide,
  Group,
  LinearFilter,
  Plane,
  Raycaster,
  SRGBColorSpace,
  TextureLoader,
  Vector2,
  Vector3,
} from "three";

const AIM = new Vector3(0, 0.34, 0);
const STAGE_PLANE = new Plane(new Vector3(0, 1, 0), 5.25);
const NDC_BOTTOM = -0.93;
const NDC_SIDE = 0.96;
const _ndcCorner = new Vector2();
const _ray = new Raycaster();
const _hit = new Vector3();

/** Билборд бат-сигнала: в 3× меньше прежнего (7.35×6.05 world units). */
const BAT_BOARD_W = 7.35 / 3;
const BAT_BOARD_H = 6.05 / 3;

const BAT_OUTLINE_URL = "/disco/bat-signal-outline.png" as const;

/** В 2× длиннее базового; раскрытие согласовано с овалом на «стене». */
const BEAM_LEN = 160;
/** Согласовано с билбордом BAT_BOARD_*: был 52 при ширине 7.35, масштаб ≈⅓. */
const BEAM_BASE_R = 52 / 3;

/** Радиальный ореол и овальные кольца без лого — контур бэтмена даёт PNG-текстура. */
function createBatSignalGlowTexture(): CanvasTexture {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const cx = size / 2;
  const cy = size / 2 + 10;
  const rx = 400;
  const ry = 318;

  ctx.clearRect(0, 0, size, size);

  const rg = ctx.createRadialGradient(cx, cy, 6, cx, cy, Math.max(rx, ry) * 1.08);
  rg.addColorStop(0, "rgba(255,255,255,0.42)");
  rg.addColorStop(0.1, "rgba(255,253,250,0.95)");
  rg.addColorStop(0.34, "rgba(255,255,255,0.62)");
  rg.addColorStop(0.58, "rgba(240,248,255,0.22)");
  rg.addColorStop(0.78, "rgba(225,238,255,0.08)");
  rg.addColorStop(1, "rgba(255,255,255,0)");

  ctx.fillStyle = rg;
  ctx.beginPath();
  ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalCompositeOperation = "lighter";
  ctx.strokeStyle = "rgba(255,255,255,0.92)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.ellipse(cx, cy, rx * 0.88, ry * 0.88, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = "rgba(255,255,255,0.45)";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.ellipse(cx, cy, rx * 0.935, ry * 0.935, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.globalCompositeOperation = "source-over";

  const tex = new CanvasTexture(canvas);
  tex.colorSpace = SRGBColorSpace;
  tex.minFilter = LinearFilter;
  tex.magFilter = LinearFilter;
  tex.needsUpdate = true;
  return tex;
}

function GodRayVeins() {
  const angles = [-0.1, -0.05, 0, 0.05, 0.1];
  return (
    <>
      {angles.map((a) => (
        <mesh
          key={a}
          position={[0, -BEAM_LEN * 0.5, 0]}
          rotation={[-Math.PI / 2, 0, a]}
          raycast={() => null}
          frustumCulled={false}
          renderOrder={1}
        >
          <coneGeometry args={[BEAM_BASE_R * 0.14, BEAM_LEN * 1.015, 28, 1, true]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.42}
            blending={AdditiveBlending}
            depthWrite={false}
            depthTest={false}
            side={DoubleSide}
          />
        </mesh>
      ))}
    </>
  );
}

function ConeBeam() {
  return (
    <mesh
      position={[0, -BEAM_LEN * 0.5, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      raycast={() => null}
      frustumCulled={false}
      renderOrder={1}
    >
      <coneGeometry args={[BEAM_BASE_R, BEAM_LEN, 80, 1, true]} />
      <meshBasicMaterial
        color="#ffffff"
        transparent
        opacity={0.68}
        blending={AdditiveBlending}
        depthWrite={false}
        depthTest={false}
        side={DoubleSide}
      />
    </mesh>
  );
}

function BottomCornerRig({
  side,
  swingRef,
  beamSpreadRef,
}: {
  side: "left" | "right";
  swingRef: RefObject<Group | null>;
  beamSpreadRef: MutableRefObject<number>;
}) {
  const rig = useRef<Group>(null);
  const beamSpreadMesh = useRef<Group>(null);
  const { camera, size } = useThree();

  useFrame(() => {
    const s = Math.max(0.06, beamSpreadRef.current);
    if (beamSpreadMesh.current) {
      beamSpreadMesh.current.scale.set(s, 1, s);
    }
  });

  useLayoutEffect(() => {
    const g = rig.current;
    if (!g) return;
    _ndcCorner.set(side === "left" ? -NDC_SIDE : NDC_SIDE, NDC_BOTTOM);
    _ray.setFromCamera(_ndcCorner, camera);
    const hit = _ray.ray.intersectPlane(STAGE_PLANE, _hit);
    if (hit) {
      g.position.copy(hit);
    } else {
      g.position.set(side === "left" ? -8.4 : 8.4, -5.1, 5.6);
    }
    g.lookAt(AIM);
  }, [side, camera, size.width, size.height]);

  return (
    <group ref={rig}>
      <group ref={swingRef}>
        <SpotLight
          castShadow={false}
          angle={0.56}
          penumbra={0.7}
          intensity={1750}
          color="#ffffff"
          distance={920}
          opacity={0.94}
          attenuation={2.85}
          anglePower={1.85}
          volumetric
        />
        <group ref={beamSpreadMesh}>
          <ConeBeam />
          <GodRayVeins />
        </group>
      </group>
    </group>
  );
}

function AnimatedPair({
  frozen,
  beamSpreadRef,
}: {
  frozen: boolean;
  beamSpreadRef: MutableRefObject<number>;
}) {
  const leftSwing = useRef<Group>(null);
  const rightSwing = useRef<Group>(null);
  const t = useRef(0);

  useFrame((_, dt) => {
    if (frozen) return;
    t.current += dt;
    const u = t.current;
    /** Интенсивное сканирование: широкий рысканье + быстрые слои («ищут беглеца») */
    const slow = u * 0.62;
    if (leftSwing.current) {
      const yawL =
        Math.sin(slow) * 0.34 +
        Math.sin(u * 1.05 + 0.5) * 0.16 +
        Math.sin(u * 2.15) * 0.08;
      const pitchL =
        Math.sin(u * 1.12 + 1.05) * 0.17 + Math.cos(u * 0.88 + 0.3) * 0.09;
      leftSwing.current.rotation.y = yawL;
      leftSwing.current.rotation.x = pitchL;
      leftSwing.current.rotation.z = Math.sin(u * 1.45) * 0.045;
    }
    if (rightSwing.current) {
      const yawR =
        Math.sin(slow + 2.37) * 0.34 +
        Math.sin(u * 0.98 + 2.2) * 0.16 +
        Math.sin(u * 2.05 + 1.1) * 0.08;
      const pitchR =
        Math.sin(u * 1.08 + 0.2) * 0.17 + Math.cos(u * 0.91 + 2.4) * 0.09;
      rightSwing.current.rotation.y = yawR;
      rightSwing.current.rotation.x = pitchR;
      rightSwing.current.rotation.z = Math.sin(u * 1.38 + 2.2) * -0.045;
    }
  });

  return (
    <>
      <BottomCornerRig
        side="left"
        swingRef={leftSwing}
        beamSpreadRef={beamSpreadRef}
      />
      <BottomCornerRig
        side="right"
        swingRef={rightSwing}
        beamSpreadRef={beamSpreadRef}
      />
    </>
  );
}

function BatSignalBillboard() {
  const glowMap = useMemo(() => {
    if (typeof document === "undefined") return null;
    return createBatSignalGlowTexture();
  }, []);
  const batMap = useLoader(TextureLoader, BAT_OUTLINE_URL);
  const groupRef = useRef<Group>(null);

  useLayoutEffect(() => {
    batMap.colorSpace = SRGBColorSpace;
    batMap.needsUpdate = true;
  }, [batMap]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const p = 1 + Math.sin(state.clock.elapsedTime * 1.65) * 0.045;
    groupRef.current.scale.setScalar(p);
  });

  if (!glowMap) return null;

  return (
    <group ref={groupRef} position={[AIM.x, AIM.y - 0.12, AIM.z + 0.22]}>
      <Billboard follow lockZ={false}>
        <mesh position={[0, 0, -0.03]} renderOrder={24} raycast={() => null}>
          <planeGeometry args={[BAT_BOARD_W, BAT_BOARD_H]} />
          <meshBasicMaterial
            map={glowMap}
            transparent
            opacity={0.48}
            blending={AdditiveBlending}
            depthWrite={false}
            depthTest={false}
            side={DoubleSide}
          />
        </mesh>
        <mesh renderOrder={26} raycast={() => null}>
          <planeGeometry args={[BAT_BOARD_W, BAT_BOARD_H]} />
          <meshBasicMaterial
            map={batMap}
            transparent
            opacity={0.34}
            blending={AdditiveBlending}
            depthWrite={false}
            depthTest={false}
            side={DoubleSide}
          />
        </mesh>
      </Billboard>
    </group>
  );
}

function Scene({ frozen }: { frozen: boolean }) {
  const beamSpreadRef = useRef(0);

  useFrame((state) => {
    if (frozen) {
      beamSpreadRef.current = 1;
      return;
    }
    const t = state.clock.elapsedTime;
    beamSpreadRef.current = 1 - Math.exp(-t * 0.52);
  });

  return (
    <>
      <ambientLight intensity={0.008} />
      <AnimatedPair frozen={frozen} beamSpreadRef={beamSpreadRef} />
      <BatSignalBillboard />
    </>
  );
}

export function HeroSpotlight3D() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[6] min-h-[50%] w-full md:min-h-[70%]"
      aria-hidden
    >
      <Canvas
        className="!h-full !w-full"
        style={{ touchAction: "none" }}
        camera={{ position: [0, -0.45, 10.6], fov: 41, near: 0.1, far: 960 }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
          stencil: false,
          premultipliedAlpha: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.toneMappingExposure = 1.35;
        }}
      >
        <Suspense fallback={null}>
          <Scene frozen={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}
