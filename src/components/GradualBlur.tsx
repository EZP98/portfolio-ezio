import React from 'react';

const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

interface GradualBlurProps {
  direction?: 'top' | 'bottom';
  blurLayers?: number;
  maxBlur?: number;
  className?: string;
}

const GradualBlur: React.FC<GradualBlurProps> = ({
  direction = 'top',
  blurLayers = 8,
  maxBlur = 16,
  className = '',
}) => {
  const layers = Array.from({ length: blurLayers }, (_, i) => {
    const linearProgress = i / (blurLayers - 1);
    const progress = easeInOutCubic(linearProgress);
    const blur = progress * maxBlur;

    const gradientStart = direction === 'top'
      ? `${(i / blurLayers) * 100}%`
      : `${100 - ((i + 1) / blurLayers) * 100}%`;
    const gradientEnd = direction === 'top'
      ? `${((i + 1) / blurLayers) * 100}%`
      : `${100 - (i / blurLayers) * 100}%`;

    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          inset: 0,
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
          maskImage: direction === 'top'
            ? `linear-gradient(to bottom, black ${gradientStart}, transparent ${gradientEnd})`
            : `linear-gradient(to top, black ${gradientStart}, transparent ${gradientEnd})`,
          WebkitMaskImage: direction === 'top'
            ? `linear-gradient(to bottom, black ${gradientStart}, transparent ${gradientEnd})`
            : `linear-gradient(to top, black ${gradientStart}, transparent ${gradientEnd})`,
          pointerEvents: 'none',
        }}
      />
    );
  });

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '120px',
        pointerEvents: 'none',
        ...(direction === 'top' ? { top: 0 } : { bottom: 0 }),
      }}
    >
      {layers}
    </div>
  );
};

export default GradualBlur;
