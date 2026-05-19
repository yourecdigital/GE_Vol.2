import { cn } from "@/lib/utils";

/**
 * Layered mountain section divider (pattern from shapedivider.app «Mountains»).
 * Three ridges — Caucasus silhouette; front fill = next section background.
 */
type MountainDividerProps = {
  /** Fill below the skyline — next section background */
  fill?: string;
  className?: string;
  heightClassName?: string;
};

const VIEWBOX = "0 0 1440 120";

const RIDGE_BACK =
  "M0,120 V48 L140,48 L260,32 L400,44 L540,26 L680,40 L820,24 L980,38 L1120,28 L1280,40 L1440,34 V120 H0Z";

const RIDGE_MID =
  "M0,120 V62 L100,62 L220,42 L360,56 L500,34 L640,52 L780,30 L920,48 L1060,36 L1200,52 L1340,40 L1440,50 V120 H0Z";

const RIDGE_FRONT =
  "M0,120 V76 L120,76 L210,50 L310,70 L400,36 L500,58 L600,28 L710,52 L820,24 L930,48 L1040,32 L1150,54 L1260,42 L1360,56 L1440,44 V120 H0Z";

export function MountainDivider({
  fill = "#0e0a0c",
  className,
  heightClassName = "h-[72px] sm:h-[100px] md:h-[120px]",
}: MountainDividerProps) {
  return (
    <div
      className={cn("section-divider-mountains pointer-events-none w-full leading-none", className)}
      aria-hidden
    >
      <svg
        viewBox={VIEWBOX}
        fill="none"
        preserveAspectRatio="none"
        className={cn("block w-full", heightClassName)}
      >
        <path d={RIDGE_BACK} fill="rgba(164, 86, 50, 0.14)" />
        <path d={RIDGE_MID} fill="rgba(164, 86, 50, 0.26)" />
        <path d={RIDGE_FRONT} fill={fill} />
      </svg>
    </div>
  );
}
