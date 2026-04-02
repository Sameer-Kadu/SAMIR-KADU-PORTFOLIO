'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
}

const isTouchDevice = () =>
  typeof window !== "undefined" && navigator.maxTouchPoints > 0;

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className,
  href,
  target,
  rel,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, setIsHovered] = useState(false);
  const isTouch = isTouchDevice();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 300, damping: 20, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set((e.clientX - left - width / 2) * 0.2);
    y.set((e.clientY - top - height / 2) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  // On touch devices skip spring physics — just render a plain anchor
  if (isTouch) {
    return (
      <a href={href} target={target} rel={rel} className={className}>
        {children}
      </a>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={className}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </motion.a>
    </motion.div>
  );
};

export default MagneticButton;
