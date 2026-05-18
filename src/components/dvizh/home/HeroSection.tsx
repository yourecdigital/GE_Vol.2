export function HeroSection() {
  return (
    <section id="hero" aria-labelledby="heroName1">
      <div className="hero-meta" id="heroMeta">
        <span>01 / 21</span>
        <span>САНКТ-ПЕТЕРБУРГ</span>
        <span>2012 — ∞</span>
        <span>V.3 // 2026</span>
      </div>

      <div className="hero-headline">
        <div className="hero-name-row">
          <span className="hero-name" id="heroName1">ЮРА</span>
        </div>
        <div className="hero-name-row">
          <span className="hero-name" id="heroName2">МАКСИМОВ</span>
          <img
            src="/dvizh-logo.png"
            className="hero-dvizh"
            id="heroDvizh"
            alt="движ!"
            width={400}
            height={228}
          />
        </div>
      </div>

      <div className="hero-sub" id="heroSub">
        <p className="hero-desc">
          ОТЕЦ ДВИЖА · FOUNDER OF DVIZH<br />
          @XXIBRO · С 2012 — ПОДНИМАЮ РАЙОН В ГОРОДЕ И ТАМ, КУДА ПРИЕХАЛ
        </p>
        <div className="hero-scroll-hint">
          <div className="scroll-line" />
          <span>СКРОЛЛ</span>
        </div>
      </div>

      <div className="hero-count" id="heroCount">
        <em>2417</em> ТУСОВОК ЗА 14 ЛЕТ
      </div>
    </section>
  );
}
