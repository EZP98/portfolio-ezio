import { useLanguage } from '../contexts/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';
import './AIImagesPage.css';

interface AIImage {
  id: string;
  src: string;
  alt: string;
  prompt: string;
  height: 'short' | 'medium' | 'tall';
}

const images: AIImage[] = [
  {
    id: '1',
    src: '/ai-images/computer-hill.png',
    alt: 'Vintage computer on flower hill',
    prompt: 'Retro Macintosh computer on a blooming flower hill, butterflies flying, dreamy spring atmosphere',
    height: 'medium'
  },
  {
    id: '2',
    src: '/ai-images/seahorse.png',
    alt: 'Iridescent seahorse',
    prompt: 'Holographic iridescent seahorse, glass-like translucent material, soft studio lighting',
    height: 'tall'
  },
  {
    id: '3',
    src: '/ai-images/keyboard.png',
    alt: 'Retro keyboard with plants',
    prompt: 'Vintage beige keyboard console with moss and flowers growing, cottagecore aesthetic, 3D render',
    height: 'short'
  },
  {
    id: '4',
    src: '/ai-images/octopus-bag.png',
    alt: 'Octopus in vacuum bag',
    prompt: 'Fresh octopus tentacles in transparent vacuum sealed bag, studio photography, dark background',
    height: 'tall'
  },
  {
    id: '5',
    src: '/ai-images/flower-hill.png',
    alt: 'Flower hill with butterflies',
    prompt: 'Dreamy hill covered in wildflowers, butterflies dancing, blue sky, peaceful spring day',
    height: 'medium'
  },
  {
    id: '6',
    src: '/ai-images/coin.png',
    alt: 'Dark lightning app icon',
    prompt: 'Minimalist dark app icon with embossed lightning bolt, matte black metallic texture, 3D render',
    height: 'short'
  },
  {
    id: '7',
    src: '/ai-images/computer-hill-2.png',
    alt: 'Vintage computer on meadow',
    prompt: 'Old Macintosh on flowering meadow hill, golden hour lighting, butterflies, nostalgic tech meets nature',
    height: 'medium'
  },
  {
    id: '8',
    src: '/ai-images/moss-heart.png',
    alt: 'Heart made of moss and flowers',
    prompt: 'Floating heart shape made of green moss and colorful wildflowers, white background, love nature concept',
    height: 'short'
  },
  {
    id: '9',
    src: '/ai-images/computer-forest.png',
    alt: 'Computer in forest clearing',
    prompt: 'Abandoned vintage computer in sunny forest clearing, butterflies, overgrown with nature, cinematic',
    height: 'tall'
  },
  {
    id: '10',
    src: '/ai-images/rock-butterflies.png',
    alt: 'Mossy rock with butterflies',
    prompt: 'Mossy rock formation with monarch butterflies, mountain landscape, ethereal atmosphere',
    height: 'medium'
  },
  {
    id: '11',
    src: '/ai-images/vinyl1.png',
    alt: 'Red and black vinyl record',
    prompt: 'Custom vinyl record design, red and black marbled pattern, brutalist typography, album art concept',
    height: 'short'
  },
];

const AIImagesPage: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="ai-images-page">
      <Header />

      <main className="ai-images-main">
        <section className="ai-images-hero">
          <ScrollReveal>
            <span className="ai-images-badge">AI Generated</span>
            <h1 className="ai-images-title">
              {language === 'it' ? 'Immagini AI' : 'AI Images'}
            </h1>
            <p className="ai-images-subtitle">
              {language === 'it'
                ? 'Esplorazioni creative generate con intelligenza artificiale'
                : 'Creative explorations generated with artificial intelligence'}
            </p>
          </ScrollReveal>
        </section>

        <section className="ai-masonry">
          {images.map((image, index) => (
            <ScrollReveal key={image.id} delay={index * 50}>
              <div className={`ai-masonry-item ai-masonry-${image.height}`}>
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                />
                <div className="ai-masonry-overlay">
                  <p className="ai-masonry-prompt">{image.prompt}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AIImagesPage;
