'use client';

import { useRef, useState, useEffect } from 'react';
import TypewriterComponent from 'typewriter-effect';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { ChevronDown } from 'lucide-react';

const GlowingButton = ({ children, href, primary = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link 
      href={href}
      className={`
        relative px-8 py-3 rounded-full text-lg font-medium
        ${primary ? 'bg-blue-600 text-white' : 'border-2 border-white text-white'}
        overflow-hidden group transition-all duration-300
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 animate-gradient" />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <motion.span 
        className="relative z-10"
        animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {children}
      </motion.span>
    </Link>
  );
};

const SocialIcon = ({ href, icon: Icon, delay }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left - rect.width / 2);
    mouseY.set(event.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative p-4 bg-white/5 rounded-full backdrop-blur-sm hover:bg-white/10 transition-colors"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.1 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-500/30 rounded-full"
        style={{
          x: useTransform(mouseX, [-20, 20], [-5, 5]),
          y: useTransform(mouseY, [-20, 20], [-5, 5]),
        }}
      />
      <Icon className="w-6 h-6 text-white relative z-10" />
    </motion.a>
  );
};

export default function Hero() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 300]),
    { stiffness: 100, damping: 30 }
  );

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Transform mouse motion values for parallax effect
  const videoX = useTransform(mouseX, [-1000, 1000], [-20, 20]);
  const videoY = useTransform(mouseY, [-1000, 1000], [-20, 20]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX - window.innerWidth / 2);
      mouseY.set(clientY - window.innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Video Background with Parallax */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: videoX,
          y: videoY,
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover opacity-50 scale-105"
        >
          <source src="/assets/videos/videobackground.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Dynamic Gradient Overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.5], [0.5, 0.8])
        }}
      />

      {/* Content */}
      <motion.div 
        className="container relative z-10 px-4 mx-auto text-center"
        style={{ y, opacity }}
      >
        <motion.div
          className="max-w-4xl mx-auto space-y-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Title with Glow Effect */}
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 text-white relative"
            whileHover={{ scale: 1.02 }}
          >
            <span className="relative">
              <span className="absolute -inset-1 blur-lg bg-gradient-to-r from-blue-500/30 to-purple-500/30" />
              Full Stack Developer
            </span>
          </motion.h1>
          
          {/* Enhanced Typewriter */}
          <motion.div 
            className="text-2xl md:text-4xl mb-8 h-20 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <TypewriterComponent
              options={{
                strings: [
                  'Database Architect',
                  'Frontend Developer',
                  'Backend Engineer',
                  'UI/UX Designer'
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 50,
                delay: 50,
              }}
            />
          </motion.div>

          {/* Description with Highlight Effect */}
          <motion.p 
            className="text-xl md:text-2xl mb-12 text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Transforming ideas into{' '}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-sm" />
              <span className="relative text-white">exceptional digital experiences</span>
            </span>
            {' '}with modern technologies and best practices.
          </motion.p>

          {/* Enhanced CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <GlowingButton href="#projects" primary>
              View My Work
            </GlowingButton>
            <GlowingButton href="#contact">
              Get in Touch
            </GlowingButton>
          </motion.div>

          {/* Social Icons with Enhanced Hover Effects */}
          <motion.div 
            className="flex justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <SocialIcon href="https://github.com" icon={FaGithub} delay={1.2} />
            <SocialIcon href="https://linkedin.com" icon={FaLinkedin} delay={1.3} />
            <SocialIcon href="https://twitter.com" icon={FaTwitter} delay={1.4} />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="w-8 h-8 text-white opacity-50" />
      </motion.div>
    </motion.section>
  );
}