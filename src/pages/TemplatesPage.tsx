import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Header from '../components/Header';
import './TemplatesPage.css';

interface Template {
  id: string;
  name: string;
  description: string;
  descriptionIT: string;
  image: string;
  category: string;
  link: string;
}

const templates: Template[] = [
  {
    id: '1',
    name: 'Slate',
    description: 'Minimal agency template',
    descriptionIT: 'Template agenzia minimale',
    image: 'https://framerusercontent.com/images/mnZ0pS3d98m7Drs9IEa1qJipIlc.png',
    category: 'Portfolio',
    link: 'https://hanzo-template.pages.dev',
  },
  {
    id: '2',
    name: 'Folio EP',
    description: 'Portfolio with interactive 3D globe',
    descriptionIT: 'Portfolio con globo 3D interattivo',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop',
    category: 'Portfolio',
    link: '#',
  },
  {
    id: '3',
    name: 'Nova',
    description: 'Creative modern portfolio',
    descriptionIT: 'Portfolio creativo e moderno',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=600&fit=crop',
    category: 'Portfolio',
    link: '#',
  },
  {
    id: '4',
    name: 'Velvet',
    description: 'Luxury style portfolio',
    descriptionIT: 'Portfolio stile luxury',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&h=600&fit=crop',
    category: 'Portfolio',
    link: '#',
  },
  {
    id: '5',
    name: 'Obsidian',
    description: 'Dark minimal template',
    descriptionIT: 'Template minimale dark',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    category: 'Portfolio',
    link: '#',
  },
  {
    id: '6',
    name: 'Aurora',
    description: 'Modern responsive landing',
    descriptionIT: 'Landing page moderna e responsive',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
    category: 'Landing',
    link: '#',
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
              ? 'Template Framer pronti all\'uso per il tuo prossimo progetto'
              : 'Ready-to-use Framer templates for your next project'}
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
                  <img
                    src={template.image}
                    alt={template.name}
                    loading="lazy"
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
