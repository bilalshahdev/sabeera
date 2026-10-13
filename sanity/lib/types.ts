export type SiteSettings = {
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
  services?: { title: string; description: string }[];
  skills?: string[];
  tools?: string[];
  ribbonItems?: string[];
  showExperience?: boolean;
  showWork?: boolean;
  showTools?: boolean;
  contactEyebrow?: string;
  contactHeading?: string;
  email?: string;
  location?: string;
  resumeUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
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
