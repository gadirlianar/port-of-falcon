'use client';

import React from 'react';
import { Server, Activity, ShieldCheck, Cpu, Database, Network } from 'lucide-react';

interface MarqueeItem {
  tag: string;
  title: string;
  icon: React.ElementType;
  meta: string;
  color: string;
}

const ROW_1: MarqueeItem[] = [
  {
    tag: 'XAI RESEARCH',
    title: 'TreeSHAP & Additive Attribution Benchmark',
    icon: Cpu,
    meta: 'Fidelity: 0.984 · AUROC: 0.892',
    color: '#0EA5E9',
  },
  {
    tag: 'TIER III DATA CENTER',
    title: 'AzInTelecom Optical Fiber Attenuation Monitoring',
    icon: Network,
    meta: 'Link Loss: < 0.12 dB · TIA/EIA Compliant',
    color: '#10B981',
  },
  {
    tag: 'CLEAN TECH',
    title: 'Solaris Energy Inverter Telemetry & Grid Analytics',
    icon: Activity,
    meta: 'Real-time Generation · Fault Isolation',
    color: '#F59E0B',
  },
  {
    tag: 'HIGH CONCURRENCY',
    title: 'Store-MA Distributed Checkout & Inventory Sync',
    icon: Database,
    meta: 'Zero-latency sync · Atomic Transactions',
    color: '#6366F1',
  },
];

const ROW_2: MarqueeItem[] = [
  {
    tag: 'PHYSICAL INFRASTRUCTURE',
    title: 'Cold Aisle Thermal Matrix & Humidity Regulation',
    icon: Server,
    meta: '21.1°C Baseline · 46% RH SLA Nominal',
    color: '#00F0FF',
  },
  {
    tag: 'AI EXPLAINABILITY',
    title: 'Fair Lending Feature Attribution & Model Recourse',
    icon: ShieldCheck,
    meta: 'KernelSHAP vs Integrated Gradients',
    color: '#818CF8',
  },
  {
    tag: 'LUXURY COMMERCE',
    title: 'Lulukay Chocolate Artisanal Digital Experience',
    icon: Activity,
    meta: 'Fluid Framer Motion Micro-interactions',
    color: '#EC4899',
  },
  {
    tag: 'AUTONOMOUS ENGINEERING',
    title: 'Agentic Vibe Coding & Production Synthesis',
    icon: Cpu,
    meta: 'Subagent orchestration · Zero regressions',
    color: '#38BDF8',
  },
];

export default function ScreensMarquee() {
  return (
    <section
      aria-label="Interactive Capabilities Marquee"
      className="relative z-10 w-full overflow-hidden bg-[#020617] py-12 md:py-16 border-y border-white/5 select-none"
    >
      {/* Edge gradient mask for seamless fading on left/right */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 sm:w-32 bg-gradient-to-r from-[#020617] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 sm:w-32 bg-gradient-to-l from-[#020617] to-transparent" />

      {/* Row 1: Scrolling Left */}
      <div className="flex w-full overflow-hidden py-2">
        <div className="flex min-w-full shrink-0 items-center justify-around gap-4 sm:gap-6 animate-marquee-left hover:[animation-play-state:paused]">
          {[...ROW_1, ...ROW_1].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`r1-${idx}`}
                className="group relative flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0B0F19]/80 px-5 py-3.5 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/50 hover:bg-[#111827] hover:shadow-[0_0_25px_rgba(14,165,233,0.15)]"
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: item.color }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex flex-col whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span
                      className="font-mono text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded border border-white/10"
                      style={{ color: item.color, borderColor: `${item.color}40` }}
                    >
                      {item.tag}
                    </span>
                    <span className="font-mono text-[10px] text-slate-500">
                      {item.meta}
                    </span>
                  </div>
                  <h3 className="mt-1 text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 2: Scrolling Right */}
      <div className="flex w-full overflow-hidden py-2 mt-2">
        <div className="flex min-w-full shrink-0 items-center justify-around gap-4 sm:gap-6 animate-marquee-right hover:[animation-play-state:paused]">
          {[...ROW_2, ...ROW_2].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`r2-${idx}`}
                className="group relative flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0B0F19]/80 px-5 py-3.5 backdrop-blur-md transition-all duration-300 hover:border-indigo-400/50 hover:bg-[#111827] hover:shadow-[0_0_25px_rgba(99,102,241,0.15)]"
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: item.color }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex flex-col whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span
                      className="font-mono text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded border border-white/10"
                      style={{ color: item.color, borderColor: `${item.color}40` }}
                    >
                      {item.tag}
                    </span>
                    <span className="font-mono text-[10px] text-slate-500">
                      {item.meta}
                    </span>
                  </div>
                  <h3 className="mt-1 text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
