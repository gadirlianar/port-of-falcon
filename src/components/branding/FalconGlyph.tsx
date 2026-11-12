'use client';

import React from 'react';

export interface FalconGlyphProps {
  className?: string;
  size?: number;
}

export default function FalconGlyph({ className = 'w-6 h-6', size }: FalconGlyphProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-label="Falcon Insignia"
    >
      <defs>
        <linearGradient id="falconCyanGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00F0FF" />
          <stop offset="50%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
      </defs>

      {/* Center Aerodynamic Apex */}
      <polygon
        points="16,2 19,13 16,11 13,13"
        fill="url(#falconCyanGrad)"
      />

      {/* Primary Swept Wings (Brutalist Angular Lines) */}
      <polygon
        points="16,11 28,5 24,18 19,16"
        fill="url(#falconCyanGrad)"
        fillOpacity="0.9"
      />
      <polygon
        points="16,11 4,5 8,18 13,16"
        fill="url(#falconCyanGrad)"
        fillOpacity="0.9"
      />

      {/* Secondary Stepped Feathers (Cybernetic Vanes) */}
      <polygon
        points="19,16 26,22 21,23 17,19"
        fill="#38BDF8"
        fillOpacity="0.8"
      />
      <polygon
        points="13,16 6,22 11,23 15,19"
        fill="#38BDF8"
        fillOpacity="0.8"
      />

      {/* Tail Fin Stabilizer */}
      <polygon
        points="16,19 18,30 16,28 14,30"
        fill="url(#falconCyanGrad)"
      />
    </svg>
  );
}
