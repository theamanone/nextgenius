import { siteConfig } from '@/config/site.config';
import { Metadata } from 'next';
import { motion } from 'framer-motion';

export const metadata: Metadata = {
  title: `Privacy Policy - ${siteConfig.name}`,
  description: `Privacy Policy and data handling practices for ${siteConfig.name} services.`,
}

export default function PrivacyPolicy() {
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
            Privacy Policy
          </h1>

          <section className="space-y-4 text-gray-300">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 space-y-4">
              <h2 className="text-2xl font-semibold text-blue-400">Information We Collect</h2>
              <p>
                We collect information you provide directly to us when using our services, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Contact information (name, email, phone number)</li>
                <li>Project requirements and specifications</li>
                <li>Communication preferences</li>
              </ul>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 space-y-4">
              <h2 className="text-2xl font-semibold text-blue-400">How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and improve our services</li>
                <li>Communicate with you about your projects</li>
                <li>Send updates about our services</li>
                <li>Respond to your requests and inquiries</li>
              </ul>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 space-y-4">
              <h2 className="text-2xl font-semibold text-blue-400">Information Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information.
                However, no method of transmission over the internet is 100% secure.
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 space-y-4">
              <h2 className="text-2xl font-semibold text-blue-400">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p>Email: amankirmara143@gmail.com</p>
              <p>Phone: +91 (74970)52603</p>
            </div>
          </section>
        </motion.div>
      </div>
    </motion.main>
  );
}
