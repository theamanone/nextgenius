'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/config/site.config';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const navLinks = [
    { 
      href: '/', 
      label: 'Home' 
    },
    { 
      href: '/about', 
      label: 'About',
      dropdownItems: [
        { label: 'About Me', href: '/about' },
        { label: 'Our Team', href: '/about/team' },
        { label: 'Our Mission', href: '/about/mission' },
        { label: 'Our Vision', href: '/about/vision' },
      ]
    },
    { 
      href: '/services', 
      label: 'Services',
      dropdownItems: [
        { href: '/services/web', label: 'Web Development' },
        { href: '/services/mobile', label: 'Mobile Apps' },
        { href: '/services/design', label: 'UI/UX Design' },
      ]
    },
    { 
      href: '/marketplace', 
      label: 'Marketplace',
      dropdownItems: [
        { href: '/marketplace?category=templates', label: 'Templates' },
        { href: '/marketplace?category=custom', label: 'Custom Solutions' },
        { href: '/marketplace', label: 'All Products' },
      ]
    },
    { 
      href: '/projects', 
      label: 'Projects' 
    },
    { 
      href: '/contact', 
      label: 'Contact' 
    },
  ];

  return (
    <header 
      className={`sticky top-0 w-full z-[100] transition-all duration-300 ${
        scrolled || isOpen || activeDropdown 
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/5' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between relative">
          <motion.div
            initial={false}
            animate={{ scale: isOpen ? 0.95 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <Link href="/" className="flex items-center space-x-2 hover:scale-105 transition-transform">
              <Logo />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">
                <motion.div
                  className="px-4 py-2"
                  onHoverStart={() => link.dropdownItems && setActiveDropdown(link.href)}
                  onHoverEnd={() => link.dropdownItems && setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`text-sm font-medium transition-all hover:text-blue-400 group-hover:scale-105 inline-flex items-center ${
                      pathname === link.href 
                        ? 'text-blue-400' 
                        : 'text-gray-200'
                    }`}
                  >
                    {link.label}
                    {link.dropdownItems && (
                      <svg 
                        className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                          activeDropdown === link.href ? 'rotate-180' : ''
                        }`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {link.dropdownItems && (
                    <AnimatePresence>
                      {activeDropdown === link.href && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          className="absolute top-full left-0 mt-2 py-2 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl min-w-[200px] overflow-hidden"
                        >
                          {link.dropdownItems.map((item, index) => (
                            <motion.div
                              key={item.href}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="relative"
                            >
                              <Link
                                href={item.href}
                                className={`block px-4 py-2 text-sm hover:bg-blue-500/10 transition-colors ${
                                  pathname === item.href 
                                    ? 'text-blue-400 bg-blue-500/5' 
                                    : 'text-gray-200'
                                }`}
                              >
                                {item.label}
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </motion.div>
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden w-12 h-12 flex items-center justify-center rounded-full bg-blue-500/10 hover:bg-blue-500/20 transition-colors z-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <motion.span 
                className="w-full h-0.5 bg-blue-400 absolute origin-center"
                animate={{ 
                  top: isOpen ? "50%" : "0%",
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? "-50%" : "0"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
              <motion.span 
                className="w-full h-0.5 bg-blue-400 absolute top-1/2 -translate-y-1/2"
                animate={{ 
                  opacity: isOpen ? 0 : 1,
                  x: isOpen ? 20 : 0
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
              <motion.span 
                className="w-full h-0.5 bg-blue-400 absolute origin-center"
                animate={{ 
                  bottom: isOpen ? "50%" : "0%",
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? "50%" : "0"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            </div>
          </motion.button>

          {/* Mobile Navigation - Full Screen */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: "spring", stiffness: 200, damping: 40 }}
                className="fixed inset-x-0 top-0 min-h-screen bg-gradient-to-b from-black/95 via-black/90 to-black/95 backdrop-blur-lg md:hidden"
                style={{ paddingTop: '5rem' }}
              >
                <div className="h-full flex flex-col px-6">
                  {/* Profile Section */}
                  <div className="text-center mb-8 pt-4">
                    <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                    >
                      Full Stack Developer
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-gray-400 mt-2"
                    >
                      Frontend Dev
                    </motion.p>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-gray-300 mt-4 text-sm max-w-md mx-auto"
                    >
                      Transforming Ideas into exceptional digital experiences with modern technologies and best practices.
                    </motion.p>
                  </div>

                  {/* Navigation Links */}
                  <motion.div 
                    className="flex flex-col space-y-4"
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={{
                      open: {
                        transition: { staggerChildren: 0.1 }
                      },
                      closed: {
                        transition: { staggerChildren: 0.05, staggerDirection: -1 }
                      }
                    }}
                  >
                    {navLinks.map((link) => (
                      <motion.div
                        key={link.href}
                        variants={{
                          open: { 
                            x: 0, 
                            opacity: 1
                          },
                          closed: { 
                            x: -20, 
                            opacity: 0
                          }
                        }}
                        className="group"
                      >
                        <Link
                          href={link.href}
                          className={`block text-xl font-semibold transition-all ${
                            pathname === link.href 
                              ? 'text-blue-400' 
                              : 'text-gray-200 hover:text-blue-400'
                          }`}
                        >
                          {link.label}
                        </Link>
                        {link.dropdownItems && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="ml-4 mt-2 space-y-2"
                          >
                            {link.dropdownItems.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className={`block text-sm font-medium transition-all ${
                                  pathname === item.href 
                                    ? 'text-blue-400' 
                                    : 'text-gray-400 hover:text-blue-400'
                                }`}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>

             
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
}
