"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

export function NavigationProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const safetyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentPath = useRef(pathname);
  const mounted = useRef(false);

  useEffect(() => {
    currentPath.current = pathname;
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    setProgress(100);
    const finish = window.setTimeout(() => setProgress(0), 220);
    if (timer.current) clearInterval(timer.current);
    if (safetyTimer.current) clearTimeout(safetyTimer.current);
    return () => window.clearTimeout(finish);
  }, [pathname]);

  useEffect(() => {
    const start = (synchronous = false) => {
      if (synchronous) flushSync(() => setProgress(14));
      else setProgress(14);
      if (timer.current) clearInterval(timer.current);
      if (safetyTimer.current) clearTimeout(safetyTimer.current);
      timer.current = setInterval(() => setProgress(value => value && value < 88 ? value + Math.max(1, (88 - value) * 0.08) : value), 180);
      safetyTimer.current = setTimeout(() => {
        if (timer.current) clearInterval(timer.current);
        setProgress(100);
        window.setTimeout(() => setProgress(0), 220);
      }, 10000);
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      start(true);
    };

    const onPopState = () => {
      if (window.location.pathname !== currentPath.current) start();
    };
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
      if (timer.current) clearInterval(timer.current);
      if (safetyTimer.current) clearTimeout(safetyTimer.current);
    };
  }, []);

  return <div className={`navigation-progress ${progress ? "navigation-progress--active" : ""}`} aria-hidden="true"><i style={{ transform: `scaleX(${progress / 100})` }} /></div>;
}
