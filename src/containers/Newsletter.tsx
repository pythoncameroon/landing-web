import { useState, useRef, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { m, useInView, AnimatePresence } from "framer-motion";
import { GlowBackground } from "@/components/section/GlowBackground";
import { SectionHeader, TitleGradient } from "@/components/section/SectionHeader";

// Pas encore de backend newsletter (voir AUDIT.md B3) : on redirige vers un
// canal d'inscription réel plutôt que de simuler un envoi qui n'aboutit nulle part.
const COMMUNITY_URL = "https://discord.gg/TWVCKCe3Dt";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    window.open(COMMUNITY_URL, "_blank", "noopener,noreferrer");
    setEmail("");
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
  };

  return (
    <m.section 
      id="newsletter"
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative overflow-hidden"
    >
      <m.hr 
        className="w-11/12 mx-auto"
        initial={{ width: "0%" }}
        animate={isInView ? { width: "91.666667%" } : { width: "0%" }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />

      <div className="container py-24 sm:py-32 relative">
        <GlowBackground
          blobs={[
            { className: "top-0 left-1/4 w-64 h-64 bg-primary/10", blur: 80, opacity: 0.15 },
            { className: "bottom-0 right-1/4 w-80 h-80 bg-secondary", blur: 100, opacity: 0.12 },
          ]}
        />

        <SectionHeader
          isInView={isInView}
          title={
            <>
              Join Our Daily <TitleGradient>Newsletter</TitleGradient>
            </>
          }
          titleClassName="text-4xl md:text-5xl font-bold relative"
          subtitle="Stay updated with Python Cameroon Community."
          subtitleClassName="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto"
          dividerWidth={80}
        />

        <m.div
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
          <div
            className="absolute -inset-4 rounded-xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 -z-10"
            style={{
              filter: "blur(20px)",
              opacity: 0.5,
            }}
          />
          
          <form
            className="flex flex-col w-full md:flex-row md:w-6/12 lg:w-4/12 mx-auto gap-4 md:gap-2 relative z-10"
            onSubmit={handleSubmit}
          >
            <div className="relative flex-grow">
              <Input
                type="email"
                required
                placeholder="pythoncameroon@gmail.com"
                className="bg-muted/50 dark:bg-muted/80 backdrop-blur-sm h-12 pl-4 pr-4 border-primary/20 focus-visible:ring-primary dark:border-secondary/20 dark:focus-visible:ring-secondary"
                aria-label="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
              <AnimatePresence>
                {email && (
                  <m.div
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
                  </m.div>
                )}
              </AnimatePresence>
            </div>
            
            <m.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden flex justify-center"
            >
              <Button
                className="relative h-12 min-w-[120px] overflow-hidden hover:text-primary dark:hover:text-secondary dark:bg-secondary dark:hover:bg-transparent"
                disabled={isSuccess}
              >
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <m.div
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
                      Redirected
                    </m.div>
                  ) : (
                    <m.div
                      key="subscribe"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Subscribe
                    </m.div>
                  )}
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-secondary/80 to-primary/80 -z-10" />
              </Button>
            </m.div>
          </form>
        </m.div>
        
        <AnimatePresence>
          {isSuccess && (
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center mt-4 text-primary"
            >
              Opening our Discord in a new tab — join to get updates!
            </m.div>
          )}
        </AnimatePresence>
        
        <m.div 
          className="flex flex-wrap justify-center gap-4 mt-12 opacity-70"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {["Updates", "Events", "Tutorials", "Community"].map((tag, i) => (
            <m.div
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
            </m.div>
          ))}
        </m.div>
      </div>

      <m.hr 
        className="w-11/12 mx-auto"
        initial={{ width: "0%" }}
        animate={isInView ? { width: "91.666667%" } : { width: "0%" }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
      />
    </m.section>
  );
};
