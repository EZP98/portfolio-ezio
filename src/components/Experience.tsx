import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Experience.css';

const Experience: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section id="experience">
      <div className="section-header">
        <h2 className="section-title">{t('experienceEducation')}</h2>
        <span className="section-arrow">→</span>
      </div>
      
      <div className="experience-grid">
        <div className="experience-card experience-card-featured">
          <div className="experience-header">
            <div className="experience-icon">🚀</div>
            <span className="experience-type">{t('currentPosition')}</span>
            <div className="experience-dots">
              <span className="experience-dot"></span>
              <span className="experience-dot"></span>
            </div>
          </div>
          <div className="experience-content">
            <h3 className="experience-title">{t('chiefMarketingOfficer')}</h3>
            <p className="experience-company">
              <a href="https://www.albicchiere.com" target="_blank" rel="noopener noreferrer">Albicchiere</a>
            </p>
            <p className="experience-period">Nov 2022 - Present</p>
            <div className="experience-metrics">
              <span className="metric-badge">{t('kickstarterStats')}</span>
              <span className="metric-badge highlight">{t('cesAward')}</span>
            </div>
            <p className="experience-description">
              {t('albicchiereDesc')}
            </p>
          </div>
        </div>
        
        <div className="experience-card">
          <div className="experience-header">
            <div className="experience-icon">🎬</div>
            <span className="experience-type">{t('creativeWork')}</span>
            <div className="experience-dots">
              <span className="experience-dot"></span>
              <span className="experience-dot"></span>
            </div>
          </div>
          <div className="experience-content">
            <h3 className="experience-title">{t('poetryVideomaker')}</h3>
            <p className="experience-company">{t('freelance')}</p>
            <p className="experience-period">2020 - Oct 2022</p>
            <p className="experience-description">
              Created short films for international poet Prof. Donato Loscalzo 
              and art films for painter Adele Lo Feudo. Professional photography 
              work focusing on art documentation and creative projects.
            </p>
          </div>
        </div>
        
        <div className="experience-card">
          <div className="experience-header">
            <div className="experience-icon">🎓</div>
            <span className="experience-type">{t('education')}</span>
            <div className="experience-dots">
              <span className="experience-dot"></span>
              <span className="experience-dot"></span>
            </div>
          </div>
          <div className="experience-content">
            <h3 className="experience-title">{t('masterMovieDistribution')}</h3>
            <p className="experience-company">24ORE Business School</p>
            <p className="experience-period">Oct 2021 - Apr 2022</p>
            <p className="experience-description">
              Specialized in audiovisual distribution strategies, marketing, 
              and new business models. Final project with The Space Cinema.
            </p>
          </div>
        </div>
        
        <div className="experience-card">
          <div className="experience-header">
            <div className="experience-icon">🍷</div>
            <span className="experience-type">Education</span>
            <div className="experience-dots">
              <span className="experience-dot"></span>
              <span className="experience-dot"></span>
            </div>
          </div>
          <div className="experience-content">
            <h3 className="experience-title">{t('masterWineExport')}</h3>
            <p className="experience-company">24ORE Business School</p>
            <p className="experience-period">Mar 2023 - Oct 2023</p>
            <p className="experience-description">
              Specialized in wine export strategies, international markets, and 
              wine business management. Enhanced expertise in the wine industry 
              aligning with role at Albicchiere.
            </p>
          </div>
        </div>
        
        <div className="experience-card">
          <div className="experience-header">
            <div className="experience-icon">📚</div>
            <span className="experience-type">Education</span>
            <div className="experience-dots">
              <span className="experience-dot"></span>
              <span className="experience-dot"></span>
            </div>
          </div>
          <div className="experience-content">
            <h3 className="experience-title">{t('businessManagement')}</h3>
            <p className="experience-company">Università degli Studi di Perugia</p>
            <p className="experience-period">Sep 2017 - Oct 2021</p>
            <p className="experience-description">
              Bachelor's degree with honors (110 e Lode) in Business Economics and Management.
              Focus on business analysis, economics, and statistics.
            </p>
          </div>
        </div>
        
        <div className="experience-card">
          <div className="experience-header">
            <div className="experience-icon">🏆</div>
            <span className="experience-type">{t('achievement')}</span>
            <div className="experience-dots">
              <span className="experience-dot"></span>
              <span className="experience-dot"></span>
            </div>
          </div>
          <div className="experience-content">
            <h3 className="experience-title">{t('pgPanteneWinner')}</h3>
            <p className="experience-company">Università degli Studi di Perugia</p>
            <p className="experience-period">Dec 2019</p>
            <p className="experience-description">
              Won university business case competition for Pantene brand relaunch strategy. 
              Project evaluated by Alessandro Zito (Trade Director Manager at Gillette Italia) 
              and Marina Gigliotti (Assistant Professor at UniPG). Focus on 4Ps marketing strategy.
            </p>
          </div>
        </div>
        
        <div className="experience-card">
          <div className="experience-header">
            <div className="experience-icon">📸</div>
            <span className="experience-type">Education</span>
            <div className="experience-dots">
              <span className="experience-dot"></span>
              <span className="experience-dot"></span>
            </div>
          </div>
          <div className="experience-content">
            <h3 className="experience-title">{t('masterclassAnnie')}</h3>
            <p className="experience-company">MasterClass</p>
            <p className="experience-period">Feb 2022 - Mar 2022</p>
            <p className="experience-description">
              Studied portrait photography with legendary photographer Annie Leibovitz. 
              Learned storytelling through photography, working with natural light, and 
              developing conceptual approaches to visual narratives.
            </p>
          </div>
        </div>
        
        <div className="experience-card">
          <div className="experience-header">
            <div className="experience-icon">🎬</div>
            <span className="experience-type">Education</span>
            <div className="experience-dots">
              <span className="experience-dot"></span>
              <span className="experience-dot"></span>
            </div>
          </div>
          <div className="experience-content">
            <h3 className="experience-title">{t('masterclassMartin')}</h3>
            <p className="experience-company">MasterClass</p>
            <p className="experience-period">Dec 2021 - Jan 2022</p>
            <p className="experience-description">
              Studied filmmaking with Oscar-winning director Martin Scorsese. Explored 
              storytelling techniques, editing approaches, and working with actors through 
              analysis of cinematic masterpieces.
            </p>
          </div>
        </div>
        
        <div className="experience-card">
          <div className="experience-header">
            <div className="experience-icon">🌍</div>
            <span className="experience-type">{t('certification')}</span>
            <div className="experience-dots">
              <span className="experience-dot"></span>
              <span className="experience-dot"></span>
            </div>
          </div>
          <div className="experience-content">
            <h3 className="experience-title">{t('c1EnglishCert')}</h3>
            <p className="experience-company">Centro Linguistico Ateneo - UniPG</p>
            <p className="experience-period">Mar 2020</p>
            <p className="experience-description">
              Obtained C1 level English certification, demonstrating advanced proficiency
              in business and academic English communication.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;