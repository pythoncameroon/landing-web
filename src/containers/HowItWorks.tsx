import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "@/components/Icons";
import { m, useInView, AnimatePresence } from "framer-motion";
import { GlowBackground } from "@/components/section/GlowBackground";
import { SectionHeader, TitleGradient } from "@/components/section/SectionHeader";

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
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  return (
    <m.div
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
      <div
        className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary via-secondary to-primary opacity-20 blur-sm -z-10"
        style={{ backgroundSize: "200% 100%" }}
      />

      <Card className="bg-muted/50 backdrop-blur-sm border-transparent h-full transition-all duration-300 overflow-hidden">
        <CardHeader>
          <CardTitle className="grid gap-4 place-items-center relative">
            <m.div
              whileHover={{
                rotate: [0, -10, 10, -10, 0],
                scale: 1.2,
                transition: { duration: 0.5 }
              }}
              className="relative"
            >
              <div
                className="absolute inset-0 rounded-full bg-primary"
                style={{ filter: "blur(15px)", opacity: 0.2 }}
              />
              <div className="relative z-10">
                {icon}
              </div>
            </m.div>

            <m.span
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
            </m.span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <m.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
            className="text-xs"
          >
            {description}
          </m.p>
        </CardContent>

        <m.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: "left" }}
        />
      </Card>

      <m.div
        className="absolute -z-10 inset-0 opacity-0 rounded-xl"
        whileHover={{ opacity: 0.2 }}
        transition={{ duration: 0.3 }}
        style={{ filter: "blur(20px)", background: "radial-gradient(circle, rgba(var(--primary-rgb), 0.8) 0%, transparent 70%)" }}
      />
    </m.div>
  );
};

export const HowItWorks = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <m.section
      id="howItWorks"
      className="container text-center py-24 sm:py-32 relative overflow-hidden"
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <GlowBackground
        blobs={[
          { className: "top-20 right-20 w-64 h-64 bg-primary/10", blur: 80 },
          { className: "bottom-40 -left-20 w-80 h-80 bg-secondary/10", blur: 100 },
        ]}
      />

      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-[0.03]">
          {Array.from({ length: 7 }).map((_, i) => (
            <m.div
              key={`v-line-${i}`}
              className="h-full w-px bg-primary"
              initial={{ height: 0 }}
              animate={isInView ? { height: "100%" } : { height: 0 }}
              transition={{ duration: 1.5, delay: i * 0.1 }}
            />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <m.div
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

      <SectionHeader
        isInView={isInView}
        title={
          <>
            How It <TitleGradient>Works</TitleGradient> Step-by-Step Guide
          </>
        }
        subtitle="Explore the power of Python through accessibility, community, scalability, and gamification."
        subtitleClassName="md:w-3/4 text-lg text-muted-foreground mt-4 mx-auto"
        dividerWidth={80}
      />

      <m.div
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
      </m.div>
    </m.section>
  );
};
