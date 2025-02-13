interface SponsorProps {
  icon: string; 
  name: string;
  link: string;
}

const sponsors: SponsorProps[] = [
  {
    icon: "https://avatars.githubusercontent.com/u/142497557?s=200&v=4",
    name: "Django Cameroon",
    link: "https://github.com/djangocameroon",
  },
  {
    icon: "https://avatars.githubusercontent.com/u/183505611?s=200&v=4", 
    name: "Angular Cameroon",
    link: "https://github.com/ngcameroon",
  },
];

export const Sponsors = () => {
  return (
    <section
      id="sponsors"
      className="container pt-24 sm:py-32"
    >
      <h2 className="text-center text-md lg:text-xl font-bold mb-8 text-primary">
        Partnering Organisations!
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
        {sponsors.map(({ icon, name, link }: SponsorProps) => (
          <div
            key={name}
            className="text-center"
          >
            <a href={link} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2">
              <img src={icon} alt={`${name} logo`} className="w-16 h-16" /> {/* Increased icon size */}
              <h3 className="text-lg font-semibold">{name}</h3> {/* Centered name under icon */}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};
