import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { LogoIcon } from "./Icons";
import { Github, Twitter, Linkedin, Youtube, MessageCircle, Phone } from "lucide-react";

export const Footer = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: false, amount: 0.2 });
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const socialIcons = {
    Github: Github,
    Twitter: Twitter,
    Linkedin: Linkedin,
    Youtube: Youtube,
    Discord: MessageCircle,
    WhatsApp: Phone,
  };

  const footerSections = [
    {
      title: "Follow US",
      links: [
        { name: "Github", url: "https://github.com/pythoncameroon", icon: "Github" },
        { name: "Twitter(X)", url: "https://x.com/pythoncameroon", icon: "Twitter" },
        { name: "LinkedIn", url: "https://linkedin.com/company/PythonCameroon", icon: "Linkedin" },
      ]
    },
    {
      title: "About",
      links: [
        { name: "FAQ", url: "#faq", icon: null },
        { name: "Team", url: "#team", icon: null },
        { name: "Community", url: "#community", icon: null },
      ]
    },
    {
      title: "Community",
      links: [
        { name: "Youtube", url: "#", icon: "Youtube" },
        { name: "Discord", url: "https://discord.gg/TWVCKCe3Dt", icon: "Discord" },
        { name: "WhatsApp", url: "https://chat.whatsapp.com/Ckc80ophGEH0NJFmZAzDMr", icon: "WhatsApp" },
      ]
    }
  ];

  return (
    <motion.footer 
      id="footer"
      ref={footerRef}
      className="relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "blur(120px)" }}
        />
        
        <motion.div 
          className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full bg-purple-500/10"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.12, 0.05],
            x: [0, -40, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          style={{ filter: "blur(100px)" }}
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMyMDIwMjAiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMzBjMCAxNi41Ny0xMy40MyAzMC0zMCAzMFMwIDQ2LjU3IDAgMzAgMTMuNDMgMCAzMCAwczMwIDEzLjQzIDMwIDMweiIgc3Ryb2tlPSIjZmZmZmZmMDMiIHN0cm9rZS13aWR0aD0iLjUiLz48L2c+PC9zdmc+')] opacity-[0.02]" />
      </div>

      {/* Animated top divider */}
      <motion.hr 
        className="w-11/12 mx-auto"
        initial={{ width: "0%" }}
        animate={isInView ? { width: "91.666667%" } : { width: "0%" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      <section className="container py-20 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
          {/* Logo section with enhanced animations */}
          <motion.div 
            className="col-span-full xl:col-span-2"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.a
              rel="noreferrer noopener"
              href="/"
              className="font-bold text-xl flex items-center relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="relative"
                whileHover={{ rotate: 10 }}
                transition={{ duration: 0.3 }}
              >
                <LogoIcon />
                
                {/* Floating particles around logo */}
                <AnimatePresence>
                  {isInView && (
                    <>
                      {Array.from({ length: 6 }).map((_, i) => (
                        <motion.div
                          key={`logo-particle-${i}`}
                          className="absolute w-1 h-1 rounded-full bg-primary"
                          initial={{ 
                            opacity: 0,
                            scale: 0,
                            x: 0,
                            y: 0
                          }}
                          animate={{ 
                            opacity: [0, 0.8, 0],
                            scale: [0, 1, 0],
                            x: Math.cos((i * Math.PI) / 3) * 30,
                            y: Math.sin((i * Math.PI) / 3) * 30,
                          }}
                          transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "easeInOut"
                          }}
                          style={{ filter: "blur(0.5px)" }}
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>

                {/* Glow effect */}
                <motion.div 
                  className="absolute inset-0 rounded-full bg-primary opacity-0 group-hover:opacity-20"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0, 0.1, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ filter: "blur(15px)" }}
                />
              </motion.div>
              
              <motion.span
                className="ml-3 bg-gradient-to-r from-primary via-purple-500 to-primary text-transparent bg-clip-text font-bold"
                animate={{ 
                  backgroundPosition: ["0% center", "100% center", "0% center"],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{ backgroundSize: "200% auto" }}
              >
                Python Cameroon
              </motion.span>
            </motion.a>

            {/* Description */}
            <motion.p 
              className="text-muted-foreground mt-4 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 0.8, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Empowering Python developers across Cameroon through community, learning, and innovation.
            </motion.p>
          </motion.div>

          {/* Footer sections with staggered animations */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div 
              key={section.title}
              className="flex flex-col gap-2 relative"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.3 + sectionIndex * 0.1, duration: 0.6 }}
              onMouseEnter={() => setHoveredSection(section.title)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              {/* Section title with glow effect */}
              <motion.h3 
                className="font-bold text-lg relative"
                animate={{
                  color: hoveredSection === section.title ? 
                    "hsl(var(--primary))" : 
                    "hsl(var(--foreground))",
                }}
                transition={{ duration: 0.3 }}
              >
                {section.title}
                
                {/* Underline animation */}
                <motion.div 
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-purple-500"
                  initial={{ width: "0%" }}
                  animate={{ width: hoveredSection === section.title ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Background glow */}
                {hoveredSection === section.title && (
                  <motion.div 
                    className="absolute -inset-2 rounded-lg bg-primary/10 -z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    style={{ filter: "blur(10px)" }}
                  />
                )}
              </motion.h3>

              {/* Links with hover animations */}
              <AnimatePresence>
                {section.links.map((link, linkIndex) => {
                  const IconComponent = link.icon ? socialIcons[link.icon as keyof typeof socialIcons] : null;
                  
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + sectionIndex * 0.1 + linkIndex * 0.05, duration: 0.4 }}
                    >
                      <motion.a
                        rel="noreferrer noopener"
                        href={link.url}
                        target={link.url.startsWith('http') ? "_blank" : undefined}
                        className="opacity-60 hover:opacity-100 flex items-center gap-2 group relative py-1"
                        whileHover={{ x: 5, scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        {IconComponent && (
                          <motion.div
                            whileHover={{ rotate: 10, scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <IconComponent size={16} className="text-primary/70 group-hover:text-primary" />
                          </motion.div>
                        )}
                        
                        <span className="relative">
                          {link.name}
                          
                          {/* Underline effect */}
                          <motion.span 
                            className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-primary to-purple-500 group-hover:w-full"
                            transition={{ duration: 0.3 }}
                          />
                        </span>

                        {/* Hover glow effect */}
                        <motion.div 
                          className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 rounded-md -z-10"
                          transition={{ duration: 0.3 }}
                        />
                      </motion.a>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom section with animated copyright */}
        <motion.div 
          className="border-t border-primary/20 pt-8 mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.p 
            className="text-muted-foreground relative"
            animate={{
              filter: ["blur(0px)", "blur(0.5px)", "blur(0px)"]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            © {new Date().getFullYear()}{" "}
            <motion.span
              className="bg-gradient-to-r from-primary to-purple-500 text-transparent bg-clip-text font-medium"
              animate={{ 
                backgroundPosition: ["0% center", "100% center", "0% center"],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ backgroundSize: "200% auto" }}
            >
              Python Cameroon
            </motion.span>
            . All rights reserved. Built with ❤️ for the community.
          </motion.p>

          {/* Floating heart animation */}
          <motion.div
            className="inline-block ml-1"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ❤️
          </motion.div>
        </motion.div>
      </section>

      {/* Bottom animated border */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-px"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
        style={{
          background: "linear-gradient(to right, transparent, rgba(var(--primary-rgb), 0.5), transparent)"
        }}
      />
    </motion.footer>
  );
};
