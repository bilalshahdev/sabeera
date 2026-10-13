export type SectionKey = "hero" | "about" | "expertise" | "experience" | "work" | "tools" | "contact" | "footer";

export type SectionConfig = {
  _key?: string;
  section: SectionKey;
  visible?: boolean;
  backgroundColor?: string;
  textColor?: string;
};

export type SiteSettings = {
  brandName?: string;
  brandMark?: string;
  availability?: string;
  role?: string;
  heroTitle?: string;
  heroAccent?: string;
  heroEnding?: string;
  heroDescription?: string;
  aboutHeading?: string;
  aboutLead?: string;
  aboutBody?: string;
  expertiseHeading?: string;
  experienceHeading?: string;
  experienceAccent?: string;
  experienceDescription?: string;
  workHeading?: string;
  workDescription?: string;
  services?: { title: string; description: string }[];
  skills?: string[];
  tools?: string[];
  ribbonItems?: string[];
  contactEyebrow?: string;
  contactHeading?: string;
  email?: string;
  location?: string;
  resumeUrl?: string;
  sections?: SectionConfig[];
  signatureColor?: string;
  primaryBackgroundColor?: string;
  primaryTextColor?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImageUrl?: string;
  ogImageAlt?: string;
  faviconUrl?: string;
  twitterHandle?: string;
  noIndex?: boolean;
};

export type Experience = {
  _id: string;
  period: string;
  location?: string;
  status?: string;
  role: string;
  organization?: string;
  url?: string;
  description: string;
};

export type PortfolioProject = {
  _id: string;
  title: string;
  type: string;
  imageUrl: string;
  imageAlt?: string;
  fileUrl?: string;
  externalUrl?: string;
  wide?: boolean;
};

export type PortfolioData = {
  settings: SiteSettings | null;
  experiences: Experience[];
  projects: PortfolioProject[];
};
