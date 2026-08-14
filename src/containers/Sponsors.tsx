import { useState, useRef } from "react";
import { m, useInView, AnimatePresence } from "framer-motion";

interface SponsorProps {
  icon: string;
  name: string;
  link: string;
}

const sponsors: SponsorProps[] = [
  {
    icon: "https://avatars.githubusercontent.com/u/142497557?s=200&v=4",
    name: "Django Cameroon",
    link: "https://github.com/djangocameroon",
  },
  {
    icon: "https://avatars.githubusercontent.com/u/183505611?s=200&v=4",
    name: "Angular Cameroon",
    link: "https://github.com/ngcameroon",
  },
];

export const Sponsors = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <m.section
      id="sponsors"
      ref={sectionRef}
      className="container pt-24 sm:py-32 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-10 left-1/4 w-72 h-72 rounded-full bg-primary/10"
          style={{ filter: "blur(80px)" }}
        />

        <div
          className="absolute -bottom-20 right-1/3 w-80 h-80 rounded-full bg-secondary/10"
          style={{ filter: "blur(100px)" }}
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMyMDIwMjAiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMzBjMCAxNi41Ny0xMy40MyAzMC0zMCAzMFMwIDQ2LjU3IDAgMzAgMTMuNDMgMCAzMCAwczMwIDEzLjQzIDMwIDMweiIgc3Ryb2tlPSIjZmZmZmZmMDUiIHN0cm9rZS13aWR0aD0iLjUiLz48cGF0aCBkPSJNMTI5LjUgMTB2MTQwTTEyOSAyOWgtMTI5TTE0My41IDI5aC0xNC41IiBzdHJva2U9IiNmZmZmZmYwNSIgc3Ryb2tlLXdpZHRoPSIuNSIvPjwvZz48L3N2Zz4=')] opacity-[0.03]" />
      </div>

      {/* Section heading */}
      <m.div
        className="relative mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        <h2
          className="text-center text-2xl md:text-3xl font-bold relative inline-block mx-auto w-full"
        >
          <span
            className="bg-gradient-to-r from-primary via-secondary to-primary text-transparent bg-clip-text"
          >
            Partnering Organisations
          </span>

          {/* Glowing effect behind text */}
          <span
            className="absolute -inset-1 rounded-lg blur-xl -z-10"
            style={{
              background: "linear-gradient(to right, rgba(var(--primary-rgb), 0.2), rgba(147, 51, 234, 0.2), rgba(var(--primary-rgb), 0.2))",
              opacity: 0.2,
            }}
          />
        </h2>

        {/* Animated divider */}
        <m.div
          className="h-1 w-0 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-4"
          animate={isInView ? { width: 120 } : { width: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />

        {/* Subtitle */}
        <m.p
          className="text-center text-muted-foreground mt-4 max-w-md mx-auto relative"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 0.8, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Our amazing partners who help make the Python Cameroon community thrive and grow.
        </m.p>
      </m.div>

      {/* Sponsors gallery */}
      <m.div
        className="flex flex-wrap justify-center items-center gap-16 md:gap-24 relative"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        {/* Horizontal connecting line */}
        <m.div
          className="absolute top-1/2 left-0 right-0 h-px -z-10"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          style={{
            background: "linear-gradient(to right, transparent, rgba(var(--primary-rgb), 0.3), transparent)"
          }}
        />

        <AnimatePresence>
          {sponsors.map(({ icon, name, link }: SponsorProps, index) => (
            <m.div
              key={name}
              className="text-center perspective-1000"
              initial={{ opacity: 0, y: 20, rotateX: 10 }}
              animate={isInView ?
                { opacity: 1, y: 0, rotateX: 0 } :
                { opacity: 0, y: 20, rotateX: 10 }
              }
              exit={{ opacity: 0, y: -20 }}
              transition={{
                delay: 0.6 + index * 0.2,
                duration: 0.7,
                type: "spring",
                stiffness: 100
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-4 relative"
              >
                {/* Logo container with effects */}
                <m.div
                  className="relative z-10"
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3, type: "spring", stiffness: 300 }
                  }}
                >
                  {/* Rotating background gradient */}
                  <m.div
                    className="absolute -inset-5 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-full -z-10"
                    animate={{
                      rotate: hoveredIndex === index ? 360 : 0,
                      scale: hoveredIndex === index ? 1 : 0.9,
                      opacity: hoveredIndex === index ? 0.5 : 0,
                    }}
                    transition={{
                      rotate: { duration: 8, ease: "linear" },
                      scale: { duration: 0.3 },
                      opacity: { duration: 0.3 }
                    }}
                    style={{ filter: "blur(10px)" }}
                  />

                  {/* Logo image */}
                  <m.div
                    className="relative rounded-xl overflow-hidden bg-card/80 backdrop-blur-sm p-1 border border-primary/10"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <m.img
                      src={icon}
                      alt={`${name} logo`}
                      className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-lg"
                      animate={{
                        rotate: hoveredIndex === index ? [0, -3, 3, 0] : 0,
                      }}
                      transition={{
                        rotate: { duration: 0.5, ease: "easeInOut" }
                      }}
                    />
                  </m.div>

                  {/* Glow effect on hover */}
                  {hoveredIndex === index && (
                    <m.div
                      className="absolute -inset-2 rounded-xl"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        boxShadow: "0 0 20px rgba(var(--primary-rgb), 0.5)"
                      }}
                      transition={{
                        opacity: { duration: 0.3 }
                      }}
                    />
                  )}

                  {/* Expanding ring effect on hover */}
                  {hoveredIndex === index && (
                    <m.div
                      className="absolute -inset-2 rounded-xl opacity-0 border border-primary/30"
                      animate={{
                        scale: [1, 1.5],
                        opacity: [0.5, 0]
                      }}
                      transition={{
                        duration: 1
                      }}
                    />
                  )}
                </m.div>

                {/* Sponsor name with underline animation */}
                <div className="relative">
                  <m.h3
                    className="text-xl font-semibold"
                    animate={{
                      color: hoveredIndex === index ?
                        "hsl(var(--primary))" :
                        "hsl(var(--foreground))",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {name}
                  </m.h3>

                  {/* Animated underline */}
                  <m.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: "0%" }}
                    animate={{ width: hoveredIndex === index ? "100%" : "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Visit text that appears on hover */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <m.div
                      className="absolute -bottom-8 text-sm text-primary/90 flex items-center gap-1.5"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span>Visit</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </m.div>
                  )}
                </AnimatePresence>
              </a>
            </m.div>
          ))}
        </AnimatePresence>
      </m.div>

      {/* Call to action button */}
      <m.div
        className="flex justify-center mt-20"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <m.a
          href="mailto:organizers@pythoncameroon.org"
          className="px-6 py-2.5 rounded-full text-primary relative overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <m.div
            className="absolute inset-0 -z-10 bg-primary/10 backdrop-blur-sm rounded-full"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(var(--primary-rgb), 0.15)"
            }}
            transition={{ duration: 0.3 }}
          />

          <span className="relative z-10 font-medium">Become a Partner</span>

          {/* Bottom border animation */}
          <m.div
            className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-secondary"
            initial={{ width: "0%" }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />

          {/* Subtle glow effect */}
          <m.div
            className="absolute inset-0 -z-20 opacity-0 rounded-full"
            whileHover={{
              opacity: 0.5,
              boxShadow: "0 0 20px rgba(var(--primary-rgb), 0.3)"
            }}
            transition={{ duration: 0.3 }}
          />
        </m.a>
      </m.div>

      {/* Bottom divider line */}
      <m.div
        className="absolute bottom-0 left-0 right-0 h-px"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
        style={{
          background: "linear-gradient(to right, transparent, rgba(var(--primary-rgb), 0.3), transparent)"
        }}
      />
    </m.section>
  );
};
