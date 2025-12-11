import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Introduction.css';

const Introduction: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [wordProgress, setWordProgress] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollOutOffset, setScrollOutOffset] = useState(0);
  const [fadeOutOpacity, setFadeOutOpacity] = useState(1);

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

      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;

      // Text is visible when section is in view
      const showThreshold = viewportHeight * 0.3;
      const shouldBeVisible = sectionTop < showThreshold && sectionBottom > 0;
      setIsVisible(shouldBeVisible);

      // Calculate scroll progress for text reveal
      const scrollStart = viewportHeight * 0.3;
      const scrollEnd = -sectionHeight * 0.2;
      const totalScrollDistance = scrollStart - scrollEnd;

      const rawProgress = (scrollStart - rect.top) / totalScrollDistance;
      const progress = Math.max(0, Math.min(1, rawProgress));

      // Text reveals in first 45% of scroll (slower animation)
      const textProgress = Math.min(1, progress / 0.45);

      const newWordProgress = words.map((_, index) => {
        const wordStart = index / words.length;
        const wordEnd = (index + 1) / words.length;

        if (textProgress < wordStart) return 0;
        if (textProgress > wordEnd) return 1;

        return (textProgress - wordStart) / (wordEnd - wordStart);
      });

      setWordProgress(newWordProgress);

      // Calculate scroll-out offset: text scrolls up when LAST image is at middle of screen
      // Images now start at top: 130vh
      // We want text to scroll out when the last image reaches the middle of viewport
      const scrolledIntoSection = -sectionTop;

      // Start scrolling text out when last image is around mid-screen
      // With images at 130vh and grid height, last image appears around 220-240vh scrolled
      const scrollOutStart = viewportHeight * 2.2;
      if (scrolledIntoSection > scrollOutStart) {
        const scrollOutProgress = (scrolledIntoSection - scrollOutStart) / (viewportHeight * 0.5);
        setScrollOutOffset(Math.min(scrollOutProgress * viewportHeight, viewportHeight));
      } else {
        setScrollOutOffset(0);
      }

      // Fade out when scrolling UP (section going above viewport)
      // When sectionTop is negative and getting more negative, we're scrolling down past the section
      // When sectionTop is positive (section below viewport), we're at the top
      // Fade out when the top of the section is still visible but we're scrolling back up
      const fadeOutStart = viewportHeight * 0.15; // Start fading when section top is at 15% from top
      if (sectionTop > fadeOutStart) {
        // Section is being scrolled back up, start fading out
        const fadeProgress = (sectionTop - fadeOutStart) / (viewportHeight * 0.3);
        setFadeOutOpacity(Math.max(0, 1 - fadeProgress));
      } else {
        setFadeOutOpacity(1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [words.length]);

  return (
    <section className="intro-section" ref={sectionRef}>
      {/* Content with sticky text - scrolls out when images arrive */}
      <div
        className="intro-content"
        style={{
          opacity: isVisible ? fadeOutOpacity : 0,
          visibility: isVisible || fadeOutOpacity > 0 ? 'visible' : 'hidden',
          transform: `translateY(-${scrollOutOffset}px)`,
          transition: 'opacity 0.15s ease-out'
        }}
      >
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
            <img src="/cta-2.webp" alt="Photography 1" />
          </div>
          <div className="intro-img intro-img-2">
            <img src="/cta-3.webp" alt="Photography 2" />
          </div>
          <div className="intro-img intro-img-3">
            <img src="/cta-1.webp" alt="Photography 3" />
          </div>
          <div className="intro-img intro-img-4">
            <img src="/profile.webp" alt="Photography 4" />
          </div>
          <div className="intro-img intro-img-5">
            <img src="/cta-2.webp" alt="Photography 5" />
          </div>
          <div className="intro-img intro-img-6">
            <img src="/cta-1.webp" alt="Photography 6" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
