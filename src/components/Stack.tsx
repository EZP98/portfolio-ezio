import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ScrollReveal from './ScrollReveal';
import './Stack.css';

const Stack: React.FC = () => {
  const { t } = useLanguage();

  const tools = [
    'Figma',
    'Claude',
    'ChatGPT',
    'Perplexity',
    'Midjourney',
    'Canva',
    'CapCut',
    'DaVinci Resolve',
    'Supabase',
    'Framer',
    'Bolt',
    'GitHub',
    'Cloudflare',
    'React',
    'TypeScript',
    'Tailwind CSS'
  ];

  return (
    <section className="stack-section">
      <ScrollReveal>
        <div className="section-header">
          <h2 className="section-title">{t('toolsSkills')}</h2>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={50}>
        <div className="stack-badges">
          {tools.map((tool, index) => (
            <span key={index} className="stack-badge">
              {tool}
            </span>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Stack;
