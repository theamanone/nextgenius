import { siteConfig } from '@/config/site.config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Terms of Service - ${siteConfig.name}`,
  description: 'Terms of service and usage conditions for our web services.',
};

export default function Terms() {
  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-16 px-4 animate-fadeIn">
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-8">
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
        </div>
      </div>
    </main>
  );
}
