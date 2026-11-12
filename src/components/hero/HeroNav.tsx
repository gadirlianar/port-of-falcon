'use client';

import React from 'react';
import Link from 'next/link';
import FalconGlyph from '../branding/FalconGlyph';

export interface HeroNavProps {
  className?: string;
}

export default function HeroNav({ className = '' }: HeroNavProps) {
  const navItems = [
    { label: 'ABOUT', href: '#about' },
    { label: 'TELEMETRY', href: '#telemetry' },
    { label: 'XAI', href: '#xai' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <header
      className={`relative z-30 flex items-center justify-between px-6 pt-6 sm:px-8 sm:pt-8 md:px-12 md:pt-10 ${className}`}
    >
      {/* Brand Identity & Live Status */}
      <div className="flex items-center gap-3 md:gap-4">
        <Link
          href="/"
          className="group flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
        >
          <FalconGlyph className="h-6 w-6 text-cyan-400 transition-transform duration-300 group-hover:scale-110 group-hover:text-cyan-300" />
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 group-hover:text-white transition-colors">
            ANAR GADIRLI <span className="text-cyan-400">//</span> PORT OF FALCON
          </span>
        </Link>

        {/* Live AzInTelecom Tier III Telemetry Status Pill */}
        <div
          className="hidden lg:flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[10px] tracking-wider text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
          title="Tier III Data Center Infrastructure Nominal SLA"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span>AZINTELECOM TIER III · NOMINAL</span>
        </div>
      </div>

      {/* Navigation Anchor Links */}
      <nav aria-label="Main Navigation">
        <ul className="flex items-center gap-4 sm:gap-6 md:gap-8 font-mono text-xs md:text-sm uppercase tracking-wider text-[#D7E2EA]">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="relative py-1 text-slate-300 transition-colors hover:text-cyan-400 focus-visible:text-cyan-400 outline-none group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
