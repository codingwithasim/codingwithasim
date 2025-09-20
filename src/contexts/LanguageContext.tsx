'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.uses': 'Uses',
    'nav.contact': 'Contact',
    
    // Footer
    'footer.navigation': 'Navigation',
    'footer.connect': 'Connect',
    'footer.portfolio': 'Portfolio',
    'footer.description': 'Built with Next.js, Tailwind CSS, and a passion for clean code.',
    'footer.copyright': 'All rights reserved.',
    
    // Common
    'skipToContent': 'Skip to main content',
    
    // Hero Section
    'hero.availability': 'Available for work',
    'hero.name': "I'm Muhammad Asim",
    'hero.title': 'Full-Stack Developer',
    'hero.description': 'I craft beautiful, functional web experiences that bring ideas to life. Specializing in modern web technologies and user-centered design.',
    'hero.location': 'France',
    'hero.experience': '2+ Years',
    'hero.getInTouch': 'Get in Touch',
    'hero.viewProjects': 'View Projects',
    'hero.scroll': 'Scroll',
    
    // Services Section
    'services.title': 'Services',
    'services.subtitle': 'Turning Ideas Into Reality.',
    'services.fullstack.title': 'Full-Stack Development',
    'services.fullstack.description': 'End-to-end web applications built with modern frameworks and clean architectures.',
    'services.fullstack.feature1': 'React / Next.js Frontend',
    'services.fullstack.feature2': 'Node.js Backend',
    'services.fullstack.feature3': 'Database Design',
    'services.fullstack.feature4': 'REST APIs',
    'services.frontend.title': 'Frontend Engineering',
    'services.frontend.description': 'Fast, responsive, and accessible interfaces that focus on user experience.',
    'services.frontend.feature1': 'Next.js & React',
    'services.frontend.feature2': 'Tailwind CSS',
    'services.frontend.feature3': 'Performance Optimization',
    'services.frontend.feature4': 'SEO Best Practices',
    'services.backend.title': 'Backend Development',
    'services.backend.description': 'Scalable server-side solutions with secure and efficient APIs.',
    'services.backend.feature1': 'Node.js & Express',
    'services.backend.feature2': 'Database Optimization',
    'services.backend.feature3': 'Authentication & Security',
    'services.ai.title': 'Automation & AI Integration',
    'services.ai.description': 'Enhance applications and workflows by integrating automation and AI-driven features where it adds real value.',
    'services.ai.feature1': 'Process Automation',
    'services.ai.feature2': 'API Integrations',
    'services.ai.feature3': 'Basic AI Features',
    'services.ai.feature4': 'Workflow Optimization',
    
    // Featured Projects Section
    'projects.title': 'Featured Work',
    'projects.subtitle': 'Showcasing Scalable Solutions.',
    'projects.viewAll': 'View All Projects',
    'projects.nexus.description': 'A modern, responsive React landing page for NexusFlow - a fictional team collaboration and workflow automation platform. Built with React, Tailwind CSS, and Framer Motion.',
    'projects.nexus.feature1': 'Responsive design',
    'projects.nexus.feature2': 'Workflow automation simulation',
    'projects.nexus.feature3': 'Interactive UI',
    'projects.keygenie.description': 'A modern, client-side password generator that creates random, memorable passwords and PINs with built-in strength indicators and export functionality.',
    'projects.keygenie.feature1': 'Password generator',
    'projects.keygenie.feature2': 'Strength indicators',
    'projects.keygenie.feature3': 'Export functionality',
    'projects.backend.description': 'Scalable backend infrastructure supporting 50k+ mobile app users with real-time features.',
    'projects.backend.feature1': 'Real-time data handling',
    'projects.backend.feature2': 'High scalability',
    'projects.backend.feature3': 'Kubernetes orchestration',
    
    // CTA Section
    'cta.title': "Let's Build",
    'cta.subtitle': 'Something Amazing.',
    'cta.description': "Ready to turn your ideas into reality? Whether it's a web application, performance optimization, or a development tool, I'm here to help.",
    'cta.email.description': 'Reach out directly to discuss projects or collaborations',
    'cta.email.action': 'Send a Message',
    'cta.linkedin.description': 'Connect professionally and follow my development journey',
    'cta.linkedin.action': 'Connect',
    'cta.github.description': 'Explore my code, projects, and open source contributions',
    'cta.github.action': 'Check it out',
    'cta.startProject': 'Start a Project',
    'cta.viewWork': 'View My Work',
    'cta.responseTime': 'Response Time',
    'cta.responseTimeValue': 'Within 24 hours',
    'cta.projectTypes': 'Project Types',
    'cta.projectTypesValue': 'Web Apps, APIs, Tools',
    'cta.availability': 'Availability',
    'cta.availabilityValue': 'Currently accepting projects',
    
    // About Page
    'about.header.greeting': "Hi there! I'm Muhammad Asim",
    'about.header.description': 'A passionate full-stack developer with 2+ years of experience crafting digital experiences that blend beautiful design with powerful functionality.',
    'about.header.status': 'Currently Taking on Projects',
    'about.bio.title': 'Who I Am',
    'about.bio.paragraph1': "I'm Muhammad Asim, a web developer with 2+ years of experience building applications that developers love to use. My journey began with curiosity about how things work in Android, which led me to discover web development.",
    'about.bio.paragraph2': "I've worked with HTML, CSS, JavaScript, PHP, and taught myself modern frameworks like React, Next.js, Tailwind, and Node.js. I focus on creating software that balances technical performance with user needs, ensuring every project is fast, maintainable, and user-friendly.",
    'about.skills.title': 'Technical Expertise',
    'about.skills.webBasics': 'Web basics',
    'about.skills.react': 'React',
    'about.skills.nextjs': 'Next.js',
    'about.skills.tailwind': 'Tailwind CSS',
    'about.skills.nodejs': 'Node.js',
    'about.skills.git': 'Git/GitHub',
    'about.philosophy.title': 'Building with Purpose',
    'about.philosophy.subtitle': 'Code with Intention',
    'about.philosophy.description': "I believe great software isn't just about clean code — it's about solving real problems for real people. Every project I build focuses on performance, simplicity, and user experience, so that the end result is something both developers and users enjoy using.",
    'about.hobbies.title': 'My Hobbies',
    'about.hobbies.description': "Outside of coding, you'll usually find me exploring blocky worlds in Minecraft, still debugging, just with",
    'about.hobbies.descriptionEnd': "instead of console logs.",
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.projects': 'Projets',
    'nav.services': 'Services',
    'nav.about': 'À propos',
    'nav.uses': 'Outils',
    'nav.contact': 'Contact',
    
    // Footer
    'footer.navigation': 'Navigation',
    'footer.connect': 'Se connecter',
    'footer.portfolio': 'Portfolio',
    'footer.description': 'Construit avec Next.js, Tailwind CSS, et une passion pour le code propre.',
    'footer.copyright': 'Tous droits réservés.',
    
    // Common
    'skipToContent': 'Aller au contenu principal',
    
    // Hero Section
    'hero.availability': 'Disponible pour le travail',
    'hero.name': 'Je suis Muhammad Asim',
    'hero.title': 'Développeur Full-Stack',
    'hero.description': 'Je crée de belles expériences web fonctionnelles qui donnent vie aux idées. Spécialisé dans les technologies web modernes et la conception centrée sur l\'utilisateur.',
    'hero.location': 'France',
    'hero.experience': '2+ Ans',
    'hero.getInTouch': 'Contactez-moi',
    'hero.viewProjects': 'Voir les Projets',
    'hero.scroll': 'Défiler',
    
    // Services Section
    'services.title': 'Services',
    'services.subtitle': 'Transformer les Idées en Réalité.',
    'services.fullstack.title': 'Développement Full-Stack',
    'services.fullstack.description': 'Applications web de bout en bout construites avec des frameworks modernes et des architectures propres.',
    'services.fullstack.feature1': 'Frontend React / Next.js',
    'services.fullstack.feature2': 'Backend Node.js',
    'services.fullstack.feature3': 'Conception de Base de Données',
    'services.fullstack.feature4': 'APIs REST',
    'services.frontend.title': 'Ingénierie Frontend',
    'services.frontend.description': 'Interfaces rapides, réactives et accessibles qui se concentrent sur l\'expérience utilisateur.',
    'services.frontend.feature1': 'Next.js & React',
    'services.frontend.feature2': 'Tailwind CSS',
    'services.frontend.feature3': 'Optimisation des Performances',
    'services.frontend.feature4': 'Meilleures Pratiques SEO',
    'services.backend.title': 'Développement Backend',
    'services.backend.description': 'Solutions côté serveur évolutives avec des APIs sécurisées et efficaces.',
    'services.backend.feature1': 'Node.js & Express',
    'services.backend.feature2': 'Optimisation de Base de Données',
    'services.backend.feature3': 'Authentification & Sécurité',
    'services.ai.title': 'Automatisation & Intégration IA',
    'services.ai.description': 'Améliorer les applications et les flux de travail en intégrant l\'automatisation et les fonctionnalités basées sur l\'IA là où cela apporte une réelle valeur.',
    'services.ai.feature1': 'Automatisation des Processus',
    'services.ai.feature2': 'Intégrations API',
    'services.ai.feature3': 'Fonctionnalités IA de Base',
    'services.ai.feature4': 'Optimisation des Flux de Travail',
    
    // Featured Projects Section
    'projects.title': 'Travaux en Vedette',
    'projects.subtitle': 'Présentation de Solutions Évolutives.',
    'projects.viewAll': 'Voir Tous les Projets',
    'projects.nexus.description': 'Une page d\'accueil React moderne et réactive pour NexusFlow - une plateforme fictive de collaboration d\'équipe et d\'automatisation de flux de travail. Construite avec React, Tailwind CSS et Framer Motion.',
    'projects.nexus.feature1': 'Design responsive',
    'projects.nexus.feature2': 'Simulation d\'automatisation de flux de travail',
    'projects.nexus.feature3': 'Interface utilisateur interactive',
    'projects.keygenie.description': 'Un générateur de mots de passe moderne côté client qui crée des mots de passe et des codes PIN aléatoires et mémorables avec des indicateurs de force intégrés et une fonctionnalité d\'exportation.',
    'projects.keygenie.feature1': 'Générateur de mots de passe',
    'projects.keygenie.feature2': 'Indicateurs de force',
    'projects.keygenie.feature3': 'Fonctionnalité d\'exportation',
    'projects.backend.description': 'Infrastructure backend évolutive supportant plus de 50k utilisateurs d\'applications mobiles avec des fonctionnalités en temps réel.',
    'projects.backend.feature1': 'Traitement de données en temps réel',
    'projects.backend.feature2': 'Haute évolutivité',
    'projects.backend.feature3': 'Orchestration Kubernetes',
    
    // CTA Section
    'cta.title': 'Construisons',
    'cta.subtitle': 'Quelque Chose d\'Incroyable.',
    'cta.description': 'Prêt à transformer vos idées en réalité ? Qu\'il s\'agisse d\'une application web, d\'optimisation des performances ou d\'un outil de développement, je suis là pour vous aider.',
    'cta.email.description': 'Contactez-moi directement pour discuter de projets ou de collaborations',
    'cta.email.action': 'Envoyer un Message',
    'cta.linkedin.description': 'Connectez-vous professionnellement et suivez mon parcours de développement',
    'cta.linkedin.action': 'Se Connecter',
    'cta.github.description': 'Explorez mon code, mes projets et mes contributions open source',
    'cta.github.action': 'Découvrir',
    'cta.startProject': 'Démarrer un Projet',
    'cta.viewWork': 'Voir Mon Travail',
    'cta.responseTime': 'Temps de Réponse',
    'cta.responseTimeValue': 'Dans les 24 heures',
    'cta.projectTypes': 'Types de Projets',
    'cta.projectTypesValue': 'Applications Web, APIs, Outils',
    'cta.availability': 'Disponibilité',
    'cta.availabilityValue': 'J\'accepte actuellement des projets',
    
    // About Page
    'about.header.greeting': 'Salut ! Je suis Muhammad Asim',
    'about.header.description': 'Un développeur full-stack passionné avec plus de 2 ans d\'expérience dans la création d\'expériences numériques qui allient un beau design à une fonctionnalité puissante.',
    'about.header.status': 'J\'accepte actuellement des projets',
    'about.bio.title': 'Qui je suis',
    'about.bio.paragraph1': 'Je suis Muhammad Asim, un développeur web avec plus de 2 ans d\'expérience dans la création d\'applications que les développeurs adorent utiliser. Mon parcours a commencé par la curiosité de comprendre comment les choses fonctionnent sur Android, ce qui m\'a mené à découvrir le développement web.',
    'about.bio.paragraph2': 'J\'ai travaillé avec HTML, CSS, JavaScript, PHP, et j\'ai appris en autodidacte des frameworks modernes comme React, Next.js, Tailwind et Node.js. Je me concentre sur la création de logiciels qui équilibrent les performances techniques avec les besoins des utilisateurs, en m\'assurant que chaque projet est rapide, maintenable et convivial.',
    'about.skills.title': 'Expertise Technique',
    'about.skills.webBasics': 'Bases du web',
    'about.skills.react': 'React',
    'about.skills.nextjs': 'Next.js',
    'about.skills.tailwind': 'Tailwind CSS',
    'about.skills.nodejs': 'Node.js',
    'about.skills.git': 'Git/GitHub',
    'about.philosophy.title': 'Construire avec un Objectif',
    'about.philosophy.subtitle': 'Coder avec Intention',
    'about.philosophy.description': 'Je crois que les grands logiciels ne se résument pas seulement à un code propre — il s\'agit de résoudre de vrais problèmes pour de vraies personnes. Chaque projet que je construis se concentre sur les performances, la simplicité et l\'expérience utilisateur, de sorte que le résultat final soit quelque chose que les développeurs et les utilisateurs apprécient d\'utiliser.',
    'about.hobbies.title': 'Mes Loisirs',
    'about.hobbies.description': 'En dehors du codage, vous me trouverez généralement en train d\'explorer des mondes en blocs dans Minecraft, toujours en train de déboguer, juste avec des',
    'about.hobbies.descriptionEnd': 'au lieu de logs de console.',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fr')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};