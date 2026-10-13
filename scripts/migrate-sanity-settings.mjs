import { createClient } from "next-sanity";

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) throw new Error("Set SANITY_API_WRITE_TOKEN before running npm run sanity:migrate-settings");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "r51pzv9i",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-10-13",
  token,
  useCdn: false,
});

const legacy = await client.fetch('*[_id == "siteSettings"][0]');
if (!legacy) throw new Error("The existing siteSettings document was not found.");

const pick = (keys) => Object.fromEntries(keys.filter(key => legacy[key] !== undefined).map(key => [key, legacy[key]]));
const documents = [
  { _id: "brandSettings", _type: "brandSettings", ...pick(["brandName", "brandMark", "signatureColor", "primaryBackgroundColor", "primaryTextColor"]) },
  { _id: "layoutSettings", _type: "layoutSettings", ...pick(["sections"]) },
  { _id: "heroSettings", _type: "heroSettings", ...pick(["availability", "role", "heroTitle", "heroAccent", "heroEnding", "heroDescription", "ribbonItems"]) },
  { _id: "aboutSettings", _type: "aboutSettings", ...pick(["aboutHeading", "aboutLead", "aboutBody"]) },
  { _id: "contentSettings", _type: "contentSettings", ...pick(["expertiseHeading", "experienceHeading", "experienceAccent", "experienceDescription", "workHeading", "workDescription", "services", "skills", "tools"]) },
  { _id: "contactSettings", _type: "contactSettings", ...pick(["contactEyebrow", "contactHeading", "email", "location", "resume"]) },
  { _id: "seoSettings", _type: "seoSettings", ...pick(["seoTitle", "seoDescription", "seoKeywords", "canonicalUrl", "ogTitle", "ogDescription", "ogImage", "ogImageAlt", "favicon", "twitterHandle", "noIndex"]) },
];

let transaction = client.transaction();
for (const document of documents) transaction = transaction.createIfNotExists(document);
await transaction.commit();
console.log("Settings split into separate Sanity sections successfully.");
