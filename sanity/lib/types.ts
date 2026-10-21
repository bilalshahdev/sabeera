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
  links?: SocialLink[];
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

export type SocialLink = {
  _key: string;
  label: string;
  title?: string;
  url: string;
  icon?: string;
  visible?: boolean;
  newTab?: boolean;
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
  slug?: string;
  description?: string;
  type?: string;
  categories: ProjectCategory[];
  imageUrl: string;
  imageAlt?: string;
  gallery: ProjectImage[];
  fileUrl?: string;
  externalUrl?: string;
  featured?: boolean;
  wide?: boolean;
};

export type ProjectImage = { _key?: string; url: string; alt?: string; caption?: string };
export type ProjectCategory = { _id: string; title: string; slug: string; description?: string };

export type PortfolioData = {
  settings: SiteSettings | null;
  experiences: Experience[];
  projects: PortfolioProject[];
  featuredProjects: PortfolioProject[];
  projectCategories: ProjectCategory[];
  projectTotal: number;
};
