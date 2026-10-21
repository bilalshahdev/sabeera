import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { ProjectGallery } from "@/components/project-gallery";
import { Button } from "@/components/ui/button";
import { ScrollNav } from "@/components/scroll-nav";
import { client } from "@/sanity/lib/client";
import { projectDetailQuery } from "@/sanity/lib/queries";
import type { PortfolioProject, ProjectImage } from "@/sanity/lib/types";

async function getProject(slug: string) {
  return client.fetch<PortfolioProject | null>(projectDetailQuery, { slug }, { next: { revalidate: 60 } });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(decodeURIComponent(slug));
  if (!project) return {};
  return {
    title: `${project.title} | Sabeera Azmat`,
    description: project.description || `${project.title}, a selected portfolio project by Sabeera Azmat.`,
    alternates: { canonical: `/projects/${encodeURIComponent(project.slug || project._id)}` },
    openGraph: { images: project.imageUrl ? [{ url: project.imageUrl, alt: project.imageAlt || project.title }] : [] },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const project = await getProject(decodedSlug);
  if (!project) notFound();
  if (project.slug && decodedSlug !== project.slug) redirect(`/projects/${encodeURIComponent(project.slug)}`);
  const images: ProjectImage[] = [{ url: project.imageUrl, alt: project.imageAlt }, ...(project.gallery || []).filter(image => image.url !== project.imageUrl)];
  const categories = project.categories?.length ? project.categories.map(category => category.title) : [project.type || "Project"];

  return <main className="project-page">
    <ScrollNav navClassName="project-nav shell" label="Project navigation"><Link href="/#work"><ArrowLeft size={16} /> Go back</Link><Link href="/">SA<span>.</span></Link></ScrollNav>
    <header className="project-hero shell">
      <p>SELECTED WORK</p>
      <h1>{project.title}</h1>
      <div className="project-badges">{categories.map(category => <span key={category}>{category}</span>)}</div>
      {project.description && <p className="project-description">{project.description}</p>}
      <div className="project-actions">
        {project.fileUrl && <Button asChild><a href={project.fileUrl} target="_blank" rel="noreferrer">Open project PDF <ExternalLink size={15} /></a></Button>}
        {project.externalUrl && <Button asChild variant="outline"><a href={project.externalUrl} target="_blank" rel="noreferrer">Visit project <ExternalLink size={15} /></a></Button>}
      </div>
    </header>
    <section className="shell"><ProjectGallery images={images} title={project.title} /></section>
    <footer className="project-footer shell"><Link href="/#work"><ArrowLeft size={14} /> More projects</Link><span>© {new Date().getFullYear()} Sabeera Azmat</span></footer>
  </main>;
}
