'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Eye, Play, ExternalLink } from 'lucide-react';

export interface DualDeviceMockupProps {
  desktopImage1: string;
  desktopImage2?: string;
  mobileImage: string;
  liveUrl?: string;
  title: string;
  accentColor?: string;
}

export default function DualDeviceMockup({
  desktopImage1,
  desktopImage2,
  mobileImage,
  liveUrl,
  title,
  accentColor = 'rgba(14, 165, 233, 0.25)',
}: DualDeviceMockupProps) {
  const [isPreviewActive, setIsPreviewActive] = useState(false);

  return (
    <div className="relative w-full">
      {/* Optional Interactive Preview Toggle (When Live URL exists) */}
      {liveUrl && (
        <div className="mb-4 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => setIsPreviewActive(!isPreviewActive)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              isPreviewActive
                ? 'bg-cyan-400 text-black shadow-[0_0_20px_rgba(0,240,255,0.6)]'
                : 'border border-white/20 bg-white/5 text-slate-300 hover:border-cyan-400 hover:text-white'
            }`}
          >
            {isPreviewActive ? (
              <>
                <Eye className="h-3.5 w-3.5" />
                <span>SHOW SCREENSHOTS</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 text-cyan-400" />
                <span>INTERACTIVE LIVE PREVIEW</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Mode A: Live Interactive Iframe */}
      {isPreviewActive && liveUrl ? (
        <div className="relative h-[650px] w-full overflow-hidden rounded-2xl border border-white/15 bg-slate-950 shadow-2xl">
          {/* Top Browser Bar */}
          <div className="flex h-10 items-center justify-between border-b border-white/10 bg-[#070A10] px-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="font-mono text-xs text-slate-400 truncate max-w-md">
              {liveUrl}
            </div>
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-mono text-[11px] text-cyan-400 hover:underline"
            >
              <span>OPEN NEW TAB</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <iframe
            src={liveUrl}
            title={`${title} Live Preview`}
            className="h-[calc(100%-40px)] w-full border-none"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        </div>
      ) : (
        /* Mode B: Visual Showcase (2 Desktop Screenshots + 1 iPhone Mockup) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column (7 cols): Stacked Desktop Screenshots */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* Desktop Screen 1 */}
            <div className="group relative h-[260px] sm:h-[320px] md:h-[360px] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 shadow-2xl transition-all duration-300 hover:border-cyan-400/50">
              <Image
                src={desktopImage1}
                alt={`${title} Desktop View 1`}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <span className="absolute bottom-3 left-4 rounded-md bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-slate-300">
                DESKTOP INTERFACE
              </span>
            </div>

            {/* Desktop Screen 2 (if present) */}
            {desktopImage2 && (
              <div className="group relative h-[220px] sm:h-[260px] md:h-[300px] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 shadow-2xl transition-all duration-300 hover:border-cyan-400/50">
                <Image
                  src={desktopImage2}
                  alt={`${title} Desktop View 2`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-4 rounded-md bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-slate-300">
                  SYSTEM OVERVIEW / ARCHITECTURE
                </span>
              </div>
            )}
          </div>

          {/* Right Column (5 cols): Glowing Radial Container with Realistic iPhone Frame */}
          <div className="lg:col-span-5 flex justify-center py-4">
            <div className="relative flex items-center justify-center p-6 sm:p-8 w-full max-w-[360px]">
              {/* Radial Backdrop Glow */}
              <div
                className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-[80px] opacity-80 transition-opacity duration-300"
                style={{ background: accentColor }}
                aria-hidden="true"
              />

              {/* iPhone 16 Pro Realistic Chassis */}
              <div className="relative h-[560px] w-[275px] sm:h-[620px] sm:w-[300px] rounded-[48px] border-[10px] border-[#1e2330] bg-black shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden ring-1 ring-white/20">
                {/* Dynamic Island Pill */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 h-5 w-24 rounded-full bg-black flex items-center justify-end pr-2">
                  <div className="h-2 w-2 rounded-full bg-blue-950/80 ring-1 ring-blue-500/40" />
                </div>

                {/* Mobile UI Screenshot inside iPhone */}
                <div className="relative h-full w-full bg-slate-950 overflow-hidden">
                  <Image
                    src={mobileImage}
                    alt={`${title} Mobile View`}
                    fill
                    sizes="(max-width: 640px) 275px, 300px"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Bottom Home Indicator Bar */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 h-1 w-28 rounded-full bg-white/40" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
