import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ScrollReveal from './ScrollReveal';
import './Stack.css';

const skillCategories = [
  {
    title: 'Design',
    tools: ['Figma', 'Framer', 'Canva']
  },
  {
    title: 'Development',
    tools: ['React', 'TypeScript', 'Tailwind', 'Three.js']
  },
  {
    title: 'AI Tools',
    tools: ['Claude', 'ChatGPT', 'Perplexity', 'Midjourney', 'Lovart', 'Tripo', 'Bolt']
  },
  {
    title: 'Infrastructure',
    tools: ['Supabase', 'Cloudflare']
  },
  {
    title: 'Video',
    tools: ['CapCut']
  }
];

const Stack: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="stack-section">
      <ScrollReveal>
        <div className="section-header">
          <h2 className="section-title">{t('toolsSkills')}</h2>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={50}>
        <div className="tools-card">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="skill-category">
              <h3 className="skill-category-title">{category.title}</h3>
              <div className="tools-flow">
                {category.tools.map((tool, i) => (
                  <span key={i} className="tool-tag">{tool}</span>
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
