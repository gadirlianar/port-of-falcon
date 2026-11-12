'use client';

import React from 'react';
import BrutalistHero from '@/components/hero/BrutalistHero';
import MarqueeShowcase from '@/components/marquee/MarqueeShowcase';
import AboutMeSection from '@/components/about/AboutMeSection';
import CoreDisciplines from '@/components/disciplines/CoreDisciplines';
import StackedProjectsDeck from '@/components/projects/StackedProjectsDeck';
import FalconFooter from '@/components/navigation/FalconFooter';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#070b16] text-[#F8FAFC] overflow-x-clip selection:bg-cyan-400 selection:text-black">
      {/* 1. Brutalist Editorial Hero Section (Kanit 900 Display + Grounded Portrait) */}
      <BrutalistHero />

      {/* 2. Real Project Screens Marquee (Dual-Lane Counter-Scrolling Screenshots) */}
      <MarqueeShowcase />

      {/* 3. About Me Section (3D Tech Cards + Concise Philosophy) */}
      <AboutMeSection />

      {/* 4. Services High-Contrast White Sheet (Minimalist 01-04 Rows) */}
      <CoreDisciplines />

      {/* 5. Sticky Stacked Projects Deck (Desktop + iPhone Mockups & Live Links) */}
      <StackedProjectsDeck />

      {/* 6. Falcon Footer & Coordinates */}
      <FalconFooter />
    </main>
  );
}
