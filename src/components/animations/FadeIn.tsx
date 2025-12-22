'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

const FadeIn = ({ 
  children, 
  delay = 0, 
  duration = 0.6, 
  direction = 'up',
  className = ''
}: FadeInProps) => {
  const directionOffset = 30;
  
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
      animate="visible"
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

export default FadeIn;