import { defineArrayMember, defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Portfolio Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: rule => rule.required() }),
    defineField({ name: "slug", title: "Page slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: rule => rule.required() }),
    defineField({ name: "description", title: "Project description", type: "text", rows: 5 }),
    defineField({
      name: "categories",
      title: "Project types",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "projectCategory" }] })],
      validation: rule => rule.unique(),
    }),
    defineField({ name: "type", title: "Legacy project type", type: "string", description: "Used by older projects. Prefer Project types above.", hidden: ({ document }) => Boolean(document?.categories) }),
    defineField({ name: "image", title: "Cover image", type: "image", options: { hotspot: true }, validation: rule => rule.required() }),
    defineField({ name: "imageAlt", title: "Image alt text", type: "string", description: "Describe the image for accessibility and SEO." }),
    defineField({
      name: "gallery",
      title: "Project gallery",
      description: "Add as many project images as needed. Drag to reorder them.",
      type: "array",
      of: [defineArrayMember({
        name: "galleryImage",
        title: "Gallery image",
        type: "image",
        options: { hotspot: true },
        fields: [
          defineField({ name: "alt", title: "Alternative text", type: "string" }),
          defineField({ name: "caption", title: "Caption", type: "string" }),
        ],
      })],
    }),
    defineField({ name: "file", title: "Project PDF", type: "file", options: { accept: ".pdf" } }),
    defineField({ name: "externalUrl", title: "External project URL", type: "url" }),
    defineField({ name: "wide", title: "Use wide card", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 0, validation: rule => rule.required().integer().min(0) }),
  ],
  orderings: [{ title: "Display order", name: "displayOrder", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", legacyType: "type", category: "categories.0.title", media: "image" },
    prepare: ({ title, legacyType, category, media }) => ({ title, subtitle: category || legacyType || "Uncategorized", media }),
  },
});
