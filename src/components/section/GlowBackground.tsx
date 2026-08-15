// Fond décoratif commun aux sections (AUDIT.md Q1) : halos flous statiques
// (rendus statiques lors de P2) + motif de grille optionnel.

export interface GlowBlob {
  /** Position, taille et couleur Tailwind, ex. "top-10 left-1/4 w-72 h-72 bg-primary/10" */
  className: string;
  /** Rayon de flou en px (défaut 100) */
  blur?: number;
  /** Opacité inline ; omise si la couleur porte déjà son opacité (bg-primary/10) */
  opacity?: number;
}

const GRID_PATTERN =
  "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMyMDIwMjAiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMzBjMCAxNi41Ny0xMy40MyAzMC0zMCAzMFMwIDQ2LjU3IDAgMzAgMTMuNDMgMCAzMCAwczMwIDEzLjQzIDMwIDMweiIgc3Ryb2tlPSIjZmZmZmZmMDUiIHN0cm9rZS13aWR0aD0iLjUiLz48cGF0aCBkPSJNMTI5LjUgMTB2MTQwTTEyOSAyOWgtMTI5TTE0My41IDI5aC0xNC41IiBzdHJva2U9IiNmZmZmZmYwNSIgc3Ryb2tlLXdpZHRoPSIuNSIvPjwvZz48L3N2Zz4=')";

interface GlowBackgroundProps {
  blobs: GlowBlob[];
  /** Affiche le motif de grille à l'opacité donnée (ex. 0.02) */
  gridOpacity?: number;
  /** Classes additionnelles du conteneur (ex. "overflow-hidden") */
  className?: string;
}

export const GlowBackground = ({ blobs, gridOpacity, className = "" }: GlowBackgroundProps) => (
  <div className={`absolute inset-0 -z-10 ${className}`} aria-hidden>
    {blobs.map(({ className: blobClassName, blur = 100, opacity }, i) => (
      <div
        key={i}
        className={`absolute rounded-full ${blobClassName}`}
        style={{ filter: `blur(${blur}px)`, ...(opacity !== undefined && { opacity }) }}
      />
    ))}

    {gridOpacity !== undefined && (
      <div
        className="absolute inset-0"
        style={{ backgroundImage: GRID_PATTERN, opacity: gridOpacity }}
      />
    )}
  </div>
);
