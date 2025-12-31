import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import Globe3D from './Globe3D';
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
          {/* AI Images - with Coin and Sparkles */}
          <Link to="/gallery/ai" className="creative-card creative-card-ai">
            <div className="coin-preview">
              <img src="/coin.png" alt="3D Coin" className="coin-image" />
              {/* Sparkles */}
              <svg className="sparkle sparkle-1" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L13.09 8.26L19 9L13.09 9.74L12 16L10.91 9.74L5 9L10.91 8.26L12 2Z" fill="currentColor" />
              </svg>
              <svg className="sparkle sparkle-2" width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L13.09 8.26L19 9L13.09 9.74L12 16L10.91 9.74L5 9L10.91 8.26L12 2Z" fill="currentColor" />
              </svg>
              <svg className="sparkle sparkle-3" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L13.09 8.26L19 9L13.09 9.74L12 16L10.91 9.74L5 9L10.91 8.26L12 2Z" fill="currentColor" />
              </svg>
              <svg className="sparkle sparkle-4" width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L13.09 8.26L19 9L13.09 9.74L12 16L10.91 9.74L5 9L10.91 8.26L12 2Z" fill="currentColor" />
              </svg>
            </div>
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

          {/* Components - with Globe */}
          <Link to="/components" className="creative-card creative-card-components">
            <div className="globe-preview">
              <Suspense fallback={null}>
                <Globe3D radius={2.0} autoRotate />
              </Suspense>
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

          {/* Photography - full width */}
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
        </div>
      </ScrollReveal>
    </section>
  );
};

export default CreativeWork;
