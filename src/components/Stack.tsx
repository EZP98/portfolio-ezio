import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Stack.css';
import type { StackItem } from '../types';

const Stack: React.FC = () => {
  const { t } = useLanguage();
  
  const stackItems: StackItem[] = [
    {
      id: '1',
      name: 'Figma',
      description: t('uiuxDesign'),
      logo: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg',
      link: 'https://www.figma.com'
    },
    {
      id: '2',
      name: 'Claude',
      description: t('aiAssistant'),
      logo: 'https://via.placeholder.com/72/FFFFFF/0D0D0D?text=C',
      link: 'https://claude.ai'
    },
    {
      id: '3',
      name: 'ChatGPT',
      description: t('aiLanguageModel'),
      logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
      link: 'https://chat.openai.com'
    },
    {
      id: '4',
      name: 'Perplexity',
      description: t('aiSearchEngine'),
      logo: 'https://via.placeholder.com/72/FFFFFF/0D0D0D?text=P',
      link: 'https://www.perplexity.ai'
    },
    {
      id: '5',
      name: 'Midjourney',
      description: t('aiImageGen'),
      logo: 'https://via.placeholder.com/72/FFFFFF/0D0D0D?text=MJ',
      link: 'https://www.midjourney.com'
    },
    {
      id: '6',
      name: 'Canva',
      description: t('designTool'),
      logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg',
      link: 'https://www.canva.com'
    },
    {
      id: '7',
      name: 'CapCut',
      description: t('videoEditing'),
      logo: 'https://via.placeholder.com/72/FFFFFF/0D0D0D?text=CC',
      link: 'https://www.capcut.com'
    },
    {
      id: '8',
      name: 'DaVinci Resolve',
      description: t('colorGrading'),
      logo: 'https://upload.wikimedia.org/wikipedia/commons/9/90/DaVinci_Resolve_17_logo.svg',
      link: 'https://www.blackmagicdesign.com/products/davinciresolve'
    },
    {
      id: '9',
      name: 'Supabase',
      description: t('backendService'),
      logo: 'https://via.placeholder.com/72/FFFFFF/0D0D0D?text=S',
      link: 'https://supabase.com'
    },
    {
      id: '10',
      name: 'Framer',
      description: t('designDev'),
      logo: 'https://via.placeholder.com/72/FFFFFF/0D0D0D?text=F',
      link: 'https://www.framer.com'
    },
    {
      id: '11',
      name: 'Bolt',
      description: t('aiDevelopment'),
      logo: 'https://via.placeholder.com/72/FFFFFF/0D0D0D?text=B',
      link: 'https://bolt.new'
    },
    {
      id: '12',
      name: 'GitHub',
      description: t('versionControl'),
      logo: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg',
      link: 'https://github.com'
    },
    {
      id: '13',
      name: 'Cloudflare',
      description: t('webInfrastructure'),
      logo: 'https://via.placeholder.com/72/FFFFFF/0D0D0D?text=CF',
      link: 'https://www.cloudflare.com'
    },
    {
      id: '14',
      name: 'LinkedIn',
      description: t('professionalNetwork'),
      logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',
      link: 'https://www.linkedin.com/in/ezio-pappalardo-170a73229/'
    }
  ];

  return (
    <section className="stack-section">
      <div className="section-header">
        <h2 className="section-title">{t('toolsSkills')}</h2>
        <span className="section-arrow">→</span>
      </div>
      
      <div className="stack-grid">
        {stackItems.map((item) => (
          <a 
            key={item.id} 
            href={item.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="stack-item"
          >
            <div className="stack-logo">
              <img src={item.logo} alt={item.name} />
            </div>
            <div className="stack-info">
              <div className="stack-name">{item.name}</div>
              <div className="stack-description">{item.description}</div>
            </div>
            <div className="external-icon">
              <svg viewBox="0 0 16 16">
                <path 
                  d="M 6.667 8.667 C 7.246 9.441 8.133 9.926 9.098 9.995 C 10.062 10.064 11.01 9.711 11.693 9.027 L 13.693 7.027 C 14.957 5.719 14.939 3.64 13.653 2.354 C 12.367 1.068 10.288 1.05 8.98 2.313 L 7.833 3.453" 
                  fill="transparent" 
                  strokeWidth="1.5" 
                  stroke="#0D0D0D" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M 9.333 7.333 C 8.754 6.559 7.867 6.074 6.902 6.005 C 5.938 5.936 4.99 6.289 4.307 6.973 L 2.307 8.973 C 1.043 10.281 1.061 12.36 2.347 13.646 C 3.633 14.932 5.712 14.95 7.02 13.687 L 8.16 12.547" 
                  fill="transparent" 
                  strokeWidth="1.5" 
                  stroke="#0D0D0D" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Stack;