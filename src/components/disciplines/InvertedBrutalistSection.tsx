'use client';

import React from 'react';
import { Server, Cpu, Globe, ArrowUpRight, CheckCircle2, Shield, Activity, HardDrive } from 'lucide-react';

interface Discipline {
  id: string;
  number: string;
  tag: string;
  title: string;
  institution: string;
  description: string;
  icon: React.ElementType;
  highlights: string[];
  metrics: { label: string; value: string }[];
  accent: string;
}

const DISCIPLINES: Discipline[] = [
  {
    id: 'dc-ops',
    number: '01',
    tag: 'MISSION-CRITICAL INFRASTRUCTURE',
    title: 'Data Center Operations & Systems Telemetry',
    institution: 'Data Center Infrastructure Department @ AzInTelecom',
    description:
      'Operating inside the certified Tier III Data Center environment at AzInTelecom. Responsible for enterprise server physical maintenance, optical fiber cabling, TIA/EIA compliant rack deployment, and 24/7 environmental telemetry.',
    icon: Server,
    highlights: [
      'Rack-level physical hardware diagnostics, memory/drive hot-swaps, and IPMI management',
      'Structured cabling: Single-Mode/Multi-Mode fiber optic routing & low-loss termination (<0.15 dB)',
      'Environmental thermal management: Cold/hot aisle containment (20.8°C–21.5°C, 45%–48% RH)',
      'High-availability power distribution (PDU monitoring, UPS switchover verification, PUE ~1.28)',
    ],
    metrics: [
      { label: 'Uptime SLA Target', value: '99.982%' },
      { label: 'Optical Link Loss', value: '< 0.12 dB' },
      { label: 'Facility Tier', value: 'Tier III Certified' },
    ],
    accent: '#0EA5E9',
  },
  {
    id: 'xai-ml',
    number: '02',
    tag: 'EMPIRICAL RESEARCH & DATA SCIENCE',
    title: 'Explainable AI (XAI) & Credit Risk Modeling',
    institution: 'Lead Researcher · credit-xai-benchmark',
    description:
      'Benchmarking post-hoc interpretability frameworks on high-stakes tabular financial credit scoring. Investigating game-theoretic feature attribution fidelity, computational complexity, and regulatory compliance.',
    icon: Cpu,
    highlights: [
      'Comparative benchmarking of TreeSHAP, KernelSHAP, and Integrated Gradients against LightGBM and XGBoost',
      'Local vs global attribution fidelity metrics and empirical stability under feature perturbations',
      'Compliance with modern explainability mandates (EU AI Act, GDPR Art. 22 Right to Explanation)',
      'Interactive risk evaluation prototypes visualizing non-linear credit score decision surfaces',
    ],
    metrics: [
      { label: 'Benchmark AUROC', value: '0.892' },
      { label: 'SHAP Fidelity', value: '0.984' },
      { label: 'Attribution Speed', value: '18x Faster' },
    ],
    accent: '#6366F1',
  },
  {
    id: 'agentic-web',
    number: '03',
    tag: 'AUTONOMOUS SYSTEMS & MODERN WEB',
    title: 'Next-Gen Full-Stack & Agentic Engineering',
    institution: 'Autonomous Architect · Falcon Ecosystem',
    description:
      'Building production-ready, ultra-responsive digital applications powered by modern frontend architectures (Next.js 15, TypeScript, Tailwind) and accelerated by autonomous agentic vibe-coding workflows.',
    icon: Globe,
    highlights: [
      'Server-driven App Router architectures with zero client-waterfall data fetching',
      'Bespoke fluid animations with Framer Motion, canvas graphics, and responsive layouts',
      'Deep mastery of agentic development: Claude Code, Google Antigravity, and Cursor AI',
      'End-to-end type safety, automated verification suites, and zero-defect deployments',
    ],
    metrics: [
      { label: 'Lighthouse Score', value: '100 / 100' },
      { label: 'Bundle Footprint', value: '< 85 KB' },
      { label: 'Deploy Cadence', value: 'Instant CD' },
    ],
    accent: '#0F172A',
  },
];

export default function InvertedBrutalistSection() {
  return (
    <section
      id="disciplines"
      aria-label="Core Engineering Disciplines"
      className="relative z-20 -mt-10 md:-mt-16 w-full rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-white text-slate-950 px-6 py-16 sm:px-10 sm:py-20 md:px-14 md:py-24 lg:px-20 select-none shadow-[0_-25px_60px_rgba(0,0,0,0.4)]"
    >
      {/* Top Header Row */}
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-slate-900 pb-8 gap-6">
          <div>
            <div className="flex items-center gap-2.5 font-mono text-xs font-bold tracking-[0.25em] uppercase text-cyan-600">
              <span className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
              ENGINEERING DISCIPLINES
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-950 font-display">
              Physical Rigor. <br className="hidden sm:block" />
              Algorithmic Depth.
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
              Bridging the gap between physical Tier III enterprise infrastructure at{' '}
              <strong className="text-slate-900 font-semibold">AzInTelecom</strong> and advanced{' '}
              <strong className="text-slate-900 font-semibold">Explainable AI</strong> research,
              synthesized into high-performance software systems.
            </p>
          </div>
        </div>

        {/* Disciplines Grid / Stack */}
        <div className="mt-12 md:mt-16 divide-y-2 divide-slate-200">
          {DISCIPLINES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 py-12 md:py-16 transition-colors duration-300 hover:bg-slate-50/70 -mx-6 sm:-mx-10 md:-mx-14 lg:-mx-20 px-6 sm:px-10 md:px-14 lg:px-20"
              >
                {/* Left Column: Number & Title */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-4xl sm:text-5xl font-black text-slate-300 group-hover:text-slate-950 transition-colors">
                        {item.number}
                      </span>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 group-hover:bg-slate-950 group-hover:text-white transition-all duration-300 shadow-sm">
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>

                    <div className="mt-6">
                      <span className="font-mono text-[11px] font-bold tracking-widest uppercase text-cyan-600">
                        {item.tag}
                      </span>
                      <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-950 font-display tracking-tight leading-tight">
                        {item.title}
                      </h3>
                      <p className="mt-2 font-mono text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {item.institution}
                      </p>
                    </div>
                  </div>

                  {/* Metrics Badge Chips */}
                  <div className="mt-8 grid grid-cols-3 gap-3 border-t border-slate-200 pt-6">
                    {item.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="flex flex-col">
                        <span className="font-display text-lg sm:text-xl font-black text-slate-950">
                          {metric.value}
                        </span>
                        <span className="font-mono text-[10px] uppercase text-slate-500 tracking-wider">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Description & Highlights */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-sans">
                    {item.description}
                  </p>

                  <div className="mt-6 sm:mt-8 space-y-3">
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                      Applied Competencies & Technical Scope
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {item.highlights.map((point, pIdx) => (
                        <div
                          key={pIdx}
                          className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-white p-3 shadow-xs transition-shadow group-hover:border-slate-300"
                        >
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-600 mt-0.5" />
                          <span className="text-xs sm:text-sm font-medium text-slate-800 leading-snug">
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
