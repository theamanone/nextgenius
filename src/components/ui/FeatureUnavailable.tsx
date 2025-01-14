'use client';

import { AlertCircle } from 'lucide-react';

interface FeatureUnavailableProps {
  title?: string;
  message?: string;
}

export default function FeatureUnavailable({
  title = 'Feature Unavailable',
  message = 'This feature is currently under development. Please check back later.',
}: FeatureUnavailableProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="mx-4 max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <div className="flex items-center gap-3">
          <AlertCircle className="h-6 w-6 text-yellow-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{message}</p>
      </div>
    </div>
  );
}
