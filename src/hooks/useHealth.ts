"use client";
import { useState, useEffect } from 'react';
import { HealthResponse } from '@/types/health';

const HEALTH_CHECK_INTERVAL = 30000; // 30 seconds
const HEALTH_CHECK_TIMEOUT = 10000; // 10 seconds

export function useHealth() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    const checkHealth = async () => {
      try {
        // Set up timeout
        const timeoutPromise = new Promise((_, reject) => {
          timeoutId = setTimeout(() => {
            reject(new Error('Health check timed out'));
          }, HEALTH_CHECK_TIMEOUT);
        });

        // Fetch health data with timeout
        const response = await Promise.race([
          fetch('/api/health'),
          timeoutPromise,
        ]);

        if (response instanceof Response) {
          if (!response.ok) {
            throw new Error(`Health check failed: ${response.statusText}`);
          }

          const data = await response.json();

          if (mounted) {
            setHealth(data);
            setError(null);
          }
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Health check failed');
        }
      } finally {
        clearTimeout(timeoutId);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    // Initial check
    checkHealth();

    // Set up interval for subsequent checks
    intervalId = setInterval(checkHealth, HEALTH_CHECK_INTERVAL);

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  return {
    health,
    loading,
    error,
    isOperational: health?.status === 'operational',
    isDegraded: health?.status === 'degraded',
    isOutage: health?.status === 'outage',
    lastChecked: health?.timestamp,
  };
}
