'use client';

import React from 'react';
import { ExternalLink, Github, Sparkles } from 'lucide-react';
import DualDeviceMockup from './DualDeviceMockup';

interface ProjectData {
  index: string;
  title: string;
  category: string;
  techStack: string;
  liveUrl?: string;
  githubUrl: string;
  desktop1: string;
  desktop2?: string;
  mobile: string;
  accentGlow: string;
  borderAccent: string;
  topOffset: string;
  zIndex: number;
}

const FEATURED_PROJECTS: ProjectData[] = [
  {
    index: '01',
    title: 'Solaris Energy',
    category: 'Clean-Tech & 3D Web Platform',
    techStack: 'Next.js 15 · Tailwind CSS · 3D Solar Matrix · Vercel Edge',
    liveUrl: 'https://solaris-energy-gadirlianar.vercel.app',
    githubUrl: 'https://github.com/gadirlianar/Solaris-Energy',
    desktop1: '/projects/solaris-desktop-1.png',
    desktop2: '/projects/solaris-desktop-2.png',
    mobile: '/projects/solaris-mobile.png',
    accentGlow: 'radial-gradient(circle, rgba(245,158,11,0.25) 0%, rgba(234,88,12,0.1) 70%, transparent 100%)',
    borderAccent: 'border-amber-500/30 hover:border-amber-400',
    topOffset: 'top-20',
    zIndex: 10,
  },
  {
    index: '02',
    title: 'Mochi-Puff 3D GPU Fur',
    category: 'WebGL & GPU Physics Simulation',
    techStack: 'Three.js · WebGL Shaders · Real-Time Physics · Interactive Canvas',
    liveUrl: 'https://3d-gpu-fur-simulation-nine.vercel.app',
    githubUrl: 'https://github.com/gadirlianar/puff-fur',
    desktop1: '/projects/puff-desktop-1.png',
    mobile: '/projects/puff-mobile.png',
    accentGlow: 'radial-gradient(circle, rgba(14,165,233,0.3) 0%, rgba(99,102,241,0.15) 70%, transparent 100%)',
    borderAccent: 'border-cyan-500/30 hover:border-cyan-400',
    topOffset: 'top-28',
    zIndex: 20,
  },
  {
    index: '03',
    title: 'Store-MA (MAVRIC)',
    category: 'Luxury Technical Footwear Commerce',
    techStack: 'React 19 · Next.js · Design System · Precision Engineering',
    githubUrl: 'https://github.com/gadirlianar/Store-MA',
    desktop1: '/projects/store-ma-1.png',
    desktop2: '/projects/store-ma-2.png',
    mobile: '/projects/store-ma-mobile.png',
    accentGlow: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(148,163,184,0.1) 70%, transparent 100%)',
    borderAccent: 'border-indigo-500/30 hover:border-indigo-400',
    topOffset: 'top-36',
    zIndex: 30,
  },
  {
    index: '04',
    title: 'Gadorm (AktauDorm)',
    category: 'Student Housing Marketplace',
    techStack: 'Full-Stack · Next.js · PostgreSQL · Real-Time Listings',
    liveUrl: 'https://gadorm.vercel.app',
    githubUrl: 'https://github.com/gadirlianar/Gadorm',
    desktop1: '/projects/gadorm-desktop-1.png',
    mobile: '/projects/gadorm-mobile.png',
    accentGlow: 'radial-gradient(circle, rgba(16,185,129,0.25) 0%, rgba(20,184,166,0.1) 70%, transparent 100%)',
    borderAccent: 'border-emerald-500/30 hover:border-emerald-400',
    topOffset: 'top-44',
    zIndex: 40,
  },
  {
    index: '05',
    title: 'Credit-XAI Benchmark',
    category: 'Explainable AI & IEEE Research',
    techStack: 'Python · TreeSHAP · LIME · IEEE Scientific Benchmark',
    githubUrl: 'https://github.com/gadirlianar/credit-xai-benchmark',
    desktop1: '/projects/xai-pareto.png',
    desktop2: '/projects/xai-predictive.png',
    mobile: '/projects/xai-deletion.png',
    accentGlow: 'radial-gradient(circle, rgba(168,85,247,0.25) 0%, rgba(236,72,153,0.1) 70%, transparent 100%)',
    borderAccent: 'border-purple-500/30 hover:border-purple-400',
    topOffset: 'top-52',
    zIndex: 50,
  },
];

export default function StackedProjectsDeck() {
  return (
    <section
      id="projects"
      aria-label="Featured Projects Section"
      className="relative z-20 -mt-10 rounded-t-[50px] md:rounded-t-[70px] bg-[#070b16] text-[#F8FAFC] py-28 sm:py-36 px-4 sm:px-8 md:px-14 lg:px-20 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-10">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-cyan-400">
                PORTFOLIO
              </span>
            </div>
            <h2 className="mt-2 font-kanit font-black uppercase tracking-tight text-5xl sm:text-7xl md:text-8xl text-white">
              SELECTED PROJECTS
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm sm:text-base text-slate-400 leading-relaxed">
            Real production web applications, 3D simulations, and research systems. Click any live project to explore directly.
          </p>
        </div>

        {/* Sticky Stacked Cards Container */}
        <div className="relative flex flex-col gap-16 pb-20">
          {FEATURED_PROJECTS.map((project) => (
            <div
              key={project.index}
              style={{ zIndex: project.zIndex }}
              className={`sticky ${project.topOffset} rounded-[32px] sm:rounded-[40px] border border-white/15 bg-[#0b101d]/95 p-6 sm:p-10 md:p-12 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-2xl transition-all duration-300 ${project.borderAccent}`}
            >
              {/* Card Top Bar */}
              <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/10 pb-6">
                {/* Left: Numeral + Title + Category */}
                <div className="flex items-center gap-5 sm:gap-8">
                  <span className="font-kanit font-black text-4xl sm:text-6xl text-slate-600">
                    {project.index}
                  </span>
                  <div>
                    <span className="block font-mono text-[11px] font-semibold uppercase tracking-widest text-cyan-400">
                      {project.category}
                    </span>
                    <h3 className="mt-1 font-kanit font-bold text-2xl sm:text-4xl text-white">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Right: Direct Clickable Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-2.5 sm:px-6 sm:py-3 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-black shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 hover:bg-white hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]"
                    >
                      <span>LIVE PROJECT</span>
                      <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  )}

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 sm:px-5 sm:py-3 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-300 transition-all duration-300 hover:border-white hover:bg-white/15 hover:text-white"
                  >
                    <Github className="h-4 w-4" />
                    <span>GITHUB</span>
                  </a>
                </div>
              </div>

              {/* Tech Stack Sub-Bar */}
              <div className="mb-6 flex items-center justify-between font-mono text-xs text-slate-400">
                <span className="tracking-wider uppercase text-slate-300 font-semibold">
                  STACK: {project.techStack}
                </span>
              </div>

              {/* Card Body: Dual Device Mockups (Desktop + iPhone) */}
              <DualDeviceMockup
                desktopImage1={project.desktop1}
                desktopImage2={project.desktop2}
                mobileImage={project.mobile}
                liveUrl={project.liveUrl}
                title={project.title}
                accentColor={project.accentGlow}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
