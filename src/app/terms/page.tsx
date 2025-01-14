import { siteConfig } from '@/config/site.config';
import { Metadata } from 'next';
import { motion } from 'framer-motion';

export const metadata: Metadata = {
  title: `Terms of Service - ${siteConfig.name}`,
  description: `Terms of Service and conditions for using ${siteConfig.name} services.`,
}

export default function TermsOfService() {
  return (
    <motion.main 
      className="min-h-screen bg-black text-white pt-24 pb-16 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-8">
            Terms of Service
          </h1>

          <section className="space-y-4 text-gray-300">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 space-y-4">
              <h2 className="text-2xl font-semibold text-blue-400">1. Services</h2>
              <p>
                WebGeniusCraft provides web development, design, and related digital services.
                By engaging our services, you agree to these terms and conditions.
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 space-y-4">
              <h2 className="text-2xl font-semibold text-blue-400">2. Project Terms</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Project timelines will be agreed upon at the start of each project</li>
                <li>Payment terms and milestones will be clearly defined</li>
                <li>Changes to project scope may affect timeline and cost</li>
                <li>Final deliverables subject to full payment</li>
              </ul>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 space-y-4">
              <h2 className="text-2xl font-semibold text-blue-400">3. Intellectual Property</h2>
              <p>
                Upon full payment, clients receive full rights to the final deliverables.
                WebGeniusCraft retains rights to showcase the work in our portfolio.
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 space-y-4">
              <h2 className="text-2xl font-semibold text-blue-400">4. Communication</h2>
              <p>
                Clear and timely communication is essential. We will provide regular updates
                and expect prompt feedback to maintain project timelines.
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 space-y-4">
              <h2 className="text-2xl font-semibold text-blue-400">5. Contact</h2>
              <p>For any questions about these terms, please contact us:</p>
              <p>Email: amankirmara143@gmail.com</p>
              <p>Phone: +91 (74970)52603</p>
            </div>
          </section>
        </motion.div>
      </div>
    </motion.main>
  );
}
