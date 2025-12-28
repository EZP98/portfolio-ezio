import { memo } from 'react';
import './RollingText.css';

interface RollingTextProps {
  children: string;
  className?: string;
}

export const RollingText = memo(function RollingText({
  children,
  className = '',
}: RollingTextProps) {
  const letters = children.split('');

  return (
    <span className={`rolling-text ${className}`} data-text={children}>
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
