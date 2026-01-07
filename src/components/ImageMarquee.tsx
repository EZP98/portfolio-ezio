import React, { useEffect, useRef, useState } from 'react';
import './ImageMarquee.css';

interface ImageMarqueeProps {
  images?: string[];
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
}

const defaultImages = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=240&fit=crop',
  'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=240&fit=crop',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=240&fit=crop',
  'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=240&fit=crop',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=240&fit=crop',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=240&fit=crop',
];

const ImageMarquee: React.FC<ImageMarqueeProps> = ({
  images = defaultImages,
  speed = 0.5,
  direction = 'left',
  pauseOnHover = true,
}) => {
  const [offset, setOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number | undefined>(undefined);

  // Responsive item width (card width + gap) - must match CSS
  const [itemWidth, setItemWidth] = useState(216); // 200px card + 16px gap

  useEffect(() => {
    const updateItemWidth = () => {
      const vw = window.innerWidth;
      if (vw <= 480) {
        setItemWidth(140); // 130px card + 10px gap
      } else if (vw <= 768) {
        setItemWidth(172); // 160px card + 12px gap
      } else {
        setItemWidth(216); // 200px card + 16px gap
      }
    };
    updateItemWidth();
    window.addEventListener('resize', updateItemWidth);
    return () => window.removeEventListener('resize', updateItemWidth);
  }, []);

  const totalWidth = itemWidth * images.length;

  useEffect(() => {
    const animate = () => {
      if (!isPaused) {
        setOffset(prev => {
          const newOffset = direction === 'left'
            ? prev + speed
            : prev - speed;

          // Reset when we've scrolled one full set
          if (direction === 'left' && newOffset >= totalWidth) {
            return 0;
          }
          if (direction === 'right' && newOffset <= -totalWidth) {
            return 0;
          }
          return newOffset;
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, speed, direction, totalWidth]);

  const handleMouseEnter = () => {
    if (pauseOnHover) setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) setIsPaused(false);
  };

  // Triplicate images for seamless loop
  const displayImages = [...images, ...images, ...images];

  return (
    <div
      className="image-marquee"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="image-marquee-container">
        <ul
          className="image-marquee-track"
          style={{ transform: `translateX(-${offset}px)` }}
        >
          {displayImages.map((src, index) => (
            <li key={index} className="image-marquee-item">
              <div className="image-marquee-card">
                <img src={src} alt="" loading="lazy" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ImageMarquee;
