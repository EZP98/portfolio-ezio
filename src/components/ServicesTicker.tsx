import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './ServicesTicker.css';

const ServicesTicker: React.FC = () => {
  const trackRef = useRef<HTMLUListElement>(null);
  const [offset, setOffset] = useState(0);
  const animationRef = useRef<number | undefined>(undefined);
  const speed = 0.8; // pixels per frame

  const { language } = useLanguage();

  const services = language === 'it' ? [
    'Marketing Strategy',
    'UI/UX Design',
    'AI Development',
    'Videomaking',
    'Brand Identity',
    'Product Design',
    'Web Development',
    'Content Creation'
  ] : [
    'Marketing Strategy',
    'UI/UX Design',
    'AI Development',
    'Videomaking',
    'Brand Identity',
    'Product Design',
    'Web Development',
    'Content Creation'
  ];

  useEffect(() => {
    const animate = () => {
      setOffset(prev => {
        const itemWidth = 220; // approximate width per service item
        const totalWidth = itemWidth * services.length;
        const newOffset = prev + speed;

        if (newOffset >= totalWidth) {
          return 0;
        }
        return newOffset;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [services.length]);

  // Duplicate items for seamless loop
  const displayItems = [...services, ...services, ...services, ...services];

  return (
    <section className="services-ticker-section">
      <div className="services-ticker-container">
        <ul
          ref={trackRef}
          className="services-ticker-track"
          style={{ transform: `translateX(-${offset}px)` }}
        >
          {displayItems.map((service, index) => (
            <li
              key={`${service}-${index}`}
              className="services-ticker-item"
              aria-hidden={index >= services.length}
            >
              <div className="services-ticker-service">
                <h2 className="services-ticker-text">{service}</h2>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ServicesTicker;
