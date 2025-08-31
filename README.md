# Portfolio - Muhammad Asim

Un portfolio moderne et responsive construit avec Next.js 15, TypeScript, et Tailwind CSS v4.

## 🚀 Fonctionnalités

- ✨ **Design Moderne** : Interface élégante avec un système de couleurs sombres
- 🌊 **Animations Fluides** : Effets hover interactifs et animations de typing
- 📱 **Entièrement Responsive** : Optimisé pour tous les écrans
- 🔍 **SEO Optimisé** : Métadonnées complètes pour chaque page
- ⚡ **Performance** : Construit avec Next.js 15 et Turbopack
- 🎨 **Styling Avancé** : Tailwind CSS v4 avec système de design personnalisé
- 📝 **TypeScript** : Code type-safe pour une meilleure maintenabilité

## 🛠 Technologies Utilisées

- **Framework** : Next.js 15.5.2 avec App Router
- **Language** : TypeScript
- **Styling** : Tailwind CSS v4
- **Fonts** : Inter & JetBrains Mono (Google Fonts)
- **Build Tool** : Turbopack (Next.js)
- **Linting** : ESLint avec config Next.js

## 📁 Structure du Projet

```
portfolio/
├── src/
│   ├── app/                    # App Router (Next.js 13+)
│   │   ├── layout.tsx          # Layout racine
│   │   ├── page.tsx           # Page d'accueil
│   │   ├── globals.css        # Styles globaux
│   │   ├── a-propos/          # Page À propos
│   │   ├── blog/              # Blog + articles dynamiques
│   │   ├── contact/           # Page de contact
│   │   ├── cv/                # CV/Resume
│   │   ├── outils/            # Page Outils
│   │   └── projets/           # Projets + détails dynamiques
│   └── components/
│       ├── Navigation.tsx     # Navigation fixe
│       ├── Footer.tsx         # Pied de page
│       └── sections/          # Sections de la page d'accueil
├── public/
│   └── assets/                # Images et fichiers statiques
└── ...
```

## 🎨 Pages & Sections

### Pages Principales
- **Accueil** (`/`) : Page d'accueil avec toutes les sections
- **À propos** (`/a-propos`) : Présentation personnelle et parcours
- **Projets** (`/projets`) : Portfolio de projets avec filtrage
- **Blog** (`/blog`) : Articles techniques et tutoriels
- **Contact** (`/contact`) : Formulaire de contact et informations
- **CV** (`/cv`) : Curriculum vitae détaillé
- **Outils** (`/outils`) : Stack technique et outils utilisés

### Sections de la Page d'Accueil
1. **HeroSection** : Introduction avec animation de code
2. **SocialProof** : Logos des entreprises/technologies
3. **FeaturedProjects** : Projets phares avec effets visuels
4. **SkillsStack** : Compétences techniques organisées
5. **AboutPreview** : Aperçu de la section À propos
6. **OpenSource** : Contributions open source
7. **WritingPreview** : Aperçu des articles de blog
8. **Testimonials** : Témoignages clients
9. **CTABand** : Call-to-action final

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation

1. Aller dans le dossier du projet :
```bash
cd portfolio
```

2. Installer les dépendances :
```bash
npm install
```

3. Démarrer le serveur de développement :
```bash
npm run dev
```

4. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📜 Scripts Disponibles

```bash
# Développement
npm run dev              # Démarre le serveur de développement avec Turbopack

# Build & Production
npm run build            # Build de production avec Turbopack
npm run start            # Démarre le serveur de production
npm run preview          # Build et démarre localement

# Code Quality
npm run lint             # Lint le code avec ESLint
npm run lint:fix         # Corrige automatiquement les erreurs de lint
npm run type-check       # Vérifie les types TypeScript

# Analyse
npm run build:analyze    # Analyse la taille du bundle
```

## 🎨 Système de Design

### Couleurs Principales
- **Primary** : `#22C55E` (Green)
- **Secondary** : `#14B8A6` (Teal)  
- **Accent** : `#8B5CF6` (Purple)
- **Background** : `#0B0F14` (Dark Blue)

### Typographie
- **Sans-serif** : Inter (titres et texte)
- **Monospace** : JetBrains Mono (code)

### Composants Personnalisés
- **Cards** : Effets hover avec glow
- **Buttons** : Style moderne inspiré de n8n/Supabase
- **Badges** : Variants colorés pour les tags
- **Navigation** : Navigation fixe avec backdrop blur

## 🔧 Configuration

### Tailwind CSS v4
Utilise le nouveau système de configuration inline avec PostCSS.

### TypeScript
Configuration stricte avec support des imports absolus via `@/`.

### ESLint
Configuration Next.js avec règles personnalisées pour React et les hooks.

## 📱 Responsive Design

- **Mobile** : < 768px
- **Tablet** : 768px - 1024px  
- **Desktop** : > 1024px

Toutes les sections sont entièrement responsive avec des breakpoints optimisés.

## 🌐 SEO & Métadonnées

Chaque page inclut :
- Titre et description optimisés
- Mots-clés pertinents
- Métadonnées Open Graph
- Balises d'auteur et de langue (français)

## 📊 Performance

- **Build Time** : ~2.5 secondes
- **First Load JS** : 118-129 kB
- **Génération statique** : 11 pages
- **Bundle optimisé** avec code splitting automatique

## 🚀 Déploiement

Prêt pour le déploiement sur :
- **Vercel** (recommandé)
- **Netlify** 
- **GitHub Pages**
- Tout hébergeur supportant Next.js

### Déploiement Vercel (recommandé)
1. Push sur GitHub
2. Connecter à Vercel
3. Déploiement automatique !

## 🤝 Contribution

Ce portfolio est un projet personnel, mais les suggestions d'amélioration sont bienvenues !

## 📄 License

© 2024 Muhammad Asim. Tous droits réservés.

---

**Fait avec ❤️ et beaucoup de café ☕**