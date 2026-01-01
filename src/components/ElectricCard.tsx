import React from 'react';
import './ElectricCard.css';

interface ElectricCardProps {
  children?: React.ReactNode;
  color?: string;
  width?: number;
  height?: number;
}

const ElectricCard: React.FC<ElectricCardProps> = ({
  children,
  color = 'rgb(5, 118, 255)',
  width = 300,
  height = 400,
}) => {
  const filterId = `turbulent-displace-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div
      className="electric-card-container"
      style={{ width, height }}
    >
      {/* SVG Filter Definition */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter
            id={filterId}
            colorInterpolationFilters="sRGB"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves={3}
              result="noise1"
              seed={1}
            />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate
                attributeName="dy"
                values="700;0"
                dur="7s"
                repeatCount="indefinite"
              />
            </feOffset>

            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves={3}
              result="noise2"
              seed={1}
            />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate
                attributeName="dy"
                values="0;-700"
                dur="7s"
                repeatCount="indefinite"
              />
            </feOffset>

            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves={3}
              result="noise3"
              seed={2}
            />
            <feOffset in="noise3" dx="0" dy="0" result="offsetNoise3">
              <animate
                attributeName="dx"
                values="490;0"
                dur="7s"
                repeatCount="indefinite"
              />
            </feOffset>

            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves={3}
              result="noise4"
              seed={2}
            />
            <feOffset in="noise4" dx="0" dy="0" result="offsetNoise4">
              <animate
                attributeName="dx"
                values="0;-490"
                dur="7s"
                repeatCount="indefinite"
              />
            </feOffset>

            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />

            <feDisplacementMap
              in="SourceGraphic"
              in2="combinedNoise"
              scale={30}
              xChannelSelector="R"
              yChannelSelector="B"
            />
          </filter>
        </defs>
      </svg>

      {/* Card container */}
      <div className="electric-card-wrapper">
        {/* Border layers */}
        <div className="electric-border-layers">
          {/* Base border with filter */}
          <div
            className="electric-border-base"
            style={{ borderColor: `${color}80` }}
          >
            <div
              className="electric-border-animated"
              style={{
                borderColor: color,
                filter: `url(#${filterId})`,
              }}
            />
          </div>

          {/* Glow layer 1 */}
          <div
            className="electric-glow-1"
            style={{ borderColor: `${color}b3` }}
          />

          {/* Glow layer 2 */}
          <div
            className="electric-glow-2"
            style={{ borderColor: color }}
          />
        </div>

        {/* Background glow */}
        <div
          className="electric-bg-glow"
          style={{
            background: `linear-gradient(-30deg, ${color}, transparent, ${color})`,
          }}
        />

        {/* Content area */}
        <div className="electric-content">
          {children || (
            <div className="electric-default-content">
              <div
                className="electric-icon-wrapper"
                style={{
                  background: `linear-gradient(135deg, ${color}33, ${color}11)`,
                  border: `1px solid ${color}44`,
                }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="electric-title">Electric Card</h3>
              <p className="electric-description">
                Dynamic card with animated electric border effect
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ElectricCard;
