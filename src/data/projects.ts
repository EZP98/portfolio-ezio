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
    description: 'Assistente AI per bartender con RAG su 1000+ ricette e gestione completa del bar',
    longDescription: `Un ecosistema completo per la mixology professionale, costruito su un motore RAG che attinge da fonti autorevoli: Miscelare di Mastellari e Ceccarelli, Imbibe di Wondrich, il Jerry Thomas 1862 e Cocktail Codex di Death & Co.

Il sistema va oltre le ricette. Gestisce l'inventario del bar con tracking dei costi, si integra con 9 provider POS (SumUp, Worldline, Nexi, Square) per analisi vendite in tempo reale, e genera menu con calcolo automatico del food cost.

L'assistente supporta 4 modalità specializzate: Beverage Assistant per consigli cocktail, Price Analyzer per strategie di margine, Master Distiller per educazione sugli spiriti, e Food Pairing per abbinamenti. Vision AI per identificare bottiglie da foto.`,
    link: 'https://cocktail-ai.pages.dev',
    image: 'https://api.microlink.io/?url=https://cocktail-ai.pages.dev&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=900&waitFor=2000',
    gallery: [],
    techStack: ['Claude AI', 'RAG', 'React', 'TypeScript', 'Supabase', 'Cloudflare Workers', 'Stripe'],
    status: 'live',
    year: '2024'
  },
  {
    id: '2',
    slug: 'adele-lo-feudo',
    title: 'Adele Lo Feudo',
    category: 'Client Work',
    description: 'Portfolio d\'arte contemporanea con CMS, 7 lingue e commerce integrato',
    longDescription: `Piattaforma professionale per artista contemporanea, progettata per gestire collezioni, mostre e vendite in autonomia.

Il backend include un CMS completo: gestione di 7 collezioni tematiche, archivio di 26 mostre dal 2010, sistema di quotazioni e ordini. Supporta 7 lingue (IT, EN, ES, FR, JA, ZH, ZH-TW) con traduzioni gestite da backoffice.

Il frontend combina GSAP ScrollTrigger per effetti parallax, Framer Motion per transizioni fluide, e Lenis per smooth scrolling premium. Design minimalista su fondo nero con accent rosa, tipografia Montserrat, cursore custom. Analytics con Meta Pixel, Google Analytics e Clarity.`,
    link: 'https://adelelofeudo.com',
    image: 'https://api.microlink.io/?url=https://adelelofeudo.com&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=900&waitFor=1000',
    gallery: [],
    techStack: ['React', 'TypeScript', 'GSAP', 'Framer Motion', 'Supabase', 'Cloudflare', 'Stripe'],
    status: 'live',
    year: '2024'
  },
  {
    id: '3',
    slug: 'gusto',
    title: 'Gusto',
    category: 'AI Product',
    description: 'Assistente culinario AI con knowledge base gastronomica e analisi visiva della dispensa',
    longDescription: `Un compagno di cucina intelligente che combina enciclopedia gastronomica e intuizione moderna.

La knowledge base include il Larousse Gastronomique, ricette dalla Scuola ALMA, piatti di chef stellati Michelin, e una guida completa al food pairing. Il sistema RAG con BM25 e fallback su Perplexity garantisce risposte accurate e aggiornate.

Tre modalità distintive: Stellato per tecniche professionali (sous-vide, sferificazione, plating), Recupero per minimizzare sprechi e riusare ingredienti, Menu per generare pranzi completi con abbinamenti vini. La Vision AI analizza foto del frigorifero e suggerisce piatti realizzabili.`,
    link: 'https://gusto-8cx.pages.dev',
    image: 'https://api.microlink.io/?url=https://gusto-8cx.pages.dev&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=900&waitFor=2000',
    gallery: [],
    techStack: ['Claude AI', 'Perplexity', 'RAG', 'React', 'TypeScript', 'Cloudflare D1'],
    status: 'live',
    year: '2024'
  },
  {
    id: '4',
    slug: 'brickgen',
    title: 'Brickgen',
    category: 'AI Product',
    description: 'Generatore LEGO con pipeline AI a 4 agenti e istruzioni professionali stampabili',
    longDescription: `Una pipeline che trasforma descrizioni testuali o immagini in modelli LEGO costruibili con pezzi reali.

L'architettura multi-agente procede in 4 stadi: Analyst classifica il soggetto e stima complessità, Architect crea il blueprint strutturale diviso in sezioni modulari, Shaper genera griglie voxel 3D con i 31 colori LEGO ufficiali, Brickifier converte i voxel in placement reali con pezzi dal database Rebrickable.

Il risultato è visualizzabile in 3D interattivo con Three.js. Le istruzioni generate seguono lo standard LEGO: 200-300 step, 5-15 pezzi per step, organizzazione in buste numerate. Export in PDF stampabile con lista parti e link per acquisto su BrickLink.`,
    link: 'https://brickgen.pages.dev',
    image: 'https://api.microlink.io/?url=https://brickgen.pages.dev&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=900&waitFor=2000',
    gallery: [],
    techStack: ['Claude AI', 'Multi-Agent', 'Three.js', 'React', 'Cloudflare Workers', 'D1', 'Rebrickable'],
    status: 'development',
    year: '2024'
  },
  {
    id: '5',
    slug: 'objects',
    title: 'Objects',
    category: 'Dev Tool',
    description: 'Editor visuale AI che genera codice React in tempo reale con preview live',
    longDescription: `Un ponte tra design e sviluppo che esegue Node.js direttamente nel browser.

L'editor combina un canvas tipo Figma con generazione AI: modifichi visualmente padding, colori, layout, e Claude genera il codice React/TypeScript corrispondente. WebContainers monta un filesystem virtuale completo, esegue npm install e Vite, e mostra il risultato in un iframe con hot reload automatico.

Il flusso è bidirezionale: clicchi un elemento nel preview, il pannello stili si popola con le sue proprietà, modifichi un valore, l'AI riscrive il componente, Vite rileva il cambio, il preview si aggiorna. Design system integrato con tokens, preset (Framer Dark, Linear, Stripe), e libreria componenti.`,
    link: 'https://objects-ef4.pages.dev',
    image: 'https://api.microlink.io/?url=https://objects-ef4.pages.dev&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=900&waitFor=2000',
    gallery: [],
    techStack: ['Claude AI', 'WebContainers', 'React', 'TypeScript', 'Vite', 'Tailwind', 'Supabase'],
    status: 'development',
    year: '2024'
  },
  {
    id: '6',
    slug: 'ritorno',
    title: 'Ritorno',
    category: 'Client Work',
    description: 'Esperienza immersiva per mostra d\'arte con 49 opere interattive',
    longDescription: `Sito dedicato alla mostra "Ritorno" di Adele Lo Feudo al Museo a Cielo Aperto di Camo: 49 foglie dipinte, ognuna un volto significativo nel percorso dell'artista.

L'esperienza è costruita interamente in vanilla JavaScript e CSS3, senza framework. Le foglie oscillano con animazione continua che simula il vento, il lightbox permette di navigare tra le opere con scroll verticale e girarle con scroll orizzontale per vedere fronte e retro.

Audio ambientale loopato, effetto parallax sull'hero con dissolvenza allo scroll, sezione critica con tre testi espandibili in modal glassmorphism. Design cinematografico che mette l'arte al centro, responsive con gesture touch per mobile.`,
    link: 'https://ritorno.adelelofeudo.com',
    image: 'https://api.microlink.io/?url=https://ritorno.adelelofeudo.com&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=900&waitFor=2000',
    gallery: [],
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Cloudflare Pages'],
    status: 'live',
    year: '2024'
  }
];

export const getProjectBySlug = (slug: string): ProjectDetail | undefined => {
  return projects.find(p => p.slug === slug);
};
