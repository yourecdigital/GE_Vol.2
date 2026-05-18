export function ManifestoSection() {
  return (
    <section id="manifesto" aria-labelledby="m1">
      <p className="manifesto-label" id="mLabel">// 04 / 21 — МАНИФЕСТ</p>
      <div className="manifesto-lines">
        <div className="manifesto-line">
          <span className="manifesto-big" id="m1">ДВИЖ — ЭТО</span>
        </div>
        <div className="manifesto-line">
          <span className="manifesto-big manifesto-strike" id="m2">НЕ КЛУБ.</span>
        </div>
        <div className="manifesto-line">
          <span className="manifesto-big manifesto-strike" id="m3">НЕ ТУСА.</span>
        </div>
        <div className="manifesto-line">
          <span className="manifesto-big manifesto-strike" id="m4">НЕ ДВИЖЕНИЕ.</span>
        </div>
        <div className="manifesto-line">
          <span className="manifesto-state" id="m5">это состояние,</span>
        </div>
      </div>
      <p className="manifesto-body" id="manifestoBody">
        В котором собрался район, и всё, что не движ — отъехало в фон.
        Это не тусовка и не клуб. Ты просто знаешь, что сюда идти.
        Без афиш. По любви. ДВИЖ — это когда один человек может поднять
        целый район, и все вокруг чувствуют: вот оно, началось.
      </p>
    </section>
  );
}
