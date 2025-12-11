import React, { useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ScrollReveal from './ScrollReveal';
import './Testimonials.css';

interface Testimonial {
  id: string;
  text: string;
  authorName: string;
  authorRole: string;
  authorImage: string;
}

const Testimonials: React.FC = () => {
  const { t } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);

  const testimonials: Testimonial[] = [
    {
      id: '1',
      text: t('testimonial1Text'),
      authorName: 'Marco Rossi',
      authorRole: 'CEO, TechStartup',
      authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '2',
      text: t('testimonial2Text'),
      authorName: 'Laura Bianchi',
      authorRole: 'Marketing Director, InnovateCo',
      authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '3',
      text: t('testimonial3Text'),
      authorName: 'Alessandro Verdi',
      authorRole: 'Founder, CreativeHub',
      authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '4',
      text: t('testimonial4Text'),
      authorName: 'Giulia Neri',
      authorRole: 'Product Manager, DigitalAgency',
      authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    }
  ];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationId: number;
    let position = 0;
    const speed = 0.5;

    const animate = () => {
      position += speed;
      const trackHeight = track.scrollHeight / 2;

      if (position >= trackHeight) {
        position = 0;
      }

      track.style.transform = `translateY(-${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="testimonials-section">
      <div className="testimonials-wrapper">
        {/* Left Column - Header Content */}
        <ScrollReveal>
          <div className="testimonials-header">
            <span className="testimonials-badge">{t('testimonials')}</span>
            <h2 className="testimonials-title">{t('testimonialsTitle')}</h2>
            <p className="testimonials-description">{t('testimonialsDescription')}</p>
            <a href="#contact" className="testimonials-cta">
              {t('contactMe')}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </ScrollReveal>

        {/* Right Column - Scrolling Cards */}
        <div className="testimonials-cards-container">
          <div className="testimonials-track" ref={trackRef}>
            {duplicatedTestimonials.map((testimonial, index) => (
              <div key={`${testimonial.id}-${index}`} className="testimonial-card">
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <img
                    src={testimonial.authorImage}
                    alt={testimonial.authorName}
                    className="testimonial-avatar"
                  />
                  <div className="testimonial-author-info">
                    <span className="testimonial-name">{testimonial.authorName}</span>
                    <span className="testimonial-role">{testimonial.authorRole}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
