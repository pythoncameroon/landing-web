import { useState, useEffect, useRef } from "react";
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { cameroonFlag } from "@/assets";
import HeroNetwork from "@/components/HeroNetwork";

// Define interfaces for component props
interface AnimatedCharacterProps {
  character: string;
  delay?: number;
}

interface SplitTextAnimationProps {
  text: string;
  className?: string;
  delay?: number;
}

interface EnhancedImageProps {
  src: string;
  alt: string;
}

// Animated character component for text effects
const AnimatedCharacter = ({
  character,
  delay = 0,
}: AnimatedCharacterProps) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="inline-block"
    >
      {character}
    </motion.span>
  );
};

// Split text into animated characters
const SplitTextAnimation = ({
  text,
  className = "",
  delay = 0,
}: SplitTextAnimationProps) => {
  return (
    <span className={className}>
      {text.split("").map((char: string, index: number) => (
        <AnimatedCharacter
          key={index}
          character={char}
          delay={delay + index * 0.03}
        />
      ))}
    </span>
  );
};

// Futuristic bubble background effect
const BubbleBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/5"
          initial={{
            x: Math.random() * 100 - 50 + "%",
            y: Math.random() * 100 - 50 + "%",
            scale: Math.random() * 0.5 + 0.5,
            opacity: 0,
          }}
          animate={{
            x: [
              Math.random() * 100 - 50 + "%",
              Math.random() * 100 - 50 + "%",
              Math.random() * 100 - 50 + "%",
            ],
            y: [
              Math.random() * 100 - 50 + "%",
              Math.random() * 100 - 50 + "%",
              Math.random() * 100 - 50 + "%",
            ],
            scale: [
              Math.random() * 0.5 + 0.5,
              Math.random() * 1.5 + 1,
              Math.random() * 0.5 + 0.5,
            ],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
          style={{
            width: `${Math.random() * 300 + 50}px`,
            height: `${Math.random() * 300 + 50}px`,
            filter: "blur(50px)",
          }}
        />
      ))}
    </div>
  );
};

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
    <motion.div
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
      <motion.div
        className="relative z-20 rounded-2xl overflow-hidden"
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <motion.img
          src={src}
          alt={alt}
          className="w-full object-cover"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent opacity-50"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx}% ${gy}%, rgba(var(--primary-rgb), 0.4), transparent 60%)`
            ),
          }}
        />
      </motion.div>
    </motion.div>
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

  // Text animation sequence
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const wordVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
      },
    },
  };

  return (
    <motion.section
      className="container relative grid lg:grid-cols-2 place-items-center py-24 md:py-16 gap-10 hero-section overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : { opacity: 0.7 }}
    >
      <BubbleBackground />

      {/* Floating grid lines effect */}
      <div className="absolute inset-0 -z-5 opacity-5">
        <div className="h-full w-full grid grid-cols-6 gap-10">
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={`v-line-${i}`}
              className="h-full w-px bg-primary/50"
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 2, delay: i * 0.1 }}
            />
          ))}
          {[...Array(5)].map((_, i) => (
            <motion.div
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
      <motion.div
        className="text-center lg:text-start space-y-6 z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
      >
        <motion.section
          className="text-5xl md:text-6xl font-extrabold leading-tight"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="overflow-hidden py-1">
            <motion.span
              className="inline-block bg-gradient-to-r from-secondary to-[#FFE873] text-transparent bg-clip-text relative"
              variants={wordVariants}
            >
              <SplitTextAnimation text="Python" className="" delay={0.4} />
              <motion.span
                className="absolute -inset-1 rounded-lg opacity-30 bg-[#FFD43B]/10"
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.span>{" "}
            <motion.span className="inline-block" variants={wordVariants}>
              is
            </motion.span>
          </h1>{" "}
          <h2 className="overflow-hidden py-1">
            <motion.span
              className="inline-block bg-gradient-to-r from-primary via-primary to-[#4B8BBE] text-transparent bg-clip-text relative"
              variants={wordVariants}
              animate={{
                backgroundPosition: ["0% center", "100% center", "0% center"],
              }}
              transition={{
                duration: 8,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              style={{ backgroundSize: "200% 100%" }}
            >
              <SplitTextAnimation text="Fun!" className="" delay={0.8} />
              <motion.span
                className="absolute -inset-1 rounded-lg opacity-30 bg-[#306998]/10"
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
              />
            </motion.span>
          </h2>
        </motion.section>

        <motion.p
          className="text-sm text-muted-foreground md:w-10/12 mx-auto lg:mx-0 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.2,
            ease: "easeOut",
          }}
        >
          <motion.span
            className="block"
            animate={{
              filter: ["blur(0px)", "blur(1px)", "blur(0px)"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            Unleash your creativity with Python. Whether it's building web apps,
            automating tasks, or exploring AI – Python makes it all possible!
          </motion.span>

          {/* Animated underline */}
          <motion.div
            className="h-0.5 bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50 mt-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}
          />
        </motion.p>

        {/* Floating action buttons */}
        <motion.div
          className="flex flex-wrap gap-4 justify-center lg:justify-start mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <motion.a
            href="#About"
            className="px-6 py-3 bg-primary dark:bg-secondary text-white dark:text-black rounded-lg font-medium relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Explore Python</span>
            <motion.span
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            />
          </motion.a>

          <motion.a
            href="#newsletter"
            className="group px-6 py-3 border border-secondary bg-transparent hover:bg-secondary rounded-lg font-medium relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="relative z-10 bg-gradient-to-r from-primary to-secondary group-hover:to-primary text-transparent bg-clip-text"
              transition={{ duration: 0.3 }}
            >
              Newsletter
            </motion.span>
            <motion.div
              className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-primary to-transparent"
              animate={{
                x: ["-100%", "100%"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Cameroon Map Display with enhanced effects */}
      <div className="relative perspective-1000 w-full flex justify-center">
        <AnimatePresence>
          <HeroNetwork />
          <EnhancedImage src={cameroonFlag} alt="Cameroon Map" />
        </AnimatePresence>
      </div>
    </motion.section>
  );
};
