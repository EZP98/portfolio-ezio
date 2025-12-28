import React, { useRef, useState } from 'react';
import './LightText.css';

interface LightTextProps {
  lines?: string[];
  lightRadius?: number;
}

const defaultLines = [
  "I learned design the hard way through curiosity",
  "that wouldn't rest, mistakes that wouldn't be ignored, and",
  "iteration that wouldn't stop.",
];

const LightText: React.FC<LightTextProps> = ({
  lines = defaultLines,
  lightRadius = 200,
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [cssVars, setCssVars] = useState({ opacity: 0, x: -9999, y: -9999 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!textRef.current) return;
    const rect = textRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const isInBounds = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;

    if (isInBounds) {
      setCssVars({ opacity: 1, x, y });
    } else {
      const distanceX = x < 0 ? -x : x > rect.width ? x - rect.width : 0;
      const distanceY = y < 0 ? -y : y > rect.height ? y - rect.height : 0;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      const opacity = Math.max(0, 1 - distance / 300);
      setCssVars({ opacity, x, y });
    }
  };

  const handleMouseLeave = () => {
    setCssVars({ opacity: 0, x: -9999, y: -9999 });
  };

  return (
    <div
      className="light-text-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={textRef}
        className="light-text"
        style={{
          '--opacity': cssVars.opacity,
          '--x': `${cssVars.x}px`,
          '--y': `${cssVars.y}px`,
          '--radius': `${lightRadius}px`,
        } as React.CSSProperties}
      >
        {lines.map((line, index) => (
          <span key={index} className="light-text-line">
            {line}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LightText;
