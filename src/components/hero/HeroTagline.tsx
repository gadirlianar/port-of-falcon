'use client';

import React from 'react';

export interface HeroTaglineProps {
  className?: string;
  tagline?: string;
  location?: string;
  facility?: string;
}

export default function HeroTagline({
  className = '',
  tagline = 'You met me in the Falcon era of my life — where every challenge becomes altitude.',
  location = 'BAKU, AZERBAIJAN // 40.4093° N, 49.8671° E',
  facility = 'AZINTELECOM LLC // DATA CENTER INFRASTRUCTURE',
}: HeroTaglineProps) {
  return (
    <footer
      className={`relative z-30 mt-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 px-6 pb-6 sm:px-8 sm:pb-8 md:px-12 md:pb-10 ${className}`}
    >
      {/* Left: Facility & Telemetry Credentials */}
      <div className="max-w-[320px] font-mono text-[11px] sm:text-xs uppercase leading-relaxed text-slate-400">
        <div className="flex items-center gap-2 text-cyan-400 font-bold mb-0.5 tracking-wider">
          <span className="inline-block h-1.5 w-1.5 bg-cyan-400 rounded-sm" />
          <span>{facility}</span>
        </div>
        <p className="text-slate-400 tracking-wide text-[10px] sm:text-[11px]">
          TIER III UPTIME &bull; OPTICAL FIBER INTEGRITY &bull; {location}
        </p>
      </div>

      {/* Right: Signature Falcon Era Tagline Quote */}
      <div className="max-w-[320px] sm:max-w-[420px] md:max-w-[480px] text-left sm:text-right font-light leading-snug tracking-wide text-[#D7E2EA]">
        <blockquote className="italic text-xs sm:text-sm text-slate-200">
          &ldquo;{tagline}&rdquo;
        </blockquote>
        <cite className="not-italic block mt-1 font-mono text-[10px] tracking-widest text-cyan-400/80 uppercase">
          &mdash; ANAR GADIRLI
        </cite>
      </div>
    </footer>
  );
}
