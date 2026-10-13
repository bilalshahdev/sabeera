import { defineArrayMember, defineField, defineType } from "sanity";

const CSS_COLOR = /^(#[0-9a-f]{3,8}|(?:rgb|rgba|hsl|hsla)\(.+\)|[a-z]+)$/i;
const colorField = (name: string, title: string) => defineField({
  name,
  title,
  type: "string",
  description: "CSS color, for example #f3f0e8, rgb(20 20 20), or navy.",
  validation: rule => rule.custom(value => !value || CSS_COLOR.test(value) || "Enter a valid CSS color."),
});

const sectionOptions = [
  { title: "Hero", value: "hero" },
  { title: "About", value: "about" },
  { title: "Expertise", value: "expertise" },
  { title: "Experience", value: "experience" },
  { title: "Selected work", value: "work" },
  { title: "Tools", value: "tools" },
  { title: "Contact", value: "contact" },
  { title: "Footer", value: "footer" },
];

export const brandSettings = defineType({
  name: "brandSettings",
  title: "Brand & Global Theme",
  type: "document",
  fields: [
    defineField({ name: "brandName", title: "Brand / portfolio name", type: "string", validation: rule => rule.required() }),
    defineField({ name: "brandMark", title: "Short brand mark", type: "string", description: "Shown in the navigation, for example SA.", validation: rule => rule.max(5) }),
    colorField("signatureColor", "Signature / accent color"),
    colorField("primaryBackgroundColor", "Primary site background"),
    colorField("primaryTextColor", "Primary site text color"),
  ],
});

export const layoutSettings = defineType({
  name: "layoutSettings",
  title: "Page Sections & Theme",
  type: "document",
  fields: [defineField({
    name: "sections",
    title: "Section order, visibility and colors",
    description: "Drag items to reorder the page. Toggle visibility or override each section's colors.",
    type: "array",
    validation: rule => rule.custom(items => {
      if (!items) return true;
      const keys = (items as { section?: string }[]).map(item => item.section).filter(Boolean);
      return new Set(keys).size === keys.length || "Each section can only appear once.";
    }),
    of: [defineArrayMember({
      name: "sectionConfig",
      title: "Section",
      type: "object",
      fields: [
        defineField({ name: "section", title: "Section", type: "string", options: { list: sectionOptions, layout: "dropdown" }, validation: rule => rule.required() }),
        defineField({ name: "visible", title: "Visible", type: "boolean", initialValue: true }),
        colorField("backgroundColor", "Background color"),
        colorField("textColor", "Text color"),
      ],
      preview: {
        select: { section: "section", visible: "visible", background: "backgroundColor", text: "textColor" },
        prepare: ({ section, visible, background, text }) => ({
          title: sectionOptions.find(option => option.value === section)?.title || section || "Choose a section",
          subtitle: `${visible === false ? "Hidden" : "Visible"} · BG ${background || "default"} · Text ${text || "default"}`,
        }),
      },
    })],
  })],
});

export const heroSettings = defineType({
  name: "heroSettings",
  title: "Hero Section",
  type: "document",
  fields: [
    defineField({ name: "availability", title: "Availability text", type: "string" }),
    defineField({ name: "role", title: "Primary role", type: "string" }),
    defineField({ name: "heroTitle", title: "Hero title - first line", type: "string" }),
    defineField({ name: "heroAccent", title: "Signature-color hero word", type: "string", description: "This word always uses the signature color." }),
    defineField({ name: "heroEnding", title: "Hero title - ending", type: "string" }),
    defineField({ name: "heroDescription", title: "Hero description", type: "text", rows: 3 }),
    defineField({ name: "ribbonItems", title: "Hero ribbon items", type: "array", of: [defineArrayMember({ type: "string" })] }),
  ],
});

export const aboutSettings = defineType({
  name: "aboutSettings",
  title: "About Section",
  type: "document",
  fields: [
    defineField({ name: "aboutHeading", title: "About heading", type: "string" }),
    defineField({ name: "aboutLead", title: "About introduction", type: "text", rows: 3 }),
    defineField({ name: "aboutBody", title: "About body", type: "text", rows: 5 }),
  ],
});

export const contentSettings = defineType({
  name: "contentSettings",
  title: "Expertise, Work & Tools",
  type: "document",
  fields: [
    defineField({ name: "expertiseHeading", title: "Expertise heading", type: "string" }),
    defineField({ name: "experienceHeading", title: "Experience heading", type: "string" }),
    defineField({ name: "experienceAccent", title: "Signature-color experience word", type: "string" }),
    defineField({ name: "experienceDescription", title: "Experience introduction", type: "text", rows: 3 }),
    defineField({ name: "workHeading", title: "Selected work heading", type: "string" }),
    defineField({ name: "workDescription", title: "Selected work introduction", type: "text", rows: 3 }),
    defineField({
      name: "services",
      title: "Expertise cards",
      type: "array",
      validation: rule => rule.max(3),
      of: [defineArrayMember({
        type: "object",
        fields: [
          defineField({ name: "title", title: "Title", type: "string", validation: rule => rule.required() }),
          defineField({ name: "description", title: "Description", type: "text", rows: 3, validation: rule => rule.required() }),
        ],
        preview: { select: { title: "title", subtitle: "description" } },
      })],
    }),
    defineField({ name: "skills", title: "Skills", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "tools", title: "Tools", type: "array", of: [defineArrayMember({ type: "string" })] }),
  ],
});

export const contactSettings = defineType({
  name: "contactSettings",
  title: "Contact & Resume",
  type: "document",
  fields: [
    defineField({ name: "contactEyebrow", title: "Contact eyebrow", type: "string" }),
    defineField({ name: "contactHeading", title: "Contact heading", type: "string" }),
    defineField({ name: "email", title: "Email", type: "email" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "resume", title: "Resume PDF", type: "file", options: { accept: ".pdf" } }),
  ],
});

export const seoSettings = defineType({
  name: "seoSettings",
  title: "SEO & Social Sharing",
  type: "document",
  fields: [
    defineField({ name: "seoTitle", title: "SEO title", type: "string", validation: rule => rule.max(60) }),
    defineField({ name: "seoDescription", title: "Meta description", type: "text", rows: 3, validation: rule => rule.max(160) }),
    defineField({ name: "seoKeywords", title: "Keywords", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "canonicalUrl", title: "Canonical URL", type: "url" }),
    defineField({ name: "ogTitle", title: "Social sharing title", type: "string", validation: rule => rule.max(65) }),
    defineField({ name: "ogDescription", title: "Social sharing description", type: "text", rows: 3, validation: rule => rule.max(200) }),
    defineField({ name: "ogImage", title: "Social sharing image", type: "image", description: "Recommended size: 1200 × 630 pixels.", options: { hotspot: true } }),
    defineField({ name: "ogImageAlt", title: "Social image alt text", type: "string" }),
    defineField({ name: "favicon", title: "Favicon", type: "image", description: "Upload a square PNG, ideally 512 × 512 pixels." }),
    defineField({ name: "twitterHandle", title: "Twitter/X handle", type: "string", description: "Optional, including @." }),
    defineField({ name: "noIndex", title: "Hide site from search engines", type: "boolean", initialValue: false }),
  ],
});
