import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface Badge3DProps {
  title?: string;
  subtitle?: string;
  label?: string;
}

function Band({ title, subtitle, label }: Badge3DProps) {
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const [dragged, setDragged] = useState<THREE.Vector3 | false>(false);
  const [hovered, setHovered] = useState(false);

  const segmentProps = {
    type: 'dynamic' as const,
    canSleep: true,
    colliders: false as const,
    angularDamping: 2,
    linearDamping: 2,
  };

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => { document.body.style.cursor = 'auto'; };
    }
  }, [hovered, dragged]);

  useFrame((state) => {
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current.setNextKinematicTranslation({
        x: vec.x - (dragged as THREE.Vector3).x,
        y: vec.y - (dragged as THREE.Vector3).y,
        z: vec.z - (dragged as THREE.Vector3).z,
      });
    }

    if (card.current) {
      const ang = card.current.angvel();
      const rot = card.current.rotation();
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true);
    }
  });

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <mesh visible={false}><sphereGeometry args={[0.1]} /></mesh>
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <mesh visible={false}><sphereGeometry args={[0.1]} /></mesh>
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <mesh visible={false}><sphereGeometry args={[0.1]} /></mesh>
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerUp={(e: any) => {
              e.target.releasePointerCapture(e.pointerId);
              setDragged(false);
            }}
            onPointerDown={(e: any) => {
              e.target.setPointerCapture(e.pointerId);
              const pos = card.current?.translation();
              if (pos) {
                setDragged(new THREE.Vector3().copy(e.point).sub(new THREE.Vector3(pos.x, pos.y, pos.z)));
              }
            }}
          >
            <RoundedBox args={[0.85, 1.25, 0.04]} radius={0.05}>
              <meshStandardMaterial color="#111" metalness={0.3} roughness={0.4} />
            </RoundedBox>
            <mesh position={[0, 0.55, 0.025]}>
              <boxGeometry args={[0.7, 0.02, 0.01]} />
              <meshStandardMaterial color="#333" />
            </mesh>
            <Text position={[0, 0.38, 0.03]} fontSize={0.055} color="#555" anchorX="center" anchorY="middle">
              {label || 'PORTFOLIO 2025'}
            </Text>
            <Text position={[0, 0.12, 0.03]} fontSize={0.1} color="#fff" anchorX="center" anchorY="middle" maxWidth={0.75} textAlign="center" lineHeight={1.1}>
              {title || 'Your\nName'}
            </Text>
            <Text position={[0, -0.18, 0.03]} fontSize={0.045} color="#555" anchorX="center" anchorY="middle">
              {subtitle || 'DESIGNER & DEVELOPER'}
            </Text>
            <mesh position={[0, -0.5, 0.025]}>
              <boxGeometry args={[0.7, 0.02, 0.01]} />
              <meshStandardMaterial color="#333" />
            </mesh>
          </group>
        </RigidBody>
      </group>
      <Rope fixed={fixed} j1={j1} j2={j2} j3={j3} />
    </>
  );
}

function Rope({ fixed, j1, j2, j3 }: any) {
  const lineRef = useRef<THREE.Line>(null);
  const points = useRef([
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
  ]);

  useFrame(() => {
    if (fixed.current && j1.current && j2.current && j3.current && lineRef.current) {
      const p0 = fixed.current.translation();
      const p1 = j1.current.translation();
      const p2 = j2.current.translation();
      const p3 = j3.current.translation();

      points.current[0].set(p0.x, p0.y, p0.z);
      points.current[1].set(p1.x, p1.y, p1.z);
      points.current[2].set(p2.x, p2.y, p2.z);
      points.current[3].set(p3.x, p3.y, p3.z);

      const curve = new THREE.CatmullRomCurve3(points.current);
      const curvePoints = curve.getPoints(32);
      lineRef.current.geometry.setFromPoints(curvePoints);
    }
  });

  return (
    <line ref={lineRef as any}>
      <bufferGeometry />
      <lineBasicMaterial color="#444" linewidth={2} />
    </line>
  );
}

export default function Badge3D({ title, subtitle, label }: Badge3DProps) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 0, 13], fov: 25 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <spotLight position={[-10, -10, -10]} intensity={0.3} />
        <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
          <Band title={title} subtitle={subtitle} label={label} />
        </Physics>
      </Canvas>
    </div>
  );
}
