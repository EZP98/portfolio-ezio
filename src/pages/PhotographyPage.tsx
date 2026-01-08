import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './PhotographyPage.css';

interface Photo {
  id: string;
  src: string;
  alt: string;
}

interface Folder {
  id: string;
  name: string;
  nameIT: string;
  icon: string;
  color: string;
  photos: Photo[];
}

const folders: Folder[] = [
  {
    id: 'street',
    name: 'Street',
    nameIT: 'Street',
    icon: '🏙️',
    color: '#FFB84D',
    photos: [
      { id: 'st1', src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80', alt: 'Street 1' },
      { id: 'st2', src: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80', alt: 'Street 2' },
      { id: 'st3', src: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&q=80', alt: 'Street 3' },
      { id: 'st4', src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80', alt: 'Street 4' },
    ],
  },
  {
    id: 'nature',
    name: 'Nature',
    nameIT: 'Natura',
    icon: '🌿',
    color: '#4ADE80',
    photos: [
      { id: 'n1', src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80', alt: 'Nature 1' },
      { id: 'n2', src: 'https://images.unsplash.com/photo-1518173946687-a4c036bc6c9b?w=800&q=80', alt: 'Nature 2' },
      { id: 'n3', src: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&q=80', alt: 'Nature 3' },
      { id: 'n4', src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80', alt: 'Nature 4' },
      { id: 'n5', src: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&q=80', alt: 'Nature 5' },
    ],
  },
  {
    id: 'architecture',
    name: 'Architecture',
    nameIT: 'Architettura',
    icon: '🏛️',
    color: '#60A5FA',
    photos: [
      { id: 'ar1', src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80', alt: 'Architecture 1' },
      { id: 'ar2', src: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800&q=80', alt: 'Architecture 2' },
      { id: 'ar3', src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80', alt: 'Architecture 3' },
    ],
  },
  {
    id: 'portraits',
    name: 'Portraits',
    nameIT: 'Ritratti',
    icon: '👤',
    color: '#F472B6',
    photos: [
      { id: 'p1', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', alt: 'Portrait 1' },
      { id: 'p2', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80', alt: 'Portrait 2' },
      { id: 'p3', src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80', alt: 'Portrait 3' },
    ],
  },
  {
    id: 'bw',
    name: 'Black & White',
    nameIT: 'B&N',
    icon: '⬛',
    color: '#A1A1AA',
    photos: [
      { id: 'bw1', src: 'https://images.unsplash.com/photo-1509305717900-84f40e786d82?w=800&q=80', alt: 'B&W 1' },
      { id: 'bw2', src: 'https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?w=800&q=80', alt: 'B&W 2' },
      { id: 'bw3', src: 'https://images.unsplash.com/photo-1495745966610-2a67c30ad286?w=800&q=80', alt: 'B&W 3' },
    ],
  },
  {
    id: 'travel',
    name: 'Travel',
    nameIT: 'Viaggi',
    icon: '✈️',
    color: '#C084FC',
    photos: [
      { id: 't1', src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', alt: 'Travel 1' },
      { id: 't2', src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80', alt: 'Travel 2' },
      { id: 't3', src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80', alt: 'Travel 3' },
    ],
  },
];

const PhotographyPage: React.FC = () => {
  const { language } = useLanguage();
  const [openFolder, setOpenFolder] = useState<Folder | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handleFolderClick = (folder: Folder) => {
    setOpenFolder(folder);
  };

  const handleClose = () => {
    setOpenFolder(null);
    setSelectedPhoto(null);
  };

  return (
    <div className="photography-page">
      <Header />

      <main className="photography-main">
        {/* Desktop Area */}
        <section className="desktop-area">
          <div className="desktop-header">
            <h1 className="desktop-title">
              {language === 'it' ? 'Fotografia' : 'Photography'}
            </h1>
            <p className="desktop-subtitle">
              {language === 'it' ? 'Clicca su una cartella' : 'Click a folder'}
            </p>
          </div>

          <div className="folders-grid">
            {folders.map((folder) => (
              <button
                key={folder.id}
                className="folder"
                onClick={() => handleFolderClick(folder)}
              >
                <div className="folder-icon" style={{ background: `${folder.color}20` }}>
                  <span className="folder-emoji">{folder.icon}</span>
                  <div className="folder-preview">
                    {folder.photos.slice(0, 3).map((photo, i) => (
                      <img
                        key={photo.id}
                        src={photo.src}
                        alt=""
                        className="folder-preview-img"
                        style={{ transform: `rotate(${(i - 1) * 5}deg)` }}
                      />
                    ))}
                  </div>
                </div>
                <span className="folder-name">
                  {language === 'it' ? folder.nameIT : folder.name}
                </span>
                <span className="folder-count">{folder.photos.length} items</span>
              </button>
            ))}
          </div>
        </section>

        {/* Folder Window */}
        {openFolder && (
          <div className="folder-window-overlay" onClick={handleClose}>
            <div className="folder-window" onClick={(e) => e.stopPropagation()}>
              <div className="folder-window-header">
                <div className="window-controls">
                  <button className="window-control close" onClick={handleClose} />
                  <button className="window-control minimize" />
                  <button className="window-control maximize" />
                </div>
                <span className="window-title">
                  {openFolder.icon} {language === 'it' ? openFolder.nameIT : openFolder.name}
                </span>
              </div>
              <div className="folder-window-content">
                {openFolder.photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="folder-photo"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <img src={photo.src} alt={photo.alt} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

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
      </main>

      <Footer />
    </div>
  );
};

export default PhotographyPage;
