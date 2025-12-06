import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Header.css';

const Header: React.FC = () => {
  const [emailCopied, setEmailCopied] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  const copyEmail = () => {
    const email = 'ezio.pappalardo@albicchiere.com';
    navigator.clipboard.writeText(email).then(() => {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    });
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <button
          className="logo-button"
          onClick={() => setIsPhotoModalOpen(true)}
          aria-label="View profile photo"
        >
          <img
            src="/profile.jpg"
            alt="Ezio Pappalardo"
            className="logo-image"
          />
        </button>
        
        {/* Navigation */}
        <div className="nav-wrapper">
          <nav className="nav-items">
            <a href="#works" className="nav-link">{t('works')}</a>
            <a href="#services" className="nav-link">{t('services')}</a>
            <a href="#products" className="nav-link">{t('products')}</a>
          </nav>
          
          {/* Hamburger Menu Button */}
          <button 
            className="hamburger-menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          </button>
          
          {/* Dark Mode Toggle */}
          <button 
            className="dark-mode-toggle" 
            onClick={() => {
              setIsDarkMode(!isDarkMode);
              document.documentElement.classList.toggle('dark-mode');
            }}
            title="Toggle dark mode"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          
          {/* Language Toggle */}
          <button 
            className="language-toggle" 
            onClick={() => setLanguage(language === 'it' ? 'en' : 'it')}
            title="Switch language"
          >
            {language === 'it' ? 'EN' : 'IT'}
          </button>
          
          {/* Email Button */}
          <button className="email-button" onClick={copyEmail}>
            <svg className="email-icon" viewBox="0 0 16 16">
              <path 
                d="M 5.5 6 L 5.5 10.5 L 2.5 10.5 L 2.5 2.5 L 10.5 2.5 L 10.5 5.5 L 6 5.5 C 5.724 5.5 5.5 5.724 5.5 6 Z" 
                fill="transparent" 
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M 5.5 13.5 L 5.5 5.5 L 13.5 5.5 L 13.5 13.5 Z" 
                fill="transparent" 
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <span>{emailCopied ? t('copied') : t('email')}</span>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <a href="#works" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            {t('works')}
          </a>
          <a href="#services" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            {t('services')}
          </a>
          <a href="#products" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            {t('products')}
          </a>
          <a href="#about" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            {t('about')}
          </a>
          <a href="#contact" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            {t('contact')}
          </a>
        </nav>
      </div>

      {/* Photo Modal */}
      <div
        className={`photo-modal-overlay ${isPhotoModalOpen ? 'open' : ''}`}
        onClick={() => setIsPhotoModalOpen(false)}
      >
        <div
          className="photo-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="photo-modal-close"
            onClick={() => setIsPhotoModalOpen(false)}
            aria-label="Close"
          >
            ×
          </button>
          <img
            src="/profile.jpg"
            alt="Ezio Pappalardo"
            className="photo-modal-image"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;