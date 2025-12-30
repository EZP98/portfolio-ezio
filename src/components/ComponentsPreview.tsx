import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import './ComponentsPreview.css';

const ComponentsPreview: React.FC = () => {
  const components = [
    { name: 'Globe3D', tags: ['Three.js', '3D'] },
    { name: 'Carousel3D', tags: ['Interactive', '3D'] },
    { name: 'Badge3D', tags: ['Physics', 'Rapier'] },
    { name: 'Books3D', tags: ['CSS', 'Animation'] },
    { name: 'LightText', tags: ['Mouse Track', 'Effect'] },
    { name: 'ImageMarquee', tags: ['Infinite', 'Scroll'] },
  ];

  return (
    <section className="components-preview-section">
      <ScrollReveal>
        <div className="section-header">
          <h2 className="section-title">UI Components</h2>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={50}>
        <div className="components-preview-grid">
          {components.map((comp, index) => (
            <Link
              key={index}
              to="/components"
              className="component-preview-card"
            >
              <span className="component-preview-name">{comp.name}</span>
              <div className="component-preview-tags">
                {comp.tags.map((tag, i) => (
                  <span key={i} className="component-preview-tag">{tag}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <Link to="/components" className="view-all-link">
          View all components
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </ScrollReveal>
    </section>
  );
};

export default ComponentsPreview;
