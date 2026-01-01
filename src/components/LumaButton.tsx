import React, { useState, useMemo } from 'react';
import './LumaButton.css';

interface LumaButtonProps {
  text: string;
  onClick?: () => void;
  showIcons?: boolean;
  dark?: boolean;
}

const generateParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 2 + Math.random() * 1,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2,
  }));
};

const StarIcon: React.FC<{ opacity?: number }> = ({ opacity = 0.9 }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    className="luma-icon"
    style={{ opacity }}
  >
    <path d="M12 2L13.09 8.26L19 9L13.09 9.74L12 16L10.91 9.74L5 9L10.91 8.26L12 2Z" fill="currentColor" />
    <path d="M18 14L18.54 16.46L21 17L18.54 17.54L18 20L17.46 17.54L15 17L17.46 16.46L18 14Z" fill="currentColor" opacity="0.7" />
    <path d="M6 14L6.54 16.46L9 17L6.54 17.54L6 20L5.46 17.54L3 17L5.46 16.46L6 14Z" fill="currentColor" opacity="0.5" />
  </svg>
);

const LumaButton: React.FC<LumaButtonProps> = ({
  text,
  onClick,
  showIcons = true,
  dark = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const particles = useMemo(() => generateParticles(12), []);

  return (
    <button
      className={`luma-button ${dark ? 'dark' : ''}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="luma-border">
        <div className="luma-light" />
        <div className="luma-inner">
          <div className="luma-particles">
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="luma-particle"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  animationDelay: `${particle.delay}s`,
                  animationDuration: `${particle.duration}s, ${particle.duration + 1}s`,
                }}
              />
            ))}
          </div>

          {showIcons && <StarIcon opacity={isHovered ? 1 : 0.9} />}
          <span className="luma-text">{text}</span>
          {showIcons && <StarIcon opacity={isHovered ? 1 : 0.9} />}
        </div>
      </div>
    </button>
  );
};

export default LumaButton;
