import { createReadStream } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "next-sanity";

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  throw new Error("Set SANITY_API_WRITE_TOKEN before running npm run sanity:seed");
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "r51pzv9i",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-10-13",
  token,
  useCdn: false,
});

const root = process.cwd();
const asset = async (type, relativePath) => {
  const absolutePath = resolve(root, relativePath);
  return client.assets.upload(type, createReadStream(absolutePath), {
    filename: relativePath.split("/").at(-1),
  });
};

console.log("Uploading resume and project assets...");
const resume = await asset("file", "public/Sabeera-Azmat-Resume.pdf");

const projects = [
  { id: "fashion-trifold", title: "Fashion Trifold", type: "Editorial brochure", image: "trifold-brochure.webp", file: "trifold-brochure.pdf", wide: true },
  { id: "perfect-home", title: "Perfect Home", type: "Promotional flyer", image: "brand-flyer.webp", file: "brand-flyer.pdf" },
  { id: "study-visa", title: "Study Visa", type: "Social media creative", image: "study-visa.webp" },
  { id: "birthday-portraits", title: "Birthday Portraits", type: "Campaign flyer", image: "birthday-flyer.webp", file: "birthday-flyer.pdf" },
  { id: "next-step-academy", title: "Next Step Academy", type: "Social media creative", image: "school-admission.webp" },
  { id: "carpentry", title: "A&CO Carpentry", type: "Brand brochure", image: "carpentry-brochure.webp", file: "carpentry-brochure.pdf", wide: true },
];

const projectDocs = [];
for (const [order, project] of projects.entries()) {
  console.log(`Uploading ${project.title}...`);
  const image = await asset("image", `public/work/${project.image}`);
  const file = project.file ? await asset("file", `public/work/${project.file}`) : null;
  projectDocs.push({
    _id: `project-${project.id}`,
    _type: "project",
    title: project.title,
    type: project.type,
    image: { _type: "image", asset: { _type: "reference", _ref: image._id } },
    imageAlt: `${project.title} design by Sabeera Azmat`,
    ...(file ? { file: { _type: "file", asset: { _type: "reference", _ref: file._id } } } : {}),
    wide: Boolean(project.wide),
    order,
  });
}

const settings = {
  _id: "siteSettings",
  _type: "siteSettings",
  brandName: "Sabeera Azmat",
  brandMark: "SA",
  signatureColor: "#e96f56",
  primaryBackgroundColor: "#f3f0e8",
  primaryTextColor: "#1f211d",
  sections: [
    { _key: "hero", _type: "sectionConfig", section: "hero", visible: true },
    { _key: "about", _type: "sectionConfig", section: "about", visible: true, backgroundColor: "#1f211d", textColor: "#f5f3ec" },
    { _key: "expertise", _type: "sectionConfig", section: "expertise", visible: true },
    { _key: "experience", _type: "sectionConfig", section: "experience", visible: true, backgroundColor: "#536259", textColor: "#ffffff" },
    { _key: "work", _type: "sectionConfig", section: "work", visible: true },
    { _key: "tools", _type: "sectionConfig", section: "tools", visible: true },
    { _key: "contact", _type: "sectionConfig", section: "contact", visible: true, backgroundColor: "#e96f56", textColor: "#ffffff" },
    { _key: "footer", _type: "sectionConfig", section: "footer", visible: true },
  ],
  availability: "Available for opportunities · Islamabad, PK",
  role: "Junior SEO Specialist",
  heroTitle: "Search-led thinking,",
  heroAccent: "human",
  heroEnding: "storytelling.",
  heroDescription: "I help digital experiences get discovered—combining thoughtful SEO, clear content, and a sharp visual eye.",
  aboutHeading: "Curious by nature. Analytical by practice.",
  aboutLead: "I’m Sabeera, a Mass Communication student and Junior SEO Specialist building useful, discoverable digital experiences.",
  aboutBody: "My work sits at the intersection of search, content, and visual communication. I enjoy turning audits and keyword data into clear actions—and then shaping content that feels genuinely helpful to the people searching for it.",
  expertiseHeading: "A practical toolkit for organic growth.",
  experienceHeading: "Learning by",
  experienceAccent: "doing.",
  experienceDescription: "Hands-on work across live platforms, search data, content, and client-facing creative projects.",
  workHeading: "Visual work, made with intent.",
  workDescription: "A selection of brochure, campaign, and social media design explorations. Tap any project for a closer look.",
  services: [
    { _key: "strategy", _type: "object", title: "Search strategy", description: "Researching intent, competitors, and opportunities to create a focused roadmap." },
    { _key: "technical", _type: "object", title: "Technical & on-page", description: "Finding crawl, structure, metadata, speed, and content issues that hold a site back." },
    { _key: "content", _type: "object", title: "Content & visuals", description: "Combining clear copy with thoughtful design for content people want to engage with." },
  ],
  skills: ["Technical audits", "Keyword research", "On-page SEO", "Content strategy", "Site architecture", "Performance tracking"],
  tools: ["Google Search Console", "Google Analytics 4", "Ahrefs", "SEMrush", "Moz", "Screaming Frog", "WordPress", "Shopify"],
  ribbonItems: ["SEO", "CONTENT", "DESIGN", "GROWTH"],
  showExperience: true,
  showWork: true,
  showTools: true,
  contactEyebrow: "LET’S CONNECT",
  contactHeading: "Have a search challenge or a story to shape?",
  email: "sabeeraazmat25@gmail.com",
  location: "Islamabad, Pakistan",
  resume: { _type: "file", asset: { _type: "reference", _ref: resume._id } },
  seoTitle: "Sabeera Azmat | Junior SEO Specialist in Islamabad",
  seoDescription: "Portfolio of Sabeera Azmat, a junior SEO specialist specializing in technical SEO, keyword research, content optimization, and visual design.",
  seoKeywords: ["Sabeera Azmat", "Junior SEO Specialist", "SEO Specialist Islamabad", "Technical SEO", "Keyword Research", "Content Optimization", "On-Page SEO"],
  canonicalUrl: "https://sabeera.vercel.app",
  ogTitle: "Sabeera Azmat | Junior SEO Specialist",
  ogDescription: "SEO strategy, technical optimization, content, and selected visual design work by Sabeera Azmat.",
  ogImageAlt: "Sabeera Azmat - Junior SEO Specialist",
};

const experiences = [
  { _id: "experience-photaaz", _type: "experience", period: "Aug 2025 — Present", status: "In progress", location: "Islamabad", role: "SEO Practice Specialist / Intern", organization: "Photaaz staging site", url: "https://photaaz-staging.vercel.app/", description: "Ongoing technical SEO audits, keyword mapping, metadata optimization, and performance monitoring with Search Console and GA4.", order: 0 },
  { _id: "experience-bilalshah", _type: "experience", period: "2024 — 2025", location: "Islamabad", role: "SEO & Web Content Manager", organization: "BilalShah.dev", url: "https://bilalshahdev.site.je/", description: "Built and managed a WordPress platform, implementing on-page SEO, sitemaps, URL structure, media optimization, and intent-led content.", order: 1 },
  { _id: "experience-photography", _type: "experience", period: "2018 — Present", location: "Independent", role: "Commercial & Media Photographer", description: "Photography, post-production, colour grading, client communication, and end-to-end visual asset delivery.", order: 2 },
];

let transaction = client.transaction().createOrReplace(settings);
for (const document of [...experiences, ...projectDocs]) transaction = transaction.createOrReplace(document);
await transaction.commit();
console.log("Sanity content seeded successfully.");
