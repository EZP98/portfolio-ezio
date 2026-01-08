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

// All images in a single masonry grid
const images: AIImage[] = [
  { id: '1', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80', alt: 'AI Portrait', prompt: 'Ethereal portrait with soft lighting, dreamy atmosphere', height: 'tall' },
  { id: '2', src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', alt: 'AI Landscape', prompt: 'Surreal mountain landscape at golden hour', height: 'medium' },
  { id: '3', src: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80', alt: 'AI Abstract', prompt: 'Fluid abstract forms, vibrant colors flowing', height: 'short' },
  { id: '4', src: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80', alt: 'AI Surreal', prompt: 'Floating objects in cosmic void', height: 'medium' },
  { id: '5', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', alt: 'AI Portrait', prompt: 'Cinematic portrait with dramatic shadows', height: 'tall' },
  { id: '6', src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80', alt: 'AI Nature', prompt: 'Mystical forest with ethereal fog', height: 'medium' },
  { id: '7', src: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80', alt: 'AI Abstract', prompt: 'Geometric patterns in perpetual motion', height: 'short' },
  { id: '8', src: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80', alt: 'AI Cosmic', prompt: 'Cosmic dreamscape with nebula colors', height: 'tall' },
  { id: '9', src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80', alt: 'AI Fashion', prompt: 'Fashion portrait with neon accents', height: 'medium' },
  { id: '10', src: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80', alt: 'AI Color', prompt: 'Color explosion, paint splash effect', height: 'short' },
  { id: '11', src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80', alt: 'AI Lake', prompt: 'Dreamlike lake with mirror reflection', height: 'medium' },
  { id: '12', src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80', alt: 'AI Space', prompt: 'Space and time distortion visualization', height: 'tall' },
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
