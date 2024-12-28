'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { FC } from 'react';

// Define types for common HTML elements
export type MotionDivProps = HTMLMotionProps<'div'>;
export type MotionArticleProps = HTMLMotionProps<'article'>;
export type MotionSpanProps = HTMLMotionProps<'span'>;
export type MotionHeadingProps = HTMLMotionProps<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>;
export type MotionParagraphProps = HTMLMotionProps<'p'>;

// Common animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Styled motion components
export const MotionDiv: FC<MotionDivProps> = motion.div;
export const MotionArticle: FC<MotionArticleProps> = motion.article;
export const MotionSection: FC<HTMLMotionProps<'section'>> = motion.section;
export const MotionHeader: FC<HTMLMotionProps<'header'>> = motion.header;
export const MotionSpan: FC<MotionSpanProps> = motion.span;
export const MotionH1: FC<MotionHeadingProps> = motion.h1;
export const MotionH2: FC<MotionHeadingProps> = motion.h2;
export const MotionH3: FC<MotionHeadingProps> = motion.h3;
export const MotionP: FC<MotionParagraphProps> = motion.p;

// Common animation props
export const defaultTransition = {
  type: "spring",
  stiffness: 200,
  damping: 20
};

// Animation presets
export const pageTransition = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: defaultTransition
};

export const cardHover = {
  scale: 1.02,
  transition: {
    type: "spring",
    stiffness: 300
  }
};
