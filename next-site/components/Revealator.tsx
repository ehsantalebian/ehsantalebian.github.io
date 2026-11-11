"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const STATES = [
  "revealator-below",
  "revealator-partially-below",
  "revealator-within",
  "revealator-partially-above",
  "revealator-above",
];

/**
 * Port of fm.revealator.jquery.js (the `revealator-once` behaviour) without jQuery.
 * Also applies the original `no-transform` fix from custom.js, so elements fade in
 * rather than slide. Re-runs on every route change.
 */
export default function Revealator() {
  const pathname = usePathname();

  useEffect(() => {
    const refresh = () => {
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>('[class*="revealator-once"]').forEach((el) => {
        const r = el.getBoundingClientRect();
        let state: string;
        if (r.top > vh && r.bottom > vh) state = "revealator-below";
        else if (r.top < vh && r.bottom > vh) state = "revealator-partially-below";
        else if (r.top < 0 && r.bottom > 0) state = "revealator-partially-above";
        else if (r.top < 0 && r.bottom < 0) state = "revealator-above";
        else state = "revealator-within";

        if (el.classList.contains(state)) return;
        if (!el.classList.contains("revealator-within")) {
          el.classList.remove(...STATES);
          el.classList.add(state);
        }
        if (state === "revealator-partially-above" || state === "revealator-above") {
          el.classList.add("revealator-within");
        }
      });
    };

    document.querySelectorAll(".revealator-delay1").forEach((el) => el.classList.add("no-transform"));

    let busy = false;
    const throttled = () => {
      if (busy) return;
      busy = true;
      setTimeout(() => {
        busy = false;
        refresh();
      }, 150);
    };

    refresh();
    window.addEventListener("scroll", throttled);
    window.addEventListener("resize", throttled);
    window.addEventListener("load", throttled);
    return () => {
      window.removeEventListener("scroll", throttled);
      window.removeEventListener("resize", throttled);
      window.removeEventListener("load", throttled);
    };
  }, [pathname]);

  return null;
}
