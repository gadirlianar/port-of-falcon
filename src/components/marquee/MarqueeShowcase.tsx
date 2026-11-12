'use client';

import React from 'react';
import Image from 'next/image';

interface ProjectScreen {
  id: string;
  title: string;
  category: string;
  image: string;
  link: string;
  isLive?: boolean;
}

const ROW_1_SCREENS: ProjectScreen[] = [
  {
    id: 'solaris-1',
    title: 'Solaris Energy',
    category: 'Interactive 3D Clean Energy',
    image: '/projects/solaris-desktop-1.png',
    link: 'https://solaris-energy-gadirlianar.vercel.app',
    isLive: true,
  },
  {
    id: 'puff-1',
    title: 'Mochi-Puff 3D',
    category: 'WebGL GPU Fur Physics',
    image: '/projects/puff-desktop-1.png',
    link: 'https://3d-gpu-fur-simulation-nine.vercel.app',
    isLive: true,
  },
  {
    id: 'store-ma-1',
    title: 'Store-MA (MAVRIC)',
    category: 'Luxury Footwear Storefront',
    image: '/projects/store-ma-1.png',
    link: 'https://github.com/gadirlianar/Store-MA',
  },
  {
    id: 'gadorm-1',
    title: 'Gadorm (AktauDorm)',
    category: 'Student Housing Platform',
    image: '/projects/gadorm-desktop-1.png',
    link: 'https://gadorm.vercel.app',
    isLive: true,
  },
  {
    id: 'lulukay-1',
    title: 'Lulukay Chocolate',
    category: 'Artisanal Confectionery E-Commerce',
    image: '/projects/lulukay-catalog.png',
    link: 'https://github.com/gadirlianar/lulukay-chocolate1',
  },
  {
    id: 'store-ma-3',
    title: 'MAVRIC Technical Specs',
    category: 'Product Engineering System',
    image: '/projects/store-ma-3.png',
    link: 'https://github.com/gadirlianar/Store-MA',
  },
];

const ROW_2_SCREENS: ProjectScreen[] = [
  {
    id: 'solaris-2',
    title: 'Solaris Solar Architecture',
    category: 'Next-Gen Renewable UI',
    image: '/projects/solaris-desktop-2.png',
    link: 'https://solaris-energy-gadirlianar.vercel.app',
    isLive: true,
  },
  {
    id: 'store-ma-2',
    title: 'Store-MA Foundry',
    category: 'Production Material Testing',
    image: '/projects/store-ma-2.png',
    link: 'https://github.com/gadirlianar/Store-MA',
  },
  {
    id: 'xai-pareto',
    title: 'Credit-XAI Pareto Frontier',
    category: 'IEEE Explainable AI Benchmark',
    image: '/projects/xai-pareto.png',
    link: 'https://github.com/gadirlianar/credit-xai-benchmark',
  },
  {
    id: 'lulukay-hero',
    title: 'Lulukay Chocolatier',
    category: 'Luxury Packaging & Visual Identity',
    image: '/projects/lulukay-hero.jpg',
    link: 'https://github.com/gadirlianar/lulukay-chocolate1',
  },
  {
    id: 'xai-predictive',
    title: 'TreeSHAP Attribution',
    category: 'Credit Risk Interpretability',
    image: '/projects/xai-predictive.png',
    link: 'https://github.com/gadirlianar/credit-xai-benchmark',
  },
  {
    id: 'store-ma-mobile',
    title: 'Store-MA Mobile Matrix',
    category: 'Responsive Commerce UX',
    image: '/projects/store-ma-mobile.png',
    link: 'https://github.com/gadirlianar/Store-MA',
  },
];

export default function MarqueeShowcase() {
  return (
    <section
      aria-label="Screens Showcase"
      className="relative w-full overflow-hidden bg-[#070b16] py-16 md:py-24"
    >
      {/* Section Sub-Header */}
      <div className="mb-10 px-6 sm:px-10 md:px-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
          <h2 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-slate-400">
            SCREENS FROM MY PROJECTS &amp; ENGINEERING LAB
          </h2>
        </div>
        <span className="hidden sm:block font-mono text-xs text-slate-500 uppercase tracking-widest">
          INTERACTIVE SNAPSHOTS · CLICK TO VIEW
        </span>
      </div>

      {/* Row 1: Leftward Scrolling */}
      <div className="group relative flex w-full overflow-hidden py-3">
        <div className="flex gap-6 animate-marquee-left group-hover:[animation-play-state:paused]">
          {[...ROW_1_SCREENS, ...ROW_1_SCREENS].map((item, idx) => (
            <ScreenCard key={`${item.id}-${idx}`} item={item} />
          ))}
        </div>
      </div>

      {/* Row 2: Rightward Scrolling */}
      <div className="group relative mt-6 flex w-full overflow-hidden py-3">
        <div className="flex gap-6 animate-marquee-right group-hover:[animation-play-state:paused]">
          {[...ROW_2_SCREENS, ...ROW_2_SCREENS].map((item, idx) => (
            <ScreenCard key={`${item.id}-${idx}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ScreenCard({ item }: { item: ProjectScreen }) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group/card relative block h-[220px] w-[340px] sm:h-[250px] sm:w-[390px] md:h-[270px] md:w-[430px] flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 shadow-2xl transition-all duration-300 hover:border-cyan-400/60 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(14,165,233,0.3)]"
    >
      {/* Real Project UI Screenshot */}
      <div className="relative h-full w-full">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 340px, (max-width: 1024px) 390px, 430px"
          className="object-cover object-top transition-transform duration-500 group-hover/card:scale-105"
        />
      </div>

      {/* Gradient Overlay for Readability on Hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 transition-opacity duration-300 group-hover/card:opacity-95" />

      {/* Card Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
        <div>
          <span className="block font-mono text-[10px] font-semibold uppercase tracking-widest text-cyan-400">
            {item.category}
          </span>
          <h3 className="mt-1 font-kanit font-bold text-lg sm:text-xl text-white tracking-wide">
            {item.title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {item.isLive && (
            <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 font-mono text-[9px] font-bold text-emerald-400 uppercase tracking-wider">
              LIVE
            </span>
          )}
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-transform duration-300 group-hover/card:bg-cyan-400 group-hover/card:text-black group-hover/card:rotate-45">
            ↗
          </span>
        </div>
      </div>
    </a>
  );
}
