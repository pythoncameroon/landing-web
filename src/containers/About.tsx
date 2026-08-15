import { useState, useRef } from "react";
import { m, useInView } from "framer-motion";
import { Statistics } from "@/components/Statistics";
import { GlowBackground } from "@/components/section/GlowBackground";
import pilot from "@/assets/pilot.png";

export const About = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const imageInView = useInView(imageRef, { once: true, amount: 0.4 });
  const contentInView = useInView(contentRef, { once: true, amount: 0.3 });

  return (
    <m.section
      id="about"
      ref={sectionRef}
      className="container py-24 sm:py-32 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <GlowBackground
        blobs={[
          { className: "top-10 left-1/4 w-72 h-72 bg-primary", blur: 100, opacity: 0.1 },
          { className: "-bottom-20 right-1/3 w-80 h-80 bg-secondary", blur: 120, opacity: 0.1 },
        ]}
      />

      <m.div
        className="rounded-lg py-12 relative overflow-hidden backdrop-blur-sm  perspective-1000"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          type: "spring",
          stiffness: 100
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated border glow */}
        <m.div
          className="absolute inset-0 rounded-lg"
          animate={{
            boxShadow: isHovered ? [
              "0 0 0 rgba(var(--primary-rgb), 0)",
              "0 0 30px rgba(var(--primary-rgb), 0.3)",
              "0 0 0 rgba(var(--primary-rgb), 0)"
            ] : "0 0 0 rgba(var(--primary-rgb), 0)"
          }}
          transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 rounded-lg opacity-10"
          style={{
            background:
              "linear-gradient(45deg, transparent, rgba(var(--primary-rgb), 0.1), transparent)"
          }}
        />

        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12 relative z-10">
          {/* Enhanced image with 3D effects */}
          <m.div
            ref={imageRef}
            className="relative perspective-1000"
            initial={{ opacity: 0, x: -60, rotateY: 15 }}
            animate={imageInView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: -60, rotateY: 15 }}
            transition={{
              duration: 1,
              delay: 0.4,
              type: "spring",
              stiffness: 80
            }}
            whileHover={{
              scale: 1.05,
              rotateY: -5,
              z: 50
            }}
          >
            <div
              className="absolute -inset-4 rounded-xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 -z-10"
              style={{ filter: "blur(20px)", opacity: 0.45 }}
            />

            <div
              className="absolute -inset-2 rounded-xl border border-primary/30 -z-10"
            />

            <img
              src={pilot}
              alt="Python Illustration"
              className="w-[400px] md:w-[450px] lg:w-[500px] object-contain rounded-lg relative z-10"
            />
          </m.div>

          {/* Enhanced content section */}
          <m.div
            ref={contentRef}
            className="bg-green-0 flex flex-col justify-between relative"
            initial={{ opacity: 0, x: 60 }}
            animate={contentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{
              duration: 1,
              delay: 0.6,
              type: "spring",
              stiffness: 80
            }}
          >
            <m.div
              className="pb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {/* Enhanced heading with staggered animation */}
              <m.h2
                className="text-5xl sm:text-6xl md:text-7xl font-bold relative"
                initial={{ opacity: 0 }}
                animate={contentInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <m.span
                  className="relative inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                  style={{
                    backgroundSize: "200% auto"
                  }}
                >
                  About{" "}
                </m.span>
              </m.h2>
            </m.div>

            {/* Add content, stats, or text here */}
            <Statistics />
          </m.div>
        </div>
      </m.div>
    </m.section>
  );
};
