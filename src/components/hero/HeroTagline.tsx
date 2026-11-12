'use client';

import React from 'react';
import Link from 'next/link';

export interface HeroTaglineProps {
  className?: string;
}

export default function HeroTagline({ className = '' }: HeroTaglineProps) {
  return (
    <div
      className={`relative z-30 mt-auto flex items-end justify-between px-6 pb-8 sm:px-10 sm:pb-10 md:px-16 md:pb-12 ${className}`}
    >
      {/* Bottom-Left: Clean 3-line role badge */}
      <div className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-slate-300 leading-relaxed">
        <p className="text-white">DATA CENTER IT TECHNICIAN</p>
        <p className="text-slate-400">@ AZINTELECOM &amp;</p>
        <p className="text-cyan-400 font-bold">FULL-STACK AI BUILDER</p>
      </div>

      {/* Bottom-Right: Glowing Pill Button */}
      <div>
        <Link
          href="#contact"
          className="group inline-flex items-center gap-3 rounded-full border border-cyan-500/40 bg-gradient-to-r from-cyan-500/10 via-sky-500/10 to-indigo-500/15 px-6 py-3.5 sm:px-8 sm:py-4 font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-white shadow-[0_0_25px_rgba(14,165,233,0.25)] backdrop-blur-md transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_35px_rgba(0,240,255,0.6)]"
        >
          <span>CONTACT ME</span>
          <span className="text-cyan-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-black">
            ↗
          </span>
        </Link>
      </div>
    </div>
  );
}
