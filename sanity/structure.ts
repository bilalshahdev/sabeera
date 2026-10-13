import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = S =>
  S.list()
    .title("Sabeera Portfolio")
    .items([
      singleton(S, "Brand & Global Theme", "brandSettings"),
      singleton(S, "Page Sections & Theme", "layoutSettings"),
      singleton(S, "Hero Section", "heroSettings"),
      singleton(S, "About Section", "aboutSettings"),
      singleton(S, "Expertise, Work & Tools", "contentSettings"),
      singleton(S, "Contact & Resume", "contactSettings"),
      singleton(S, "SEO & Social Sharing", "seoSettings"),
      S.divider(),
      S.documentTypeListItem("experience").title("Experience"),
      S.documentTypeListItem("project").title("Portfolio Projects"),
    ]);

function singleton(S: Parameters<StructureResolver>[0], title: string, schemaType: string) {
  return S.listItem()
    .title(title)
    .id(schemaType)
    .child(S.document().schemaType(schemaType).documentId(schemaType));
}
