'use client';

import React from 'react';
import HeroNav from './HeroNav';
import HeroAvatar from './HeroAvatar';
import MagneticParallax from './MagneticParallax';
import HeroTagline from './HeroTagline';

export interface BrutalistHeroProps {
  className?: string;
  name?: string;
  subtitle?: string;
}

export default function BrutalistHero({
  className = '',
  name = 'ANAR GADIRLI',
  subtitle = 'SYSTEMS ENGINEER • EXPLAINABLE AI RESEARCHER • DATA CENTER OPERATIONS',
}: BrutalistHeroProps) {
  return (
    <section
      aria-label="Hero Section"
      className={`relative flex min-h-screen h-[100dvh] w-full flex-col justify-between overflow-x-clip bg-[#020617] text-[#F8FAFC] select-none ${className}`}
    >
      {/* Background Subtle Cybernetic Grid / Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_40%,rgba(14,165,233,0.08)_0%,transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-20 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* Layer 30: Top Navigation & Status Pill */}
      <HeroNav />

      {/* Layer 10: Giant Editorial Brutalist Heading (Z-10) */}
      <div className="relative z-10 my-auto flex w-full flex-col items-center justify-center px-4 overflow-hidden pointer-events-none">
        <h1
          className="w-full text-center font-display font-black uppercase leading-[0.88] tracking-tighter whitespace-nowrap text-[13vw] sm:text-[14vw] md:text-[15.5vw] lg:text-[17.5vw] transition-transform duration-300"
          style={{
            background: 'linear-gradient(180deg, #646973 0%, #bbccd7 60%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
            textShadow: '0 20px 40px rgba(0,0,0,0.5)',
          }}
        >
          {name}
        </h1>

        <p className="mt-3 md:mt-4 text-center font-mono text-[10px] sm:text-xs md:text-sm tracking-[0.22em] sm:tracking-[0.3em] uppercase text-cyan-400/90 font-medium px-4">
          {subtitle}
        </p>
      </div>

      {/* Layer 20: Centerpiece Magnetic Avatar (Z-20) */}
      <div className="pointer-events-auto absolute left-1/2 top-1/2 z-20 w-[270px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[350px] sm:translate-y-0 md:w-[440px] lg:w-[500px] xl:w-[540px]">
        <MagneticParallax padding={150} strength={3}>
          <HeroAvatar />
        </MagneticParallax>
      </div>

      {/* Layer 30: Bottom Bar with Metadata & Falcon Era Tagline (Z-30) */}
      <HeroTagline />
    </section>
  );
}

export { BrutalistHero };
