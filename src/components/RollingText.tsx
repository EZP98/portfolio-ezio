import { memo, useEffect, useState } from 'react';
import './RollingText.css';

interface RollingTextProps {
  children: string;
  className?: string;
  auto?: boolean;
  interval?: number;
}

export const RollingText = memo(function RollingText({
  children,
  className = '',
  auto = false,
  interval = 3000,
}: RollingTextProps) {
  const [isRolling, setIsRolling] = useState(false);
  const letters = children.split('');

  useEffect(() => {
    if (!auto) return;

    // Initial trigger after mount
    const initialTimeout = setTimeout(() => {
      setIsRolling(true);
    }, 500);

    // Set up interval for continuous rolling
    const intervalId = setInterval(() => {
      setIsRolling(true);
      // Reset after animation completes
      setTimeout(() => {
        setIsRolling(false);
      }, 600 + letters.length * 20); // Animation duration + stagger
    }, interval);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(intervalId);
    };
  }, [auto, interval, letters.length]);

  return (
    <span
      className={`rolling-text ${className} ${auto && isRolling ? 'rolling-text-active' : ''}`}
      data-text={children}
    >
      <span className="rolling-text-block">
        {letters.map((letter, index) => (
          <span
            key={index}
            data-letter={letter}
            className="rolling-text-letter"
            style={{ transitionDelay: `${index * 0.02}s` }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </span>
    </span>
  );
});

export default RollingText;
