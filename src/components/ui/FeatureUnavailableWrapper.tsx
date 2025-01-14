'use client';

import FeatureUnavailable from './FeatureUnavailable';

interface FeatureUnavailableWrapperProps {
  title?: string;
  message?: string;
}

export default function FeatureUnavailableWrapper({
  title,
  message,
}: FeatureUnavailableWrapperProps) {
  return (
    <FeatureUnavailable 
      title={title}
      message={message}
    />
  );
}
