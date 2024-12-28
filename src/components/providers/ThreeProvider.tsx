'use client';

import { ReactNode, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ThreeCanvas = dynamic(
  () => import('@react-three/fiber').then((mod) => {
    // Only import what we need
    const { Canvas } = mod;
    return function ThreeCanvasWrapper(props: any) {
      return <Canvas {...props} />;
    };
  }),
  {
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-gradient-to-b from-black via-blue-900/20 to-black" />
  }
);

interface ThreeProviderProps {
  children: ReactNode;
}

export default function ThreeProvider({ children }: ThreeProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 bg-gradient-to-b from-black via-blue-900/20 to-black" />;
  }

  return (
    <ThreeCanvas
      camera={{ position: [0, 0, 1] }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    >
      {children}
    </ThreeCanvas>
  );
}
