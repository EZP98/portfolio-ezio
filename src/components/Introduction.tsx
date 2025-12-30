import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Introduction.css';

const Introduction: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [wordProgress, setWordProgress] = useState<number[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const progressRef = useRef(0);

  const text = t('introText');
  const words = text.split(' ');

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setWordProgress(new Array(words.length).fill(0));
  }, [words.length]);

  // On mobile, show all text immediately
  useEffect(() => {
    if (isMobile) {
      setWordProgress(new Array(words.length).fill(1));
      setAnimationProgress(1);
      progressRef.current = 1;
    }
  }, [isMobile, words.length]);

  // Update word progress based on animation progress
  useEffect(() => {
    if (isMobile) return; // Skip on mobile
    const newWordProgress = words.map((_, index) => {
      const wordStart = index / words.length;
      const wordEnd = (index + 1) / words.length;

      if (animationProgress < wordStart) return 0;
      if (animationProgress > wordEnd) return 1;

      return (animationProgress - wordStart) / (wordEnd - wordStart);
    });
    setWordProgress(newWordProgress);
  }, [animationProgress, words.length, isMobile]);

  // Check if section is in view for locking
  const checkSectionPosition = useCallback(() => {
    if (!sectionRef.current || isMobile) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Section is "active" when its top reaches middle of viewport
    const triggerPoint = viewportHeight * 0.4;
    const isInTriggerZone = rect.top <= triggerPoint && rect.top > -viewportHeight * 0.3;

    // Section is visible when it's in viewport (but not scrolled too far past)
    const sectionInView = rect.top < viewportHeight * 0.5 && rect.bottom > viewportHeight * 0.2;
    setIsVisible(sectionInView && !hasCompleted);

    // Lock when entering trigger zone and animation not complete
    if (isInTriggerZone && progressRef.current < 1 && !hasCompleted) {
      setIsLocked(true);
    }

    // Unlock when animation complete or scrolled past
    if (progressRef.current >= 1 || rect.top > triggerPoint) {
      setIsLocked(false);
    }

    // Mark as completed and hide when scrolled past the section bottom
    if (rect.bottom < viewportHeight * 0.3 && progressRef.current >= 1) {
      setHasCompleted(true);
    }

    // Reset if scrolled back up before the section
    if (rect.top > viewportHeight * 0.8) {
      setHasCompleted(false);
      setIsVisible(false);
    }
  }, [isMobile, hasCompleted]);

  // Handle wheel events when locked (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const handleWheel = (e: WheelEvent) => {
      if (!isLocked) return;

      // If scrolling UP and progress is at 0, unlock and allow normal scroll
      if (e.deltaY < 0 && progressRef.current <= 0) {
        setIsLocked(false);
        return; // Don't prevent default - allow scroll up
      }

      e.preventDefault();

      // Increment progress based on wheel delta
      const delta = e.deltaY > 0 ? 0.03 : -0.03;
      const newProgress = Math.max(0, Math.min(1, progressRef.current + delta));
      progressRef.current = newProgress;
      setAnimationProgress(newProgress);

      // Unlock when complete (scrolling down)
      if (newProgress >= 1) {
        setIsLocked(false);
      }
    };

    if (isLocked) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('wheel', handleWheel, { passive: false });
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isLocked, isMobile]);

  // Listen for scroll to detect when section comes into view
  useEffect(() => {
    if (isMobile) {
      setIsVisible(true);
      return;
    }
    window.addEventListener('scroll', checkSectionPosition, { passive: true });
    checkSectionPosition();

    return () => window.removeEventListener('scroll', checkSectionPosition);
  }, [checkSectionPosition, isMobile]);

  return (
    <section className="intro-section intro-section-text-only" ref={sectionRef}>
      <div
        className="intro-content"
        style={{
          opacity: isVisible ? 1 : 0,
          visibility: isVisible ? 'visible' : 'hidden',
          transform: isVisible ? 'translateY(0)' : 'translateY(-30px)',
        }}
      >
        <div className="intro-container">
          {/* Philosophy Badge */}
          <div className="intro-badge">
            <span>{t('introBadge')}</span>
          </div>

          {/* Text with blur animation */}
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
    </section>
  );
};

export default Introduction;
