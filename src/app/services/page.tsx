'use client';

import { useState } from 'react';
import { FaCode, FaPaintBrush, FaMobile, FaServer, FaDatabase, FaRocket } from 'react-icons/fa';

export default function Services() {
  const [activeService, setActiveService] = useState<number | null>(null);

  const services = [
    {
      icon: <FaCode className="w-8 h-8" />,
      title: 'Web Development',
      description: 'Custom web applications built with modern frameworks like React and Next.js.',
      details: [
        'Single Page Applications (SPA)',
        'Progressive Web Apps (PWA)',
        'Responsive Design',
        'Performance Optimization'
      ]
    },
    {
      icon: <FaPaintBrush className="w-8 h-8" />,
      title: 'UI/UX Design',
      description: 'Beautiful and intuitive user interfaces that enhance user experience.',
      details: [
        'User Interface Design',
        'User Experience Design',
        'Wireframing & Prototyping',
        'Design Systems'
      ]
    },
    {
      icon: <FaMobile className="w-8 h-8" />,
      title: 'Mobile Development',
      description: 'Cross-platform mobile applications using React Native.',
      details: [
        'iOS Development',
        'Android Development',
        'Cross-platform Solutions',
        'Mobile-first Design'
      ]
    },
    {
      icon: <FaServer className="w-8 h-8" />,
      title: 'Backend Development',
      description: 'Robust and scalable server-side solutions with Node.js.',
      details: [
        'API Development',
        'Server Architecture',
        'Authentication & Authorization',
        'Microservices'
      ]
    },
    {
      icon: <FaDatabase className="w-8 h-8" />,
      title: 'Database Design',
      description: 'Efficient database architecture and management.',
      details: [
        'Database Architecture',
        'Data Modeling',
        'Query Optimization',
        'Data Migration'
      ]
    },
    {
      icon: <FaRocket className="w-8 h-8" />,
      title: 'DevOps',
      description: 'Continuous integration and deployment pipelines.',
      details: [
        'CI/CD Pipelines',
        'Cloud Infrastructure',
        'Performance Monitoring',
        'Security Implementation'
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
          My Services
        </h1>
        <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
          Comprehensive solutions for your digital needs, from concept to deployment
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              onMouseEnter={() => setActiveService(index)}
              onMouseLeave={() => setActiveService(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="text-blue-400 mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-300 mb-4">{service.description}</p>
                
                <div className={`space-y-2 transition-all duration-300 ${
                  activeService === index ? 'opacity-100 max-h-48' : 'opacity-0 max-h-0'
                } overflow-hidden`}>
                  {service.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-400 flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's work together to bring your ideas to life with cutting-edge technology and design.
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}
