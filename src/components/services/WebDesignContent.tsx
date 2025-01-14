'use client';

import { MotionDiv } from '@/components/motion/MotionDiv';

export default function WebDesignContent() {
  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Web Design Services</h1>
          <p className="text-gray-400 text-lg mb-8">
            Creating beautiful, functional, and user-friendly websites that make an impact.
          </p>
          
          <div className="grid gap-8">
            <div className="bg-gray-800/50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Our Design Process</h2>
              <ul className="space-y-4">
                <li>
                  <h3 className="text-xl font-medium text-blue-400">Research & Planning</h3>
                  <p className="text-gray-400">Understanding your needs and planning the perfect design strategy.</p>
                </li>
                <li>
                  <h3 className="text-xl font-medium text-blue-400">UI/UX Design</h3>
                  <p className="text-gray-400">Creating intuitive interfaces and seamless user experiences.</p>
                </li>
                <li>
                  <h3 className="text-xl font-medium text-blue-400">Visual Design</h3>
                  <p className="text-gray-400">Crafting stunning visuals that align with your brand identity.</p>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Design Services</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-900/50 rounded-lg">
                  <h3 className="font-medium text-blue-400">Responsive Design</h3>
                  <p className="text-gray-400">Mobile-first approach</p>
                </div>
                <div className="p-4 bg-gray-900/50 rounded-lg">
                  <h3 className="font-medium text-blue-400">Brand Identity</h3>
                  <p className="text-gray-400">Logo & style guides</p>
                </div>
                <div className="p-4 bg-gray-900/50 rounded-lg">
                  <h3 className="font-medium text-blue-400">Prototyping</h3>
                  <p className="text-gray-400">Interactive mockups</p>
                </div>
              </div>
            </div>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
}
