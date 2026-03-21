import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Users,
  Star,
  Sparkles,
  User,
  Globe,
  Linkedin,
} from "lucide-react";
import { teamData } from "@/data/team";
import type { TeamProps } from "@/types/sections";

// Enhanced image component with fallback system
const ProfileImage = ({
  member,
  isHovered,
}: {
  member: TeamProps;
  isHovered: boolean;
}) => {
  return (
    <motion.div
      className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20"
      animate={{
        boxShadow: isHovered
          ? "0 0 30px rgba(var(--primary-rgb), 0.4)"
          : "0 0 0 rgba(var(--primary-rgb), 0)",
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Profile Image */}
      {member.image ? (
        <motion.img
          src={member.image}
          alt={`${member.name} - ${member.role}`}
          className="w-full h-full object-cover"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
      ) : (
        // Default placeholder when all images fail
        <motion.div
          className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <User className="w-8 h-8 text-primary/60" />
        </motion.div>
      )}

      {/* Overlay effect on hover */}
      <motion.div
        className="absolute inset-0 bg-primary/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export const Team = () => {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  return (
    <motion.section
      id="team"
      ref={sectionRef}
      className="container py-20 sm:py-28 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-10 left-1/5 w-96 h-96 rounded-full bg-primary"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 40, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "blur(120px)" }}
        />

        <motion.div
          className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-secondary"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.4, 0.7, 0.4],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          style={{ filter: "blur(100px)" }}
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMyMDIwMjAiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMzBjMCAxNi41Ny0xMy40MyAzMC0zMCAzMFMwIDQ2LjU3IDAgMzAgMTMuNDMgMCAzMCAwczMwIDEzLjQzIDMwIDMweiIgc3Ryb2tlPSIjZmZmZmZmMDUiIHN0cm9rZS13aWR0aD0iLjUiLz48cGF0aCBkPSJNMTI5LjUgMTB2MTQwTTEyOSAyOWgtMTI5TTE0My41IDI5aC0xNC41IiBzdHJva2U9IiNmZmZmZmYwNSIgc3Ryb2tlLXdpZHRoPSIuNSIvPjwvZz48L3N2Zz4=')] opacity-[0.02]" />

        {/* Floating particles */}
        <AnimatePresence>
          {isInView &&
            Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={`team-particle-${i}`}
                className="absolute rounded-full bg-primary"
                initial={{
                  opacity: 0,
                  x: "50%",
                  y: "50%",
                  scale: 0,
                }}
                animate={{
                  opacity: [0, 0.7, 0],
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  delay: i * 0.6,
                  ease: "easeInOut",
                }}
                style={{
                  width: `${Math.random() * 8 + 4}px`,
                  height: `${Math.random() * 8 + 4}px`,
                  filter: "blur(1.5px)",
                }}
              />
            ))}
        </AnimatePresence>
      </div>

      {/* Section header */}
      <motion.div
        className="relative mb-16 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 border border-slate-500/30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{ delay: 0.2, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          <Users className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            Our Amazing Team
          </span>
          <Star className="w-4 h-4 text-secondary" />
        </motion.div>

        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold relative"
          animate={{ filter: ["blur(0px)", "blur(0.3px)", "blur(0px)"] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
        >
          <motion.span
            className="bg-gradient-to-r from-primary via-secondary to-primary text-transparent bg-clip-text relative"
            animate={{
              backgroundPosition: ["0% center", "100% center", "0% center"],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ backgroundSize: "300% auto" }}
          >
            Meet the Python Cameroon Team
            {/* Glowing effect behind text */}
            <motion.span
              className="absolute -inset-2 rounded-lg blur-xl -z-10"
              animate={{
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "mirror",
              }}
              style={{
                background:
                  "linear-gradient(to right, rgba(var(--primary-rgb), 0.3), rgba(147, 51, 234, 0.3), rgba(var(--primary-rgb), 0.3))",
              }}
            />
          </motion.span>
        </motion.h2>

        {/* Animated divider */}
        <motion.div
          className="h-1 w-0 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-6"
          animate={isInView ? { width: 120 } : { width: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        />

        <motion.p
          className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Dedicated innovators advancing Python development in Cameroon through
          collaboration and expertise.
        </motion.p>
      </motion.div>

      {/* Team grid */}
      <motion.div
        className="flex items-center justify-center flex-wrap gap-2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        {" "}
        {teamData.map((member: TeamProps, index) => {
          const isHovered = hoveredMember === member.name;

          return (
            <motion.div
              key={member.name}
              className="relative perspective-1000 w-[280px] h-[320px]"
              initial={{ opacity: 0, y: 30, rotateX: 10 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, rotateX: 0 }
                  : { opacity: 0, y: 30, rotateX: 10 }
              }
              transition={{
                delay: 0.8 + index * 0.1,
                duration: 0.7,
                type: "spring",
                stiffness: 100,
              }}
              onMouseEnter={() => setHoveredMember(member.name)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              {/* Animated border gradient */}
              <motion.div
                className="absolute -inset-0.5 rounded-2xl opacity-0 -z-10"
                animate={{
                  opacity: isHovered ? 1 : 0,
                  background: [
                    "linear-gradient(45deg, rgba(var(--primary-rgb), 0.6), rgba(147, 51, 234, 0.6))",
                    "linear-gradient(135deg, rgba(147, 51, 234, 0.6), rgba(var(--primary-rgb), 0.6))",
                    "linear-gradient(225deg, rgba(var(--primary-rgb), 0.6), rgba(147, 51, 234, 0.6))",
                    "linear-gradient(315deg, rgba(147, 51, 234, 0.6), rgba(var(--primary-rgb), 0.6))",
                  ],
                }}
                transition={{
                  opacity: { duration: 0.3 },
                  background: { duration: 4, repeat: Infinity },
                }}
              />

              <motion.div
                className="relative bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6 h-full flex flex-col items-center text-center overflow-hidden"
                whileHover={{
                  y: -8,
                  rotateY: 5,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                }}
                transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
              >
                {" "}
                {/* Profile image container */}
                <motion.div
                  className="relative mb-6"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Rotating background gradient */}
                  <motion.div
                    className="absolute -inset-3 bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 rounded-full -z-10"
                    animate={{
                      rotate: isHovered ? 360 : 0,
                      scale: isHovered ? 1.1 : 1,
                      opacity: isHovered ? 0.7 : 0.3,
                    }}
                    transition={{
                      rotate: { duration: 8, ease: "linear" },
                      scale: { duration: 0.3 },
                      opacity: { duration: 0.3 },
                    }}
                    style={{ filter: "blur(15px)" }}
                  />
                  {/* Use the ProfileImage component with fallback system */}
                  <ProfileImage member={member} isHovered={isHovered} />

                  {/* Pulsing ring effect */}
                  {isHovered && (
                    <motion.div
                      className="absolute -inset-2 rounded-full border border-secondary"
                      initial={{ scale: 1, opacity: 0 }}
                      animate={{
                        scale: [1, 1.5],
                        opacity: [0.5, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                    />
                  )}
                </motion.div>{" "}
                {/* Member info */}
                <motion.div
                  className="flex-1 space-y-3"
                  animate={{ y: isHovered ? -2 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.h3
                    className="text-xl font-bold"
                    animate={{
                      color: isHovered
                        ? "hsl(var(--primary))"
                        : "hsl(var(--foreground))",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {member.name}
                  </motion.h3>

                  <motion.div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-500/20"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-xs text-primary dark:text-secondary font-medium">
                      {member.role}
                    </span>
                  </motion.div>
                </motion.div>
                {/* Social links */}
                <motion.div
                  className="flex items-center gap-3 mt-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {member.links.linkedIn && (
                    <motion.a
                      href={member.links.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-muted/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary dark:hover:text-secondary transition-all duration-300"
                      whileHover={{
                        scale: 1.1,
                        y: -2,
                        boxShadow: "0 8px 20px rgba(var(--primary-rgb), 0.3)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.4,
                        duration: 0.3,
                      }}
                    >
                      <Linkedin />
                    </motion.a>
                  )}
                  {member.links.website && (
                    <motion.a
                      href={member.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-muted/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary dark:hover:text-secondary transition-all duration-300"
                      whileHover={{
                        scale: 1.1,
                        y: -2,
                        boxShadow: "0 8px 20px rgba(var(--primary-rgb), 0.3)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.4,
                        duration: 0.3,
                      }}
                    >
                      <Globe />
                    </motion.a>
                  )}
                </motion.div>
                {/* Subtle glow effect on hover */}
                {isHovered && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-50 -z-10"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 0.5,
                      boxShadow: "0 0 40px rgba(var(--primary-rgb), 0.2)",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                {/* Sparkle effects on hover */}
                <AnimatePresence>
                  {isHovered && (
                    <>
                      {Array.from({ length: 3 }).map((_, i) => (
                        <motion.div
                          key={`sparkle-${i}`}
                          className="absolute"
                          initial={{
                            opacity: 0,
                            scale: 0,
                            x: Math.random() * 200 - 100,
                            y: Math.random() * 200 - 100,
                          }}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                            rotate: [0, 180, 360],
                          }}
                          transition={{
                            duration: 2,
                            delay: i * 0.3,
                            repeat: Infinity,
                            repeatDelay: 1,
                          }}
                        >
                          <Sparkles className="w-4 h-4 text-primary" />
                        </motion.div>
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
};
