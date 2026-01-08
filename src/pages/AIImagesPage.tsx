import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';
import './AIImagesPage.css';

interface AIImage {
  id: string;
  src: string;
  alt: string;
  prompt?: string;
}

interface Collection {
  id: string;
  name: string;
  nameIT: string;
  images: AIImage[];
}

const collections: Collection[] = [
  {
    id: 'portraits',
    name: 'Portraits',
    nameIT: 'Ritratti',
    images: [
      { id: 'p1', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80', alt: 'AI Portrait 1', prompt: 'Ethereal portrait with soft lighting' },
      { id: 'p2', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', alt: 'AI Portrait 2', prompt: 'Cinematic portrait, dramatic shadows' },
      { id: 'p3', src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80', alt: 'AI Portrait 3', prompt: 'Fashion portrait with neon accents' },
      { id: 'p4', src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80', alt: 'AI Portrait 4', prompt: 'Natural light portrait' },
    ],
  },
  {
    id: 'landscapes',
    name: 'Landscapes',
    nameIT: 'Paesaggi',
    images: [
      { id: 'l1', src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', alt: 'AI Landscape 1', prompt: 'Surreal mountain landscape at sunset' },
      { id: 'l2', src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80', alt: 'AI Landscape 2', prompt: 'Mystical forest with fog' },
      { id: 'l3', src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80', alt: 'AI Landscape 3', prompt: 'Dreamlike lake reflection' },
    ],
  },
  {
    id: 'abstract',
    name: 'Abstract',
    nameIT: 'Astratto',
    images: [
      { id: 'a1', src: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80', alt: 'AI Abstract 1', prompt: 'Fluid abstract forms' },
      { id: 'a2', src: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80', alt: 'AI Abstract 2', prompt: 'Geometric patterns in motion' },
      { id: 'a3', src: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80', alt: 'AI Abstract 3', prompt: 'Color explosion' },
      { id: 'a4', src: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=800&q=80', alt: 'AI Abstract 4', prompt: 'Digital waves' },
      { id: 'a5', src: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=800&q=80', alt: 'AI Abstract 5', prompt: 'Neon gradients' },
    ],
  },
  {
    id: 'surreal',
    name: 'Surreal',
    nameIT: 'Surreale',
    images: [
      { id: 's1', src: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80', alt: 'AI Surreal 1', prompt: 'Floating objects in void' },
      { id: 's2', src: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80', alt: 'AI Surreal 2', prompt: 'Cosmic dreamscape' },
      { id: 's3', src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80', alt: 'AI Surreal 3', prompt: 'Space and time distortion' },
    ],
  },
];

const AIImagesPage: React.FC = () => {
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<AIImage | null>(null);

  return (
    <div className="ai-images-page">
      <Header />

      <main className="ai-images-main">
        <section className="ai-images-hero">
          <span className="ai-images-badge">AI Generated</span>
          <h1 className="ai-images-title">
            {language === 'it' ? 'Immagini AI' : 'AI Images'}
          </h1>
          <p className="ai-images-subtitle">
            {language === 'it'
              ? 'Esplorazioni creative generate con intelligenza artificiale'
              : 'Creative explorations generated with artificial intelligence'}
          </p>
        </section>

        <section className="ai-images-collections">
          {collections.map((collection, collectionIndex) => (
            <div key={collection.id} className="collection">
              <ScrollReveal delay={collectionIndex * 100}>
                <h2 className="collection-title">
                  {language === 'it' ? collection.nameIT : collection.name}
                </h2>
              </ScrollReveal>

              <div className="collection-grid">
                {collection.images.map((image, imageIndex) => (
                  <ScrollReveal key={image.id} delay={imageIndex * 60}>
                    <div
                      className="gallery-item"
                      onClick={() => setSelectedImage(image)}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                      />
                      <div className="gallery-overlay">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="11" cy="11" r="8" />
                          <path d="M21 21l-4.35-4.35" />
                          <path d="M11 8v6M8 11h6" />
                        </svg>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>

      <Footer />

      {/* Lightbox */}
      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <button className="lightbox-close" onClick={() => setSelectedImage(null)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.src} alt={selectedImage.alt} />
            {selectedImage.prompt && (
              <div className="lightbox-info">
                <span className="lightbox-label">Prompt</span>
                <p className="lightbox-prompt">{selectedImage.prompt}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIImagesPage;
