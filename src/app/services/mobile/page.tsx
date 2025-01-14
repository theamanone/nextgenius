'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function MobileServices() {
  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
      {/* Blurred Background UI */}
      <div className="absolute inset-0 opacity-20 blur-[8px] pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        <Image
          src="https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?q=80&w=1367&auto=format&fit=crop"
          alt="Mobile App Development"
          fill
          className="object-cover opacity-20 blur-[2px]"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Mobile App Development
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-gray-300 mb-8">
              Coming Soon - We're Working on Something Amazing!
            </p>
            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800/50">
              <h2 className="text-2xl font-semibold mb-4">What to Expect</h2>
              <ul className="text-left space-y-4">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Native iOS App Development
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Android App Development
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Cross-Platform Solutions
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Progressive Web Apps
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
