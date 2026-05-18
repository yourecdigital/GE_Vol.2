import Image from "next/image";

import { cn } from "@/lib/utils";

/** Винтажный круглый кэпс (POG) — вместо декоративного «курсора» */
export function PokemonPogCap({
  className,
  width = 128,
  height = 128,
}: {
  className?: string;
  /** Натуральный размер файла; масштаб задаётся через className */
  width?: number;
  height?: number;
}) {
  return (
    <picture className={cn("block bg-transparent leading-none", className)}>
      <source srcSet="/images/pokemon-pog-cap.webp" type="image/webp" />
      <Image
        src="/images/pokemon-pog-cap.png"
        alt=""
        width={width}
        height={height}
        draggable={false}
        className={cn(
          "h-full w-full rounded-full object-contain object-center opacity-[0.94]",
        )}
      />
    </picture>
  );
}
