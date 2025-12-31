import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Hero.css';

// Genera particelle casuali
const generateParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 0.5 + Math.random() * 0.5,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2,
  }));
};

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [particles] = useState(() => generateParticles(12));

  const copyEmail = () => {
    navigator.clipboard.writeText('ezio.pappalardo@albicchiere.com');
  };

  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-heading">
          <span className="hero-name">{t('heroName')}</span>
          <span className="hero-tagline">{t('heroTagline')}</span>
          <span className="hero-subtitle">{t('heroSubtitle')}</span>
        </div>
        <button className="luma-button" onClick={copyEmail}>
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
              <span className="luma-text">{t('getInTouch')}</span>
            </div>
          </div>
        </button>
      </div>
    </section>
  );
};

export default Hero;