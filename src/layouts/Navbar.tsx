import { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { LogoIcon } from "@/components/Icons";
import { LanguageSwitcher } from "@/components/language"; // Import Language Switcher
import { motion, AnimatePresence } from "framer-motion";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "#about",
    label: "About",
  },
  {
    href: "#newsletter",
    label: "Newsletter",
  },
  {
    href: "#faq",
    label: "FAQ",
  },
];

// Particle effect for the logo
const ParticleEffect = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-primary"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: [0, Math.random() * 40 - 20],
            y: [0, Math.random() * 40 - 20],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: Math.random() * 2,
            delay: Math.random() * 2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      // Update active section based on scroll
      const sections = routeList
        .map((route) => {
          const id = route.href.substring(1);
          const element = document.getElementById(id);
          if (element) {
            const rect = element.getBoundingClientRect();
            const isInView =
              rect.top <= window.innerHeight / 2 &&
              rect.bottom >= window.innerHeight / 2;
            return { id, isInView };
          }
          return null;
        })
        .filter(Boolean);

      const currentSection = sections.find((section) => section?.isInView)?.id;
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`sticky border-b-[1px] top-0 z-40 w-full transition-all duration-300
        ${
          scrolled
            ? "backdrop-blur-lg bg-white/80 dark:bg-background/80"
            : "bg-white dark:bg-background"
        } 
        dark:border-b-slate-700`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary opacity-5"
          style={{ filter: "blur(100px)" }}
        />
        <div
          className="absolute -bottom-40 -left-20 w-80 h-80 rounded-full bg-primary opacity-5"
          style={{ filter: "blur(120px)" }}
        />
      </div>

      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-16 px-4 w-screen flex justify-between items-center">
          <NavigationMenuItem className="font-bold flex">
            <motion.a
              rel="noreferrer noopener"
              href="/"
              className="ml-2 font-bold text-xl flex items-center relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                whileHover={{ rotate: 10 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <LogoIcon />

                <ParticleEffect />
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary opacity-0"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.2, scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                  style={{ filter: "blur(10px)" }}
                />
              </motion.div>
            </motion.a>
          </NavigationMenuItem>
          {/* Mobile navigation */}
          <div className="flex md:hidden gap-2 items-center">
            <div className="mr-1">
              <ModeToggle />
            </div>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2 relative">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative"
                >
                  <Menu
                    className="flex md:hidden h-5 w-5"
                    onClick={() => setIsOpen(true)}
                  >
                    <span className="sr-only">Menu Icon</span>
                  </Menu>
                  {/* Notification dot */}
                  <motion.div
                    className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                    }}
                  />
                </motion.div>
              </SheetTrigger>

              <SheetContent
                side={"left"}
                className="bg-white/95 dark:bg-background/95 backdrop-blur-lg"
              >
                <SheetHeader>
                  <SheetTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary animate-gradient">
                    Python Cameroon
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-3 mt-8">
                  <AnimatePresence>
                    <div className="w-full flex flex-col items-center gap-4">
                      {routeList.map(({ href, label }: RouteProps, index) => (
                        <motion.div
                          key={label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="w-full"
                        >
                          {" "}
                          <a
                            rel="noreferrer noopener"
                            href={href}
                            onClick={() => setIsOpen(false)}
                            className="w-full flex justify-center text-lg relative overflow-hidden group hover:bg-accent hover:text-accent-foreground rounded-md px-4 py-2 transition-colors"
                          >
                            <span className="relative z-10">{label}</span>
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
                          </a>
                        </motion.div>
                      ))}
                    </div>
                  </AnimatePresence>

                  <div className="mt-6 w-full flex flex-col items-center gap-4">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      rel="noreferrer noopener"
                      href="https://github.com/pythoncameroon"
                      target="_blank"
                      className={`w-full border ${buttonVariants({
                        variant: "outline",
                      })} group relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="flex items-center justify-center">
                        <GitHubLogoIcon className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                        <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text font-semibold">
                          Github
                        </span>
                      </div>
                    </motion.a>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative p-1"
                    >
                      <LanguageSwitcher />
                    </motion.div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>{" "}
          {/* Desktop navigation */}
          <nav className="hidden md:flex gap-6 items-center">
            {routeList.map((route: RouteProps, i) => {
              const isActive = activeSection === route.href.substring(1);
              return (
                <div key={i} className="group">
                  {" "}
                  {/* plain div, no motion */}
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    rel="noreferrer noopener"
                    href={route.href}
                    className="text-[17px] relative px-4 py-2 overflow-hidden hover:bg-accent hover:text-accent-foreground rounded-md transition-colors block"
                  >
                    <span
                      className={`relative z-10 ${
                        isActive
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-medium"
                          : ""
                      }`}
                    >
                      {route.label}
                    </span>
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                    {isActive && (
                      <span className="absolute inset-0 bg-primary/5 rounded-md -z-10" />
                    )}
                  </motion.a>
                </div>
              );
            })}
          </nav>
          <div className="hidden md:flex gap-3 items-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              rel="noreferrer noopener"
              href="https://github.com/pythoncameroon"
              target="_blank"
              className={`border ${buttonVariants({
                variant: "outline",
              })} group relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex items-center justify-center relative z-10">
                <GitHubLogoIcon className="mr-2 w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text font-medium">
                  Github
                </span>
              </div>
            </motion.a>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <LanguageSwitcher />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <ModeToggle />
            </motion.div>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </motion.header>
  );
};
