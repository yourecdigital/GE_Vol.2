import Link from "next/link";

export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="svT1">
      <p className="services-label" id="svLabel">
        // 16 / 21 — ЧТО Я ДЕЛАЮ · SERVICES
      </p>
      <div className="services-title">
        <span id="svT1">ЧТО</span>
        <span id="svT2">Я ДЕЛАЮ.</span>
      </div>
      <div className="services-grid">
        <Link href="/tours/" className="service-card" id="sc1">
          <span className="service-num">01</span>
          <div className="service-name">ДВИЖ.</div>
          <div className="service-sub">туры</div>
          <p className="service-desc">
            Приеду в твой город. Соберём своих. Поднимем район.
            Без афиш — только сарафан. 37 городов за 14 лет.
          </p>
        </Link>
        <Link href="/parties/" className="service-card" id="sc2">
          <span className="service-num">02</span>
          <div className="service-name">ДВИЖ.</div>
          <div className="service-sub">тусы</div>
          <p className="service-desc">
            Клубные вечера, хата-вписки, крыши, набережные. 38+ клубных ночей в лучших площадках города.
          </p>
        </Link>
        <Link href="/camp/" className="service-card" id="sc3">
          <span className="service-num">03</span>
          <div className="service-name">ДВИЖ.</div>
          <div className="service-sub">лагерь</div>
          <p className="service-desc">
            10 дней у воды без сети. Палатки, костёр, гитара, рыба, утро у воды. 2 смены в год, 14 смен за всё время.
          </p>
        </Link>
        <Link href="/rehab/" className="service-card" id="sc4">
          <span className="service-num">04 — ФЛАГМАН</span>
          <div className="service-name">ГЛАВВРАЧ.</div>
          <div className="service-sub">жить в кайф</div>
          <p className="service-desc">
            Для тех, кому громко в голове — делаем тише. Главврач — я. Это не медкарта, это подход к жизни.
          </p>
        </Link>
      </div>
    </section>
  );
}
