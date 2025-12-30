import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import './ComponentsSection.css';

// Component preview images (placeholder URLs - replace with actual screenshots)
const componentImages = [
  { name: 'Toggle', width: 112, height: 64, color: '#f0f0f0' },
  { name: 'Button', width: 80, height: 80, color: '#e8f5e9' },
  { name: 'Card', width: 100, height: 100, color: '#e3f2fd' },
  { name: 'Input', width: 140, height: 60, color: '#fff3e0' },
  { name: 'Dropdown', width: 137, height: 80, color: '#fce4ec' },
  { name: 'Avatar', width: 80, height: 80, color: '#f3e5f5' },
  { name: 'Badge', width: 100, height: 60, color: '#e0f7fa' },
  { name: 'Modal', width: 120, height: 80, color: '#fff8e1' },
];

const ComponentsSection: React.FC = () => {
  const { language } = useLanguage();
  const marqueeRef = useRef<HTMLUListElement>(null);

  // Marquee animation
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    let animationId: number;
    let position = 0;
    const speed = 0.5;

    const animate = () => {
      position -= speed;
      const totalWidth = marquee.scrollWidth / 2;
      if (Math.abs(position) >= totalWidth) {
        position = 0;
      }
      marquee.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section className="comp-section" id="components">
      {/* Main Feature Card with Marquee */}
      <div className="comp-main-card">
        <div className="comp-main-text">
          <h4 className="comp-main-title">
            {language === 'it' ? '30+ Componenti e Varianti' : '30+ Components and Variants'}
          </h4>
          <p className="comp-main-subtitle">
            {language === 'it'
              ? 'Buttons, Inputs, Cards, Animazioni e altro'
              : 'Buttons, Inputs, Cards, Animations, and more'}
          </p>
        </div>

        <div className="comp-marquee-container">
          <ul className="comp-marquee-track" ref={marqueeRef}>
            {[...componentImages, ...componentImages, ...componentImages].map((comp, index) => (
              <li key={index} className="comp-marquee-item">
                <div
                  className="comp-marquee-card"
                  style={{
                    width: comp.width,
                    height: comp.height,
                    background: comp.color
                  }}
                >
                  <span className="comp-marquee-label">{comp.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="comp-bento-grid">
        {/* Feature: Grid System */}
        <div className="comp-feature-card">
          <div className="comp-feature-icon-wrap">
            <div className="comp-feature-icon comp-icon-grid">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/>
                <rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
            </div>
          </div>
          <div className="comp-feature-text">
            <h6 className="comp-feature-title">
              {language === 'it' ? 'Sistema a 4pt' : '4pt Grid System'}
            </h6>
            <p className="comp-feature-subtitle">
              {language === 'it' ? 'Per dimensioni e spaziature' : 'For size and spacing'}
            </p>
          </div>
        </div>

        {/* Feature: Design Tokens */}
        <div className="comp-feature-card comp-feature-tokens">
          <div className="comp-feature-text">
            <h6 className="comp-feature-title">Design Tokens</h6>
            <p className="comp-feature-subtitle">
              {language === 'it' ? 'Completamente tokenizzato' : 'Fully tokenized with variables'}
            </p>
          </div>
          <div className="comp-tokens-list">
            <div className="comp-token-row">
              <div className="comp-token-icon">
                <svg width="14" height="14" viewBox="0 0 15 14" fill="currentColor">
                  <path d="M7.5 0L9.18 5.18L14.5 5.5L10.5 9L11.82 14L7.5 11L3.18 14L4.5 9L0.5 5.5L5.82 5.18L7.5 0Z"/>
                </svg>
              </div>
              <span className="comp-token-text">
                font.display.<span className="comp-token-dim">semibold</span>
              </span>
            </div>
            <div className="comp-token-row">
              <div className="comp-token-icon comp-token-icon-color">
                <div className="comp-color-swatch"></div>
              </div>
              <span className="comp-token-text">
                theme.surface.<span className="comp-token-dim">primary</span>
              </span>
            </div>
          </div>
        </div>

        {/* Feature: Dark Mode */}
        <div className="comp-feature-card">
          <div className="comp-theme-icons">
            <div className="comp-theme-icon comp-theme-light">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            </div>
            <div className="comp-theme-icon comp-theme-custom">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3v1m0 16v1m-9-9h1m16 0h1m-2.636-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"/>
              </svg>
            </div>
            <div className="comp-theme-icon comp-theme-dark">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
              </svg>
            </div>
          </div>
          <div className="comp-feature-text">
            <h6 className="comp-feature-title">
              {language === 'it' ? 'Dark Mode' : 'Enable Dark Mode'}
            </h6>
            <p className="comp-feature-subtitle">
              {language === 'it' ? 'O lavora con temi multipli' : 'Or work with multiple themes'}
            </p>
          </div>
        </div>

        {/* Feature: Maintenance */}
        <div className="comp-feature-card">
          <div className="comp-feature-icon-wrap">
            <div className="comp-feature-icon comp-icon-maintenance">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
              </svg>
            </div>
          </div>
          <div className="comp-feature-text">
            <h6 className="comp-feature-title">
              {language === 'it' ? 'Manutenzione Semplice' : 'Simplified Maintenance'}
            </h6>
            <p className="comp-feature-subtitle">
              {language === 'it' ? 'Personalizza colori e font' : 'Easily customize colors and fonts'}
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="comp-cta">
        <Link to="/components" className="comp-cta-btn">
          {language === 'it' ? 'Esplora tutti i componenti' : 'Explore all components'}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default ComponentsSection;
