'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { Project } from '@/types';

const projects: Project[] = [
  {
    id: 1,
    title: 'Restaurant Website',
    description: 'Modern restaurant website with online ordering system',
    image: '/assets/images/OneErrorImage.png',
    tech: ['Next.js', 'TailwindCSS', 'MongoDB'],
    github: '#',
    demo: '#',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    title: 'Social Media App',
    description: 'Full-stack social media application with real-time features',
    image: '/assets/images/OneErrorImage.png',
    tech: ['React', 'Node.js', 'Socket.io'],
    github: '#',
    demo: '#',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 3,
    title: 'Real Estate Platform',
    description: 'Property listing and management platform',
    image: '/assets/images/OneErrorImage.png',
    tech: ['Next.js', 'Prisma', 'PostgreSQL'],
    github: '#',
    demo: '#',
    color: 'from-green-500 to-emerald-500'
  }
];

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true });
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.2
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative bg-white/5 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
        style={{ 
          background: `linear-gradient(to right, var(--${project.color.split(' ')[1]}, var(--${project.color.split(' ')[3]}))` 
        }}
      />
      
      <div className="relative h-48 w-full overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 z-10"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: isHovered ? 0 : 0.6 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="relative h-full"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority={project.id === 1}
          />
        </motion.div>
      </div>
      
      <motion.div 
        className="p-6 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
      >
        <motion.h3 
          className="text-xl font-semibold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          whileHover={{ x: 5 }}
        >
          {project.title}
        </motion.h3>
        <motion.p 
          className="text-gray-300 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {project.description}
        </motion.p>
        
        <motion.div 
          className="flex flex-wrap gap-2 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {project.tech.map((tech, techIndex) => (
            <motion.span
              key={tech}
              className="px-3 py-1 text-sm bg-white/5 backdrop-blur-sm rounded-full border border-white/10"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + techIndex * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
        
        <motion.div 
          className="flex gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.a
            href={project.github}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg 
                     transition-all duration-300 backdrop-blur-sm group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub className="text-lg" />
            <span>GitHub</span>
          </motion.a>
          <motion.a
            href={project.demo}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg 
                     transition-all duration-300 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaExternalLinkAlt className="text-lg" />
            <span>Live Demo</span>
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default function Projects() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="projects" className="relative py-32 overflow-hidden bg-black">
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
          Featured Projects
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 text-center max-w-2xl mx-auto mb-16"
        >
          Explore some of my recent works showcasing modern web development techniques 
          and creative solutions.
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
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
