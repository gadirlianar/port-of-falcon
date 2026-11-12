'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export interface HeroAvatarProps {
  imageSrc?: string;
  altText?: string;
  className?: string;
}

export default function HeroAvatar({
  imageSrc = '/assets/steve-jobs.jpg',
  altText = 'Steve Jobs — Port of Falcon Placeholder',
  className = '',
}: HeroAvatarProps) {
  const [currentSrc, setCurrentSrc] = useState(imageSrc);
  const [hasFallbackFailed, setHasFallbackFailed] = useState(false);

  const handleError = () => {
    if (currentSrc.includes('steve-jobs')) {
      setCurrentSrc('/assets/anar-falcon-avatar.svg');
    } else {
      setHasFallbackFailed(true);
    }
  };

  return (
    <div className={`relative h-[65vh] max-h-[640px] w-full max-w-[480px] mx-auto select-none ${className}`}>
      {/* Ambient Cybernetic / Dark Blue Glow Halo behind portrait */}
      <div
        className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-gradient-to-t from-cyan-500/25 via-sky-500/15 to-indigo-600/20 blur-3xl opacity-80"
        aria-hidden="true"
      />

      {/* Seamless Portrait Container with zero harsh edges */}
      <div
        className="relative h-full w-full"
        style={{
          WebkitMaskImage:
            'linear-gradient(to bottom, #000 60%, transparent 98%), radial-gradient(ellipse at center, #000 50%, transparent 95%)',
          maskImage:
            'linear-gradient(to bottom, #000 60%, transparent 98%), radial-gradient(ellipse at center, #000 50%, transparent 95%)',
        }}
      >
        {!hasFallbackFailed ? (
          <Image
            src={currentSrc}
            alt={altText}
            fill
            priority
            sizes="(max-width: 640px) 320px, (max-width: 1024px) 440px, 480px"
            className="object-contain object-bottom filter contrast-[1.05] brightness-[1.02]"
            onError={handleError}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-slate-900 to-[#020617] p-8 text-center border border-cyan-500/20 rounded-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-300">
              ANAR GADIRLI // PORT OF FALCON
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
