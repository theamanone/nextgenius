import { useEffect, useState } from 'react';
import TypewriterComponent from 'typewriter-effect';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to WebGeniusCraft
        </h1>
        
        <div className="text-xl md:text-3xl mb-8 h-16">
          <TypewriterComponent
            options={{
              strings: ['Web Developer', 'Graphics Designer', 'Web Designer'],
              autoStart: true,
              loop: true,
              delay: 75,
              deleteSpeed: 50,
            }}
          />
        </div>
        
        <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto">
          Transforming ideas into stunning digital experiences. We create beautiful,
          functional, and user-friendly websites that help businesses grow.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-colors duration-300"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 text-white px-8 py-3 rounded-full transition-colors duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
