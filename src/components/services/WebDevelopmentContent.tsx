'use client';

import { motion } from 'framer-motion';

export default function WebDevelopmentContent() {
  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Web Development</h1>
          <p className="text-gray-400 text-lg mb-8">
            Building robust, scalable, and high-performance web applications.
          </p>
          
          <div className="grid gap-8">
            <div className="bg-gray-800/50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Development Services</h2>
              <ul className="space-y-4">
                <li>
                  <h3 className="text-xl font-medium text-blue-400">Full-Stack Development</h3>
                  <p className="text-gray-400">End-to-end web application development using modern technologies and frameworks.</p>
                </li>
                <li>
                  <h3 className="text-xl font-medium text-blue-400">API Development</h3>
                  <p className="text-gray-400">Design and implementation of robust RESTful APIs and microservices.</p>
                </li>
                <li>
                  <h3 className="text-xl font-medium text-blue-400">Database Design</h3>
                  <p className="text-gray-400">Efficient database architecture and optimization for scalable applications.</p>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Technologies</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-900/50 rounded-lg">
                  <h3 className="font-medium text-blue-400">Frontend</h3>
                  <p className="text-gray-400">React, Next.js, Vue.js</p>
                </div>
                <div className="p-4 bg-gray-900/50 rounded-lg">
                  <h3 className="font-medium text-blue-400">Backend</h3>
                  <p className="text-gray-400">Node.js, Python, Java</p>
                </div>
                <div className="p-4 bg-gray-900/50 rounded-lg">
                  <h3 className="font-medium text-blue-400">Database</h3>
                  <p className="text-gray-400">MongoDB, PostgreSQL</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
