import { Statistics } from "./Statistics";
import pilot from "../assets/pilot.png";

export const About = () => {
  return (
    <section
      id="about"
      className="container py-24 sm:py-32"
    >
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <img
            src={pilot}
            alt="Python Illustration"
            className="w-[300px] object-contain rounded-lg"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  About{" "}
                </span>
                Our Python community
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
              Our community is your gateway to mastering Python. Explore hands-on
          tutorials that make programming easy and enjoyable. Whether you're a
          beginner or an advanced coder, we provide the guidance you need to
          excel in Python development, data science, and automation.              </p>
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};