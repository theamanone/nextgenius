'use client';

import { motion } from 'framer-motion';
import { FaCode, FaServer } from 'react-icons/fa';
import Image from 'next/image';

interface SkillCardProps {
  title: string;
  skills: string[];
  color: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

const SkillCard: React.FC<SkillCardProps> = ({ title, skills, color, icon: Icon }) => {
  return (
    <motion.div
      className="p-6 rounded-xl backdrop-blur-lg"
      style={{
        background: `linear-gradient(135deg, ${color}10, ${color}20)`,
        border: `1px solid ${color}30`,
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-6 h-6" style={{ color }} />
        <h3 className="font-semibold" style={{ color }}>
          {title}
        </h3>
      </div>
      <div className="space-y-2">
        {skills.map((skill, index) => (
          <motion.div
            key={skill}
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-sm text-gray-300">{skill}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default function About() {
  const skills = {
    frontend: ["React/Next.js", "TypeScript", "Tailwind CSS", "UI/UX Design", "Framer Motion"],
    backend: ["Node.js", "Python", "MongoDB", "GraphQL", "AWS"],
  };

  return (
    <motion.main 
      className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24 pb-16 md:pt-32 md:pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            About Us
          </h1>
          <p className="text-gray-300 max-w-3xl mb-12">
            With years of experience in web development, we craft digital experiences 
            that combine aesthetic beauty with technical excellence. Our approach integrates 
            cutting-edge technologies with user-centered design principles to create 
            applications that not only function flawlessly but also delight users.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl group"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 to-purple-500/30 z-10 
              group-hover:from-blue-500/40 group-hover:to-purple-500/40 transition-all duration-300" />
            <motion.div
              className="absolute inset-0 bg-black/30 z-20"
              whileHover={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
              <Image
                src="/assets/images/aman.jpg"
                alt="Profile"
                fill
                className="object-cover transform transition-transform duration-500 group-hover:scale-110"
                priority
              />
          </motion.div>
          
          <div className="space-y-8">
            <motion.h2 
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 
                bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Full Stack Development & Design Team
            </motion.h2>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <SkillCard
                title="Frontend"
                skills={skills.frontend}
                color="#60A5FA"
                icon={FaCode}
              />
              <SkillCard
                title="Backend"
                skills={skills.backend}
                color="#C084FC"
                icon={FaServer}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}