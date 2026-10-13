import { ArrowDown, ArrowUpRight, BarChart3, Check, Download, Mail, MapPin, Search, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { PortfolioGrid } from "@/components/portfolio";
import { getPortfolioData } from "@/sanity/lib/fetch";
import type { Experience } from "@/sanity/lib/types";

const skills = ["Technical audits", "Keyword research", "On-page SEO", "Content strategy", "Site architecture", "Performance tracking"];
const tools = ["Google Search Console", "Google Analytics 4", "Ahrefs", "SEMrush", "Moz", "Screaming Frog", "WordPress", "Shopify"];
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

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getPortfolioData();
  return {
    title: settings?.seoTitle || undefined,
    description: settings?.seoDescription || undefined,
  };
}

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sabeera Azmat",
  url: "https://sabeera.vercel.app",
  email: "mailto:sabeeraazmat25@gmail.com",
  jobTitle: "Junior SEO Specialist",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Islamabad",
    addressCountry: "PK",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "National University of Modern Languages",
  },
  knowsAbout: [
    "Technical SEO",
    "On-Page SEO",
    "Keyword Research",
    "Content Optimization",
    "Google Search Console",
    "Google Analytics 4",
    "Graphic Design",
  ],
};

export default async function Home() {
  const { settings, experiences, projects } = await getPortfolioData();
  const displaySkills = settings?.skills?.length ? settings.skills : skills;
  const displayTools = settings?.tools?.length ? settings.tools : tools;
  const displayServices = settings?.services?.length ? settings.services : fallbackServices;
  const ribbonItems = settings?.ribbonItems?.length ? settings.ribbonItems : ["SEO", "CONTENT", "DESIGN", "GROWTH"];
  const displayExperiences = experiences.length ? experiences : fallbackExperiences;
  const email = settings?.email || "sabeeraazmat25@gmail.com";
  const location = settings?.location || "Islamabad, Pakistan";
  const resumeUrl = settings?.resumeUrl || "/Sabeera-Azmat-Resume.pdf";

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema).replace(/</g, "\\u003c") }}
      />
      <nav className="nav shell" aria-label="Main navigation">
        <a className="monogram" href="#top" aria-label="Sabeera home">SA<span>.</span></a>
        <div className="nav-links"><a href="#about">About</a>{settings?.showExperience !== false && <a href="#experience">Experience</a>}{settings?.showWork !== false && <a href="#work">Work</a>}</div>
        <a className="nav-contact" href={`mailto:${email}`}>Let&apos;s talk <ArrowUpRight size={16} /></a>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-kicker"><span className="status-dot" /> {settings?.availability || "Available for opportunities · Islamabad, PK"}</div>
        <div className="hero-grid">
          <div>
            <p className="eyebrow">{settings?.role || "Junior SEO Specialist"}</p>
            <h1><span className="hero-break">{settings?.heroTitle || "Search-led thinking,"}</span><br /><em>{settings?.heroAccent || "human"}</em> <span className="hero-break">{settings?.heroEnding || "storytelling."}</span></h1>
          </div>
          <div className="hero-side">
            <p>{settings?.heroDescription || "I help digital experiences get discovered—combining thoughtful SEO, clear content, and a sharp visual eye."}</p>
            <div className="hero-actions">
              <Button asChild><a href="#work">Explore my work <ArrowDown size={16} /></a></Button>
              <Button asChild variant="outline"><a href={resumeUrl} target={resumeUrl.startsWith("http") ? "_blank" : undefined} download={!resumeUrl.startsWith("http") || undefined}>Résumé <Download size={16} /></a></Button>
            </div>
          </div>
        </div>
        <div className="hero-ribbon" aria-hidden="true">{ribbonItems.map((item, index) => <Fragment key={`${item}-${index}`}><span>{item}</span>{index < ribbonItems.length - 1 && <i />}</Fragment>)}</div>
      </section>

      <section className="about-section" id="about">
        <div className="shell about-grid">
          <div><p className="section-no">01 / ABOUT</p><h2>{settings?.aboutHeading || <>Curious by nature.<br />Analytical by practice.</>}</h2></div>
          <div className="about-copy">
            <p className="lead">{settings?.aboutLead || "I’m Sabeera, a Mass Communication student and Junior SEO Specialist building useful, discoverable digital experiences."}</p>
            <p>{settings?.aboutBody || "My work sits at the intersection of search, content, and visual communication. I enjoy turning audits and keyword data into clear actions—and then shaping content that feels genuinely helpful to the people searching for it."}</p>
          </div>
        </div>
      </section>

      <section className="expertise shell">
        <div className="section-heading"><p className="section-no">02 / EXPERTISE</p><h2>{settings?.expertiseHeading || <>A practical toolkit for<br />organic growth.</>}</h2></div>
        <div className="expertise-grid">
          {displayServices.map((service, index) => {
            const Icon = serviceIcons[index] || Sparkles;
            return <article key={service.title}><Icon /><span>0{index + 1}</span><h3>{service.title}</h3><p>{service.description}</p></article>;
          })}
        </div>
        <div className="skill-row">{displaySkills.map(skill => <span key={skill}><Check size={14} />{skill}</span>)}</div>
      </section>

      {settings?.showExperience !== false && <section className="experience" id="experience">
        <div className="shell experience-grid">
          <div className="experience-intro"><p className="section-no">03 / EXPERIENCE</p><h2>Learning by<br /><em>doing.</em></h2><p>Hands-on work across live platforms, search data, content, and client-facing creative projects.</p></div>
          <div className="timeline">
            {displayExperiences.map(item => (
              <article key={item._id}>
                <div className="timeline-head"><span>{item.period}</span><small>{[item.status, item.location].filter(Boolean).join(" · ")}</small></div>
                <h3>{item.role}</h3>
                {item.organization && (item.url
                  ? <a href={item.url} target="_blank" rel="noreferrer">{item.organization} <ArrowUpRight size={14} /></a>
                  : <span className="timeline-organization">{item.organization}</span>)}
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>}

      {settings?.showWork !== false && <section className="work shell" id="work">
        <div className="work-heading"><div><p className="section-no">04 / SELECTED WORK</p><h2>Visual work,<br />made with intent.</h2></div><p>A selection of brochure, campaign, and social media design explorations. Tap any project for a closer look.</p></div>
        <PortfolioGrid projects={projects} />
      </section>}

      {settings?.showTools !== false && <section className="tools shell"><p className="section-no">05 / TOOLS</p><div className="tools-list">{displayTools.map(tool => <span key={tool}>{tool}</span>)}</div></section>}

      <section className="contact">
        <div className="shell contact-inner">
          <p className="section-no">{settings?.contactEyebrow || "LET’S CONNECT"}</p>
          <h2>{settings?.contactHeading || <>Have a search challenge<br />or a story to shape?</>}</h2>
          <a className="email-link" href={`mailto:${email}`}>{email} <ArrowUpRight /></a>
          <div className="contact-meta"><span><MapPin size={15} /> {location}</span><a href={`mailto:${email}`}><Mail size={15} /> Email me</a></div>
        </div>
      </section>

      <footer className="shell"><span>© {new Date().getFullYear()} Sabeera Azmat</span><a href="#top">Back to top <ArrowUpRight size={14} /></a></footer>
    </main>
  );
}
