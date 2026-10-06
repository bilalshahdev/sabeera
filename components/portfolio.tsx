"use client";

import Image from "next/image";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const work = [
  { title: "Fashion Trifold", type: "Editorial brochure", image: "/work/trifold-brochure.png", file: "/work/trifold-brochure.pdf", wide: true },
  { title: "Perfect Home", type: "Promotional flyer", image: "/work/brand-flyer.png", file: "/work/brand-flyer.pdf" },
  { title: "Study Visa", type: "Social media creative", image: "/work/study-visa.png" },
  { title: "Birthday Portraits", type: "Campaign flyer", image: "/work/birthday-flyer.png", file: "/work/birthday-flyer.pdf" },
  { title: "Next Step Academy", type: "Social media creative", image: "/work/school-admission.png" },
  { title: "A&CO Carpentry", type: "Brand brochure", image: "/work/carpentry-brochure.png", file: "/work/carpentry-brochure.pdf", wide: true },
];

export function PortfolioGrid() {
  return (
    <div className="work-grid">
      {work.map((item, index) => (
        <Dialog key={item.title}>
          <DialogTrigger asChild>
            <button className={`work-card ${item.wide ? "work-card--wide" : ""}`} aria-label={`Preview ${item.title}`}>
              <span className="work-image">
                <Image src={item.image} alt={`${item.title} design by Sabeera Azmat`} fill sizes="(max-width: 760px) 100vw, 50vw" />
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
              <Image src={item.image} alt={`${item.title} full preview`} fill sizes="90vw" />
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
