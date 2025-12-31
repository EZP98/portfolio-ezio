import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ScrollReveal from './ScrollReveal';
import './Stack.css';

interface SkillCategory {
  icon: string;
  title: string;
  titleIT: string;
  description: string;
  descriptionIT: string;
  tools: string[];
}

const categories: SkillCategory[] = [
  {
    icon: 'design',
    title: 'Design',
    titleIT: 'Design',
    description: 'UI/UX & Visual',
    descriptionIT: 'UI/UX & Visual',
    tools: ['Figma', 'Canva', 'Framer']
  },
  {
    icon: 'ai',
    title: 'AI Tools',
    titleIT: 'Strumenti AI',
    description: 'Assistants & Generation',
    descriptionIT: 'Assistenti & Generazione',
    tools: ['Claude', 'ChatGPT', 'Perplexity', 'Midjourney']
  },
  {
    icon: 'video',
    title: 'Video',
    titleIT: 'Video',
    description: 'Edit & Color',
    descriptionIT: 'Montaggio & Color',
    tools: ['CapCut', 'DaVinci Resolve']
  },
  {
    icon: 'code',
    title: 'Development',
    titleIT: 'Sviluppo',
    description: 'Frontend & Backend',
    descriptionIT: 'Frontend & Backend',
    tools: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase']
  },
  {
    icon: 'cloud',
    title: 'Infrastructure',
    titleIT: 'Infrastruttura',
    description: 'Deploy & Hosting',
    descriptionIT: 'Deploy & Hosting',
    tools: ['GitHub', 'Cloudflare', 'Vercel']
  },
  {
    icon: 'bolt',
    title: 'No-Code',
    titleIT: 'No-Code',
    description: 'Rapid prototyping',
    descriptionIT: 'Prototipazione rapida',
    tools: ['Bolt', 'Framer', 'Webflow']
  }
];

const IconMap: Record<string, React.ReactNode> = {
  design: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 19l7-7 3 3-7 7-3-3z" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 2l7.586 7.586" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="11" cy="11" r="2"/>
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <circle cx="15.5" cy="8.5" r="1.5"/>
      <path d="M8 14s1.5 2 4 2 4-2 4-2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  video: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="5 3 19 12 5 21 5 3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="16 18 22 12 16 6" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="8 6 2 12 8 18" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

const Stack: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <section className="stack-section">
      <ScrollReveal>
        <div className="section-header">
          <h2 className="section-title">{t('toolsSkills')}</h2>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={50}>
        <div className="skills-grid">
          {categories.map((category, index) => (
            <div key={index} className="skill-card">
              <span className="skill-icon">{IconMap[category.icon]}</span>
              <h3 className="skill-title">
                {language === 'it' ? category.titleIT : category.title}
              </h3>
              <p className="skill-description">
                {language === 'it' ? category.descriptionIT : category.description}
              </p>
              <div className="skill-tools">
                {category.tools.map((tool, i) => (
                  <span key={i} className="skill-tool-tag">{tool}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Stack;
