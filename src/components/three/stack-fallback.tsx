import { cn } from "@/lib/utils";

/**
 * Still version of the 3D stack. Shown while the 3D scene loads, when WebGL is unavailable
 * and whenever the scene fails to start, so the composition never has a hole in it.
 */
export function StackFallback({ className }: { className?: string }) {
  const layers = [0, 1, 2, 3];

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none flex size-full items-center justify-center", className)}
    >
      <svg viewBox="0 0 400 470" className="h-[88%] max-h-[620px] w-auto" fill="none">
        <defs>
          <linearGradient id="slab-top" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1a1a1a" />
            <stop offset="1" stopColor="#0d0d0d" />
          </linearGradient>
        </defs>
        {layers.map((index) => {
          const y = 18 + index * 102;
          return (
            <g key={index} stroke="#C6FF4A" strokeOpacity={0.6} strokeWidth={1.2} strokeLinejoin="round">
              <polygon points={`200,${y} 360,${y + 70} 200,${y + 140} 40,${y + 70}`} fill="url(#slab-top)" />
              <polygon points={`40,${y + 70} 200,${y + 140} 200,${y + 156} 40,${y + 86}`} fill="#0b0b0b" />
              <polygon points={`200,${y + 140} 360,${y + 70} 360,${y + 86} 200,${y + 156}`} fill="#090909" />
            </g>
          );
        })}
        <line x1="200" y1="10" x2="200" y2="462" stroke="#C6FF4A" strokeOpacity={0.35} strokeDasharray="2 8" />
        {[60, 160, 262, 360].map((cy) => (
          <circle key={cy} cx="200" cy={cy} r="3.5" fill="#C6FF4A" />
        ))}
      </svg>
    </div>
  );
}
