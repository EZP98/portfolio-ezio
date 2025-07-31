import React, { useEffect, useState } from 'react';

const BlurController: React.FC = () => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate how close we are to the bottom
      const distanceFromBottom = scrollHeight - (scrollTop + windowHeight);
      
      // Start fading when we're within 200px of the bottom
      const fadeDistance = 200;
      
      if (distanceFromBottom <= fadeDistance) {
        // Calculate opacity: 1 at fadeDistance, 0 at bottom
        const newOpacity = Math.max(0, distanceFromBottom / fadeDistance);
        setOpacity(newOpacity);
      } else {
        setOpacity(1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="bottom-blur-layers" 
      style={{ opacity }}
    >
      <div className="blur-layer-1"></div>
      <div className="blur-layer-2"></div>
      <div className="blur-layer-3"></div>
      <div className="blur-layer-4"></div>
      <div className="blur-layer-5"></div>
      <div className="blur-layer-6"></div>
      <div className="blur-layer-7"></div>
      <div className="blur-layer-8"></div>
    </div>
  );
};

export default BlurController;