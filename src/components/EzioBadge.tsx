import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './EzioBadge.css';

interface EzioBadgeProps {
  name?: string;
  surname?: string;
  role?: string;
  date?: string;
  footer?: string;
  width?: number;
  height?: number;
}

const EzioBadge: React.FC<EzioBadgeProps> = ({
  name = 'Ezio',
  surname = 'Pappalardo',
  role = 'VIBE CODER',
  date = 'NOV 6 2026',
  footer = 'PORTFOLIO EZIO',
  width = 500,
  height = 600,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!containerRef.current || initialized.current) return;
    initialized.current = true;

    const container = containerRef.current;
    const w = container.clientWidth;
    const h = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    // Transparent background to blend with container

    // Camera
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.set(0, 0, 5.5);

    // Renderer with alpha for transparency
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 0.9);
    mainLight.position.set(3, 5, 5);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-3, 0, 3);
    scene.add(fillLight);

    // Badge texture - ELEGANT
    const createBadgeTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 800;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.Texture();

      // Base background
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, 600, 800);

      // Subtle gradient overlay
      const gradient = ctx.createLinearGradient(0, 0, 600, 800);
      gradient.addColorStop(0, 'rgba(30, 30, 30, 0.4)');
      gradient.addColorStop(0.5, 'rgba(15, 15, 15, 0)');
      gradient.addColorStop(1, 'rgba(5, 5, 5, 0.3)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 600, 800);

      // Elegant diagonal lines - very subtle
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;

      for (let i = -800; i < 1200; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + 800, 800);
        ctx.stroke();
      }

      // Second set of lines - even more subtle
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      for (let i = -800; i < 1200; i += 80) {
        ctx.beginPath();
        ctx.moveTo(i + 20, 0);
        ctx.lineTo(i + 820, 800);
        ctx.stroke();
      }

      // Subtle corner accent - top right
      const cornerGradient = ctx.createRadialGradient(550, 50, 0, 550, 50, 200);
      cornerGradient.addColorStop(0, 'rgba(255, 255, 255, 0.03)');
      cornerGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = cornerGradient;
      ctx.fillRect(350, 0, 250, 200);

      // Date - top right
      ctx.fillStyle = '#555555';
      ctx.font = '500 17px "SF Mono", Monaco, monospace';
      ctx.textAlign = 'right';
      ctx.fillText(date, 560, 50);

      // Name - LARGE
      ctx.textAlign = 'left';
      ctx.fillStyle = '#ffffff';
      ctx.font = '600 70px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText(name, 40, 570);
      ctx.fillText(surname, 40, 650);

      // Role
      ctx.fillStyle = '#555555';
      ctx.font = '500 17px "SF Mono", monospace';
      ctx.fillText(role, 40, 700);

      // Footer
      ctx.fillStyle = '#3a3a3a';
      ctx.font = '400 15px "SF Mono", monospace';
      ctx.fillText(footer, 40, 765);

      // Elegant border - subtle
      ctx.strokeStyle = '#222222';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(4, 4, 592, 792, 24);
      ctx.stroke();

      return new THREE.CanvasTexture(canvas);
    };

    // Main group
    const badgeGroup = new THREE.Group();
    scene.add(badgeGroup);

    // Badge with rounded corners
    const badgeW = 2.4;
    const badgeH = 3.2;
    const radius = 0.15;

    const shape = new THREE.Shape();
    shape.moveTo(-badgeW/2 + radius, -badgeH/2);
    shape.lineTo(badgeW/2 - radius, -badgeH/2);
    shape.quadraticCurveTo(badgeW/2, -badgeH/2, badgeW/2, -badgeH/2 + radius);
    shape.lineTo(badgeW/2, badgeH/2 - radius);
    shape.quadraticCurveTo(badgeW/2, badgeH/2, badgeW/2 - radius, badgeH/2);
    shape.lineTo(-badgeW/2 + radius, badgeH/2);
    shape.quadraticCurveTo(-badgeW/2, badgeH/2, -badgeW/2, badgeH/2 - radius);
    shape.lineTo(-badgeW/2, -badgeH/2 + radius);
    shape.quadraticCurveTo(-badgeW/2, -badgeH/2, -badgeW/2 + radius, -badgeH/2);

    const badgeGeo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.05,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.012,
      bevelSegments: 4,
    });

    const badgeTex = createBadgeTexture();

    // Fix UV mapping
    const uvAttribute = badgeGeo.attributes.uv;
    for (let i = 0; i < uvAttribute.count; i++) {
      const u = uvAttribute.getX(i);
      const v = uvAttribute.getY(i);
      uvAttribute.setXY(i,
        (u + badgeW/2) / badgeW,
        (v + badgeH/2) / badgeH
      );
    }

    const badgeMat = new THREE.MeshStandardMaterial({
      map: badgeTex,
      roughness: 0.4,
      metalness: 0.05,
    });

    const badge = new THREE.Mesh(badgeGeo, badgeMat);
    badgeGroup.add(badge);

    // Back
    const backMat = new THREE.MeshStandardMaterial({
      color: 0x080808,
      roughness: 0.6,
    });
    const back = new THREE.Mesh(badgeGeo, backMat);
    back.position.z = -0.001;
    back.rotation.y = Math.PI;
    badgeGroup.add(back);

    // Position
    badgeGroup.position.set(0.3, 0, 0);
    badgeGroup.rotation.set(0.08, -0.2, 0.03);

    // Interaction
    const mouse = { x: 0, y: 0 };
    const target = { x: 0.08, y: -0.2 };
    const velocity = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      target.x = 0.08 + mouse.y * 0.2;
      target.y = -0.2 + mouse.x * 0.35;
    };

    container.addEventListener('mousemove', onMouseMove);

    // Animation
    let time = 0;
    let animationId: number;

    const animate = () => {
      time += 0.016;

      velocity.x += (target.x - badgeGroup.rotation.x) * 0.045;
      velocity.y += (target.y - badgeGroup.rotation.y) * 0.045;
      velocity.x *= 0.88;
      velocity.y *= 0.88;

      badgeGroup.rotation.x += velocity.x;
      badgeGroup.rotation.y += velocity.y;
      badgeGroup.rotation.z = 0.03 + Math.sin(time * 0.5) * 0.01;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Resize
    const onResize = () => {
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', onResize);

    return () => {
      container.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      initialized.current = false;
    };
  }, [name, surname, role, date, footer]);

  return (
    <div
      ref={containerRef}
      className="ezio-badge-container"
      style={{ width, height }}
    />
  );
};

export default EzioBadge;
