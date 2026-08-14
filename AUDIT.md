# Audit Frontend — Handoff (2026-08-14)

Audit complet de la landing Python Cameroon (React 18 + Vite + Tailwind + shadcn + framer-motion).
Chaque tâche ci-dessous est **autonome** : elle contient le contexte, les fichiers concernés, la correction attendue et la vérification.
Pour traiter une tâche dans une nouvelle session : « Traite la tâche X de AUDIT.md ».

**État au moment de l'audit :** le build passe (`npm run build`), `npm run lint` échoue (1 erreur), aucun test, branche `feat/add-pycon-banner`.

## Ordre de traitement recommandé

| Priorité | Tâches | Pourquoi |
|---|---|---|
| 🔴 Critique | B1, B2, B3, B4 | Bugs visibles ou trompeurs pour l'utilisateur |
| 🟠 Haute | B5, B6, P1, P2, P3, S1 | Performance mobile + conversions + partage social |
| 🟡 Moyenne | A1–A5, P4–P6, Q1–Q3 | Accessibilité, dette, hygiène |
| 🟢 Basse | Q4, Q5, O1–O3 | Outillage, déploiement, docs |

Dépendances : B1 avant toute retouche visuelle (le design actuel est partiellement invisible). Q1 (refactor sections) de préférence après P1/P2 pour ne pas refactorer du code qui va être supprimé.

---

## B — Bugs confirmés

### B1 — Variables CSS HSL avec virgules : toutes les opacités Tailwind sont cassées 🔴
- **Fichiers :** `src/App.css` lignes 79–83 et 106–109 (`--primary`, `--secondary`, `--muted`, `--accent` en `166, 95%, 29%` avec virgules, dans `:root` ET `.dark`).
- **Problème (vérifié dans le CSS buildé) :** Tailwind génère `hsl(var(--primary) / .1)` pour `bg-primary/10`. Avec les virgules, ça devient `hsl(166, 95%, 29% / .1)` = CSS invalide → propriété silencieusement ignorée. Toutes les classes `bg-primary/xx`, `border-primary/xx`, `from-/via-/to-primary|secondary` (dégradés de titres, halos, badges, bordures — utilisées dans quasiment chaque section) ne s'affichent pas.
- **Correction :** notation espace shadcn : `--primary: 166 95% 29%;` etc. (4 variables × 2 blocs). Vérifier visuellement les 2 thèmes après coup : des couleurs jusqu'ici invisibles vont apparaître, certains effets pourront sembler soudain trop chargés.
- **Vérification :** `npm run build` puis grep `hsl(166, 95%` dans `dist/assets/*.css` → 0 occurrence ; contrôle visuel light + dark.

### B2 — `--primary-rgb` contient du HSL utilisé dans `rgba(...)` : tous les glows inline sont morts 🔴
- **Fichiers :** `src/index.css` lignes 1–11 (`--primary-rgb: 166, 95%, 29%`, `--secondary-rgb: 50, 96%, 59%`). Consommé par `rgba(var(--primary-rgb), 0.x)` dans Hero, Team, FAQ, Sponsors, Newsletter, About, Applications, Statistics, HowItWorks, Services.
- **Problème :** `rgba(166, 95%, 29%, 0.4)` est invalide (composantes HSL dans rgba) → tous les box-shadow/glow/gradients inline échouent silencieusement. Cas aggravé : `src/components/Statistics.tsx:117` fait `hsl(var(--primary-rgb))`.
- **Correction :** convertir en vrais RGB : `--primary-rgb: 4, 144, 109;` (hsl 166 95% 29%) et `--secondary-rgb: 250, 217, 55;` (hsl 50 96% 59%) — recalculer précisément. Corriger Statistics.tsx:117 (utiliser `rgba(var(--primary-rgb), 1)` ou `hsl(var(--primary))`).
- **Vérification :** contrôle visuel des glows au hover (cartes Team, FAQ, sponsors).

### B3 — Formulaire newsletter factice : promet un email qui n'arrive jamais 🔴
- **Fichier :** `src/containers/Newsletter.tsx` lignes 13–27.
- **Problème :** `handleSubmit` = `setTimeout` 1,5 s + `console.log(email)` + message « Thanks for subscribing! Check your email ». Aucune collecte réelle. Input sans `type="email"` ni `required` ni validation. `e: any` = la seule erreur ESLint du repo (`npm run lint` échoue à cause d'elle).
- **Correction :** brancher un vrai backend (à décider avec l'équipe : Mailchimp/Buttondown/API maison/Google Form). En attendant la décision : a minima typer `React.FormEvent<HTMLFormElement>`, `type="email"` + `required`, et retirer le faux message de succès (ou le remplacer par un lien direct vers le canal d'inscription réel).
- **Vérification :** `npm run lint` passe ; une soumission aboutit à une inscription réelle vérifiable.

### B4 — i18n non fonctionnelle : le bouton FR/EN ne traduit rien 🔴 — ✅ traité (court terme)
- **Fichiers :** `src/i18n.ts` (une seule clé `welcome`, jamais utilisée), `src/components/language.tsx` (le switcher), tous les containers (textes anglais en dur), `index.html` (`lang="en"` figé). `i18next-browser-languagedetector` est installé mais non branché.
- **Problème :** le bouton change l'état et localStorage mais rien ne change à l'écran — fonctionnalité visible qui ment, dans un pays majoritairement francophone.
- **Correction appliquée :** bouton `LanguageSwitcher` retiré de `src/layouts/Navbar.tsx` (mobile + desktop) tant que l'i18n réel n'est pas branché. `src/components/language.tsx` (provider/contexte/switcher) et `src/i18n.ts` restent en place, inutilisés côté UI, pour la reprise du chantier complet plus tard.
- **Reste à faire (gros chantier, découpable) :** extraire tous les textes vers `resources.en/fr`, utiliser `t()` dans chaque composant, brancher le languagedetector, mettre à jour `document.documentElement.lang` au changement, puis réintroduire le switcher.
- **Vérification :** `npm run build` OK ; plus aucun bouton FR/EN dans la navbar (mobile + desktop).

### B5 — Liens morts et ancre cassée 🟠
- **`src/containers/Hero.tsx:384`** : CTA principal « Explore Python » pointe `#About` mais la section a `id="about"` (ancres sensibles à la casse) → le bouton ne fait rien. Corriger en `#about`.
- **`src/layouts/Footer.tsx:59`** : lien Youtube = `"#"` → mettre la vraie URL de la chaîne ou retirer.
- **`src/layouts/Footer.tsx:53`** : lien « Community » → `#community`, id inexistant → pointer vers une section réelle ou retirer.
- **`src/containers/Sponsors.tsx:333`** : bouton « Become a Partner » sans onClick ni href → lien mailto/formulaire de contact, ou retirer.
- **Vérification :** cliquer chaque lien du site ; aucune ancre morte.

### B6 — HTML invalide : `<a>` imbriqué dans `<button>` 🟠
- **Fichier :** `src/containers/Applications.tsx` lignes 492–518.
- **Problème :** `<motion.a>` dans `<motion.button>` (interdit par la spec, comportement clavier/lecteur d'écran imprévisible) + overlay dégradé dupliqué 2 fois.
- **Correction :** supprimer le `<motion.button>`, garder le `<motion.a>` seul stylé en bouton, un seul overlay.

### B7 — Hooks : fuite de listener + garde inutile + double toggle 🟡
- **`src/components/ScrollToTop.tsx:8–16`** : listener `scroll` jamais retiré → retourner un cleanup `removeEventListener`.
- **`src/providers/theme-provider.tsx:69–76`** : `context === undefined` jamais vrai (valeur par défaut fournie à `createContext`) → passer le défaut à `null` pour rendre la garde effective ; bonus : écouter `matchMedia("(prefers-color-scheme: dark)").addEventListener("change", …)` quand theme === "system".
- **`src/layouts/Navbar.tsx:184`** : `onClick={() => setIsOpen(true)}` sur l'icône `Menu` à l'intérieur du `SheetTrigger` qui gère déjà l'ouverture → supprimer le onClick.

---

## P — Performance

### P1 — Bundle JS de 600 kB (189 kB gzip) pour une landing statique 🟠
- **Constat build :** `dist/assets/index-*.js` = 599,81 kB. Cause principale : framer-motion importé dans ~17 fichiers pour des effets majoritairement réalisables en CSS.
- **Correction :** remplacer les animations simples (fades, slides, gradients animés, soulignements) par des transitions/`@keyframes` CSS ; garder framer-motion uniquement où il apporte (springs au hover des cartes, AnimatePresence du menu). Ajouter `build.rollupOptions.output.manualChunks` pour séparer vendor si pertinent.
- **Objectif :** < 250 kB minifié. **Vérification :** sortie de `npm run build`.

### P2 — Dizaines d'animations infinies qui tournent en permanence (hors écran inclus) 🟠
- **Constat :** chaque section a 2 blobs `blur(100–120px)` animés en boucle + 6–12 particules `repeat: Infinity` + titres `backgroundPosition` animés en continu ; `src/components/HeroNetwork.tsx` = canvas 70 nœuds O(n²) à 60 fps ; les fonds ne sont PAS conditionnés à `isInView`.
- **Problème :** CPU/GPU en continu → batterie, chauffe, scroll saccadé sur mobiles modestes (audience principale au Cameroun).
- **Correction :** (1) conditionner toutes les animations de fond à `isInView` ; (2) réduire le nombre de particules/blobs ; (3) HeroNetwork : pauser via IntersectionObserver + `document.visibilityState`, réduire NODE_COUNT sur mobile ; (4) supprimer l'animation de flou des titres (`filter: blur(0→0.5→0)` — voir aussi A4) ; (5) passer les `useInView({ once: false })` en `once: true` partout (supprime aussi le clignotement du contenu quand on remonte la page).
- **Vérification :** profil Chrome Performance : ~0 % CPU au repos une fois la page chargée et immobile.

### P3 — Images Unsplash distantes non optimisées + favicon de 428 kB 🟠
- **`src/containers/Applications.tsx:27–98`** : 6 images Unsplash ~2000 px pour des cartes ~400 px, sans `loading="lazy"` ni `width/height` (CLS), domaine tiers.
  → Télécharger, recadrer, convertir WebP, servir localement avec `srcset` + `loading="lazy"` + dimensions.
- **`src/assets/favicon/favicon.svg`** : 428 kB (PNG base64 embarqué ?), référencé dans le `<head>` → re-exporter un vrai SVG vectoriel (< 10 kB) ou retirer la ligne au profit du PNG 96px.
- **`src/assets/images/flag-cameroon.webp`** : 264 kB (image hero) → recompresser (~80 kB visuellement équivalent).
- **Vérification :** onglet Network < 1 Mo au premier chargement (hors fonts).

### P4 — `prefers-reduced-motion` totalement ignoré 🟡
- **Correction 1 ligne :** wrapper l'app dans `<MotionConfig reducedMotion="user">` (framer-motion) dans `src/main.tsx` ; pour les animations CSS restantes, media query `@media (prefers-reduced-motion: reduce)`.
- **Gain :** WCAG 2.3.3 + batterie. À faire en même temps que P2.

### P5 — Scroll listener avec layout thrashing dans la Navbar 🟡
- **Fichier :** `src/layouts/Navbar.tsx:81–111`.
- **Problème :** à chaque event scroll : `getElementById` + `getBoundingClientRect` par section → recalculs de layout forcés.
- **Correction :** IntersectionObserver pour `activeSection` ; listener `{ passive: true }` + comparaison simple pour `scrolled`.

### P6 — Google Fonts bloquantes 🟢
- **Fichier :** `index.html:36–38` (DotGothic16 + 4 variantes Space Mono).
- **Correction :** auto-héberger (fontsource) avec `font-display: swap`, ne garder que les variantes utilisées.

---

## A — Accessibilité

### A1 — Contenu essentiel uniquement au hover 🟡
- **`src/containers/Applications.tsx`** : descriptions + tech stack visibles seulement au survol (« Hover over each section to learn more ») → invisible au clavier et sur tactile (majorité du trafic). **`src/containers/Sponsors.tsx`** : « Visit » uniquement au hover.
- **Correction :** afficher le contenu par défaut, ou le rendre toggleable au tap/focus (et déclencher aussi sur `onFocus`).

### A2 — FAQ accordéon fait main sans ARIA alors que Radix est installé 🟡
- **Fichier :** `src/containers/FAQ.tsx:240` (bouton custom sans `aria-expanded`/`aria-controls`).
- **Correction :** utiliser `src/components/ui/accordion.tsx` (wrapper Radix déjà présent et inutilisé) — accessibilité gratuite, moins de code. Conserver le style visuel actuel.

### A3 — Bouton burger sans nom accessible 🟡
- **Fichier :** `src/layouts/Navbar.tsx:182–187` : le `<span class="sr-only">` est enfant de l'icône SVG lucide au lieu du bouton.
- **Correction :** déplacer le sr-only comme enfant direct du `SheetTrigger` (ou `aria-label="Ouvrir le menu"` sur le trigger).

### A4 — Flou animé permanent sur les titres 🟡
- **Constat :** quasi tous les titres ont `animate={{ filter: ["blur(0px)", "blur(0.5px)", "blur(0px)"] }}` en boucle → texte légèrement flou en continu, fatigue visuelle.
- **Correction :** supprimer cet effet partout (Hero, Sponsors, HowItWorks, Services, Newsletter, Team, FAQ, Applications, Footer). Se combine avec P2.

### A5 — Hiérarchie de titres + contrastes + `--muted` jaune vif 🟡
- **Titres :** hero = h1 « Python is » + h2 « Fun! » (à fusionner en un seul h1) ; Newsletter titre en h3 ; compteurs Statistics en h2 (→ `p` ou `div`). Une seule h1 par page, h2 pour les sections.
- **Contraste :** vérifier le jaune `--secondary` en texte/dégradé sur fond clair (WCAG AA 4.5:1) ; `text-[9px]` dans PyConBanner trop petit → 11–12 px min.
- **`src/App.css:83`** : `--muted: 50, 96%, 59%` = jaune vif pour une couleur « muted » → remettre un gris neutre (ex. `240 4.8% 95.9%`) et vérifier les usages existants de `bg-muted`.

---

## S — SEO / partage social

### S1 — Meta OG/Twitter cassées pour les crawlers 🟠
- **Fichier :** `index.html`.
- **Problèmes :** `og:url` et `twitter:url` pointent vers `https://github.com/pythoncameroon/landing-web` (le repo !) au lieu du site en prod ; `og:image`/`twitter:image` sont réécrites par Vite en chemin **relatif** `/assets/og-image-xxx.png` alors que les crawlers exigent une URL **absolue** → pas d'aperçu image sur FB/LinkedIn/X.
- **Correction :** déterminer l'URL canonique de prod (demander à l'équipe : domaine Firebase ? custom ?), mettre `og:url` dessus, déplacer `og-image.png` dans `public/` et référencer `https://<domaine>/og-image.png` en absolu. Ajouter `<link rel="canonical">`.
- **Vérification :** debuggers de partage (opengraph.xyz / Facebook Sharing Debugger) après déploiement.

### S2 — robots.txt, sitemap, données structurées 🟢
- Créer `public/robots.txt` (allow all + lien sitemap), `public/sitemap.xml` (une URL), JSON-LD `Organization` (nom, logo, sameAs vers GitHub/X/LinkedIn/Discord).
- Déplacer aussi favicons + `site.webmanifest` de `src/assets/favicon/` vers `public/` (convention Vite ; vérifier que les icônes référencées dans le manifest résolvent en prod).

---

## Q — Qualité de code / architecture

### Q1 — Duplication massive du motif de section (~150 lignes × 7) 🟡
- **Constat :** « 2 blobs flous + particules aléatoires + titre dégradé animé + divider animé + glow » copié-collé dans About, Sponsors, HowItWorks, Services, Applications, Team, Newsletter, FAQ, Footer.
- **Correction :** extraire `<SectionHeader title badge subtitle>`, `<GlowBackground>`, `<ParticleField count>` dans `src/components/section/`. Réduction ~50 % du code des containers ; permet d'appliquer P2/P4 en un seul endroit.
- **⚠️ Faire APRÈS P1/P2** (ne pas refactorer des effets qui vont être supprimés).

### Q2 — Code mort : composants + ~9 Mo d'assets inutilisés 🟡
- **Composants jamais importés :** `src/components/Features.tsx`, `src/components/HeroCards.tsx` (vérifié par grep). Probablement aussi `ui/accordion.tsx` (sauf si A2 le réutilise), `ui/avatar.tsx`, `ui/badge.tsx` — vérifier avant suppression.
- **Assets inutilisés dans `src/assets/` :** machine-learning.png (3,4 Mo), data-science.png (2,5 Mo), cybersecurity.png (1,5 Mo), automation.png (876 K), game-development.png (648 K), + growth/reflecting/looking-ahead/cube-leg si non référencés après suppression des composants morts. Ils ne partent pas dans le bundle mais alourdissent repo/CI.
- **CSS :** supprimer les 68 lignes de thème commenté dans `src/App.css:6–68` ; `.shadow` + keyframes dans `src/index.css` ne servent qu'à HeroCards (mort) → supprimer avec.
- **Vérification :** `npm run build` + contrôle visuel complet.

### Q3 — Dépendances mal rangées / inutilisées 🟡
- `@vitejs/plugin-react-swc` est en `dependencies` → déplacer en `devDependencies`.
- `@vitejs/plugin-react` (devDeps) fait doublon avec le SWC utilisé dans vite.config → supprimer.
- `i18next-browser-languagedetector` : brancher (tâche B4) ou supprimer.
- `@radix-ui/react-accordion`/`react-avatar` : selon issue de A2/Q2.
- **Vérification :** `npm run build` + `npm run dev` OK après `npm install`.

### Q4 — Incohérences de structure 🟢
- `App.css` contient les directives Tailwind/thème et `index.css` les utilitaires custom → inverser (convention) ; `components.json` pointe `src/app.css` (mauvaise casse) → corriger vers le bon fichier (sinon le CLI shadcn échoue sur FS sensibles à la casse).
- Données inline dans Sponsors/FAQ/Applications/Footer alors que Team utilise `src/data/team.ts` + `src/types/sections.ts` → centraliser toutes les données dans `src/data/` (prépare aussi B4/i18n).
- `routeList` de la Navbar n'expose que About/Newsletter/FAQ → ajouter Team (et décider pour Sponsors/Applications/HowItWorks) ; le tracking `activeSection` suivra.

### Q5 — Divers 🟢
- `src/containers/Applications.tsx:21` : `const [, setActiveCard]` — état écrit jamais lu → supprimer.
- `src/containers/Hero.tsx` : `motion.section` imbriqué dans `motion.section` pour le bloc titre → remplacer l'interne par `motion.div`.
- Chiffres de `Statistics.tsx` (« 3.2K+ AI Models Deployed »…) : vraisemblablement fictifs → valider avec l'équipe ou remplacer par des stats réelles de la communauté.

---

## O — Outillage / CI / déploiement

### O1 — Aucun contrôle qualité en CI, lint actuellement rouge 🟢
- **Constat :** `.github/workflows/` = 2 workflows de déploiement Firebase uniquement ; `npm run lint` échoue (erreur `e: any` de B3).
- **Correction :** workflow PR : `npm ci && npm run lint && npm run build` (le build inclut `tsc`). Optionnel : smoke test Playwright (la page se rend, les ancres du menu existent).

### O2 — Trois cibles de déploiement sans doc, `vite preview` en prod dans Docker 🟢
- **Constat :** firebase.json + amplify.yml + Dockerfile coexistent ; le Dockerfile sert via `vite preview` (explicitement non prévu pour la prod).
- **Correction :** demander à l'équipe quelle cible fait foi, documenter dans le README, supprimer les autres (ou les garder documentées). Si Docker reste : multi-stage avec nginx servant `dist/`.

### O3 — Divers config 🟢
- `vite.config.ts:17,23` : `allowedHosts: true` (dev + preview) désactive la protection DNS-rebinding → restreindre si le tunnel n'est pas nécessaire.
- Pas de README de dev / CONTRIBUTING pour un projet open source communautaire → créer (setup, scripts, déploiement, comment contribuer).

---

## Notes de contexte pour les sessions suivantes

- Le repo a des modifications non commitées (package-lock + prettier-like reformatage de plusieurs containers) sur la branche `feat/add-pycon-banner` — vérifier `git status` avant de committer, ne pas mélanger les fixes de l'audit avec ce travail en cours.
- Après B1/B2, l'apparence du site va **changer** (des effets invisibles deviennent visibles) : prévoir une passe visuelle light/dark et éventuellement adoucir des opacités.
- Convention du repo : composants shadcn dans `src/components/ui/`, sections dans `src/containers/`, alias `@/` → `src/`.
