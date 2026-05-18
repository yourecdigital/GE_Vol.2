export function CampPreview() {
  return (
    <section id="camp" aria-labelledby="campT1">
      <div className="camp-inner">
        <div>
          <p className="camp-label" id="campLabel">
            // 08 / 21 — ДВИЖ.ЛАГЕРЬ · OFF THE GRID
          </p>
          <div className="camp-title">
            <span id="campT1">ЛАГЕРЬ.</span>
            <span className="camp-script" id="campT2">у воды!</span>
          </div>
          <p className="camp-desc" id="campDesc">
            10 дней без интернета. Палатки, костёр, гитара, рыба, утро у воды.
            Никаких афиш — координаты только в личке. Каждый лагерь — это перезагрузка.
            Ты уезжаешь другим человеком. Проверено на 14 сменах.
          </p>
        </div>
        <div className="camp-details" id="campDetails">
          <div className="camp-detail">
            <span className="key">СМЕНА №2</span>
            <span className="val accent">
              <time dateTime="2026-07-12">12–22 ИЮЛЯ</time>
            </span>
          </div>
          <div className="camp-detail">
            <span className="key">ПАЛАТКА</span>
            <span className="val">СВОЯ</span>
          </div>
          <div className="camp-detail">
            <span className="key">ЕДА</span>
            <span className="val">ОБЩАК</span>
          </div>
          <div className="camp-detail">
            <span className="key">ИНТЕРНЕТ</span>
            <span className="val" style={{ color: "var(--gray)" }}>НЕТ</span>
          </div>
          <div className="camp-detail">
            <span className="key">ДВИЖ</span>
            <span className="val accent">ДА</span>
          </div>
          <div className="camp-detail">
            <span className="key">ЗАЯВКА</span>
            <span className="val accent">→ @XXIBRO</span>
          </div>
        </div>
      </div>
    </section>
  );
}
