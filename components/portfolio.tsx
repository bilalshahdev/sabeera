"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const work = [
  { title: "Fashion Trifold", type: "Editorial brochure", image: "/work/trifold-brochure.webp", file: "/work/trifold-brochure.pdf", wide: true },
  { title: "Perfect Home", type: "Promotional flyer", image: "/work/brand-flyer.webp", file: "/work/brand-flyer.pdf" },
  { title: "Study Visa", type: "Social media creative", image: "/work/study-visa.webp" },
  { title: "Birthday Portraits", type: "Campaign flyer", image: "/work/birthday-flyer.webp", file: "/work/birthday-flyer.pdf" },
  { title: "Next Step Academy", type: "Social media creative", image: "/work/school-admission.webp" },
  { title: "A&CO Carpentry", type: "Brand brochure", image: "/work/carpentry-brochure.webp", file: "/work/carpentry-brochure.pdf", wide: true },
];

function LoadableImage({ src, alt, sizes, contain = false }: { src: string; alt: string; sizes: string; contain?: boolean }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <span className={`image-skeleton ${loaded ? "image-skeleton--hidden" : ""}`} aria-hidden="true" />
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={`${contain ? "image-contain" : ""} ${loaded ? "image-loaded" : "image-loading"}`}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
}

export function PortfolioGrid() {
  return (
    <div className="work-grid">
      {work.map((item, index) => (
        <Dialog key={item.title}>
          <DialogTrigger asChild>
            <button className={`work-card ${item.wide ? "work-card--wide" : ""}`} aria-label={`Preview ${item.title}`}>
              <span className="work-image">
                <LoadableImage src={item.image} alt={`${item.title} design by Sabeera Azmat`} sizes="(max-width: 760px) calc(100vw - 30px), 576px" />
                <span className="work-index">0{index + 1}</span>
                <span className="work-open"><ArrowUpRight size={20} /></span>
              </span>
              <span className="work-meta">
                <strong>{item.title}</strong>
                <span>{item.type}</span>
              </span>
            </button>
          </DialogTrigger>
          <DialogContent title={item.title}>
            <div className="preview-image">
              <LoadableImage src={item.image} alt={`${item.title} full preview`} sizes="(max-width: 930px) calc(100vw - 66px), 864px" contain />
            </div>
            <div className="preview-caption">
              <div><span>{item.type}</span><h3>{item.title}</h3></div>
              {item.file && <a href={item.file} target="_blank" rel="noreferrer">Open full PDF <ExternalLink size={15} /></a>}
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
