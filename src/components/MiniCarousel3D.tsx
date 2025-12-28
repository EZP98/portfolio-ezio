import React, { useRef, useState, useEffect } from 'react';

interface MiniCarousel3DProps {
  images?: string[];
  autoRotate?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const defaultImages = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=400&fit=crop',
];

const MiniCarousel3D: React.FC<MiniCarousel3DProps> = ({
  images = defaultImages,
  autoRotate = true,
  size = 'medium'
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);

  const sizeConfig = {
    small: { card: { w: 50, h: 70 }, radius: 70, scale: 0.6 },
    medium: { card: { w: 70, h: 100 }, radius: 100, scale: 0.75 },
    large: { card: { w: 90, h: 128 }, radius: 130, scale: 0.85 },
  };

  const config = sizeConfig[size];

  useEffect(() => {
    if (!autoRotate) return;

    const animate = () => {
      if (!isDragging) {
        setRotation(prev => ({
          x: prev.x,
          y: prev.y + 0.15
        }));
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isDragging, autoRotate]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastPos.current.x;
    const deltaY = e.clientY - lastPos.current.y;

    setRotation(prev => ({
      x: Math.max(-30, Math.min(30, prev.x + deltaY * 0.3)),
      y: prev.y + deltaX * 0.5
    }));

    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const items = images.map((img, i) => {
    const angle = (i / images.length) * 360;

    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: `${config.card.w}px`,
          height: `${config.card.h}px`,
          marginLeft: `-${config.card.w / 2}px`,
          marginTop: `-${config.card.h / 2}px`,
          backfaceVisibility: 'hidden',
          transform: `rotateY(${angle}deg) translateZ(${config.radius}px)`,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          <img
            src={img}
            alt={`Item ${i}`}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>
    );
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1000px',
        touchAction: 'none',
        userSelect: 'none',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div
        style={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation.x - 10}deg) rotateY(${rotation.y}deg) scale(${config.scale})`,
          transition: isDragging ? 'none' : 'transform 0.1s ease-out',
        }}
      >
        {items}
      </div>
    </div>
  );
};

export default MiniCarousel3D;
