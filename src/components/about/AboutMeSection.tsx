'use client';

import React from 'react';
import Link from 'next/link';
import { Server, Sparkles, Cpu, Layers } from 'lucide-react';

export default function AboutMeSection() {
  return (
    <section
      id="about"
      aria-label="About Me Section"
      className="relative w-full overflow-hidden bg-[#070b16] py-28 md:py-36 px-6 sm:px-10 md:px-16"
    >
      {/* Background Ambient Radial Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Giant Display Title */}
        <div className="text-center">
          <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-cyan-400">
            ENGINEERING PHILOSOPHY
          </span>
          <h2
            className="mt-3 font-kanit font-black uppercase tracking-tight text-5xl sm:text-7xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500"
          >
            ABOUT ME
          </h2>
        </div>

        {/* Floating 3D Dark-Glass Highlights (4 Corners) */}
        <div className="my-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="group rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/40 hover:bg-slate-900/80 hover:-translate-y-1 shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform">
              <Server className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-kanit font-bold text-lg text-white">Tier III Operations</h3>
            <p className="mt-1 font-mono text-xs text-slate-400 leading-relaxed">
              AzInTelecom mission-critical data center infrastructure &amp; optical fiber networks.
            </p>
          </div>

          <div className="group rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-md transition-all duration-300 hover:border-sky-500/40 hover:bg-slate-900/80 hover:-translate-y-1 shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 group-hover:scale-110 transition-transform">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-kanit font-bold text-lg text-white">Full-Stack &amp; WebGL</h3>
            <p className="mt-1 font-mono text-xs text-slate-400 leading-relaxed">
              Production web applications, Three.js 3D physics, and high-conversion e-commerce.
            </p>
          </div>

          <div className="group rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-md transition-all duration-300 hover:border-indigo-500/40 hover:bg-slate-900/80 hover:-translate-y-1 shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform">
              <Cpu className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-kanit font-bold text-lg text-white">Explainable AI (XAI)</h3>
            <p className="mt-1 font-mono text-xs text-slate-400 leading-relaxed">
              IEEE research benchmarks, TreeSHAP, and post-hoc credit risk model interpretability.
            </p>
          </div>

          <div className="group rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/40 hover:bg-slate-900/80 hover:-translate-y-1 shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
              <Layers className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-kanit font-bold text-lg text-white">Systems Automation</h3>
            <p className="mt-1 font-mono text-xs text-slate-400 leading-relaxed">
              Autonomous workflows, containerized architectures, and relentless zero-downtime execution.
            </p>
          </div>
        </div>

        {/* Concise Large Bio Statement */}
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-kanit text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed text-slate-300">
            Operating at the intersection of <span className="text-white font-bold">physical data center systems</span>,{' '}
            <span className="text-cyan-400 font-bold">scalable web architecture</span>, and{' '}
            <span className="text-indigo-400 font-bold">transparent machine learning</span>.
            I turn complex technical challenges into robust, production-grade solutions.
          </p>

          <div className="mt-10 flex justify-center">
            <Link
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-white backdrop-blur-md transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]"
            >
              <span>GET IN TOUCH</span>
              <span className="text-cyan-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-black">
                ↗
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
