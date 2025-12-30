import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ScrollReveal from './ScrollReveal';
import './PhotoGallery.css';

interface Photo {
  id: string;
  src: string;
  alt: string;
  span?: 'wide' | 'tall' | 'large';
}

const PhotoGallery: React.FC = () => {
  const { t } = useLanguage();
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Placeholder photos - sostituire con le tue foto reali
  const photos: Photo[] = [
    { id: '1', src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', alt: 'Mountain landscape', span: 'wide' },
    { id: '2', src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80', alt: 'Nature scene' },
    { id: '3', src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80', alt: 'Forest path', span: 'tall' },
    { id: '4', src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80', alt: 'Waterfall' },
    { id: '5', src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80', alt: 'Lake view', span: 'wide' },
    { id: '6', src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80', alt: 'Foggy mountains' },
  ];

  return (
    <section className="photo-section" id="photography">
      <ScrollReveal>
        <div className="section-header">
          <h2 className="section-title">{t('photography')}</h2>
        </div>
      </ScrollReveal>

      <div className="photo-grid">
        {photos.map((photo, index) => (
          <ScrollReveal key={photo.id} delay={index * 80}>
            <div
              className={`photo-item ${photo.span ? `photo-${photo.span}` : ''}`}
              onClick={() => setSelectedPhoto(photo)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
              />
              <div className="photo-overlay">
                <div className="photo-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                    <path d="M11 8v6M8 11h6" />
                  </svg>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <div className="photo-lightbox" onClick={() => setSelectedPhoto(null)}>
          <button className="lightbox-close" onClick={() => setSelectedPhoto(null)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <img src={selectedPhoto.src} alt={selectedPhoto.alt} />
        </div>
      )}
    </section>
  );
};

export default PhotoGallery;
