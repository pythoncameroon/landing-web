import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, useInView, AnimatePresence } from "framer-motion";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log("Subscribed with:", email);
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail("");
      
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <motion.section 
      id="newsletter"
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative overflow-hidden"
    >
      <motion.hr 
        className="w-11/12 mx-auto"
        initial={{ width: "0%" }}
        animate={isInView ? { width: "91.666667%" } : { width: "0%" }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />

      <div className="container py-24 sm:py-32 relative">
        <div className="absolute inset-0 -z-10">
          <motion.div 
            className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-primary/10"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              x: [0, -30, 0],
              y: [0, 30, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            style={{ filter: "blur(80px)" }}
          />
          
          <motion.div 
            className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-secondary"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.15, 0.1],
              x: [0, 20, 0],
              y: [0, -20, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            style={{ filter: "blur(100px)" }}
          />
          
          <AnimatePresence>
            {isInView && (
              <>
                {Array.from({ length: 6 }).map((_, i) => (
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
                      opacity: [0, 0.5, 0],
                      x: `${Math.random() * 100}%`,
                      y: `${Math.random() * 100}%`,
                      scale: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 4 + Math.random() * 4,
                      repeat: Infinity,
                      delay: i * 0.8,
                      ease: "easeInOut"
                    }}
                    style={{ 
                      width: `${Math.random() * 8 + 4}px`,
                      height: `${Math.random() * 8 + 4}px`,
                      filter: "blur(1px)"
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <motion.h3 
            className="text-center text-4xl md:text-5xl font-bold"
            animate={{ filter: ["blur(0px)", "blur(0.5px)", "blur(0px)"] }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
          >
            Join Our Daily{" "}
            <motion.span 
              className="relative inline-block"
            >
              <motion.span
                className="bg-gradient-to-r from-primary via-secondary to-primary text-transparent bg-clip-text"
                animate={{ 
                  backgroundPosition: ["0% center", "100% center", "0% center"],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{ backgroundSize: "200% auto" }}
              >
                Newsletter
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
            </motion.span>
          </motion.h3>
          
          <motion.div 
            className="h-1 w-0 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full"
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </motion.div>

        <motion.p 
          className="text-lg text-muted-foreground text-center mt-6 mb-12 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Stay updated with Python Cameroon Community.
          <motion.span
            className="absolute bottom-0 left-0 h-0.5 w-full"
            initial={{ scaleX: 0 }}
            animate={isInView ? { 
              scaleX: [0, 1, 1, 0],
              background: [
                "linear-gradient(to right, transparent, rgba(var(--primary-rgb), 0.5), transparent)",
                "linear-gradient(to right, transparent, rgba(var(--primary-rgb), 0.5), transparent)",
              ]
            } : { scaleX: 0 }}
            transition={{ 
              duration: 2,
              times: [0, 0.4, 0.6, 1],
              delay: 0.8, 
              repeat: Infinity,
              repeatDelay: 3
            }}
          />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.5,
            type: "spring",
            stiffness: 100
          }}
          className="perspective-1000 relative"
        >
          <motion.div
            className="absolute -inset-4 rounded-xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 -z-10"
            animate={{
              backgroundPosition: ['0% center', '100% center', '0% center'],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "mirror",
            }}
            style={{ 
              backgroundSize: "200% 100%",
              filter: "blur(20px)" 
            }}
          />
          
          <form
            className="flex flex-col w-full md:flex-row md:w-6/12 lg:w-4/12 mx-auto gap-4 md:gap-2 relative z-10"
            onSubmit={handleSubmit}
          >
            <div className="relative flex-grow">
              <motion.div 
                className="absolute inset-0 rounded-md -z-10"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0.1, 0.2, 0.1],
                  boxShadow: [
                    "0 0 0 rgba(var(--primary-rgb), 0)",
                    "0 0 20px rgba(var(--primary-rgb), 0.3)",
                    "0 0 0 rgba(var(--primary-rgb), 0)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              <Input
                placeholder="pythoncameroon@gmail.com"
                className="bg-muted/50 dark:bg-muted/80 backdrop-blur-sm h-12 pl-4 pr-4 border-primary/20 focus-visible:ring-primary dark:border-secondary/20 dark:focus-visible:ring-secondary"
                aria-label="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
              <AnimatePresence>
                {email && (
                  <motion.div
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden flex justify-center"
            >
              <Button 
                className="relative h-12 min-w-[120px] overflow-hidden hover:text-primary dark:hover:text-secondary dark:bg-secondary dark:hover:bg-transparent" 
                disabled={isSubmitting || isSuccess}
              >
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="18" 
                        height="18" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      Subscribed
                    </motion.div>
                  ) : isSubmitting ? (
                    <motion.div
                      key="submitting"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <motion.div
                        className="h-4 w-4 rounded-full border-2 border-current border-r-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Processing
                    </motion.div>
                  ) : (
                    <motion.div
                      key="subscribe"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Subscribe
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-primary/80 via-secondary/80 to-primary/80 -z-10"
                  animate={{
                    backgroundPosition: ['0% center', '100% center', '0% center'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                  style={{ backgroundSize: "200% 100%" }}
                />
              </Button>
            </motion.div>
          </form>
        </motion.div>
        
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center mt-4 text-primary"
            >
              Thanks for subscribing! Check your email for updates.
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mt-12 opacity-70"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {["Updates", "Events", "Tutorials", "Community"].map((tag, i) => (
            <motion.div
              key={tag}
              className="px-3 py-1 bg-secondary dark:bg-muted backdrop-blur-sm rounded-full text-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + (i * 0.1), duration: 0.3 }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(var(--primary-rgb), 0.15)"
              }}
            >
              {tag}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.hr 
        className="w-11/12 mx-auto"
        initial={{ width: "0%" }}
        animate={isInView ? { width: "91.666667%" } : { width: "0%" }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
      />
    </motion.section>
  );
};
