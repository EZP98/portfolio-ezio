import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ScrollReveal from './ScrollReveal';
import './CTA.css';

const generateParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 2 + Math.random() * 1,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2,
  }));
};

const CTA: React.FC = () => {
  const { t } = useLanguage();
  const [particles] = useState(() => generateParticles(12));
  const [isHovered, setIsHovered] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('ezio.pappalardo@albicchiere.com');
  };

  return (
    <section className="cta-section" id="contact">
      <div className="cta-container">
        {/* Text Content */}
        <ScrollReveal>
          <div className="cta-content">
            <h2 className="cta-title">{t('ctaTitle')}</h2>
            <button
              className="luma-button"
              onClick={copyEmail}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="luma-border">
                <div className="luma-light" />
                <div className="luma-inner">
                  <div className="luma-particles">
                    {particles.map((particle) => (
                      <div
                        key={particle.id}
                        className="luma-particle"
                        style={{
                          left: `${particle.left}%`,
                          top: `${particle.top}%`,
                          width: `${particle.size}px`,
                          height: `${particle.size}px`,
                          animationDelay: `${particle.delay}s`,
                          animationDuration: `${particle.duration}s, ${particle.duration + 1}s`,
                        }}
                      />
                    ))}
                  </div>

                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="luma-icon"
                    style={{ opacity: isHovered ? 1 : 0.9 }}
                  >
                    <path d="M12 2L13.09 8.26L19 9L13.09 9.74L12 16L10.91 9.74L5 9L10.91 8.26L12 2Z" fill="currentColor" />
                    <path d="M18 14L18.54 16.46L21 17L18.54 17.54L18 20L17.46 17.54L15 17L17.46 16.46L18 14Z" fill="currentColor" opacity="0.7" />
                    <path d="M6 14L6.54 16.46L9 17L6.54 17.54L6 20L5.46 17.54L3 17L5.46 16.46L6 14Z" fill="currentColor" opacity="0.5" />
                  </svg>

                  <span className="luma-text">{t('getInTouch')}</span>

                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="luma-icon"
                    style={{ opacity: isHovered ? 1 : 0.9 }}
                  >
                    <path d="M12 2L13.09 8.26L19 9L13.09 9.74L12 16L10.91 9.74L5 9L10.91 8.26L12 2Z" fill="currentColor" />
                    <path d="M18 14L18.54 16.46L21 17L18.54 17.54L18 20L17.46 17.54L15 17L17.46 16.46L18 14Z" fill="currentColor" opacity="0.7" />
                    <path d="M6 14L6.54 16.46L9 17L6.54 17.54L6 20L5.46 17.54L3 17L5.46 16.46L6 14Z" fill="currentColor" opacity="0.5" />
                  </svg>
                </div>
              </div>
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

      </div>
    </section>
  );
};

export default CTA;
