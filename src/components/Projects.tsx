import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ScrollReveal from './ScrollReveal';
import './Projects.css';

const Projects: React.FC = () => {
  const { t } = useLanguage();

  const projects = [
    {
      icon: 'AI',
      badges: ['AI', t('chatbot')],
      title: t('cocktailAI'),
      description: t('cocktailAIDesc'),
      tech: [t('claudeSDK'), t('react18'), t('typescript'), t('supabase'), t('threeJS')],
      link: 'https://cocktail-ai.pages.dev/',
      stats: '57,737 LOC'
    },
    {
      icon: 'CMS',
      badges: [t('cms'), t('portfolio')],
      title: t('adeleLoFeudo'),
      description: t('adeleLoFeudoDesc'),
      tech: [t('react18'), t('typescript'), t('cloudflare'), t('supabase')],
      link: 'https://ritorno.adelelofeudo.com/',
      stats: '9 languages'
    },
    {
      icon: 'DB',
      badges: ['RAG', t('database')],
      title: t('aiDBSearch'),
      description: t('aiDBSearchDesc'),
      tech: [t('claudeSDK'), t('typescript'), t('supabase')],
      link: 'https://ai-db-search.pages.dev/',
      stats: null
    },
    {
      icon: '🎮',
      badges: [t('gameDesign'), 'Easter Egg'],
      title: t('arcadeAlbicchiere'),
      description: t('arcadeAlbicchiereDesc'),
      tech: [t('htmlCss'), t('javascript'), 'Responsive'],
      link: 'https://arcade.albicchiere.com/',
      stats: null
    }
  ];

  return (
    <section id="projects">
      <ScrollReveal>
        <div className="section-header">
          <h2 className="section-title">{t('aiProjects')}</h2>
          <span className="section-arrow">→</span>
        </div>
      </ScrollReveal>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <ScrollReveal key={index} delay={index * 100}>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card project-card-link"
            >
              <div className="project-header">
                <div className="project-icon-container">
                  <div className="project-icon">{project.icon}</div>
                  {project.stats && (
                    <span className="project-stats">{project.stats}</span>
                  )}
                </div>
                <div className="project-badges">
                  {project.badges.map((badge, i) => (
                    <span key={i} className="project-badge">{badge}</span>
                  ))}
                </div>
              </div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-tech">
                {project.tech.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="project-link-indicator">
                <span>{t('viewProject')}</span>
                <span className="link-arrow">↗</span>
              </div>
            </a>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default Projects;
