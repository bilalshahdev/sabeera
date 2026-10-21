import { experience } from "./experience";
import { project } from "./project";
import { projectCategory } from "./projectCategory";
import { siteSettings } from "./siteSettings";
import { aboutSettings, brandSettings, contactSettings, contentSettings, heroSettings, layoutSettings, seoSettings } from "./settingsSections";

export const schemaTypes = [
  siteSettings,
  brandSettings,
  layoutSettings,
  heroSettings,
  aboutSettings,
  contentSettings,
  contactSettings,
  seoSettings,
  experience,
  projectCategory,
  project,
];
