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
      title: 'Gusto',
      category: 'AI Product',
      description: 'AI recipe assistant con Claude',
      link: 'https://gusto-8cx.pages.dev',
      image: 'https://api.microlink.io/?url=https://gusto-8cx.pages.dev&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=900&waitFor=2000'
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
      title: 'Slate',
      category: 'Portfolio',
      description: 'Minimal agency template',
      link: 'https://slate-6ls.pages.dev',
      image: '/templates/slate.mp4?v=20260102c'
    },
    {
      id: 't2',
      title: 'Orbit',
      category: 'Portfolio',
      description: 'Portfolio con globe 3D interattivo',
      link: 'https://orbit-zq4.pages.dev',
      image: '/templates/orbit.mp4?v=20260102c'
    },
    {
      id: 't3',
      title: 'Nova',
      category: 'Portfolio',
      description: 'Creative modern portfolio',
      link: 'https://nova-edz.pages.dev',
      image: '/templates/nova.mp4?v=20260102c'
    },
    {
      id: 't4',
      title: 'Ferrero Rocher',
      category: 'Portfolio',
      description: 'Luxury style portfolio',
      link: 'https://ferrero-rocher-portfolio.pages.dev',
      image: '/templates/ferrero.mp4?v=20260102c'
    },
    {
      id: 't5',
      title: 'Obsidian',
      category: 'Portfolio',
      description: 'Dark minimal template',
      link: 'https://obsidian-cud.pages.dev',
      image: '/templates/obsidian.mp4?v=20260102c'
    },
    {
      id: 't6',
      title: 'Aurora',
      category: 'Landing',
      description: 'Modern responsive landing',
      link: 'https://aurora-76x.pages.dev',
      image: '/templates/aurora.mp4?v=20260102c'
    }
  ];

  return (
    <>
      <section id="works">
        <ScrollReveal>
          <div className="section-header">
            <h2 className="section-title">Projects</h2>
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
                      <svg viewBox="0 0 16 16" fill="currentColor">
                        <path d="M1.333 8L0.741 7.693L0.582 8L0.741 8.307L1.333 8ZM14.666 8L15.258 8.307L15.417 8L15.258 7.693L14.666 8ZM1.925 8.307C3.443 5.369 5.768 4 8 4C10.231 4 12.556 5.37 14.075 8.307L15.259 7.693C13.558 4.407 10.825 2.667 8 2.667C5.173 2.667 2.44 4.407 0.74 7.693L1.924 8.307ZM0.741 8.307C2.44 11.592 5.173 13.333 7.999 13.333C10.826 13.333 13.558 11.593 15.258 8.307L14.074 7.693C12.555 10.63 10.231 12 7.999 12C5.768 12 3.443 10.63 1.925 7.693L0.741 8.307ZM9.333 8C9.333 8.736 8.736 9.333 7.999 9.333V10.667C9.472 10.667 10.666 9.473 10.666 8H9.333ZM7.999 9.333C7.263 9.333 6.666 8.736 6.666 8H5.333C5.333 9.473 6.527 10.667 7.999 10.667V9.333ZM6.666 8C6.666 7.264 7.263 6.667 7.999 6.667V5.333C6.527 5.333 5.333 6.527 5.333 8H6.666ZM7.999 6.667C8.736 6.667 9.333 7.264 9.333 8H10.666C10.666 6.527 9.472 5.333 7.999 5.333V6.667Z" />
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
          </div>
        </ScrollReveal>

        <div className="works-grid templates-grid">
          {templates.map((template, index) => (
            <ScrollReveal key={template.id} delay={index * 100}>
              <a
                href={template.link}
                className="work-card template-card"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="work-image-wrapper">
                  <video
                    src={template.image}
                    className="work-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    onLoadedData={(e) => {
                      const video = e.currentTarget;
                      video.currentTime = index * 2.5;
                      video.play().catch(() => {});
                    }}
                  />
                  <div className="work-hover-overlay">
                    <div className="work-hover-icon">
                      <svg viewBox="0 0 16 16" fill="currentColor">
                        <path d="M1.333 8L0.741 7.693L0.582 8L0.741 8.307L1.333 8ZM14.666 8L15.258 8.307L15.417 8L15.258 7.693L14.666 8ZM1.925 8.307C3.443 5.369 5.768 4 8 4C10.231 4 12.556 5.37 14.075 8.307L15.259 7.693C13.558 4.407 10.825 2.667 8 2.667C5.173 2.667 2.44 4.407 0.74 7.693L1.924 8.307ZM0.741 8.307C2.44 11.592 5.173 13.333 7.999 13.333C10.826 13.333 13.558 11.593 15.258 8.307L14.074 7.693C12.555 10.63 10.231 12 7.999 12C5.768 12 3.443 10.63 1.925 7.693L0.741 8.307ZM9.333 8C9.333 8.736 8.736 9.333 7.999 9.333V10.667C9.472 10.667 10.666 9.473 10.666 8H9.333ZM7.999 9.333C7.263 9.333 6.666 8.736 6.666 8H5.333C5.333 9.473 6.527 10.667 7.999 10.667V9.333ZM6.666 8C6.666 7.264 7.263 6.667 7.999 6.667V5.333C6.527 5.333 5.333 6.527 5.333 8H6.666ZM7.999 6.667C8.736 6.667 9.333 7.264 9.333 8H10.666C10.666 6.527 9.472 5.333 7.999 5.333V6.667Z" />
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