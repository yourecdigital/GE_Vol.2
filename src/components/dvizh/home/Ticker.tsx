const ITEMS = [
  "ДВИЖ — ЭТО СОСТОЯНИЕ",
  "БЕЗ БИЛЕТОВ",
  "БЕЗ АФИШ",
  "ПО ЛЮБВИ",
  "СВОИХ НЕ БРОСАЕМ",
  "@XXIBRO",
  "САНКТ-ПЕТЕРБУРГ 2026",
  "СЕЗОН XII",
];

function TickerSet() {
  return (
    <>
      {ITEMS.map((item) => (
        <span key={item}>
          <span className="ticker-item">{item}</span>
          <span className="ticker-sep">·</span>
        </span>
      ))}
    </>
  );
}

export function Ticker() {
  return (
    <div className="ticker-wrap" aria-hidden="true">
      <div className="ticker-inner">
        <TickerSet />
        <TickerSet />
      </div>
    </div>
  );
}
