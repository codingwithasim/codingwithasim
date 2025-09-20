'use client';

import { useEffect, useState } from 'react';

interface AdvancedTextEffectProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function AdvancedTextEffect({ text, className = '', delay = 0 }: AdvancedTextEffectProps) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      let currentIndex = 0;
      const chars = text.split('');
      
      const typeInterval = setInterval(() => {
        if (currentIndex < chars.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsComplete(true);
          clearInterval(typeInterval);
        }
      }, 50 + Math.random() * 50); // Variable typing speed for human feel

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay]);

  return (
    <span className={`${className} ${isComplete ? 'animate-pulse' : ''}`}>
      {displayText}
      {!isComplete && (
        <span className="inline-block w-0.5 h-1em bg-current ml-1 animate-pulse" />
      )}
    </span>
  );
}