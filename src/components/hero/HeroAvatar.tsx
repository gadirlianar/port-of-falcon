'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export interface HeroAvatarProps {
  imageSrc?: string;
  altText?: string;
  className?: string;
}

export default function HeroAvatar({
  imageSrc = '/assets/anar-falcon-avatar.jpg',
  altText = 'Anar Gadirli — Falcon Era Avatar',
  className = '',
}: HeroAvatarProps) {
  const [currentSrc, setCurrentSrc] = useState(imageSrc);
  const [hasFallbackFailed, setHasFallbackFailed] = useState(false);

  const handleError = () => {
    if (currentSrc.endsWith('.jpg')) {
      setCurrentSrc('/assets/anar-falcon-avatar.svg');
    } else {
      setHasFallbackFailed(true);
    }
  };

  return (
    <div className={`relative aspect-square w-full select-none ${className}`}>
      {/* Ambient Cybernetic Cyan/Indigo Glow Halo */}
      <div
        className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-gradient-to-tr from-cyan-500/30 via-sky-400/20 to-indigo-600/30 blur-3xl opacity-75 animate-pulse"
        style={{ animationDuration: '4s' }}
        aria-hidden="true"
      />

      {/* Secondary Concentric Orbital Ring (High-Tech Falcon HUD motif) */}
      <div
        className="pointer-events-none absolute -inset-2 -z-10 rounded-full border border-cyan-500/15 opacity-50"
        aria-hidden="true"
      />

      {/* Dual Gradient Masked Container */}
      <div
        className="absolute inset-0"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, #000 75%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, #000 75%, transparent 100%)',
        }}
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)',
          }}
        >
          {!hasFallbackFailed ? (
            <Image
              src={currentSrc}
              alt={altText}
              fill
              priority
              sizes="(max-width: 640px) 270px, (max-width: 1024px) 440px, 540px"
              className="object-cover object-center scale-[1.02] filter contrast-[1.08] brightness-[0.98]"
              onError={handleError}
            />
          ) : (
            /* Procedural Vector Avatar Fallback */
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-slate-900 via-slate-950 to-[#020617] p-8 text-center border border-cyan-500/20 rounded-2xl">
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/30">
                  <svg className="h-10 w-10 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-cyan-300">
                  ANAR GADIRLI // FALCON
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
