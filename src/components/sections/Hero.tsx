'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import TypewriterComponent from 'typewriter-effect';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { ChevronDown } from 'lucide-react';
import { siteConfig } from '@/config/site.config';

const GlowingButton = ({ children, href, primary = false }:any) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link 
      href={href}
      className={`
        relative px-8 py-3 rounded-full text-lg font-medium w-full sm:w-auto
        ${primary ? 'bg-blue-600 text-white' : 'border-2 border-white text-white'}
        overflow-hidden group transition-all duration-300
        hover:scale-105 transform
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="relative z-10">{children}</span>
      {isHovered && (
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.5 }}
          exit={{ opacity: 0, scale: 2 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full h-full bg-blue-500 blur-xl rounded-full opacity-30" />
        </motion.div>
      )}
    </Link>
  );
};

const SocialIcon = ({ href, icon: Icon, delay }:any) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (event:any) => {
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
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const parallaxRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

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
  const videoX = useSpring(
    useTransform(mouseX, [-1000, 1000], [-20, 20]),
    { stiffness: 100, damping: 30 }
  );
  const videoY = useSpring(
    useTransform(mouseY, [-1000, 1000], [-20, 20]),
    { stiffness: 100, damping: 30 }
  );

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e:any) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(clientX - centerX);
      mouseY.set(clientY - centerY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <motion.section 
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ opacity }}
    >
      {/* Video Background with Enhanced Parallax */}
      <motion.div 
        ref={parallaxRef}
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{
          x: videoX,
          y: videoY,
          scale: 1.1,
        }}
      >

        {/* Video element */}
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-[120%] h-[120%] object-cover left-[-10%] top-[-10%] transform scale-110"
            style={{ 
              filter: 'brightness(0.7)  saturate(1.1)',
            }}
          >
            <source src="/assets/videos/videobackground.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Additional overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/40 z-10" />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-6"
            style={{
              textShadow: '0 0 20px rgba(79, 70, 229, 0.6), 0 0 40px rgba(79, 70, 229, 0.4)',
            }}
          >
            <TypewriterComponent
              options={{
                strings: [
                  'Crafting Digital Excellence',
                  'Building Enterprise Solutions',
                  'Creating Innovative Experiences',
                  `Empowering with ${siteConfig.name}`,
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 25,
                wrapperClassName: "bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300",
                cursorClassName: "text-indigo-500",
              }}
            />
          </motion.div>

          <motion.p
            className="text-lg sm:text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transforming ideas into exceptional digital experiences. We craft innovative solutions that drive success in the digital age.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <GlowingButton href="/contact" className="bg-blue-600/25">
              Get Started
            </GlowingButton>
            <GlowingButton href="/portfolio">
              View Portfolio
            </GlowingButton>
          </motion.div>

          {/* Social Icons */}
          <motion.div 
            className="flex justify-center gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <SocialIcon href="https://github.com" icon={FaGithub} delay={1.0} />
            <SocialIcon href="https://linkedin.com" icon={FaLinkedin} delay={1.1} />
            <SocialIcon href="https://twitter.com" icon={FaTwitter} delay={1.2} />
          </motion.div>

          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <ChevronDown className="w-8 h-8 mx-auto text-white/50 animate-bounce" />
          </motion.div>
        </div>
      </div>

     
    </motion.section>
  );
}