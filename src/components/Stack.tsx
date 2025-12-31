import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ScrollReveal from './ScrollReveal';
import './Stack.css';

const tools = [
  'Figma', 'Framer', 'Canva',
  'Claude', 'ChatGPT', 'Midjourney',
  'React', 'TypeScript', 'Tailwind',
  'Supabase', 'Vercel', 'Cloudflare',
  'DaVinci Resolve', 'CapCut',
  'Bolt', 'Webflow'
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
          <div className="tools-flow">
            {tools.map((tool, i) => (
              <span key={i} className="tool-tag">{tool}</span>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Stack;
