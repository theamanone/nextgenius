import { motion } from 'framer-motion';

export default function WebDesign() {
  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <motion.div
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
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>User Research and Analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Wireframing and Prototyping</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Visual Design and Branding</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Responsive Design Implementation</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Technologies We Use</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-700/50 rounded-lg text-center">Figma</div>
                <div className="p-4 bg-gray-700/50 rounded-lg text-center">Adobe XD</div>
                <div className="p-4 bg-gray-700/50 rounded-lg text-center">Sketch</div>
                <div className="p-4 bg-gray-700/50 rounded-lg text-center">HTML5</div>
                <div className="p-4 bg-gray-700/50 rounded-lg text-center">CSS3</div>
                <div className="p-4 bg-gray-700/50 rounded-lg text-center">JavaScript</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
