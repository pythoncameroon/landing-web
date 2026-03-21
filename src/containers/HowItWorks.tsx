import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "@/components/Icons";
import { motion, useInView, AnimatePresence } from "framer-motion";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: "Accessibility",
    description:
      "Python's simple syntax and extensive libraries make it accessible for developers at all levels.",
  },
  {
    icon: <MapIcon />,
    title: "Community",
    description:
      "Join a vast Python community with active support, open-source contributions, and global collaboration.",
  },
  {
    icon: <PlaneIcon />,
    title: "Scalability",
    description:
      "Python is highly scalable, used in web applications, AI, automation, and enterprise solutions.",
  },
  {
    icon: <GiftIcon />,
    title: "Gamification",
    description:
      "Enhance learning with Python-based gamification, interactive coding challenges, and AI-driven engagement.",
  },
];

interface AnimatedFeatureCardProps extends FeatureProps {
  index: number;
}

const AnimatedFeatureCard = ({ icon, title, description, index }: AnimatedFeatureCardProps) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.2 });
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateY: 15 }}
      animate={isInView ? 
        { opacity: 1, y: 0, rotateY: 0 } : 
        { opacity: 0, y: 50, rotateY: 15 }
      }
      exit={{ opacity: 0, y: -50, rotateY: -15 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.1,
      }}
      whileHover={{ 
        scale: 1.05, 
        y: -10,
        transition: { duration: 0.2 }
      }}
      className="relative perspective-1000"
    >
      <motion.div 
        className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary via-secondary to-primary opacity-20 blur-sm -z-10"
        animate={{
          backgroundPosition: ['0% center', '100% center', '0% center'],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{ backgroundSize: "200% 100%" }}
      />
      
      <Card className="bg-muted/50 backdrop-blur-sm border-transparent h-full transition-all duration-300 overflow-hidden">
        <CardHeader>
          <CardTitle className="grid gap-4 place-items-center relative">
            <motion.div
              whileHover={{ 
                rotate: [0, -10, 10, -10, 0],
                scale: 1.2,
                transition: { duration: 0.5 } 
              }}
              className="relative"
            >
              <motion.div 
                className="absolute inset-0 rounded-full bg-primary"
                animate={{ 
                  opacity: [0.2, 0.5, 0.2],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  delay: index * 0.5 
                }}
                style={{ filter: "blur(15px)" }}
              />
              <motion.div 
                className="relative z-10"
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: index * 0.5 
                }}
              >
                {icon}
              </motion.div>
            </motion.div>
            
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
              className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent"
              style={{ backgroundSize: "200% auto" }}
              whileHover={{
                backgroundPosition: ['0% center', '100% center'],
                transition: { duration: 1 }
              }}
            >
              {title}
            </motion.span>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
            className="text-xs"
          >
            {description}
          </motion.p>
        </CardContent>
        
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: "left" }}
        />
      </Card>
      
      <motion.div
        className="absolute -z-10 inset-0 opacity-0 rounded-xl"
        whileHover={{ opacity: 0.2 }}
        transition={{ duration: 0.3 }}
        style={{ filter: "blur(20px)", background: "radial-gradient(circle, rgba(var(--primary-rgb), 0.8) 0%, transparent 70%)" }}
      />
    </motion.div>
  );
};

export const HowItWorks = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  
  return (
    <motion.section
      id="howItWorks"
      className="container text-center py-24 sm:py-32 relative overflow-hidden"
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/10"
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
          className="absolute bottom-40 -left-20 w-80 h-80 rounded-full bg-secondary/10"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
            x: [0, -20, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ filter: "blur(100px)" }}
        />
        
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-[0.03]">
          {Array.from({ length: 7 }).map((_, i) => (
            <motion.div
              key={`v-line-${i}`}
              className="h-full w-px bg-primary"
              initial={{ height: 0 }}
              animate={isInView ? { height: "100%" } : { height: 0 }}
              transition={{ duration: 1.5, delay: i * 0.1 }}
            />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
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
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="relative"
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-bold"
          animate={{ filter: ["blur(0px)", "blur(0.5px)", "blur(0px)"] }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
        >
          How It{" "}
          <motion.span 
            className="relative inline-block"
          >
            <motion.span
              className="bg-gradient-to-r from-primary via-secondary to-primary text-transparent bg-clip-text"
              animate={{ 
                backgroundPosition: ["0% center", "100% center", "0% center"],
              }}
              transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
              style={{ backgroundSize: "200% auto" }}
            >
              Works
            </motion.span>
            <motion.span 
              className="absolute -inset-1 rounded-lg blur-xl z-[-1]"
              animate={{ 
                opacity: [0.1, 0.3, 0.1], 
                background: [
                  "radial-gradient(circle, rgba(var(--primary-rgb), 0.6) 0%, transparent 60%)",
                  "radial-gradient(circle, rgba(var(--primary-rgb), 0.8) 0%, transparent 70%)",
                  "radial-gradient(circle, rgba(var(--primary-rgb), 0.6) 0%, transparent 60%)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
            />
          </motion.span>{" "}
          Step-by-Step Guide
        </motion.h2>
        
        <motion.div
          className="h-1 w-20 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: 80 } : { width: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        />
      </motion.div>
      
      <motion.p
        className="md:w-3/4 mx-auto mt-4 mb-20 text-lg text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Explore the power of Python through accessibility, community, scalability, and gamification.
      </motion.p>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <AnimatePresence>
          {features.map(({ icon, title, description }: FeatureProps, index) => (
            <AnimatedFeatureCard
              key={title}
              icon={icon}
              title={title}
              description={description}
              index={index}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
};
