export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="ctT1">
      <p className="contact-eyebrow" id="ctEye">
        // 20 / 21 — КОНТАКТЫ · GET IN TOUCH
      </p>
      <div className="contact-big">
        <span id="ctT1">ПИШИ.</span>
      </div>
      <div className="contact-script">
        <span id="ctT2">в личку!</span>
      </div>
      <a
        href="https://t.me/xxibro"
        className="contact-handle"
        id="ctHandle"
        target="_blank"
        rel="noopener noreferrer"
      >
        @XXIBRO
      </a>
      <address className="contact-meta" id="ctMeta" style={{ fontStyle: "normal" }}>
        <strong>TELEGRAM</strong> t.me/xxibro<br />
        <strong>ГОРОД</strong> Санкт-Петербург<br />
        <strong>РЕЖИМ</strong> Отвечаю когда выхожу из воды
      </address>
    </section>
  );
}
