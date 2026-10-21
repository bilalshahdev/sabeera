"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

export function ScrollNav({ children, navClassName, label }: { children: ReactNode; navClassName: string; label?: string }) {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const accumulatedMovement = useRef(0);
  const lastDirection = useRef<"up" | "down" | null>(null);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(() => {
        const currentY = Math.max(0, window.scrollY);
        const movement = currentY - lastY.current;
        const direction = movement > 0 ? "down" : movement < 0 ? "up" : null;

        if (direction && direction !== lastDirection.current) accumulatedMovement.current = 0;
        accumulatedMovement.current += movement;

        if (currentY < 80) {
          setHidden(false);
          accumulatedMovement.current = 0;
        } else if (accumulatedMovement.current > 10) {
          setHidden(true);
          accumulatedMovement.current = 0;
        } else if (accumulatedMovement.current < -10) {
          setHidden(false);
          accumulatedMovement.current = 0;
        }

        if (direction) lastDirection.current = direction;
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
