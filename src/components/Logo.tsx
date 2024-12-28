'use client';

import { motion } from 'framer-motion';
import { HTMLMotionProps } from 'framer-motion';

// Define the styled motion components with proper typing
const StyledMotionDiv = motion.div as any;
const StyledMotionSpan = motion.span as any;

export default function Logo() {
  return (
    <StyledMotionDiv
      className="flex items-center space-x-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Modern abstract icon */}
      <StyledMotionDiv
        className="relative w-10 h-10 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
      >
        {/* Background circle with gradient */}
        <StyledMotionDiv
          className="absolute w-full h-full bg-gradient-to-tr from-indigo-600 via-blue-500 to-cyan-400 rounded-xl"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Abstract 'W' shape */}
        <StyledMotionDiv
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 text-white"
            fill="currentColor"
          >
            <path d="M2 6L6 20L12 6L18 20L22 6" 
                  strokeWidth="2.5"
                  className="stroke-white fill-none"
                  style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
            />
          </svg>
        </StyledMotionDiv>

        {/* Animated overlay elements */}
        <StyledMotionDiv
          className="absolute top-0 left-0 w-2 h-2 bg-white rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <StyledMotionDiv
          className="absolute bottom-0 right-0 w-2 h-2 bg-white rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </StyledMotionDiv>

      {/* Text part */}
      <div className="flex flex-col">
        <StyledMotionSpan
          className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent tracking-tight"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          WebGeniusCraft
        </StyledMotionSpan>
        <StyledMotionSpan
          className="text-xs text-gray-600 dark:text-gray-400 font-medium"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Creative Development Solutions
        </StyledMotionSpan>
      </div>
    </StyledMotionDiv>
  );
}