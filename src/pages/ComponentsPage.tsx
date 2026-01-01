import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Header from '../components/Header';
import ServicesTicker from '../components/ServicesTicker';
import WorksTicker from '../components/WorksTicker';
import ScrollReveal from '../components/ScrollReveal';
import RollingText from '../components/RollingText';
import GradualBlur from '../components/GradualBlur';
import Books3D from '../components/Books3D';
import LightText from '../components/LightText';
import Carousel3D from '../components/Carousel3D';
import Globe3D from '../components/Globe3D';
import Badge3D from '../components/Badge3D';
import Gallery3D from '../components/Gallery3D';
import RotatingCircles from '../components/RotatingCircles';
import ImageMarquee from '../components/ImageMarquee';
import LumaButton from '../components/LumaButton';
import ElectricCard from '../components/ElectricCard';
import LogoParticles from '../components/LogoParticles';
import VaporizeText from '../components/VaporizeText';
import './ComponentsPage.css';

interface ComponentInfo {
  name: string;
  description: string;
  descriptionIT: string;
  tags: string[];
}

const components: ComponentInfo[] = [
  {
    name: 'ServicesTicker',
    description: 'Infinite horizontal scrolling ticker with service badges. Smooth CSS animation with hover pause.',
    descriptionIT: 'Ticker orizzontale infinito con badge servizi. Animazione CSS fluida con pausa su hover.',
    tags: ['Animation', 'CSS', 'Infinite Scroll'],
  },
  {
    name: 'WorksTicker',
    description: 'Project preview carousel with auto-scroll. Shows project screenshots in a continuous loop.',
    descriptionIT: 'Carousel preview progetti con auto-scroll. Mostra screenshot progetti in loop continuo.',
    tags: ['Carousel', 'Animation', 'Gallery'],
  },
  {
    name: 'ScrollReveal',
    description: 'Intersection Observer based reveal animation. Fades in children when scrolled into view.',
    descriptionIT: 'Animazione reveal basata su Intersection Observer. Fade-in elementi quando visibili.',
    tags: ['Animation', 'Scroll', 'React Hook'],
  },
  {
    name: 'RollingText',
    description: 'Vertical text rotation effect. Cycles through words with smooth transition.',
    descriptionIT: 'Effetto rotazione testo verticale. Cicla tra parole con transizione fluida.',
    tags: ['Animation', 'Text', 'CSS'],
  },
  {
    name: 'GradualBlur',
    description: 'Layered backdrop blur with gradient mask. Creates smooth edge fade effect.',
    descriptionIT: 'Blur backdrop a livelli con maschera gradiente. Crea effetto sfumatura bordi.',
    tags: ['Blur', 'Gradient', 'CSS'],
  },
  {
    name: 'Books3D',
    description: 'Interactive 3D book flip effect. Click to reveal inner pages with smooth animation.',
    descriptionIT: 'Effetto libro 3D interattivo. Click per rivelare pagine interne con animazione fluida.',
    tags: ['3D', 'Interactive', 'CSS'],
  },
  {
    name: 'LightText',
    description: 'Mouse-following spotlight effect on text. Creates illuminated text reveal on hover.',
    descriptionIT: 'Effetto spotlight che segue il mouse sul testo. Crea rivelazione testo illuminato.',
    tags: ['Text Effect', 'Mouse Tracking', 'CSS'],
  },
  {
    name: 'Carousel3D',
    description: 'Full torus 3D carousel with drag rotation. 22 items arranged in a ring.',
    descriptionIT: 'Carousel 3D torus completo con rotazione drag. 22 elementi disposti ad anello.',
    tags: ['3D', 'Carousel', 'Interactive'],
  },
  {
    name: 'Globe3D',
    description: 'Interactive 3D globe with city pins. Built with Three.js and real GeoJSON data.',
    descriptionIT: 'Globo 3D interattivo con pin città. Costruito con Three.js e dati GeoJSON reali.',
    tags: ['3D', 'Three.js', 'Interactive'],
  },
  {
    name: 'Badge3D',
    description: 'Physics-based draggable badge on rope. Built with Rapier physics engine.',
    descriptionIT: 'Badge trascinabile con fisica su corda. Costruito con motore fisico Rapier.',
    tags: ['3D', 'Physics', 'Interactive'],
  },
  {
    name: 'Gallery3D',
    description: 'Perspective gallery with auto-scrolling columns. Creates infinite scroll effect.',
    descriptionIT: 'Galleria prospettica con colonne auto-scroll. Crea effetto scroll infinito.',
    tags: ['3D', 'Gallery', 'Animation'],
  },
  {
    name: 'RotatingCircles',
    description: 'Animated rotating circles with dots. Geometric decorative element.',
    descriptionIT: 'Cerchi rotanti animati con punti. Elemento decorativo geometrico.',
    tags: ['Animation', 'Geometric', 'CSS'],
  },
  {
    name: 'ImageMarquee',
    description: 'Infinite horizontal image carousel with smooth animation. Pause on hover.',
    descriptionIT: 'Carousel immagini orizzontale infinito con animazione fluida. Pausa su hover.',
    tags: ['Carousel', 'Animation', 'Infinite Scroll'],
  },
  {
    name: 'LumaButton',
    description: 'Animated button with rotating light border and floating particles. Supports light/dark mode.',
    descriptionIT: 'Bottone animato con bordo luminoso rotante e particelle fluttuanti. Supporta light/dark mode.',
    tags: ['Button', 'Animation', 'Interactive'],
  },
  {
    name: 'ElectricCard',
    description: 'Card with animated electric border using SVG turbulence filters. Customizable color.',
    descriptionIT: 'Card con bordo elettrico animato usando filtri SVG turbulence. Colore personalizzabile.',
    tags: ['Card', 'SVG Filter', 'Animation'],
  },
  {
    name: 'LogoParticles',
    description: 'Interactive particle effect forming a letter. Particles react to mouse with spring physics.',
    descriptionIT: 'Effetto particelle interattivo che forma una lettera. Le particelle reagiscono al mouse con fisica a molla.',
    tags: ['Canvas', 'Particles', 'Interactive'],
  },
  {
    name: 'VaporizeText',
    description: 'Text vaporization effect with particle disintegration. Cycles through words with smooth wave animation.',
    descriptionIT: 'Effetto vaporizzazione testo con disintegrazione in particelle. Cicla tra parole con animazione a onda.',
    tags: ['Canvas', 'Particles', 'Text Effect'],
  },
];

const ComponentsPage: React.FC = () => {
  const { language } = useLanguage();
  const [activeComponent, setActiveComponent] = useState<string>('ServicesTicker');

  const currentComponent = components.find(c => c.name === activeComponent) || components[0];

  // Components that need dark background
  const darkComponents = ['Globe3D', 'Badge3D', 'Carousel3D', 'LightText', 'RotatingCircles', 'LumaButton', 'ElectricCard', 'LogoParticles', 'VaporizeText'];
  const needsDarkBg = darkComponents.includes(activeComponent);

  const renderPreview = () => {
    switch (activeComponent) {
      case 'ServicesTicker':
        return (
          <div className="preview-wrapper preview-full-width">
            <ServicesTicker />
          </div>
        );
      case 'WorksTicker':
        return (
          <div className="preview-wrapper preview-full">
            <WorksTicker />
          </div>
        );
      case 'ScrollReveal':
        return (
          <ScrollReveal>
            <div className="reveal-demo-box">
              {language === 'it' ? 'Scorri per vedere' : 'Scroll to reveal'}
            </div>
          </ScrollReveal>
        );
      case 'RollingText':
        return (
          <div className="preview-rolling">
            <span>{language === 'it' ? 'Creo ' : 'I create '}</span>
            <RollingText>products</RollingText>
          </div>
        );
      case 'GradualBlur':
        return (
          <div className="preview-wrapper preview-full">
            <div className="preview-gradual-blur">
              <div className="blur-demo-content">
                <p>Line 1 - Visible</p>
                <p>Line 2 - Visible</p>
                <p>Line 3 - Starting to blur</p>
                <p>Line 4 - More blur</p>
                <p>Line 5 - Fading out</p>
              </div>
              <GradualBlur direction="bottom" blurLayers={6} maxBlur={12} />
            </div>
          </div>
        );
      case 'Books3D':
        return (
          <div className="preview-wrapper preview-centered">
            <Books3D />
          </div>
        );
      case 'LightText':
        return (
          <div className="preview-wrapper preview-centered">
            <LightText
              lines={[
                'Move your mouse',
                'over this text to',
                'see the spotlight',
                'effect revealing',
                'the hidden content'
              ]}
              lightRadius={200}
            />
          </div>
        );
      case 'Carousel3D':
        return (
          <div className="preview-wrapper preview-full">
            <Carousel3D autoRotateSpeed={0.15} />
          </div>
        );
      case 'Globe3D':
        return (
          <div className="preview-wrapper preview-full">
            <Globe3D />
          </div>
        );
      case 'Badge3D':
        return (
          <div className="preview-wrapper preview-centered">
            <Badge3D title="Ezio\nPappalardo" subtitle="DEVELOPER" label="2025" />
          </div>
        );
      case 'Gallery3D':
        return (
          <div className="preview-wrapper preview-full">
            <Gallery3D />
          </div>
        );
      case 'RotatingCircles':
        return (
          <div className="preview-wrapper preview-full">
            <RotatingCircles speed={0.8} />
          </div>
        );
      case 'ImageMarquee':
        return (
          <div className="preview-wrapper preview-full-width">
            <ImageMarquee speed={0.5} />
          </div>
        );
      case 'LumaButton':
        return (
          <div className="preview-wrapper preview-centered">
            <LumaButton text="Click me" dark />
          </div>
        );
      case 'ElectricCard':
        return (
          <div className="preview-wrapper preview-centered">
            <ElectricCard width={280} height={380} />
          </div>
        );
      case 'LogoParticles':
        return (
          <div className="preview-wrapper preview-centered">
            <LogoParticles size={350} />
          </div>
        );
      case 'VaporizeText':
        return (
          <div className="preview-wrapper preview-centered">
            <VaporizeText
              texts={['Creative', 'Design', 'Motion', 'Effects']}
              width={600}
              height={250}
              fontSize={80}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="components-page">
      <Header />

      <main className="components-main">
        <section className="components-hero">
          <span className="components-badge">UI Components</span>
          <h1 className="components-title">
            {language === 'it' ? 'Libreria Componenti' : 'Component Library'}
          </h1>
          <p className="components-subtitle">
            {language === 'it'
              ? 'Componenti React riutilizzabili costruiti per performance e accessibilità'
              : 'Reusable React components built for performance and accessibility'}
          </p>
          <div className="components-hero-tags">
            <span className="hero-tag">React</span>
            <span className="hero-tag">TypeScript</span>
            <span className="hero-tag">CSS</span>
            <span className="hero-tag">Three.js</span>
          </div>
        </section>

        <section className="components-viewer">
          <div className="components-sidebar">
            <div className="sidebar-list">
              {components.map((component) => (
                <button
                  key={component.name}
                  className={`sidebar-item ${activeComponent === component.name ? 'active' : ''}`}
                  onClick={() => setActiveComponent(component.name)}
                >
                  {component.name}
                </button>
              ))}
            </div>
          </div>

          <div className="components-canvas">
            <div className="canvas-info">
              <h2 className="canvas-title">{currentComponent.name}</h2>
              <p className="canvas-description">
                {language === 'it' ? currentComponent.descriptionIT : currentComponent.description}
              </p>
              <div className="canvas-tags">
                {currentComponent.tags.map(tag => (
                  <span key={tag} className="canvas-tag">{tag}</span>
                ))}
              </div>
            </div>
            <div className={`canvas-preview ${needsDarkBg ? 'canvas-preview-dark' : ''}`}>
              {renderPreview()}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ComponentsPage;
