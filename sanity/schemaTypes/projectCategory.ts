import { defineField, defineType } from "sanity";

export const projectCategory = defineType({
  name: "projectCategory",
  title: "Project Type",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: rule => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 80 }, validation: rule => rule.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 0, validation: rule => rule.required().integer().min(0) }),
  ],
  orderings: [{ title: "Display order", name: "displayOrder", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "description" } },
});
