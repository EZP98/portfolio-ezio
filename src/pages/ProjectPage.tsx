import { useParams, useNavigate } from 'react-router-dom';
import { getProjectBySlug } from '../data/projects';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './ProjectPage.css';

const ProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = slug ? getProjectBySlug(slug) : undefined;

  const handleBack = () => {
    navigate('/#works');
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'live':
        return 'Live';
      case 'development':
        return 'In sviluppo';
      case 'idea':
        return 'Idea';
      default:
        return status;
    }
  };

  if (!project) {
    return (
      <div className="project-page">
        <Header />
        <main className="project-main">
          <button className="project-back" onClick={handleBack}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <div className="project-not-found">
            <h1>404</h1>
            <p>Project not found</p>
            <button className="project-back" onClick={handleBack}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Home
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="project-page">
      <Header />
      <main className="project-main">
        {/* Back Button */}
        <button className="project-back" onClick={handleBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        {/* Two Column Layout */}
        <div className="project-layout">
          {/* Left - Text Content */}
          <div className="project-content">
            <div className="project-category">
              <div className="project-category-dots">
                <span className="project-category-dot" />
                <span className="project-category-dot" />
              </div>
              {project.category}
            </div>
            <h1 className="project-title">{project.title}</h1>
            <p className="project-description">{project.description}</p>

            <div className="project-actions">
              <span className={`project-status ${project.status}`}>
                <span className="project-status-dot" />
                {getStatusLabel(project.status)}
              </span>
              <a
                href={project.link}
                className="project-visit"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Site
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>

            {/* Tech Stack */}
            <div className="project-section">
              <h2 className="project-section-title">Tech Stack</h2>
              <div className="project-tech-list">
                {project.techStack.map((tech, index) => (
                  <span key={index} className="project-tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="project-section">
              <h2 className="project-section-title">About</h2>
              <p className="project-about">{project.longDescription}</p>
            </div>
          </div>

          {/* Right - Image */}
          <div className="project-visual">
            <div className="project-hero">
              <img src={project.image} alt={project.title} loading="lazy" />
            </div>
          </div>
        </div>

        {/* Gallery - Full Width Below */}
        {project.gallery.length > 0 && (
          <section className="project-section project-gallery-section">
            <h2 className="project-section-title">Gallery</h2>
            <div className="project-gallery">
              {project.gallery.map((image, index) => (
                <div key={index} className="project-gallery-item">
                  <img src={image} alt={`${project.title} screenshot ${index + 1}`} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Placeholder gallery when empty */}
        {project.gallery.length === 0 && (
          <section className="project-section project-gallery-section">
            <h2 className="project-section-title">Gallery</h2>
            <div className="project-gallery">
              <div className="project-gallery-item">
                <span className="project-gallery-placeholder">Coming soon</span>
              </div>
              <div className="project-gallery-item">
                <span className="project-gallery-placeholder">Coming soon</span>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProjectPage;
