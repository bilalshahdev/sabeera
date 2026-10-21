"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { BriefcaseBusiness, FolderKanban, Mail, UserRound } from "lucide-react";
import { TornEdge } from "./torn-edge";

type MobileLink = { href: string; label: string };

const mobileIcons = {
  about: UserRound,
  experience: BriefcaseBusiness,
  work: FolderKanban,
  contact: Mail,
};

export function ScrollNav({ children, navClassName, label, mobileLinks = [] }: { children: ReactNode; navClassName: string; label?: string; mobileLinks?: MobileLink[] }) {
  const [hidden, setHidden] = useState(false);
  const [activeHref, setActiveHref] = useState("");
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;
    const sectionLinks = mobileLinks.filter(link => link.href.startsWith("#"));
    const updateActiveSection = () => {
      const marker = window.innerHeight * 0.42;
      let active = "";
      for (const link of sectionLinks) {
        const section = document.getElementById(link.href.slice(1));
        if (section && section.getBoundingClientRect().top <= marker) active = link.href;
      }
      setActiveHref(active);
    };
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(() => {
        const currentY = Math.max(0, window.scrollY);
        const movement = currentY - lastY.current;

        if (currentY < 80) {
          setHidden(false);
          lastY.current = currentY;
        } else if (movement >= 4) {
          setHidden(true);
          lastY.current = currentY;
        } else if (movement <= -4) {
          setHidden(false);
          lastY.current = currentY;
        }

        updateActiveSection();
        ticking.current = false;
      });
    };
    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileLinks]);

  return <>
    <div className={`scroll-nav ${hidden ? "scroll-nav--hidden" : ""}`}>
      <TornEdge className="scroll-nav-surface" edges="bottom" color="var(--primary-bg,#f3f0e8)" size={16}><nav className={navClassName} aria-label={label}>{children}</nav></TornEdge>
    </div>
    {mobileLinks.length > 0 && <div className={`mobile-action-bar ${hidden ? "mobile-action-bar--hidden" : ""}`}><TornEdge className="mobile-action-surface" edges="top" color="var(--primary-bg,#f3f0e8)" size={18}><nav aria-label="Mobile navigation">{mobileLinks.map(link => { const Icon = mobileIcons[link.href.slice(1) as keyof typeof mobileIcons] || FolderKanban; const active = activeHref === link.href; return <a className={active ? "active" : undefined} href={link.href} aria-current={active ? "location" : undefined} key={link.href}><Icon size={17} strokeWidth={1.8} /><span>{link.label}</span></a>; })}</nav></TornEdge></div>}
  </>;
}
