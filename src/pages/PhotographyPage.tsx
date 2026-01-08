import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';
import './PhotographyPage.css';

interface Photo {
  id: string;
  src: string;
  alt: string;
  camera?: string;
  location?: string;
}

interface Collection {
  id: string;
  name: string;
  nameIT: string;
  photos: Photo[];
}

const collections: Collection[] = [
  {
    id: 'street',
    name: 'Street',
    nameIT: 'Street',
    photos: [
      { id: 'st1', src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80', alt: 'Street 1', location: 'Milano' },
      { id: 'st2', src: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80', alt: 'Street 2', location: 'New York' },
      { id: 'st3', src: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&q=80', alt: 'Street 3', location: 'Tokyo' },
      { id: 'st4', src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80', alt: 'Street 4', location: 'London' },
    ],
  },
  {
    id: 'nature',
    name: 'Nature',
    nameIT: 'Natura',
    photos: [
      { id: 'n1', src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80', alt: 'Nature 1', location: 'Dolomiti' },
      { id: 'n2', src: 'https://images.unsplash.com/photo-1518173946687-a4c036bc6c9b?w=800&q=80', alt: 'Nature 2', location: 'Iceland' },
      { id: 'n3', src: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&q=80', alt: 'Nature 3', location: 'Canada' },
      { id: 'n4', src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80', alt: 'Nature 4', location: 'Norway' },
      { id: 'n5', src: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&q=80', alt: 'Nature 5', location: 'Switzerland' },
    ],
  },
  {
    id: 'architecture',
    name: 'Architecture',
    nameIT: 'Architettura',
    photos: [
      { id: 'ar1', src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80', alt: 'Architecture 1', location: 'Dubai' },
      { id: 'ar2', src: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800&q=80', alt: 'Architecture 2', location: 'Singapore' },
      { id: 'ar3', src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80', alt: 'Architecture 3', location: 'Barcelona' },
    ],
  },
  {
    id: 'bw',
    name: 'Black & White',
    nameIT: 'Bianco e Nero',
    photos: [
      { id: 'bw1', src: 'https://images.unsplash.com/photo-1509305717900-84f40e786d82?w=800&q=80', alt: 'B&W 1' },
      { id: 'bw2', src: 'https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?w=800&q=80', alt: 'B&W 2' },
      { id: 'bw3', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', alt: 'B&W 3' },
      { id: 'bw4', src: 'https://images.unsplash.com/photo-1495745966610-2a67c30ad286?w=800&q=80', alt: 'B&W 4' },
    ],
  },
];

const PhotographyPage: React.FC = () => {
  const { language } = useLanguage();
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <div className="photography-page">
      <Header />

      <main className="photography-main">
        <section className="photography-hero">
          <span className="photography-badge">Gallery</span>
          <h1 className="photography-title">
            {language === 'it' ? 'Fotografia' : 'Photography'}
          </h1>
          <p className="photography-subtitle">
            {language === 'it'
              ? 'Momenti catturati attraverso il mio obiettivo'
              : 'Moments captured through my lens'}
          </p>
        </section>

        <section className="photography-collections">
          {collections.map((collection, collectionIndex) => (
            <div key={collection.id} className="photo-collection">
              <ScrollReveal delay={collectionIndex * 100}>
                <h2 className="photo-collection-title">
                  {language === 'it' ? collection.nameIT : collection.name}
                </h2>
              </ScrollReveal>

              <div className="photo-collection-grid">
                {collection.photos.map((photo, photoIndex) => (
                  <ScrollReveal key={photo.id} delay={photoIndex * 60}>
                    <div
                      className="photo-item"
                      onClick={() => setSelectedPhoto(photo)}
                    >
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                      />
                      <div className="photo-overlay">
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
      {selectedPhoto && (
        <div className="photo-lightbox" onClick={() => setSelectedPhoto(null)}>
          <button className="photo-lightbox-close" onClick={() => setSelectedPhoto(null)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div className="photo-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedPhoto.src} alt={selectedPhoto.alt} />
            {selectedPhoto.location && (
              <div className="photo-lightbox-info">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{selectedPhoto.location}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotographyPage;
