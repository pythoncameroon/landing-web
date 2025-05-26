import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Check, Linkedin } from "lucide-react";
import { LightBulbIcon } from "./Icons";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";

// Card hover effect component for consistent interactive behaviors
const FuturisticCard = ({ children, delay = 0, className = "", index = 0 }) => {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate rotation based on mouse position
  const rotateX = useTransform(mouseY, [-100, 100], [5, -5]);
  const rotateY = useTransform(mouseX, [-100, 100], [-5, 5]);
  const glowX = useTransform(mouseX, [-100, 100], [0, 100]);
  const glowY = useTransform(mouseY, [-100, 100], [0, 100]);
  
  // Handle mouse interactions
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  // Card entrance animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.9,
      rotateX: 10
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        delay: delay,
        type: "spring",
        stiffness: 100
      }
    }
  };
  
  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
      }}
      whileHover={{
        z: 20,
      }}
      transition={{
        rotateX: { type: "spring", stiffness: 400, damping: 30 },
        rotateY: { type: "spring", stiffness: 400, damping: 30 },
      }}
    >
      {/* Dynamic border glow on hover */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-xl opacity-0"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(var(--primary-rgb), 0.4) 0%, transparent 70%)`
          ),
        }}
        animate={{
          opacity: isHovered ? 0.7 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Animated pulse effect for card index indicator */}
      <motion.div
        className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium z-20"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          backgroundColor: ["rgba(var(--primary-rgb), 0.2)", "rgba(var(--primary-rgb), 0.4)", "rgba(var(--primary-rgb), 0.2)"]
        }}
        transition={{ 
          scale: { delay: delay + 0.3, duration: 0.4 },
          backgroundColor: { repeat: Infinity, duration: 2, delay: delay }
        }}
      >
        {index + 1}
      </motion.div>
      
      {/* Card content with 3D transform */}
      <motion.div 
        className="relative w-full h-full rounded-lg overflow-hidden"
        style={{ 
          transformStyle: "preserve-3d",
          transform: "translateZ(0px)"
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// Animated icon component
const AnimatedIcon = ({ children }) => {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.2, 
        rotate: [0, 5, -5, 0],
        transition: { duration: 0.5 }
      }}
      className="relative"
    >
      <motion.div
        className="absolute inset-0 bg-primary rounded-full opacity-20"
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      {children}
    </motion.div>
  );
};

// Main HeroCards component
export const HeroCards = () => {
  // Track if component is in viewport
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);
  
  // Setup intersection observer to trigger animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);
  
  return (
    <div ref={containerRef} className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
      <AnimatePresence>
        {isInView && (
          <>
            {/* Testimonial */}
            <FuturisticCard className="absolute w-[340px] -top-[15px] drop-shadow-xl shadow-black/10 dark:shadow-white/10" index={0}>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar>
                  <AvatarImage
                    alt=""
                    src="https://github.com/shadcn.png"
                  />
                  <AvatarFallback>SH</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <CardTitle className="text-lg">John Doe React</CardTitle>
                  <CardDescription>@john_doe</CardDescription>
                </div>
              </CardHeader>

              <CardContent>This landing page is awesome!</CardContent>
            </FuturisticCard>

            {/* Team */}
            <FuturisticCard className="absolute right-[20px] top-4 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10" index={1}>
              <CardHeader className="mt-8 flex justify-center items-center pb-2">
                <img
                  src="https://i.pravatar.cc/150?img=58"
                  alt="user avatar"
                  className="absolute grayscale-[0%] -top-12 rounded-full w-24 h-24 aspect-square object-cover"
                />
                <CardTitle className="text-center">Leo Miranda</CardTitle>
                <CardDescription className="font-normal text-primary">
                  Frontend Developer
                </CardDescription>
              </CardHeader>

              <CardContent className="text-center pb-2">
                <p>
                  I really enjoy transforming ideas into functional software that
                  exceeds expectations
                </p>
              </CardContent>

              <CardFooter>
                <div>
                  <a
                    rel="noreferrer noopener"
                    href="https://github.com/leoMirandaa"
                    target="_blank"
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    })}
                  >
                    <span className="sr-only">Github icon</span>
                    <GitHubLogoIcon className="w-5 h-5" />
                  </a>
                  <a
                    rel="noreferrer noopener"
                    href="https://twitter.com/leo_mirand4"
                    target="_blank"
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    })}
                  >
                    <span className="sr-only">X icon</span>
                    <svg
                      role="img"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-foreground w-5 h-5"
                    >
                      <title>X</title>
                      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                    </svg>
                  </a>

                  <a
                    rel="noreferrer noopener"
                    href="https://www.linkedin.com/in/leopoldo-miranda/"
                    target="_blank"
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    })}
                  >
                    <span className="sr-only">Linkedin icon</span>
                    <Linkedin size="20" />
                  </a>
                </div>
              </CardFooter>
            </FuturisticCard>

            {/* Pricing */}
            <FuturisticCard className="absolute top-[150px] left-[50px] w-72  drop-shadow-xl shadow-black/10 dark:shadow-white/10" index={2}>
              <CardHeader>
                <CardTitle className="flex item-center justify-between">
                  Free
                  <Badge
                    variant="secondary"
                    className="text-sm text-primary"
                  >
                    Most popular
                  </Badge>
                </CardTitle>
                <div>
                  <span className="text-3xl font-bold">$0</span>
                  <span className="text-muted-foreground"> /month</span>
                </div>

                <CardDescription>
                  Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Button className="w-full">Start Free Trial</Button>
              </CardContent>

              <hr className="w-4/5 m-auto mb-4" />

              <CardFooter className="flex">
                <div className="space-y-4">
                  {["4 Team member", "4 GB Storage", "Upto 6 pages"].map(
                    (benefit: string) => (
                      <span
                        key={benefit}
                        className="flex"
                      >
                        <Check className="text-green-500" />{" "}
                        <h3 className="ml-2">{benefit}</h3>
                      </span>
                    )
                  )}
                </div>
              </CardFooter>
            </FuturisticCard>

            {/* Service */}
            <FuturisticCard className="absolute w-[350px] -right-[10px] bottom-[35px]  drop-shadow-xl shadow-black/10 dark:shadow-white/10" index={3}>
              <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                  <LightBulbIcon />
                </div>
                <div>
                  <CardTitle>Light & dark mode</CardTitle>
                  <CardDescription className="text-md mt-2">
                    Lorem ipsum dolor sit amet consect adipisicing elit. Consectetur
                    natusm.
                  </CardDescription>
                </div>
              </CardHeader>
            </FuturisticCard>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
