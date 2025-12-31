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
              <div style={{ position: 'absolute', left: '80.34%', top: '68.35%', width: '0.6px', height: '0.6px', backgroundColor: 'rgb(255, 255, 255)', borderRadius: '50%', opacity: 0.6, transform: 'translate(-50%, -50%)' }} />
              <div style={{ position: 'absolute', left: '57.32%', top: '69.45%', width: '0.5px', height: '0.5px', backgroundColor: 'rgb(255, 255, 255)', borderRadius: '50%', opacity: 0.6, transform: 'translate(-50%, -50%)' }} />
              <div style={{ position: 'absolute', left: '25.49%', top: '18.2%', width: '0.57px', height: '0.57px', backgroundColor: 'rgb(255, 255, 255)', borderRadius: '50%', opacity: 0.6, transform: 'translate(-50%, -50%)' }} />
              <div style={{ position: 'absolute', left: '21.87%', top: '58.9%', width: '0.56px', height: '0.56px', backgroundColor: 'rgb(255, 255, 255)', borderRadius: '50%', opacity: 0.6, transform: 'translate(-50%, -50%)' }} />
              <div style={{ position: 'absolute', left: '7.22%', top: '43.94%', width: '0.88px', height: '0.88px', backgroundColor: 'rgb(255, 255, 255)', borderRadius: '50%', opacity: 0.6, transform: 'translate(-50%, -50%)' }} />
              <div style={{ position: 'absolute', left: '13.17%', top: '84.48%', width: '0.86px', height: '0.86px', backgroundColor: 'rgb(255, 255, 255)', borderRadius: '50%', opacity: 0.6, transform: 'translate(-50%, -50%)' }} />
              <div style={{ position: 'absolute', left: '18.02%', top: '22.55%', width: '0.61px', height: '0.61px', backgroundColor: 'rgb(255, 255, 255)', borderRadius: '50%', opacity: 0.6, transform: 'translate(-50%, -50%)' }} />
              <div style={{ position: 'absolute', left: '3.17%', top: '60.75%', width: '0.89px', height: '0.89px', backgroundColor: 'rgb(255, 255, 255)', borderRadius: '50%', opacity: 0.6, transform: 'translate(-50%, -50%)' }} />
            </div>
          </div>
          <div className="luma-light" />
        </button>
      </div>
    </section>
  );
};

export default Hero;