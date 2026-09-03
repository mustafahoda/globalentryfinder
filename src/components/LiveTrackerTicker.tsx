"use client";

import { useLiveTrackerContext } from "@/components/LiveTrackerProvider";
import { TRACKED_LOCATIONS } from "@/lib/ttpLocations";

export default function LiveTrackerTicker() {
  const { lastChecked, secondsRemaining, openCount } = useLiveTrackerContext();

  return (
    <a
      href="#live-tracker"
      className="group inline-flex items-center gap-2.5 mt-5 text-[13px] text-neutral-700 hover:text-ink"
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-2 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-2" />
      </span>
      <span className="tabular-nums">
        {lastChecked
          ? openCount > 0
            ? `Live: ${openCount} of ${TRACKED_LOCATIONS.length} centers have openings right now`
            : `Live: watching ${TRACKED_LOCATIONS.length} centers, next check in ${secondsRemaining}s`
          : "Live: checking the official scheduler now…"}
      </span>
      <span className="text-accent underline-offset-2 group-hover:underline">See it ↓</span>
    </a>
  );
}
