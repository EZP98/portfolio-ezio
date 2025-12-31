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
          <div className="luma-wrapper">
            <span className="luma-text">{t('getInTouch')}</span>
            <div className="luma-stars">
              <div style={{ position: 'absolute', left: '74.5%', top: '16.5%', width: '0.6px', height: '0.6px', backgroundColor: '#fff', borderRadius: '50%', opacity: 0.6 }} />
              <div style={{ position: 'absolute', left: '3.4%', top: '92%', width: '0.5px', height: '0.5px', backgroundColor: '#fff', borderRadius: '50%', opacity: 0.6 }} />
              <div style={{ position: 'absolute', left: '90.1%', top: '11%', width: '0.57px', height: '0.57px', backgroundColor: '#fff', borderRadius: '50%', opacity: 0.6 }} />
              <div style={{ position: 'absolute', left: '64.6%', top: '81.4%', width: '0.56px', height: '0.56px', backgroundColor: '#fff', borderRadius: '50%', opacity: 0.6 }} />
              <div style={{ position: 'absolute', left: '83.2%', top: '48%', width: '0.88px', height: '0.88px', backgroundColor: '#fff', borderRadius: '50%', opacity: 0.6 }} />
              <div style={{ position: 'absolute', left: '47.7%', top: '35.6%', width: '0.86px', height: '0.86px', backgroundColor: '#fff', borderRadius: '50%', opacity: 0.6 }} />
              <div style={{ position: 'absolute', left: '77.4%', top: '25.9%', width: '0.6px', height: '0.6px', backgroundColor: '#fff', borderRadius: '50%', opacity: 0.6 }} />
              <div style={{ position: 'absolute', left: '49.3%', top: '56.7%', width: '0.89px', height: '0.89px', backgroundColor: '#fff', borderRadius: '50%', opacity: 0.6 }} />
            </div>
          </div>
          <div className="luma-light" />
        </button>
      </div>
    </section>
  );
};

export default Hero;