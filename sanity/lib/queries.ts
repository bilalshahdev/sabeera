import { defineQuery } from "next-sanity";

export const portfolioQuery = defineQuery(`{
  "settings": {
    "brandName": coalesce(*[_type == "brandSettings"][0].brandName, *[_type == "siteSettings"][0].brandName),
    "brandMark": coalesce(*[_type == "brandSettings"][0].brandMark, *[_type == "siteSettings"][0].brandMark),
    "signatureColor": coalesce(*[_type == "brandSettings"][0].signatureColor, *[_type == "siteSettings"][0].signatureColor),
    "primaryBackgroundColor": coalesce(*[_type == "brandSettings"][0].primaryBackgroundColor, *[_type == "siteSettings"][0].primaryBackgroundColor),
    "primaryTextColor": coalesce(*[_type == "brandSettings"][0].primaryTextColor, *[_type == "siteSettings"][0].primaryTextColor),
    "sections": coalesce(*[_type == "layoutSettings"][0].sections[]{_key, section, visible, backgroundColor, textColor}, *[_type == "siteSettings"][0].sections[]{_key, section, visible, backgroundColor, textColor}),
    "availability": coalesce(*[_type == "heroSettings"][0].availability, *[_type == "siteSettings"][0].availability),
    "role": coalesce(*[_type == "heroSettings"][0].role, *[_type == "siteSettings"][0].role),
    "heroTitle": coalesce(*[_type == "heroSettings"][0].heroTitle, *[_type == "siteSettings"][0].heroTitle),
    "heroAccent": coalesce(*[_type == "heroSettings"][0].heroAccent, *[_type == "siteSettings"][0].heroAccent),
    "heroEnding": coalesce(*[_type == "heroSettings"][0].heroEnding, *[_type == "siteSettings"][0].heroEnding),
    "heroDescription": coalesce(*[_type == "heroSettings"][0].heroDescription, *[_type == "siteSettings"][0].heroDescription),
    "ribbonItems": coalesce(*[_type == "heroSettings"][0].ribbonItems, *[_type == "siteSettings"][0].ribbonItems),
    "aboutHeading": coalesce(*[_type == "aboutSettings"][0].aboutHeading, *[_type == "siteSettings"][0].aboutHeading),
    "aboutLead": coalesce(*[_type == "aboutSettings"][0].aboutLead, *[_type == "siteSettings"][0].aboutLead),
    "aboutBody": coalesce(*[_type == "aboutSettings"][0].aboutBody, *[_type == "siteSettings"][0].aboutBody),
    "expertiseHeading": coalesce(*[_type == "contentSettings"][0].expertiseHeading, *[_type == "siteSettings"][0].expertiseHeading),
    "experienceHeading": coalesce(*[_type == "contentSettings"][0].experienceHeading, *[_type == "siteSettings"][0].experienceHeading),
    "experienceAccent": coalesce(*[_type == "contentSettings"][0].experienceAccent, *[_type == "siteSettings"][0].experienceAccent),
    "experienceDescription": coalesce(*[_type == "contentSettings"][0].experienceDescription, *[_type == "siteSettings"][0].experienceDescription),
    "workHeading": coalesce(*[_type == "contentSettings"][0].workHeading, *[_type == "siteSettings"][0].workHeading),
    "workDescription": coalesce(*[_type == "contentSettings"][0].workDescription, *[_type == "siteSettings"][0].workDescription),
    "services": coalesce(*[_type == "contentSettings"][0].services[]{title, description}, *[_type == "siteSettings"][0].services[]{title, description}),
    "skills": coalesce(*[_type == "contentSettings"][0].skills, *[_type == "siteSettings"][0].skills),
    "tools": coalesce(*[_type == "contentSettings"][0].tools, *[_type == "siteSettings"][0].tools),
    "contactEyebrow": coalesce(*[_type == "contactSettings"][0].contactEyebrow, *[_type == "siteSettings"][0].contactEyebrow),
    "contactHeading": coalesce(*[_type == "contactSettings"][0].contactHeading, *[_type == "siteSettings"][0].contactHeading),
    "email": coalesce(*[_type == "contactSettings"][0].email, *[_type == "siteSettings"][0].email),
    "location": coalesce(*[_type == "contactSettings"][0].location, *[_type == "siteSettings"][0].location),
    "resumeUrl": coalesce(*[_type == "contactSettings"][0].resume.asset->url, *[_type == "siteSettings"][0].resume.asset->url),
    "links": *[_type == "contactSettings"][0].links[]{_key, label, title, url, icon, visible, newTab},
    "seoTitle": coalesce(*[_type == "seoSettings"][0].seoTitle, *[_type == "siteSettings"][0].seoTitle),
    "seoDescription": coalesce(*[_type == "seoSettings"][0].seoDescription, *[_type == "siteSettings"][0].seoDescription),
    "seoKeywords": coalesce(*[_type == "seoSettings"][0].seoKeywords, *[_type == "siteSettings"][0].seoKeywords),
    "canonicalUrl": coalesce(*[_type == "seoSettings"][0].canonicalUrl, *[_type == "siteSettings"][0].canonicalUrl),
    "ogTitle": coalesce(*[_type == "seoSettings"][0].ogTitle, *[_type == "siteSettings"][0].ogTitle),
    "ogDescription": coalesce(*[_type == "seoSettings"][0].ogDescription, *[_type == "siteSettings"][0].ogDescription),
    "ogImageUrl": coalesce(*[_type == "seoSettings"][0].ogImage.asset->url, *[_type == "siteSettings"][0].ogImage.asset->url),
    "ogImageAlt": coalesce(*[_type == "seoSettings"][0].ogImageAlt, *[_type == "siteSettings"][0].ogImageAlt),
    "faviconUrl": coalesce(*[_type == "seoSettings"][0].favicon.asset->url, *[_type == "siteSettings"][0].favicon.asset->url),
    "twitterHandle": coalesce(*[_type == "seoSettings"][0].twitterHandle, *[_type == "siteSettings"][0].twitterHandle),
    "noIndex": coalesce(*[_type == "seoSettings"][0].noIndex, *[_type == "siteSettings"][0].noIndex)
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
  "projectCategories": *[_type == "projectCategory"] | order(order asc, title asc){
    _id, title, "slug": slug.current, description
  },
  "projectTotal": count(*[_type == "project"]),
  "featuredProjects": *[_type == "project" && featured == true] | order(order asc)[0...4]{
    _id, title, "slug": slug.current, description, type, featured,
    "categories": categories[]->{_id, title, "slug": slug.current, description},
    "imageUrl": image.asset->url, imageAlt,
    "gallery": gallery[]{_key, "url": asset->url, alt, caption},
    "fileUrl": file.asset->url, externalUrl, wide
  },
  "projects": *[_type == "project"] | order(order asc)[0...6]{
    _id,
    title,
    "slug": slug.current,
    description,
    type,
    "categories": categories[]->{_id, title, "slug": slug.current, description},
    "imageUrl": image.asset->url,
    imageAlt,
    "gallery": gallery[]{_key, "url": asset->url, alt, caption},
    "fileUrl": file.asset->url,
    externalUrl,
    featured,
    wide
  }
}`);

export const projectsPageQuery = defineQuery(`{
  "projects": *[
    _type == "project" &&
    ($category == "all" || $category in categories[]->slug.current || (!defined(categories[0]) && lower(type) == lower($category)))
  ] | order(order asc)[$start...$end]{
    _id, title, "slug": slug.current, description, type,
    "categories": categories[]->{_id, title, "slug": slug.current, description},
    "imageUrl": image.asset->url, imageAlt,
    "gallery": gallery[]{_key, "url": asset->url, alt, caption},
    "fileUrl": file.asset->url, externalUrl, featured, wide
  },
  "total": count(*[
    _type == "project" &&
    ($category == "all" || $category in categories[]->slug.current || (!defined(categories[0]) && lower(type) == lower($category)))
  ])
}`);

export const projectDetailQuery = defineQuery(`*[
  _type == "project" && (slug.current == $slug || _id == $slug)
][0]{
  _id, title, "slug": slug.current, description, type,
  "categories": categories[]->{_id, title, "slug": slug.current, description},
  "imageUrl": image.asset->url, imageAlt,
  "gallery": gallery[]{_key, "url": asset->url, alt, caption},
  "fileUrl": file.asset->url, externalUrl, featured, wide
}`);

export const projectSitemapQuery = defineQuery(`*[_type == "project"] | order(order asc){
  _id, "slug": slug.current, _updatedAt
}`);
