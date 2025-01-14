'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Suspense } from 'react';

const teamMembers = [
  {
    name: 'Aman',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1470&auto=format&fit=crop',
    bio: 'Visionary leader with expertise in web development and business strategy. Driving innovation in digital solutions.',
  },
  {
    name: 'Ashwani',
    role: 'CTO & Lead Developer',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1374&auto=format&fit=crop',
    bio: 'Full-stack developer extraordinaire with a passion for creating scalable and efficient solutions.',
  },
  {
    name: 'Priya Sharma',
    role: 'UI/UX Design Lead',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1376&auto=format&fit=crop',
    bio: 'Creative professional specializing in user-centric design and exceptional digital experiences.',
  },
  {
    name: 'Riya Patel',
    role: 'Project Manager',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1374&auto=format&fit=crop',
    bio: 'Expert in project management and client relations, ensuring smooth delivery of all projects.',
  },
];

function TeamMemberSkeleton() {
  return (
    <div className="bg-gray-900/50 rounded-xl p-6 animate-pulse">
      <div className="w-32 h-32 bg-gray-800 rounded-full mx-auto mb-4"/>
      <div className="h-6 bg-gray-800 rounded w-3/4 mx-auto mb-2"/>
      <div className="h-4 bg-gray-800 rounded w-1/2 mx-auto mb-4"/>
      <div className="h-20 bg-gray-800 rounded w-full"/>
    </div>
  );
}

export default function Team() {
  return (
    <motion.main 
      className="min-h-screen bg-black text-white pt-24 pb-16 md:pt-32 md:pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Our Team
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Meet the talented individuals who make our vision a reality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Suspense fallback={
            <>
              {[...Array(3)].map((_, i) => (
                <TeamMemberSkeleton key={i} />
              ))}
            </>
          }>
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50 hover:border-blue-500/50 transition-colors"
              >
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">{member.name}</h3>
                <p className="text-blue-400 text-center mb-4">{member.role}</p>
                <p className="text-gray-300 text-center">{member.bio}</p>
              </motion.div>
            ))}
          </Suspense>
        </div>
      </div>
    </motion.main>
  );
}
