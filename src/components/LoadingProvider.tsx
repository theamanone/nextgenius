'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';

// Configure NProgress
NProgress.configure({ 
  showSpinner: false,
  trickleSpeed: 100,
  minimum: 0.2,
  easing: 'ease',
  speed: 200
});

export default function LoadingProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleStart = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => NProgress.start(), 100);
    };

    const handleStop = () => {
      clearTimeout(timeoutId);
      NProgress.done();
    };

    handleStart();
    handleStop();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [pathname, searchParams]);

  return children;
}
