'use client';

import { useHealth } from '@/hooks/useHealth';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';

export default function HealthCheck() {
  const { health, error, isDegraded, isOutage } = useHealth();

  useEffect(() => {
    if (isDegraded) {
      toast('System is experiencing some degradation', {
        icon: '⚠️',
        duration: 4000,
      });
    } else if (isOutage) {
      toast.error('System is currently experiencing an outage');
    } else if (error) {
      toast.error(`Health check failed: ${error}`);
    }
  }, [isDegraded, isOutage, error]);

  // Only render UI if there's an issue
  if (!isDegraded && !isOutage) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`rounded-lg p-4 shadow-lg ${
        isOutage ? 'bg-red-500' : 'bg-yellow-500'
      }`}>
        <p className="text-white font-medium">
          {isOutage ? 'System Outage' : 'System Degraded'}
        </p>
      </div>
    </div>
  );
}
