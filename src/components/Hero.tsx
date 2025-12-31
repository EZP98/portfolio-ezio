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
              <div style={{ position: 'absolute', left: '80%', top: '68%', width: '1px', height: '1px', backgroundColor: '#fff', borderRadius: '50%', opacity: 0.5 }} />
              <div style={{ position: 'absolute', left: '57%', top: '30%', width: '1px', height: '1px', backgroundColor: '#fff', borderRadius: '50%', opacity: 0.6 }} />
              <div style={{ position: 'absolute', left: '25%', top: '20%', width: '1px', height: '1px', backgroundColor: '#fff', borderRadius: '50%', opacity: 0.5 }} />
              <div style={{ position: 'absolute', left: '22%', top: '60%', width: '1px', height: '1px', backgroundColor: '#fff', borderRadius: '50%', opacity: 0.4 }} />
              <div style={{ position: 'absolute', left: '7%', top: '44%', width: '1.5px', height: '1.5px', backgroundColor: '#fff', borderRadius: '50%', opacity: 0.6 }} />
              <div style={{ position: 'absolute', left: '13%', top: '75%', width: '1px', height: '1px', backgroundColor: '#fff', borderRadius: '50%', opacity: 0.5 }} />
              <div style={{ position: 'absolute', left: '45%', top: '25%', width: '1px', height: '1px', backgroundColor: '#fff', borderRadius: '50%', opacity: 0.4 }} />
              <div style={{ position: 'absolute', left: '90%', top: '50%', width: '1px', height: '1px', backgroundColor: '#fff', borderRadius: '50%', opacity: 0.5 }} />
            </div>
          </div>
        </button>
      </div>
    </section>
  );
};

export default Hero;