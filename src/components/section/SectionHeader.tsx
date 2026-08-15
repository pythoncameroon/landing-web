import { m } from "framer-motion";
import type { ReactNode } from "react";

// En-tête de section commun (AUDIT.md Q1) : badge optionnel, titre h2,
// divider animé et sous-titre. Le dégradé de titre s'obtient en enveloppant
// la partie mise en avant dans <TitleGradient>.

/** Partie de titre en dégradé primary→secondary avec halo flou derrière. */
export const TitleGradient = ({ children }: { children: ReactNode }) => (
  <span className="relative inline-block">
    <span className="bg-gradient-to-r from-primary via-secondary to-primary text-transparent bg-clip-text">
      {children}
    </span>
    <span
      aria-hidden
      className="absolute -inset-1 rounded-lg blur-xl -z-10"
      style={{
        opacity: 0.25,
        background:
          "linear-gradient(to right, rgba(var(--primary-rgb), 0.25), rgba(147, 51, 234, 0.25), rgba(var(--primary-rgb), 0.25))",
      }}
    />
  </span>
);

interface SectionBadge {
  icon?: ReactNode;
  text: string;
  iconRight?: ReactNode;
}

interface SectionHeaderProps {
  /** Contrôle l'animation d'entrée (useInView de la section parente) */
  isInView: boolean;
  title: ReactNode;
  badge?: SectionBadge;
  subtitle?: ReactNode;
  /** Largeur finale du divider en px (défaut 100) */
  dividerWidth?: number;
  titleClassName?: string;
  subtitleClassName?: string;
}

export const SectionHeader = ({
  isInView,
  title,
  badge,
  subtitle,
  dividerWidth = 100,
  titleClassName = "text-3xl md:text-4xl font-bold relative",
  subtitleClassName = "text-lg text-muted-foreground mt-6 max-w-2xl mx-auto",
}: SectionHeaderProps) => (
  <m.div
    className="relative mb-16 text-center"
    initial={{ opacity: 0, y: -30 }}
    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
    transition={{ duration: 0.8 }}
  >
    {badge && (
      <m.div
        className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
      >
        {badge.icon}
        <span className="text-sm font-medium text-primary">{badge.text}</span>
        {badge.iconRight}
      </m.div>
    )}

    <h2 className={titleClassName}>{title}</h2>

    <m.div
      className="h-1 w-0 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-6"
      animate={isInView ? { width: dividerWidth } : { width: 0 }}
      transition={{ delay: 0.4, duration: 0.8 }}
    />

    {subtitle && (
      <m.p
        className={subtitleClassName}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {subtitle}
      </m.p>
    )}
  </m.div>
);
