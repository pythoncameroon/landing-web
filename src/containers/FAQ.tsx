import { useState, useRef } from "react";
import { m, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle, HelpCircle, Sparkles } from "lucide-react";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "What is Python Cameroon?",
    answer:
      "Python Cameroon is a vibrant community dedicated to fostering Python development, networking, and collaboration among developers in Cameroon. We provide mentorship, resources, and events to support Python enthusiasts at all levels.",
    value: "item-1",
  },
  {
    question: "How can I join the Python Cameroon community?",
    answer:
      "You can join Python Cameroon by connecting with us on our social media channels, participating in our meetups, and engaging in discussions on our online platforms such as Discord and GitHub.",
    value: "item-2",
  },
  {
    question: "Does Python Cameroon offer mentorship programs?",
    answer:
      "Yes! We have mentorship programs where experienced Python developers guide beginners through learning Python, contributing to open-source projects, and career growth.",
    value: "item-3",
  },
  {
    question: "Are there Python meetups or events in Cameroon?",
    answer:
      "Absolutely! We organize regular meetups, workshops, and hackathons where developers can network, collaborate on projects, and improve their Python skills.",
    value: "item-4",
  },
  {
    question: "How can I contribute to Python Cameroon?",
    answer:
      "You can contribute by sharing knowledge, mentoring beginners, participating in projects, and helping organize events. Contributions to our GitHub repositories and volunteering at community events are also highly appreciated!",
    value: "item-5",
  },
];

export const FAQ = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const toggleItem = (value: string) => {
    setOpenItems(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  return (
    <m.section 
      id="faq" 
      ref={sectionRef}
      className="container py-24 sm:py-32 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-primary/5"
          style={{ filter: "blur(100px)", opacity: 0.45 }}
        />

        <div
          className="absolute bottom-10 right-1/3 w-80 h-80 rounded-full bg-secondary"
          style={{ filter: "blur(120px)", opacity: 0.55 }}
        />
      </div>

      {/* Section header */}
      <m.div 
        className="relative mb-16 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
        transition={{ duration: 0.8 }}
      >
        <m.div
          className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          <HelpCircle className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Got Questions?</span>
          <Sparkles className="w-4 h-4 text-secondary" />
        </m.div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold relative">
          Frequently Asked{" "}
          <span className="bg-gradient-to-r from-primary via-secondary to-primary text-transparent bg-clip-text relative">
            Questions
            {/* Glowing effect behind text */}
            <span
              className="absolute -inset-2 rounded-lg blur-xl -z-10"
              style={{
                background: "linear-gradient(to right, rgba(var(--primary-rgb), 0.3), rgba(147, 51, 234, 0.3), rgba(var(--primary-rgb), 0.3))",
                opacity: 0.3,
              }}
            />
          </span>
        </h2>
        
        {/* Animated divider */}
        <m.div 
          className="h-1 w-0 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-6"
          animate={isInView ? { width: 100 } : { width: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        />

        <m.p
          className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Everything you need to know about joining and contributing to our community
        </m.p>
      </m.div>

      {/* FAQ Accordion */}
      <m.div 
        className="max-w-4xl mx-auto space-y-4"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        {FAQList.map(({ question, answer, value }: FAQProps, index) => {
          const isOpen = openItems.includes(value);
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
                {/* Question header */}
                <m.button
                  className="w-full p-6 text-left flex items-center justify-between group"
                  onClick={() => toggleItem(value)}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <m.div
                      className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"
                      animate={{
                        backgroundColor: isOpen ? "rgba(var(--primary-rgb), 0.2)" : "rgba(var(--primary-rgb), 0.1)",
                        scale: isOpen ? 1.1 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <m.div
                        animate={{ rotate: isOpen ? 360 : 0 }}
                        transition={{ duration: 0.5, type: "spring" }}
                      >
                        <HelpCircle className="w-5 h-5 text-primary dark:text-secondary" />
                      </m.div>
                    </m.div>
                    
                    <m.h3 
                      className="text-lg font-semibold flex-1 group-hover:text-primary transition-colors duration-300"
                      animate={{ 
                        x: isOpen ? 5 : 0,
                        color: isOpen ? "hsl(var(--primary))" : "hsl(var(--foreground))"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {question}
                    </m.h3>
                  </div>
                  
                  <m.div
                    animate={{ 
                      rotate: isOpen ? 180 : 0,
                      scale: isHovered ? 1.1 : 1
                    }}
                    transition={{ duration: 0.3, type: "spring" }}
                  >
                    <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </m.div>
                </m.button>

                {/* Answer content */}
                <AnimatePresence>
                  {isOpen && (
                    <m.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <m.div
                        className="px-6 pb-6 pl-20"
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                      >
                        <div className="text-muted-foreground leading-relaxed">
                          {answer}
                        </div>
                      </m.div>
                    </m.div>
                  )}
                </AnimatePresence>

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
