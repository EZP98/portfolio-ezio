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
        <button className="luma-button" onClick={copyEmail}>
          <div className="luma-button-inner">
            <div className="luma-stars">
              <div className="luma-star" style={{ left: '1%', top: '70%' }} />
              <div className="luma-star" style={{ left: '33%', top: '13%' }} />
              <div className="luma-star" style={{ left: '78%', top: '64%' }} />
              <div className="luma-star" style={{ left: '88%', top: '81%' }} />
              <div className="luma-star" style={{ left: '87%', top: '97%' }} />
              <div className="luma-star" style={{ left: '94%', top: '81%' }} />
              <div className="luma-star" style={{ left: '47%', top: '36%' }} />
              <div className="luma-star" style={{ left: '27%', top: '55%' }} />
            </div>
            <span className="luma-text">{t('getInTouch')}</span>
            <div className="luma-glow" />
          </div>
        </button>
      </div>
    </section>
  );
};

export default Hero;