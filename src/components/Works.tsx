import ScrollReveal from './ScrollReveal';
import './Works.css';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  link: string;
  image: string;
}

const Works: React.FC = () => {
  const projects: Project[] = [
    {
      id: '1',
      title: 'Cocktail AI',
      category: 'AI Product',
      description: 'AI-powered cocktail discovery con Claude',
      link: 'https://cocktail-ai.pages.dev',
      image: 'https://api.microlink.io/?url=https://cocktail-ai.pages.dev&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=900&waitFor=2000'
    },
    {
      id: '2',
      title: 'Adele Lo Feudo',
      category: 'Client Work',
      description: 'Portfolio pittrice contemporanea italiana',
      link: 'https://adelelofeudo.com',
      image: 'https://api.microlink.io/?url=https://adelelofeudo.com&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=900&waitFor=1000'
    },
    {
      id: '3',
      title: 'Cucina Chef AI',
      category: 'AI Product',
      description: 'App cucina con assistente AI',
      link: 'https://cucina-chef-ai.pages.dev',
      image: 'https://api.microlink.io/?url=https://cucina-chef-ai.pages.dev&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=900&waitFor=2000'
    },
    {
      id: '4',
      title: 'Brickgen',
      category: 'AI Product',
      description: 'AI LEGO model generator con parti reali',
      link: 'https://brickgen.pages.dev',
      image: 'https://api.microlink.io/?url=https://brickgen.pages.dev&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=900&waitFor=2000'
    },
    {
      id: '5',
      title: 'Objects',
      category: 'Dev Tool',
      description: 'Visual Editor per React projects',
      link: 'https://objects-ef4.pages.dev',
      image: 'https://api.microlink.io/?url=https://objects-ef4.pages.dev&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=900&waitFor=2000'
    },
    {
      id: '6',
      title: 'Ritorno',
      category: 'Client Work',
      description: 'Mostra d\'arte di Adele Lo Feudo',
      link: 'https://ritorno.adelelofeudo.com',
      image: 'https://api.microlink.io/?url=https://ritorno.adelelofeudo.com&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=900&waitFor=2000'
    }
  ];

  const templates: Project[] = [
    {
      id: 't1',
      title: 'Hanzo',
      category: 'Portfolio',
      description: 'Minimal dark portfolio template',
      link: 'https://hanzo-template.pages.dev',
      image: 'https://api.microlink.io/?url=https://hanzo-template.pages.dev&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=900&waitFor=2000'
    },
    {
      id: 't2',
      title: 'Folio EP',
      category: 'Portfolio',
      description: 'Portfolio con globe 3D interattivo',
      link: 'https://folio-ep.pages.dev',
      image: 'https://api.microlink.io/?url=https://folio-ep.pages.dev&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=900&waitFor=2000'
    },
    {
      id: 't3',
      title: 'Artemis',
      category: 'Portfolio',
      description: 'Portfolio creativo e moderno',
      link: 'https://artemis-portfolio-bbr.pages.dev',
      image: 'https://api.microlink.io/?url=https://artemis-portfolio-bbr.pages.dev&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=900&waitFor=2000'
    },
    {
      id: 't5',
      title: 'Ferrero Rocher',
      category: 'Portfolio',
      description: 'Portfolio luxury style',
      link: 'https://ferrero-rocher-portfolio.pages.dev',
      image: 'https://api.microlink.io/?url=https://ferrero-rocher-portfolio.pages.dev&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=900&waitFor=2000'
    },
    {
      id: 't6',
      title: 'Portfolio Dark',
      category: 'Portfolio',
      description: 'Dark mode minimal template',
      link: 'https://portfolio-dark.pages.dev',
      image: 'https://api.microlink.io/?url=https://portfolio-dark.pages.dev&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=900&waitFor=2000'
    },
    {
      id: 't7',
      title: 'Landing Template',
      category: 'Landing',
      description: 'Landing page moderna e responsive',
      link: 'https://landing-template-bp5.pages.dev',
      image: 'https://api.microlink.io/?url=https://landing-template-bp5.pages.dev&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=900&waitFor=2000'
    }
  ];

  return (
    <>
      <section id="works">
        <ScrollReveal>
          <div className="section-header">
            <h2 className="section-title">Projects</h2>
            <span className="section-arrow">→</span>
          </div>
        </ScrollReveal>

        <div className="works-grid">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 100}>
              <a
                href={project.link}
                className="work-card"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="work-image-wrapper">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="work-image"
                    loading="lazy"
                  />
                  <div className="work-hover-overlay">
                    <div className="work-hover-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="work-meta">
                  <div className="work-tag">
                    <div className="tag-dots">
                      <span className="tag-dot"></span>
                      <span className="tag-dot"></span>
                    </div>
                    <span>{project.category}</span>
                  </div>
                  <span className="work-name">{project.title}</span>
                  <p className="work-description">{project.description}</p>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section id="templates">
        <ScrollReveal>
          <div className="section-header">
            <h2 className="section-title">Templates</h2>
            <span className="section-arrow">→</span>
          </div>
        </ScrollReveal>

        <div className="works-grid">
          {templates.map((template, index) => (
            <ScrollReveal key={template.id} delay={index * 100}>
              <a
                href={template.link}
                className="work-card"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="work-image-wrapper">
                  <img
                    src={template.image}
                    alt={template.title}
                    className="work-image"
                    loading="lazy"
                  />
                  <div className="work-hover-overlay">
                    <div className="work-hover-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="work-meta">
                  <div className="work-tag">
                    <div className="tag-dots">
                      <span className="tag-dot"></span>
                      <span className="tag-dot"></span>
                    </div>
                    <span>{template.category}</span>
                  </div>
                  <span className="work-name">{template.title}</span>
                  <p className="work-description">{template.description}</p>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
};

export default Works;