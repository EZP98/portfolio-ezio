import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { RollingText } from './RollingText';
import './Header.css';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  // Set dark mode on initial load
  useEffect(() => {
    document.documentElement.classList.add('dark-mode');
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const navItems = [
    { href: '#works', label: t('works') },
    { href: '#about', label: 'About' },
    { href: '#creative', label: 'Creative' },
    { href: '#contact', label: t('contact') },
  ];

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
            src="/profile.webp"
            alt="Ezio Pappalardo"
            className="logo-image"
          />
        </button>

        {/* Floating Navigation */}
        <div className="floating-nav">
          {/* Nav Pills - appear when menu is open */}
          <div className={`nav-pills-container ${isMenuOpen ? 'open' : ''}`}>
            {navItems.map((item, index) => (
              item.href.startsWith('/') ? (
                <Link
                  key={item.href}
                  to={item.href}
                  className="nav-pill"
                  style={{ transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <RollingText>{item.label}</RollingText>
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="nav-pill"
                  style={{ transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <RollingText>{item.label}</RollingText>
                </a>
              )
            ))}
          </div>

          {/* Menu Button */}
          <button
            className={`menu-button ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="menu-button-text">
              {isMenuOpen ? '' : <RollingText>Menu</RollingText>}
            </span>
            <span className={`menu-button-icon ${isMenuOpen ? 'open' : ''}`}>
              <span className="icon-line"></span>
              <span className="icon-line"></span>
            </span>
          </button>
        </div>

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
            src="/profile-full.webp"
            alt="Ezio Pappalardo"
            className="photo-modal-image"
          />
        </div>
      </div>

      {/* Floating Action Buttons - Bottom Right */}
      <div className="floating-actions">
        <button
          className="floating-action-btn"
          onClick={() => setLanguage(language === 'it' ? 'en' : 'it')}
          aria-label="Toggle language"
        >
          {language === 'it' ? 'EN' : 'IT'}
        </button>
        <button
          className="floating-action-btn"
          onClick={() => {
            setIsDarkMode(!isDarkMode);
            document.documentElement.classList.toggle('dark-mode');
          }}
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
};

export default Header;
