import React, { useEffect, useRef } from 'react';

interface Gallery3DProps {
  images?: string[];
}

const defaultImages = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=700&fit=crop',
  'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=550&fit=crop',
  'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=480&fit=crop',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=520&fit=crop',
  'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=550&fit=crop',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=600&fit=crop',
];

const columns = [
  { heights: [120, 180, 120, 180], speed: 0.3, offset: -300 },
  { heights: [150, 170, 150, 170], speed: 0.35, offset: -320 },
  { heights: [180, 140, 180, 140], speed: 0.4, offset: -320 },
  { heights: [130, 160, 130, 160], speed: 0.25, offset: -290 },
  { heights: [160, 190, 160, 190], speed: 0.45, offset: -350 },
];

const Gallery3D: React.FC<Gallery3DProps> = ({ images = defaultImages }) => {
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollPositions = useRef<number[]>(columns.map(c => c.offset));
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = () => {
      columnRefs.current.forEach((col, i) => {
        if (col) {
          scrollPositions.current[i] -= columns[i].speed;
          const totalHeight = columns[i].heights.reduce((a, b) => a + b, 0) + (columns[i].heights.length - 1) * 8;
          if (scrollPositions.current[i] < -totalHeight / 2) {
            scrollPositions.current[i] = 0;
          }
          col.style.transform = `translate3d(0px, ${scrollPositions.current[i]}px, 0px)`;
        }
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}>
      <div style={{
        perspective: '800px',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(55deg) scale(0.9)',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            top: '-30%',
            left: 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            padding: '8px',
          }}>
            {columns.map((column, colIndex) => (
              <div
                key={colIndex}
                ref={(el) => { columnRefs.current[colIndex] = el; }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  willChange: 'transform',
                  flex: '1 1 0%',
                  minWidth: 0,
                  transform: `translate3d(0px, ${column.offset}px, 0px)`,
                }}
              >
                {column.heights.map((height, imgIndex) => (
                  <div
                    key={imgIndex}
                    style={{
                      position: 'relative',
                      borderRadius: '8px',
                      height: `${height}px`,
                      width: '100%',
                      overflow: 'hidden',
                      flexShrink: 0,
                      backgroundColor: 'rgba(34, 34, 34, 0.8)',
                    }}
                  >
                    <img
                      src={images[(colIndex * 2 + imgIndex) % images.length]}
                      alt=""
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        userSelect: 'none',
                      }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '25%',
        background: 'linear-gradient(to top, var(--bg-tertiary, #f5f5f5) 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />
      {/* Top fade */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '15%',
        background: 'linear-gradient(to bottom, var(--bg-tertiary, #f5f5f5) 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />
      {/* Left fade */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: '10%',
        background: 'linear-gradient(to right, var(--bg-tertiary, #f5f5f5) 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />
      {/* Right fade */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: '10%',
        background: 'linear-gradient(to left, var(--bg-tertiary, #f5f5f5) 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />
    </div>
  );
};

export default Gallery3D;
