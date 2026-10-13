import { defineField, defineType } from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({ name: "role", title: "Role", type: "string", validation: rule => rule.required() }),
    defineField({ name: "organization", title: "Organization", type: "string" }),
    defineField({ name: "period", title: "Period", type: "string", validation: rule => rule.required() }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "status", title: "Status", type: "string", description: "For example: In progress" }),
    defineField({ name: "url", title: "Organization URL", type: "url" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4, validation: rule => rule.required() }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 0, validation: rule => rule.required().integer().min(0) }),
  ],
  orderings: [{ title: "Display order", name: "displayOrder", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "role", subtitle: "organization" } },
});
