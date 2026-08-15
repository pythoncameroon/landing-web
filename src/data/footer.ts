import { Github, Twitter, Linkedin, Youtube, MessageCircle, Phone } from "lucide-react";
import type { FooterSectionProps } from "@/types/sections";

export const footerSections: FooterSectionProps[] = [
  {
    title: "Follow US",
    links: [
      {
        name: "Github",
        url: "https://github.com/pythoncameroon",
        icon: Github,
      },
      {
        name: "Twitter(X)",
        url: "https://x.com/pythoncameroon",
        icon: Twitter,
      },
      {
        name: "LinkedIn",
        url: "https://linkedin.com/company/PythonCameroon",
        icon: Linkedin,
      },
      {
        name: "Youtube",
        url: "https://www.youtube.com/@PythonCameroon",
        icon: Youtube,
      },
    ],
  },
  {
    title: "About",
    links: [
      { name: "FAQ", url: "#faq", icon: null },
      { name: "Team", url: "#team", icon: null },
    ],
  },
  {
    title: "Community",
    links: [
      {
        name: "Discord",
        url: "https://discord.gg/TWVCKCe3Dt",
        icon: MessageCircle,
      },
      {
        name: "WhatsApp",
        url: "https://chat.whatsapp.com/Ckc80ophGEH0NJFmZAzDMr",
        icon: Phone,
      },
    ],
  },
];
