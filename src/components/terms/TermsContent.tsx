'use client';

import { MotionMain } from '@/components/motion/MotionMain';
import { MotionDiv } from '@/components/motion/MotionDiv';

export default function TermsContent() {
  return (
    <MotionMain 
      className="min-h-screen bg-black text-white pt-24 pb-16 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto max-w-4xl">
        <MotionDiv
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
              <h2 className="text-2xl font-semibold text-blue-400">1. Acceptance of Terms</h2>
              <p>
                By accessing and using our services, you agree to be bound by these Terms of Service.
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 space-y-4">
              <h2 className="text-2xl font-semibold text-blue-400">2. Services</h2>
              <p>
                We provide web development and design services as outlined in our service agreements.
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 space-y-4">
              <h2 className="text-2xl font-semibold text-blue-400">3. Intellectual Property</h2>
              <p>
                All intellectual property rights related to our services remain our property unless explicitly transferred.
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 space-y-4">
              <h2 className="text-2xl font-semibold text-blue-400">4. Contact Information</h2>
              <p>
                For any questions about these terms, please contact us at:
              </p>
              <p>Email: amankirmara143@gmail.com</p>
              <p>Phone: +91 (74970)52603</p>
            </div>
          </section>
        </MotionDiv>
      </div>
    </MotionMain>
  );
}
