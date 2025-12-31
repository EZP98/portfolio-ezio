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
            <div className="star" style={{ left: '11%', top: '70%', width: '2px', height: '2px' }} />
            <div className="star" style={{ left: '64%', top: '18%', width: '3px', height: '3px' }} />
            <div className="star" style={{ left: '10%', top: '17%', width: '2px', height: '2px' }} />
            <div className="star" style={{ left: '23%', top: '39%', width: '2px', height: '2px' }} />
            <div className="star" style={{ left: '26%', top: '28%', width: '3px', height: '3px' }} />
            <div className="star" style={{ left: '24%', top: '85%', width: '2px', height: '2px' }} />
            <div className="star" style={{ left: '41%', top: '68%', width: '2.5px', height: '2.5px' }} />
            <div className="star" style={{ left: '74%', top: '66%', width: '2px', height: '2px' }} />
            <div className="star" style={{ left: '49%', top: '53%', width: '2px', height: '2px' }} />
            <div className="star" style={{ left: '76%', top: '36%', width: '3px', height: '3px' }} />
            <div className="star" style={{ left: '42%', top: '25%', width: '2px', height: '2px' }} />
            <div className="star" style={{ left: '85%', top: '77%', width: '2px', height: '2px' }} />
            <div className="star" style={{ left: '61%', top: '79%', width: '2px', height: '2px' }} />
            <div className="star" style={{ left: '90%', top: '45%', width: '2.5px', height: '2.5px' }} />
          </div>
          <span className="hero-cta-text">{t('getInTouch')}</span>
        </button>
      </div>
    </section>
  );
};

export default Hero;