import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = S =>
  S.list()
    .title("Sabeera Portfolio")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.documentTypeListItem("experience").title("Experience"),
      S.documentTypeListItem("project").title("Portfolio Projects"),
    ]);
