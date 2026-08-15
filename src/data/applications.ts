import { Code2, Database, Brain, Zap, Shield, Gamepad2 } from "lucide-react";
import type { ApplicationProps } from "@/types/sections";
// Images servies localement en WebP 800px au lieu d'Unsplash ~2000px (AUDIT.md P3)
import webDevelopmentImg from "@/assets/applications/web-development.webp";
import dataScienceImg from "@/assets/applications/data-science.webp";
import machineLearningImg from "@/assets/applications/machine-learning.webp";
import automationImg from "@/assets/applications/automation.webp";
import cybersecurityImg from "@/assets/applications/cybersecurity.webp";
import gameDevelopmentImg from "@/assets/applications/game-development.webp";

export const applicationsData: ApplicationProps[] = [
  {
    image: webDevelopmentImg,
    title: "Web Development",
    description:
      "Python is widely used for building websites with frameworks like Django and Flask. Create powerful, scalable web applications with clean, maintainable code.",
    icon: Code2,
    techStack: ["Django", "Flask", "FastAPI", "SQLAlchemy"],
    color: {
      primary: "from-blue-500 to-cyan-500",
      secondary: "bg-blue-500/10",
      accent: "border-blue-500/30",
    },
  },
  {
    image: dataScienceImg,
    title: "Data Science",
    description:
      "Python is the go-to language for data analysis, visualization, and manipulation using Pandas and NumPy. Transform raw data into actionable insights.",
    icon: Database,
    techStack: ["Pandas", "NumPy", "Matplotlib", "Jupyter"],
    color: {
      primary: "from-green-500 to-emerald-500",
      secondary: "bg-green-500/10",
      accent: "border-green-500/30",
    },
  },
  {
    image: machineLearningImg,
    title: "Machine Learning & AI",
    description:
      "Python is essential in AI with libraries like TensorFlow and scikit-learn. Build intelligent systems that learn and adapt.",
    icon: Brain,
    techStack: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenCV"],
    color: {
      primary: "from-secondary to-pink-500",
      secondary: "bg-secondary/10",
      accent: "border-secondary/30",
    },
  },
  {
    image: automationImg,
    title: "Automation & Scripting",
    description:
      "Automate repetitive tasks using Python scripts, Selenium, and BeautifulSoup. Increase productivity and eliminate manual work.",
    icon: Zap,
    techStack: ["Selenium", "BeautifulSoup", "Requests", "Celery"],
    color: {
      primary: "from-yellow-500 to-orange-500",
      secondary: "bg-yellow-500/10",
      accent: "border-yellow-500/30",
    },
  },
  {
    image: cybersecurityImg,
    title: "Cybersecurity",
    description:
      "Python is used in ethical hacking, penetration testing, and security analysis. Protect digital assets with powerful security tools.",
    icon: Shield,
    techStack: ["Scapy", "Nmap", "Metasploit", "Wireshark"],
    color: {
      primary: "from-red-500 to-rose-500",
      secondary: "bg-red-500/10",
      accent: "border-red-500/30",
    },
  },
  {
    image: gameDevelopmentImg,
    title: "Game Development",
    description:
      "Python is used to create games with frameworks like Pygame and Panda3D. Build engaging interactive experiences and simulations.",
    icon: Gamepad2,
    techStack: ["Pygame", "Panda3D", "Arcade", "Kivy"],
    color: {
      primary: "from-indigo-500 to-violet-500",
      secondary: "bg-indigo-500/10",
      accent: "border-indigo-500/30",
    },
  },
];
