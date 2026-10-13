import { defineQuery } from "next-sanity";

export const portfolioQuery = defineQuery(`{
  "settings": *[_type == "siteSettings"][0]{
    availability,
    role,
    heroTitle,
    heroAccent,
    heroEnding,
    heroDescription,
    aboutHeading,
    aboutLead,
    aboutBody,
    expertiseHeading,
    services[]{title, description},
    skills,
    tools,
    ribbonItems,
    showExperience,
    showWork,
    showTools,
    contactEyebrow,
    contactHeading,
    email,
    location,
    "resumeUrl": resume.asset->url,
    seoTitle,
    seoDescription
  },
  "experiences": *[_type == "experience"] | order(order asc){
    _id,
    period,
    location,
    status,
    role,
    organization,
    url,
    description
  },
  "projects": *[_type == "project"] | order(order asc){
    _id,
    title,
    type,
    "imageUrl": image.asset->url,
    imageAlt,
    "fileUrl": file.asset->url,
    externalUrl,
    wide
  }
}`);
