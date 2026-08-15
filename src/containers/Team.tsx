import { useState, useRef } from "react";
import { m, useInView } from "framer-motion";
import {
  Users,
  Star,
  User,
  Globe,
  Linkedin,
} from "lucide-react";
import { teamData } from "@/data/team";
import type { TeamProps } from "@/types/sections";
import { GlowBackground } from "@/components/section/GlowBackground";
import { SectionHeader, TitleGradient } from "@/components/section/SectionHeader";

// Enhanced image component with fallback system
const ProfileImage = ({
  member,
  isHovered,
}: {
  member: TeamProps;
  isHovered: boolean;
}) => {
  return (
    <m.div
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
        <m.img
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
        <m.div
          className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <User className="w-8 h-8 text-primary/60" />
        </m.div>
      )}

      {/* Overlay effect on hover */}
      <m.div
        className="absolute inset-0 bg-primary/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </m.div>
  );
};

export const Team = () => {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <m.section
      id="team"
      ref={sectionRef}
      className="container py-20 sm:py-28 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <GlowBackground
        gridOpacity={0.02}
        blobs={[
          { className: "top-10 left-1/5 w-96 h-96 bg-primary", blur: 120, opacity: 0.45 },
          { className: "bottom-20 right-1/4 w-80 h-80 bg-secondary", blur: 100, opacity: 0.55 },
        ]}
      />

      <SectionHeader
        isInView={isInView}
        badge={{
          icon: <Users className="w-4 h-4 text-primary" />,
          text: "Our Amazing Team",
          iconRight: <Star className="w-4 h-4 text-secondary" />,
        }}
        title={<TitleGradient>Meet the Python Cameroon Team</TitleGradient>}
        titleClassName="text-3xl md:text-4xl lg:text-5xl font-bold relative"
        subtitle="Dedicated innovators advancing Python development in Cameroon through collaboration and expertise."
        dividerWidth={120}
      />

      {/* Team grid */}
      <m.div
        className="flex items-center justify-center flex-wrap gap-2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        {" "}
        {teamData.map((member: TeamProps, index) => {
          const isHovered = hoveredMember === member.name;

          return (
            <m.div
              key={member.name}
              className="relative perspective-1000 w-full sm:w-[280px] h-[320px]"
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
              <m.div
                className="absolute -inset-0.5 rounded-2xl opacity-0 -z-10"
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  background:
                    "linear-gradient(45deg, rgba(var(--primary-rgb), 0.6), rgba(147, 51, 234, 0.6))",
                }}
              />

              <m.div
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
                <m.div
                  className="relative mb-6"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Rotating background gradient */}
                  <m.div
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

                </m.div>{" "}
                {/* Member info */}
                <m.div
                  className="flex-1 space-y-3"
                  animate={{ y: isHovered ? -2 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <m.h3
                    className="text-xl font-bold"
                    animate={{
                      color: isHovered
                        ? "hsl(var(--primary))"
                        : "hsl(var(--foreground))",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {member.name}
                  </m.h3>

                  <m.div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-500/20"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-xs text-primary dark:text-secondary font-medium">
                      {member.role}
                    </span>
                  </m.div>
                </m.div>
                {/* Social links */}
                <m.div
                  className="flex items-center gap-3 mt-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {member.links.linkedIn && (
                    <m.a
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
                    </m.a>
                  )}
                  {member.links.website && (
                    <m.a
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
                    </m.a>
                  )}
                </m.div>
                {/* Subtle glow effect on hover */}
                {isHovered && (
                  <m.div
                    className="absolute inset-0 rounded-2xl opacity-50 -z-10"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 0.5,
                      boxShadow: "0 0 40px rgba(var(--primary-rgb), 0.2)",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </m.div>
            </m.div>
          );
        })}
      </m.div>
    </m.section>
  );
};
