'use client';

import { motion } from 'framer-motion';
import { Suspense } from 'react';

function MissionSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="h-8 bg-gray-800 rounded w-3/4"/>
      <div className="space-y-4">
        <div className="h-4 bg-gray-800 rounded w-full"/>
        <div className="h-4 bg-gray-800 rounded w-5/6"/>
        <div className="h-4 bg-gray-800 rounded w-4/6"/>
      </div>
    </div>
  );
}

export default function Mission() {
  return (
    <motion.main 
      className="min-h-screen bg-black text-white pt-24 pb-16 md:pt-32 md:pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <Suspense fallback={<MissionSkeleton />}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent text-center">
              Our Mission
            </h1>

            <div className="space-y-12">
              <motion.section
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50"
              >
                <h2 className="text-2xl font-semibold mb-4 text-blue-400">Core Purpose</h2>
                <p className="text-gray-300 leading-relaxed">
                  To empower businesses and individuals with innovative digital solutions that drive growth and success in the modern world.
                </p>
              </motion.section>

              <motion.section
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50"
              >
                <h2 className="text-2xl font-semibold mb-4 text-blue-400">Our Commitment</h2>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Delivering exceptional quality in every project
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Staying at the forefront of technological innovation
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Building long-lasting partnerships with our clients
                  </li>
                </ul>
              </motion.section>

              <motion.section
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50"
              >
                <h2 className="text-2xl font-semibold mb-4 text-blue-400">Our Approach</h2>
                <p className="text-gray-300 leading-relaxed">
                  We combine cutting-edge technology with creative problem-solving to deliver solutions that not only meet but exceed our clients' expectations. Our agile methodology ensures rapid development while maintaining the highest standards of quality.
                </p>
              </motion.section>
            </div>
          </motion.div>
        </Suspense>
      </div>
    </motion.main>
  );
}
