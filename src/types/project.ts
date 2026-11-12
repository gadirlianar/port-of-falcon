/**
 * Port of Falcon — Project & Visual Showcase Type Definitions
 * Path: src/types/project.ts
 */

export interface MetricItem {
  label: string;
  value: string;
}

export interface DesktopPreviewConfig {
  url: string;
  title: string;
  type: 'interactive' | 'visual';
}

export interface MobilePreviewConfig {
  type: 'interactive' | 'visual';
}

export interface ProjectLinks {
  github: string;
  live?: string;
  docs?: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  metrics: MetricItem[];
  tags: string[];
  desktopPreview: DesktopPreviewConfig;
  mobilePreview: MobilePreviewConfig;
  links: ProjectLinks;
}

export interface DisciplineItem {
  index: string;                   // '01', '02', '03'
  title: string;
  eyebrow: string;
  description: string;
  skills: string[];
  highlightMetric: {
    value: string;
    label: string;
  };
}

export interface MarqueeCard {
  id: string;
  title: string;
  tag: string;
  metric: string;
  imageSrc: string;
  lane: 1 | 2;
}

export interface SocialLink {
  name: string;
  url: string;
  handle: string;
  badgeText: string;
}
