import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Introduction.css';

const Introduction: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [wordProgress, setWordProgress] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const text = t('introText');
  const words = text.split(' ');

  useEffect(() => {
    setWordProgress(new Array(words.length).fill(0));
  }, [words.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Show text only when section is in view
      // Hide when section top is above viewport OR section bottom is above viewport
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;

      // Text is visible when:
      // - Section has entered the viewport (top < viewport height)
      // - Section hasn't completely scrolled past (bottom > 0)
      const shouldBeVisible = sectionTop < viewportHeight && sectionBottom > 0;
      setIsVisible(shouldBeVisible);

      // Calculate scroll progress through the section
      const scrollStart = viewportHeight * 0.8;
      const scrollEnd = -sectionHeight * 0.5;
      const totalScrollDistance = scrollStart - scrollEnd;

      const rawProgress = (scrollStart - rect.top) / totalScrollDistance;
      const progress = Math.max(0, Math.min(1, rawProgress));

      // Text reveals in first 20% of scroll (faster reveal)
      const textProgress = Math.min(1, progress / 0.2);

      const newWordProgress = words.map((_, index) => {
        const wordStart = index / words.length;
        const wordEnd = (index + 1) / words.length;

        if (textProgress < wordStart) return 0;
        if (textProgress > wordEnd) return 1;

        return (textProgress - wordStart) / (wordEnd - wordStart);
      });

      setWordProgress(newWordProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [words.length]);

  return (
    <section className="intro-section" ref={sectionRef}>
      {/* Content with sticky text - only visible when section is in view */}
      <div className="intro-content" style={{ opacity: isVisible ? 1 : 0, visibility: isVisible ? 'visible' : 'hidden' }}>
        <div className="intro-container">
          {/* Philosophy Badge */}
          <div className="intro-badge">
            <span>{t('introBadge')}</span>
          </div>

          {/* Sticky Text with blur animation */}
          <div className="intro-text-wrapper">
            <p className="intro-text">
              {words.map((word, index) => {
                const progress = wordProgress[index] || 0;
                const blur = 5 * (1 - progress);
                const opacity = 0.2 + 0.8 * progress;

                return (
                  <span
                    key={index}
                    className="intro-word"
                    style={{
                      filter: `blur(${blur}px)`,
                      opacity: opacity,
                    }}
                  >
                    {word}{' '}
                  </span>
                );
              })}
            </p>
          </div>

          {/* Copyright */}
          <div className="intro-copyright">
            <span>{t('introCopyright')}</span>
          </div>
        </div>
      </div>

      {/* Images section - scrolls normally over sticky text */}
      <div className="intro-images">
        <div className="intro-images-content">
          {/* Bento grid - images positioned with CSS grid */}
          <div className="intro-img intro-img-1">
            <img src="/cta-2.jpg" alt="Photography 1" />
          </div>
          <div className="intro-img intro-img-2">
            <img src="/cta-3.jpg" alt="Photography 2" />
          </div>
          <div className="intro-img intro-img-3">
            <img src="/cta-1.jpg" alt="Photography 3" />
          </div>
          <div className="intro-img intro-img-4">
            <img src="/profile.jpg" alt="Photography 4" />
          </div>
          <div className="intro-img intro-img-5">
            <img src="/cta-2.jpg" alt="Photography 5" />
          </div>
          <div className="intro-img intro-img-6">
            <img src="/cta-1.jpg" alt="Photography 6" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
