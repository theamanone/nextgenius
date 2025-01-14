'use client';

import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import HealthCheck from '@/components/health/HealthCheck';
import Header from '../Header';
import { usePathname } from 'next/navigation';

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showHeader = !pathname?.startsWith('/admin');

  return (
    <SessionProvider>
      <Toaster 
        position="bottom-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
      <HealthCheck />
      {showHeader && <Header />}
      {children}
    </SessionProvider>
  );
}