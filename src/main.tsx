import React from "react";
import ReactDOM from "react-dom/client";
import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import App from "./App.tsx";
import { ThemeProvider } from "@/providers/theme-provider.tsx";
import { LanguageProvider } from "@/components/language.tsx";
import "./i18n";
// Fonts auto-hébergées (AUDIT.md P6) — uniquement variantes et sous-ensembles latins utilisés,
// font-display: swap inclus (DotGothic16 complet = ~120 subsets japonais inutiles ici)
import "@fontsource/dotgothic16/latin-400.css";
import "@fontsource/space-mono/latin-400.css";
import "@fontsource/space-mono/latin-700.css";
import "@fontsource/space-mono/latin-ext-400.css";
import "@fontsource/space-mono/latin-ext-700.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        {/* strict: seuls les composants `m.` (chargés à la demande) sont autorisés — voir AUDIT.md P1 */}
        <LazyMotion features={domAnimation} strict>
          <MotionConfig reducedMotion="user">
            <App />
          </MotionConfig>
        </LazyMotion>
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
);
