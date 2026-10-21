import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PortfolioGrid } from "@/components/portfolio";
import { ScrollNav } from "@/components/scroll-nav";
import { getPortfolioData } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Projects | Sabeera Azmat",
  description: "Explore SEO, graphic design, photography, branding, and digital content projects by Sabeera Azmat.",
  alternates: { canonical: "/projects" },
};

type ThemeStyle = CSSProperties & Record<`--${string}`, string>;

export default async function ProjectsPage() {
  const { settings, projects, projectCategories, projectTotal } = await getPortfolioData();
  const brandName = settings?.brandName || "Sabeera Azmat";
  const brandMark = settings?.brandMark || "SA";
  const style: ThemeStyle = {
    "--signature-color": settings?.signatureColor || "#e96f56",
    "--primary-bg": settings?.primaryBackgroundColor || "#f3f0e8",
    "--primary-text": settings?.primaryTextColor || "#1f211d",
    "--section-bg": settings?.primaryBackgroundColor || "#f3f0e8",
  };

  return <main className="projects-page" style={style}>
    <ScrollNav navClassName="project-nav shell" label="Projects navigation"><Link href="/#work"><ArrowLeft size={16} /> Back to portfolio</Link><Link href="/" aria-label={`${brandName} home`}>{brandMark}<span>.</span></Link></ScrollNav>
    <header className="projects-page-heading shell">
      <p>PROJECT ARCHIVE</p>
      <h1>Selected work,<br /><em>all in one place.</em></h1>
      <div><span>{projectTotal} published projects</span><p>Browse by discipline or keep scrolling to explore the complete collection.</p></div>
    </header>
    <section className="projects-archive shell">
      <PortfolioGrid projects={projects} categories={projectCategories} total={projectTotal} />
    </section>
    <footer className="project-footer shell"><Link href="/"><ArrowLeft size={14} /> Portfolio home</Link><span>© {new Date().getFullYear()} {brandName}</span></footer>
  </main>;
}
