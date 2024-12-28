'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function StarField() {
  const points = useRef<THREE.Points>(null);

  const particlesCount = 6000;
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.x += 0.0001;
    points.current.rotation.y += 0.0001;
  });

  const material = useMemo(() => new THREE.PointsMaterial({
    size: 0.005,
    color: new THREE.Color('#ffffff'),
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
  }), []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <points ref={points} geometry={geometry} material={material} />
  );
}
