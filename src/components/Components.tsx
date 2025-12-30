import { useLanguage } from '../contexts/LanguageContext';
import ScrollReveal from './ScrollReveal';
import './Components.css';

const Components: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="components-section" id="components">
      <ScrollReveal>
        <div className="section-header">
          <h2 className="section-title">{t('components')}</h2>
        </div>
      </ScrollReveal>

      <div className="components-grid">
        {/* Main Feature Card */}
        <ScrollReveal delay={0}>
          <div className="component-card component-card-main">
            <div className="component-preview">
              <div className="preview-buttons">
                <div className="preview-btn preview-btn-primary">Get Started</div>
                <div className="preview-btn preview-btn-secondary">Learn More</div>
                <div className="preview-btn preview-btn-outline">Contact</div>
              </div>
              <div className="preview-inputs">
                <div className="preview-input">
                  <span className="input-placeholder">Email address</span>
                </div>
                <div className="preview-toggle">
                  <div className="toggle-track">
                    <div className="toggle-thumb"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="component-info">
              <h3>UI Components</h3>
              <p>{t('componentsDesc')}</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Design System Card */}
        <ScrollReveal delay={100}>
          <div className="component-card">
            <div className="component-icon component-icon-grid">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </div>
            <div className="component-info">
              <h3>Design System</h3>
              <p>{t('designSystemDesc')}</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Dark Mode Card */}
        <ScrollReveal delay={150}>
          <div className="component-card">
            <div className="component-icon component-icon-moon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
              </svg>
            </div>
            <div className="component-info">
              <h3>Dark Mode</h3>
              <p>{t('darkModeDesc')}</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Responsive Card */}
        <ScrollReveal delay={200}>
          <div className="component-card">
            <div className="component-icon component-icon-responsive">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="5" y="2" width="14" height="20" rx="2" />
                <line x1="12" y1="18" x2="12" y2="18.01" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="component-info">
              <h3>Responsive</h3>
              <p>{t('responsiveDesc')}</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Tokens Card */}
        <ScrollReveal delay={250}>
          <div className="component-card component-card-tokens">
            <div className="tokens-preview">
              <code className="token-line">
                <span className="token-prop">--bg-primary</span>
                <span className="token-colon">:</span>
                <span className="token-value">#FFFFFF</span>
              </code>
              <code className="token-line">
                <span className="token-prop">--text-primary</span>
                <span className="token-colon">:</span>
                <span className="token-value">#0D0D0D</span>
              </code>
              <code className="token-line">
                <span className="token-prop">--radius-md</span>
                <span className="token-colon">:</span>
                <span className="token-value">12px</span>
              </code>
            </div>
            <div className="component-info">
              <h3>Design Tokens</h3>
              <p>{t('tokensDesc')}</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Components;
