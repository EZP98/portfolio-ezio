import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ScrollReveal from './ScrollReveal';
import './CTA.css';

const CTA: React.FC = () => {
  const { t } = useLanguage();

  const copyEmail = () => {
    navigator.clipboard.writeText('ezio.pappalardo@albicchiere.com');
  };

  return (
    <section className="cta-section">
      <div className="cta-container">
        {/* Text Content */}
        <ScrollReveal>
          <div className="cta-content">
            <h2 className="cta-title">{t('ctaTitle')}</h2>
            <p className="cta-subtitle">{t('ctaSubtitle')}</p>
            <button className="cta-button" onClick={copyEmail}>
              {t('getInTouch')}
            </button>
          </div>
        </ScrollReveal>

        {/* 3D Cards Gallery */}
        <div className="cta-gallery">
          <div className="cta-gallery-perspective">
            {/* Left Card */}
            <div className="cta-card cta-card-left">
              <div className="cta-card-brackets">
                <span className="bracket bracket-tl"></span>
                <span className="bracket bracket-tr"></span>
                <span className="bracket bracket-bl"></span>
                <span className="bracket bracket-br"></span>
              </div>
              <img
                src="/cta-1.webp"
                alt="Work sample 1"
                className="cta-card-image"
              />
            </div>

            {/* Center Card */}
            <div className="cta-card cta-card-center">
              <div className="cta-card-brackets">
                <span className="bracket bracket-tl"></span>
                <span className="bracket bracket-tr"></span>
                <span className="bracket bracket-bl"></span>
                <span className="bracket bracket-br"></span>
              </div>
              <img
                src="/cta-2.webp"
                alt="Work sample 2"
                className="cta-card-image"
              />
            </div>

            {/* Right Card */}
            <div className="cta-card cta-card-right">
              <div className="cta-card-brackets">
                <span className="bracket bracket-tl"></span>
                <span className="bracket bracket-tr"></span>
                <span className="bracket bracket-bl"></span>
                <span className="bracket bracket-br"></span>
              </div>
              <img
                src="/cta-3.webp"
                alt="Work sample 3"
                className="cta-card-image"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="cta-social">
          <a
            href="https://www.linkedin.com/in/ezio-pappalardo/"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-social-link"
          >
            <span>LinkedIn</span>
            <svg className="cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/eziopappalardo/"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-social-link"
          >
            <span>Instagram</span>
            <svg className="cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
          <a
            href="https://www.youtube.com/@eziopappalardo"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-social-link"
          >
            <span>YouTube</span>
            <svg className="cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;
