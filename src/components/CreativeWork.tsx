import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import './CreativeWork.css';

const CreativeWork: React.FC = () => {
  const categories = [
    {
      id: 'ai-images',
      title: 'AI Images',
      description: 'Generative art with Midjourney',
      link: '/gallery/ai'
    },
    {
      id: 'photography',
      title: 'Photography',
      description: 'Moments captured',
      link: '/gallery/photos'
    },
    {
      id: 'components',
      title: 'Components',
      description: 'React & Three.js',
      link: '/components'
    }
  ];

  return (
    <section className="creative-work-section" id="creative">
      <ScrollReveal>
        <div className="section-header">
          <h2 className="section-title">Creative Work</h2>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={50}>
        <div className="creative-work-grid">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={cat.link}
              className="creative-card"
            >
              <div className="creative-card-content">
                <h3 className="creative-card-title">{cat.title}</h3>
                <p className="creative-card-description">{cat.description}</p>
              </div>
              <div className="creative-hover-overlay">
                <div className="creative-hover-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
};

export default CreativeWork;
