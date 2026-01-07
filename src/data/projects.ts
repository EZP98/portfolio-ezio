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
    description: 'Assistente AI per bar e mixology',
    longDescription: `I bartender perdono tempo a cercare ricette, calcolare costi, gestire inventario. Ho costruito un assistente che fa tutto questo in chat.

Conosce migliaia di ricette, si collega al POS per tracciare le vendite, e gestisce lo stock. Un unico punto di accesso per tutto quello che serve dietro al bancone.`,
    link: 'https://cocktail-ai.pages.dev',
    image: 'https://api.microlink.io/?url=https://cocktail-ai.pages.dev&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=900&waitFor=2000',
    gallery: [],
    techStack: ['Claude AI', 'React', 'Supabase', 'Cloudflare'],
    status: 'live',
    year: '2024'
  },
  {
    id: '2',
    slug: 'adele-lo-feudo',
    title: 'Adele Lo Feudo',
    category: 'Client Work',
    description: 'Portfolio con CMS per artista',
    longDescription: `Un'artista aveva bisogno di aggiornare il suo portfolio senza dipendere da uno sviluppatore. Ho costruito un backoffice dove gestisce opere, mostre, traduzioni e vendite.

Lei modifica i contenuti, il sito pubblico si aggiorna in automatico.`,
    link: 'https://adelelofeudo.com',
    image: 'https://api.microlink.io/?url=https://adelelofeudo.com&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=900&waitFor=1000',
    gallery: [],
    techStack: ['React', 'GSAP', 'Framer Motion', 'Supabase'],
    status: 'live',
    year: '2024'
  },
  {
    id: '3',
    slug: 'gusto',
    title: 'Gusto',
    category: 'AI Product',
    description: 'Assistente AI per cucina',
    longDescription: `Il problema classico: apri il frigo e non sai cosa cucinare. Ho costruito un assistente a cui puoi mandare una foto della dispensa e ti suggerisce cosa preparare.

Sa anche generare menu completi, calcolare porzioni, e adattare ricette a diete specifiche.`,
    link: 'https://gusto-8cx.pages.dev',
    image: 'https://api.microlink.io/?url=https://gusto-8cx.pages.dev&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=900&waitFor=2000',
    gallery: [],
    techStack: ['Claude AI', 'React', 'Cloudflare'],
    status: 'live',
    year: '2024'
  },
  {
    id: '4',
    slug: 'brickgen',
    title: 'Brickgen',
    category: 'AI Product',
    description: 'Generatore di modelli LEGO',
    longDescription: `Volevo costruire modelli LEGO personalizzati, ma progettarli a mano è complesso. Ho costruito un generatore che parte da una descrizione e produce istruzioni complete.

Usa solo pezzi reali acquistabili. Il modello che vedi puoi costruirlo davvero.`,
    link: 'https://brickgen.pages.dev',
    image: 'https://api.microlink.io/?url=https://brickgen.pages.dev&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=900&waitFor=2000',
    gallery: [],
    techStack: ['Claude AI', 'Three.js', 'React', 'Cloudflare'],
    status: 'development',
    year: '2024'
  },
  {
    id: '5',
    slug: 'objects',
    title: 'Objects',
    category: 'Dev Tool',
    description: 'Editor visuale per React',
    longDescription: `Il gap tra design e sviluppo rallenta tutto. Ho costruito un editor dove modifichi l'interfaccia visualmente e il codice React si genera in automatico.

Cambi un padding nel pannello, il componente si riscrive, il preview si aggiorna live.`,
    link: 'https://objects-ef4.pages.dev',
    image: 'https://api.microlink.io/?url=https://objects-ef4.pages.dev&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=900&waitFor=2000',
    gallery: [],
    techStack: ['Claude AI', 'React', 'Vite', 'Tailwind'],
    status: 'development',
    year: '2024'
  },
  {
    id: '6',
    slug: 'ritorno',
    title: 'Ritorno',
    category: 'Client Work',
    description: 'Sito per mostra d\'arte',
    longDescription: `Una mostra di 49 foglie dipinte aveva bisogno di un sito che fosse un'estensione dell'esperienza fisica. Ho costruito un'interfaccia dove ogni opera si esplora singolarmente.

Le foglie oscillano, si girano per mostrare fronte e retro, si navigano con gesture naturali.`,
    link: 'https://ritorno.adelelofeudo.com',
    image: 'https://api.microlink.io/?url=https://ritorno.adelelofeudo.com&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=900&waitFor=2000',
    gallery: [],
    techStack: ['JavaScript', 'CSS3', 'Cloudflare'],
    status: 'live',
    year: '2024'
  }
];

export const getProjectBySlug = (slug: string): ProjectDetail | undefined => {
  return projects.find(p => p.slug === slug);
};
