'use client';

import React from 'react';
import { ExternalLink, Github, Sparkles, ArrowRight } from 'lucide-react';
import DualDeviceMockup from './DualDeviceMockup';

interface ProjectCardData {
  id: string;
  mockupId: 'credit-xai' | 'solaris' | 'store-ma' | 'lulukay';
  index: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  keyMetric: { label: string; value: string };
  bgClass: string;
  borderClass: string;
}

const PROJECTS: ProjectCardData[] = [
  {
    id: 'credit-xai',
    mockupId: 'credit-xai',
    index: '01',
    category: 'MACHINE LEARNING & EXPLAINABILITY',
    title: 'credit-xai-benchmark',
    description:
      'A comprehensive empirical benchmark evaluating Explainable AI (XAI) attribution methods on credit risk tabular datasets. Rigorously examines TreeSHAP, KernelSHAP, and Integrated Gradients against gradient boosting ensembles for attribution fidelity, stability, and regulatory compliance.',
    tags: ['Python', 'PyTorch', 'SHAP', 'Scikit-Learn', 'XGBoost', 'LightGBM', 'Empirical Benchmark'],
    githubUrl: 'https://github.com/gadirlianar/credit-xai-benchmark',
    keyMetric: { label: 'Benchmark AUROC', value: '0.892' },
    bgClass: 'bg-[#0B0F19]',
    borderClass: 'border-cyan-500/30',
  },
  {
    id: 'solaris-energy',
    mockupId: 'solaris',
    index: '02',
    category: 'CLEAN-TECH & IOT TELEMETRY',
    title: 'Solaris-Energy',
    description:
      'Distributed solar array monitoring platform tracking real-time inverter telemetry, string voltage, and daily kilowatt generation. Features automated fault isolation, thermal efficiency tracking, and predictive power yield models.',
    tags: ['TypeScript', 'Next.js 15', 'Tailwind CSS', 'IoT Analytics', 'Telemetry', 'Framer Motion'],
    githubUrl: 'https://github.com/gadirlianar/Solaris-Energy',
    keyMetric: { label: 'Grid Telemetry', value: '142.8 kW Live' },
    bgClass: 'bg-[#0F1422]',
    borderClass: 'border-amber-500/30',
  },
  {
    id: 'store-ma',
    mockupId: 'store-ma',
    index: '03',
    category: 'DISTRIBUTED COMMERCE & SYSTEMS',
    title: 'Store-MA',
    description:
      'High-throughput modern e-commerce platform built for scale. Engineered with atomic inventory synchronization, optimistic UI updates, zero-latency search filtering, and resilient payment gateway webhooks.',
    tags: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
    githubUrl: 'https://github.com/gadirlianar/Store-MA',
    keyMetric: { label: 'Checkout Throughput', value: '2,400 req/s' },
    bgClass: 'bg-[#0D111E]',
    borderClass: 'border-indigo-500/30',
  },
  {
    id: 'lulukay-chocolate1',
    mockupId: 'lulukay',
    index: '04',
    category: 'ARTISANAL BRAND EXPERIENCE',
    title: 'lulukay-chocolate1',
    description:
      'An artisanal luxury confectionery e-commerce storefront. Designed with a bespoke sensory visual language, smooth micro-interactions, dark aesthetic palette, and mobile-first responsive architecture.',
    tags: ['TypeScript', 'Tailwind CSS', 'UI/UX Design', 'Fluid Animations', 'Brand Identity'],
    githubUrl: 'https://github.com/gadirlianar/lulukay-chocolate1',
    keyMetric: { label: 'Lighthouse UX', value: '100 / 100' },
    bgClass: 'bg-[#120F16]',
    borderClass: 'border-pink-500/30',
  },
];

export default function StackedProjectsDeck() {
  return (
    <section
      id="projects"
      aria-label="Featured Projects Deck"
      className="relative z-30 -mt-10 md:-mt-16 w-full rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-[#020617] px-6 py-16 sm:px-10 sm:py-20 md:px-14 md:py-24 lg:px-20 text-[#F8FAFC] shadow-[0_-25px_60px_rgba(0,0,0,0.6)]"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-[0.25em] uppercase text-cyan-400">
              <Sparkles className="h-3.5 w-3.5" />
              CURATED PRODUCTION REPOSITORIES
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight font-display">
              Featured <br className="hidden sm:block" />
              Engineering Projects
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm sm:text-base text-slate-400 leading-relaxed">
            From empirical Explainable AI research benchmarks to distributed telemetry and high-performance commercial architectures.
          </p>
        </div>

        {/* Stacked Deck Container */}
        <div className="mt-12 md:mt-16 space-y-12">
          {PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              className={`group relative rounded-3xl border ${project.borderClass} ${project.bgClass} p-6 sm:p-8 md:p-10 shadow-2xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(14,165,233,0.1)]`}
            >
              {/* Card Header & Metadata */}
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-2xl sm:text-3xl font-black text-cyan-400">
                      {project.index}
                    </span>
                    <span className="font-mono text-xs font-bold tracking-widest uppercase text-slate-400">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-display tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="max-w-3xl text-sm sm:text-base text-slate-300 leading-relaxed font-sans pt-1">
                    {project.description}
                  </p>
                </div>

                {/* Metric & Action Links */}
                <div className="flex flex-row lg:flex-col items-start lg:items-end justify-between gap-4 shrink-0">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-left lg:text-right">
                    <span className="block font-display text-xl sm:text-2xl font-black text-cyan-400">
                      {project.keyMetric.value}
                    </span>
                    <span className="block font-mono text-[10px] uppercase text-slate-400 tracking-wider">
                      {project.keyMetric.label}
                    </span>
                  </div>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 px-4 py-2 font-mono text-xs font-bold text-white transition-all hover:scale-105 active:scale-95 border border-white/15"
                  >
                    <Github className="h-4 w-4" />
                    <span>View Repository</span>
                    <ExternalLink className="h-3 w-3 text-cyan-400" />
                  </a>
                </div>
              </div>

              {/* Tags List */}
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Embedded Dual Device Mockup Frame */}
              <div className="mt-8 border-t border-white/10 pt-6">
                <DualDeviceMockup projectId={project.mockupId} title={project.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
