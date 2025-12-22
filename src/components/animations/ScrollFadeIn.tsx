'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollFadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  threshold?: number;
}

const ScrollFadeIn = ({ 
  children, 
  delay = 0, 
  duration = 0.6, 
  direction = 'up',
  className = '',
  threshold = 0.1
}: ScrollFadeInProps) => {
  const directionOffset = 40;
  
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? directionOffset : direction === 'down' ? -directionOffset : 0,
      x: direction === 'left' ? directionOffset : direction === 'right' ? -directionOffset : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollFadeIn;