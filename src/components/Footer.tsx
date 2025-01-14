'use client';

import Link from 'next/link';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { siteConfig } from '@/config/site.config';
import StarfieldBackground from './StarfieldBackground';
import { IconBase } from 'react-icons';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const services = [
    { name: 'Web Design', href: '/services/web-design' },
    { name: 'Web Development', href: '/services/web-development' },
    { name: 'Digital Marketing', href: '/services/digital-marketing' },
    { name: 'UI/UX Design', href: '/services/ui-ux-design' },
  ];

  return (
    <footer className="w-full text-gray-300 relative">
      <StarfieldBackground className="absolute inset-0 z-0" />
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Location */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500/5">
                <FaMapMarkerAlt className="text-2xl text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-1">Find Us</h2>
                <p className="text-gray-400">Hisar, Haryana India</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500/10">
                <FaPhone className="text-2xl text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Call Us</h2>
                <a href="tel:7497052603" className="text-gray-400 hover:text-blue-400 transition-colors">
                  {siteConfig.author.phone}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500/10">
                <FaEnvelope className="text-2xl text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Email Us</h2>
                <a href={`mailto:${siteConfig.author.email}`} className="text-gray-400 hover:text-blue-400 transition-colors">
                  {siteConfig.author.email}
                </a>
              </div>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8 border-t border-gray-800/50">
            {/* About */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold mb-4">{siteConfig.name}</h3>
              <p className="text-gray-400 mb-4">
                {siteConfig.description}
              </p>
              <div className="flex space-x-4">
              {Object.entries(siteConfig.links).map(([platform, url]) => {
                  if (['twitter', 'github', 'linkedin'].includes(platform)) {
                    const Icon = {
                      twitter: FaTwitter,
                      github: FaFacebook,
                      linkedin: FaLinkedin
                    }[platform];
                    return (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800/50 hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 transition-all duration-300"
                      >
                        {Icon && <Icon className="text-xl" />}
                      </a>
                    );
                  }
                  return null;
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-blue-400 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="text-gray-400 hover:text-blue-400 transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-blue-400 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service.href}>
                    <Link 
                      href={service.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-8">
            <div className="container mx-auto px-4 py-6">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
              </p>
              <div className="flex space-x-4 text-sm">
                <Link href="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={handleScrollToTop}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors"
        aria-label="Scroll to top"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </footer>
  );
}
