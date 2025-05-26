import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Database, Brain, Zap, Shield, Gamepad2, Sparkles, ArrowRight } from "lucide-react";

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
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const applications: ApplicationProps[] = [
    {
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      image: "https://plus.unsplash.com/premium_photo-1661878265739-da90bc1af051?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      image: "https://plus.unsplash.com/premium_photo-1681121353159-3278949ff491?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Machine Learning & AI",
      description: "Python is essential in AI with libraries like TensorFlow and scikit-learn. Build intelligent systems that learn and adapt.",
      icon: <Brain className="w-6 h-6" />,
      techStack: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenCV"],
      color: {
        primary: "from-purple-500 to-pink-500",
        secondary: "bg-purple-500/10",
        accent: "border-purple-500/30"
      }
    },
    {
      image: "https://plus.unsplash.com/premium_photo-1676637656198-e2bbf752103a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      image: "https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      image: "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    <motion.section 
      id="python-applications" 
      ref={sectionRef}
      className="container py-24 sm:py-32 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute top-20 left-1/4 w-80 h-80 rounded-full bg-primary/8"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, 40, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "blur(120px)" }}
        />
        
        <motion.div 
          className="absolute bottom-20 right-1/3 w-96 h-96 rounded-full bg-purple-500/8"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
            x: [0, -30, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          style={{ filter: "blur(100px)" }}
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMyMDIwMjAiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMzBjMCAxNi41Ny0xMy40MyAzMC0zMCAzMFMwIDQ2LjU3IDAgMzAgMTMuNDMgMCAzMCAwczMwIDEzLjQzIDMwIDMweiIgc3Ryb2tlPSIjZmZmZmZmMDMiIHN0cm9rZS13aWR0aD0iLjUiLz48L2c+PC9zdmc+')] opacity-[0.02]" />

        {/* Floating particles */}
        <AnimatePresence>
          {isInView && (
            <>
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute rounded-full bg-primary"
                  initial={{ 
                    opacity: 0,
                    x: "50%",
                    y: "50%",
                    scale: 0
                  }}
                  animate={{ 
                    opacity: [0, 0.4, 0],
                    x: `${Math.random() * 100}%`,
                    y: `${Math.random() * 100}%`,
                    scale: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 8 + Math.random() * 4,
                    repeat: Infinity,
                    delay: i * 0.6,
                    ease: "easeInOut"
                  }}
                  style={{ 
                    width: `${Math.random() * 4 + 2}px`,
                    height: `${Math.random() * 4 + 2}px`,
                    filter: "blur(1px)"
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Section header */}
      <motion.div 
        className="relative mb-16 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-bold relative"
          animate={{ filter: ["blur(0px)", "blur(0.5px)", "blur(0px)"] }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
        >
          Explore
          <motion.span 
            className="bg-gradient-to-r from-primary via-purple-500 to-primary text-transparent bg-clip-text ml-2"
            animate={{ 
              backgroundPosition: ["0% center", "100% center", "0% center"],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{ backgroundSize: "200% auto" }}
          >
            Python's Applications
          </motion.span>
          
          {/* Glowing effect behind text */}
          <motion.span 
            className="absolute -inset-2 rounded-lg blur-xl -z-10"
            animate={{ 
              opacity: [0.1, 0.3, 0.1], 
            }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
            style={{ 
              background: "linear-gradient(to right, rgba(var(--primary-rgb), 0.2), rgba(147, 51, 234, 0.2), rgba(var(--primary-rgb), 0.2))",
            }}
          />
        </motion.h2>
        
        <motion.div 
          className="h-1 w-0 bg-gradient-to-r from-primary to-purple-500 rounded-full mx-auto mt-6"
          animate={isInView ? { width: 150 } : { width: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
        />

        <motion.p 
          className="text-xl text-muted-foreground pt-4 pb-8 max-w-2xl mx-auto relative"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Python is used in various fields, from web development to artificial intelligence.
          <br />
          <motion.span className="text-primary font-medium">
            Hover over each section to learn more.
          </motion.span>
          
          {/* Animated underline */}
          <motion.span
            className="absolute bottom-6 left-0 h-0.5 w-full"
            initial={{ scaleX: 0 }}
            animate={isInView ? { 
              scaleX: [0, 1, 1, 0],
              background: [
                "linear-gradient(to right, transparent, rgba(var(--primary-rgb), 0.5), transparent)",
                "linear-gradient(to right, transparent, rgba(var(--primary-rgb), 0.8), transparent)",
                "linear-gradient(to right, transparent, rgba(var(--primary-rgb), 0.5), transparent)",
                "linear-gradient(to right, transparent, rgba(var(--primary-rgb), 0), transparent)"
              ]
            } : { scaleX: 0 }}
            transition={{ 
              duration: 3,
              times: [0, 0.3, 0.7, 1],
              delay: 1, 
              repeat: Infinity,
              repeatDelay: 4
            }}
          />
        </motion.p>
      </motion.div>

      {/* Applications grid */}
      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        {applications.map(({ image, title, description, icon, techStack, color }, index) => (
          <motion.div
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
            <Card className={`relative group overflow-hidden transition-all duration-500 border-2 backdrop-blur-sm
              ${hovered === index ? 
                `shadow-2xl shadow-primary/20 ${color.accent} scale-105 -translate-y-2` : 
                'border-border/50 hover:border-primary/30'
              }`}
            >
              {/* Background glow effect */}
              <motion.div 
                className={`absolute -inset-1 rounded-lg opacity-0 ${color.secondary} -z-10`}
                animate={{ 
                  opacity: hovered === index ? 0.6 : 0,
                  scale: hovered === index ? 1.02 : 1
                }}
                transition={{ duration: 0.3 }}
                style={{ filter: "blur(20px)" }}
              />

              {/* Rotating gradient border */}
              <motion.div
                className={`absolute -inset-0.5 bg-gradient-to-r ${color.primary} rounded-lg opacity-0 -z-20`}
                animate={{
                  opacity: hovered === index ? 0.8 : 0,
                  rotate: hovered === index ? 360 : 0,
                }}
                transition={{ 
                  opacity: { duration: 0.3 },
                  rotate: { duration: 8, ease: "linear", repeat: hovered === index ? Infinity : 0 }
                }}
                style={{ filter: "blur(10px)" }}
              />

              {/* Image section with overlay effects */}
              <div className="relative overflow-hidden">
                <motion.img 
                  src={image} 
                  alt={title} 
                  className="w-full h-48 object-cover"
                  animate={{
                    scale: hovered === index ? 1.1 : 1,
                    filter: hovered === index ? "brightness(0.7)" : "brightness(1)"
                  }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Icon overlay */}
                <motion.div
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
                  <motion.div
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
                  </motion.div>
                </motion.div>

                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                  initial={{ x: "-100%" }}
                  animate={{ x: hovered === index ? "200%" : "-100%" }}
                  transition={{ 
                    duration: 0.8,
                    ease: "easeInOut"
                  }}
                />

                {/* Tech stack badges */}
                <AnimatePresence>
                  {hovered === index && (
                    <motion.div
                      className="absolute bottom-2 left-2 flex flex-wrap gap-1"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                    >
                      {techStack.slice(0, 3).map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          className={`px-2 py-1 text-xs font-medium rounded-full ${color.secondary} border ${color.accent} backdrop-blur-sm`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 + techIndex * 0.1 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Content section */}
              <CardHeader className="relative z-10">
                <motion.div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <motion.span
                      animate={{
                        color: hovered === index ? "hsl(var(--primary))" : "hsl(var(--foreground))"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {title}
                    </motion.span>
                    
                    <motion.div
                      animate={{
                        x: hovered === index ? 5 : 0,
                        opacity: hovered === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </motion.div>
                  </CardTitle>
                  
                  {/* Sparkle animation */}
                  <AnimatePresence>
                    {hovered === index && (
                      <motion.div
                        initial={{ scale: 0, rotate: 0 }}
                        animate={{ scale: 1, rotate: 180 }}
                        exit={{ scale: 0, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Sparkles className="w-5 h-5 text-primary" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </CardHeader>

              {/* Expandable description overlay */}
              <AnimatePresence>
                {hovered === index && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/90 to-background/70 backdrop-blur-sm flex flex-col justify-end p-6 z-20"
                    initial={{ opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "100%" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                    >
                      <h3 className="text-xl font-bold mb-3 text-primary">{title}</h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {description}
                      </p>
                      
                      {/* All tech stack */}
                      <div className="flex flex-wrap gap-2">
                        {techStack.map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            className={`px-3 py-1 text-sm font-medium rounded-full ${color.secondary} border ${color.accent} backdrop-blur-sm`}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + techIndex * 0.05 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom call-to-action */}
      <motion.div
        className="flex justify-center mt-16"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div
          className="text-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.p className="text-lg text-muted-foreground mb-4">
            Ready to start your Python journey?
          </motion.p>
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-primary to-purple-500 text-white rounded-full font-medium relative overflow-hidden group"
            whileHover={{ boxShadow: "0 0 30px rgba(var(--primary-rgb), 0.5)" }}
          >
            <motion.a
              href="https://github.com/pythoncameroon"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-gradient-to-r from-primary to-purple-500 text-white rounded-full font-medium relative overflow-hidden group"
              whileHover={{ boxShadow: "0 0 30px rgba(var(--primary-rgb), 0.5)" }}
            >
              <span className="relative z-10">Join Python Cameroon</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-primary"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-primary"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};
