'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Logo from './Logo';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg shadow-lg border-b border-gray-200/20'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className={`flex items-center ${
              scrolled ? 'text-blue-600' : 'text-white'
            }`}
          >
            <Logo />
          </Link>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2"
            aria-label="Toggle menu"
          >
            <svg
              className={`w-6 h-6 transition-colors duration-300 ${
                scrolled ? 'text-gray-800' : 'text-white'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop menu */}
          <div className="hidden lg:flex space-x-8">
            {[
              ['Home', '/'],
              ['About', '/about'],
              ['Services', '/services'],
              ['Projects', '/projects'],
              ['Blog', '/blog'],
              ['Contact', '/contact'],
            ].map(([name, path]) => (
              <Link
                key={path}
                href={path}
                className={`relative group ${
                  scrolled ? 'text-gray-800' : 'text-white'
                }`}
              >
                {name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? 'max-h-96 opacity-100 mt-4'
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className={`space-y-4 pt-4 pb-4 ${
            scrolled ? 'text-gray-800' : 'text-white'
          }`}>
            {[
              ['Home', '/'],
              ['About', '/about'],
              ['Services', '/services'],
              ['Projects', '/projects'],
              ['Blog', '/blog'],
              ['Contact', '/contact'],
            ].map(([name, path]) => (
              <Link
                key={path}
                href={path}
                className="block hover:text-blue-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
