import { cn, seededRandom } from "@/lib/utils";

interface ProjectCoverProps {
  seed: number;
  className?: string;
  /** Draw a dashed frame to signal that the project is still a placeholder. */
  placeholder?: boolean;
  /** Optional static image to use instead of the generated artwork. */
  imageSrc?: string;
}

/**
 * Generative cover artwork. Each project gets a stable composition from its seed, built from
 * bars rising out of a baseline with a single accent bar. No fake screenshots are used.
 */
export function ProjectCover({ seed, className, placeholder = false, imageSrc }: ProjectCoverProps) {
  if (imageSrc) {
    return <img src={imageSrc} alt="Project cover" className={cn("size-full object-cover", className)} />;
  }

  const random = seededRandom(seed);
  const bars = Array.from({ length: 22 }, (_, index) => {
    const height = 70 + random() * 300;
    return { x: 30 + index * 34, height, opacity: 0.08 + random() * 0.3 };
  });
  const accentIndex = 4 + Math.floor(random() * (bars.length - 8));
  const circle = { cx: 120 + random() * 560, cy: 90 + random() * 120, r: 40 + random() * 70 };

  return (
    <svg
      viewBox="0 0 800 500"
      role="img"
      aria-label="Generated cover artwork"
      className={cn("size-full bg-night-2", className)}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="800" height="500" fill="#101010" />
      {Array.from({ length: 7 }, (_, i) => (
        <line key={i} x1={(i + 1) * 100} y1="0" x2={(i + 1) * 100} y2="500" stroke="#F5F5F0" strokeOpacity="0.05" />
      ))}
      {bars.map((bar, index) => (
        <rect
          key={bar.x}
          x={bar.x}
          y={470 - bar.height}
          width="20"
          height={bar.height}
          fill={index === accentIndex ? "#C6FF4A" : "#F5F5F0"}
          fillOpacity={index === accentIndex ? 1 : bar.opacity}
        />
      ))}
      <circle cx={circle.cx} cy={circle.cy} r={circle.r} fill="none" stroke="#C6FF4A" strokeOpacity="0.7" />
      <circle cx={circle.cx} cy={circle.cy} r={circle.r * 0.4} fill="#C6FF4A" fillOpacity="0.12" />
      <line x1="0" y1="470" x2="800" y2="470" stroke="#F5F5F0" strokeOpacity="0.3" />
      {placeholder ? (
        <rect x="14" y="14" width="772" height="472" fill="none" stroke="#C6FF4A" strokeOpacity="0.6" strokeDasharray="8 8" />
      ) : null}
    </svg>
  );
}
