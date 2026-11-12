'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useSpring } from 'framer-motion';

export interface MagneticParallaxProps {
  children: React.ReactNode;
  padding?: number;     // Active magnetic bounding radius in pixels (default 150)
  strength?: number;    // Divisor for mouse delta (higher = subtler movement, default 3)
  maxOffset?: number;   // Maximum translation clamp in pixels (default 45)
  className?: string;
}

export default function MagneticParallax({
  children,
  padding = 150,
  strength = 3,
  maxOffset = 45,
  className = '',
}: MagneticParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // High-performance Framer Motion springs for 60/120fps organic movement
  const springConfig = { damping: 20, stiffness: 160, mass: 0.6 };
  const springX = useSpring(0, springConfig);
  const springY = useSpring(0, springConfig);

  // Detect touch screens to prevent event listener overhead or sticky touch jumps
  useEffect(() => {
    const checkTouch = () => {
      const isTouch =
        window.matchMedia('(hover: none)').matches ||
        window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window;
      setIsTouchDevice(isTouch);
    };

    checkTouch();
    const mediaQuery = window.matchMedia('(hover: none)');
    mediaQuery.addEventListener?.('change', checkTouch);
    return () => mediaQuery.removeEventListener?.('change', checkTouch);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isTouchDevice || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Define bounding capture zone with padding
      const minX = rect.left - padding;
      const maxX = rect.right + padding;
      const minY = rect.top - padding;
      const maxY = rect.bottom + padding;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      if (mouseX >= minX && mouseX <= maxX && mouseY >= minY && mouseY <= maxY) {
        // Cursor is within magnetic field
        const deltaX = (mouseX - centerX) / strength;
        const deltaY = (mouseY - centerY) / strength;

        // Clamp to maximum allowed displacement
        const clampedX = Math.max(-maxOffset, Math.min(maxOffset, deltaX));
        const clampedY = Math.max(-maxOffset, Math.min(maxOffset, deltaY));

        springX.set(clampedX);
        springY.set(clampedY);
      } else {
        // Cursor is outside magnetic field -> return smoothly to center
        springX.set(0);
        springY.set(0);
      }
    },
    [isTouchDevice, padding, strength, maxOffset, springX, springY]
  );

  const handleMouseLeave = useCallback(() => {
    springX.set(0);
    springY.set(0);
  }, [springX, springY]);

  useEffect(() => {
    if (isTouchDevice) return;

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isTouchDevice, handleMouseMove, handleMouseLeave]);

  if (isTouchDevice) {
    // Render static centered element without transform listeners on touch devices
    return <div className={`relative ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      ref={containerRef}
      style={{
        x: springX,
        y: springY,
      }}
      className={`relative will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
