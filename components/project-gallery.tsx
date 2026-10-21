"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { ProjectImage } from "@/sanity/lib/types";

export function ProjectGallery({ images, title }: { images: ProjectImage[]; title: string }) {
  const [active, setActive] = useState<number | null>(null);
  const move = useCallback((direction: number) => setActive(current => current === null ? null : (current + direction + images.length) % images.length), [images.length]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [active, move]);

  return <>
    <div className="project-gallery">
      {images.map((image, index) => <button className={index === 0 ? "project-gallery-item project-gallery-item--lead" : "project-gallery-item"} onClick={() => setActive(index)} key={image._key || image.url}>
        <Image src={image.url} alt={image.alt || `${title} image ${index + 1}`} fill sizes={index === 0 ? "(max-width: 800px) 100vw, 1180px" : "(max-width: 800px) 100vw, 580px"} />
        <span><Maximize2 size={17} /> View fullscreen</span>
        {image.caption && <small>{image.caption}</small>}
      </button>)}
    </div>
    {active !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${title} image viewer`} onClick={() => setActive(null)}>
      <button className="lightbox-close" onClick={() => setActive(null)} aria-label="Close fullscreen gallery"><X /></button>
      {images.length > 1 && <button className="lightbox-prev" onClick={event => { event.stopPropagation(); move(-1); }} aria-label="Previous image"><ChevronLeft /></button>}
      <div className="lightbox-image" onClick={event => event.stopPropagation()}>
        <Image src={images[active].url} alt={images[active].alt || `${title} image ${active + 1}`} fill sizes="100vw" priority />
        <p>{images[active].caption || `${active + 1} / ${images.length}`}</p>
      </div>
      {images.length > 1 && <button className="lightbox-next" onClick={event => { event.stopPropagation(); move(1); }} aria-label="Next image"><ChevronRight /></button>}
    </div>}
  </>;
}
