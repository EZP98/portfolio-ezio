import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Projects.css';

const Projects: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section id="projects">
      <div className="section-header">
        <h2 className="section-title">{t('aiProjects')}</h2>
        <span className="section-arrow">→</span>
      </div>
      
      <div className="projects-grid">
        <div className="project-card">
          <div className="project-header">
            <div className="project-icon">AI</div>
            <div className="project-badges">
              <span className="project-badge">AI</span>
              <span className="project-badge">{t('chatbot')}</span>
            </div>
          </div>
          <h3 className="project-title">{t('cocktailAI')}</h3>
          <p className="project-description">
            {t('cocktailAIDesc')}
          </p>
          <div className="project-tech">
            <span className="tech-tag">{t('openAIAPI')}</span>
            <span className="tech-tag">{t('nlp')}</span>
            <span className="tech-tag">{t('recommendationEngine')}</span>
          </div>
        </div>
        
        <div className="project-card">
          <div className="project-header">
            <div className="project-icon">DB</div>
            <div className="project-badges">
              <span className="project-badge">RAG</span>
              <span className="project-badge">{t('database')}</span>
            </div>
          </div>
          <h3 className="project-title">{t('aiDBSearch')}</h3>
          <p className="project-description">
            {t('aiDBSearchDesc')}
          </p>
          <div className="project-tech">
            <span className="tech-tag">{t('ragArchitecture')}</span>
            <span className="tech-tag">{t('vectorDatabase')}</span>
            <span className="tech-tag">{t('semanticSearch')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;