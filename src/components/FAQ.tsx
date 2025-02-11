import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  return (
    <section id="faq" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion type="single" collapsible className="w-full AccordionRoot">
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">{question}</AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <a
          rel="noreferrer noopener"
          href="https://github.com/PythonCameroon"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contact us
        </a>
      </h3>
    </section>
  );
};
