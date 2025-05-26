import { useState, useRef, useEffect } from "react";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import image from "../assets/growth.png";
import image3 from "../assets/reflecting.png";
import image4 from "../assets/looking-ahead.png";

interface FeatureProps {
  title: string;
  description: string;
  image: string;
}

const features: FeatureProps[] = [
  {
    title: "Responsive Design",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
    image: image4,
  },
  {
    title: "Intuitive user interface",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
    image: image3,
  },
  {
    title: "AI-Powered insights",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
    image: image,
  },
];

const featureList: string[] = [
  "Dark/Light theme",
  "Reviews",
  "Features",
  "Pricing",
  "Contact form",
  "Our team",
  "Responsive design",
  "Newsletter",
  "Minimalist",
];

// Futuristic badge component with animations
const FuturisticBadge = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ 
        duration: 0.5, 
        delay: 0.1 + index * 0.05,
        type: "spring",
        stiffness: 100 
      }}
      whileHover={{ 
        scale: 1.1, 
        rotate: [-1, 1, -1, 0], 
        transition: { duration: 0.3 } 
      }}
      whileTap={{ scale: 0.95 }}
      className="relative"
    >
      <Badge
        variant="secondary"
        className="text-sm relative overflow-hidden group backdrop-blur-sm"
      >
        <span className="relative z-10">{feature}</span>
        <motion.span 
          className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-purple-500"
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
      </Badge>
      
      {/* Subtle glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary opacity-0"
        whileHover={{ opacity: 0.2, scale: 1.3 }}
        transition={{ duration: 0.3 }}
        style={{ filter: "blur(8px)" }}
      />
    </motion.div>
  );
};

// Enhanced feature card with animations
const FeatureCard = ({ feature, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.2 });
  
  const { title, description, image } = feature;
  
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateY: 5
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        delay: index * 0.2
      }
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      y: -8,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20
      }
    }
  };
  
  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      exit="exit"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative perspective-800"
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute -inset-1 rounded-xl opacity-0 z-0"
        animate={{
          opacity: isHovered ? 0.6 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-purple-500/30 to-primary/30 rounded-xl"
          style={{ filter: "blur(20px)" }}
        />
      </motion.div>
      
      <Card className="relative z-10 overflow-hidden border bg-background/60 backdrop-blur-sm transition-all duration-300">
        <CardHeader className="pb-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ delay: index * 0.2 + 0.2, duration: 0.5 }}
            className="relative"
          >
            <CardTitle className="text-lg sm:text-xl">
              <motion.span
                className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent inline-block"
                style={{ backgroundSize: "200% 100%" }}
                animate={{
                  backgroundPosition: isHovered ? 
                    ["0% center", "100% center"] : 
                    ["0% center"]
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut"
                }}
              >
                {title}
              </motion.span>
            </CardTitle>
            
            {/* Animated underline */}
            <motion.div 
              className="h-0.5 bg-gradient-to-r from-primary/50 via-purple-500/50 to-primary/50 mt-1 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: isHovered ? "100%" : "0%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </CardHeader>

        <CardContent>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
            className="text-muted-foreground"
          >
            {description}
          </motion.p>
        </CardContent>

        <CardFooter className="flex justify-center pb-6">
          <motion.div
            className="relative overflow-hidden rounded-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
            transition={{ 
              delay: index * 0.2 + 0.4, 
              duration: 0.5, 
              type: "spring",
              stiffness: 100 
            }}
            whileHover={{ scale: 1.05 }}
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
          >
            {/* Image glow effect */}
            <motion.div
              className="absolute -inset-1 rounded-xl z-0"
              animate={{
                boxShadow: isHovered ? 
                  "0 0 30px rgba(var(--primary-rgb), 0.4)" : 
                  "0 0 0px rgba(var(--primary-rgb), 0)",
              }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Image with floating animation */}
            <motion.img
              src={image}
              alt={`${title} illustration`}
              className="w-[200px] lg:w-[300px] mx-auto rounded-xl relative z-10"
              animate={{
                y: isHovered ? [-5, 5, -5] : 0,
              }}
              transition={{
                y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
              }}
            />
            
            {/* Decorative circles */}
            {isHovered && (
              <>
                <motion.div
                  className="absolute w-20 h-20 rounded-full border border-dashed border-primary/30 z-0"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 0.7, scale: 1, rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  style={{ 
                    left: '10%', 
                    top: '10%', 
                  }}
                />
                <motion.div
                  className="absolute w-12 h-12 rounded-full border border-dashed border-primary/20 z-0"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 0.5, scale: 1, rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  style={{ 
                    right: '15%', 
                    bottom: '10%',
                  }}
                />
              </>
            )}
            
            {/* Floating particles */}
            {isHovered && (
              <motion.div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-2 w-2 rounded-full bg-primary"
                    initial={{ 
                      opacity: 0,
                      x: "50%",
                      y: "50%", 
                    }}
                    animate={{ 
                      x: `${Math.random() * 100}%`, 
                      y: `${Math.random() * 100}%`, 
                      opacity: [0, 0.8, 0], 
                      scale: [0, 1, 0] 
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      repeatDelay: Math.random() 
                    }}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export const Features = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };
  
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }
    }
  };
  
  return (
    <motion.section
      id="features"
      className="container py-24 sm:py-32 space-y-8 relative"
      ref={sectionRef}
      variants={sectionVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, 30, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "blur(80px)" }}
        />
        <motion.div 
          className="absolute bottom-40 -left-20 w-80 h-80 rounded-full bg-purple-500/10"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
            x: [0, -20, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ filter: "blur(100px)" }}
        />
        
        {/* Geometric grid background */}
        <div className="absolute inset-0 grid grid-cols-6 opacity-[0.02]">
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={`v-line-${i}`}
              className="h-full w-px bg-primary"
              initial={{ height: 0 }}
              animate={isInView ? { height: "100%" } : { height: 0 }}
              transition={{ duration: 1.5, delay: i * 0.1 }}
            />
          ))}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`h-line-${i}`}
              className="h-px w-full bg-primary"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 1.5, delay: i * 0.1 }}
              style={{ top: `${(i+1) * 20}%`, position: "absolute" }}
            />
          ))}
        </div>
      </div>
      
      {/* Section title with advanced animation */}
      <motion.div 
        variants={titleVariants}
        className="relative"
      >
        <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
          Many{" "}
          <motion.span 
            className="bg-gradient-to-r from-primary via-purple-500 to-primary text-transparent bg-clip-text relative inline-block"
            style={{ backgroundSize: "200% 100%" }}
            animate={{
              backgroundPosition: ["0% center", "100% center", "0% center"]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut" 
            }}
          >
            Great Features
            <motion.span
              className="absolute inset-0 rounded-lg opacity-20"
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                scale: [0.95, 1.05, 0.95] 
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              style={{ 
                background: "linear-gradient(to right, rgba(var(--primary-rgb), 0.2), rgba(147, 51, 234, 0.2), rgba(var(--primary-rgb), 0.2))",
                filter: "blur(8px)" 
              }}
            />
          </motion.span>
        </h2>
        
        {/* Decorative underline */}
        <motion.div 
          className="h-1 w-24 bg-gradient-to-r from-primary to-purple-500 rounded-full mx-auto mt-4"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "80px", opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        />
      </motion.div>

      {/* Feature badges */}
      <motion.div 
        className="flex flex-wrap md:justify-center gap-4"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <AnimatePresence>
          {featureList.map((feature: string, index: number) => (
            <FuturisticBadge key={feature} feature={feature} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Feature cards grid */}
      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence>
          {features.map((feature: FeatureProps, index: number) => (
            <FeatureCard 
              key={feature.title} 
              feature={feature} 
              index={index} 
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
};
