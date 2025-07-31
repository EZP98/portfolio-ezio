import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Showcase.css';

const Showcase: React.FC = () => {
  const { t } = useLanguage();
  const [currentImage, setCurrentImage] = useState(0);
  const [email, setEmail] = useState('');

  const images = [
    'https://media.licdn.com/dms/image/v2/D4D22AQEdFGZHvBElOg/feedshare-shrink_800/feedshare-shrink_800/0/1730800344453?e=1740614400&v=beta&t=YOUR_IMAGE_TOKEN_1',
    'https://media.licdn.com/dms/image/v2/D4D22AQH8gRyJH8gKLg/feedshare-shrink_800/feedshare-shrink_800/0/1730800344578?e=1740614400&v=beta&t=YOUR_IMAGE_TOKEN_2',
    'https://media.licdn.com/dms/image/v2/D4D22AQGFVz8Y8Y8Y8Y/feedshare-shrink_800/feedshare-shrink_800/0/1730800344578?e=1740614400&v=beta&t=YOUR_IMAGE_TOKEN_3'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const changeImage = (index: number) => {
    setCurrentImage(index);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for subscribing with: ${email}`);
    setEmail('');
  };

  return (
    <section className="showcase-section" id="albicchiere">
      <div className="image-carousel">
        <img 
          src={images[currentImage]} 
          alt="Albicchiere at Vinitaly 2025" 
          className="carousel-image"
        />
        <div className="carousel-dots">
          {images.map((_, index) => (
            <span 
              key={index}
              className={`carousel-dot ${index === currentImage ? 'active' : ''}`} 
              onClick={() => changeImage(index)}
            />
          ))}
        </div>
      </div>
      
      <div className="content-section">
        <div className="upcoming-badge">
          {t('vinitalyBadge')}
        </div>
        
        <h2 className="content-title">{t('showcaseTitle')}</h2>
        <p className="content-subtitle">{t('showcaseSubtitle')}</p>
        
        <form className="newsletter-form" onSubmit={handleSubscribe}>
          <input 
            type="email" 
            className="newsletter-input" 
            placeholder={t('getUpdates')} 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="newsletter-button">{t('subscribe')}</button>
        </form>
        
        <div className="showcase-story">
          <p>{t('showcaseStory1')}</p>
          <p>{t('showcaseStory2')}</p>
        </div>
        
        <div className="blog-label">{t('latestUpdates')}</div>
        <div className="blog-links">
          <a href="https://www.albicchiere.com/vinitaly2025" target="_blank" rel="noopener noreferrer" className="blog-link">
            {t('vinitalySuccess')}
            <div className="blog-arrow">
              <span className="blog-arrow-dot"></span>
              <span className="blog-arrow-dot"></span>
            </div>
          </a>
          <a href="https://www.albicchiere.com/ces-award" target="_blank" rel="noopener noreferrer" className="blog-link">
            {t('cesAwardWinner')}
          </a>
          <a href="https://www.albicchiere.com/technology" target="_blank" rel="noopener noreferrer" className="blog-link">
            {t('iotWineTech')}
            <div className="blog-arrow">
              <span className="blog-arrow-dot"></span>
              <span className="blog-arrow-dot"></span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Showcase;