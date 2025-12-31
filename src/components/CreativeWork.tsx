import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import './CreativeWork.css';

const CreativeWork: React.FC = () => {
  return (
    <section className="creative-work-section" id="creative">
      <ScrollReveal>
        <div className="section-header">
          <h2 className="section-title">Creative Work</h2>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={50}>
        <div className="creative-work-grid">
          {/* AI Images */}
          <Link to="/gallery/ai" className="creative-card">
            <div className="creative-card-content">
              <h3 className="creative-card-title">AI Images</h3>
              <p className="creative-card-description">Generative art with Midjourney</p>
            </div>
            <div className="creative-hover-overlay">
              <div className="creative-hover-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </Link>

          {/* Photography */}
          <Link to="/gallery/photos" className="creative-card">
            <div className="creative-card-content">
              <h3 className="creative-card-title">Photography</h3>
              <p className="creative-card-description">Moments captured</p>
            </div>
            <div className="creative-hover-overlay">
              <div className="creative-hover-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </Link>

          {/* Components - with preview */}
          <Link to="/components" className="creative-card creative-card-components">
            <div className="components-mini-preview">
              <div className="mini-btn mini-btn-primary">Button</div>
              <div className="mini-btn mini-btn-secondary">Secondary</div>
              <div className="mini-toggle">
                <div className="mini-toggle-track">
                  <div className="mini-toggle-thumb"></div>
                </div>
              </div>
              <div className="mini-input">
                <span>Email</span>
              </div>
            </div>
            <div className="creative-card-content">
              <h3 className="creative-card-title">Components</h3>
              <p className="creative-card-description">React & Three.js</p>
            </div>
            <div className="creative-hover-overlay">
              <div className="creative-hover-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default CreativeWork;
