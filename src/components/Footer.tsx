import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Footer.css';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for subscribing with: ${email}`);
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-newsletter">
            <h3>{t('newsletter')}</h3>
            <p>{t('getLatestUpdates')}</p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                className="newsletter-input" 
                placeholder={t('emailPlaceholder')} 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-button">{t('subscribe')}</button>
            </form>
          </div>
          
          <div className="footer-links">
            <h3>{t('quickLinks')}</h3>
            <div className="footer-link-list">
              <a href="https://www.linkedin.com/in/ezio-pappalardo/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://www.albicchiere.com" target="_blank" rel="noopener noreferrer">Albicchiere</a>
              <a href="mailto:ezio.pappalardo@albicchiere.com">Email</a>
              <a href="#cv">{t('contact')}</a>
            </div>
          </div>
        </div>
        
        <div className="footer-meta">
          <span>🇮🇹 Based in Umbria</span>
          <span>·</span>
          <span>CMO at Albicchiere</span>
          <span>·</span>
          <a href="https://www.linkedin.com/in/ezio-pappalardo/" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
          <span>·</span>
          <span>© 2025 Ezio Pappalardo</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;