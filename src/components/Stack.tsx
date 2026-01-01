import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ScrollReveal from './ScrollReveal';
import './Stack.css';

const skillCategories = [
  {
    id: 'design',
    title: 'Design',
    desc: 'UI/UX & Prototyping',
    tools: ['Figma', 'Framer', 'Canva']
  },
  {
    id: 'development',
    title: 'Development',
    desc: 'Frontend & 3D Web',
    tools: ['React', 'TypeScript', 'Tailwind', 'Three.js']
  },
  {
    id: 'ai-code',
    title: 'AI Coding',
    desc: 'Development & Research',
    tools: ['Claude', 'Bolt', 'Perplexity']
  },
  {
    id: 'ai-creative',
    title: 'AI Creative',
    desc: 'Images & 3D',
    tools: ['Midjourney', 'ChatGPT', 'Lovart', 'Tripo']
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure',
    desc: 'Backend & Deploy',
    tools: ['Supabase', 'Cloudflare']
  },
  {
    id: 'video',
    title: 'Video',
    desc: 'Editing',
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

      <div className="skills-bento">
        {skillCategories.map((category, idx) => (
          <ScrollReveal key={category.id} delay={50 + idx * 30}>
            <div className={`skill-card skill-card-${category.id}`}>
              <div>
                <h3 className="skill-category-title">{category.title}</h3>
                <p className="skill-category-desc">{category.desc}</p>
              </div>
              <div className={`tools-flow ${category.tools.length <= 2 ? 'no-animate' : ''}`}>
                <div className="tools-track">
                  {category.tools.map((tool, i) => (
                    <span key={i} className="tool-tag">{tool}</span>
                  ))}
                  {category.tools.length > 2 && category.tools.map((tool, i) => (
                    <span key={`dup-${i}`} className="tool-tag">{tool}</span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default Stack;
