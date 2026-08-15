import { useState, useRef } from "react";
import { m, useInView } from "framer-motion";
import { MessageCircle, HelpCircle, Sparkles } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GlowBackground } from "@/components/section/GlowBackground";
import { SectionHeader, TitleGradient } from "@/components/section/SectionHeader";
import { faqData } from "@/data/faq";
import type { FAQItemProps } from "@/types/sections";

export const FAQ = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <m.section 
      id="faq" 
      ref={sectionRef}
      className="container py-24 sm:py-32 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <GlowBackground
        blobs={[
          { className: "top-20 left-1/4 w-96 h-96 bg-primary/5", blur: 100, opacity: 0.45 },
          { className: "bottom-10 right-1/3 w-80 h-80 bg-secondary", blur: 120, opacity: 0.55 },
        ]}
      />

      <SectionHeader
        isInView={isInView}
        badge={{
          icon: <HelpCircle className="w-4 h-4 text-primary" />,
          text: "Got Questions?",
          iconRight: <Sparkles className="w-4 h-4 text-secondary" />,
        }}
        title={
          <>
            Frequently Asked <TitleGradient>Questions</TitleGradient>
          </>
        }
        titleClassName="text-3xl md:text-4xl lg:text-5xl font-bold relative"
        subtitle="Everything you need to know about joining and contributing to our community"
      />

      {/* FAQ Accordion — Radix via ui/accordion : aria-expanded/aria-controls et
          navigation clavier fournis, au lieu du bouton fait main (AUDIT.md A2) */}
      <m.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <Accordion type="multiple" className="max-w-4xl mx-auto space-y-4">
          {faqData.map(({ question, answer, value }: FAQItemProps, index) => {
            const isHovered = hoveredItem === value;

            return (
              <m.div
                key={value}
                className="relative perspective-1000"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                onMouseEnter={() => setHoveredItem(value)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Animated border gradient */}
                <m.div
                  className="absolute -inset-0.5 rounded-xl opacity-0 -z-10"
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: "linear-gradient(45deg, rgba(var(--primary-rgb), 0.5), rgba(147, 51, 234, 0.5))",
                  }}
                />

                <m.div
                  className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden"
                  whileHover={{
                    y: -2,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                  }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                >
                  <AccordionItem value={value} className="border-b-0">
                    <AccordionTrigger className="p-6 hover:no-underline text-left group gap-4">
                      <span className="flex items-center gap-4 flex-1">
                        <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <HelpCircle className="w-5 h-5 text-primary dark:text-secondary" />
                        </span>

                        <span className="text-lg font-semibold flex-1 group-hover:text-primary transition-colors duration-300">
                          {question}
                        </span>
                      </span>
                    </AccordionTrigger>

                    <AccordionContent className="px-6 pb-6 pl-20">
                      <div className="text-muted-foreground leading-relaxed">
                        {answer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Subtle glow effect */}
                  {isHovered && (
                    <m.div
                      className="absolute inset-0 rounded-xl opacity-50 -z-10"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 0.5,
                        boxShadow: "0 0 30px rgba(var(--primary-rgb), 0.2)"
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </m.div>
              </m.div>
            );
          })}
        </Accordion>
      </m.div>

      {/* Contact section */}
      <m.div 
        className="text-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <m.div
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card/50 backdrop-blur-sm border border-border/50"
          whileHover={{ scale: 1.05, y: -2 }}
          transition={{ duration: 0.3 }}
        >
          <MessageCircle className="w-5 h-5 text-primary" />
          <span className="text-lg font-medium">Still have questions?</span>
          <m.a
            rel="noreferrer noopener"
            href="https://github.com/PythonCameroon"
            className="text-primary font-semibold hover:underline transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact us
          </m.a>
        </m.div>
      </m.div>
    </m.section>
  );
};
