import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import './ComponentsSection.css';

const components = [
  { name: 'ServicesTicker', icon: '↔️', tag: 'Animation' },
  { name: 'ScrollReveal', icon: '👁️', tag: 'Scroll' },
  { name: 'RollingText', icon: '🔄', tag: 'Text' },
  { name: '3D Cards', icon: '🎴', tag: '3D' },
  { name: 'Timeline', icon: '📅', tag: 'Accordion' },
  { name: 'Carousel', icon: '💬', tag: 'Carousel' },
  { name: 'Bento Grid', icon: '🔲', tag: 'Layout' },
  { name: 'Dark Mode', icon: '🌙', tag: 'Theme' },
];

const ComponentsSection: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section className="components-section" id="components">
      <div className="container">
        <div className="components-header">
          <span className="section-badge">UI Library</span>
          <h2 className="section-title">
            {language === 'it' ? 'Componenti React' : 'React Components'}
          </h2>
          <p className="section-subtitle">
            {language === 'it'
              ? 'Componenti riutilizzabili costruiti per i miei progetti'
              : 'Reusable components built for my projects'}
          </p>
        </div>

        <div className="components-preview-grid">
          {components.map((comp, index) => (
            <div key={index} className="component-preview-card">
              <span className="component-icon">{comp.icon}</span>
              <span className="component-name">{comp.name}</span>
              <span className="component-tag">{comp.tag}</span>
            </div>
          ))}
        </div>

        <div className="components-cta">
          <Link to="/components" className="view-all-btn">
            {language === 'it' ? 'Vedi tutti i componenti' : 'View all components'}
            <span className="btn-arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ComponentsSection;
