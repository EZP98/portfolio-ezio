import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Works.css';
import type { WorkItem } from '../types';

const Works: React.FC = () => {
  const { t } = useLanguage();
  
  const works: WorkItem[] = [
    {
      id: '1',
      title: t('theRuin'),
      category: t('poetryFilm'),
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop',
      link: '/works/il-rudere'
    },
    {
      id: '2',
      title: t('perugiaElegy'),
      category: t('poetryFilm'),
      image: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&h=600&fit=crop',
      link: '/works/elegia-perugina'
    },
    {
      id: '3',
      title: t('placesOfSoul'),
      category: t('artFilm'),
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      link: '/works/luoghi-anima'
    },
    {
      id: '4',
      title: t('oneHeartAlone'),
      category: t('artFilm'),
      image: 'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?w=800&h=600&fit=crop',
      link: '/works/un-cuore-solo'
    },
    {
      id: '5',
      title: t('studioHouse'),
      category: t('documentary'),
      image: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=800&h=600&fit=crop',
      link: '/works/casa-studio'
    },
    {
      id: '6',
      title: t('albicchiereStory'),
      category: t('corporate'),
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=600&fit=crop',
      link: '/works/albicchiere-story'
    }
  ];

  return (
    <section id="videomaking">
      <div className="section-header">
        <h2 className="section-title">{t('videoWorks')}</h2>
        <span className="section-arrow">→</span>
      </div>
      
      <div className="works-grid">
        {works.map((work) => (
          <a key={work.id} href={work.link} className="work-card">
            <div className="work-image-wrapper">
              <img 
                src={work.image} 
                alt={work.title} 
                className="work-image"
              />
            </div>
            <div className="work-meta">
              <div className="work-tag">
                <div className="tag-dots">
                  <span className="tag-dot"></span>
                  <span className="tag-dot"></span>
                </div>
                <span>{work.category}</span>
              </div>
              <span className="work-name">{work.title}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Works;