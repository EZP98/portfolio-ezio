import React, { createContext, useContext, useState, ReactNode } from 'react';

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
    heroTitle: 'Chief Marketing Officer\nConiugando Innovazione e Tradizione',
    connect: 'Connetti',
    viewLinkedIn: 'Vedi il mio LinkedIn',
    startup: 'Startup',
    discoverAlbicchiere: 'Scopri Albicchiere',
    creative: 'Creativo',
    myVideoProjects: 'I miei progetti video',
    
    // Sections
    videoWorks: 'Lavori Video',
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
    chatbot: 'Chatbot',
    database: 'Database',
    cocktailAIDesc: 'Sviluppato un chatbot intelligente che fornisce raccomandazioni personalizzate di cocktail basate sulle preferenze dell\'utente, ingredienti disponibili e occasioni. L\'AI analizza i profili di gusto e suggerisce combinazioni creative di cocktail su misura per le preferenze individuali.',
    aiDBSearchDesc: 'Creato un chatbot RAG (Retrieval-Augmented Generation) che recupera e sintetizza intelligentemente informazioni dal database di Albicchiere. Permette query in linguaggio naturale per informazioni sui prodotti, specifiche tecniche e insights aziendali.',
    openAIAPI: 'API OpenAI',
    nlp: 'Elaborazione del Linguaggio Naturale',
    recommendationEngine: 'Motore di Raccomandazione',
    ragArchitecture: 'Architettura RAG',
    vectorDatabase: 'Database Vettoriale',
    semanticSearch: 'Ricerca Semantica',
    
    // About
    aboutIntro: 'Sono',
    aboutText1: ', un professionista del marketing appassionato di',
    innovation: 'Innovazione',
    and: 'e',
    creativeStorytelling: 'Storytelling Creativo',
    aboutText2: '. Attualmente CMO presso',
    aboutText3: 'da novembre 2022, dove guido la strategia di marketing, design UI/UX e sviluppo prodotto.',
    aboutBio: 'Nato in Umbria nel 1998 con radici meridionali. Sono appassionato di cinema e ciclismo, attività fortemente caratterizzate da creatività e spirito di squadra: proprio come il marketing. Lavorare in team e affrontare problemi diversi utilizzando non solo regole fisse ma anche principi mutevoli è ciò che apprezzo di più. Ho sempre ammirato la felicità e la meraviglia create dai prodotti: spero di diventare non solo un fruitore ma un creatore di tale magia.',
    findMeOn: 'Mi trovi su',
    whereIShare: 'dove condivido intuizioni su marketing, tecnologia del vino e progetti creativi.',
    
    // Experience
    currentPosition: 'Posizione Attuale',
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
    b2EnglishCert: 'Certificazione Inglese B2',
    
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
    copyright: '© 2024 Ezio Pappalardo. Tutti i diritti riservati.',
    privacyPolicy: 'Privacy Policy',
    termsOfUse: 'Termini di Utilizzo',
    
    // Misc
    email: 'E-Mail',
    copied: 'Copiato!',
  },
  en: {
    // Navigation
    works: 'Works',
    services: 'Services',
    products: 'Products',
    
    // Hero
    heroTitle: 'Chief Marketing Officer\nBlending Innovation With Tradition',
    connect: 'Connect',
    viewLinkedIn: 'View my LinkedIn',
    startup: 'Startup',
    discoverAlbicchiere: 'Discover Albicchiere',
    creative: 'Creative',
    myVideoProjects: 'My video projects',
    
    // Sections
    videoWorks: 'Video Works',
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
    chatbot: 'Chatbot',
    database: 'Database',
    cocktailAIDesc: 'Developed an intelligent chatbot that provides personalized cocktail recommendations based on user preferences, available ingredients, and occasions. The AI analyzes taste profiles and suggests creative cocktail combinations tailored to individual preferences.',
    aiDBSearchDesc: 'Created a RAG (Retrieval-Augmented Generation) chatbot that intelligently retrieves and synthesizes information from Albicchiere\'s database. Enables natural language queries for product information, technical specifications, and business insights.',
    openAIAPI: 'OpenAI API',
    nlp: 'Natural Language Processing',
    recommendationEngine: 'Recommendation Engine',
    ragArchitecture: 'RAG Architecture',
    vectorDatabase: 'Vector Database',
    semanticSearch: 'Semantic Search',
    
    // About
    aboutIntro: "I'm",
    aboutText1: ', a marketing professional passionate about',
    innovation: 'Innovation',
    and: 'and',
    creativeStorytelling: 'Creative Storytelling',
    aboutText2: '. Currently serving as CMO at',
    aboutText3: 'since November 2022, where I lead marketing strategy, UI/UX design, and product development.',
    aboutBio: 'Born in Umbria 1998 with Southern roots. I am passionate about cinema and cycling, activities strongly characterized by creativity and team spirit: just like marketing. Working in teams and tackling different problems using not only fixed rules but also changing principles is what I appreciate most. I\'ve always admired the happiness and wonder created by products: I hope to become not just a recipient but a creator of such magic.',
    findMeOn: 'You can find me on',
    whereIShare: 'where I share insights about marketing, wine technology, and creative projects.',
    
    // Experience
    currentPosition: 'Current Position',
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
    b2EnglishCert: 'B2 English Certification',
    
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
    copyright: '© 2024 Ezio Pappalardo. All rights reserved.',
    privacyPolicy: 'Privacy Policy',
    termsOfUse: 'Terms of Use',
    
    // Misc
    email: 'E-Mail',
    copied: 'Copied!',
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