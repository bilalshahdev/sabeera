import { createClient } from "next-sanity";

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  throw new Error("Set SANITY_API_WRITE_TOKEN before running npm run sanity:migrate-project-slugs");
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "r51pzv9i",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-10-13",
  token,
  useCdn: false,
  perspective: "raw",
});

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

const documents = await client.fetch(
  `*[_type == "project"] | order(_createdAt asc) {_id, title, "slug": slug.current}`,
);

const groups = new Map();
for (const document of documents) {
  const canonicalId = document._id.replace(/^drafts\./, "");
  const group = groups.get(canonicalId) || [];
  group.push(document);
  groups.set(canonicalId, group);
}

const usedSlugs = new Set(
  documents
    .map(document => document.slug)
    .filter(slug => typeof slug === "string" && slug.length > 0),
);

const updates = [];
for (const group of groups.values()) {
  const existingSlug = group.find(document => document.slug)?.slug;
  const title = group.find(document => document.title?.trim())?.title;
  if (!title || group.every(document => document.slug)) continue;

  let candidate = existingSlug || slugify(title);
  if (!candidate) continue;

  if (!existingSlug) {
    const base = candidate;
    let suffix = 2;
    while (usedSlugs.has(candidate)) {
      candidate = `${base.slice(0, 75)}-${suffix++}`;
    }
    usedSlugs.add(candidate);
  }

  for (const document of group) {
    if (!document.slug) updates.push({ _id: document._id, title, slug: candidate });
  }
}

if (!updates.length) {
  console.log("All existing projects already have slugs.");
  process.exit(0);
}

let transaction = client.transaction();
for (const update of updates) {
  transaction = transaction.patch(update._id, patch =>
    patch.set({ slug: { _type: "slug", current: update.slug } }),
  );
}
await transaction.commit();

console.log(`Added slugs to ${updates.length} project document(s):`);
for (const update of updates) console.log(`- ${update.title}: ${update.slug}`);
