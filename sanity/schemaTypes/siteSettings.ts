import { defineArrayMember, defineField, defineType } from "sanity";

const colorField = (name: string, title: string, group?: string) => defineField({
  name,
  title,
  type: "string",
  description: "CSS color, for example #f3f0e8, rgb(20 20 20), or navy.",
  ...(group ? { group } : {}),
  validation: rule => rule.custom(value => !value || CSS_COLOR.test(value) || "Enter a valid hex, rgb/hsl, or named CSS color."),
});

const CSS_COLOR = /^(#[0-9a-f]{3,8}|(?:rgb|rgba|hsl|hsla)\(.+\)|[a-z]+)$/i;

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

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "brand", title: "Brand", default: true },
    { name: "sections", title: "Sections & theme" },
    { name: "hero", title: "Hero" },
    { name: "about", title: "About" },
    { name: "content", title: "Content" },
    { name: "contact", title: "Contact" },
    { name: "seo", title: "SEO & sharing" },
  ],
  fields: [
    defineField({ name: "brandName", title: "Brand / portfolio name", type: "string", group: "brand", validation: rule => rule.required() }),
    defineField({ name: "brandMark", title: "Short brand mark", type: "string", description: "Shown in the navigation, for example SA", group: "brand", validation: rule => rule.max(5) }),
    colorField("signatureColor", "Signature / accent color", "brand"),
    colorField("primaryBackgroundColor", "Primary site background", "brand"),
    colorField("primaryTextColor", "Primary site text color", "brand"),

    defineField({
      name: "sections",
      title: "Section order, visibility and colors",
      description: "Drag items to reorder the page. Disable Visible to hide a section. Each section can override its background and text color.",
      type: "array",
      group: "sections",
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
    }),

    defineField({ name: "availability", title: "Availability text", type: "string", group: "hero" }),
    defineField({ name: "role", title: "Primary role", type: "string", group: "hero", validation: rule => rule.required() }),
    defineField({ name: "heroTitle", title: "Hero title - first line", type: "string", description: "For example: Search-led thinking,", group: "hero" }),
    defineField({ name: "heroAccent", title: "Signature-color hero word", type: "string", description: "This word always uses the signature color.", group: "hero" }),
    defineField({ name: "heroEnding", title: "Hero title - ending", type: "string", group: "hero" }),
    defineField({ name: "heroDescription", title: "Hero description", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "ribbonItems", title: "Hero ribbon items", type: "array", of: [defineArrayMember({ type: "string" })], group: "hero" }),

    defineField({ name: "aboutHeading", title: "About heading", type: "string", group: "about" }),
    defineField({ name: "aboutLead", title: "About introduction", type: "text", rows: 3, group: "about" }),
    defineField({ name: "aboutBody", title: "About body", type: "text", rows: 5, group: "about" }),

    defineField({ name: "expertiseHeading", title: "Expertise heading", type: "string", group: "content" }),
    defineField({ name: "experienceHeading", title: "Experience heading", type: "string", group: "content" }),
    defineField({ name: "experienceAccent", title: "Signature-color experience word", type: "string", description: "This word always uses the signature color.", group: "content" }),
    defineField({ name: "experienceDescription", title: "Experience introduction", type: "text", rows: 3, group: "content" }),
    defineField({ name: "workHeading", title: "Selected work heading", type: "string", group: "content" }),
    defineField({ name: "workDescription", title: "Selected work introduction", type: "text", rows: 3, group: "content" }),
    defineField({
      name: "services",
      title: "Expertise cards",
      type: "array",
      group: "content",
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
    defineField({ name: "skills", title: "Skills", type: "array", of: [defineArrayMember({ type: "string" })], group: "content" }),
    defineField({ name: "tools", title: "Tools", type: "array", of: [defineArrayMember({ type: "string" })], group: "content" }),

    defineField({ name: "contactEyebrow", title: "Contact eyebrow", type: "string", group: "contact" }),
    defineField({ name: "contactHeading", title: "Contact heading", type: "string", group: "contact" }),
    defineField({ name: "email", title: "Email", type: "email", group: "contact" }),
    defineField({ name: "location", title: "Location", type: "string", group: "contact" }),
    defineField({ name: "resume", title: "Resume PDF", type: "file", options: { accept: ".pdf" }, group: "contact" }),

    defineField({ name: "seoTitle", title: "SEO title", type: "string", group: "seo", validation: rule => rule.max(60) }),
    defineField({ name: "seoDescription", title: "Meta description", type: "text", rows: 3, group: "seo", validation: rule => rule.max(160) }),
    defineField({ name: "seoKeywords", title: "Keywords", type: "array", of: [defineArrayMember({ type: "string" })], group: "seo" }),
    defineField({ name: "canonicalUrl", title: "Canonical URL", type: "url", description: "Usually the final production homepage URL.", group: "seo" }),
    defineField({ name: "ogTitle", title: "Social sharing title", type: "string", group: "seo", validation: rule => rule.max(65) }),
    defineField({ name: "ogDescription", title: "Social sharing description", type: "text", rows: 3, group: "seo", validation: rule => rule.max(200) }),
    defineField({ name: "ogImage", title: "Social sharing image", type: "image", description: "Recommended size: 1200 × 630 pixels.", options: { hotspot: true }, group: "seo" }),
    defineField({ name: "ogImageAlt", title: "Social image alt text", type: "string", group: "seo" }),
    defineField({ name: "favicon", title: "Favicon", type: "image", description: "Upload a square PNG, ideally 512 × 512 pixels.", group: "seo" }),
    defineField({ name: "twitterHandle", title: "Twitter/X handle", type: "string", description: "Optional, including @.", group: "seo" }),
    defineField({ name: "noIndex", title: "Hide site from search engines", type: "boolean", initialValue: false, group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Site Settings", subtitle: "Brand, layout, content, theme and SEO" }) },
});
