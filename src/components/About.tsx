import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './About.css';

const About: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="about-section" id="about">
      <p className="about-text">
        {t('aboutIntro')} 
        <a href="/about" className="inline-link">
          <img 
            src="https://media.licdn.com/dms/image/v2/D4D03AQHxvYzGR8F9YA/profile-displayphoto-shrink_200_200/0/1665137036677?e=1743033600&v=beta&t=Hx6O0-DjXGFrZ7HNJYEqI3Hx9ZhxXl8YxXl8YxXl8Y" 
            alt="Ezio" 
            className="inline-avatar"
          />
          <span className="inline-text name-text">Ezio Pappalardo</span>
        </a>{t('aboutText1')}
        <a href="#innovation" className="inline-link">
          <span className="inline-text">{t('innovation')}</span>
        </a>
        {t('and')}
        <a href="#creativity" className="inline-link">
          <span className="inline-text">{t('creativeStorytelling')}</span>
        </a>.
        {t('aboutText2')}
        <a href="https://www.albicchiere.com" target="_blank" rel="noopener noreferrer" className="inline-link">
          <span className="inline-text">Albicchiere</span>
        </a>
        {t('aboutText3')}
      </p>
      
      <p className="about-text">
        {t('aboutBio')}
      </p>
      
      <p className="about-text">
        {t('findMeOn')}
        <a href="https://www.linkedin.com/in/ezio-pappalardo/" target="_blank" rel="noopener noreferrer" className="social-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        {t('whereIShare')}
      </p>
    </section>
  );
};

export default About;