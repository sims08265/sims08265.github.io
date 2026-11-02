// Toutes les données du portfolio (tirées du CV). Modifiez ce fichier pour mettre à jour le contenu.

export type Lang = 'fr' | 'en';
export type Localized<T = string> = Record<Lang, T>;

/* ================= Textes d'interface ================= */
const FR = {
  'nav.about': 'À propos', 'nav.edu': 'Parcours', 'nav.skills': 'Stack', 'nav.projects': 'Projets',
  'nav.exp': 'Expériences', 'nav.contact': 'Contact', 'nav.cv': 'CV',
  'hero.status': 'Disponible pour un stage', 'hero.hello': '// Salut, je suis',
  'hero.build': 'Je conçois des solutions en',
  'hero.lead': "Élève-ingénieur en Informatique & Systèmes d'Information à Saint Jean Ingénieur. Je mêle Machine Learning et Pentesting pour bâtir des systèmes intelligents — et sûrs.",
  'hero.cta1': 'Voir mes projets', 'hero.cta2': 'Télécharger le CV', 'hero.scroll': 'défiler',
  'about.tag': 'whoami', 'about.title': 'Données, modèles', 'about.hl': '& sécurité.',
  'about.p1': "Élève-ingénieur en <strong>4ᵉ année</strong> à Saint Jean Ingénieur de Yaoundé, filière <strong>Informatique & Systèmes d'Information</strong>.",
  'about.p2': "Ce qui m'anime : faire parler les données, puis m'assurer que les systèmes qui les manipulent sont <strong>robustes face aux attaques</strong>. Du modèle de détection de fraude à l'analyse d'un protocole de chiffrement de bout en bout.",
  'about.s1': "années d'ingé.", 'about.s2': 'projets phares', 'about.s3': 'langages',
  'about.focus': 'Domaines de prédilection', 'about.langs': 'Langues',
  'badge.role': "Élève-ingénieur · Systèmes d'Information", 'badge.level': 'NIVEAU', 'badge.loc': 'LIEU', 'badge.status': 'STATUT', 'badge.open': 'ouvert aux stages',
  'edu.tag': 'education', 'edu.title': 'Mon', 'edu.hl': 'parcours.', 'edu.sub': 'Sélectionnez une étape pour en voir le détail.',
  'skills.tag': 'stack', 'skills.title': 'La boîte', 'skills.hl': 'à outils.', 'skills.sub': 'Choisissez une catégorie — les technologies se mettent en orbite.',
  'proj.tag': 'projects', 'proj.title': 'Projets', 'proj.hl': 'sélectionnés.', 'proj.sub': 'Data science, mobile et sécurité : trois terrains, une même exigence.',
  'exp.tag': 'experience', 'exp.title': 'Sur le', 'exp.hl': 'terrain.', 'int.title': 'En dehors du code',
  'contact.tag': 'contact', 'contact.big1': 'Un stage, un projet,', 'contact.big2': 'une idée ? Parlons-en.',
  'contact.sub': 'Écrivez-moi par mail, appelez-moi, ou utilisez le formulaire ci-dessous.',
  'contact.copy': 'Copier', 'contact.copied': 'Copié !', 'contact.phone': 'Téléphone', 'contact.loc': 'Localisation',
  'form.title': 'Envoyer un message', 'form.name': 'Nom', 'form.subject': 'Sujet', 'form.send': 'Envoyer',
  'form.ok': "Votre client mail s'ouvre avec le message pré-rempli.",
  progress: 'Progression', done: 'Obtenu', pro: 'Professionnelle', perso: 'Personnelle',
  'aria.lang': 'Changer de langue', 'aria.theme': 'Changer de thème', 'aria.menu': 'Menu', 'aria.top': 'Remonter en haut',
  'footer.made': 'Conçu & développé avec Angular — Yaoundé',
};
export type UiKey = keyof typeof FR;

export const UI_TEXT: Record<Lang, Record<UiKey, string>> = {
  fr: FR,
  en: {
    'nav.about': 'About', 'nav.edu': 'Journey', 'nav.skills': 'Stack', 'nav.projects': 'Projects',
    'nav.exp': 'Experience', 'nav.contact': 'Contact', 'nav.cv': 'CV',
    'hero.status': 'Open to internships', 'hero.hello': "// Hi, I'm",
    'hero.build': 'I build solutions in',
    'hero.lead': 'Computer Engineering & Information Systems student at Saint Jean Ingénieur. I blend Machine Learning and Pentesting to build systems that are smart — and secure.',
    'hero.cta1': 'See my projects', 'hero.cta2': 'Download CV', 'hero.scroll': 'scroll',
    'about.tag': 'whoami', 'about.title': 'Data, models', 'about.hl': '& security.',
    'about.p1': '<strong>4th-year</strong> engineering student at Saint Jean Ingénieur, Yaoundé, majoring in <strong>Computer Science & Information Systems</strong>.',
    'about.p2': 'What drives me: making data speak, then making sure the systems handling it are <strong>resilient to attacks</strong>. From fraud-detection models to analysing an end-to-end encryption protocol.',
    'about.s1': 'years of eng.', 'about.s2': 'key projects', 'about.s3': 'languages',
    'about.focus': 'Focus areas', 'about.langs': 'Languages',
    'badge.role': 'Engineering student · Information Systems', 'badge.level': 'LEVEL', 'badge.loc': 'LOC', 'badge.status': 'STATUS', 'badge.open': 'open to internships',
    'edu.tag': 'education', 'edu.title': 'My', 'edu.hl': 'journey.', 'edu.sub': 'Select a step to see the details.',
    'skills.tag': 'stack', 'skills.title': 'The', 'skills.hl': 'toolbox.', 'skills.sub': 'Pick a category — the technologies go into orbit.',
    'proj.tag': 'projects', 'proj.title': 'Selected', 'proj.hl': 'projects.', 'proj.sub': 'Data science, mobile and security: three fields, one standard.',
    'exp.tag': 'experience', 'exp.title': 'In the', 'exp.hl': 'field.', 'int.title': 'Beyond code',
    'contact.tag': 'contact', 'contact.big1': 'An internship, a project,', 'contact.big2': "an idea? Let's talk.",
    'contact.sub': 'Email me, give me a call, or use the form below.',
    'contact.copy': 'Copy', 'contact.copied': 'Copied!', 'contact.phone': 'Phone', 'contact.loc': 'Location',
    'form.title': 'Send a message', 'form.name': 'Name', 'form.subject': 'Subject', 'form.send': 'Send',
    'form.ok': 'Your mail client opens with the message pre-filled.',
    progress: 'Progress', done: 'Obtained', pro: 'Professional', perso: 'Personal',
    'aria.lang': 'Switch language', 'aria.theme': 'Toggle theme', 'aria.menu': 'Menu', 'aria.top': 'Back to top',
    'footer.made': 'Designed & built with Angular — Yaoundé',
  },
};

/* ================= Profil ================= */
export const PROFILE = {
  firstNames: 'Celestin Gills',
  lastName: 'SIMO NOUAYOU',
  displayFirst: 'Gills',
  displayLast: 'SIMO',
  initials: 'SG',
  email: 'celestin.simonouayou@gmail.com',
  location: 'Yaoundé, Cameroun',
  github: 'https://github.com/sims08265',
  githubHandle: 'sims08265',
  // TODO : remplacer par l'URL exacte du profil LinkedIn
  linkedin: 'https://www.linkedin.com/search/results/all/?keywords=Gills%20SIMO',
  cv: 'My_CV.pdf',
  typed: {
    fr: ['Data Engineering', 'Machine Learning', 'Cybersécurité', 'Pentesting', 'Apps mobiles'],
    en: ['Data Engineering', 'Machine Learning', 'Cybersecurity', 'Pentesting', 'Mobile apps'],
  } as Localized<string[]>,
  stats: [
    { value: 4, key: 'about.s1' },
    { value: 3, key: 'about.s2' },
    { value: 6, key: 'about.s3' },
  ] as { value: number; key: UiKey }[],
  languages: [
    { name: { fr: 'Français', en: 'French' }, level: 5, note: { fr: 'Courant', en: 'Fluent' } },
    { name: { fr: 'Anglais', en: 'English' }, level: 4, note: { fr: 'B1 TOEIC', en: 'B1 TOEIC' } },
    { name: { fr: 'Espagnol', en: 'Spanish' }, level: 1, note: { fr: 'Notions', en: 'Basics' } },
  ] as { name: Localized; level: number; note: Localized }[],
  focus: [
    { icon: 'database', title: { fr: 'Data Engineering', en: 'Data Engineering' },
      text: { fr: 'Collecte, nettoyage, modélisation', en: 'Collection, cleaning, modelling' } },
    { icon: 'brain', title: { fr: 'Machine Learning', en: 'Machine Learning' },
      text: { fr: 'Classification, prévision, visualisation', en: 'Classification, forecasting, dataviz' } },
    { icon: 'shield', title: { fr: 'Cybersécurité', en: 'Cybersecurity' },
      text: { fr: 'Pentesting, cryptographie', en: 'Pentesting, cryptography' } },
  ] as { icon: IconName; title: Localized; text: Localized }[],
};

/** Défilement de technologies sous le hero. */
export const MARQUEE = ['Python', 'Java', 'JavaScript', 'SQL', 'C / C++', 'Spring Boot', 'Angular', 'React Native',
  'Node.js', 'NestJS', 'PostgreSQL', 'Pandas', 'Scikit-learn', 'Streamlit', 'Prophet', 'Nmap', 'Metasploit', 'GitLab'];

/* ================= Formation ================= */
export interface Education {
  id: number; icon: IconName; period: string; year: string; progress: number; watermark: string;
  title: Localized; org: string; points: Localized<string[]>;
}
export const EDUCATION: Education[] = [
  {
    id: 1, icon: 'cap', period: '09/2022 – 08/2027', year: '2027', progress: 80, watermark: 'IUSJ',
    title: { fr: "Diplôme d'ingénieur", en: 'Engineering degree' },
    org: 'Saint Jean Ingénieur de Yaoundé (IUSJ)',
    points: {
      fr: ["Niveau 4 — Filière Informatique et Systèmes d'Information", 'Ingénierie des données, Machine Learning, sécurité des SI', 'Développement logiciel : Spring Boot, Angular, React Native'],
      en: ['Year 4 — Computer Science & Information Systems', 'Data engineering, Machine Learning, IS security', 'Software development: Spring Boot, Angular, React Native'],
    },
  },
  {
    id: 2, icon: 'book', period: '06/2022', year: '2022', progress: 100, watermark: 'BAC',
    title: { fr: 'Baccalauréat C', en: 'Baccalaureate C' },
    org: 'Lycée Bilingue de Mendong (LBM)',
    points: {
      fr: ['Série scientifique — Mathématiques et Sciences Physiques'],
      en: ['Science track — Mathematics and Physical Sciences'],
    },
  },
];

/* ================= Compétences ================= */
// Les niveaux (%) sont indicatifs : à ajuster.
export interface SkillCategory { key: string; icon: IconName; label: Localized; items: { name: string; level: number }[]; }
const s = (name: string, level: number) => ({ name, level });
export const SKILLS: SkillCategory[] = [
  { key: 'languages', icon: 'code', label: { fr: 'Langages', en: 'Languages' },
    items: [s('Python', 88), s('Java', 78), s('JavaScript', 80), s('SQL', 82), s('C', 70), s('C++', 68)] },
  { key: 'frameworks', icon: 'layers', label: { fr: 'Frameworks', en: 'Frameworks' },
    items: [s('Spring Boot', 72), s('Angular', 70), s('React Native', 78), s('Node.js', 72), s('NestJS', 68)] },
  { key: 'data', icon: 'brain', label: { fr: 'Machine Learning', en: 'Machine Learning' },
    items: [s('NumPy', 85), s('Pandas', 86), s('Scikit-learn', 80), s('Matplotlib', 82), s('Plotly', 75), s('Seaborn', 78), s('Streamlit', 74), s('Prophet', 65)] },
  { key: 'security', icon: 'shield', label: { fr: 'Pentesting', en: 'Pentesting' },
    items: [s('Nmap', 75), s('Metasploit', 65), s('Cryptographie', 70)] },
  { key: 'tools', icon: 'terminal', label: { fr: 'Outils', en: 'Tools' },
    items: [s('Git / GitHub', 85), s('GitLab', 78), s('VS Code', 90), s('IntelliJ', 80), s('MySQL Workbench', 78), s('Jupyter', 88), s('PostgreSQL', 74)] },
];

/* ================= Projets ================= */
export interface Project {
  art: 'fraud' | 'stock' | 'crypto'; category: Localized;
  title: Localized; description: Localized; tags: string[];
}
export const PROJECTS: Project[] = [
  {
    art: 'fraud',
    category: { fr: 'Machine Learning', en: 'Machine Learning' },
    title: { fr: 'Détection de fraudeurs par classification', en: 'Fraud detection classifier' },
    description: {
      fr: "Un modèle de classification qui repère les fraudeurs dans un jeu de données : exploration, préparation des variables, entraînement puis évaluation des performances.",
      en: 'A classification model that spots fraudsters in a dataset: exploration, feature preparation, training and performance evaluation.',
    },
    tags: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Seaborn'],
  },
  {
    art: 'stock',
    category: { fr: 'Développement mobile', en: 'Mobile development' },
    title: { fr: 'App mobile de gestion de stocks', en: 'Inventory management app' },
    description: {
      fr: 'Application mobile React Native, backend NestJS et base PostgreSQL — de la conception au développement.',
      en: 'React Native mobile app with a NestJS backend and PostgreSQL — from design to development.',
    },
    tags: ['React Native', 'NestJS', 'PostgreSQL'],
  },
  {
    art: 'crypto',
    category: { fr: 'Cybersécurité', en: 'Cybersecurity' },
    title: { fr: 'Dans les coulisses du chiffrement WhatsApp', en: "Inside WhatsApp's encryption" },
    description: {
      fr: 'Analyse complète du chiffrement de bout en bout de WhatsApp et démonstration interactive via une application web.',
      en: "Full analysis of WhatsApp's end-to-end encryption with an interactive web demo.",
    },
    tags: ['Cryptographie', 'Signal Protocol', 'JavaScript'],
  },
];

/* ================= Expériences ================= */
export interface Experience { kind: 'pro' | 'perso'; date: string; title: Localized; org: string; points?: Localized<string[]>; }
export const EXPERIENCES: Experience[] = [
  { kind: 'pro', date: '07/2023 – 08/2023', title: { fr: 'Stage de découverte en entreprise', en: 'Discovery internship' }, org: 'Level Up Corporation' },
  { kind: 'perso', date: '07/2021 – 08/2021', title: { fr: 'Caissier', en: 'Cashier' }, org: 'Alimentation Las Gracias, Ekounou',
    points: { fr: ['Gestion des finances', 'Inventaires'], en: ['Cash management', 'Inventory'] } },
  { kind: 'perso', date: '07/2020 – 08/2020', title: { fr: 'Agent commercial', en: 'Sales agent' }, org: 'Librairie papeterie SOCOCAM SARL' },
];

export const INTERESTS: { icon: IconName; label: Localized }[] = [
  { icon: 'ball', label: { fr: 'Football', en: 'Football' } },
  { icon: 'music', label: { fr: 'Musique', en: 'Music' } },
  { icon: 'book', label: { fr: 'Lecture', en: 'Reading' } },
  { icon: 'flask', label: { fr: 'Recherches personnelles', en: 'Personal research' } },
];

/* ================= Icônes (chemins SVG, trait 24x24) ================= */
export const ICONS = {
  cap: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z"/><path d="M6.5 17A2.5 2.5 0 0 0 4 19.5 2.5 2.5 0 0 0 6.5 22H20v-5"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  tel: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowUpRight: '<path d="M7 17 17 7M8 7h9v9"/>',
  download: '<path d="M12 3v12m0 0-4-4m4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>',
  send: '<path d="m22 2-7 20-4-9-9-4 20-7z"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  menu: '<path d="M4 7h16M4 12h10M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  up: '<path d="M12 19V5M5 12l7-7 7 7"/>',
  database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>',
  brain: '<path d="M9.5 2A2.5 2.5 0 0 0 7 4.5v.1A3 3 0 0 0 4.5 9a3 3 0 0 0 .5 5.5A3 3 0 0 0 9.5 20a2.5 2.5 0 0 0 2.5-2.5v-13A2.5 2.5 0 0 0 9.5 2z"/><path d="M14.5 2A2.5 2.5 0 0 1 17 4.5v.1A3 3 0 0 1 19.5 9a3 3 0 0 1-.5 5.5 3 3 0 0 1-4.5 5.5 2.5 2.5 0 0 1-2.5-2.5"/>',
  code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
  layers: '<path d="m12 2 10 5-10 5L2 7l10-5z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
  terminal: '<path d="m4 17 6-6-6-6M12 19h8"/>',
  ball: '<circle cx="12" cy="12" r="10"/><path d="m12 7 4 3-1.5 4.5h-5L8 10z"/><path d="M12 2v5M16 10l5-1M14.5 14.5l3 4.5M9.5 14.5l-3 4.5M8 10 3 9"/>',
  music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  flask: '<path d="M9 3h6M10 3v6L4 20a1 1 0 0 0 .9 1.5h14.2A1 1 0 0 0 20 20l-6-11V3"/><path d="M7 15h10"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
};
export type IconName = keyof typeof ICONS;

/* Logos de marque (remplis) */
export const BRAND = {
  github: 'M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3',
  linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  mail: 'M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.24-8 5-8-5V6l8 5 8-5v2.24z',
};
