'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const ThreeBackground = dynamic(() => import('./ThreeBackground'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-gradient-to-b from-black via-blue-900/20 to-black" />
});

export default function ClientBackground() {
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-gradient-to-b from-black via-blue-900/20 to-black" />}>
      <ThreeBackground />
    </Suspense>
  );
}
