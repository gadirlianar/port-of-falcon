'use client';

import React from 'react';
import BrutalistHero from '@/components/hero/BrutalistHero';
import ScreensMarquee from '@/components/marquee/ScreensMarquee';
import InvertedBrutalistSection from '@/components/disciplines/InvertedBrutalistSection';
import StackedProjectsDeck from '@/components/projects/StackedProjectsDeck';
import DataCenterTelemetry from '@/components/telemetry/DataCenterTelemetry';
import XaiBenchmarkVisualizer from '@/components/xai/XaiBenchmarkVisualizer';
import FalconFooter from '@/components/navigation/FalconFooter';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#020617] text-[#F8FAFC] overflow-x-clip selection:bg-cyan-500 selection:text-black">
      {/* 1. Brutalist Editorial Hero Section */}
      <BrutalistHero />

      {/* 2. Double Infinite-Scroll Capabilities Marquee */}
      <ScreensMarquee />

      {/* 3. Inverted Brutalist High-Contrast Disciplines Card */}
      <InvertedBrutalistSection />

      {/* 4. Overlapping Stacked Projects Deck with Dual-Device Mockups */}
      <StackedProjectsDeck />

      {/* 5. AzInTelecom Tier III Live Operational Telemetry */}
      <DataCenterTelemetry />

      {/* 6. Interactive Explainable AI (XAI) Benchmark Visualizer */}
      <XaiBenchmarkVisualizer />

      {/* 7. Falcon Footer & Coordinates */}
      <FalconFooter />
    </main>
  );
}
