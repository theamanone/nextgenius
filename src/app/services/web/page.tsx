'use client';

import { motion } from 'framer-motion';
import { Suspense } from 'react';
import Image from 'next/image';

function ServiceSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="h-8 bg-gray-800 rounded w-3/4"/>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-64 bg-gray-800 rounded"/>
        ))}
      </div>
    </div>
  );
}

const services = [
  {
    title: 'Custom Web Applications',
    description: 'Tailored web solutions built with cutting-edge technologies to meet your specific business needs.',
    icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/react.svg'
  },
  {
    title: 'E-commerce Solutions',
    description: 'Scalable and secure online stores with seamless payment integration and inventory management.',
    icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/shopify.svg'
  },
  {
    title: 'Progressive Web Apps',
    description: 'Fast, reliable, and engaging web applications that work offline and feel like native apps.',
    icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/pwa.svg'
  },
  {
    title: 'API Development',
    description: 'Robust and scalable APIs that power your applications and enable seamless integration.',
    icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/postman.svg'
  }
];

export default function WebDevelopment() {
  return (
    <motion.main 
      className="min-h-screen bg-black text-white pt-24 pb-16 md:pt-32 md:pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <Suspense fallback={<ServiceSkeleton />}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Web Development Services
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Creating powerful, scalable, and beautiful web applications using modern technologies and best practices.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50 hover:border-blue-500/50 transition-all group"
              >
                <div className="relative w-16 h-16 mb-6">
                  <Image
                    src={service.icon}
                    alt={service.title}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-blue-400">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-16 bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50"
          >
            <h2 className="text-2xl font-semibold mb-6 text-blue-400">Our Development Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {['Planning', 'Design', 'Development', 'Launch'].map((step, index) => (
                <div key={step} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-400 font-bold">{index + 1}</span>
                  </div>
                  <h3 className="font-semibold mb-2">{step}</h3>
                </div>
              ))}
            </div>
          </motion.section>
        </Suspense>
      </div>
    </motion.main>
  );
}
