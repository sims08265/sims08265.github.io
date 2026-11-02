// Toutes les données du portfolio, en FR et EN. Modifiez ce fichier pour mettre à jour le contenu.
// Règle : n'écrire que des faits vérifiables (voir CLAUDE.md).

export type Lang = 'fr' | 'en';
export type Localized<T = string> = Record<Lang, T>;
/** Même texte dans les deux langues (noms propres, termes techniques). */
const same = <T>(value: T): Localized<T> => ({ fr: value, en: value });

/* ================= Textes d'interface ================= */
const FR = {
  'nav.about': 'À propos', 'nav.edu': 'Parcours', 'nav.skills': 'Stack', 'nav.projects': 'Projets',
  'nav.exp': 'Expériences', 'nav.contact': 'Contact', 'nav.cv': 'CV',
  skip: 'Aller au contenu principal',
  'hero.status': 'Ouvert à un stage IA de 3 mois · août 2027', 'hero.hello': '// Salut, je suis',
  'hero.build': 'Je conçois et déploie',
  'hero.lead': "Élève-ingénieur à Efrei Paris, orienté ingénierie de l'IA : LLM, NLP et données, avec le volet déploiement — Docker, CI/CD, monitoring. La sécurité est un atout : revues OWASP, WAF, détection d'intrusion.",
  'hero.cta1': 'Voir mes projets', 'hero.cta2': 'Télécharger le CV', 'hero.scroll': 'défiler',
  'about.tag': 'whoami', 'about.title': 'Données, modèles', 'about.hl': '& déploiement.',
  'about.p1': "Élève-ingénieur en <strong>2ᵉ année du cycle ingénieur (ING2)</strong> à <strong>Efrei Paris</strong>, filière anglophone, après le cycle ingénieur <strong>Informatique et Systèmes d'Information</strong> de l'Institut Saint Jean, à Yaoundé.",
  'about.p2': "Mon dernier stage, à l'Institut National de la Statistique : un <strong>micro-service d'IA on-premise</strong> qui lit, classe et résume le courrier administratif — OCR, LLM local, déploiement Docker. C'est ce qui m'anime : des modèles utiles, livrés avec ce qu'il faut pour les faire tourner, et la sécurité en tête.",
  'about.p3': "Je cherche un <strong>stage d'ingénieur IA de 3 mois à partir d'août 2027</strong> à Paris / Île-de-France, puis une <strong>alternance à partir de novembre 2027</strong>.",
  'about.s1': 'pages traitées par OCR', 'about.s2': 'types de documents classés', 'about.s3': 'projets phares',
  'about.focus': 'Domaines de prédilection', 'about.langs': 'Langues',
  'badge.role': 'Élève-ingénieur · IA', 'badge.level': 'NIVEAU', 'badge.loc': 'LIEU', 'badge.status': 'STATUT',
  'badge.online': 'EN LIGNE', 'badge.open': 'stage IA · août 2027',
  'edu.tag': 'education', 'edu.title': 'Mon', 'edu.hl': 'parcours.', 'edu.sub': 'Sélectionnez une étape pour en voir le détail.',
  'skills.tag': 'stack', 'skills.title': 'La boîte', 'skills.hl': 'à outils.', 'skills.sub': 'Choisissez une catégorie — les technologies se mettent en orbite.',
  'proj.tag': 'projects', 'proj.title': 'Projets', 'proj.hl': 'sélectionnés.', 'proj.sub': 'Data science, mobile et sécurité : trois terrains, une même exigence.',
  'exp.tag': 'experience', 'exp.title': 'Sur le', 'exp.hl': 'terrain.', 'int.title': 'En dehors du code',
  'contact.tag': 'contact', 'contact.big1': 'Un stage, une alternance,', 'contact.big2': 'un projet ? Parlons-en.',
  'contact.sub': 'Écrivez-moi par mail ou utilisez le formulaire ci-dessous.',
  'contact.copy': 'Copier', 'contact.copied': 'Copié !', 'contact.loc': 'Localisation', 'contact.cvFile': 'Version anglaise · PDF',
  'form.title': 'Envoyer un message', 'form.name': 'Nom', 'form.email': 'E-mail', 'form.subject': 'Sujet', 'form.message': 'Message',
  'form.send': 'Envoyer', 'form.ok': "Votre messagerie s'ouvre avec le message pré-rempli.",
  progress: 'Progression', done: 'Terminé', ongoing: 'En cours',
  pro: 'Professionnelle', perso: 'Personnelle', hackathon: 'Hackathon',
  'aria.lang': 'Changer de langue', 'aria.theme': 'Changer de thème', 'aria.menu': 'Menu', 'aria.top': 'Remonter en haut',
  'footer.made': 'Conçu et développé avec Angular',
};
export type UiKey = keyof typeof FR;

export const UI_TEXT: Record<Lang, Record<UiKey, string>> = {
  fr: FR,
  en: {
    'nav.about': 'About', 'nav.edu': 'Journey', 'nav.skills': 'Stack', 'nav.projects': 'Projects',
    'nav.exp': 'Experience', 'nav.contact': 'Contact', 'nav.cv': 'CV',
    skip: 'Skip to main content',
    'hero.status': 'Open to a 3-month AI internship · Aug 2027', 'hero.hello': "// Hi, I'm",
    'hero.build': 'I build and deploy',
    'hero.lead': 'Engineering student at Efrei Paris, focused on AI engineering: LLMs, NLP and data, plus the deployment side — Docker, CI/CD, monitoring. Security is a strength: OWASP reviews, WAF, intrusion detection.',
    'hero.cta1': 'See my projects', 'hero.cta2': 'Download CV', 'hero.scroll': 'scroll',
    'about.tag': 'whoami', 'about.title': 'Data, models', 'about.hl': '& deployment.',
    'about.p1': '<strong>2nd-year engineering student (ING2)</strong> at <strong>Efrei Paris</strong>, English track, after completing the <strong>Computer Science & Information Systems</strong> engineering cycle at Institut Saint Jean, Yaounde.',
    'about.p2': 'My latest internship, at the National Institute of Statistics: an <strong>on-premise AI micro-service</strong> that reads, classifies and summarises administrative mail — OCR, a local LLM, Docker deployment. That is what drives me: useful models, shipped with what it takes to run them, and security in mind.',
    'about.p3': "I'm looking for a <strong>3-month AI Engineer internship from August 2027</strong> in Paris / Île-de-France, then an <strong>apprenticeship from November 2027</strong>.",
    'about.s1': 'pages processed by OCR', 'about.s2': 'document types classified', 'about.s3': 'key projects',
    'about.focus': 'Focus areas', 'about.langs': 'Languages',
    'badge.role': 'Engineering student · AI', 'badge.level': 'LEVEL', 'badge.loc': 'LOC', 'badge.status': 'STATUS',
    'badge.online': 'ONLINE', 'badge.open': 'AI internship · Aug 2027',
    'edu.tag': 'education', 'edu.title': 'My', 'edu.hl': 'journey.', 'edu.sub': 'Select a step to see the details.',
    'skills.tag': 'stack', 'skills.title': 'The', 'skills.hl': 'toolbox.', 'skills.sub': 'Pick a category — the technologies go into orbit.',
    'proj.tag': 'projects', 'proj.title': 'Selected', 'proj.hl': 'projects.', 'proj.sub': 'Data science, mobile and security: three fields, one standard.',
    'exp.tag': 'experience', 'exp.title': 'In the', 'exp.hl': 'field.', 'int.title': 'Beyond code',
    'contact.tag': 'contact', 'contact.big1': 'An internship, an apprenticeship,', 'contact.big2': "a project? Let's talk.",
    'contact.sub': 'Email me or use the form below.',
    'contact.copy': 'Copy', 'contact.copied': 'Copied!', 'contact.loc': 'Location', 'contact.cvFile': 'English version · PDF',
    'form.title': 'Send a message', 'form.name': 'Name', 'form.email': 'Email', 'form.subject': 'Subject', 'form.message': 'Message',
    'form.send': 'Send', 'form.ok': 'Your mail app opens with the message pre-filled.',
    progress: 'Progress', done: 'Completed', ongoing: 'In progress',
    pro: 'Professional', perso: 'Personal', hackathon: 'Hackathon',
    'aria.lang': 'Switch language', 'aria.theme': 'Toggle theme', 'aria.menu': 'Menu', 'aria.top': 'Back to top',
    'footer.made': 'Designed & built with Angular',
  },
};

/* ================= Profil ================= */
export const PROFILE = {
  firstNames: 'Celestin Gills',
  lastName: 'SIMO NOUAYOU',
  displayFirst: 'Celestin',
  displayLast: 'Simo',
  initials: 'CS',
  email: 'celestin.simonouayou@gmail.com',
  location: { fr: 'Région parisienne, France', en: 'Paris area, France' } as Localized,
  github: 'https://github.com/sims08265',
  githubHandle: 'sims08265',
  linkedin: 'https://www.linkedin.com/in/celestin-simo-nouayou',
  linkedinHandle: 'celestin-simo-nouayou',
  cv: 'My_CV.pdf',
  /** Badge d'accès (section À propos). */
  badgeTop: 'EFREI · ACCESS',
  level: 'ING2 · Efrei Paris',
  /** Fin de phrase qui s'écrit en boucle après « Je conçois et déploie ». */
  typed: {
    fr: ['des pipelines OCR', 'des LLM en local', 'des modèles de ML', 'des API FastAPI', 'des pipelines CI/CD'],
    en: ['OCR pipelines', 'local LLMs', 'ML models', 'FastAPI services', 'CI/CD pipelines'],
  } as Localized<string[]>,
  stats: [
    { value: 617, key: 'about.s1' },
    { value: 65, key: 'about.s2' },
    { value: 4, key: 'about.s3' },
  ] as { value: number; key: UiKey }[],
  languages: [
    { name: { fr: 'Français', en: 'French' }, level: 5, note: { fr: 'Langue maternelle', en: 'Native' } },
    { name: { fr: 'Anglais', en: 'English' }, level: 4, note: { fr: 'Professionnel · TOEIC 780 (B2)', en: 'Professional · TOEIC 780 (B2)' } },
    { name: { fr: 'Espagnol', en: 'Spanish' }, level: 1, note: { fr: 'Notions', en: 'Basic' } },
  ] as { name: Localized; level: number; note: Localized }[],
  focus: [
    { icon: 'brain', title: same('LLM & NLP'), text: same('Llama 3, Ollama, prompt engineering') },
    { icon: 'database', title: same('Data & ML'),
      text: { fr: "OCR, Machine Learning, détection d'anomalies", en: 'OCR, machine learning, anomaly detection' } },
    { icon: 'layers', title: { fr: 'Déploiement', en: 'Deployment' }, text: same('FastAPI, Docker, CI/CD, monitoring') },
    { icon: 'shield', title: { fr: 'Sécurité', en: 'Security' },
      text: { fr: "Revues OWASP, WAF, détection d'intrusion", en: 'OWASP reviews, WAF, intrusion detection' } },
  ] as { icon: IconName; title: Localized; text: Localized }[],
};

/* ================= Hero : terminal et cartes flottantes ================= */
// Le HTML des sorties est injecté tel quel ([innerHTML]) : il ne vient que de ce fichier.
export const TERMINAL = {
  title: 'celestin@efrei — zsh',
  script: [
    { cmd: 'whoami', out: ['<span class="s">celestin_simo</span> <span class="m">— AI engineering student @ Efrei Paris</span>'] },
    { cmd: 'cat focus.txt', out: ['<span class="k">llm</span> · <span class="k">nlp</span> · <span class="k">data</span> · <span class="k">deployment</span>'] },
    { cmd: 'cat ins_internship.log', out: [
      '<span class="m">ocr</span> 617 pages · 96.8% mean confidence',
      '<span class="p">✔</span> 65 document types · Llama 3 8B via Ollama',
    ] },
    { cmd: 'cat next.txt', out: [
      '<span class="m">aug 2027 →</span> AI internship, 3 months <span class="p">open</span>',
      '<span class="m">nov 2027 →</span> apprenticeship',
    ] },
  ] as { cmd: string; out: string[] }[],
};

export const HERO_FLOATS: { icon: IconName; title: Localized; text: string }[] = [
  { icon: 'brain', title: same('LLM & NLP'), text: 'Llama 3 · Ollama' },
  { icon: 'layers', title: { fr: 'Déploiement', en: 'Deployment' }, text: 'Docker · CI/CD' },
];

/** Défilement de technologies sous le hero. */
export const MARQUEE = ['Python', 'Java', 'JavaScript', 'SQL', 'C / C++', 'Spring Boot', 'Angular', 'React Native',
  'Node.js', 'NestJS', 'PostgreSQL', 'Pandas', 'Scikit-learn', 'Streamlit', 'Prophet', 'Nmap', 'Metasploit', 'GitLab'];

/* ================= Formation ================= */
export interface Education {
  id: number; icon: IconName; period: string; year: string; watermark: string;
  /** Pourcentage terminé ; absent = formation en cours (affiche `level` au lieu d'un pourcentage). */
  progress?: number; level?: string;
  title: Localized; org: string; points: Localized<string[]>;
}
export const EDUCATION: Education[] = [
  {
    id: 1, icon: 'cap', period: '09/2026 – 2028', year: '2028', level: 'ING2', watermark: 'EFREI',
    title: { fr: "Diplôme d'ingénieur (Programme Grande École)", en: 'Engineering degree (Programme Grande École)' },
    org: 'Efrei Paris',
    points: {
      fr: ['2ᵉ année du cycle ingénieur (ING2), filière anglophone',
        'Cours : analyse de données, probabilités et statistiques, méthodes numériques, théorie des graphes, bases de données'],
      en: ['2nd year of the engineering cycle (ING2), English track',
        'Relevant courses: Data Analysis, Probability & Statistics, Numerical Methods, Graph Theory, Databases'],
    },
  },
  {
    id: 2, icon: 'cap', period: '09/2022 – 08/2026', year: '2026', progress: 100, watermark: 'IUSJ',
    title: { fr: 'Cycle ingénieur', en: 'Engineering cycle' },
    org: 'Institut Saint Jean (IUSJ), Yaoundé',
    points: {
      fr: ["Filière Informatique et Systèmes d'Information", "Projet de fin d'études : TRUSTY (voir Projets)"],
      en: ['Computer Science & Information Systems', 'Final-year project: TRUSTY (see Projects)'],
    },
  },
  {
    id: 3, icon: 'book', period: '06/2022', year: '2022', progress: 100, watermark: 'BAC',
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
export interface Experience {
  kind: 'pro' | 'perso' | 'hackathon';
  /** « MM/AAAA – MM/AAAA » ou une seule date. */
  date: string; title: Localized; org: Localized;
  summary?: Localized;
  /** Puces détaillées ; le HTML (<strong>) est injecté tel quel et ne vient que de ce fichier. */
  details?: Localized<string[]>;
  /** Petites étiquettes (outils, tâches). */
  points?: Localized<string[]>;
}
export const EXPERIENCES: Experience[] = [
  {
    kind: 'pro', date: '05/2026 – 08/2026',
    title: { fr: 'Stagiaire ingénieur IA / NLP', en: 'AI / NLP Engineering Intern' },
    org: { fr: 'Institut National de la Statistique (INS), Yaoundé, Cameroun', en: 'National Institute of Statistics (INS), Yaounde, Cameroon' },
    summary: {
      fr: "Micro-service d'IA on-premise qui automatise l'analyse du courrier administratif, intégré à l'application MailsoftApp.",
      en: 'On-premise AI micro-service that automates the analysis of administrative mail, integrated into the MailsoftApp application.',
    },
    details: {
      fr: [
        '<strong>Pipeline OCR</strong> : service FastAPI pour PDF natifs et scannés, images et fichiers Word (PaddleOCR, pypdf), testé sur <strong>617 pages</strong> avec <strong>96,8 %</strong> de confiance OCR moyenne.',
        "<strong>NLP et LLM</strong> : classification en <strong>65 types de documents</strong> et extraction des champs clés en JSON avec un LLM local (Llama 3 8B via Ollama), prompts few-shot et contrôles anti-hallucination.",
        '<strong>Résumé</strong> des courriers à plusieurs pièces jointes, avec un mode webhook asynchrone : <strong>plus de 400 documents</strong> traités en test.',
        '<strong>Déploiement entièrement local sous Docker</strong> : aucune donnée envoyée dans le cloud.',
      ],
      en: [
        '<strong>OCR pipeline</strong>: FastAPI service for native and scanned PDFs, images and Word files (PaddleOCR, pypdf), tested on <strong>617 pages</strong> with <strong>96.8%</strong> mean OCR confidence.',
        '<strong>NLP and LLM</strong>: classification into <strong>65 document types</strong> and key-field extraction to JSON with a local LLM (Llama 3 8B via Ollama), few-shot prompting and anti-hallucination checks.',
        '<strong>Summarisation</strong> of mail with several attachments, with an async webhook mode: <strong>400+ documents</strong> processed in testing.',
        '<strong>Fully local Docker deployment</strong>: no data sent to the cloud.',
      ],
    },
    points: same(['FastAPI', 'PaddleOCR', 'pypdf', 'Llama 3 8B', 'Ollama', 'Docker']),
  },
  {
    kind: 'hackathon', date: '2026',
    title: same('WFEO World Engineering Day Hackathon 2026'),
    org: { fr: 'En ligne · équipe de 4', en: 'Online · team of 4' },
    summary: {
      fr: '« Urban Resource Loop » : un hub de collecte des déchets plastiques pour Yaoundé.',
      en: '“Urban Resource Loop”: a plastic-waste collection hub for Yaounde.',
    },
    details: {
      fr: ['Ma part : le bilan de masse, la conception du système de crédits sur blockchain et le modèle économique (CAPEX, OPEX, ROI).',
        'Certificat de participation.'],
      en: ['My part: the mass balance, the design of the blockchain credit system, and the business model (CAPEX, OPEX, ROI).',
        'Participant certificate.'],
    },
  },
  { kind: 'pro', date: '07/2023 – 08/2023', title: { fr: 'Stagiaire', en: 'Intern' }, org: same('Level Up Corporation') },
  { kind: 'perso', date: '07/2021 – 08/2021', title: { fr: 'Caissier', en: 'Cashier' }, org: same('Alimentation Las Gracias, Ekounou'),
    points: { fr: ['Gestion des finances', 'Inventaires'], en: ['Cash management', 'Inventory'] } },
  { kind: 'perso', date: '07/2020 – 08/2020', title: { fr: 'Agent commercial', en: 'Sales agent' }, org: same('Librairie papeterie SOCOCAM SARL') },
];

export const INTERESTS: { icon: IconName; label: Localized }[] = [
  { icon: 'ball', label: same('Football') },
  { icon: 'utensils', label: { fr: 'Cuisine', en: 'Cooking' } },
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
  pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowUpRight: '<path d="M7 17 17 7M8 7h9v9"/>',
  download: '<path d="M12 3v12m0 0-4-4m4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
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
  utensils: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>',
  music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  flask: '<path d="M9 3h6M10 3v6L4 20a1 1 0 0 0 .9 1.5h14.2A1 1 0 0 0 20 20l-6-11V3"/><path d="M7 15h10"/>',
  zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
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
