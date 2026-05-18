export function QuoteSection() {
  return (
    <section id="quote" aria-label="Цитата">
      <div className="quote-inner">
        <p className="quote-label" id="qLabel">// 15 / 21 — ЦИТАТА · ОТ СВОИХ</p>
        <blockquote className="quote-text">
          <span id="qt1">СВОИХ НЕ БРОСАЕМ</span>
          <span id="qt2">НИ НОРМАЛЬНЫХ,</span>
          <span className="handwritten" id="qt3">ни психов!</span>
        </blockquote>
        <p className="quote-sig" id="qSig">— Ю. Н. Максимов</p>
      </div>
    </section>
  );
}
