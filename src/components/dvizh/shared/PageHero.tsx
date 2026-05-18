interface PageHeroProps {
  label: string;
  title: string;
  accent?: string;
  description?: string;
}

export function PageHero({ label, title, accent, description }: PageHeroProps) {
  return (
    <section className="page-hero" aria-labelledby="page-hero-title">
      <p className="page-hero-label">{label}</p>
      <h1 className="page-hero-title" id="page-hero-title">
        {title}
        {accent && (
          <>
            <br />
            <span className="accent">{accent}</span>
          </>
        )}
      </h1>
      {description && <p className="page-hero-desc">{description}</p>}
    </section>
  );
}
