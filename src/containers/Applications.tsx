import { useState, useRef } from "react";
import { m, useInView, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Database, Brain, Zap, Shield, Gamepad2, Sparkles, ArrowRight } from "lucide-react";
// Images servies localement en WebP 800px au lieu d'Unsplash ~2000px (AUDIT.md P3)
import webDevelopmentImg from "@/assets/applications/web-development.webp";
import dataScienceImg from "@/assets/applications/data-science.webp";
import machineLearningImg from "@/assets/applications/machine-learning.webp";
import automationImg from "@/assets/applications/automation.webp";
import cybersecurityImg from "@/assets/applications/cybersecurity.webp";
import gameDevelopmentImg from "@/assets/applications/game-development.webp";

interface ApplicationProps {
  image: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  techStack: string[];
  color: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const Applications = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [, setActiveCard] = useState<number | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const applications: ApplicationProps[] = [
    {
      image: webDevelopmentImg,
      title: "Web Development",
      description: "Python is widely used for building websites with frameworks like Django and Flask. Create powerful, scalable web applications with clean, maintainable code.",
      icon: <Code2 className="w-6 h-6" />,
      techStack: ["Django", "Flask", "FastAPI", "SQLAlchemy"],
      color: {
        primary: "from-blue-500 to-cyan-500",
        secondary: "bg-blue-500/10",
        accent: "border-blue-500/30"
      }
    },
    {
      image: dataScienceImg,
      title: "Data Science",
      description: "Python is the go-to language for data analysis, visualization, and manipulation using Pandas and NumPy. Transform raw data into actionable insights.",
      icon: <Database className="w-6 h-6" />,
      techStack: ["Pandas", "NumPy", "Matplotlib", "Jupyter"],
      color: {
        primary: "from-green-500 to-emerald-500",
        secondary: "bg-green-500/10",
        accent: "border-green-500/30"
      }
    },
    {
      image: machineLearningImg,
      title: "Machine Learning & AI",
      description: "Python is essential in AI with libraries like TensorFlow and scikit-learn. Build intelligent systems that learn and adapt.",
      icon: <Brain className="w-6 h-6" />,
      techStack: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenCV"],
      color: {
        primary: "from-secondary to-pink-500",
        secondary: "bg-secondary/10",
        accent: "border-secondary/30"
      }
    },
    {
      image: automationImg,
      title: "Automation & Scripting",
      description: "Automate repetitive tasks using Python scripts, Selenium, and BeautifulSoup. Increase productivity and eliminate manual work.",
      icon: <Zap className="w-6 h-6" />,
      techStack: ["Selenium", "BeautifulSoup", "Requests", "Celery"],
      color: {
        primary: "from-yellow-500 to-orange-500",
        secondary: "bg-yellow-500/10",
        accent: "border-yellow-500/30"
      }
    },
    {
      image: cybersecurityImg,
      title: "Cybersecurity",
      description: "Python is used in ethical hacking, penetration testing, and security analysis. Protect digital assets with powerful security tools.",
      icon: <Shield className="w-6 h-6" />,
      techStack: ["Scapy", "Nmap", "Metasploit", "Wireshark"],
      color: {
        primary: "from-red-500 to-rose-500",
        secondary: "bg-red-500/10",
        accent: "border-red-500/30"
      }
    },
    {
      image: gameDevelopmentImg,
      title: "Game Development",
      description: "Python is used to create games with frameworks like Pygame and Panda3D. Build engaging interactive experiences and simulations.",
      icon: <Gamepad2 className="w-6 h-6" />,
      techStack: ["Pygame", "Panda3D", "Arcade", "Kivy"],
      color: {
        primary: "from-indigo-500 to-violet-500",
        secondary: "bg-indigo-500/10",
        accent: "border-indigo-500/30"
      }
    },
  ];

  return (
    <m.section
      id="python-applications"
      ref={sectionRef}
      className="container py-24 sm:py-32 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-20 left-1/4 w-80 h-80 rounded-full bg-primary/8"
          style={{ filter: "blur(120px)" }}
        />

        <div
          className="absolute bottom-20 right-1/3 w-96 h-96 rounded-full bg-secondary"
          style={{ filter: "blur(100px)", opacity: 0.15 }}
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMyMDIwMjAiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMzBjMCAxNi41Ny0xMy40MyAzMC0zMCAzMFMwIDQ2LjU3IDAgMzAgMTMuNDMgMCAzMCAwczMwIDEzLjQzIDMwIDMweiIgc3Ryb2tlPSIjZmZmZmZmMDMiIHN0cm9rZS13aWR0aD0iLjUiLz48L2c+PC9zdmc+')] opacity-[0.02]" />
      </div>

      {/* Section header */}
      <m.div
        className="relative mb-16 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
        transition={{ duration: 0.8 }}
      >
        <h2
          className="text-3xl md:text-4xl font-bold relative"
        >
          Explore
          <span
            className="bg-gradient-to-r from-primary via-secondary to-primary text-transparent bg-clip-text ml-2"
          >
            Python's Applications
          </span>

          {/* Glowing effect behind text */}
          <span
            className="absolute -inset-2 rounded-lg blur-xl -z-10"
            style={{
              background: "linear-gradient(to right, rgba(var(--primary-rgb), 0.2), rgba(147, 51, 234, 0.2), rgba(var(--primary-rgb), 0.2))",
              opacity: 0.2,
            }}
          />
        </h2>

        <m.div
          className="h-1 w-0 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-6"
          animate={isInView ? { width: 150 } : { width: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
        />

        <m.p
          className="text-lg text-muted-foreground pt-4 pb-8 max-w-2xl mx-auto relative"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Python is used in various fields, from web development to artificial intelligence.
        </m.p>
      </m.div>

      {/* Applications grid */}
      <m.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        {applications.map(({ image, title, description, icon, techStack, color }, index) => (
          <m.div
            key={title}
            className="relative perspective-1000"
            initial={{ opacity: 0, y: 60, rotateX: 10 }}
            animate={isInView ? 
              { opacity: 1, y: 0, rotateX: 0 } : 
              { opacity: 0, y: 60, rotateX: 10 }
            }
            transition={{ 
              delay: 1 + index * 0.1,
              duration: 0.8,
              type: "spring",
              stiffness: 100
            }}
            onMouseEnter={() => {
              setHovered(index);
              setActiveCard(index);
            }}
            onMouseLeave={() => {
              setHovered(null);
              setActiveCard(null);
            }}
          >
            {/* Halos hors de la Card : dedans, son overflow-hidden + son contexte
                d'empilement les faisaient flotter AU-DESSUS du fond de carte et
                rendaient le titre illisible au survol. Ici ils passent derrière
                la carte et ne forment qu'un halo autour. */}
            <m.div
              className={`absolute -inset-1 rounded-lg opacity-0 ${color.secondary} -z-10`}
              animate={{
                opacity: hovered === index ? 0.6 : 0,
                scale: hovered === index ? 1.09 : 1
              }}
              transition={{ duration: 0.3 }}
              style={{ filter: "blur(20px)" }}
            />

            <m.div
              className={`absolute -inset-0.5 bg-gradient-to-r ${color.primary} rounded-lg opacity-0 -z-20`}
              animate={{
                opacity: hovered === index ? 0.8 : 0,
                scale: hovered === index ? 1.06 : 1,
              }}
              transition={{ duration: 0.3 }}
              style={{ filter: "blur(10px)" }}
            />

            <Card className={`relative group overflow-hidden transition-all duration-500 border-2 backdrop-blur-sm
              ${hovered === index ?
                `shadow-2xl shadow-primary/20 ${color.accent} scale-105 -translate-y-2` :
                'border-border/50 hover:border-primary/30'
              }`}
            >
              {/* Image section with overlay effects */}
              <div className="relative overflow-hidden">
                <m.img
                  src={image}
                  alt={title}
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={534}
                  className="w-full h-48 object-cover"
                  animate={{
                    scale: hovered === index ? 1.1 : 1,
                    filter: hovered === index ? "brightness(0.7)" : "brightness(1)"
                  }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Icon overlay */}
                <m.div
                  className={`absolute top-4 right-4 p-3 rounded-full ${color.secondary} backdrop-blur-sm border ${color.accent}`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ 
                    scale: 1, 
                    rotate: 0,
                    y: hovered === index ? -5 : 0
                  }}
                  transition={{ 
                    delay: 1.2 + index * 0.1, 
                    duration: 0.6,
                    type: "spring"
                  }}
                >
                  <m.div
                    animate={{
                      color: hovered === index ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                      rotate: hovered === index ? [0, 10, -10, 0] : 0
                    }}
                    transition={{ 
                      color: { duration: 0.3 },
                      rotate: { duration: 0.5 }
                    }}
                  >
                    {icon}
                  </m.div>
                </m.div>

                {/* Shine effect */}
                <m.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                  initial={{ x: "-100%" }}
                  animate={{ x: hovered === index ? "200%" : "-100%" }}
                  transition={{ 
                    duration: 0.8,
                    ease: "easeInOut"
                  }}
                />

              </div>

              {/* Content section */}
              <CardHeader className="relative z-10">
                <m.div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <m.span
                      animate={{
                        color: hovered === index ? "hsl(var(--primary))" : "hsl(var(--foreground))"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {title}
                    </m.span>
                    
                    <m.div
                      animate={{
                        x: hovered === index ? 5 : 0,
                        opacity: hovered === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </m.div>
                  </CardTitle>
                  
                  {/* Sparkle animation */}
                  <AnimatePresence>
                    {hovered === index && (
                      <m.div
                        initial={{ scale: 0, rotate: 0 }}
                        animate={{ scale: 1, rotate: 180 }}
                        exit={{ scale: 0, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Sparkles className="w-5 h-5 text-primary" />
                      </m.div>
                    )}
                  </AnimatePresence>
                </m.div>
              </CardHeader>

              {/* Description + tech stack visibles par défaut : plus de contenu
                  réservé au hover, inaccessible au clavier/tactile (AUDIT.md A1) */}
              <CardContent className="relative z-10">
                <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                  {description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 text-xs font-medium rounded-full ${color.secondary} border ${color.accent} backdrop-blur-sm`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </m.div>
        ))}
      </m.div>

      {/* Bottom call-to-action */}
      <m.div
        className="flex justify-center mt-16"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <m.div
          className="text-center"
        >
          <m.h3 className="text-2xl text-muted-foreground mb-4">
            Ready to start your Python journey?
          </m.h3>
          <m.a
            href="https://github.com/pythoncameroon"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-gradient-to-r from-primary to-secondary text-black rounded-full font-medium relative overflow-hidden group"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(var(--primary-rgb), 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Join Python Cameroon</span>
            <m.div
              className="absolute inset-0 bg-gradient-to-r from-secondary to-primary"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </m.a>
        </m.div>
      </m.div>
    </m.section>
  );
};
