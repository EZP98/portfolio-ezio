import React, { useRef, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'up' | 'fade' | 'stagger';
  threshold?: number;
  delay?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  variant = 'default',
  threshold = 0.1,
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setIsVisible(true), delay);
          } else {
            setIsVisible(true);
          }
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, delay]);

  const variantClass = {
    default: 'scroll-reveal',
    up: 'scroll-reveal-up',
    fade: 'scroll-reveal-fade',
    stagger: 'scroll-reveal-stagger',
  }[variant];

  return (
    <div
      ref={ref}
      className={`${variantClass} ${isVisible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
