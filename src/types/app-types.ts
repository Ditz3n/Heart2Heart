import { LucideIcon } from "lucide-react";

export interface Story {
  id: number;
  content: string;
}

export interface TeamMember {
  name: string;
  role?: string;
  email: string;
  image: string;
}

export interface ProductFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: LucideIcon;
}

export interface Sponsor {
  name: string;
  logo: string;
}
