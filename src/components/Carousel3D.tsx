import React, { useRef, useState, useEffect } from 'react';
import './Carousel3D.css';

interface Carousel3DProps {
  images?: string[];
  autoRotateSpeed?: number;
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
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=300&h=400&fit=crop',
];

const Carousel3D: React.FC<Carousel3DProps> = ({
  images = defaultImages,
  autoRotateSpeed = 0.2,
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);

  // Responsive scale and translateZ
  const [translateZ, setTranslateZ] = useState({ z1: 148, z2: 82, scale: 0.8 });

  useEffect(() => {
    const updateTranslateZ = () => {
      const vw = window.innerWidth;
      if (vw <= 480) {
        setTranslateZ({ z1: 90, z2: 50, scale: 0.6 });
      } else if (vw <= 768) {
        setTranslateZ({ z1: 110, z2: 60, scale: 0.7 });
      } else {
        setTranslateZ({ z1: 148, z2: 82, scale: 0.8 });
      }
    };
    updateTranslateZ();
    window.addEventListener('resize', updateTranslateZ);
    return () => window.removeEventListener('resize', updateTranslateZ);
  }, []);

  useEffect(() => {
    const animate = () => {
      if (!isDragging) {
        setRotation(prev => ({
          x: prev.x,
          y: prev.y + autoRotateSpeed,
        }));
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isDragging, autoRotateSpeed]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastPos.current.x;
    const deltaY = e.clientY - lastPos.current.y;

    setRotation(prev => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5,
    }));

    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const itemCount = images.length;

  const items = images.map((img, i) => {
    const angle = (i / itemCount) * 360;

    return (
      <div
        key={i}
        className="carousel3d-item"
        style={{
          transform: `rotateY(${angle}deg) translateZ(${translateZ.z1}px) rotateX(0deg) translateZ(${translateZ.z2}px) rotateY(90deg) scale(${translateZ.scale})`,
        }}
      >
        <div className="carousel3d-card">
          <img src={img} alt={`Item ${i}`} loading="lazy" />
          <div className="carousel3d-overlay" />
        </div>
      </div>
    );
  });

  return (
    <div
      className="carousel3d-container"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div
        className="carousel3d-torus"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        {items}
      </div>
    </div>
  );
};

export default Carousel3D;
