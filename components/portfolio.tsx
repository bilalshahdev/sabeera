"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import type { PortfolioProject, ProjectCategory, ProjectImage } from "@/sanity/lib/types";

const PAGE_SIZE = 6;

function LoadableImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  return <>
    <span className={`image-skeleton ${loaded ? "image-skeleton--hidden" : ""}`} aria-hidden="true" />
    <Image src={src} alt={alt} fill sizes="(max-width: 760px) calc(100vw - 30px), 576px" className={loaded ? "image-loaded" : "image-loading"} onLoad={() => setLoaded(true)} />
  </>;
}

function CardCarousel({ project }: { project: PortfolioProject }) {
  const images: ProjectImage[] = [
    { url: project.imageUrl, alt: project.imageAlt },
    ...(project.gallery || []).filter(image => image.url !== project.imageUrl),
  ];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || images.length < 2) return;
    const timer = window.setInterval(() => setActive(value => (value + 1) % images.length), 3800);
    return () => window.clearInterval(timer);
  }, [images.length, paused]);

  return <span className="work-carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
    {images.map((image, index) => <span className={`work-slide ${index === active ? "work-slide--active" : ""}`} key={image._key || image.url} aria-hidden={index !== active}>
      <LoadableImage src={image.url} alt={image.alt || `${project.title} project image ${index + 1}`} />
    </span>)}
    {images.length > 1 && <span className="work-dots" aria-hidden="true">{images.map((_, index) => <i className={index === active ? "active" : ""} key={index} />)}</span>}
  </span>;
}

function ProjectCard({ project, index }: { project: PortfolioProject; index: number }) {
  const categoryNames = project.categories?.length ? project.categories.map(category => category.title) : [project.type || "Project"];
  return <Link href={`/projects/${encodeURIComponent(project.slug || project._id)}`} className={`work-card ${project.wide ? "work-card--wide" : ""}`} aria-label={`View ${project.title}`}>
    <span className="work-image">
      <CardCarousel project={project} />
      <span className="work-index">{String(index + 1).padStart(2, "0")}</span>
      <span className="work-open"><ArrowUpRight size={20} /></span>
    </span>
    <span className="work-meta">
      <strong>{project.title}</strong>
      <span>{categoryNames.join(" · ")}</span>
    </span>
  </Link>;
}

export function PortfolioGrid({ projects, categories = [], total = projects.length, archive = true }: { projects: PortfolioProject[]; categories?: ProjectCategory[]; total?: number; archive?: boolean }) {
  const [items, setItems] = useState(projects);
  const [activeCategory, setActiveCategory] = useState("all");
  const [available, setAvailable] = useState(total);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const marker = useRef<HTMLDivElement>(null);
  const requestId = useRef(0);

  const fetchPage = useCallback(async (category: string, start: number, replace = false) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    const currentRequest = ++requestId.current;
    try {
      const response = await fetch(`/api/projects?category=${encodeURIComponent(category)}&start=${start}`);
      if (!response.ok) throw new Error("Unable to load projects");
      const data = await response.json() as { projects: PortfolioProject[]; total: number };
      if (currentRequest !== requestId.current) return;
      setItems(previous => replace ? data.projects : [...previous, ...data.projects.filter(next => !previous.some(item => item._id === next._id))]);
      setAvailable(data.total);
    } catch {
      if (currentRequest === requestId.current) setAvailable(start);
    } finally {
      if (currentRequest === requestId.current) {
        loadingRef.current = false;
        setLoading(false);
      }
    }
  }, []);

  const selectCategory = (slug: string) => {
    if (slug === activeCategory) return;
    requestId.current += 1;
    loadingRef.current = false;
    setLoading(false);
    setActiveCategory(slug);
    setItems([]);
    setAvailable(Number.POSITIVE_INFINITY);
    void fetchPage(slug, 0, true);
  };

  useEffect(() => {
    if (!archive) return;
    const target = marker.current;
    if (!target || items.length >= available) return;
    const observer = new IntersectionObserver(entries => {
      if (entries[0]?.isIntersecting && !loading) void fetchPage(activeCategory, items.length);
    }, { rootMargin: "500px" });
    observer.observe(target);
    return () => observer.disconnect();
  }, [activeCategory, archive, available, fetchPage, items.length, loading]);

  return <>
    {archive && categories.length > 0 && <div className="project-filters" aria-label="Filter projects by type">
      <button className={activeCategory === "all" ? "active" : ""} onClick={() => selectCategory("all")}>All projects</button>
      {categories.map(category => <button className={activeCategory === category.slug ? "active" : ""} onClick={() => selectCategory(category.slug)} key={category._id}>{category.title}</button>)}
    </div>}
    <div className="work-grid">
      {items.map((project, index) => <ProjectCard project={project} index={index} key={project._id} />)}
    </div>
    {!loading && items.length === 0 && <p className="projects-empty">No projects have been published in this category yet.</p>}
    {archive ? <div className="projects-load-marker" ref={marker}>{loading && <><LoaderCircle className="spin" size={20} /> Loading projects</>}</div> : <div className="view-all-projects"><Link href="/projects">View all projects <ArrowUpRight size={17} /></Link></div>}
  </>;
}
