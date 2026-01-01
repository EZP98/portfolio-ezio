import React, { useEffect, useRef } from 'react';
import './LogoParticles.css';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  size: number;
  vx: number;
  vy: number;
  friction: number;
  springFactor: number;
  wobblePhase: number;
  wobbleSpeed: number;
  wobbleAmount: number;
}

interface LogoParticlesProps {
  size?: number;
  letter?: string;
  particleColor?: string;
  backgroundColor?: string;
  mouseRadius?: number;
}

const LogoParticles: React.FC<LogoParticlesProps> = ({
  size = 400,
  letter = 'E',
  particleColor = 'rgba(255, 255, 255, 0.9)',
  backgroundColor = '#000000',
  mouseRadius = 80,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: mouseRadius });
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const canvasSize = size;
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    // Logo dimensions
    const logoWidth = canvasSize * 0.36;
    const logoHeight = canvasSize * 0.56;
    const offsetX = (canvasSize - logoWidth) / 2;
    const offsetY = (canvasSize - logoHeight) / 2;

    const barThickness = logoWidth * 0.22;
    const horizontalBarWidth = logoWidth;

    // Function to check if point is inside the letter
    function isInsideLetter(x: number, y: number): boolean {
      const localX = x - offsetX;
      const localY = y - offsetY;

      if (localX < 0 || localX > logoWidth || localY < 0 || localY > logoHeight) {
        return false;
      }

      if (letter === 'E') {
        // Vertical bar (left)
        if (localX < barThickness) return true;
        // Top horizontal bar
        if (localY < barThickness && localX < horizontalBarWidth) return true;
        // Middle horizontal bar
        const middleY = (logoHeight - barThickness) / 2;
        if (localY >= middleY && localY < middleY + barThickness && localX < horizontalBarWidth * 0.75) return true;
        // Bottom horizontal bar
        if (localY >= logoHeight - barThickness && localX < horizontalBarWidth) return true;
      }

      return false;
    }

    // Generate particles
    const particles: Particle[] = [];
    const density = 4;

    for (let y = offsetY; y < offsetY + logoHeight; y += density) {
      for (let x = offsetX; x < offsetX + logoWidth; x += density) {
        if (isInsideLetter(x, y)) {
          particles.push({
            x: x + (Math.random() - 0.5) * 2,
            y: y + (Math.random() - 0.5) * 2,
            originX: x,
            originY: y,
            size: Math.random() * 1.6 + 0.6,
            vx: 0,
            vy: 0,
            friction: 0.9 + Math.random() * 0.05,
            springFactor: 0.03 + Math.random() * 0.03,
            wobblePhase: Math.random() * Math.PI * 2,
            wobbleSpeed: 0.01 + Math.random() * 0.015,
            wobbleAmount: 0.2 + Math.random() * 0.5,
          });
        }
      }
    }

    particlesRef.current = particles;

    let time = 0;

    const animate = () => {
      time += 1;

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvasSize, canvasSize);

      const mouse = mouseRef.current;

      particlesRef.current.forEach(particle => {
        // Subtle floating animation
        const wobbleX = Math.sin(time * particle.wobbleSpeed + particle.wobblePhase) * particle.wobbleAmount;
        const wobbleY = Math.cos(time * particle.wobbleSpeed * 0.8 + particle.wobblePhase + 1) * particle.wobbleAmount;

        // Mouse interaction
        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Repulsion force
        if (distance < mouse.radius && distance > 0) {
          const force = Math.pow((mouse.radius - distance) / mouse.radius, 2);
          const angle = Math.atan2(dy, dx);
          particle.vx += Math.cos(angle) * force * 10;
          particle.vy += Math.sin(angle) * force * 10;
        }

        // Spring back to origin
        const targetX = particle.originX + wobbleX;
        const targetY = particle.originY + wobbleY;

        particle.vx += (targetX - particle.x) * particle.springFactor;
        particle.vy += (targetY - particle.y) * particle.springFactor;

        // Apply friction
        particle.vx *= particle.friction;
        particle.vy *= particle.friction;

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Draw
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [size, letter, particleColor, backgroundColor]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    mouseRef.current.x = (e.clientX - rect.left) * scaleX;
    mouseRef.current.y = (e.clientY - rect.top) * scaleY;
  };

  const handleMouseLeave = () => {
    mouseRef.current.x = -1000;
    mouseRef.current.y = -1000;
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="logo-particles-canvas"
      style={{ width: size, height: size }}
    />
  );
};

export default LogoParticles;
