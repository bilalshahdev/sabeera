import { ArrowDown, ArrowUpRight, BarChart3, Check, Download, Mail, MapPin, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortfolioGrid } from "@/components/portfolio";

const skills = ["Technical audits", "Keyword research", "On-page SEO", "Content strategy", "Site architecture", "Performance tracking"];
const tools = ["Google Search Console", "Google Analytics 4", "Ahrefs", "SEMrush", "Moz", "Screaming Frog", "WordPress", "Shopify"];

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

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema).replace(/</g, "\\u003c") }}
      />
      <nav className="nav shell" aria-label="Main navigation">
        <a className="monogram" href="#top" aria-label="Sabeera home">SA<span>.</span></a>
        <div className="nav-links"><a href="#about">About</a><a href="#experience">Experience</a><a href="#work">Work</a></div>
        <a className="nav-contact" href="mailto:sabeeraazmat25@gmail.com">Let&apos;s talk <ArrowUpRight size={16} /></a>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-kicker"><span className="status-dot" /> Available for opportunities · Islamabad, PK</div>
        <div className="hero-grid">
          <div>
            <p className="eyebrow">Junior SEO Specialist</p>
            <h1><span className="hero-break">Search-led</span> thinking,<br /><em>human</em> <span className="hero-break">storytelling.</span></h1>
          </div>
          <div className="hero-side">
            <p>I help digital experiences get discovered—combining thoughtful SEO, clear content, and a sharp visual eye.</p>
            <div className="hero-actions">
              <Button asChild><a href="#work">Explore my work <ArrowDown size={16} /></a></Button>
              <Button asChild variant="outline"><a href="/Sabeera-Azmat-Resume.pdf" download>Résumé <Download size={16} /></a></Button>
            </div>
          </div>
        </div>
        <div className="hero-ribbon" aria-hidden="true"><span>SEO</span><i /> <span>CONTENT</span><i /> <span>DESIGN</span><i /> <span>GROWTH</span></div>
      </section>

      <section className="about-section" id="about">
        <div className="shell about-grid">
          <div><p className="section-no">01 / ABOUT</p><h2>Curious by nature.<br />Analytical by practice.</h2></div>
          <div className="about-copy">
            <p className="lead">I&apos;m Sabeera, a Mass Communication student and Junior SEO Specialist building useful, discoverable digital experiences.</p>
            <p>My work sits at the intersection of search, content, and visual communication. I enjoy turning audits and keyword data into clear actions—and then shaping content that feels genuinely helpful to the people searching for it.</p>
          </div>
        </div>
      </section>

      <section className="expertise shell">
        <div className="section-heading"><p className="section-no">02 / EXPERTISE</p><h2>A practical toolkit for<br />organic growth.</h2></div>
        <div className="expertise-grid">
          <article><Search /><span>01</span><h3>Search strategy</h3><p>Researching intent, competitors, and opportunities to create a focused roadmap.</p></article>
          <article><BarChart3 /><span>02</span><h3>Technical & on-page</h3><p>Finding crawl, structure, metadata, speed, and content issues that hold a site back.</p></article>
          <article><Sparkles /><span>03</span><h3>Content & visuals</h3><p>Combining clear copy with thoughtful design for content people want to engage with.</p></article>
        </div>
        <div className="skill-row">{skills.map(skill => <span key={skill}><Check size={14} />{skill}</span>)}</div>
      </section>

      <section className="experience" id="experience">
        <div className="shell experience-grid">
          <div className="experience-intro"><p className="section-no">03 / EXPERIENCE</p><h2>Learning by<br /><em>doing.</em></h2><p>Hands-on work across live platforms, search data, content, and client-facing creative projects.</p></div>
          <div className="timeline">
            <article><div className="timeline-head"><span>Aug 2025 — Present</span><small>Islamabad</small></div><h3>SEO Practice Specialist / Intern</h3><a href="https://photaaz.app" target="_blank" rel="noreferrer">Photaaz App <ArrowUpRight size={14} /></a><p>Technical SEO audits, keyword mapping, metadata optimization, and performance monitoring with Search Console and GA4.</p></article>
            <article><div className="timeline-head"><span>2024 — 2025</span><small>Islamabad</small></div><h3>SEO & Web Content Manager</h3><a href="https://bilalshahdev.site.je/" target="_blank" rel="noreferrer">BilalShah.dev <ArrowUpRight size={14} /></a><p>Built and managed a WordPress platform, implementing on-page SEO, sitemaps, URL structure, media optimization, and intent-led content.</p></article>
            <article><div className="timeline-head"><span>2018 — Present</span><small>Independent</small></div><h3>Commercial & Media Photographer</h3><p>Photography, post-production, colour grading, client communication, and end-to-end visual asset delivery.</p></article>
          </div>
        </div>
      </section>

      <section className="work shell" id="work">
        <div className="work-heading"><div><p className="section-no">04 / SELECTED WORK</p><h2>Visual work,<br />made with intent.</h2></div><p>A selection of brochure, campaign, and social media design explorations. Tap any project for a closer look.</p></div>
        <PortfolioGrid />
      </section>

      <section className="tools shell"><p className="section-no">05 / TOOLS</p><div className="tools-list">{tools.map(tool => <span key={tool}>{tool}</span>)}</div></section>

      <section className="contact">
        <div className="shell contact-inner">
          <p className="section-no">LET&apos;S CONNECT</p>
          <h2>Have a search challenge<br />or a story to shape?</h2>
          <a className="email-link" href="mailto:sabeeraazmat25@gmail.com">sabeeraazmat25@gmail.com <ArrowUpRight /></a>
          <div className="contact-meta"><span><MapPin size={15} /> Islamabad, Pakistan</span><a href="mailto:sabeeraazmat25@gmail.com"><Mail size={15} /> Email me</a></div>
        </div>
      </section>

      <footer className="shell"><span>© {new Date().getFullYear()} Sabeera Azmat</span><a href="#top">Back to top <ArrowUpRight size={14} /></a></footer>
    </main>
  );
}
