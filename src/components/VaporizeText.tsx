import React, { useEffect, useRef } from 'react';
import './VaporizeText.css';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  decay: number;
  gravity: number;
  friction: number;
}

interface VaporizeTextProps {
  texts?: string[];
  width?: number;
  height?: number;
  fontSize?: number;
}

const VaporizeText: React.FC<VaporizeTextProps> = ({
  texts = ['Your Text', 'Components', 'Creative', 'Amazing'],
  width: propWidth = 700,
  height: propHeight = 300,
  fontSize: propFontSize = 90,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const stateRef = useRef({
    textIndex: 0,
    phase: 'visible' as 'visible' | 'vaporizing' | 'waiting',
    phaseTimer: 0,
    waveX: 0,
  });

  // Responsive dimensions
  const [dimensions, setDimensions] = React.useState({ width: propWidth, height: propHeight, fontSize: propFontSize });

  React.useEffect(() => {
    const updateDimensions = () => {
      const vw = window.innerWidth;
      if (vw <= 480) {
        setDimensions({ width: 280, height: 120, fontSize: 36 });
      } else if (vw <= 768) {
        setDimensions({ width: 350, height: 150, fontSize: 48 });
      } else {
        setDimensions({ width: propWidth, height: propHeight, fontSize: propFontSize });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [propWidth, propHeight, propFontSize]);

  const { width, height, fontSize } = dimensions;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    let particles: Particle[] = [];
    let time = 0;

    const font = `bold ${fontSize}px "Helvetica Neue", Arial, sans-serif`;

    function getTextImageData(text: string): ImageData {
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) throw new Error('Could not get context');
      tempCanvas.width = width;
      tempCanvas.height = height;

      tempCtx.font = font;
      tempCtx.fillStyle = 'white';
      tempCtx.textAlign = 'center';
      tempCtx.textBaseline = 'middle';
      tempCtx.fillText(text, width / 2, height / 2);

      return tempCtx.getImageData(0, 0, width, height);
    }

    function getTextBounds(text: string) {
      ctx!.font = font;
      const metrics = ctx!.measureText(text);
      const textWidth = metrics.width;
      const startX = (width - textWidth) / 2;
      const endX = startX + textWidth;
      return { startX, endX, textWidth };
    }

    function createParticlesInStrip(imageData: ImageData, x1: number, x2: number): Particle[] {
      const pixels = imageData.data;
      const newParticles: Particle[] = [];
      const density = 3;

      for (let y = 0; y < height; y += density) {
        for (let x = Math.floor(x1); x < Math.ceil(x2); x += density) {
          if (x < 0 || x >= width) continue;

          const index = (y * width + x) * 4;
          const alpha = pixels[index + 3];

          if (alpha > 128) {
            const numParticles = 1 + Math.floor(Math.random() * 2);
            for (let i = 0; i < numParticles; i++) {
              newParticles.push({
                x: x + (Math.random() - 0.5) * 4,
                y: y + (Math.random() - 0.5) * 4,
                vx: -Math.random() * 8 - 4,
                vy: (Math.random() - 0.5) * 5,
                size: Math.random() * 2 + 0.5,
                life: 1,
                decay: 0.01 + Math.random() * 0.015,
                gravity: (Math.random() - 0.5) * 0.015,
                friction: 0.985,
              });
            }
          }
        }
      }

      return newParticles;
    }

    let currentText = texts[0];
    let textImageData = getTextImageData(currentText);
    let textBounds = getTextBounds(currentText);
    let lastWaveX = textBounds.startX;

    const animate = () => {
      time += 1;
      const state = stateRef.current;
      state.phaseTimer += 1;

      ctx.fillStyle = '#080808';
      ctx.fillRect(0, 0, width, height);

      if (state.phase === 'visible') {
        if (state.phaseTimer > 80) {
          state.phase = 'vaporizing';
          state.phaseTimer = 0;
          state.waveX = textBounds.startX;
          lastWaveX = textBounds.startX;
        }

        ctx.font = font;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'white';
        ctx.fillText(currentText, width / 2, height / 2);

      } else if (state.phase === 'vaporizing') {
        const waveSpeed = 4;
        state.waveX += waveSpeed;

        if (state.waveX > lastWaveX) {
          const newParticles = createParticlesInStrip(textImageData, lastWaveX, state.waveX);
          particles.push(...newParticles);
          lastWaveX = state.waveX;
        }

        ctx.save();
        ctx.beginPath();
        ctx.rect(state.waveX, 0, width, height);
        ctx.clip();

        ctx.font = font;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'white';
        ctx.fillText(currentText, width / 2, height / 2);
        ctx.restore();

        if (state.waveX > textBounds.endX + 50) {
          state.phase = 'waiting';
          state.phaseTimer = 0;
        }

      } else if (state.phase === 'waiting') {
        if (state.phaseTimer > 60 && particles.length < 50) {
          state.textIndex = (state.textIndex + 1) % texts.length;
          currentText = texts[state.textIndex];
          textImageData = getTextImageData(currentText);
          textBounds = getTextBounds(currentText);
          lastWaveX = textBounds.startX;
          state.waveX = textBounds.startX;
          state.phase = 'visible';
          state.phaseTimer = 0;
          particles = [];
        }
      }

      particles = particles.filter(p => p.life > 0);

      particles.forEach(p => {
        p.vy += p.gravity;
        p.vx *= p.friction;
        p.vy *= p.friction;
        p.vx += (Math.random() - 0.65) * 0.3;
        p.vy += (Math.random() - 0.5) * 0.2;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        const alpha = Math.max(0, p.life * 0.9);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      });

      // Ambient dust
      for (let i = 0; i < 20; i++) {
        const seed = i * 127;
        const x = ((seed + width) - (time * 0.6) % (width + 200));
        const y = Math.sin(time * 0.003 + i * 1.1) * 40 + height / 2 + (seed % 100) - 50;
        const size = Math.sin(time * 0.01 + i * 0.7) * 0.3 + 0.6;
        const alpha = Math.sin(time * 0.005 + i * 0.4) * 0.04 + 0.07;

        if (x > -10 && x < width + 10) {
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [texts, width, height, fontSize]);

  return (
    <div className="vaporize-container" style={{ width, height }}>
      <div className="vaporize-noise" />
      <div className="vaporize-vignette" />
      <canvas ref={canvasRef} className="vaporize-canvas" />
    </div>
  );
};

export default VaporizeText;
