import React, { useRef, useEffect } from 'react';
import './RotatingCircles.css';

interface RotatingCirclesProps {
  speed?: number;
}

const circleConfigs = [
  { baseRotation: 32.24, translateX: 0, translateY: -80 },
  { baseRotation: 152.24, translateX: -69, translateY: 40 },
  { baseRotation: 272.24, translateX: 69, translateY: 40 },
];

const RotatingCircles: React.FC<RotatingCirclesProps> = ({ speed = 1 }) => {
  const circlesRef = useRef<(HTMLDivElement | null)[]>([]);
  const animationRef = useRef<number | null>(null);
  const rotations = useRef(circleConfigs.map(c => c.baseRotation));

  useEffect(() => {
    const animate = () => {
      circlesRef.current.forEach((circle, index) => {
        if (circle) {
          rotations.current[index] += 0.3 * speed;
          const config = circleConfigs[index];
          circle.style.transform = `translate(${config.translateX}px, ${config.translateY}px) rotate(${rotations.current[index]}deg)`;
        }
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [speed]);

  return (
    <div className="rotating-circles-container">
      {circleConfigs.map((config, index) => (
        <div
          key={index}
          ref={(el) => { circlesRef.current[index] = el; }}
          className="rotating-circle"
          style={{
            transform: `translate(${config.translateX}px, ${config.translateY}px) rotate(${config.baseRotation}deg)`,
          }}
        >
          <div className="circle-ring" />
          <div className="circle-dot" />
        </div>
      ))}
      <div className="rotating-circles-text">
        <span>Curiosity, friction,</span>
        <span>iteration</span>
      </div>
    </div>
  );
};

export default RotatingCircles;
