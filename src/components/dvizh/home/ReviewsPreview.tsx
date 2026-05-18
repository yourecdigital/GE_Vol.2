export function ReviewsPreview() {
  return (
    <section id="reviews" aria-labelledby="revT1">
      <p className="reviews-label" id="revLabel">
        // 17 / 21 — ОТЗЫВЫ СВОИХ · REFERENCES
      </p>
      <div className="reviews-title">
        <span id="revT1">ОТЗЫВЫ</span>
        <span className="orange" id="revT2">СВОИХ.</span>
      </div>
      <div className="reviews-grid">
        <article className="review-card" id="rv1">
          <span className="review-quote-mark" aria-hidden="true">&ldquo;</span>
          <p className="review-text">
            Юра поднял мне район за вечер. Думал — не бывает. Бывает.
          </p>
          <div className="review-author">
            <span className="review-name">Толик</span>
            <span className="review-meta">Купчино · 2014</span>
          </div>
        </article>
        <article className="review-card" id="rv2">
          <span className="review-quote-mark" aria-hidden="true">&ldquo;</span>
          <p className="review-text">
            Не отвечает в личке день — а потом ставит трек и оказывается рядом.
          </p>
          <div className="review-author">
            <span className="review-name">Катя</span>
            <span className="review-meta">Гражданка · 2019</span>
          </div>
        </article>
        <article className="review-card" id="rv3">
          <span className="review-quote-mark" aria-hidden="true">&ldquo;</span>
          <p className="review-text">
            На лагере он первый у костра и последний у воды. Это и есть движ.
          </p>
          <div className="review-author">
            <span className="review-name">Лёха</span>
            <span className="review-meta">Смена 2 · 2023</span>
          </div>
        </article>
      </div>
    </section>
  );
}
