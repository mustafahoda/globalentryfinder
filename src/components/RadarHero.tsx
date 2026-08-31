"use client";

import { useEffect, useState } from "react";

interface Blip {
  city: string;
  code: string;
  top: string;
  left: string;
  delay: string;
}

const BLIPS: Blip[] = [
  { city: "Seattle", code: "SEA", top: "14%", left: "10%", delay: "0s" },
  { city: "Los Angeles", code: "LAX", top: "58%", left: "8%", delay: "0.4s" },
  { city: "Denver", code: "DEN", top: "42%", left: "34%", delay: "0.9s" },
  { city: "Houston", code: "IAH", top: "72%", left: "44%", delay: "1.3s" },
  { city: "Chicago", code: "ORD", top: "28%", left: "58%", delay: "0.2s" },
  { city: "Atlanta", code: "ATL", top: "64%", left: "66%", delay: "1.6s" },
  { city: "Boston", code: "BOS", top: "18%", left: "84%", delay: "0.7s" },
  { city: "New York", code: "JFK", top: "30%", left: "86%", delay: "1.1s" },
];

function useClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export default function RadarHero() {
  const time = useClock();

  return (
    <div className="relative w-full aspect-square max-w-md mx-auto rounded-2xl border border-white/10 bg-ink-raised overflow-hidden">
      {/* concentric range rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[1, 0.72, 0.44].map((scale) => (
          <div
            key={scale}
            className="absolute rounded-full border border-amber/15"
            style={{ width: `${scale * 100}%`, height: `${scale * 100}%` }}
          />
        ))}
      </div>

      {/* rotating sweep */}
      <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <div className="w-1/2 h-1/2 origin-bottom-right animate-sweep">
          <div className="w-full h-full bg-radar-grid" />
        </div>
      </div>

      {/* blips */}
      {BLIPS.map((b) => (
        <div
          key={b.code}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
          style={{ top: b.top, left: b.left }}
        >
          <span
            className="block h-2 w-2 rounded-full bg-amber animate-blip"
            style={{ animationDelay: b.delay }}
          />
          <span className="mt-1 font-mono text-[10px] tracking-wide text-paper/50">{b.code}</span>
        </div>
      ))}

      {/* readout */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[11px] text-paper/60">
        <span>SCANNING {BLIPS.length} CENTERS</span>
        <span suppressHydrationWarning>{time ? `LAST SCAN ${time}` : "LAST SCAN --:--:--"}</span>
      </div>
    </div>
  );
}
