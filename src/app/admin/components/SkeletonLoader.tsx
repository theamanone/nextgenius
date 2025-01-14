'use client';

import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
  count?: number;
  type?: 'card' | 'list';
}

const SkeletonLoader = ({ count = 3, type = 'card' }: SkeletonLoaderProps) => {
  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-4 shadow-sm overflow-hidden"
          >
            <motion.div
              animate={{
                background: [
                  'rgba(229, 231, 235, 0.5)',
                  'rgba(229, 231, 235, 1)',
                  'rgba(229, 231, 235, 0.5)',
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-full h-48 rounded-xl bg-gray-200 mb-4"
            />
            <motion.div
              animate={{
                background: [
                  'rgba(229, 231, 235, 0.5)',
                  'rgba(229, 231, 235, 1)',
                  'rgba(229, 231, 235, 0.5)',
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.2,
              }}
              className="h-6 w-3/4 rounded-lg bg-gray-200 mb-2"
            />
            <motion.div
              animate={{
                background: [
                  'rgba(229, 231, 235, 0.5)',
                  'rgba(229, 231, 235, 1)',
                  'rgba(229, 231, 235, 0.5)',
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.4,
              }}
              className="h-4 w-1/2 rounded-lg bg-gray-200"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-4 shadow-sm overflow-hidden"
        >
          <motion.div
            animate={{
              background: [
                'rgba(229, 231, 235, 0.5)',
                'rgba(229, 231, 235, 1)',
                'rgba(229, 231, 235, 0.5)',
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="h-6 w-3/4 rounded-lg bg-gray-200 mb-2"
          />
          <motion.div
            animate={{
              background: [
                'rgba(229, 231, 235, 0.5)',
                'rgba(229, 231, 235, 1)',
                'rgba(229, 231, 235, 0.5)',
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.2,
            }}
            className="h-4 w-1/2 rounded-lg bg-gray-200"
          />
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
