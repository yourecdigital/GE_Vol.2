declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
    CustomEase: any;
  }
}

let promise: Promise<void> | null = null;

const SCRIPTS = [
  "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js",
];

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => resolve();
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

export function loadGSAP(): Promise<void> {
  if (promise) return promise;
  promise = (async () => {
    for (const src of SCRIPTS) await loadScript(src);
    const { gsap, ScrollTrigger, CustomEase } = window as typeof window;
    (gsap as any).registerPlugin(ScrollTrigger, CustomEase);
    (CustomEase as any).create("expo", "0.16, 1, 0.3, 1");
    (CustomEase as any).create("bounce", "0.34, 1.56, 0.64, 1");
  })();
  return promise;
}
