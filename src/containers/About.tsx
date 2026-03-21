import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Statistics } from "@/components/Statistics";
import pilot from "@/assets/pilot.png";

export const About = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const imageInView = useInView(imageRef, { once: false, amount: 0.4 });
  const contentInView = useInView(contentRef, { once: false, amount: 0.3 });

  return (
    <motion.section
      id="about"
      ref={sectionRef}
      className="container py-24 sm:py-32 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute top-10 left-1/4 w-72 h-72 rounded-full bg-primary"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, 30, 0],
            y: [0, -40, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "blur(100px)" }}
        />
        
        <motion.div 
          className="absolute -bottom-20 right-1/3 w-80 h-80 rounded-full bg-secondary"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
            x: [0, -25, 0],
            y: [0, 25, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          style={{ filter: "blur(120px)" }}
        />

        {/* Floating particles */}
        <AnimatePresence>
          {isInView && (
            <>
              {Array.from({ length: 8 }).map((_, i) => (
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
                    opacity: [0, 0.6, 0],
                    x: `${Math.random() * 100}%`,
                    y: `${Math.random() * 100}%`,
                    scale: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 6 + Math.random() * 4,
                    repeat: Infinity,
                    delay: i * 0.8,
                    ease: "easeInOut"
                  }}
                  style={{ 
                    width: `${Math.random() * 6 + 3}px`,
                    height: `${Math.random() * 6 + 3}px`,
                    filter: "blur(1px)"
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </div>

      <motion.div 
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
            <motion.div
              className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatDelay: 5,
                ease: "easeInOut"
              }}
            />

        {/* Animated border glow */}
        <motion.div 
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

        {/* Moving gradient overlay */}
        <motion.div 
          className="absolute inset-0 rounded-lg opacity-10"
          animate={{
            background: [
              "linear-gradient(45deg, transparent, rgba(var(--primary-rgb), 0.1), transparent)",
              "linear-gradient(225deg, transparent, rgba(var(--primary-rgb), 0.1), transparent)",
              "linear-gradient(45deg, transparent, rgba(var(--primary-rgb), 0.1), transparent)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12 relative z-10">
          {/* Enhanced image with 3D effects */}
          <motion.div
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
            <motion.div 
              className="absolute -inset-4 rounded-xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 -z-10"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.05, 1],
                rotate: [0, 1, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ filter: "blur(20px)" }}
            />

            <motion.div
              className="absolute -inset-2 rounded-xl border border-primary/30 -z-10"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            <motion.img
              src={pilot}
              alt="Python Illustration"
              className="w-[400px] md:w-[450px] lg:w-[500px] object-contain rounded-lg relative z-10"
              animate={{
                y: [0, -10, 0],
                filter: ["brightness(1)", "brightness(1.1)", "brightness(1)"]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          
          {/* Enhanced content section */}
          <motion.div 
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
            <motion.div 
              className="pb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {/* Enhanced heading with staggered animation */}
              <motion.h2 
                className="text-5xl sm:text-6xl md:text-7xl font-bold relative"
                initial={{ opacity: 0 }}
                animate={contentInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <motion.span 
                  className="relative inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                  style={{
                    backgroundSize: "200% auto"
                  }}
                >
                  About{" "}
                </motion.span>
              </motion.h2>
            </motion.div>

            {/* Add content, stats, or text here */}
            <Statistics />
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};
