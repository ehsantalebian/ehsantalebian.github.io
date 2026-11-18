"use client";

import { useEffect, useState } from "react";

/** Full-screen loader that slides away once the page has loaded (replaces preloader.min.js). */
export default function Preloader() {
  const [off, setOff] = useState(false);

  useEffect(() => {
    if (document.readyState === "complete") {
      setOff(true);
      return;
    }
    const done = () => setOff(true);
    window.addEventListener("load", done);
    return () => window.removeEventListener("load", done);
  }, []);

  return (
    <div id="preloader" className={`preloader${off ? " off" : ""}`}>
      <div className="black_wall" />
      <div className="loader" />
    </div>
  );
}
