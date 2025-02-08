import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";



export const Applications = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="python-applications" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold">
        Explore
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text"> Python's Applications</span>
      </h2>

      <p className="text-xl text-muted-foreground pt-4 pb-8">
        Python is used in various fields, from web development to artificial intelligence.
        Hover over each section to learn more.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            image: "/src/assets/web-development.png",
            title: "Web Development",
            description: "Python is widely used for building websites with frameworks like Django and Flask.",
          },
          {
            image: "/src/assets/data-science.png",
            title: "Data Science",
            description: "Python is the go-to language for data analysis, visualization, and manipulation using Pandas and NumPy.",
          },
          {
            image: "/src/assets/machine-learning.png",
            title: "Machine Learning & AI",
            description: "Python is essential in AI with libraries like TensorFlow and scikit-learn.",
          },
          {
            image: "/src/assets/automation.png",
            title: "Automation & Scripting",
            description: "Automate repetitive tasks using Python scripts, Selenium, and BeautifulSoup.",
          },
          {
            image: "/src/assets/cybersecurity.png",
            title: "Cybersecurity",
            description: "Python is used in ethical hacking, penetration testing, and security analysis.",
          },
          {
            image: "/src/assets/game-development.png",
            title: "Game Development",
            description: "Python is used to create games with frameworks like Pygame and Panda3D.",
          },
        ].map(({ image, title, description }, index) => (
          <Card
            key={title}
            className="relative group overflow-hidden transition-all hover:shadow-lg"
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
          >
            <img src={image} alt={title} className="w-full h-40 object-cover transition-transform group-hover:scale-105" />
            <CardHeader>
              <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>

            <CardContent
              className={`absolute inset-0 bg-black/80 text-white p-4 opacity-0 transition-opacity duration-300 ${
                hovered === index ? "opacity-100" : ""
              }`}
            >
              {description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
