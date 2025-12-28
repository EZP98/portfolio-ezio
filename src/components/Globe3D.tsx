import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface City {
  name: string;
  lat: number;
  lng: number;
  country: string;
}

interface Globe3DProps {
  cities?: City[];
  radius?: number;
  autoRotate?: boolean;
}

const defaultCities: City[] = [
  { name: 'Salerno', lat: 40.6824, lng: 14.7681, country: 'Italy' },
  { name: 'Milano', lat: 45.4642, lng: 9.1900, country: 'Italy' },
  { name: 'Barcelona', lat: 41.3851, lng: 2.1734, country: 'Spain' },
  { name: 'Amsterdam', lat: 52.3676, lng: 4.9041, country: 'Netherlands' },
  { name: 'New York', lat: 40.7128, lng: -74.0060, country: 'USA' },
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503, country: 'Japan' },
];

function latLngToVector3(lat: number, lng: number, radius: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return [x, y, z];
}

function geoJsonToBorderPoints(features: any[], radius: number): Float32Array {
  const points: number[] = [];

  features.forEach((feature) => {
    const geometry = feature.geometry;
    if (!geometry) return;

    const processCoordinates = (coords: number[][]) => {
      for (let i = 0; i < coords.length; i++) {
        const [lng, lat] = coords[i];
        const [x, y, z] = latLngToVector3(lat, lng, radius);
        points.push(x, y, z);
      }
    };

    const processPolygon = (polygon: number[][][]) => {
      polygon.forEach((ring) => processCoordinates(ring));
    };

    if (geometry.type === 'Polygon') {
      processPolygon(geometry.coordinates);
    } else if (geometry.type === 'MultiPolygon') {
      geometry.coordinates.forEach((polygon: number[][][]) => processPolygon(polygon));
    }
  });

  return new Float32Array(points);
}

function generateOceanGridPoints(radius: number): Float32Array {
  const points: number[] = [];
  const step = 4;

  for (let lat = -80; lat <= 80; lat += step) {
    for (let lng = -180; lng < 180; lng += step) {
      const [x, y, z] = latLngToVector3(lat, lng, radius);
      points.push(x, y, z);
    }
  }

  return new Float32Array(points);
}

interface PinProps {
  position: [number, number, number];
  city: City;
  isHovered: boolean;
  onHover: (city: City | null, screenPos?: { x: number; y: number }) => void;
}

const Pin: React.FC<PinProps> = ({ position, city, isHovered, onHover }) => {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { camera, size } = useThree();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (ring1Ref.current) {
      const scale1 = 1 + Math.sin(t * 0.8) * 0.1;
      ring1Ref.current.scale.setScalar(isHovered ? 1.3 : scale1);
    }
    if (ring2Ref.current) {
      const scale2 = 1 + Math.sin(t * 0.8 + 0.5) * 0.08;
      ring2Ref.current.scale.setScalar(isHovered ? 1.2 : scale2);
    }
  });

  const handlePointerOver = () => {
    if (groupRef.current) {
      const worldPos = new THREE.Vector3();
      groupRef.current.getWorldPosition(worldPos);
      const screenPos = worldPos.clone().project(camera);
      const x = (screenPos.x * 0.5 + 0.5) * size.width;
      const y = (-screenPos.y * 0.5 + 0.5) * size.height;
      onHover(city, { x, y });
    }
  };

  return (
    <group ref={groupRef} position={position}>
      <mesh ref={ring1Ref}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={isHovered ? 0.2 : 0.08} />
      </mesh>
      <mesh ref={ring2Ref}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={isHovered ? 0.35 : 0.15} />
      </mesh>
      <mesh onPointerOver={handlePointerOver} onPointerOut={() => onHover(null)}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.012, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
};

interface GlobeContentProps {
  geoData: any;
  cities: City[];
  radius: number;
  autoRotate: boolean;
  onCityHover: (city: City | null, screenPos?: { x: number; y: number }) => void;
  hoveredCity: City | null;
}

const GlobeContent: React.FC<GlobeContentProps> = ({
  geoData,
  cities,
  radius,
  autoRotate,
  onCityHover,
  hoveredCity,
}) => {
  const globeRef = useRef<THREE.Group>(null);
  const currentSpeed = useRef(0.08);

  const borderPoints = useMemo(() => {
    if (!geoData?.features) return new Float32Array(0);
    return geoJsonToBorderPoints(geoData.features, radius);
  }, [geoData, radius]);

  const oceanPoints = useMemo(() => generateOceanGridPoints(radius * 0.995), [radius]);

  useFrame((_, delta) => {
    if (globeRef.current && autoRotate) {
      const targetSpeed = hoveredCity ? 0.02 : 0.08;
      currentSpeed.current += (targetSpeed - currentSpeed.current) * 0.02;
      globeRef.current.rotation.y += delta * currentSpeed.current;
    }
  });

  const pins = useMemo(() => {
    return cities.map((city) => ({
      city,
      position: latLngToVector3(city.lat, city.lng, radius * 1.01) as [number, number, number],
    }));
  }, [cities, radius]);

  return (
    <group ref={globeRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[oceanPoints, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.006} color="#333333" transparent opacity={0.4} sizeAttenuation />
      </points>

      {borderPoints.length > 0 && (
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[borderPoints, 3]} />
          </bufferGeometry>
          <pointsMaterial size={0.008} color="#ffffff" transparent opacity={0.7} sizeAttenuation />
        </points>
      )}

      {pins.map((pin, i) => (
        <Pin
          key={i}
          position={pin.position}
          city={pin.city}
          isHovered={hoveredCity?.name === pin.city.name}
          onHover={onCityHover}
        />
      ))}
    </group>
  );
};

const Globe3D: React.FC<Globe3DProps> = ({
  cities = defaultCities,
  radius = 1.8,
  autoRotate = true,
}) => {
  const [hoveredCity, setHoveredCity] = useState<City | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const [geoData, setGeoData] = useState<any>(null);

  const handleCityHover = (city: City | null, screenPos?: { x: number; y: number }) => {
    setHoveredCity(city);
    setTooltipPos(screenPos || null);
  };

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson')
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch(console.error);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {hoveredCity && tooltipPos && (
        <div
          style={{
            position: 'absolute',
            left: tooltipPos.x + 20,
            top: tooltipPos.y - 40,
            padding: '10px 14px',
            borderRadius: '4px',
            background: 'rgba(10, 10, 10, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#ffffff',
            fontSize: '11px',
            lineHeight: 1.6,
            zIndex: 10,
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <div style={{ color: 'rgba(255, 255, 255, 0.5)', marginBottom: '2px', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {hoveredCity.country}
          </div>
          <div style={{ fontWeight: 500 }}>{hoveredCity.name}</div>
        </div>
      )}

      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ cursor: 'grab', background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <GlobeContent
          geoData={geoData}
          cities={cities}
          radius={radius}
          autoRotate={autoRotate}
          onCityHover={handleCityHover}
          hoveredCity={hoveredCity}
        />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.4}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI - Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};

export default Globe3D;
