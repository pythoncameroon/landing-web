import type { LucideIcon } from "lucide-react";

type TeamProps = {
  name: string;
  image: string;
  role: string;
  links: {
    linkedIn: string;
    website?: string;
  };
};

type SponsorProps = {
  icon: string;
  name: string;
  link: string;
};

type FAQItemProps = {
  question: string;
  answer: string;
  value: string;
};

type ApplicationProps = {
  image: string;
  title: string;
  description: string;
  icon: LucideIcon;
  techStack: string[];
  color: {
    primary: string;
    secondary: string;
    accent: string;
  };
};

type FooterLinkProps = {
  name: string;
  url: string;
  icon: LucideIcon | null;
};

type FooterSectionProps = {
  title: string;
  links: FooterLinkProps[];
};

export type {
  TeamProps,
  SponsorProps,
  FAQItemProps,
  ApplicationProps,
  FooterLinkProps,
  FooterSectionProps,
};
