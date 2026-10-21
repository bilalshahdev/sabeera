import { ArrowDown, ArrowUpRight, BarChart3, Check, Download, Mail, MapPin, Search, Sparkles } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { PortfolioGrid } from "@/components/portfolio";
import { SocialLinks } from "@/components/social-links";
import { ScrollNav } from "@/components/scroll-nav";
import { getPortfolioData } from "@/sanity/lib/fetch";
import type { Experience, SectionConfig, SectionKey } from "@/sanity/lib/types";

const fallbackSkills = ["Technical audits", "Keyword research", "On-page SEO", "Content strategy", "Site architecture", "Performance tracking"];
const fallbackTools = ["Google Search Console", "Google Analytics 4", "Ahrefs", "SEMrush", "Moz", "Screaming Frog", "WordPress", "Shopify"];
const fallbackServices = [
  { title: "Search strategy", description: "Researching intent, competitors, and opportunities to create a focused roadmap." },
  { title: "Technical & on-page", description: "Finding crawl, structure, metadata, speed, and content issues that hold a site back." },
  { title: "Content & visuals", description: "Combining clear copy with thoughtful design for content people want to engage with." },
];
const serviceIcons = [Search, BarChart3, Sparkles];
const fallbackExperiences: Experience[] = [
  { _id: "photaaz", period: "Aug 2025 — Present", location: "Islamabad", status: "In progress", role: "SEO Practice Specialist / Intern", organization: "Photaaz staging site", url: "https://photaaz-staging.vercel.app/", description: "Ongoing technical SEO audits, keyword mapping, metadata optimization, and performance monitoring with Search Console and GA4." },
  { _id: "bilalshah", period: "2024 — 2025", location: "Islamabad", role: "SEO & Web Content Manager", organization: "BilalShah.dev", url: "https://bilalshahdev.site.je/", description: "Built and managed a WordPress platform, implementing on-page SEO, sitemaps, URL structure, media optimization, and intent-led content." },
  { _id: "photography", period: "2018 — Present", location: "Independent", role: "Commercial & Media Photographer", description: "Photography, post-production, colour grading, client communication, and end-to-end visual asset delivery." },
];

const defaultSections: SectionConfig[] = [
  { section: "hero", visible: true },
  { section: "about", visible: true, backgroundColor: "#1f211d", textColor: "#f5f3ec" },
  { section: "expertise", visible: true },
  { section: "experience", visible: true, backgroundColor: "#536259", textColor: "#ffffff" },
  { section: "work", visible: true },
  { section: "tools", visible: true },
  { section: "contact", visible: true, backgroundColor: "#e96f56", textColor: "#ffffff" },
  { section: "footer", visible: true },
];

const sectionNames: Record<SectionKey, string> = {
  hero: "Home",
  about: "About",
  expertise: "Expertise",
  experience: "Experience",
  work: "Work",
  tools: "Tools",
  contact: "Contact",
  footer: "Footer",
};

type ThemeStyle = CSSProperties & Record<`--${string}`, string>;

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getPortfolioData();
  const title = settings?.seoTitle || "Sabeera Azmat | Junior SEO Specialist in Islamabad";
  const description = settings?.seoDescription || "Portfolio of Sabeera Azmat, a junior SEO specialist specializing in technical SEO, keyword research, content optimization, and visual design.";
  const canonical = settings?.canonicalUrl || "https://sabeera.vercel.app";
  const socialTitle = settings?.ogTitle || title;
  const socialDescription = settings?.ogDescription || description;
  const socialImage = settings?.ogImageUrl || "/opengraph-image";

  return {
    title,
    description,
    keywords: settings?.seoKeywords,
    alternates: { canonical },
    icons: settings?.faviconUrl ? { icon: settings.faviconUrl, shortcut: settings.faviconUrl } : undefined,
    robots: {
      index: !settings?.noIndex,
      follow: !settings?.noIndex,
      googleBot: { index: !settings?.noIndex, follow: !settings?.noIndex, "max-image-preview": "large", "max-snippet": -1 },
    },
    openGraph: {
      type: "profile",
      url: canonical,
      siteName: settings?.brandName || "Sabeera Azmat Portfolio",
      title: socialTitle,
      description: socialDescription,
      images: [{ url: socialImage, width: 1200, height: 630, alt: settings?.ogImageAlt || socialTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [socialImage],
      creator: settings?.twitterHandle || undefined,
    },
  };
}

export default async function Home() {
  const { settings, experiences, projects, featuredProjects } = await getPortfolioData();
  const homepageProjects = [...featuredProjects, ...projects.filter(project => !featuredProjects.some(featured => featured._id === project._id))].slice(0, 4);
  const displaySkills = settings?.skills?.length ? settings.skills : fallbackSkills;
  const displayTools = settings?.tools?.length ? settings.tools : fallbackTools;
  const displayServices = settings?.services?.length ? settings.services : fallbackServices;
  const displayExperiences = experiences.length ? experiences : fallbackExperiences;
  const ribbonItems = settings?.ribbonItems?.length ? settings.ribbonItems : ["SEO", "CONTENT", "DESIGN", "GROWTH"];
  const sections = settings?.sections?.length ? settings.sections : defaultSections;
  const visibleSections = sections.filter(section => section.visible !== false);
  const visibleKeys = new Set(visibleSections.map(section => section.section));
  const brandName = settings?.brandName || "Sabeera Azmat";
  const brandMark = settings?.brandMark || "SA";
  const email = settings?.email || "sabeeraazmat25@gmail.com";
  const location = settings?.location || "Islamabad, Pakistan";
  const resumeUrl = settings?.resumeUrl || "/Sabeera-Azmat-Resume.pdf";
  const canonical = settings?.canonicalUrl || "https://sabeera.vercel.app";
  const signatureColor = settings?.signatureColor || "#e96f56";
  const primaryBackground = settings?.primaryBackgroundColor || "#f3f0e8";
  const primaryText = settings?.primaryTextColor || "#1f211d";
  const numberedKeys = visibleSections.map(item => item.section).filter(key => ["about", "expertise", "experience", "work", "tools"].includes(key));
  const sectionNumber = (key: SectionKey) => String(numberedKeys.indexOf(key) + 1).padStart(2, "0");
  const styleFor = (config: SectionConfig): ThemeStyle => ({
    "--section-bg": config.backgroundColor || primaryBackground,
    "--section-text": config.textColor || primaryText,
  });
  const mainStyle: ThemeStyle = {
    "--signature-color": signatureColor,
    "--primary-bg": primaryBackground,
    "--primary-text": primaryText,
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: brandName,
    url: canonical,
    email: `mailto:${email}`,
    jobTitle: settings?.role || "Junior SEO Specialist",
    address: { "@type": "PostalAddress", addressLocality: location, addressCountry: "PK" },
    knowsAbout: displaySkills,
  };

  const contentSections: Record<SectionKey, (config: SectionConfig) => ReactNode> = {
    hero: config => (
      <section className="hero shell section-themed" style={styleFor(config)} id="hero">
        <div className="hero-kicker"><span className="status-dot" /> {settings?.availability || "Available for opportunities · Islamabad, PK"}</div>
        <div className="hero-grid">
          <div>
            <p className="eyebrow">{settings?.role || "Junior SEO Specialist"}</p>
            <h1><span className="hero-break">{settings?.heroTitle || "Search-led thinking,"}</span><br /><em>{settings?.heroAccent || "human"}</em> <span className="hero-break">{settings?.heroEnding || "storytelling."}</span></h1>
          </div>
          <div className="hero-side">
            <p>{settings?.heroDescription || "I help digital experiences get discovered—combining thoughtful SEO, clear content, and a sharp visual eye."}</p>
            <div className="hero-actions">
              <Button asChild><a href={visibleKeys.has("work") ? "#work" : `mailto:${email}`}>{visibleKeys.has("work") ? "Explore my work" : "Let’s talk"} <ArrowDown size={16} /></a></Button>
              <Button asChild variant="outline"><a href={resumeUrl} target={resumeUrl.startsWith("http") ? "_blank" : undefined} download={!resumeUrl.startsWith("http") || undefined}>Résumé <Download size={16} /></a></Button>
            </div>
          </div>
        </div>
        <div className="hero-ribbon" aria-hidden="true">{ribbonItems.map((item, index) => <Fragment key={`${item}-${index}`}><span>{item}</span>{index < ribbonItems.length - 1 && <i />}</Fragment>)}</div>
      </section>
    ),
    about: config => (
      <section className="about-section section-themed" style={styleFor(config)} id="about">
        <div className="shell about-grid">
          <div><p className="section-no">{sectionNumber("about")} / ABOUT</p><h2 className="cms-multiline">{settings?.aboutHeading || "Curious by nature.\nAnalytical by practice."}</h2></div>
          <div className="about-copy"><p className="lead">{settings?.aboutLead || "I’m Sabeera, a Mass Communication student and Junior SEO Specialist building useful, discoverable digital experiences."}</p><p>{settings?.aboutBody || "My work sits at the intersection of search, content, and visual communication. I enjoy turning audits and keyword data into clear actions—and then shaping content that feels genuinely helpful to the people searching for it."}</p></div>
        </div>
      </section>
    ),
    expertise: config => (
      <section className="expertise shell section-themed" style={styleFor(config)} id="expertise">
        <div className="section-heading"><p className="section-no">{sectionNumber("expertise")} / EXPERTISE</p><h2 className="cms-multiline">{settings?.expertiseHeading || "A practical toolkit for\norganic growth."}</h2></div>
        <div className="expertise-grid">{displayServices.map((service, index) => { const Icon = serviceIcons[index] || Sparkles; return <article key={service.title}><Icon /><span>0{index + 1}</span><h3>{service.title}</h3><p>{service.description}</p></article>; })}</div>
        <div className="skill-row">{displaySkills.map(skill => <span key={skill}><Check size={14} />{skill}</span>)}</div>
      </section>
    ),
    experience: config => (
      <section className="experience section-themed" style={styleFor(config)} id="experience">
        <div className="shell experience-grid">
          <div className="experience-intro"><p className="section-no">{sectionNumber("experience")} / EXPERIENCE</p><h2><span className="cms-multiline">{settings?.experienceHeading || "Learning by"}</span><br /><em>{settings?.experienceAccent || "doing."}</em></h2><p>{settings?.experienceDescription || "Hands-on work across live platforms, search data, content, and client-facing creative projects."}</p></div>
          <div className="timeline">{displayExperiences.map(item => <article key={item._id}><div className="timeline-head"><span>{item.period}</span><small>{[item.status, item.location].filter(Boolean).join(" · ")}</small></div><h3>{item.role}</h3>{item.organization && (item.url ? <a href={item.url} target="_blank" rel="noreferrer">{item.organization} <ArrowUpRight size={14} /></a> : <span className="timeline-organization">{item.organization}</span>)}<p>{item.description}</p></article>)}</div>
        </div>
      </section>
    ),
    work: config => (
      <section className="work shell section-themed" style={styleFor(config)} id="work">
        <div className="work-heading"><div><p className="section-no">{sectionNumber("work")} / SELECTED WORK</p><h2 className="cms-multiline">{settings?.workHeading || "Visual work,\nmade with intent."}</h2></div><p>{settings?.workDescription || "A selection of brochure, campaign, and social media design explorations. Tap any project for a closer look."}</p></div>
        <PortfolioGrid projects={homepageProjects} archive={false} />
      </section>
    ),
    tools: config => (
      <section className="tools shell section-themed" style={styleFor(config)} id="tools"><p className="section-no">{sectionNumber("tools")} / TOOLS</p><div className="tools-list">{displayTools.map(tool => <span key={tool}>{tool}</span>)}</div></section>
    ),
    contact: config => (
      <section className="contact section-themed" style={styleFor(config)} id="contact"><div className="shell contact-inner"><p className="section-no">{settings?.contactEyebrow || "LET’S CONNECT"}</p><h2 className="cms-multiline">{settings?.contactHeading || "Have a search challenge\nor a story to shape?"}</h2><a className="email-link" href={`mailto:${email}`}>{email} <ArrowUpRight /></a><SocialLinks links={settings?.links} /><div className="contact-meta"><span><MapPin size={15} /> {location}</span><a href={`mailto:${email}`}><Mail size={15} /> Email me</a></div></div></section>
    ),
    footer: config => (
      <footer className="shell section-themed" style={styleFor(config)}><span>© {new Date().getFullYear()} {brandName}</span><a href="#top">Back to top <ArrowUpRight size={14} /></a></footer>
    ),
  };

  return (
    <main className="portfolio-main" id="top" style={mainStyle}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema).replace(/</g, "\\u003c") }} />
      <ScrollNav navClassName="nav shell" label="Main navigation">
        <a className="monogram" href="#top" aria-label={`${brandName} home`}>{brandMark}<span>.</span></a>
        <div className="nav-links">{visibleSections.filter(item => ["about", "experience", "work", "contact"].includes(item.section)).map(item => <a href={`#${item.section}`} key={item.section}>{sectionNames[item.section]}</a>)}</div>
        <a className="nav-contact" href={`mailto:${email}`}>Let&apos;s talk <ArrowUpRight size={16} /></a>
      </ScrollNav>
      {visibleSections.map(config => <Fragment key={config._key || config.section}>{contentSections[config.section](config)}</Fragment>)}
    </main>
  );
}
