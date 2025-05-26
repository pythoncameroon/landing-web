import { useState, useRef } from "react";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import image from "../assets/growth.png";
import image3 from "../assets/reflecting.png";
import image4 from "../assets/looking-ahead.png";

// Type image correctly depending on your framework
// If using Next.js:

// If not using Next.js, you can use `any` or `string` instead
interface FeatureProps {
  title: string;
  description: string;
  image: string;
}

const features: FeatureProps[] = [
  {
    title: "Responsive Design",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
    image: image4,
  },
  {
    title: "Intuitive user interface",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
    image: image3,
  },
  {
    title: "AI-Powered insights",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
    image: image,
  },
];


const FuturisticBadge = ({
  feature,
  index,
}: {
  feature: string;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, margin: "-50px" }}
    transition={{
      duration: 0.5,
      delay: 0.1 + index * 0.05,
      type: "spring",
      stiffness: 100,
    }}
    whileHover={{
      scale: 1.1,
      rotate: [-1, 1, -1, 0],
      transition: { duration: 0.3 },
    }}
    whileTap={{ scale: 0.95 }}
    className="relative"
  >
    <Badge
      variant="secondary"
      className="text-sm relative overflow-hidden group backdrop-blur-sm"
    >
      <span className="relative z-10">{feature}</span>
      <motion.span
        className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-purple-500"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </Badge>

    <motion.div
      className="absolute inset-0 rounded-full bg-primary opacity-0"
      whileHover={{ opacity: 0.2, scale: 1.3 }}
      transition={{ duration: 0.3 }}
      style={{ filter: "blur(8px)" }}
    />
  </motion.div>
);

const FeatureCard = ({
  feature,
  index,
}: {
  feature: FeatureProps;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.2 });

  const { title, description, image } = feature;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateY: 5 }}
      animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : { opacity: 0, y: 50 }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 100,
        delay: index * 0.2,
      }}
      whileHover={{
        y: -8,
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 20,
        },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative perspective-800"
    >
      <motion.div
        className="absolute -inset-1 rounded-xl opacity-0 z-0"
        animate={{
          opacity: isHovered ? 0.6 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-primary/30 via-purple-500/30 to-primary/30 rounded-xl"
          style={{ filter: "blur(20px)" }}
        />
      </motion.div>

      <Card className="relative z-10 overflow-hidden border bg-background/60 backdrop-blur-sm transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg sm:text-xl">
            <motion.span
              className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent inline-block"
              style={{ backgroundSize: "200% 100%" }}
              animate={{
                backgroundPosition: isHovered
                  ? ["0% center", "100% center"]
                  : ["0% center"],
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              {title}
            </motion.span>
            <motion.div
              className="h-0.5 bg-gradient-to-r from-primary/50 via-purple-500/50 to-primary/50 mt-1 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: isHovered ? "100%" : "0%" }}
              transition={{ duration: 0.3 }}
            />
          </CardTitle>
        </CardHeader>

        <CardContent>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
            className="text-muted-foreground"
          >
            {description}
          </motion.p>
        </CardContent>

        <CardFooter className="flex justify-center pb-6">
          <motion.div
            className="relative overflow-hidden rounded-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
            transition={{
              delay: index * 0.2 + 0.4,
              duration: 0.5,
              type: "spring",
              stiffness: 100,
            }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="absolute -inset-1 rounded-xl z-0"
              animate={{
                boxShadow: isHovered
                  ? "0 0 30px rgba(var(--primary-rgb), 0.4)"
                  : "0 0 0px rgba(var(--primary-rgb), 0)",
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.img
              src={image}
              alt={`${title} illustration`}
              className="w-[200px] lg:w-[300px] mx-auto rounded-xl relative z-10"
              animate={{
                y: isHovered ? [-5, 5, -5] : 0,
              }}
              transition={{
                y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
              }}
            />

            {isHovered && (
              <>
                <motion.div
                  className="absolute w-20 h-20 rounded-full border border-dashed border-primary/30 z-0"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 0.7, scale: 1, rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ left: "10%", top: "10%" }}
                />
                <motion.div
                  className="absolute w-12 h-12 rounded-full border border-dashed border-primary/20 z-0"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 0.5, scale: 1, rotate: -360 }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ right: "15%", bottom: "10%" }}
                />
              </>
            )}
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export { FeatureCard, FuturisticBadge, features };
