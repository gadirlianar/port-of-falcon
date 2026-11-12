'use client';

import React from 'react';
import HeroNav from './HeroNav';
import HeroAvatar from './HeroAvatar';
import HeroTagline from './HeroTagline';

export interface BrutalistHeroProps {
  className?: string;
  name?: string;
}

export default function BrutalistHero({
  className = '',
  name = "HI, I'M ANAR",
}: BrutalistHeroProps) {
  return (
    <section
      aria-label="Hero Section"
      className={`relative flex min-h-[100dvh] h-[100dvh] w-full flex-col justify-between overflow-hidden bg-[#070b16] text-[#F8FAFC] select-none ${className}`}
    >
      {/* Background Subtle Cybernetic Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(14,165,233,0.12)_0%,transparent_75%)]"
        aria-hidden="true"
      />

      {/* Layer 30: Top Navigation (ABOUT, SERVICES, PROJECTS, CONTACT) */}
      <HeroNav />

      {/* Layer 10: Giant Display Title at the TOP (Under Nav, Never Collides with Avatar) */}
      <div className="relative z-10 w-full px-4 pt-2 sm:pt-4 md:pt-6 pointer-events-none text-center">
        <h1
          className="w-full font-kanit font-black uppercase leading-[0.82] tracking-tighter whitespace-nowrap text-[15vw] sm:text-[16vw] md:text-[17vw] lg:text-[18vw]"
          style={{
            background: 'linear-gradient(180deg, #FFFFFF 0%, #CBD5E1 45%, #64748B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
            textShadow: '0 10px 30px rgba(0,0,0,0.6)',
          }}
        >
          {name}
        </h1>
      </div>

      {/* Layer 20: Center Portrait Grounded at the Bottom */}
      <div className="pointer-events-auto absolute bottom-0 left-1/2 z-20 w-[300px] -translate-x-1/2 sm:w-[380px] md:w-[460px] lg:w-[520px] xl:w-[560px]">
        <HeroAvatar />
      </div>

      {/* Layer 30: Bottom Bar with 3-line Role and Contact Pill Button */}
      <HeroTagline />
    </section>
  );
}

export { BrutalistHero };
