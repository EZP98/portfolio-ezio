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
    description: 'Assistente AI per bartender e appassionati di mixology',
    longDescription: `Un assistente conversazionale progettato per il mondo della mixology professionale.

Il cuore del sistema è un motore RAG che attinge da una knowledge base di oltre 1000 ricette - dai classici IBA alle creazioni contemporanee. Ma Cocktail AI va oltre le semplici ricette: gestisce l'inventario del bar, calcola i costi per drink, e suggerisce cocktail realizzabili con gli ingredienti disponibili.

L'interazione avviene in linguaggio naturale. Puoi chiedere varianti di un cocktail, sostituzioni per ingredienti mancanti, o abbinamenti per un menu specifico.`,
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
    description: 'Portfolio per artista contemporanea',
    longDescription: `Portfolio digitale per Adele Lo Feudo, pittrice contemporanea siciliana.

Il progetto nasce dalla necessità di creare uno spazio digitale che rispettasse l'intensità cromatica e la matericità delle opere. Il design è volutamente minimale: fondi neutri, tipografia essenziale, e transizioni fluide che non distraggono dall'arte.

La galleria è costruita per garantire fedeltà cromatica su diversi dispositivi. Include sezioni dedicate alla biografia dell'artista, alle mostre passate e future, e un sistema di contatto diretto.`,
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
    description: 'Assistente culinario AI per ricette personalizzate',
    longDescription: `Un compagno di cucina che comprende le tue esigenze alimentari.

Gusto utilizza Claude per interpretare richieste complesse: "cosa posso cucinare con quello che ho in frigo?", "una cena veloce senza glutine", "qualcosa di simile alla carbonara ma vegetariano". Il sistema considera preferenze, restrizioni dietetiche e ingredienti disponibili.

La knowledge base spazia dalla tradizione italiana alle cucine internazionali. Ogni ricetta include tempi, difficoltà, e suggerimenti per varianti.`,
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
    description: 'Genera modelli LEGO costruibili da testo o immagini',
    longDescription: `Trasforma idee in modelli LEGO che puoi davvero costruire.

A differenza di altri generatori, Brickgen utilizza esclusivamente pezzi reali dal database Rebrickable. Descrivi quello che vuoi costruire - o carica un'immagine - e il sistema genera istruzioni step-by-step con pezzi acquistabili.

Il motore è una pipeline multi-agente: analisi dell'input, progettazione strutturale, ottimizzazione dei pezzi, e generazione delle istruzioni. Il risultato è visualizzabile in 3D interattivo prima di procedere all'acquisto.`,
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
    description: 'Editor visuale per progetti React',
    longDescription: `Un ponte tra design e sviluppo.

Objects permette di costruire interfacce React in modo visuale, senza sacrificare la qualità del codice generato. Drag-and-drop per posizionare elementi, pannelli per gestire props e stili, export in codice React pulito e manutenibile.

Costruito su Polotno, include una libreria di componenti pronti all'uso e supporta l'importazione di componenti custom. Pensato per designer che vogliono prototipare rapidamente e sviluppatori che preferiscono un approccio visuale.`,
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
    description: 'Esperienza digitale per mostra d\'arte',
    longDescription: `Sito dedicato alla mostra "Ritorno" di Adele Lo Feudo.

Un'esperienza immersiva che accompagna il visitatore attraverso le opere esposte. Le animazioni GSAP scandiscono il racconto visivo: ogni scroll rivela un nuovo capitolo della mostra, ogni transizione è calibrata per mantenere l'attenzione sull'arte.

Il design cinematografico si ispira ai cataloghi d'arte contemporanea, con ampio uso di spazi bianchi e tipografia editoriale. Include informazioni pratiche sulla mostra e una galleria navigabile delle opere.`,
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
