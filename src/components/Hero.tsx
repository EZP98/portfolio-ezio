import { useLanguage } from '../contexts/LanguageContext';
import './Hero.css';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const renderAnimatedText = (text: string) => {
    return text.split(' ').map((word, wordIndex) => (
      <span key={wordIndex} className="word-wrapper">
        {word.split('').map((char, charIndex) => (
          <span
            key={charIndex}
            className="char-animation"
          >
            {char}
          </span>
        ))}
        {wordIndex < text.split(' ').length - 1 && ' '}
      </span>
    ));
  };

  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-heading">
          <h1 className="hero-title">
            {renderAnimatedText(t('heroTitle').split('\n')[0])}
            <br />
            {renderAnimatedText(t('heroTitle').split('\n')[1])}
          </h1>
        </div>
        
        <div className="link-cards">
          <a href="https://www.linkedin.com/in/ezio-pappalardo/" target="_blank" rel="noopener noreferrer" className="link-card">
            <div className="card-eyebrow">
              <p>{t('connect')}</p>
            </div>
            <div className="card-title">
              <p>{t('viewLinkedIn')}</p>
            </div>
          </a>
          
          <a href="#albicchiere" className="link-card">
            <div className="card-eyebrow">
              <p>{t('startup')}</p>
            </div>
            <div className="card-title">
              <p>{t('discoverAlbicchiere')}</p>
            </div>
          </a>
          
          <a href="#videomaking" className="link-card">
            <div className="card-eyebrow">
              <p>{t('creative')}</p>
            </div>
            <div className="card-title">
              <p>{t('myVideoProjects')}</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;