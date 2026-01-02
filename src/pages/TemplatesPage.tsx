import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Header from '../components/Header';
import './TemplatesPage.css';

interface Template {
  id: string;
  name: string;
  description: string;
  descriptionIT: string;
  video: string;
  category: string;
  link: string;
}

const templates: Template[] = [
  {
    id: '1',
    name: 'Slate',
    description: 'Minimal agency template',
    descriptionIT: 'Template agenzia minimale',
    video: '/templates/slate.mp4',
    category: 'Portfolio',
    link: 'https://slate-6ls.pages.dev',
  },
  {
    id: '2',
    name: 'Orbit',
    description: 'Portfolio with interactive 3D globe',
    descriptionIT: 'Portfolio con globe 3D interattivo',
    video: '/templates/orbit.mp4',
    category: 'Portfolio',
    link: 'https://orbit-zq4.pages.dev',
  },
  {
    id: '3',
    name: 'Nova',
    description: 'Creative modern portfolio',
    descriptionIT: 'Portfolio creativo e moderno',
    video: '/templates/nova.mp4',
    category: 'Portfolio',
    link: 'https://nova-edz.pages.dev',
  },
  {
    id: '4',
    name: 'Ferrero Rocher',
    description: 'Luxury style portfolio',
    descriptionIT: 'Portfolio stile luxury',
    video: '/templates/ferrero.mp4',
    category: 'Portfolio',
    link: 'https://ferrero-rocher-portfolio.pages.dev',
  },
  {
    id: '5',
    name: 'Obsidian',
    description: 'Dark minimal template',
    descriptionIT: 'Template minimale dark',
    video: '/templates/obsidian.mp4',
    category: 'Portfolio',
    link: 'https://obsidian-cud.pages.dev',
  },
  {
    id: '6',
    name: 'Aurora',
    description: 'Modern responsive landing',
    descriptionIT: 'Landing page moderna e responsive',
    video: '/templates/aurora.mp4',
    category: 'Landing',
    link: 'https://aurora-76x.pages.dev',
  },
];

const TemplatesPage: React.FC = () => {
  const { language } = useLanguage();
  const [visibleCount, setVisibleCount] = useState(6);

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, templates.length));
  };

  return (
    <div className="templates-page">
      <Header />

      <main className="templates-main">
        <section className="templates-hero">
          <span className="templates-badge">Templates</span>
          <h1 className="templates-title">
            {language === 'it' ? 'Galleria Template' : 'Template Gallery'}
          </h1>
          <p className="templates-subtitle">
            {language === 'it'
              ? 'Template pronti all\'uso per il tuo prossimo progetto'
              : 'Ready-to-use templates for your next project'}
          </p>
        </section>

        <section className="templates-grid-section">
          <div className="templates-grid">
            {templates.slice(0, visibleCount).map((template) => (
              <a
                key={template.id}
                href={template.link}
                className="template-card"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="template-preview">
                  <video
                    src={template.video}
                    muted
                    loop
                    playsInline
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                  />
                </div>
                <div className="template-meta">
                  <span className="template-category">{template.category}</span>
                  <h3 className="template-name">{template.name}</h3>
                  <p className="template-description">
                    {language === 'it' ? template.descriptionIT : template.description}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {visibleCount < templates.length && (
            <button className="load-more-btn" onClick={loadMore}>
              Load More
            </button>
          )}
        </section>
      </main>
    </div>
  );
};

export default TemplatesPage;
