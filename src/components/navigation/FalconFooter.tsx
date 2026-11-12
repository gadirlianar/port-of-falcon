'use client';

import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Shield, Terminal } from 'lucide-react';
import FalconGlyph from '../branding/FalconGlyph';

export default function FalconFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      aria-label="Footer & Direct Coordinates"
      className="relative z-50 w-full bg-[#020617] border-t border-white/10 px-6 py-16 sm:px-10 sm:py-20 md:px-14 lg:px-20 text-[#F8FAFC] select-none"
    >
      <div className="mx-auto max-w-7xl">
        {/* Top Quote & Slogan Box */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#0B0F19] to-[#04060A] p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.1)_0%,transparent_70%)]" />

          <FalconGlyph className="mx-auto h-12 w-12 text-cyan-400 mb-6 drop-shadow-[0_0_15px_rgba(14,165,233,0.5)]" />

          <blockquote className="mx-auto max-w-3xl font-display text-xl sm:text-2xl md:text-3xl font-extrabold italic tracking-tight text-white leading-snug">
            &ldquo;You met me in the Falcon era of my life — where every challenge becomes altitude.&rdquo;
          </blockquote>

          <cite className="mt-4 block font-mono text-xs uppercase tracking-[0.25em] text-cyan-400 font-semibold not-italic">
            — Anar Gadirli
          </cite>
        </div>

        {/* Links & Coordinates Row */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-b border-white/10 pb-12">
          {/* Identity & Department */}
          <div className="space-y-1">
            <h3 className="font-display text-xl font-black uppercase text-white tracking-tight">
              Anar Gadirli
            </h3>
            <p className="font-mono text-xs text-slate-400">
              Junior Data Center IT Technician
            </p>
            <p className="font-mono text-[11px] text-cyan-400">
              Data Center Infrastructure Department @ AzInTelecom
            </p>
          </div>

          {/* Social Links (Clean, Zero-Redundancy) */}
          <div className="flex flex-wrap items-center justify-start md:justify-center gap-4">
            <a
              href="https://linkedin.com/in/gadirlianar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-400/50 hover:bg-cyan-500/10 px-4 py-2 font-mono text-xs font-semibold text-slate-200 hover:text-white transition-all"
            >
              <Linkedin className="h-4 w-4 text-cyan-400" />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://github.com/gadirlianar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:border-indigo-400/50 hover:bg-indigo-500/10 px-4 py-2 font-mono text-xs font-semibold text-slate-200 hover:text-white transition-all"
            >
              <Github className="h-4 w-4 text-indigo-400" />
              <span>GitHub</span>
            </a>

            <a
              href="mailto:anargadirli55@gmail.com"
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:border-red-400/50 hover:bg-red-500/10 px-4 py-2 font-mono text-xs font-semibold text-slate-200 hover:text-white transition-all"
            >
              <Mail className="h-4 w-4 text-red-400" />
              <span>Email</span>
            </a>
          </div>

          {/* Back to Top */}
          <div className="flex justify-start md:justify-end">
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 hover:bg-white/20 px-4 py-2 font-mono text-xs font-bold text-white transition-all hover:scale-105 active:scale-95"
            >
              <span>TOP OF PAGE</span>
              <ArrowUp className="h-4 w-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-slate-500 font-mono text-[11px] gap-4">
          <div>
            © {new Date().getFullYear()} Anar Gadirli · Port of Falcon · Baku, Azerbaijan (UTC+04:00)
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>AZINTELECOM TIER III · ALL SYSTEMS NOMINAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
