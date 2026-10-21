import { Dribbble, ExternalLink, Facebook, Github, Globe, Instagram, Linkedin, Link as LinkIcon, Mail, Youtube } from "lucide-react";
import type { ComponentType } from "react";
import type { SocialLink } from "@/sanity/lib/types";

const icons: Record<string, ComponentType<{ size?: number }>> = {
  linkedin: Linkedin, instagram: Instagram, github: Github, facebook: Facebook,
  x: ExternalLink, youtube: Youtube, behance: ExternalLink, dribbble: Dribbble,
  website: Globe, email: Mail, link: LinkIcon,
};

export function SocialLinks({ links }: { links?: SocialLink[] | null }) {
  const visible = (links || []).filter(link => link.visible !== false);
  if (!visible.length) return null;
  return <div className="social-links">
    {visible.map(link => {
      const Icon = icons[link.icon || "link"] || LinkIcon;
      return <a href={link.url} target={link.newTab === false ? undefined : "_blank"} rel={link.newTab === false ? undefined : "noreferrer"} title={link.title || link.label} key={link._key}>
        <Icon size={17} /><span>{link.label}</span>
      </a>;
    })}
  </div>;
}
