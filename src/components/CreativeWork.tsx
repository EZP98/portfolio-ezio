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
          {/* AI Images - with Coin and Particles */}
          <Link to="/ai-images" className="creative-card creative-card-ai">
            <div className="coin-preview">
              <img src="/coin.png" alt="3D Coin" className="coin-image" />
              {/* Particles - same style as hero button */}
              <div className="coin-particles">
                <div className="coin-particle" style={{ left: '11%', top: '70%', width: '0.7px', height: '0.7px', animationDelay: '0s', animationDuration: '2s, 3s' }} />
                <div className="coin-particle" style={{ left: '64%', top: '18%', width: '0.9px', height: '0.9px', animationDelay: '0.3s', animationDuration: '2.5s, 3.5s' }} />
                <div className="coin-particle" style={{ left: '10%', top: '17%', width: '0.6px', height: '0.6px', animationDelay: '0.7s', animationDuration: '2.2s, 3.2s' }} />
                <div className="coin-particle" style={{ left: '23%', top: '39%', width: '0.8px', height: '0.8px', animationDelay: '1.1s', animationDuration: '2.8s, 3.8s' }} />
                <div className="coin-particle" style={{ left: '26%', top: '28%', width: '0.7px', height: '0.7px', animationDelay: '0.5s', animationDuration: '2.3s, 3.3s' }} />
                <div className="coin-particle" style={{ left: '24%', top: '85%', width: '0.9px', height: '0.9px', animationDelay: '1.5s', animationDuration: '2.6s, 3.6s' }} />
                <div className="coin-particle" style={{ left: '41%', top: '68%', width: '0.6px', height: '0.6px', animationDelay: '0.2s', animationDuration: '2.1s, 3.1s' }} />
                <div className="coin-particle" style={{ left: '74%', top: '66%', width: '0.8px', height: '0.8px', animationDelay: '0.9s', animationDuration: '2.4s, 3.4s' }} />
                <div className="coin-particle" style={{ left: '49%', top: '53%', width: '0.7px', height: '0.7px', animationDelay: '1.3s', animationDuration: '2.7s, 3.7s' }} />
                <div className="coin-particle" style={{ left: '76%', top: '36%', width: '0.9px', height: '0.9px', animationDelay: '0.4s', animationDuration: '2.9s, 3.9s' }} />
                <div className="coin-particle" style={{ left: '42%', top: '25%', width: '0.6px', height: '0.6px', animationDelay: '1.7s', animationDuration: '2.2s, 3.2s' }} />
                <div className="coin-particle" style={{ left: '85%', top: '77%', width: '0.8px', height: '0.8px', animationDelay: '0.6s', animationDuration: '2.5s, 3.5s' }} />
              </div>
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
          <Link to="/photography" className="creative-card creative-card-photos">
            <div className="photos-preview">
              <div className="photo-placeholder photo-left">
                <img src="/DSCF6177.webp" alt="Photo 1" className="photo-image" />
              </div>
              <div className="photo-placeholder photo-center">
                <img src="/DSCF6232.webp" alt="Photo 2" className="photo-image" />
              </div>
              <div className="photo-placeholder photo-right">
                <img src="/DSCF6713.webp" alt="Photo 3" className="photo-image" />
              </div>
            </div>
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
