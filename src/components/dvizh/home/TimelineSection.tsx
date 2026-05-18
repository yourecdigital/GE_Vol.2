export function TimelineSection() {
  return (
    <section id="timeline" aria-labelledby="tlt1">
      <div className="timeline-header">
        <p className="timeline-label" id="tlLabel">
          // 11 / 21 — ХРОНОЛОГИЯ · TIMELINE
        </p>
        <div className="timeline-title">
          <span id="tlt1">КАК ОДИН ЧЕЛОВЕК</span>
          <span id="tlt2">ЗАВЁЛ ЦЕЛЫЙ</span>
          <span className="accent" id="tlt3">район.</span>
        </div>
      </div>
      <div className="timeline-items">
        <article className="timeline-item" id="ti1">
          <div className="timeline-year">
            <time dateTime="2012">2012</time>
          </div>
          <div>
            <div className="timeline-event">ПЕРВАЯ ВПИСКА</div>
            <p className="timeline-desc">
              Купчино, хата на подключение. Колонка на подоконнике. С этого всё начиналось — один двор, один район, один человек.
            </p>
          </div>
        </article>
        <article className="timeline-item" id="ti2">
          <div className="timeline-year">
            <time dateTime="2015">2015</time>
          </div>
          <div>
            <div className="timeline-event">ДВИЖ НА РАЙОНЕ</div>
            <p className="timeline-desc">
              Каждые выходные — своих. Без афиш, по сарафану. Движ вырос из одной хаты в целое сообщество единомышленников.
            </p>
          </div>
        </article>
        <article className="timeline-item" id="ti3">
          <div className="timeline-year">
            <time dateTime="2018">2018</time>
          </div>
          <div>
            <div className="timeline-event">УШЁЛ В ГОРОД</div>
            <p className="timeline-desc">
              Из дворов — на крыши и набережные. Туры по городам России, первые клубные ночи в Главклубе и Свободе.
            </p>
          </div>
        </article>
        <article className="timeline-item" id="ti4">
          <div className="timeline-year" style={{ color: "var(--orange)" }}>
            <time dateTime="2026">2026</time>
          </div>
          <div>
            <div className="timeline-event">ДВИЖ — ЭТО ОН</div>
            <p className="timeline-desc">
              Где Юра — там движ — уже формула. 37 городов, 14 смен лагеря, 2417 тусовок. Сезон XII.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
