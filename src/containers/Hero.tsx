import { useState, useEffect, useRef } from "react";
import { m, useAnimation, useMotionValue, useTransform } from "framer-motion";
import { cameroonFlag } from "@/assets";
import HeroNetwork from "@/components/HeroNetwork";

interface EnhancedImageProps {
  src: string;
  alt: string;
}

// Enhanced image component with effects
const EnhancedImage = ({ src, alt }: EnhancedImageProps) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);
  const glowX = useTransform(mouseX, [-300, 300], [0, 100], { clamp: false });
  const glowY = useTransform(mouseY, [-300, 300], [0, 100], { clamp: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <m.div
      ref={imageRef}
      className="relative perspective-1000 w-full max-w-md"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 100, rotateY: -15 }}
      animate={{
        opacity: 1,
        y: 0,
        rotateY: 0,
        transition: { duration: 0.8, ease: "easeOut", delay: 0.6 },
      }}
      whileHover={{ scale: 1.02 }}
    >
      <m.div
        className="relative z-20 rounded-2xl overflow-hidden"
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <m.img
          src={src}
          alt={alt}
          className="w-full object-cover"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />
        <m.div
          className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent opacity-50"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx}% ${gy}%, rgba(var(--primary-rgb), 0.4), transparent 60%)`
            ),
          }}
        />
      </m.div>
    </m.div>
  );
};

export const Hero = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const controls = useAnimation();

  useEffect(() => {
    // Initialize animations
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    });

    // Intersection observer for exit animations
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    const section = document.querySelector(".hero-section");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, [controls]);

  return (
    <m.section
      className="container relative grid lg:grid-cols-2 place-items-center py-24 md:py-16 gap-10 hero-section overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : { opacity: 0.7 }}
    >
      {/* Floating grid lines effect */}
      <div className="absolute inset-0 -z-5 opacity-5">
        <div className="h-full w-full grid grid-cols-6 gap-10">
          {[...Array(7)].map((_, i) => (
            <m.div
              key={`v-line-${i}`}
              className="h-full w-px bg-primary/50"
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 2, delay: i * 0.1 }}
            />
          ))}
          {[...Array(5)].map((_, i) => (
            <m.div
              key={`h-line-${i}`}
              className="h-px w-full bg-primary/50"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, delay: i * 0.1 }}
              style={{ top: `${(i + 1) * 20}%`, position: "absolute" }}
            />
          ))}
        </div>
      </div>

      {/* Text content with animations */}
      <m.div
        className="text-center lg:text-start space-y-6 z-10"
        initial={{ opacity: 0 }}
        animate={controls}
      >
        <div className="text-5xl md:text-6xl font-extrabold leading-tight">
          {/* Un seul h1 pour la page — deux lignes en span.block (AUDIT.md A5).
              Entrée par révélation de ligne : chaque ligne glisse depuis le bas
              derrière un masque overflow-hidden, sans effet lettre par lettre. */}
          <h1 className="py-1">
            <span className="block overflow-hidden">
              <m.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              >
                <span className="inline-block bg-gradient-to-r from-secondary to-[#B8860B] dark:to-[#FFE873] text-transparent bg-clip-text relative">
                  Python
                  <span className="absolute -inset-1 rounded-lg opacity-30 bg-[#FFD43B]/10" />
                </span>{" "}
                is
              </m.span>
            </span>
            <span className="block overflow-hidden">
              <m.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
              >
                <span className="inline-block bg-gradient-to-r from-primary via-primary to-[#4B8BBE] text-transparent bg-clip-text relative">
                  Fun!
                  <span className="absolute -inset-1 rounded-lg opacity-30 bg-[#306998]/10" />
                </span>
              </m.span>
            </span>
          </h1>
        </div>

        <m.p
          className="text-sm text-muted-foreground md:w-10/12 mx-auto lg:mx-0 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.2,
            ease: "easeOut",
          }}
        >
          <span className="block">
            Unleash your creativity with Python. Whether it's building web apps,
            automating tasks, or exploring AI – Python makes it all possible!
          </span>

          {/* Animated underline — span display:block : un <div> est invalide dans un <p> */}
          <m.span
            className="block h-0.5 bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50 mt-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}
          />
        </m.p>

        {/* Floating action buttons */}
        <m.div
          className="flex flex-wrap gap-4 justify-center lg:justify-start mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <m.a
            href="https://www.python.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-primary dark:bg-secondary text-white dark:text-black rounded-lg font-medium relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Explore Python</span>
            <m.span
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            />
          </m.a>

          <m.a
            href="mailto:organizers@pythoncameroon.org"
            className="group px-6 py-3 border border-secondary bg-transparent hover:bg-secondary rounded-lg font-medium relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <m.span
              className="relative z-10 bg-gradient-to-r from-primary to-secondary group-hover:to-primary text-transparent bg-clip-text"
              transition={{ duration: 0.3 }}
            >
              Contact Us
            </m.span>
            <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
          </m.a>
        </m.div>
      </m.div>

      {/* Cameroon Map Display with enhanced effects */}
      <div className="relative perspective-1000 w-full flex justify-center">
        <HeroNetwork />
        <EnhancedImage src={cameroonFlag} alt="Cameroon Map" />
      </div>
    </m.section>
  );
};
