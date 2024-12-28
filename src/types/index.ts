import { IconType } from 'react-icons';

export interface Service {
  icon: IconType;
  title: string;
  description: string;
  color: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  github: string;
  demo: string;
  color: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
  readTime: string;
}

export interface SocialIcon {
  href: string;
  icon: IconType;
  delay: number;
}
