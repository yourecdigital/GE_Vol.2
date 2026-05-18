export interface OrganizerCardProps {
  name: string;
  handle: string;
  role: string;
  tier: 1 | 2 | 3 | 4 | 5;
  city?: string;
  since?: string;
}

const TIER_LABELS: Record<number, string> = {
  1: "ТИР I",
  2: "ТИР II",
  3: "ТИР III",
  4: "ТИР IV",
  5: "ТИР V",
};

export function OrganizerCard({ name, handle, role, tier, city, since }: OrganizerCardProps) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <article className="org-card">
      <span className="org-tier-badge">{TIER_LABELS[tier]}</span>
      <div className="org-avatar" aria-hidden="true">
        {initials}
      </div>
      <div className="org-name">{name}</div>
      <div className="org-handle">{handle}</div>
      <div className="org-role">{role}</div>
      {city && <div className="org-city">{city}{since ? ` · с ${since}` : ""}</div>}
    </article>
  );
}
