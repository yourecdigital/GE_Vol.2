export function StatsSection() {
  return (
    <section id="stats" aria-labelledby="statsLabel">
      <p className="stats-label" id="statsLabel">
        // 12 / 21 — ЦИФРЫ · NUMBERS · 2012 — 2026
      </p>
      <div className="stats-grid">
        <div className="stat-item" id="s1">
          <span className="stat-num orange" data-target="2417">0</span>
          <span className="stat-label">ТУСОВОК ЗА 14 ЛЕТ</span>
          <p className="stat-sub">Из них 1838 — без афиш</p>
        </div>
        <div className="stat-item" id="s2">
          <span className="stat-num" data-target="37">0</span>
          <span className="stat-label">ГОРОДОВ</span>
          <p className="stat-sub">По России и Европе</p>
        </div>
        <div className="stat-item" id="s3">
          <span className="stat-num" data-target="14">0</span>
          <span className="stat-label">СМЕН В ЛАГЕРЕ</span>
          <p className="stat-sub">Каждый раз у воды</p>
        </div>
        <div className="stat-item" id="s4">
          <span className="stat-num orange">∞</span>
          <span className="stat-label">СВОИХ</span>
          <p className="stat-sub">Это не считается</p>
        </div>
        <div className="stat-item" id="s5">
          <span className="stat-num" data-target="38">0</span>
          <span className="stat-label">КЛУБНЫХ НОЧЕЙ</span>
          <p className="stat-sub">+38 events</p>
        </div>
        <div className="stat-item" id="s6">
          <span className="stat-num orange">F20</span>
          <span className="stat-label">МКБ-10</span>
          <p className="stat-sub">Это визитка, а не медкарта</p>
        </div>
      </div>
    </section>
  );
}
