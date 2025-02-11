import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Linkedin, Github, X } from "lucide-react";

interface TeamProps {
  imageUrl: string;
  name: string;
  position: string;
  description: string;
  socialNetworks: SociaNetworkslProps[];
}

interface SociaNetworkslProps {
  name: string;
  url: string;
}

const teamList: TeamProps[] = [
  {
    imageUrl: "https://media.licdn.com/dms/image/v2/D4E03AQHnmVB6FQ2UQA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1726093532105?e=1744848000&v=beta&t=sJUwfm7EKodWlW-yPcahAIAuktZ3s1NAHr_Dxap68e8",
    name: "Steve Yonkue",
    position: "Backend and Cloud Engineer",
    description: "Expert in Python and backend development.",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/yokwejuste/",
      },
      {
        name: "Github",
        url: "https://github.com/yokwejuste",
      },
      {
        name: "X",
        url: "https://x.com/yokwejuste",
      },
    ],
  },
  {
    imageUrl: "https://media.licdn.com/dms/image/v2/D4E03AQHmVQ509cUVaA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718527201412?e=1744848000&v=beta&t=KcXhaBXUij0f5Qkc7zgmHNw86ecmWXhOXUhAFBXDiAA",
    name: "Edmond Makolle",
    position: "Software Engineer",
    description: "Passionate about UI/UX and React.js.",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/edmond-makolle-99716b1a2/",
      },
      {
        name: "Github",
        url: "https://github.com/Edmond22-prog",
      },
      {
        name: "X",
        url: "https://x.com/EdmondMakolle",
      },
    ],
  },
  {
    imageUrl: "https://media.licdn.com/dms/image/v2/D4E03AQE_tzGrQnf2QQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1704332517739?e=1744848000&v=beta&t=zdmpiFY5KuuMPOl6y-GQC_hnZ4QRcTkjGNfuuj4DUdI",
    name: "Loni Tande",
    position: "Data Engineer",
    description: "Building AI models and deep learning systems.",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/lonitandemiriamebenye/",
      },
      {
        name: "Github",
        url: "https://github.com/Mimi97-aqua/",
      },
      {
        name: "X",
        url: "https://x.com/VesekeM",
      },
    ],
  },
  {
    imageUrl: "https://i.pravatar.cc/150?img=17",
    name: "Joel Fah",
    position: "Cybersecurity Engineer",
    description: "Securing applications and ethical hacking.",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/imajin/",
      },
      {
        name: "Github",
        url: "https://github.com/Joel-Fah",
      },
      {
        name: "X",
        url: "https://x.com/FahDejon",
      },
    ],
  },
  {
    imageUrl: "https://media.licdn.com/dms/image/v2/D4E03AQETL5spp-s2xg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1730360240208?e=1744848000&v=beta&t=I_NbXLR9bh3_gauXxvGv73MCROlS4vhnb5hiSm95RzY",
    name: "ImaJin (Jr Patrick)",
    position: "DevOps Engineer",
    description: "Automating deployments and managing cloud infrastructure.",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "www.linkedin.com/in/imajin14",
      },
      {
        name: "Github",
        url: "https://github.com/ImaJin14",
      },
      {
        name: "X",
        url: "https://x.com/Jr_Patrick14",
      },
    ],
  },
];

export const Team = () => {
  const socialIcon = (iconName: string) => {
    switch (iconName) {
      case "Linkedin":
        return <Linkedin size="20" />;
      case "Github":
        return <Github size="20" />;
      case "X":
        return <X size="24" />;
    }
  };

  return (
    <section
      id="team"
      className="container py-20 sm:py-28"
    >
      <h2 className="text-3xl md:text-4xl font-bold">
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Meet the Python Cameroon Team
        </span>
      </h2>

      <p className="mt-4 mb-10 text-xl text-muted-foreground">
        Dedicated team advancing Python development in Cameroon.
      </p>

      <div className="grid md:grid-cols-2.5 lg:grid-cols-5 gap-9 gap-y-10">
        {teamList.map(
          ({ imageUrl, name, position, description, socialNetworks }: TeamProps) => (
            <Card
              key={name}
              className="bg-muted/50 relative mt-8 flex flex-col justify-center items-center"
            >
              <CardHeader className="mt-8 flex justify-center items-center pb-2">
                <img
                  src={imageUrl}
                  alt={`${name} ${position}`}
                  className="absolute -top-12 rounded-full w-24 h-24 aspect-square object-cover"
                />
                <CardTitle className="text-center">{name}</CardTitle>
                <CardDescription className="text-primary">
                  {position}
                </CardDescription>
              </CardHeader>

              <CardContent className="text-center pb-2">
                <p>{description}</p>
              </CardContent>

              <CardFooter>
                {socialNetworks.map(({ name, url }: SociaNetworkslProps) => (
                  <div key={name}>
                    <a
                      rel="noreferrer noopener"
                      href={url}
                      target="_blank"
                      className={buttonVariants({
                        variant: "ghost",
                        size: "sm",
                      })}
                    >
                      <span className="sr-only">{name} icon</span>
                      {socialIcon(name)}
                    </a>
                  </div>
                ))}
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </section>
  );
};
