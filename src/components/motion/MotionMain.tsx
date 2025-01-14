'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';

type MotionMainProps = HTMLMotionProps<'main'>;

export const MotionMain = forwardRef<HTMLElement, MotionMainProps>((props, ref) => {
  return <motion.main ref={ref} {...props} />;
});
