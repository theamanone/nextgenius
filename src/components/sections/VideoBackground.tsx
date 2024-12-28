'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface VideoBackgroundProps {
  videoUrl: string;
  fallbackColor?: string;
}

export default function VideoBackground({ videoUrl, fallbackColor = 'bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900' }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isSlowConnection, setIsSlowConnection] = useState(false);

  useEffect(() => {
    // Check connection speed using Navigation API
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      const isSlowSpeed = connection.downlink < 2; // Consider connection slow if less than 2 Mbps
      setIsSlowConnection(isSlowSpeed);
    }

    // Load video if connection is not slow
    if (!isSlowConnection && videoRef.current) {
      const video = videoRef.current;
      video.muted = true;
      video.playsInline = true;

      const handleCanPlay = () => {
        setIsVideoLoaded(true);
        video.play().catch(console.error);
      };

      video.addEventListener('canplay', handleCanPlay);
      return () => video.removeEventListener('canplay', handleCanPlay);
    }
  }, [isSlowConnection, videoUrl]);

  if (isSlowConnection) {
    return (
      <div className={`fixed inset-0 ${fallbackColor} transition-opacity duration-1000`} />
    );
  }

  return (
    <>
      <div className={`fixed inset-0 ${fallbackColor} transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-0' : 'opacity-100'}`} />
      <motion.video
        ref={videoRef}
        className="fixed inset-0 w-full h-full object-cover opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVideoLoaded ? 0.6 : 0 }}
        transition={{ duration: 1 }}
      >
        <source src={videoUrl} type="video/mp4" />
      </motion.video>
    </>
  );
}
