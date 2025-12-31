import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Language = 'it' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  it: {
    // Navigation
    works: 'Lavori',
    services: 'Servizi',
    products: 'Prodotti',
    
    // Hero
    heroTitle: 'Ezio Pappalardo\nVibe Coding & Digital Products',
    connect: 'Connetti',
    viewLinkedIn: 'Vedi il mio LinkedIn',
    startup: 'Startup',
    discoverAlbicchiere: 'Scopri Albicchiere',
    creative: 'Content',
    myVideoProjects: 'Il mio portfolio visivo',
    
    // Sections
    videoWorks: 'Content Marketing',
    aiProjects: 'Progetti AI',
    toolsSkills: 'Strumenti e Competenze',
    experienceEducation: 'Esperienza e Formazione',
    
    // Showcase
    vinitalyBadge: 'Vinitaly 2025 & Vincitore Premio CES ↓',
    showcaseTitle: 'Albi Home M+ a Vinitaly 2025',
    showcaseSubtitle: 'Dove la tradizione familiare incontra l\'innovazione del vino',
    getUpdates: 'Ricevi aggiornamenti su Albicchiere',
    subscribe: 'Iscriviti',
    latestUpdates: 'Ultimi Aggiornamenti ↓',
    vinitalySuccess: 'Successo a Vinitaly 2025',
    cesAwardWinner: 'Vincitore Premio CES',
    iotWineTech: 'Tecnologia IoT per il Vino',
    showcaseStory1: 'Partecipare a Vinitaly 2025 con Albicchiere è stata un\'esperienza davvero gratificante. Presentare il nostro Albi Home M+, già premiato al CES di Las Vegas, in un contesto così prestigioso ha dato valore alle giornate di lavoro intenso che ci hanno portato fino a qui.',
    showcaseStory2: 'La mia passione per il vino affonda le radici nella tradizione familiare. Con mio nonno materno ho vissuto la magia della vendemmia e imparato l\'arte della vinificazione, mentre mio nonno paterno mi ha trasmesso la sua passione enologica attraverso i racconti dei vini toscani e piemontesi. Conservo ancora i preziosi volumi che mi ha lasciato.',
    
    // Works
    poetryFilm: 'Film di Poesia',
    artFilm: 'Film d\'Arte',
    documentary: 'Documentario',
    corporate: 'Aziendale',
    theRuin: 'Il rudere',
    perugiaElegy: 'Elegia perugina',
    placesOfSoul: 'I luoghi dell\'anima',
    oneHeartAlone: 'Un cuore solo',
    studioHouse: 'Casa studio',
    albicchiereStory: 'Storia Albicchiere',
    
    // Projects
    cocktailAI: 'Cocktail AI',
    aiDBSearch: 'Ricerca DB AI',
    adeleLoFeudo: 'Adele Lo Feudo Art',
    arcadeAlbicchiere: 'Arcade Albicchiere',
    chatbot: 'Chatbot',
    database: 'Database',
    cms: 'CMS',
    portfolio: 'Portfolio',
    marketing: 'Marketing',
    gameDesign: 'Game Design',
    cocktailAIDesc: 'Il tuo bartender AI personale. Scopri ricette perfette partendo dagli ingredienti che hai a casa, gestisci il tuo HomeBar con inventory tracking, e impara la scienza della mixology con un assistente esperto. Per i professionisti: crea menu, analizza margini e gestisci il locale. 80K+ righe di codice, mappe 3D interattive, AI conversazionale.',
    aiDBSearchDesc: 'Database intelligente che parla italiano. Fai domande in linguaggio naturale e ottieni risposte precise dai tuoi dati. Ideale per analisi business, reportistica automatica e query complesse senza scrivere SQL. Sistema RAG che comprende contesto e relazioni tra tabelle.',
    adeleLoFeudoDesc: 'Progetto completo per una pittrice contemporanea: sito web multilingue (9 lingue), CMS su misura per gestire collezioni e mostre, e-commerce integrato. Ho curato anche shooting fotografico delle opere e campagne Meta Ads per raggiungere collezionisti internazionali.',
    arcadeAlbicchiereDesc: 'Easter egg nascosto nel sito Albicchiere: mini-giochi arcade a tema vino con grafica pixel art. Un tocco di personalità che sorprende gli utenti più curiosi.',
    landingTemplate: 'Aurora',
    landingTemplateDesc: 'Template landing page in stile Framer con palette colori pastello. Design colorato e giocoso per portfolio creativi, con animazioni fluide e componenti riutilizzabili.',
    portfolioDark: 'Obsidian',
    portfolioDarkDesc: 'Template portfolio dark theme per designer e freelancer. Design minimalista con accento verde, sezioni per progetti, servizi, testimonianze, prezzi e FAQ.',
    hanzoTemplate: 'Slate',
    hanzoTemplateDesc: 'Template landing page per agenzie di design con abbonamento. Background grigio chiaro con accento arancione, sezioni per processo, progetti, testimonianze, prezzi e FAQ. Menu fullscreen animato.',
    template: 'Template',
    framer: 'Framer Style',
    darkTheme: 'Dark Theme',
    agency: 'Agency',
    claudeSDK: 'Claude SDK',
    openAI: 'OpenAI API',
    threeJS: 'Three.js',
    react18: 'React 18',
    typescript: 'TypeScript',
    supabase: 'Supabase',
    cloudflare: 'Cloudflare',
    tailwind: 'Tailwind CSS',
    vite: 'Vite',
    figma: 'Figma',
    metaAds: 'Meta Ads',
    htmlCss: 'HTML/CSS',
    javascript: 'JavaScript',
    viewProject: 'Vedi Progetto',
    linesOfCode: 'righe di codice',
    
    // About
    aboutIntro: 'Sono',
    aboutText1: ', un professionista del marketing appassionato di',
    innovation: 'Innovazione',
    and: 'e',
    creativeStorytelling: 'Storytelling Creativo',
    aboutText2: '. Ho lavorato come CMO presso',
    aboutText3: 'da novembre 2022 a dicembre 2025, dove ho guidato la strategia di marketing, design UI/UX e sviluppo prodotto.',
    aboutBio: 'Nato in Umbria nel 1998 con radici meridionali. Sono appassionato di cinema e ciclismo, attività fortemente caratterizzate da creatività e spirito di squadra: proprio come il marketing. Lavorare in team e affrontare problemi diversi utilizzando non solo regole fisse ma anche principi mutevoli è ciò che apprezzo di più. Ho sempre ammirato la felicità e la meraviglia create dai prodotti: spero di diventare non solo un fruitore ma un creatore di tale magia.',
    findMeOn: 'Mi trovi su',
    whereIShare: 'dove condivido intuizioni su marketing, tecnologia del vino e progetti creativi.',
    
    // Experience
    currentPosition: 'Posizione Attuale',
    work: 'Lavoro',
    creativeWork: 'Lavoro Creativo',
    education: 'Formazione',
    achievement: 'Risultato',
    certification: 'Certificazione',
    chiefMarketingOfficer: 'Chief Marketing Officer',
    poetryVideomaker: 'Videomaker di Poesia e Fotografo',
    freelance: 'Freelance',
    masterMovieDistribution: 'Master in Distribuzione Cinematografica',
    masterWineExport: 'Master in Export Management del Vino',
    businessManagement: 'Gestione Aziendale',
    pgPanteneWinner: 'Vincitore Business Case P&G Pantene',
    masterclassAnnie: 'Masterclass con Annie Leibovitz',
    masterclassMartin: 'Masterclass con Martin Scorsese',
    c1EnglishCert: 'Certificazione Inglese C1',
    albicchiereDesc: 'Ho guidato marketing e prodotto in una startup IoT wine-tech con un team di 6 persone. Product Management con sprint planning e 150+ test cases QA. UI/UX Design di 100+ schermate Figma per app mobile, backoffice e dashboard B2B. Frontend Development di landing pages e pagine creative. Business Development con pitch deck e candidature a finanziamenti. Coordinamento del Taiwan Internship Program con 6 studenti in 3 anni. Creazione di un brand manual di 80 pagine e packaging innovativo con Braille.',
    kickstarterStats: '\u20ac370K raccolti | 1,300 backer | 61 paesi',
    cesAward: 'CES Innovation Award 2020',
    masterMovieDistDesc: 'Formazione specialistica in distribuzione audiovisiva, con focus su strategie di marketing cinematografico, nuovi modelli di business e piattaforme digitali. Il programma ha incluso analisi di case study reali e project work finale realizzato in collaborazione con The Space Cinema, sviluppando competenze pratiche nella pianificazione di release cinematografiche e strategie di audience development.',
    businessManagementDesc: 'Laurea triennale con lode (110 e Lode) in Economia Aziendale. Percorso formativo incentrato su analisi di bilancio, economia aziendale e statistica applicata. Ho sviluppato solide competenze in pianificazione strategica, controllo di gestione e analisi dei dati, applicando metodologie quantitative a casi aziendali reali.',
    pgPanteneDesc: 'Vincitore della Business Case Competition P&G presso UniPG, dove ho sviluppato una strategia completa di rilancio del brand Pantene. Ho presentato un\'analisi approfondita del marketing mix (Prodotto, Prezzo, Distribuzione, Comunicazione) a una giuria composta da Alessandro Zito (Trade Director Manager, Gillette Italia) e Prof.ssa Marina Gigliotti (UniPG). La proposta includeva strategie innovative di posizionamento e ottimizzazione della distribuzione retail per il mercato italiano.',
    annieMasterclassDesc: 'Studio approfondito di fotografia ritrattistica con la leggendaria Annie Leibovitz. Ho acquisito tecniche di storytelling visivo, gestione della luce naturale e approcci concettuali alla narrazione fotografica. Il corso ha fornito una prospettiva unica sulla creazione di immagini iconiche e sulla costruzione di una visione artistica personale.',
    martinMasterclassDesc: 'Formazione cinematografica con il premio Oscar Martin Scorsese. Ho esplorato tecniche di storytelling, approcci al montaggio e direzione degli attori attraverso l\'analisi di capolavori del cinema. Il corso ha approfondito il processo creativo di uno dei più grandi registi della storia, dalla pre-produzione alla post-produzione.',
    c1EnglishDesc: 'Certificazione di livello C1 in lingua inglese, attestante competenze avanzate nella comunicazione professionale e accademica. La certificazione dimostra padronanza nella comprensione di testi complessi, espressione fluente e capacità di utilizzare la lingua in contesti lavorativi internazionali.',
    
    // Stack
    uiuxDesign: 'Design UI/UX',
    aiAssistant: 'Assistente AI',
    aiLanguageModel: 'Modello di Linguaggio AI',
    aiSearchEngine: 'Motore di Ricerca AI',
    aiImageGen: 'Generazione Immagini AI',
    designTool: 'Strumento di Design',
    videoEditing: 'Editing Video',
    colorGrading: 'Color Grading',
    backendService: 'Backend as a Service',
    designDev: 'Design e Sviluppo',
    aiDevelopment: 'Sviluppo AI',
    versionControl: 'Controllo Versione',
    webInfrastructure: 'Infrastruttura Web',
    professionalNetwork: 'Network Professionale',
    
    // Footer
    newsletter: 'Newsletter',
    getLatestUpdates: 'Ricevi gli ultimi aggiornamenti',
    emailPlaceholder: 'La tua email',
    quickLinks: 'Link Rapidi',
    home: 'Home',
    about: 'Chi Sono',
    contact: 'Contatti',
    copyright: '© 2026 Ezio Pappalardo. Tutti i diritti riservati.',
    privacyPolicy: 'Privacy Policy',
    termsOfUse: 'Termini di Utilizzo',
    
    // Misc
    email: 'E-Mail',
    copied: 'Copiato!',

    // CTA Section
    ctaTitle: 'Il prossimo prodotto digitale è solo una conversazione di distanza',
    ctaSubtitle: 'Pronto a trasformare la tua idea in un prodotto digitale di successo? Contattami per discutere della tua strategia.',
    getInTouch: 'Contattami',

    // Introduction Section
    introBadge: 'Filosofia',
    introText: 'Creo prodotti digitali e strategie di marketing che convertono. Dall\'ideazione al lancio, unisco AI, branding e performance marketing per trasformare idee in risultati concreti.',
    introCopyright: '© 2026 Ezio Pappalardo',

    // Testimonials Section
    testimonials: 'Testimonianze',
    testimonialsTitle: 'Cosa dicono di me',
    testimonialsDescription: 'Ho avuto il privilegio di collaborare con professionisti e aziende che hanno creduto nella mia visione. Ecco cosa pensano del nostro lavoro insieme.',
    contactMe: 'Contattami',
    testimonial1Text: 'Ezio ha trasformato completamente la nostra strategia di marketing digitale. La sua capacità di unire creatività e analisi dei dati ha portato risultati eccezionali.',
    testimonial2Text: 'Un professionista che sa ascoltare e tradurre le esigenze in soluzioni concrete. Il progetto è stato consegnato nei tempi e ha superato le aspettative.',
    testimonial3Text: 'La collaborazione con Ezio è stata fondamentale per il lancio del nostro brand. Visione strategica e attenzione ai dettagli lo contraddistinguono.',
    testimonial4Text: 'Competenza tecnica e sensibilità creativa raramente si trovano nella stessa persona. Ezio è uno di quei rari professionisti che eccelle in entrambe.',

    // Components Section
    components: 'Componenti',
    componentsDesc: 'Componenti UI riutilizzabili costruiti con React e design system modulare.',
    designSystemDesc: 'Sistema di design coerente con variabili CSS e componenti standardizzati.',
    darkModeDesc: 'Supporto completo per tema chiaro e scuro con transizioni fluide.',
    responsiveDesc: 'Design responsive che si adatta a tutti i dispositivi.',
    tokensDesc: 'Design tokens per colori, spacing, tipografia e raggi.',

    // Photography Section
    photography: 'Fotografia',
  },
  en: {
    // Navigation
    works: 'Works',
    services: 'Services',
    products: 'Products',
    
    // Hero
    heroTitle: 'Ezio Pappalardo\nVibe Coding & Digital Products',
    connect: 'Connect',
    viewLinkedIn: 'View my LinkedIn',
    startup: 'Startup',
    discoverAlbicchiere: 'Discover Albicchiere',
    creative: 'Content',
    myVideoProjects: 'My visual portfolio',
    
    // Sections
    videoWorks: 'Content Marketing',
    aiProjects: 'AI Projects',
    toolsSkills: 'Tools & Skills',
    experienceEducation: 'Experience & Education',
    
    // Showcase
    vinitalyBadge: 'Vinitaly 2025 & CES Award Winner ↓',
    showcaseTitle: 'Albi Home M+ at Vinitaly 2025',
    showcaseSubtitle: 'Where family tradition meets wine innovation',
    getUpdates: 'Get updates about Albicchiere',
    subscribe: 'Subscribe',
    latestUpdates: 'Latest Updates ↓',
    vinitalySuccess: 'Vinitaly 2025 Success',
    cesAwardWinner: 'CES Award Winner',
    iotWineTech: 'IoT Wine Technology',
    showcaseStory1: 'Participating in Vinitaly 2025 with Albicchiere has been a truly rewarding experience. Presenting our Albi Home M+, already awarded at CES in Las Vegas, in such a prestigious context has given value to the intense workdays that brought us here.',
    showcaseStory2: 'My passion for wine is deeply rooted in family tradition. With my maternal grandfather, I experienced the magic of the harvest and learned the art of winemaking, while my paternal grandfather passed on his enological passion through stories of Tuscan and Piedmontese wines. I still cherish the precious volumes he left me.',
    
    // Works
    poetryFilm: 'Poetry Film',
    artFilm: 'Art Film',
    documentary: 'Documentary',
    corporate: 'Corporate',
    theRuin: 'The Ruin',
    perugiaElegy: 'Perugia Elegy',
    placesOfSoul: 'Places of the Soul',
    oneHeartAlone: 'One Heart Alone',
    studioHouse: 'Studio House',
    albicchiereStory: 'Albicchiere Story',
    
    // Projects
    cocktailAI: 'Cocktail AI',
    aiDBSearch: 'AI DB Search',
    adeleLoFeudo: 'Adele Lo Feudo Art',
    arcadeAlbicchiere: 'Arcade Albicchiere',
    chatbot: 'Chatbot',
    database: 'Database',
    cms: 'CMS',
    portfolio: 'Portfolio',
    marketing: 'Marketing',
    gameDesign: 'Game Design',
    cocktailAIDesc: 'Your personal AI bartender. Discover perfect recipes from ingredients you have at home, manage your HomeBar with inventory tracking, and learn mixology science with an expert assistant. For professionals: create menus, analyze margins, and manage your venue. 80K+ lines of code, interactive 3D maps, conversational AI.',
    aiDBSearchDesc: 'Smart database that speaks Italian. Ask questions in natural language and get precise answers from your data. Ideal for business analysis, automated reporting, and complex queries without writing SQL. RAG system that understands context and table relationships.',
    adeleLoFeudoDesc: 'Complete project for a contemporary painter: multilingual website (9 languages), custom CMS to manage collections and exhibitions, integrated e-commerce. I also handled artwork photo shooting and Meta Ads campaigns to reach international collectors.',
    arcadeAlbicchiereDesc: 'Easter egg hidden in the Albicchiere website: wine-themed arcade mini-games with pixel art graphics. A touch of personality that surprises curious users.',
    landingTemplate: 'Aurora',
    landingTemplateDesc: 'Framer-style landing page template with pastel color palette. Colorful and playful design for creative portfolios, featuring smooth animations and reusable components.',
    portfolioDark: 'Obsidian',
    portfolioDarkDesc: 'Dark theme portfolio template for designers and freelancers. Minimalist design with green accent, sections for projects, services, testimonials, pricing and FAQ.',
    hanzoTemplate: 'Slate',
    hanzoTemplateDesc: 'Landing page template for design subscription agencies. Light gray background with orange accent, sections for process, projects, testimonials, pricing and FAQ. Animated fullscreen menu.',
    template: 'Template',
    framer: 'Framer Style',
    darkTheme: 'Dark Theme',
    agency: 'Agency',
    claudeSDK: 'Claude SDK',
    openAI: 'OpenAI API',
    threeJS: 'Three.js',
    react18: 'React 18',
    typescript: 'TypeScript',
    supabase: 'Supabase',
    cloudflare: 'Cloudflare',
    tailwind: 'Tailwind CSS',
    vite: 'Vite',
    figma: 'Figma',
    metaAds: 'Meta Ads',
    htmlCss: 'HTML/CSS',
    javascript: 'JavaScript',
    viewProject: 'View Project',
    linesOfCode: 'lines of code',
    
    // About
    aboutIntro: "I'm",
    aboutText1: ', a marketing professional passionate about',
    innovation: 'Innovation',
    and: 'and',
    creativeStorytelling: 'Creative Storytelling',
    aboutText2: '. I worked as CMO at',
    aboutText3: 'from November 2022 to December 2025, where I led marketing strategy, UI/UX design, and product development.',
    aboutBio: 'Born in Umbria 1998 with Southern roots. I am passionate about cinema and cycling, activities strongly characterized by creativity and team spirit: just like marketing. Working in teams and tackling different problems using not only fixed rules but also changing principles is what I appreciate most. I\'ve always admired the happiness and wonder created by products: I hope to become not just a recipient but a creator of such magic.',
    findMeOn: 'You can find me on',
    whereIShare: 'where I share insights about marketing, wine technology, and creative projects.',
    
    // Experience
    currentPosition: 'Current Position',
    work: 'Work',
    creativeWork: 'Creative Work',
    education: 'Education',
    achievement: 'Achievement',
    certification: 'Certification',
    chiefMarketingOfficer: 'Chief Marketing Officer',
    poetryVideomaker: 'Poetry Videomaker & Photographer',
    freelance: 'Freelance',
    masterMovieDistribution: 'Master in Movie Distribution',
    masterWineExport: 'Master in Wine Export Management',
    businessManagement: 'Business Management',
    pgPanteneWinner: 'P&G Pantene Business Case Winner',
    masterclassAnnie: 'Masterclass with Annie Leibovitz',
    masterclassMartin: 'Masterclass with Martin Scorsese',
    c1EnglishCert: 'C1 English Certification',
    albicchiereDesc: 'Led marketing and product in an IoT wine-tech startup with a team of 6. Product Management with sprint planning and 150+ QA test cases. UI/UX Design of 100+ Figma screens for mobile app, backoffice, and B2B dashboard. Frontend Development of landing pages and creative pages. Business Development with pitch decks and funding applications. Coordination of the Taiwan Internship Program with 6 students over 3 years. Created an 80-page brand manual and innovative Braille packaging.',
    kickstarterStats: '\u20ac370K raised | 1,300 backers | 61 countries',
    cesAward: 'CES Innovation Award 2020',
    masterMovieDistDesc: 'Specialized training in audiovisual distribution, focusing on film marketing strategies, new business models, and digital platforms. The program included real case study analysis and a final project developed in collaboration with The Space Cinema, building practical skills in theatrical release planning and audience development strategies.',
    businessManagementDesc: 'Bachelor\'s degree with honors (110 e Lode) in Business Economics and Management. Educational path focused on financial analysis, business economics, and applied statistics. Developed solid skills in strategic planning, management control, and data analysis, applying quantitative methodologies to real business cases.',
    pgPanteneDesc: 'Winner of the P&G Business Case Competition at UniPG, where I developed a comprehensive brand relaunch strategy for Pantene. Presented an in-depth marketing mix analysis (Product, Price, Place, Promotion) to a jury including Alessandro Zito (Trade Director Manager, Gillette Italia) and Prof. Marina Gigliotti (UniPG). The proposal included innovative positioning strategies and retail distribution optimization for the Italian market.',
    annieMasterclassDesc: 'In-depth study of portrait photography with legendary photographer Annie Leibovitz. Acquired techniques for visual storytelling, natural light management, and conceptual approaches to photographic narratives. The course provided a unique perspective on creating iconic images and building a personal artistic vision.',
    martinMasterclassDesc: 'Filmmaking training with Oscar-winner Martin Scorsese. Explored storytelling techniques, editing approaches, and working with actors through analysis of cinema masterpieces. The course delved into the creative process of one of history\'s greatest directors, from pre-production to post-production.',
    c1EnglishDesc: 'C1 level English certification, demonstrating advanced proficiency in professional and academic communication. The certification attests mastery in understanding complex texts, fluent expression, and ability to use the language in international work contexts.',
    
    // Stack
    uiuxDesign: 'UI/UX Design',
    aiAssistant: 'AI Assistant',
    aiLanguageModel: 'AI Language Model',
    aiSearchEngine: 'AI Search Engine',
    aiImageGen: 'AI Image Generation',
    designTool: 'Design Tool',
    videoEditing: 'Video Editing',
    colorGrading: 'Color Grading',
    backendService: 'Backend as a Service',
    designDev: 'Design & Development',
    aiDevelopment: 'AI Development',
    versionControl: 'Version Control',
    webInfrastructure: 'Web Infrastructure',
    professionalNetwork: 'Professional Network',
    
    // Footer
    newsletter: 'Newsletter',
    getLatestUpdates: 'Get the latest updates',
    emailPlaceholder: 'Your email',
    quickLinks: 'Quick Links',
    home: 'Home',
    about: 'About',
    contact: 'Contact',
    copyright: '© 2026 Ezio Pappalardo. All rights reserved.',
    privacyPolicy: 'Privacy Policy',
    termsOfUse: 'Terms of Use',
    
    // Misc
    email: 'E-Mail',
    copied: 'Copied!',

    // CTA Section
    ctaTitle: 'Your next digital product is just a conversation away',
    ctaSubtitle: 'Ready to transform your idea into a successful digital product? Get in touch to discuss your strategy.',
    getInTouch: 'Get in touch',

    // Introduction Section
    introBadge: 'Philosophy',
    introText: 'I create digital products and marketing strategies that convert. From ideation to launch, I combine AI, branding and performance marketing to turn ideas into concrete results.',
    introCopyright: '© 2026 Ezio Pappalardo',

    // Testimonials Section
    testimonials: 'Testimonials',
    testimonialsTitle: 'What others say about me',
    testimonialsDescription: 'I have had the privilege of collaborating with professionals and companies who believed in my vision. Here is what they think of our work together.',
    contactMe: 'Contact me',
    testimonial1Text: 'Ezio completely transformed our digital marketing strategy. His ability to combine creativity with data analysis has brought exceptional results.',
    testimonial2Text: 'A professional who knows how to listen and translate needs into concrete solutions. The project was delivered on time and exceeded expectations.',
    testimonial3Text: 'Collaboration with Ezio was crucial for the launch of our brand. Strategic vision and attention to detail set him apart.',
    testimonial4Text: 'Technical competence and creative sensitivity are rarely found in the same person. Ezio is one of those rare professionals who excels in both.',

    // Components Section
    components: 'Components',
    componentsDesc: 'Reusable UI components built with React and modular design system.',
    designSystemDesc: 'Consistent design system with CSS variables and standardized components.',
    darkModeDesc: 'Full support for light and dark themes with smooth transitions.',
    responsiveDesc: 'Responsive design that adapts to all devices.',
    tokensDesc: 'Design tokens for colors, spacing, typography and radii.',

    // Photography Section
    photography: 'Photography',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};