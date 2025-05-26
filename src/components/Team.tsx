import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Linkedin, Github, X, Users, Star, MapPin, Sparkles, User } from "lucide-react";

interface TeamProps {
  imageUrl: string;
  name: string;
  position: string;
  description: string;
  socialNetworks: SociaNetworkslProps[];
  githubUsername?: string; // Add GitHub username for avatar fallback
}

interface SociaNetworkslProps {
  name: string;
  url: string;
}

const teamList: TeamProps[] = [
  {
    imageUrl: "https://media.licdn.com/dms/image/v2/D4E03AQHnmVB6FQ2UQA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1726093532105?e=1744848000&v=beta&t=sJUwfm7EKodWlW-yPcahAIAuktZ3s1NAHr_Dxap68e8",
    name: "Steve Yonkeu",
    position: "Backend and Cloud Engineer",
    description: "A backend engineer and tech community leader, Co-founder of Django Cameroon and Python Cameroon.",
    githubUsername: "yokwejuste", // Add GitHub username for fallback
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
    position: "Backend Engineer",
    description: "Python backend engineer focused on server logic, databases, and performance.",
    githubUsername: "Edmond22-prog",
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
    description: "Passionate about AI models, deep learning systems, Big DATA and Robotics.",
    githubUsername: "Mimi97-aqua",
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
    imageUrl: "https://media.licdn.com/dms/image/v2/D4E03AQHb_R-FzrNhgw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1712785496110?e=1744848000&v=beta&t=rpf_JSd4x0Wrpl6rzBMhf5B7klBrkJMNVR_QCG2Yie4",
    name: "Joel Fah",
    position: "UI/UX Designer",
    description: "Passionate about UI/UX Designs",
    githubUsername: "Joel-Fah",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/joelfah/",
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
    position: "Data Engineer",
    description: "Automating deployments and managing of large datasets.",
    githubUsername: "ImaJin14",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/imajin14/",
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

// Enhanced image component with fallback system
const ProfileImage = ({ member, isHovered }: { member: TeamProps, isHovered: boolean }) => {
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(member.imageUrl);
  const [isLoading, setIsLoading] = useState(true);
  const [fallbackAttempt, setFallbackAttempt] = useState(0);

  // Function to extract LinkedIn profile ID from URL
  const getLinkedInProfileId = (linkedinUrl: string) => {
    const match = linkedinUrl.match(/\/in\/([^/]+)/);
    return match ? match[1] : null;
  };

  // Get LinkedIn URL from social networks
  const linkedInNetwork = member.socialNetworks.find(network => network.name === "Linkedin");
  const linkedInProfileId = linkedInNetwork ? getLinkedInProfileId(linkedInNetwork.url) : null;

  // Fallback image sources in order of preference
  const getFallbackImages = () => {
    const fallbacks = [];
    
    // 1. Try alternative LinkedIn image URLs (different formats)
    if (linkedInProfileId) {
      // Try different LinkedIn image endpoints
      fallbacks.push(`https://media.licdn.com/dms/image/v2/D4E03AQH${linkedInProfileId}/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/${linkedInProfileId}?e=2147483647&v=beta&t=${Date.now()}`);
    }
    
    // 2. GitHub avatar (most reliable)
    if (member.githubUsername) {
      fallbacks.push(`https://github.com/${member.githubUsername}.png?size=200`);
      fallbacks.push(`https://avatars.githubusercontent.com/${member.githubUsername}?s=200&v=4`);
    }
    
    // 3. Gravatar based on name
    const createHash = (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
      }
      return Math.abs(hash).toString(16);
    };
    const nameHash = createHash(member.name.toLowerCase().replace(/\s+/g, ''));
    fallbacks.push(`https://www.gravatar.com/avatar/${nameHash}?d=identicon&s=200`);
    
    // 4. UI Avatars (generates avatar from initials)
    fallbacks.push(`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=200&background=random&color=fff&bold=true&format=png`);
    
    // 5. Robohash (fun robot avatars)
    fallbacks.push(`https://robohash.org/${encodeURIComponent(member.name)}?size=200x200&set=set1`);
    
    return fallbacks;
  };

  const tryNextFallback = async () => {
    const fallbacks = getFallbackImages();
    
    if (fallbackAttempt < fallbacks.length) {
      const nextSrc = fallbacks[fallbackAttempt];
      setFallbackAttempt(prev => prev + 1);
      
      // Test if the image loads
      try {
        const img = new Image();
        img.crossOrigin = "anonymous";
        
        await new Promise((resolve, reject) => {
          img.onload = () => {
            setImageSrc(nextSrc);
            setIsLoading(false);
            setImageError(true); // Mark as using fallback
            resolve(true);
          };
          img.onerror = reject;
          img.src = nextSrc;
        });
      } catch (error) {
        // If this fallback fails, try the next one
        if (fallbackAttempt + 1 < fallbacks.length) {
          setTimeout(tryNextFallback, 100);
        } else {
          // All fallbacks failed, show placeholder
          setImageSrc('');
          setIsLoading(false);
          setImageError(true);
        }
      }
    } else {
      // All fallbacks exhausted
      setImageSrc('');
      setIsLoading(false);
      setImageError(true);
    }
  };

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      setFallbackAttempt(0);
      tryNextFallback();
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    // Reset states when member changes
    setImageError(false);
    setImageSrc(member.imageUrl);
    setIsLoading(true);
    setFallbackAttempt(0);
  }, [member.imageUrl, member.name]);

  return (
    <motion.div
      className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20"
      animate={{
        boxShadow: isHovered ? 
          "0 0 30px rgba(var(--primary-rgb), 0.4)" : 
          "0 0 0 rgba(var(--primary-rgb), 0)"
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Loading spinner */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-muted/50 backdrop-blur-sm z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-6 h-6 border-2 border-primary border-r-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Image */}
      {imageSrc ? (
        <motion.img
          src={imageSrc}
          alt={`${member.name} - ${member.position}`}
          className="w-full h-full object-cover"
          onError={handleImageError}
          onLoad={handleImageLoad}
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
      ) : (
        // Default placeholder when all images fail
        <motion.div
          className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <User className="w-8 h-8 text-primary/60" />
        </motion.div>
      )}
      
      {/* Overlay effect on hover */}
      <motion.div
        className="absolute inset-0 bg-primary/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Fallback indicator */}
      {imageError && imageSrc && (
        <motion.div
          className="absolute bottom-0 right-0 w-4 h-4 bg-yellow-500/80 rounded-full border border-background flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          title="Using fallback image"
        >
          {member.githubUsername && imageSrc.includes('github') ? (
            <Github className="w-2 h-2 text-white" />
          ) : (
            <User className="w-2 h-2 text-white" />
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export const Team = () => {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const socialIcon = (iconName: string) => {
    switch (iconName) {
      case "Linkedin":
        return <Linkedin size="18" />;
      case "Github":
        return <Github size="18" />;
      case "X":
        return <X size="18" />;
    }
  };

  return (
    <motion.section
      id="team"
      ref={sectionRef}
      className="container py-20 sm:py-28 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute top-10 left-1/5 w-96 h-96 rounded-full bg-primary/5"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 40, 0],
            y: [0, -40, 0]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "blur(120px)" }}
        />
        
        <motion.div 
          className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-purple-500/5"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.4, 0.7, 0.4],
            x: [0, -30, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          style={{ filter: "blur(100px)" }}
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMyMDIwMjAiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMzBjMCAxNi41Ny0xMy40MyAzMC0zMCAzMFMwIDQ2LjU3IDAgMzAgMTMuNDMgMCAzMCAwczMwIDEzLjQzIDMwIDMweiIgc3Ryb2tlPSIjZmZmZmZmMDUiIHN0cm9rZS13aWR0aD0iLjUiLz48cGF0aCBkPSJNMTI5LjUgMTB2MTQwTTEyOSAyOWgtMTI5TTE0My41IDI5aC0xNC41IiBzdHJva2U9IiNmZmZmZmYwNSIgc3Ryb2tlLXdpZHRoPSIuNSIvPjwvZz48L3N2Zz4=')] opacity-[0.02]" />

        {/* Floating particles */}
        <AnimatePresence>
          {isInView && Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={`team-particle-${i}`}
              className="absolute rounded-full bg-primary"
              initial={{ 
                opacity: 0,
                x: "50%",
                y: "50%",
                scale: 0
              }}
              animate={{ 
                opacity: [0, 0.7, 0],
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                scale: [0, 1, 0]
              }}
              transition={{ 
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: i * 0.6,
                ease: "easeInOut"
              }}
              style={{ 
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                filter: "blur(1.5px)"
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Section header */}
      <motion.div 
        className="relative mb-16 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          <Users className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Our Amazing Team</span>
          <Star className="w-4 h-4 text-primary" />
        </motion.div>

        <motion.h2 
          className="text-3xl md:text-4xl lg:text-5xl font-bold relative"
          animate={{ filter: ["blur(0px)", "blur(0.3px)", "blur(0px)"] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
        >
          <motion.span
            className="bg-gradient-to-r from-primary via-purple-500 to-primary text-transparent bg-clip-text relative"
            animate={{ 
              backgroundPosition: ["0% center", "100% center", "0% center"],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ backgroundSize: "300% auto" }}
          >
            Meet the Python Cameroon Team
            {/* Glowing effect behind text */}
            <motion.span 
              className="absolute -inset-2 rounded-lg blur-xl -z-10"
              animate={{ 
                opacity: [0.2, 0.4, 0.2], 
              }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
              style={{ 
                background: "linear-gradient(to right, rgba(var(--primary-rgb), 0.3), rgba(147, 51, 234, 0.3), rgba(var(--primary-rgb), 0.3))",
              }}
            />
          </motion.span>
        </motion.h2>
        
        {/* Animated divider */}
        <motion.div 
          className="h-1 w-0 bg-gradient-to-r from-primary to-purple-500 rounded-full mx-auto mt-6"
          animate={isInView ? { width: 120 } : { width: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        />

        <motion.p
          className="text-xl text-muted-foreground mt-6 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Dedicated innovators advancing Python development in Cameroon through collaboration and expertise.
        </motion.p>
      </motion.div>

      {/* Team grid */}
      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 gap-y-12"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >        {teamList.map(
          (member: TeamProps, index) => {
            const isHovered = hoveredMember === member.name;
            
            return (
              <motion.div
                key={member.name}
                className="relative perspective-1000"
                initial={{ opacity: 0, y: 30, rotateX: 10 }}
                animate={isInView ? 
                  { opacity: 1, y: 0, rotateX: 0 } :
                  { opacity: 0, y: 30, rotateX: 10 }
                }
                transition={{ 
                  delay: 0.8 + index * 0.1,
                  duration: 0.7,
                  type: "spring",
                  stiffness: 100
                }}
                onMouseEnter={() => setHoveredMember(member.name)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                {/* Animated border gradient */}
                <motion.div
                  className="absolute -inset-0.5 rounded-2xl opacity-0 -z-10"
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    background: [
                      "linear-gradient(45deg, rgba(var(--primary-rgb), 0.6), rgba(147, 51, 234, 0.6))",
                      "linear-gradient(135deg, rgba(147, 51, 234, 0.6), rgba(var(--primary-rgb), 0.6))",
                      "linear-gradient(225deg, rgba(var(--primary-rgb), 0.6), rgba(147, 51, 234, 0.6))",
                      "linear-gradient(315deg, rgba(147, 51, 234, 0.6), rgba(var(--primary-rgb), 0.6))",
                    ]
                  }}
                  transition={{ 
                    opacity: { duration: 0.3 },
                    background: { duration: 4, repeat: Infinity }
                  }}
                />

                <motion.div
                  className="relative bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6 h-full flex flex-col items-center text-center overflow-hidden"
                  whileHover={{ 
                    y: -8,
                    rotateY: 5,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
                  }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                >                    {/* Profile image container */}
                  <motion.div
                    className="relative mb-6"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Rotating background gradient */}
                    <motion.div
                      className="absolute -inset-3 bg-gradient-to-r from-primary/30 via-purple-500/30 to-primary/30 rounded-full -z-10"
                      animate={{
                        rotate: isHovered ? 360 : 0,
                        scale: isHovered ? 1.1 : 1,
                        opacity: isHovered ? 0.7 : 0.3,
                      }}
                      transition={{ 
                        rotate: { duration: 8, ease: "linear" },
                        scale: { duration: 0.3 },
                        opacity: { duration: 0.3 }
                      }}
                      style={{ filter: "blur(15px)" }}
                    />
                      {/* Use the ProfileImage component with fallback system */}
                    <ProfileImage 
                      member={member}
                      isHovered={isHovered}
                    />

                    {/* Pulsing ring effect */}
                    {isHovered && (
                      <motion.div
                        className="absolute -inset-2 rounded-full border border-primary/30"
                        initial={{ scale: 1, opacity: 0 }}
                        animate={{ 
                          scale: [1, 1.5],
                          opacity: [0.5, 0]
                        }}
                        transition={{ 
                          duration: 1.5,
                          repeat: Infinity
                        }}
                      />
                    )}
                  </motion.div>                  {/* Member info */}
                  <motion.div 
                    className="flex-1 space-y-3"
                    animate={{ y: isHovered ? -2 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.h3 
                      className="text-xl font-bold"
                      animate={{
                        color: isHovered ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {member.name}
                    </motion.h3>
                    
                    <motion.div
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20"
                      whileHover={{ scale: 1.05 }}
                    >
                      <MapPin className="w-3 h-3 text-primary" />
                      <span className="text-sm text-primary font-medium">
                        {member.position}
                      </span>
                    </motion.div>
                    
                    <motion.p 
                      className="text-muted-foreground text-sm leading-relaxed"
                      animate={{ opacity: isHovered ? 1 : 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                      {member.description}
                    </motion.p>
                  </motion.div>

                  {/* Social links */}
                  <motion.div 
                    className="flex items-center gap-3 mt-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    {member.socialNetworks.map(({ name: socialName, url }: SociaNetworkslProps, socialIndex) => (
                      <motion.a
                        key={socialName}
                        href={url.startsWith('http') ? url : `https://${url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-muted/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
                        whileHover={{ 
                          scale: 1.1, 
                          y: -2,
                          boxShadow: "0 8px 20px rgba(var(--primary-rgb), 0.3)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          delay: 0.4 + socialIndex * 0.1,
                          duration: 0.3 
                        }}
                      >
                        {socialIcon(socialName)}
                      </motion.a>
                    ))}
                  </motion.div>

                  {/* Subtle glow effect on hover */}
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-50 -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: 0.5,
                        boxShadow: "0 0 40px rgba(var(--primary-rgb), 0.2)"
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  {/* Sparkle effects on hover */}
                  <AnimatePresence>
                    {isHovered && (
                      <>
                        {Array.from({ length: 3 }).map((_, i) => (
                          <motion.div
                            key={`sparkle-${i}`}
                            className="absolute"
                            initial={{ 
                              opacity: 0,
                              scale: 0,
                              x: Math.random() * 200 - 100,
                              y: Math.random() * 200 - 100
                            }}
                            animate={{ 
                              opacity: [0, 1, 0],
                              scale: [0, 1, 0],
                              rotate: [0, 180, 360]
                            }}
                            transition={{ 
                              duration: 2,
                              delay: i * 0.3,
                              repeat: Infinity,
                              repeatDelay: 1
                            }}
                          >
                            <Sparkles className="w-4 h-4 text-primary" />
                          </motion.div>
                        ))}
                      </>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          }
        )}
      </motion.div>
    </motion.section>
  );
};
