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
    icon: '🎨',
    title: 'Design',
    titleIT: 'Design',
    description: 'UI/UX & Visual',
    descriptionIT: 'UI/UX & Visual',
    tools: ['Figma', 'Canva', 'Framer']
  },
  {
    icon: '🤖',
    title: 'AI Tools',
    titleIT: 'Strumenti AI',
    description: 'Assistants & Generation',
    descriptionIT: 'Assistenti & Generazione',
    tools: ['Claude', 'ChatGPT', 'Perplexity', 'Midjourney']
  },
  {
    icon: '🎬',
    title: 'Video',
    titleIT: 'Video',
    description: 'Edit & Color',
    descriptionIT: 'Montaggio & Color',
    tools: ['CapCut', 'DaVinci Resolve']
  },
  {
    icon: '💻',
    title: 'Development',
    titleIT: 'Sviluppo',
    description: 'Frontend & Backend',
    descriptionIT: 'Frontend & Backend',
    tools: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase']
  },
  {
    icon: '☁️',
    title: 'Infrastructure',
    titleIT: 'Infrastruttura',
    description: 'Deploy & Hosting',
    descriptionIT: 'Deploy & Hosting',
    tools: ['GitHub', 'Cloudflare', 'Vercel']
  },
  {
    icon: '⚡',
    title: 'No-Code',
    titleIT: 'No-Code',
    description: 'Rapid prototyping',
    descriptionIT: 'Prototipazione rapida',
    tools: ['Bolt', 'Framer', 'Webflow']
  }
];

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
              <span className="skill-icon">{category.icon}</span>
              <h3 className="skill-title">
                {language === 'it' ? category.titleIT : category.title}
              </h3>
              <p className="skill-description">
                {language === 'it' ? category.descriptionIT : category.description}
              </p>
              <span className="skill-count">
                {category.tools.length} {language === 'it' ? 'strumenti' : 'tools'}
              </span>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Stack;
