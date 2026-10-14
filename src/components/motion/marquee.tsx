import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
  /** Seconds for one full loop. */
  duration?: number;
}

/** An endlessly scrolling strip. Duplicated content keeps the loop seamless. */
export function Marquee({ items, className, duration = 48 }: MarqueeProps) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-[clamp(1.25rem,3vw,3rem)] font-display text-[clamp(2.25rem,6vw,5.5rem)] font-semibold leading-none">
            {item}
          </span>
          <span className="size-2 rounded-full bg-signal" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn("marquee overflow-hidden", className)}
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
    >
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
