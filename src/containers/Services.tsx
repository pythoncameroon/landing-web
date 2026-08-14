import { useRef } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartIcon, WalletIcon, MagnifierIcon } from "@/components/Icons";
import cubeLeg from "../assets/cube-leg.png";
import { m, useInView, AnimatePresence } from "framer-motion";

interface ServiceProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

const serviceList: ServiceProps[] = [
  {
    title: "Code Collaboration",
    description:
      "Enhance team productivity with Python-based tools for version control, CI/CD, and collaborative coding.",
    icon: <ChartIcon />,
  },
  {
    title: "Project Management",
    description:
      "Streamline workflows with Python-powered task automation, reporting, and data visualization.",
    icon: <WalletIcon />,
  },
  {
    title: "Task Automation",
    description:
      "Automate repetitive tasks using Python scripts for DevOps, system administration, and data processing.",
    icon: <MagnifierIcon />,
  },
];

export const Services = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <m.section
      className="container py-24 sm:py-32 relative overflow-hidden"
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/10"
          style={{ filter: "blur(80px)" }}
        />
        <div
          className="absolute bottom-40 -left-20 w-80 h-80 rounded-full bg-secondary/10"
          style={{ filter: "blur(100px)" }}
        />
      </div>

      <m.div
        className="grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <m.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            <span
              className="bg-gradient-to-r from-primary via-secondary to-primary text-transparent bg-clip-text relative inline-block"
              style={{ backgroundSize: "200% 100%" }}
            >
              Client-Centric
              <span
                className="absolute -inset-1 rounded-lg blur-xl z-[-1]"
                style={{
                  opacity: 0.2,
                  background: "linear-gradient(to right, rgba(var(--primary-rgb), 0.2), rgba(147, 51, 234, 0.2), rgba(var(--primary-rgb), 0.2))",
                }}
              />
            </span>{" "}
            Services
          </h2>

          <m.p
            className="text-muted-foreground text-lg mt-4 mb-8 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Empowering teams with Python-driven efficiency, automation, and collaboration.
            {/* span display:block : un <div> est invalide dans un <p> */}
            <m.span
              className="block absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
          </m.p>

          <div className="flex flex-col gap-8 mt-16">
            <AnimatePresence>
              {serviceList.map(({ icon, title, description }: ServiceProps, index) => (
                <m.div
                  key={title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{
                    delay: 0.3 + index * 0.1,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <Card className="overflow-hidden relative border border-primary/10 bg-card/50 backdrop-blur-sm">
                    <m.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />

                    <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                      <m.div
                        className="mt-1 bg-primary/20 p-3 rounded-2xl relative overflow-hidden"
                        whileHover={{
                          scale: 1.1,
                          rotate: [-2, 2, 0],
                          transition: { duration: 0.3 }
                        }}
                      >
                        <m.div
                          className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 opacity-0"
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <div>
                          {icon}
                        </div>
                      </m.div>

                      <div>
                        <m.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                        >
                          <CardTitle className="relative inline-block">
                            {title}
                            <m.div
                              className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-secondary"
                              whileHover={{ width: "100%" }}
                              transition={{ duration: 0.3 }}
                            />
                          </CardTitle>
                        </m.div>

                        <m.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                        >
                          <CardDescription className="text-sm mt-2">
                            {description}
                          </CardDescription>
                        </m.div>
                      </div>
                    </CardHeader>

                    <m.div
                      className="absolute bottom-0 h-0.5 w-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.4 }}
                    />
                  </Card>
                </m.div>
              ))}
            </AnimatePresence>
          </div>
        </m.div>

        <m.div
          className="relative perspective-1200"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 100,
            delay: 0.4
          }}
          whileHover={{ scale: 1.03 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="absolute -inset-10 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 rounded-full -z-10"
            style={{ filter: "blur(60px)", opacity: 0.25 }}
          />

          <img
            src={cubeLeg}
            className="w-[300px] md:w-[500px] lg:w-[600px] object-contain relative z-10"
            alt="Python services visualization"
            style={{ transformStyle: "preserve-3d" }}
          />

          <div
            className="absolute bottom-0 w-3/4 h-8 bg-primary/20 blur-2xl mx-auto left-0 right-0 rounded-full"
          />
        </m.div>
      </m.div>
    </m.section>
  );
};
