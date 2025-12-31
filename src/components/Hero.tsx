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
        
      </div>
    </section>
  );
};

export default Hero;