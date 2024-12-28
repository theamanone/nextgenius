'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { FaCode, FaPaintBrush, FaMobileAlt, FaSearch, FaShoppingCart, FaServer } from 'react-icons/fa';
import { Service } from '@/types';

const services: Service[] = [
  {
    icon: FaCode,
    title: 'Web Development',
    description: 'Custom web applications built with modern technologies and best practices.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: FaPaintBrush,
    title: 'Web Design',
    description: 'Beautiful, responsive designs that provide the best user experience.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: FaMobileAlt,
    title: 'Mobile-First Design',
    description: 'Websites optimized for all devices, ensuring a seamless experience.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: FaSearch,
    title: 'SEO Optimization',
    description: 'Improve your website\'s visibility and ranking in search engines.',
    color: 'from-orange-500 to-yellow-500'
  },
  {
    icon: FaShoppingCart,
    title: 'E-Commerce Solutions',
    description: 'Custom online stores with secure payment integration.',
    color: 'from-red-500 to-rose-500'
  },
  {
    icon: FaServer,
    title: 'Web Hosting',
    description: 'Reliable hosting solutions with excellent uptime and support.',
    color: 'from-indigo-500 to-violet-500'
  }
];

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
        style={{ 
          background: `linear-gradient(to right, var(--${service.color.split(' ')[1]}, var(--${service.color.split(' ')[3]}))` 
        }} 
      />
      <motion.div 
        className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-xl 
                   hover:border-white/20 transition-all duration-300"
        whileHover={{ y: -5 }}
      >
        <div className="relative z-10">
          <motion.div
            className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center bg-gradient-to-r ${service.color}`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <service.icon className="text-2xl text-white" />
          </motion.div>
          <motion.h3 
            className="text-xl font-semibold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            whileHover={{ x: 5 }}
          >
            {service.title}
          </motion.h3>
          <motion.p 
            className="text-gray-400"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.2 + 0.3 }}
          >
            {service.description}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Services() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="services" className="relative py-32 bg-black">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0.5]) }}
      />
      
      <motion.div 
        ref={containerRef}
        className="container mx-auto px-4 relative z-10"
        style={{ opacity }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r 
                     from-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          Our Services
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 text-center max-w-2xl mx-auto mb-16"
        >
          We offer comprehensive web development and design services to help your business
          succeed in the digital world.
        </motion.p>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
