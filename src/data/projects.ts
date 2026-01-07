export interface ProjectDetail {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  link: string;
  image: string;
  gallery: string[];
  techStack: string[];
  status: 'live' | 'development' | 'idea';
  year: string;
}

export const projects: ProjectDetail[] = [
  {
    id: '1',
    slug: 'cocktail-ai',
    title: 'Cocktail AI',
    category: 'AI Product',
    description: 'AI-powered cocktail discovery con Claude',
    longDescription: `Cocktail AI e' un assistente intelligente per la mixology, alimentato da Claude.

Il sistema utilizza RAG (Retrieval-Augmented Generation) per fornire ricette accurate basate su una knowledge base di oltre 1000 cocktail classici e moderni. Include gestione inventario bar, calcolo costi, e suggerimenti basati sugli ingredienti disponibili.

L'interfaccia conversazionale permette di chiedere ricette, alternative agli ingredienti, e consigli di abbinamento in linguaggio naturale.`,
    link: 'https://cocktail-ai.pages.dev',
    image: 'https://api.microlink.io/?url=https://cocktail-ai.pages.dev&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=900&waitFor=2000',
    gallery: [],
    techStack: ['Claude AI', 'React', 'TypeScript', 'Supabase', 'Cloudflare Workers'],
    status: 'live',
    year: '2024'
  },
  {
    id: '2',
    slug: 'adele-lo-feudo',
    title: 'Adele Lo Feudo',
    category: 'Client Work',
    description: 'Portfolio pittrice contemporanea italiana',
    longDescription: `Sito portfolio per Adele Lo Feudo, pittrice contemporanea italiana.

Il design minimalista mette in risalto le opere dell'artista con transizioni fluide e una galleria immersiva. L'architettura del sito e' ottimizzata per showcasing di opere d'arte con attenzione ai colori e alla fedeltà cromatica.

Include sezioni biografia, mostre, e contatti con form integrato.`,
    link: 'https://adelelofeudo.com',
    image: 'https://api.microlink.io/?url=https://adelelofeudo.com&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=900&waitFor=1000',
    gallery: [],
    techStack: ['React', 'Framer Motion', 'GSAP', 'Cloudflare Pages'],
    status: 'live',
    year: '2024'
  },
  {
    id: '3',
    slug: 'gusto',
    title: 'Gusto',
    category: 'AI Product',
    description: 'AI recipe assistant con Claude',
    longDescription: `Gusto e' un assistente culinario AI che aiuta a scoprire e creare ricette personalizzate.

Utilizza Claude per comprendere le preferenze alimentari, restrizioni dietetiche, e ingredienti disponibili per suggerire ricette su misura. Il sistema include una knowledge base di ricette italiane tradizionali e internazionali.

L'interfaccia chat-based rende l'esperienza naturale e conversazionale.`,
    link: 'https://gusto-8cx.pages.dev',
    image: 'https://api.microlink.io/?url=https://gusto-8cx.pages.dev&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=900&waitFor=2000',
    gallery: [],
    techStack: ['Claude AI', 'React', 'TypeScript', 'Supabase'],
    status: 'live',
    year: '2024'
  },
  {
    id: '4',
    slug: 'brickgen',
    title: 'Brickgen',
    category: 'AI Product',
    description: 'AI LEGO model generator con parti reali',
    longDescription: `Brickgen genera modelli LEGO buildable a partire da descrizioni testuali o immagini.

Il sistema utilizza Claude per analizzare l'input e un pipeline multi-agente per generare istruzioni di costruzione step-by-step utilizzando solo pezzi LEGO reali dal database Rebrickable. Include visualizzazione 3D interattiva del modello.

Ogni modello generato e' effettivamente costruibile con pezzi acquistabili.`,
    link: 'https://brickgen.pages.dev',
    image: 'https://api.microlink.io/?url=https://brickgen.pages.dev&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=900&waitFor=2000',
    gallery: [],
    techStack: ['Claude AI', 'Three.js', 'React', 'Cloudflare Workers', 'D1 Database'],
    status: 'development',
    year: '2024'
  },
  {
    id: '5',
    slug: 'objects',
    title: 'Objects',
    category: 'Dev Tool',
    description: 'Visual Editor per React projects',
    longDescription: `Objects e' un visual editor che permette di creare e modificare componenti React in modo visuale.

Basato su Polotno, offre un'interfaccia drag-and-drop per costruire layout, gestire assets, e esportare codice React pulito. Include libreria di componenti predefiniti e supporto per custom components.

Pensato per designers che vogliono prototipare rapidamente senza scrivere codice.`,
    link: 'https://objects-ef4.pages.dev',
    image: 'https://api.microlink.io/?url=https://objects-ef4.pages.dev&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=900&waitFor=2000',
    gallery: [],
    techStack: ['React', 'Polotno', 'TypeScript', 'Supabase'],
    status: 'development',
    year: '2024'
  },
  {
    id: '6',
    slug: 'ritorno',
    title: 'Ritorno',
    category: 'Client Work',
    description: "Mostra d'arte di Adele Lo Feudo",
    longDescription: `Sito dedicato alla mostra "Ritorno" di Adele Lo Feudo.

Landing page immersiva con animazioni GSAP che accompagnano il visitatore attraverso le opere esposte. Design cinematografico con transizioni fluide e storytelling visivo.

Include informazioni sulla mostra, galleria opere, e dettagli logistici.`,
    link: 'https://ritorno.adelelofeudo.com',
    image: 'https://api.microlink.io/?url=https://ritorno.adelelofeudo.com&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=900&waitFor=2000',
    gallery: [],
    techStack: ['React', 'GSAP', 'Framer Motion', 'Cloudflare Pages'],
    status: 'live',
    year: '2024'
  }
];

export const getProjectBySlug = (slug: string): ProjectDetail | undefined => {
  return projects.find(p => p.slug === slug);
};
