import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './ThemesSection.css';

// Theme preview videos
const themeImages = [
  { name: 'Slate', src: '/templates/slate.mp4?v=20260104e' },
  { name: 'Orbit', src: '/templates/orbit.mp4?v=20260104e' },
  { name: 'Nova', src: '/templates/nova.mp4?v=20260104e' },
  { name: 'Obsidian', src: '/templates/obsidian.mp4?v=20260104e' },
  { name: 'Aurora', src: '/templates/aurora.mp4?v=20260104e' },
  { name: 'Ferrero', src: '/templates/ferrero.mp4?v=20260104e' },
];

const ThemesSection: React.FC = () => {
  const { language } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <section className="themes-section" id="themes">
      <div className="themes-container">
        {/* Header */}
        <div className="themes-header">
          <div className="themes-tag">
            <span className="themes-tag-emoji">&#127752;</span>
            <span className="themes-tag-text">
              {language === 'it' ? 'Supporto multi-tema' : 'Multiple theme support'}
            </span>
          </div>

          <h2 className="themes-title">
            <span className="themes-title-dim">
              {language === 'it' ? 'Passa tra ' : 'Switch between '}
            </span>
            <span className="themes-title-highlight">
              {language === 'it' ? 'temi multipli' : 'multiple themes'}
            </span>
            <br />
            <span className="themes-title-dim">
              {language === 'it' ? 'e modalita\' istantaneamente' : 'and modes instantly'}
            </span>
          </h2>
        </div>

        {/* Themes Grid - 3 per row */}
        <div className="themes-grid">
          {themeImages.map((theme, index) => (
            <div key={index} className="themes-card">
              <video
                className="themes-card-video"
                src={theme.src}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                ref={(el) => {
                  if (el) {
                    el.play().catch(() => {});
                  }
                }}
              />
              <div className="themes-card-border" />
              <span className="themes-card-name">{theme.name}</span>
            </div>
          ))}
        </div>

        {/* Theme Switch */}
        <div className="themes-switch-wrapper">
          <div
            className={`themes-switch ${isDarkMode ? 'dark' : 'light'}`}
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            <div className="themes-switch-knob">
              {isDarkMode ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="5"/>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2"/>
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThemesSection;
