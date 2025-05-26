import { useState, useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export const Statistics = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const controls = useAnimation();

  interface statsProps {
    quantity: string;
    description: string;
    targetNumber: number;
    suffix: string;
  }

  const stats: statsProps[] = [
    {
      quantity: "5K+",
      description: "Python Developers",
      targetNumber: 5000,
      suffix: "K+"
    },
    {
      quantity: "3.2K+",
      description: "AI Models Deployed",
      targetNumber: 3200,
      suffix: "K+"
    },
    {
      quantity: "250+",
      description: "Automation Scripts",
      targetNumber: 250,
      suffix: "+"
    },
    {
      quantity: "10+",
      description: "Python-Based Products",
      targetNumber: 10,
      suffix: "+"
    },
  ];

  // Counter component for individual stats
  const AnimatedCounter = ({ targetNumber, suffix, delay = 0 }: { targetNumber: number, suffix: string, delay?: number }) => {
    const [count, setCount] = useState(0);
    const counterRef = useRef(null);
    const counterInView = useInView(counterRef, { once: true, amount: 0.5 });

    useEffect(() => {
      if (counterInView) {
        let startTime: number;
        const duration = 2000; // 2 seconds
        
        const animateCount = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          
          // Easing function for smooth animation
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const currentCount = Math.floor(easeOutQuart * targetNumber);
          
          setCount(currentCount);
          
          if (progress < 1) {
            requestAnimationFrame(animateCount);
          } else {
            setCount(targetNumber);
          }
        };
        
        setTimeout(() => {
          requestAnimationFrame(animateCount);
        }, delay);
      }
    }, [counterInView, targetNumber, delay]);

    const formatNumber = (num: number, suffix: string) => {
      if (suffix === "K+") {
        if (num >= 1000) {
          return (num / 1000).toFixed(1) + "K+";
        }
        return num + "";
      }
      return num + suffix;
    };

    return (
      <motion.h2 
        ref={counterRef}
        className="text-3xl sm:text-4xl font-bold relative"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={counterInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ 
          duration: 0.6, 
          delay: delay / 1000,
          type: "spring",
          stiffness: 200,
          damping: 20
        }}
      >
        <motion.span
          className="bg-gradient-to-r from-primary via-purple-500 to-primary text-transparent bg-clip-text"
          animate={{
            backgroundPosition: ["0% center", "100% center", "0% center"],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ backgroundSize: "200% auto" }}
        >
          {formatNumber(count, suffix)}
        </motion.span>
        
        {/* Glowing effect behind numbers */}
        <motion.span 
          className="absolute -inset-1 rounded-lg blur-md -z-10"
          animate={{ 
            opacity: counterInView ? [0.1, 0.3, 0.1] : 0,
            background: [
              "radial-gradient(circle, rgba(var(--primary-rgb), 0.3) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(var(--primary-rgb), 0.5) 0%, transparent 80%)",
              "radial-gradient(circle, rgba(var(--primary-rgb), 0.3) 0%, transparent 70%)"
            ]
          }}
          transition={{ 
            opacity: { duration: 0.6, delay: delay / 1000 },
            background: { duration: 2, repeat: Infinity, repeatType: "mirror" }
          }}
        />
      </motion.h2>
    );
  };

  return (
    <motion.section 
      id="statistics"
      ref={sectionRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      {/* Background glow effects */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full bg-primary/10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "blur(40px)" }}
        />
        
        <motion.div 
          className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full bg-purple-500/10"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ filter: "blur(30px)" }}
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        {stats.map(({ quantity, description, targetNumber, suffix }: statsProps, index) => (
          <motion.div
            key={description}
            className="space-y-2 text-center relative group"
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.8 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ 
              scale: 1.05,
              y: -5
            }}
          >
            {/* Card background with hover effect */}
            <motion.div 
              className="absolute -inset-4 rounded-xl bg-muted/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 -z-10"
              transition={{ duration: 0.3 }}
            />
            
            {/* Animated border on hover */}
            <motion.div 
              className="absolute -inset-4 rounded-xl border border-primary/20 opacity-0 group-hover:opacity-100 -z-10"
              animate={{
                borderColor: [
                  "rgba(var(--primary-rgb), 0.2)",
                  "rgba(var(--primary-rgb), 0.4)",
                  "rgba(var(--primary-rgb), 0.2)"
                ]
              }}
              transition={{ 
                borderColor: { duration: 2, repeat: Infinity },
                opacity: { duration: 0.3 }
              }}
            />

            <AnimatedCounter 
              targetNumber={targetNumber} 
              suffix={suffix}
              delay={index * 200}
            />
            
            <motion.p 
              className="text-xl text-muted-foreground relative"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
              whileHover={{ 
                color: "hsl(var(--primary))",
                y: -2
              }}
            >
              {description}
              
              {/* Subtle underline animation on hover */}
              <motion.span
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/50 to-purple-500/50"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};