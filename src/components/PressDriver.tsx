"use client";

import { useEffect } from "react";

/**
 * Publishes --press-nx/--press-ny on :root as the pointer position, normalized to -1..1.
 * The .cmyk-head plates (see globals.css) read these to lean a breath toward the cursor.
 * Skipped entirely under prefers-reduced-motion or on touch-only devices -- the vars simply
 * stay at their CSS default of 0, which renders as a static (still legible) triple-plate mark.
 */
export default function PressDriver() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (reduceMotion || coarsePointer) return;

    function onMove(e: PointerEvent) {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      document.documentElement.style.setProperty("--press-nx", nx.toFixed(3));
      document.documentElement.style.setProperty("--press-ny", ny.toFixed(3));
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return null;
}
