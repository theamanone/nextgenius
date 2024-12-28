'use client';

import { ReactNode, Suspense } from 'react';
import dynamic from 'next/dynamic';

const Canvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  { ssr: false }
);

interface ThreeCanvasProps {
  children: ReactNode;
}

export default function ThreeCanvas({ children }: ThreeCanvasProps) {
  return (
    <div className="fixed inset-0">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
