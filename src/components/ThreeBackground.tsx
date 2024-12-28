'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ThreeProvider = dynamic(() => import('./providers/ThreeProvider'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-gradient-to-b from-black via-blue-900/20 to-black" />
});

const StarField = dynamic(() => import('./three/StarField'), {
  ssr: false,
  loading: () => null
});

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-black via-blue-900/20 to-black">
      <Suspense fallback={<div className="fixed inset-0 bg-gradient-to-b from-black via-blue-900/20 to-black" />}>
        <ThreeProvider>
          <StarField />
        </ThreeProvider>
      </Suspense>
    </div>
  );
}
