"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

export function ScrollNav({ children, navClassName, label }: { children: ReactNode; navClassName: string; label?: string }) {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(() => {
        const currentY = Math.max(0, window.scrollY);
        const movement = currentY - lastY.current;
        if (currentY < 80) setHidden(false);
        else if (movement > 6) setHidden(true);
        else if (movement < -6) setHidden(false);
        lastY.current = currentY;
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div className={`scroll-nav ${hidden ? "scroll-nav--hidden" : ""}`}>
    <nav className={navClassName} aria-label={label}>{children}</nav>
  </div>;
}
