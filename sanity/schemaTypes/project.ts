import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Portfolio Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: rule => rule.required() }),
    defineField({ name: "type", title: "Project type", type: "string", validation: rule => rule.required() }),
    defineField({ name: "image", title: "Cover image", type: "image", options: { hotspot: true }, validation: rule => rule.required() }),
    defineField({ name: "imageAlt", title: "Image alt text", type: "string", description: "Describe the image for accessibility and SEO." }),
    defineField({ name: "file", title: "Project PDF", type: "file", options: { accept: ".pdf" } }),
    defineField({ name: "externalUrl", title: "External project URL", type: "url" }),
    defineField({ name: "wide", title: "Use wide card", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 0, validation: rule => rule.required().integer().min(0) }),
  ],
  orderings: [{ title: "Display order", name: "displayOrder", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "type", media: "image" } },
});
