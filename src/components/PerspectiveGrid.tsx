import { useEffect, useRef, useState } from 'react';
import './PerspectiveGrid.css';

// Column height patterns
const baseHeights = [
  [200, 300, 340, 400, 200, 250, 250, 340, 400, 400, 300, 370, 200, 200],
  [400, 400, 360, 200, 400, 400, 300, 200, 200, 250, 250, 340, 360, 200],
  [250, 250, 370, 200, 200, 200, 400, 380, 360, 200, 400, 400, 300, 200],
  [400, 380, 300, 200, 400, 300, 370, 200, 200, 200, 400, 380, 400, 400],
];

// Sample images
const defaultImages = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&fit=crop',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&fit=crop',
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&fit=crop',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&fit=crop',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&fit=crop',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&fit=crop',
  'https://images.unsplash.com/photo-1518173946687-a4c036bc9d5b?w=400&fit=crop',
  'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fit=crop',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&fit=crop',
  'https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?w=400&fit=crop',
  'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&fit=crop',
  'https://images.unsplash.com/photo-1682686581580-d99b0230064e?w=400&fit=crop',
];

// Calculate total height of one set of items (with gaps)
const calculateSetHeight = (heights: number[]) => {
  return heights.reduce((sum, h) => sum + h + 16, 0);
};

// Duplicate heights for seamless loop (3 sets)
const columnHeights = baseHeights.map(col => [...col, ...col, ...col]);

interface PerspectiveGridProps {
  images?: string[];
  speed?: number;
  dark?: boolean;
}

const PerspectiveGrid: React.FC<PerspectiveGridProps> = ({
  images = defaultImages,
  speed = 0.8,
  dark = false,
}) => {
  const [scrollY, setScrollY] = useState(0);
  const timeRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  const setHeight = calculateSetHeight(baseHeights[0]);
  const bgColor = dark ? 'rgb(8, 8, 8)' : 'rgb(255, 255, 255)';

  useEffect(() => {
    const animate = () => {
      setScrollY(prev => {
        const newVal = prev + speed;
        if (newVal >= setHeight) {
          return newVal - setHeight;
        }
        return newVal;
      });

      timeRef.current += 0.016;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [setHeight, speed]);

  const getWaveOffset = (colIndex: number, itemIndex: number) => {
    const phase = timeRef.current + colIndex * 0.5 + itemIndex * 0.3;
    return Math.sin(phase) * 8;
  };

  return (
    <div className={`perspective-grid ${dark ? 'perspective-grid-dark' : ''}`}>
      <div className="perspective-fade-top" style={{ background: `linear-gradient(to bottom, ${bgColor} 0%, transparent 100%)` }} />
      <div className="perspective-fade-bottom" style={{ background: `linear-gradient(to top, ${bgColor} 0%, transparent 100%)` }} />

      <div
        className="perspective-container"
        style={{ transform: `rotateX(45deg) rotateY(0deg) rotateZ(0deg) translateY(${-scrollY}px)` }}
      >
        {columnHeights.map((heights, colIndex) => (
          <div key={colIndex} className="perspective-column">
            {heights.map((height, itemIndex) => {
              const zDepth = (itemIndex % 14) * 10;
              const shadowBase = 4 + (itemIndex % 14) * 2;
              const waveY = getWaveOffset(colIndex, itemIndex);
              const imgIndex = (colIndex * 4 + itemIndex) % images.length;

              return (
                <div
                  key={itemIndex}
                  className="perspective-item"
                  style={{
                    height: `${height}px`,
                    boxShadow: `rgba(0, 0, 0, 0.1) 0px ${shadowBase}px ${shadowBase * 3}px`,
                    transform: `translateZ(${zDepth}px) translateY(${waveY}px)`,
                  }}
                >
                  <img src={images[imgIndex]} alt="" />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerspectiveGrid;
