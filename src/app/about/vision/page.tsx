'use client';

import { motion } from 'framer-motion';
import { Suspense } from 'react';

function VisionSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="h-8 bg-gray-800 rounded w-3/4"/>
      <div className="space-y-4">
        <div className="h-4 bg-gray-800 rounded w-full"/>
        <div className="h-4 bg-gray-800 rounded w-5/6"/>
      </div>
    </div>
  );
}

export default function Vision() {
  return (
    <motion.main 
      className="min-h-screen bg-black text-white pt-24 pb-16 md:pt-32 md:pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <Suspense fallback={<VisionSkeleton />}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent text-center">
              Our Vision
            </h1>

            <div className="space-y-12">
              <motion.section
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50"
              >
                <h2 className="text-2xl font-semibold mb-4 text-blue-400">Future of Digital Innovation</h2>
                <p className="text-gray-300 leading-relaxed">
                  We envision a future where technology seamlessly enhances human potential, creating digital experiences that inspire, empower, and transform. Our goal is to be at the forefront of this digital revolution, leading the way in innovative solutions that shape tomorrow's digital landscape.
                </p>
              </motion.section>

              <motion.section
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50"
              >
                <h2 className="text-2xl font-semibold mb-4 text-blue-400">Strategic Goals</h2>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">→</span>
                    Pioneering innovative solutions in web development
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">→</span>
                    Setting new standards in user experience design
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">→</span>
                    Creating sustainable and scalable digital solutions
                  </li>
                </ul>
              </motion.section>

              <motion.section
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50"
              >
                <h2 className="text-2xl font-semibold mb-4 text-blue-400">Impact</h2>
                <p className="text-gray-300 leading-relaxed">
                  We strive to make a lasting impact by creating digital solutions that not only solve today's challenges but also anticipate tomorrow's needs. Through continuous innovation and dedication to excellence, we aim to contribute to a more connected and efficient digital world.
                </p>
              </motion.section>
            </div>
          </motion.div>
        </Suspense>
      </div>
    </motion.main>
  );
}
