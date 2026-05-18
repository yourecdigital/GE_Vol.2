export function TourPreview() {
  return (
    <section id="tour" aria-labelledby="tourT1">
      <p className="tour-label" id="tourLabel">
        // 06 / 21 — ДВИЖ.ТУРЫ · TOUR 2026 · СЕЗОН XII
      </p>
      <div className="tour-header">
        <div>
          <div className="tour-title">
            <span id="tourT1">ТУР 2026.</span>
            <span className="script" id="tourT2">по своим!</span>
          </div>
        </div>
        <div className="tour-meta">
          <strong>06</strong>
          ОСТАНОВОК<br />
          ЯНВ — АВГ<br />
          ВХОД → @XXIBRO
        </div>
      </div>
      <div className="tour-dates">
        <div className="tour-date" id="td1">
          <div className="date-num"><time dateTime="2026-01-14">14 ЯНВ</time></div>
          <div className="date-loc">Купчино · обнимка во дворе</div>
          <div className="date-note">ПРОШЛО</div>
        </div>
        <div className="tour-date" id="td2">
          <div className="date-num"><time dateTime="2026-02-09">9 ФЕВ</time></div>
          <div className="date-loc">Кунцино · хата у Толика</div>
          <div className="date-note">ПРОШЛО</div>
        </div>
        <div className="tour-date" id="td3">
          <div className="date-num"><time dateTime="2026-03-19">19 МАР</time></div>
          <div className="date-loc">Гражданка · набережная</div>
          <div className="date-note">ПРОШЛО</div>
        </div>
        <div className="tour-date" id="td4">
          <div className="date-num"><time dateTime="2026-05-31">31 МАЯ</time></div>
          <div className="date-loc">Шушары · озеро</div>
          <div className="date-note">СКОРО</div>
        </div>
        <div className="tour-date" id="td5">
          <div className="date-num"><time dateTime="2026-06-20">20 ИЮН</time></div>
          <div className="date-loc">Девяткино · крыша</div>
          <div className="date-note">СКОРО</div>
        </div>
        <div className="tour-date final" id="td6">
          <div className="date-num">
            <time dateTime="2026-08-31">31 АВГ</time> <span className="date-star">★</span>
          </div>
          <div className="date-loc">Сестрорецк · залив</div>
          <div className="date-note">ФИНАЛ</div>
        </div>
      </div>
    </section>
  );
}
