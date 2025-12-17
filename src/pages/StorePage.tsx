import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import './StorePage.css';

interface Product {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  price: string;
  tags: string[];
  comingSoon?: boolean;
}

// ALF Full Preview Component - Backoffice + Front-end Website
const ALFBackofficePreview: React.FC<{ language: string }> = ({ language: _language }) => {
  const [activeTab, setActiveTab] = useState('collezioni');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [previewMode, setPreviewMode] = useState<'backoffice' | 'website'>('backoffice');

  const menuItems = [
    { id: 'collezioni', label: 'Collezioni', icon: 'layers' },
    { id: 'mostre', label: 'Mostre', icon: 'image' },
    { id: 'critica', label: 'Critica', icon: 'file' },
    { id: 'about', label: 'About', icon: 'user' },
    { id: 'traduzioni', label: 'Traduzioni', icon: 'translate' },
    { id: 'storage', label: 'Storage', icon: 'server' },
    { id: 'ordini', label: 'Ordini', icon: 'bag' },
    { id: 'marketing', label: 'Marketing', icon: 'chart' },
  ];

  // Dati REALI dal backoffice ALF (Adele Lo Feudo)
  const ALF_API = 'https://alf-portfolio-api.eziopappalardo98.workers.dev';
  const realCollections = [
    {
      id: 11,
      title: 'Miniature Gioiello',
      description: 'Ritratti in miniatura incastonati come gemme preziose. Donne iconiche racchiuse in cornici di perle, piume e cristalli.',
      slug: 'miniature',
      showOnHomepage: true,
      image: `${ALF_API}/images/1764437595180-q41k97-DSCF9395_2.webp`
    },
    {
      id: 13,
      title: 'Volti',
      description: 'Donne che hanno sfidato il silenzio. Ritratti di icone, ribelli e martiri che hanno segnato la storia.',
      slug: 'volti',
      showOnHomepage: true,
      image: `${ALF_API}/images/1764438135887-jje0oe-DSCF9521_2.webp`
    },
    {
      id: 15,
      title: 'Anima',
      description: 'Serie autobiografica che racconta il percorso interiore dell\'artista attraverso stati d\'animo.',
      slug: 'anima',
      showOnHomepage: true,
      image: `${ALF_API}/images/1765456460676-3dlu8o-DSCF0467.webp`
    },
    {
      id: 16,
      title: 'Foglie',
      description: '49 foglie su tela che custodiscono volti e memorie. Un viaggio attraverso ricordi trasformati in arte.',
      slug: 'foglie',
      showOnHomepage: true,
      image: `${ALF_API}/images/1764895478850-36z1bv-DSCF2854_2.webp`
    },
  ];

  const realMostre = [
    { id: 1, title: 'Night Gala Columbus', subtitle: 'Presentazione serie "Anima"', location: 'New York, USA', date: '2024', showOnHomepage: true },
    { id: 2, title: 'Mostra Personale Perugia', subtitle: 'Retrospettiva 2020-2024', location: 'Perugia, IT', date: '2023', showOnHomepage: true },
    { id: 3, title: 'Suffragette Exhibition', subtitle: 'Con Helen Pankhurst', location: 'Manchester, UK', date: '2022', showOnHomepage: true },
  ];

  const realCritici = [
    { id: 1, name: 'Helen Pankhurst', role: 'Pronipote di Emmeline Pankhurst', quote: 'In ogni creazione di Adele riconosco quella forza rivoluzionaria che ha animato le suffragette...', showOnHome: true },
    { id: 2, name: 'Vittorio Sgarbi', role: 'Critico d\'arte', quote: 'Una pittrice che unisce la tradizione della miniatura rinascimentale con sensibilità contemporanea.', showOnHome: true },
    { id: 3, name: 'Philippe Daverio', role: 'Storico dell\'arte', quote: 'L\'arte di ALF è un dialogo silenzioso con la memoria e l\'identità femminile.', showOnHome: false },
  ];

  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'layers':
        return <><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></>;
      case 'image':
        return <><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></>;
      case 'file':
        return <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>;
      case 'user':
        return <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>;
      case 'translate':
        return <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>;
      case 'server':
        return <><rect x="2" y="3" width="20" height="5" rx="2"/><rect x="2" y="10" width="20" height="5" rx="2"/><rect x="2" y="17" width="20" height="5" rx="2"/><circle cx="7" cy="5.5" r="0.5" fill="currentColor"/><circle cx="7" cy="12.5" r="0.5" fill="currentColor"/><circle cx="7" cy="19.5" r="0.5" fill="currentColor"/></>;
      case 'bag':
        return <><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></>;
      case 'chart':
        return <><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></>;
      default:
        return null;
    }
  };

  const getTabLabel = (tab: string) => {
    const labels: Record<string, string> = {
      collezioni: 'Collezioni',
      mostre: 'Mostre',
      critica: 'Critica',
      about: 'About',
      traduzioni: 'Traduzioni',
      storage: 'Storage',
      ordini: 'Ordini',
      marketing: 'Marketing'
    };
    return labels[tab] || tab;
  };

  const getSearchPlaceholder = () => {
    switch (activeTab) {
      case 'collezioni': return 'Cerca collezione...';
      case 'mostre': return 'Cerca mostra...';
      case 'critica': return 'Cerca critico...';
      default: return 'Cerca...';
    }
  };

  return (
    <div className="alf-browser-mockup">
      {/* Browser Chrome */}
      <div className="alf-browser-chrome">
        <div className="alf-browser-dots">
          <span className="alf-dot red"></span>
          <span className="alf-dot yellow"></span>
          <span className="alf-dot green"></span>
        </div>
        <div className="alf-browser-tabs">
          <button
            className={`alf-browser-tab ${previewMode === 'backoffice' ? 'active' : ''}`}
            onClick={() => setPreviewMode('backoffice')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <line x1="3" y1="9" x2="21" y2="9"/>
              <line x1="9" y1="21" x2="9" y2="9"/>
            </svg>
            Backoffice
          </button>
          <button
            className={`alf-browser-tab ${previewMode === 'website' ? 'active' : ''}`}
            onClick={() => setPreviewMode('website')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            Website
          </button>
        </div>
        <div className="alf-browser-url">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span>{previewMode === 'backoffice' ? 'adelelofeudo.com/backoffice' : 'adelelofeudo.com'}</span>
        </div>
      </div>

      {/* Backoffice Preview */}
      {previewMode === 'backoffice' && (
        <div className="alf-preview">
          {/* Sidebar - 90px come originale */}
          <div className="alf-sidebar">
            <div className="alf-logo">
          <svg viewBox="0 0 337 464" fill="#F02D6E">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 259.864L14.765 224.428L85.637 209.663L186.039 0L106.308 206.71L153.556 200.804L186.039 64.966L174.227 197.851L194.898 194.898L203.757 97.449L212.616 191.945L245.099 188.992L253.958 141.744L256.911 188.992L283.488 186.039V191.945L256.911 194.898L253.958 245.099L336.642 233.287L304.159 259.864L256.911 268.723L251.005 383.89L206.71 463.621L239.193 271.676L191.945 283.488L194.898 203.757L174.227 206.71L168.321 233.287L138.791 251.005L150.603 209.663L106.308 215.569L76.778 286.441L20.671 327.783L79.731 224.428L0 259.864ZM211.502 259.864V200.804L245.099 197.851V251.005L211.502 259.864Z" />
          </svg>
        </div>
        <nav className="alf-nav">
          {menuItems.map((item) => (
            <div key={item.id} className="alf-nav-wrapper">
              <button
                className={`alf-nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <svg className="alf-nav-icon" viewBox="0 0 24 24" fill={item.icon === 'translate' ? 'currentColor' : 'none'} stroke={item.icon === 'translate' ? 'none' : 'currentColor'} strokeWidth="2">
                  {renderIcon(item.icon)}
                </svg>
              </button>
              {hoveredItem === item.id && (
                <span className="alf-nav-tooltip">{item.label}</span>
              )}
            </div>
          ))}
        </nav>
        <div className="alf-sidebar-footer">
          <button className="alf-footer-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </button>
          <button className="alf-footer-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="alf-content">
        {/* Header - Come originale */}
        <div className="alf-content-header">
          <h1 className="alf-title">
            Gestione <span className="alf-title-accent">{getTabLabel(activeTab)}</span>
          </h1>
          {(activeTab === 'collezioni' || activeTab === 'mostre' || activeTab === 'critica') && (
            <div className="alf-header-actions">
              <div className="alf-search">
                <input
                  type="text"
                  placeholder={getSearchPlaceholder()}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
              </div>
              <button className="alf-preview-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                  <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </button>
              <button className="alf-add-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 4v16m8-8H4"/>
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Content List - Collezioni */}
        {activeTab === 'collezioni' && (
          <div className="alf-list">
            {realCollections.map((collection, index) => (
              <div
                key={collection.id}
                className="alf-list-item"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="alf-list-image">
                  <img src={collection.image} alt={collection.title} />
                </div>
                <div className="alf-list-info">
                  <div className="alf-list-title-row">
                    <h3>{collection.title}</h3>
                    {collection.showOnHomepage && (
                      <span className="alf-badge-hp">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                        </svg>
                        HP
                      </span>
                    )}
                  </div>
                  <p className="alf-list-desc">{collection.description}</p>
                  <p className="alf-list-meta">Link: <span>/collezione/{collection.slug}</span></p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Content List - Mostre */}
        {activeTab === 'mostre' && (
          <div className="alf-list">
            {realMostre.map((mostra, index) => (
              <div
                key={mostra.id}
                className="alf-list-item"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="alf-list-info full">
                  <div className="alf-list-title-row">
                    <h3>{mostra.title}</h3>
                    {mostra.showOnHomepage && (
                      <span className="alf-badge-hp">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                        </svg>
                        HP
                      </span>
                    )}
                  </div>
                  {mostra.subtitle && <p className="alf-list-desc">{mostra.subtitle}</p>}
                  <p className="alf-list-meta">📍 {mostra.location} • 📅 {mostra.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Content List - Critica */}
        {activeTab === 'critica' && (
          <div className="alf-list">
            {realCritici.map((critico, index) => (
              <div
                key={critico.id}
                className="alf-list-item"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="alf-list-info full">
                  <div className="alf-list-title-row">
                    <h3>{critico.name}</h3>
                    {critico.showOnHome && (
                      <span className="alf-badge-hp">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                        </svg>
                        HP
                      </span>
                    )}
                  </div>
                  <p className="alf-list-desc">{critico.role}</p>
                  <p className="alf-list-quote">"{critico.quote}"</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="alf-about-list">
            <div className="alf-about-item">
              <div className="alf-about-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <div className="alf-about-info">
                <h3>Bio</h3>
                <p>Modifica la biografia dell'artista</p>
              </div>
              <svg className="alf-about-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="alf-about-item">
              <div className="alf-about-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <div className="alf-about-info">
                <h3>Studio</h3>
                <p>Modifica la descrizione dello studio</p>
              </div>
              <svg className="alf-about-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="alf-about-item">
              <div className="alf-about-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
              <div className="alf-about-info">
                <h3>Parallax</h3>
                <p>Imposta l'immagine della sezione parallax</p>
              </div>
              <svg className="alf-about-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        )}

          {/* Pagination - only for list tabs */}
          {(activeTab === 'collezioni' || activeTab === 'mostre' || activeTab === 'critica') && (
            <div className="alf-pagination">
              <button className="alf-page-btn disabled">←</button>
              <button className="alf-page-btn active">1</button>
              <button className="alf-page-btn">2</button>
              <button className="alf-page-btn">→</button>
            </div>
          )}
        </div>
      </div>
      )}

      {/* Website Preview - iframe del sito vero */}
      {previewMode === 'website' && (
        <div style={{ height: '600px', overflow: 'hidden', background: '#131313', position: 'relative' }}>
          <iframe
            src="https://adelelofeudo.com"
            title="Adele Lo Feudo Website"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              background: '#131313'
            }}
          />
        </div>
      )}
    </div>
  );
};

const StorePage: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const [activeProcess, setActiveProcess] = useState(1); // 0, 1, or 2 - middle card (02) active by default
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('[data-reveal]').forEach((el) => {
      if (el.id) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const isVisible = (id: string) => visibleElements.has(id);

  const products: Product[] = [
    {
      id: 'cms-ecommerce',
      icon: '🛒',
      title: language === 'it' ? 'CMS + E-commerce' : 'CMS + E-commerce',
      subtitle: language === 'it' ? 'Sito web con backoffice e carrello' : 'Website with backoffice and cart',
      price: language === 'it' ? 'Da €2.500' : 'From €2,500',
      tags: ['React', 'Stripe', 'CMS'],
      comingSoon: false
    },
    {
      id: 'ai-assistant',
      icon: '🤖',
      title: language === 'it' ? 'Assistente AI Custom' : 'Custom AI Assistant',
      subtitle: language === 'it' ? 'Chatbot AI addestrato sui tuoi dati' : 'AI chatbot trained on your data',
      price: language === 'it' ? 'Da €1.500' : 'From €1,500',
      tags: ['AI', 'GPT-4', 'Custom'],
      comingSoon: false
    },
    {
      id: 'cocktail-ai',
      icon: '🍸',
      title: 'Cocktail AI',
      subtitle: language === 'it' ? 'Gestione bar con AI integrata' : 'Bar management with integrated AI',
      price: language === 'it' ? 'Su richiesta' : 'On request',
      tags: ['AI', 'POS', 'Inventory'],
      comingSoon: false
    },
    {
      id: 'portfolio-cms',
      icon: '🎨',
      title: language === 'it' ? 'Portfolio Artista' : 'Artist Portfolio',
      subtitle: language === 'it' ? 'CMS multilingua per artisti' : 'Multilingual CMS for artists',
      price: language === 'it' ? 'Da €1.800' : 'From €1,800',
      tags: ['CMS', 'Multilingua', 'Gallery'],
      comingSoon: false
    }
  ];

  const handleContact = (productTitle: string) => {
    const subject = encodeURIComponent(language === 'it' ? `Interesse per: ${productTitle}` : `Interest in: ${productTitle}`);
    const body = encodeURIComponent(
      language === 'it'
        ? `Ciao Ezio,\n\nSono interessato al prodotto "${productTitle}".\n\nVorrei avere maggiori informazioni.\n\nGrazie!`
        : `Hi Ezio,\n\nI'm interested in the product "${productTitle}".\n\nI would like more information.\n\nThanks!`
    );
    window.location.href = `mailto:eziopappalardo98@gmail.com?subject=${subject}&body=${body}`;
  };

  const navItems = [
    { href: '#products', label: language === 'it' ? 'Prodotti' : 'Products' },
    { href: '/', label: 'Portfolio', isLink: true },
    { href: 'mailto:eziopappalardo98@gmail.com', label: language === 'it' ? 'Contatto' : 'Contact' },
  ];

  return (
    <div className="store-page">
      {/* Header - Portfolio Style */}
      <header className="header">
        <div className="header-container">
          {/* Logo */}
          <Link to="/" className="logo-button">
            <img
              src="/profile.webp"
              alt="Ezio Pappalardo"
              className="logo-image"
            />
          </Link>

          {/* Floating Navigation */}
          <div className="floating-nav">
            {/* Nav Pills - appear when menu is open */}
            <div className={`nav-pills-container ${isMenuOpen ? 'open' : ''}`}>
              {navItems.map((item, index) => (
                item.isLink ? (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="nav-pill"
                    style={{ transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms' }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    className="nav-pill"
                    style={{ transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms' }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )
              ))}
            </div>

            {/* Menu Button */}
            <button
              className={`menu-button ${isMenuOpen ? 'open' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="menu-button-text">
                {isMenuOpen ? '' : 'Menu'}
              </span>
              <span className={`menu-button-icon ${isMenuOpen ? 'open' : ''}`}>
                <span className="icon-line"></span>
                <span className="icon-line"></span>
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Floating Action Buttons - Bottom Right */}
      <div className="floating-actions">
        <button
          className="floating-action-btn"
          onClick={() => setLanguage(language === 'it' ? 'en' : 'it')}
          aria-label="Toggle language"
        >
          {language === 'it' ? 'EN' : 'IT'}
        </button>
        <button
          className="floating-action-btn"
          onClick={() => {
            setIsDarkMode(!isDarkMode);
            document.documentElement.classList.toggle('dark-mode');
          }}
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Hero Section - Grovia Style */}
      <header className="store-hero">
        <div className="store-hero-content">
          {/* Left Side - Text */}
          <div className="store-hero-text">
            <div
              id="hero-heading"
              data-reveal
              className={`store-hero-heading ${isVisible('hero-heading') ? 'visible' : ''}`}
            >
              <h1>
                {language === 'it'
                  ? <>Soluzioni AI e CMS<br />per il tuo business</>
                  : <>AI Solutions and CMS<br />for your business</>
                }
              </h1>
            </div>

            <div
              id="hero-desc"
              data-reveal
              className={`store-hero-description ${isVisible('hero-desc') ? 'visible' : ''}`}
            >
              <p>
                {language === 'it'
                  ? 'Sviluppo siti web con CMS personalizzato, e-commerce con Stripe e assistenti AI. Tutto su misura per le tue esigenze.'
                  : 'I develop websites with custom CMS, e-commerce with Stripe and AI assistants. All tailored to your needs.'}
              </p>
            </div>

            <div
              id="hero-buttons"
              data-reveal
              className={`store-hero-buttons ${isVisible('hero-buttons') ? 'visible' : ''}`}
            >
              <a href="#products" className="store-btn-primary">
                <span>{language === 'it' ? 'Vedi servizi' : 'View services'}</span>
                <span className="store-btn-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
              <a href="mailto:eziopappalardo98@gmail.com" className="store-btn-outline">
                <span>{language === 'it' ? 'Richiedi preventivo' : 'Request quote'}</span>
              </a>
            </div>
          </div>

          {/* Right Side - Floating Widgets */}
          <div
            id="hero-widgets"
            data-reveal
            className={`store-hero-widgets ${isVisible('hero-widgets') ? 'visible' : ''}`}
          >
            {/* Services Widget */}
            <div className="store-widget store-widget-products">
              <div className="store-widget-header">
                <span className="store-widget-title">
                  {language === 'it' ? 'Servizi' : 'Services'}
                </span>
                <span className="store-widget-sort">
                  {language === 'it' ? 'Più richiesti' : 'Most requested'}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </div>
              <div className="store-widget-list">
                {products.slice(0, 3).map((product) => (
                  <div key={product.id} className="store-widget-item">
                    <div className="store-widget-item-icon">{product.icon}</div>
                    <div className="store-widget-item-info">
                      <span className="store-widget-item-name">{product.title}</span>
                      <span className="store-widget-item-sub">{product.subtitle}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="store-widget-footer">
                <span>{language === 'it' ? 'Tutti i servizi' : 'All services'}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </div>

            {/* Stats Widget */}
            <div className="store-widget store-widget-stats">
              <div className="store-widget-stats-header">
                <div className="store-widget-stats-info">
                  <span className="store-widget-stats-label">
                    {language === 'it' ? 'Progetti completati' : 'Completed projects'}
                  </span>
                  <span className="store-widget-stats-value">25+</span>
                </div>
                <div className="store-widget-stats-badge">
                  <span className="store-widget-stats-change">+8</span>
                  <span className="store-widget-stats-period">
                    {language === 'it' ? 'quest\'anno' : 'this year'}
                  </span>
                </div>
              </div>
              <div className="store-widget-bars">
                {['AI', 'CMS', 'Web', 'API', 'App', 'DB', 'UI'].map((label, i) => (
                  <div key={i} className="store-widget-bar-col">
                    <div className="store-widget-bar-stack">
                      <div className="store-widget-bar bar-1" style={{ height: `${25 + Math.random() * 35}%` }}></div>
                      <div className="store-widget-bar bar-2" style={{ height: `${20 + Math.random() * 25}%` }}></div>
                      <div className="store-widget-bar bar-3" style={{ height: `${15 + Math.random() * 20}%` }}></div>
                    </div>
                    <span className="store-widget-bar-label">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Logo Ticker */}
      <div className="store-ticker">
        <div className="store-ticker-track">
          {[...Array(3)].map((_, setIndex) => (
            <div key={setIndex} className="store-ticker-set">
              <span className="store-ticker-item">Cocktail AI</span>
              <span className="store-ticker-item">Adele Lo Feudo</span>
              <span className="store-ticker-item">Albicchiere</span>
              <span className="store-ticker-item">AI DB Search</span>
            </div>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <section id="products" className="store-products">
        <div
          id="products-header"
          data-reveal
          className={`store-products-header ${isVisible('products-header') ? 'visible' : ''}`}
        >
          <h2>{language === 'it' ? 'Cosa posso realizzare' : 'What I can build'}</h2>
          <p>
            {language === 'it'
              ? 'Soluzioni complete: dal CMS con backoffice all\'integrazione AI, fino all\'e-commerce con Stripe.'
              : 'Complete solutions: from CMS with backoffice to AI integration, to e-commerce with Stripe.'}
          </p>
        </div>

        <div className="store-products-grid">
          {products.map((product, index) => (
            <div
              key={product.id}
              id={`product-${index}`}
              data-reveal
              className={`store-product-card ${isVisible(`product-${index}`) ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="store-product-top">
                <div className="store-product-icon">{product.icon}</div>
                {product.comingSoon && (
                  <span className="store-product-badge">Coming Soon</span>
                )}
              </div>

              <h3 className="store-product-title">{product.title}</h3>
              <p className="store-product-subtitle">{product.subtitle}</p>

              <div className="store-product-tags">
                {product.tags.map((tag, i) => (
                  <span key={i} className="store-product-tag">{tag}</span>
                ))}
              </div>

              <div className="store-product-footer">
                <span className="store-product-price">{product.price}</span>
                <button
                  className="store-product-btn"
                  onClick={() => handleContact(product.title)}
                >
                  <span>{language === 'it' ? 'Richiedi' : 'Request'}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CMS Showcase Section */}
      <section className="store-cms-showcase">
        <div
          id="cms-showcase-header"
          data-reveal
          className={`store-section-header ${isVisible('cms-showcase-header') ? 'visible' : ''}`}
        >
          <span className="store-section-label">Case Study</span>
          <h2>{language === 'it' ? 'CMS per Artisti' : 'CMS for Artists'}</h2>
          <p>
            {language === 'it'
              ? 'Backoffice completo realizzato per Adele Lo Feudo (ALF). Gestione collezioni, mostre, critiche, traduzioni multilingua e e-commerce con Stripe.'
              : 'Complete backoffice built for Adele Lo Feudo (ALF). Management of collections, exhibitions, reviews, multilingual translations and e-commerce with Stripe.'}
          </p>
        </div>

        {/* ALF Backoffice Preview */}
        <div
          id="alf-preview-wrapper"
          data-reveal
          className={`alf-preview-wrapper ${isVisible('alf-preview-wrapper') ? 'visible' : ''}`}
        >
          <ALFBackofficePreview language={language} />
        </div>

        <div className="store-cms-features">
          <div className="store-cms-feature">
            <span className="store-cms-feature-icon">🎨</span>
            <h4>{language === 'it' ? '7 Collezioni' : '7 Collections'}</h4>
            <p>{language === 'it' ? 'Gestione opere con page builder' : 'Artwork management with page builder'}</p>
          </div>
          <div className="store-cms-feature">
            <span className="store-cms-feature-icon">🌍</span>
            <h4>{language === 'it' ? '10 Lingue' : '10 Languages'}</h4>
            <p>{language === 'it' ? 'Traduzioni automatiche con AI' : 'Automatic translations with AI'}</p>
          </div>
          <div className="store-cms-feature">
            <span className="store-cms-feature-icon">💳</span>
            <h4>Stripe</h4>
            <p>{language === 'it' ? 'Vendita opere con checkout' : 'Artwork sales with checkout'}</p>
          </div>
          <div className="store-cms-feature">
            <span className="store-cms-feature-icon">📊</span>
            <h4>Analytics</h4>
            <p>{language === 'it' ? 'GA4 + Meta Pixel + Clarity' : 'GA4 + Meta Pixel + Clarity'}</p>
          </div>
        </div>
      </section>

      {/* Process Section - Grovia Style */}
      <section className="store-process">
        {/* Process Cards Container */}
        <div
          id="process-container"
          data-reveal
          className={`store-process-container ${isVisible('process-container') ? 'visible' : ''}`}
        >
          <div className="store-process-cards">
            {/* Card 01 - CMS */}
            <div
              className={`store-process-card ${activeProcess === 0 ? 'active' : ''}`}
              onClick={() => setActiveProcess(0)}
            >
              <span className="store-process-number">01</span>

              {activeProcess === 0 && (
                <div className="store-process-card-preview">
                  <div className="store-process-preview-image">
                    <img
                      src="https://framerusercontent.com/images/42I2Ca6MGWWXgCMIC2PlpemkZ0.png"
                      alt="CMS preview"
                    />
                  </div>
                </div>
              )}

              <div className="store-process-card-bottom">
                <h3>{language === 'it' ? 'CMS Personalizzato' : 'Custom CMS'}</h3>
                <p>
                  {language === 'it'
                    ? 'Backoffice intuitivo per gestire contenuti, media e traduzioni multilingua.'
                    : 'Intuitive backoffice to manage content, media and multilingual translations.'}
                </p>
              </div>
            </div>

            {/* Card 02 - E-commerce */}
            <div
              className={`store-process-card ${activeProcess === 1 ? 'active' : ''}`}
              onClick={() => setActiveProcess(1)}
            >
              <span className="store-process-number">02</span>

              {activeProcess === 1 && (
                <div className="store-process-card-preview">
                  <div className="store-process-preview-image">
                    <img
                      src="https://framerusercontent.com/images/lpUXQzvzgT4sfG94CeE4ukM15U.png"
                      alt="E-commerce preview"
                    />
                  </div>
                </div>
              )}

              <div className="store-process-card-bottom">
                <h3>{language === 'it' ? 'E-commerce Stripe' : 'Stripe E-commerce'}</h3>
                <p>
                  {language === 'it'
                    ? 'Carrello, checkout sicuro e gestione ordini. Integrazione Stripe completa.'
                    : 'Cart, secure checkout and order management. Complete Stripe integration.'}
                </p>
              </div>
            </div>

            {/* Card 03 - AI */}
            <div
              className={`store-process-card ${activeProcess === 2 ? 'active' : ''}`}
              onClick={() => setActiveProcess(2)}
            >
              <span className="store-process-number">03</span>

              {activeProcess === 2 && (
                <div className="store-process-card-preview">
                  <div className="store-process-preview-image">
                    <img
                      src="https://framerusercontent.com/images/gU3HkY1CdAlVmjaQoAPwETeEos.png"
                      alt="AI preview"
                    />
                  </div>
                </div>
              )}

              <div className="store-process-card-bottom">
                <h3>{language === 'it' ? 'Integrazione AI' : 'AI Integration'}</h3>
                <p>
                  {language === 'it'
                    ? 'Assistenti AI custom, chatbot addestrati sui tuoi dati e automazioni intelligenti.'
                    : 'Custom AI assistants, chatbots trained on your data and smart automations.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="store-cta">
        <div
          id="cta-box"
          data-reveal
          className={`store-cta-box ${isVisible('cta-box') ? 'visible' : ''}`}
        >
          <h2>
            {language === 'it'
              ? 'Hai un\'idea da realizzare?'
              : 'Have an idea to build?'}
          </h2>
          <p>
            {language === 'it'
              ? 'Che sia un CMS con backoffice, un e-commerce o un assistente AI, posso aiutarti a trasformare la tua idea in realtà.'
              : 'Whether it\'s a CMS with backoffice, an e-commerce or an AI assistant, I can help you turn your idea into reality.'}
          </p>
          <a href="mailto:eziopappalardo98@gmail.com" className="store-cta-btn">
            <span>{language === 'it' ? 'Richiedi preventivo' : 'Request quote'}</span>
            <span className="store-btn-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="store-footer">
        <div className="store-footer-inner">
          <p>© {new Date().getFullYear()} Ezio Pappalardo</p>
          <div className="store-footer-links">
            <Link to="/">Portfolio</Link>
            <a href="https://www.linkedin.com/in/ezio-pappalardo/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:eziopappalardo98@gmail.com">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StorePage;
