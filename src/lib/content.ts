import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import yaml from "js-yaml";

const CONTENT_DIR = path.join(process.cwd(), "content");

function readYaml<T>(relPath: string): T {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, relPath), "utf8");
  return yaml.load(raw) as T;
}

function readCollection<T extends { visible?: boolean; order?: number }>(
  folder: string
): (T & { slug: string; body: string })[] {
  const dir = path.join(CONTENT_DIR, folder);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  const items = files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const { data, content } = matter(raw);
    return { ...(data as T), slug: file.replace(/\.md$/, ""), body: content.trim() };
  });
  return items
    .filter((item) => item.visible !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export type Section = { id: string; visible: boolean };

export type SiteSettings = {
  title: string;
  tagline: string;
  hero_kicker: string;
  hero_headline: string;
  hero_subline: string;
  hero_cta_label: string;
  hero_cta_target: string;
  sections: Section[];
};

export type AboutSettings = {
  visible: boolean;
  eyebrow: string;
  title: string;
  body: string;
  stats: { value: string; label: string }[];
};

export type ContactsSettings = {
  visible: boolean;
  title: string;
  address: string;
  note?: string;
  phone?: string;
  email?: string;
  vk?: string;
  map_embed?: string;
};

export type SimpleSettings = { visible: boolean; title: string; body: string };

export type Direction = {
  title: string;
  code: string;
  icon: string;
  order: number;
  visible: boolean;
  summary: string;
  slug: string;
  body: string;
};

export type NewsItem = {
  title: string;
  date: string;
  visible: boolean;
  cover?: string;
  summary: string;
  slug: string;
  body: string;
};

export type Partner = {
  title: string;
  order: number;
  visible: boolean;
  logo: string;
  url: string;
  slug: string;
  body: string;
};

export type GallerySettings = {
  visible: boolean;
  title: string;
  items: { image: string; caption?: string }[];
};

export function getSiteSettings(): SiteSettings {
  return readYaml<SiteSettings>("settings/site.yml");
}

export function getAbout(): AboutSettings {
  return readYaml<AboutSettings>("settings/about.yml");
}

export function getContacts(): ContactsSettings {
  return readYaml<ContactsSettings>("settings/contacts.yml");
}

export function getEnrollment(): SimpleSettings {
  return readYaml<SimpleSettings>("settings/enrollment.yml");
}

export function getDocuments(): SimpleSettings {
  return readYaml<SimpleSettings>("settings/documents.yml");
}

export function getGallery(): GallerySettings {
  return readYaml<GallerySettings>("gallery/gallery.yml");
}

export function getDirections(): Direction[] {
  return readCollection<Direction>("directions");
}

export function getNews(): NewsItem[] {
  const items = readCollection<NewsItem>("news");
  return [...items].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPartners(): Partner[] {
  return readCollection<Partner>("partners");
}

export function isVisible(sections: Section[], id: string, fallback = true): boolean {
  const found = sections.find((s) => s.id === id);
  return found ? found.visible : fallback;
}
