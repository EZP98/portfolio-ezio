import React, { useEffect, useRef, useState } from 'react';
import './WorksTicker.css';

interface WorkItem {
  id: number;
  title: string;
  image: string;
  link: string;
}

const WorksTicker: React.FC = () => {
  const trackRef = useRef<HTMLUListElement>(null);
  const [offset, setOffset] = useState(0);
  const animationRef = useRef<number>();
  const speed = 0.5; // pixels per frame

  const works: WorkItem[] = [
    { id: 1, title: 'Taiwan Nights', image: '/DSCF6713.webp', link: '#works' },
    { id: 2, title: 'Golden Hour', image: '/DSCF6232.webp', link: '#works' },
    { id: 3, title: 'Urban Stories', image: '/DSCF6177.webp', link: '#works' },
    { id: 4, title: 'City Lights', image: '/DSCF8388.webp', link: '#works' },
    { id: 5, title: 'Portraits', image: '/cta-2.webp', link: '#works' },
    { id: 6, title: 'Moments', image: '/cta-3.webp', link: '#works' },
  ];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const animate = () => {
      setOffset(prev => {
        const itemWidth = 447; // 427px card + 20px gap
        const totalWidth = itemWidth * 6; // Number of items
        const newOffset = prev + speed;

        // Reset when we've scrolled one full set
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
  }, [works.length]);

  // Triplicate items for seamless loop (ensures enough items visible during scroll)
  const displayItems = [...works, ...works, ...works];

  return (
    <section className="works-ticker-section">
      <div className="works-ticker-wrapper">
        <div className="works-ticker-container">
          <ul
            ref={trackRef}
            className="works-ticker-track"
            style={{ transform: `translateX(-${offset}px)` }}
          >
            {displayItems.map((work, index) => (
              <li
                key={`${work.id}-${index}`}
                className="ticker-item"
                aria-hidden={index >= works.length}
              >
                <a href={work.link} className="ticker-card">
                  <div className="ticker-card-overlay">
                    <h2 className="ticker-card-title">{work.title}</h2>
                  </div>
                  <div className="ticker-card-image">
                    <img
                      src={work.image}
                      alt={work.title}
                    />
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WorksTicker;
