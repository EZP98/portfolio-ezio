import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ScrollReveal from './ScrollReveal';
import './Experience.css';

interface ExperienceItem {
  id: string;
  type: 'work' | 'education' | 'achievement' | 'certification';
  title: string;
  company: string;
  companyLink?: string;
  period: string;
  description: string;
  metrics?: string[];
  featured?: boolean;
}

const Experience: React.FC = () => {
  const { t } = useLanguage();
  const [expandedId, setExpandedId] = useState<string | null>('1'); // Albicchiere expanded by default

  const experiences: ExperienceItem[] = [
    {
      id: '1',
      type: 'work',
      title: t('chiefMarketingOfficer'),
      company: 'Albicchiere',
      companyLink: 'https://www.albicchiere.com',
      period: 'Nov 2022 - Dec 2025',
      description: t('albicchiereDesc'),
      metrics: [t('kickstarterStats'), t('cesAward')],
      featured: false
    },
    {
      id: '2',
      type: 'education',
      title: t('masterclassAnnie'),
      company: 'MasterClass',
      period: 'Feb 2022 - Mar 2022',
      description: t('annieMasterclassDesc')
    },
    {
      id: '3',
      type: 'education',
      title: t('masterclassMartin'),
      company: 'MasterClass',
      period: 'Dec 2021 - Jan 2022',
      description: t('martinMasterclassDesc')
    },
    {
      id: '4',
      type: 'education',
      title: t('masterMovieDistribution'),
      company: '24ORE Business School',
      period: 'Oct 2021 - Apr 2022',
      description: t('masterMovieDistDesc')
    },
    {
      id: '5',
      type: 'certification',
      title: t('c1EnglishCert'),
      company: 'Centro Linguistico Ateneo - UniPG',
      period: 'Mar 2020',
      description: t('c1EnglishDesc')
    },
    {
      id: '6',
      type: 'achievement',
      title: t('pgPanteneWinner'),
      company: 'Università degli Studi di Perugia',
      period: 'Sep - Dec 2019',
      description: t('pgPanteneDesc')
    },
    {
      id: '7',
      type: 'education',
      title: t('businessManagement'),
      company: 'Università degli Studi di Perugia',
      period: 'Sep 2017 - Oct 2021',
      description: t('businessManagementDesc')
    }
  ];

  const getTypeLabel = (type: ExperienceItem['type']) => {
    switch (type) {
      case 'work': return t('work');
      case 'education': return t('education');
      case 'achievement': return t('achievement');
      case 'certification': return t('certification');
      default: return '';
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="experience-section">
      <ScrollReveal>
        <div className="section-header">
          <h2 className="section-title">{t('experienceEducation')}</h2>
          <span className="section-arrow">→</span>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <div className="experience-container">
          {experiences.map((item) => (
            <div
              key={item.id}
              className={`experience-row ${expandedId === item.id ? 'expanded' : ''} ${item.featured ? 'featured' : ''}`}
            >
              <button
                className="experience-header-btn"
                onClick={() => toggleExpand(item.id)}
                aria-expanded={expandedId === item.id}
              >
                <div className="experience-main">
                  <span className="experience-type-badge">{getTypeLabel(item.type)}</span>
                  <span className="experience-title">{item.title}</span>
                </div>
                <div className="experience-meta">
                  <span className="experience-company">
                    {item.companyLink ? (
                      <a
                        href={item.companyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {item.company}
                      </a>
                    ) : item.company}
                  </span>
                  <span className="experience-period">{item.period}</span>
                </div>
                <div className="experience-chevron">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6,9 12,15 18,9" />
                  </svg>
                </div>
              </button>

              <div className="experience-content">
                <div className="experience-content-inner">
                  {item.metrics && item.metrics.length > 0 && (
                    <div className="experience-metrics">
                      {item.metrics.map((metric, idx) => (
                        <span key={idx} className={`metric-badge ${idx === 1 ? 'highlight' : ''}`}>
                          {metric}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="experience-description">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Experience;
