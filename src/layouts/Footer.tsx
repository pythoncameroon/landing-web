import { useState, useRef } from "react";
import { m, useInView, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { GlowBackground } from "@/components/section/GlowBackground";
import { footerSections } from "@/data/footer";

export const Footer = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.2 });
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  return (
    <m.footer
      id="footer"
      ref={footerRef}
      className="relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <GlowBackground
        gridOpacity={0.02}
        blobs={[
          { className: "top-0 left-1/4 w-96 h-96 bg-primary", blur: 120, opacity: 0.08 },
          { className: "bottom-0 right-1/3 w-80 h-80 bg-secondary", blur: 100, opacity: 0.08 },
        ]}
      />

      {/* Animated top divider */}
      <m.hr
        className="w-11/12 mx-auto"
        initial={{ width: "0%" }}
        animate={isInView ? { width: "91.666667%" } : { width: "0%" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      <section className="container py-20 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
          {/* Logo section with enhanced animations */}
          <m.div
            className="col-span-full md:col-span-2 xl:col-span-3"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={
              isInView
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 30, scale: 0.9 }
            }
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <m.a
              rel="noreferrer noopener"
              href="/"
              className="font-bold text-xl flex items-center relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <m.div
                className="relative"
                whileHover={{ rotate: 10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Glow effect */}
                <div
                  className="absolute inset-0 rounded-full bg-primary opacity-0 group-hover:opacity-20"
                  style={{ filter: "blur(15px)" }}
                />
              </m.div>

              <span
                className="bg-gradient-to-r from-primary via-secondary to-primary text-transparent bg-clip-text font-black text-4xl sm:text-5xl "
                style={{ backgroundSize: "200% auto" }}
              >
                Python Cameroon
              </span>
            </m.a>

            {/* Description */}
            <m.p
              className="text-muted-foreground mt-4 max-w-md text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={
                isInView ? { opacity: 0.8, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Empowering Python developers across Cameroon through community,
              learning, and innovation.
            </m.p>
          </m.div>

          {/* Footer sections with staggered animations */}
          {footerSections.map((section, sectionIndex) => (
            <m.div
              key={section.title}
              className="flex flex-col gap-2 relative"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.3 + sectionIndex * 0.1, duration: 0.6 }}
              onMouseEnter={() => setHoveredSection(section.title)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              {/* Section title with glow effect */}
              <m.h3
                className="font-bold text-lg relative"
                animate={{
                  color:
                    hoveredSection === section.title
                      ? "hsl(var(--primary))"
                      : "hsl(var(--foreground))",
                }}
                transition={{ duration: 0.3 }}
              >
                {section.title}

                {/* Underline animation */}
                <m.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: "0%" }}
                  animate={{
                    width: hoveredSection === section.title ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Background glow */}
                {hoveredSection === section.title && (
                  <m.div
                    className="absolute -inset-2 rounded-lg bg-primary/10 -z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    style={{ filter: "blur(10px)" }}
                  />
                )}
              </m.h3>

              {/* Links with hover animations */}
              <AnimatePresence>
                {section.links.map((link, linkIndex) => {
                  const IconComponent = link.icon;

                  return (
                    <m.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.4 + sectionIndex * 0.1 + linkIndex * 0.05,
                        duration: 0.4,
                      }}
                    >
                      <m.a
                        rel="noreferrer noopener"
                        href={link.url}
                        target={
                          link.url.startsWith("http") ? "_blank" : undefined
                        }
                        className="opacity-60 hover:opacity-100 flex items-center gap-2 group relative py-1"
                        whileHover={{ x: 5, scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        {IconComponent && (
                          <m.div
                            whileHover={{ rotate: 10, scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <IconComponent
                              size={16}
                              className="text-primary/70 group-hover:text-primary"
                            />
                          </m.div>
                        )}

                        <span className="relative">
                          {link.name}

                          {/* Underline effect */}
                          <m.span
                            className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-primary to-secondary group-hover:w-full"
                            transition={{ duration: 0.3 }}
                          />
                        </span>

                        {/* Hover glow effect */}
                        <m.div
                          className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 rounded-md -z-10"
                          transition={{ duration: 0.3 }}
                        />
                      </m.a>
                    </m.div>
                  );
                })}
              </AnimatePresence>
            </m.div>
          ))}
        </div>

        {/* Bottom section with animated copyright */}
        <m.div
          className="border-t border-slate-500/20 pt-8 mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-muted-foreground relative">
            © {new Date().getFullYear()}{" "}
            <span className="font-bold" style={{ backgroundSize: "200% auto" }}>
              Python Cameroon
            </span>
            . All rights reserved. Built with{" "}
            <span className="inline-block ml-1">
              <Heart className="inline-block w-5 h-5 text-primary dark:text-secondary" />
            </span>{" "}
            for the community.
          </p>
        </m.div>
      </section>

      {/* Bottom animated border */}
      <m.div
        className="absolute bottom-0 left-0 right-0 h-px"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(var(--primary-rgb), 0.5), transparent)",
        }}
      />
    </m.footer>
  );
};
