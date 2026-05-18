const BLOBS = [
  { w: 72,  left: "2%",  color: "#1c1c1c", blur: 18, dur: "8s",   del: "0s",   mo: 0.32, dir: 1 },
  { w: 110, left: "10%", color: "#222",    blur: 28, dur: "11s",  del: "2.1s", mo: 0.22, dir: 0 },
  { w: 88,  left: "21%", color: "#1a1a1a", blur: 22, dur: "9.5s", del: "1s",   mo: 0.28, dir: -1 },
  { w: 130, left: "33%", color: "#282828", blur: 35, dur: "13s",  del: "3.5s", mo: 0.18, dir: 1 },
  { w: 60,  left: "44%", color: "#3a1200", blur: 15, dur: "7.5s", del: "0.4s", mo: 0.14, dir: 0 },
  { w: 96,  left: "55%", color: "#1f1f1f", blur: 24, dur: "10s",  del: "4.2s", mo: 0.24, dir: -1 },
  { w: 55,  left: "64%", color: "#2e1000", blur: 14, dur: "6.8s", del: "1.8s", mo: 0.12, dir: 1 },
  { w: 105, left: "73%", color: "#242424", blur: 26, dur: "11.5s",del: "5s",   mo: 0.20, dir: 0 },
  { w: 80,  left: "83%", color: "#1a1a1a", blur: 20, dur: "8.8s", del: "2.6s", mo: 0.26, dir: -1 },
  { w: 65,  left: "92%", color: "#1c1c1c", blur: 16, dur: "7.2s", del: "0.8s", mo: 0.30, dir: 1 },
];

const ANIM = ["smoke-up-l", "smoke-up", "smoke-up-r"] as const;

export function SmokeEffect() {
  return (
    <div className="smoke-canvas-wrap" aria-hidden="true">
      {BLOBS.map((b, i) => (
        <span
          key={i}
          className="smoke-blob"
          style={{
            width: b.w,
            height: b.w,
            left: b.left,
            background: b.color,
            filter: `blur(${b.blur}px)`,
            animationName: ANIM[((b.dir + 1) as 0 | 1 | 2)],
            animationDuration: b.dur,
            animationDelay: b.del,
            ["--mo" as string]: b.mo,
          }}
        />
      ))}
    </div>
  );
}
