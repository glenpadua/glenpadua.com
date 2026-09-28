export interface MenuItem {
  name: string;
  url: string;
}

export interface BlogCategory {
  name: string;
  category: string;
  url: string;
}

export interface InfoSegment {
  text: string;
  bold?: boolean;
}

export interface AboutCardItem {
  id: number;
  title: string;
  iconKey: string;
  infoItalic?: boolean;
  infoClassName?: string;
  infoSegments: InfoSegment[];
  color: string;
  link?: string;
  href?: string;
}

export interface SkillCardItem {
  id: number;
  text: string;
  logo: string;
  color: string;
  desc: string;
  filter?: string;
}

export interface PortfolioTag {
  name: string;
  color: string;
}

export interface PortfolioLink {
  iconKey: string;
  url: string;
}

export interface PortfolioSection {
  heading: string;
  bullets: string[];
}

export interface PortfolioItem {
  id: number;
  title: string;
  tags: PortfolioTag[];
  links: PortfolioLink[];
  summary: string;
  sections: PortfolioSection[];
}

export interface TimelineItem {
  title: string;
  desc: string;
  date: string;
}

export interface PrismicImageField {
  url?: string | null;
  alt?: string | null;
}

export interface BlogSlice {
  id?: string;
  slice_type: string;
  primary: Record<string, unknown>;
}

export interface BlogPostData {
  title: unknown;
  preview?: unknown;
  category?: string;
  show_cover_image?: boolean;
  cover_image?: PrismicImageField;
  body?: BlogSlice[];
}

export interface BlogPostDocument {
  id: string;
  uid: string | null;
  first_publication_date: string;
  data: BlogPostData;
}
