import { motion } from 'framer-motion';

export default function WebDevelopment() {
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
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Full Stack Development</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>API Development & Integration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Database Design & Optimization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Cloud Infrastructure Setup</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-700/50 rounded-lg text-center">React</div>
                <div className="p-4 bg-gray-700/50 rounded-lg text-center">Next.js</div>
                <div className="p-4 bg-gray-700/50 rounded-lg text-center">Node.js</div>
                <div className="p-4 bg-gray-700/50 rounded-lg text-center">TypeScript</div>
                <div className="p-4 bg-gray-700/50 rounded-lg text-center">MongoDB</div>
                <div className="p-4 bg-gray-700/50 rounded-lg text-center">PostgreSQL</div>
                <div className="p-4 bg-gray-700/50 rounded-lg text-center">AWS</div>
                <div className="p-4 bg-gray-700/50 rounded-lg text-center">Docker</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
