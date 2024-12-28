'use client';

import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Projects from '@/components/sections/Projects';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.main 
      className="relative bg-black text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <Services />
      <Projects />
    </motion.main>
  );
}