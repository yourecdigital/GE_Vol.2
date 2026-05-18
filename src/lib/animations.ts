export function revealUp(
  selector: string | string[],
  trigger: string,
  stagger = 0,
) {
  const { gsap } = window as any;
  gsap.to(selector, {
    y: "0%",
    duration: 1.1,
    ease: "expo",
    stagger,
    scrollTrigger: { trigger, start: "top 78%" },
  });
}

export function fadeIn(
  selector: string,
  trigger: string,
  opts: Record<string, unknown> = {},
) {
  const { gsap } = window as any;
  gsap.to(selector, {
    opacity: 1,
    y: 0,
    x: 0,
    duration: 0.8,
    ease: "expo",
    ...opts,
    scrollTrigger: { trigger, start: "top 80%" },
  });
}

export function countUp(el: Element) {
  const { gsap, ScrollTrigger } = window as any;
  const target = parseInt((el as HTMLElement).dataset.target || "0");
  if (!target) return;
  ScrollTrigger.create({
    trigger: el,
    start: "top 80%",
    onEnter: () => {
      gsap.to({ val: 0 }, {
        val: target,
        duration: 1.8,
        ease: "power2.out",
        onUpdate: function (this: { targets(): { val: number }[] }) {
          el.textContent = Math.round(this.targets()[0].val).toLocaleString("ru");
        },
      });
    },
  });
}
