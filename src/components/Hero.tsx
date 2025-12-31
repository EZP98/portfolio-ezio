import { useLanguage } from '../contexts/LanguageContext';
import './Hero.css';

const Hero: React.FC = () => {
  const { t } = useLanguage();

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
        <button className="hero-cta" onClick={copyEmail}>
          {t('getInTouch')}
        </button>
      </div>
    </section>
  );
};

export default Hero;