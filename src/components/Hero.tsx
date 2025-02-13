import { useState, useEffect } from "react";

export const Hero = () => {
  const [mapUrl, setMapUrl] = useState("");

  useEffect(() => {
    setMapUrl("https://www.motosha.com/files/preview/2000x1336/24824-flag-of-cameroon.jpg");
  }, []);

  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6 animate-fade-in">
        <main className="text-5xl md:text-6xl font-extrabold leading-tight">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#FFD43B] to-[#FFE873] text-transparent bg-clip-text animate-bounce">
              Python
            </span>{" "}
            is
          </h1>{" "}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#306998] to-[#4B8BBE] text-transparent bg-clip-text">
              Fun!
            </span>
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0 animate-fade-in-up">
          Unleash your creativity with Python. Whether it's building web apps,
          automating tasks, or exploring AI – Python makes it all possible!
        </p>
      </div>

      {/* Cameroon Map Display */}
      <div className="shadow-lg rounded-2xl overflow-hidden animate-zoom-in">
        {mapUrl && (
          <img
            src={mapUrl}
            alt="Cameroon Map"
            className="w-full max-w-md rounded-lg hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>
    </section>
  );
};
