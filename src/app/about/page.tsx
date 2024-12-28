'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Environment } from '@react-three/drei';
import * as random from 'maath/random';
import * as THREE from 'three';
import { FaCode, FaServer } from 'react-icons/fa';

// Types
interface SkillCardProps {
  title: string;
  skills: string[];
  color: string;
  icon: React.FC<{ className?: string }>;
}

interface StarFieldProps {
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}

// StarField component
function StarField({ mousePosition }: StarFieldProps) {
  const ref = useRef<THREE.Points>();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
      
      if (mousePosition.current) {
        ref.current.rotation.x += (mousePosition.current.x * delta) / 50;
        ref.current.rotation.y += (mousePosition.current.y * delta) / 50;
      }
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#fff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

// Skill card component
const SkillCard: React.FC<SkillCardProps> = ({ title, skills, color, icon: Icon }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.div
      ref={ref}
      className="p-6 rounded-xl backdrop-blur-lg"
      style={{
        background: `linear-gradient(135deg, ${color}10, ${color}20)`,
        border: `1px solid ${color}30`,
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${color}30` }}
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
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 200]),
    { stiffness: 100, damping: 30 }
  );
  
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.95, 0.9]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mousePosition.current = {
        x: (clientX - innerWidth / 2) / innerWidth,
        y: (clientY - innerHeight / 2) / innerHeight
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const skills = {
    frontend: ["React/Next.js", "TypeScript", "Tailwind CSS", "Three.js", "Framer Motion"],
    backend: ["Node.js", "Python", "MongoDB", "GraphQL", "AWS"],
  };

  return (
    <motion.div 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <StarField mousePosition={mousePosition} />
          <Environment preset="city" />
        </Canvas>
      </div>
      
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16">
          <motion.div 
            className="max-w-6xl mx-auto"
            style={{ y, opacity, scale }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-white mb-12 text-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.2 
              }}
            >
              About Me
            </motion.h1>
            
            <div className="grid md:grid-cols-2 gap-16 items-center">
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
                  Full Stack Developer & UI/UX Designer
                </motion.h2>
                
                <motion.p 
                  className="text-lg md:text-xl leading-relaxed text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  With over 5 years of experience in web development, I craft digital experiences 
                  that combine aesthetic beauty with technical excellence. My approach integrates 
                  cutting-edge technologies with user-centered design principles to create 
                  applications that not only function flawlessly but also delight users.
                </motion.p>

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
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}