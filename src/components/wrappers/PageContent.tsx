'use client';

import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Services from '@/components/sections/Services';

const DynamicBackground = dynamic(() => import('@/components/ThreeBackground'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-gradient-to-b from-black via-blue-900/20 to-black" />
});

export default function PageContent() {
  return (
    <main className="relative min-h-screen">
      <DynamicBackground />
      <div className="relative z-10">
        <Hero />
        <Services />
        <Projects />
      </div>
    </main>
  );
}
