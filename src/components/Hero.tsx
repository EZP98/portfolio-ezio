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
          <div className="hero-cta-stars">
            <div className="star" style={{ left: '11%', top: '70%', width: '0.7px', height: '0.7px' }} />
            <div className="star" style={{ left: '64%', top: '18%', width: '1px', height: '1px' }} />
            <div className="star" style={{ left: '10%', top: '17%', width: '0.7px', height: '0.7px' }} />
            <div className="star" style={{ left: '23%', top: '39%', width: '0.6px', height: '0.6px' }} />
            <div className="star" style={{ left: '26%', top: '28%', width: '1px', height: '1px' }} />
            <div className="star" style={{ left: '24%', top: '85%', width: '0.7px', height: '0.7px' }} />
            <div className="star" style={{ left: '41%', top: '68%', width: '0.8px', height: '0.8px' }} />
            <div className="star" style={{ left: '74%', top: '66%', width: '0.6px', height: '0.6px' }} />
            <div className="star" style={{ left: '49%', top: '53%', width: '0.7px', height: '0.7px' }} />
            <div className="star" style={{ left: '76%', top: '36%', width: '1px', height: '1px' }} />
            <div className="star" style={{ left: '42%', top: '25%', width: '0.7px', height: '0.7px' }} />
            <div className="star" style={{ left: '85%', top: '77%', width: '0.6px', height: '0.6px' }} />
            <div className="star" style={{ left: '61%', top: '79%', width: '0.7px', height: '0.7px' }} />
            <div className="star" style={{ left: '90%', top: '45%', width: '0.8px', height: '0.8px' }} />
          </div>
          <span className="hero-cta-text">{t('getInTouch')}</span>
        </button>
      </div>
    </section>
  );
};

export default Hero;