'use client';

import React from 'react';
import { Github, Linkedin, ArrowUpRight, ExternalLink, Mail } from 'lucide-react';

export interface SocialConnectorItem {
  id: string;
  name: string;
  url: string;
  handle: string;
  badge: string;
  icon: React.ElementType;
  ariaLabel: string;
  primaryColor: string;
}

export const VERIFIED_CONNECTORS: SocialConnectorItem[] = [
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/gadirlianar',
    handle: '@gadirlianar',
    badge: 'SOURCE CODE & BENCHMARKS',
    icon: Github,
    ariaLabel: 'Anar Gadirli on GitHub (opens in new tab)',
    primaryColor: '#0EA5E9',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/gadirlianar',
    handle: 'in/gadirlianar',
    badge: 'PROFESSIONAL NETWORK',
    icon: Linkedin,
    ariaLabel: 'Anar Gadirli on LinkedIn (opens in new tab)',
    primaryColor: '#6366F1',
  },
];

export interface SocialConnectorsProps {
  className?: string;
  variant?: 'inverted' | 'dark';
  showEmail?: boolean;
}

export default function SocialConnectors({
  className = '',
  variant = 'inverted',
  showEmail = false,
}: SocialConnectorsProps) {
  // Protocol safety validator preventing javascript: or insecure URLs (F10-B3)
  const isValidUrl = (url: string) => url.startsWith('https://') || url.startsWith('mailto:');

  return (
    <div
      aria-label="External Professional Connectors"
      className={`flex flex-wrap items-center gap-4 ${className}`}
    >
      {VERIFIED_CONNECTORS.map((item) => {
        const Icon = item.icon;
        if (!isValidUrl(item.url)) return null;

        if (variant === 'inverted') {
          return (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.ariaLabel}
              className="group relative flex items-center justify-between gap-4 rounded-2xl border border-slate-900 bg-slate-950 px-5 py-3.5 text-white transition-all duration-300 hover:bg-slate-900 hover:border-cyan-500 hover:shadow-[0_10px_25px_rgba(14,165,233,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white transition-colors group-hover:bg-cyan-500 group-hover:text-slate-950">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-cyan-400">
                    {item.badge}
                  </span>
                  <span className="font-display text-sm font-extrabold uppercase tracking-tight text-white group-hover:text-cyan-200 transition-colors">
                    {item.name}{' '}
                    <span className="font-mono text-xs font-normal text-slate-400 group-hover:text-slate-300">
                      ({item.handle})
                    </span>
                  </span>
                </div>
              </div>

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-all duration-300 group-hover:border-cyan-400/40 group-hover:text-cyan-400">
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span className="sr-only">External Link</span>
              </div>
            </a>
          );
        }

        // Dark variant (used in Footer or obsidian contexts)
        return (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.ariaLabel}
            className="group relative flex items-center gap-3 rounded-xl border border-white/10 bg-[#0B0F19]/80 px-4 py-2.5 font-mono text-xs font-semibold text-slate-200 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-white hover:shadow-[0_0_20px_rgba(14,165,233,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
          >
            <Icon className="h-4 w-4 text-cyan-400 transition-transform group-hover:scale-110" />
            <span>{item.name}</span>
            <span className="text-[10px] text-slate-400">({item.handle})</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-400" />
          </a>
        );
      })}

      {showEmail && (
        <a
          href="mailto:anargadirli55@gmail.com"
          aria-label="Send email to Anar Gadirli"
          className="group relative flex items-center gap-2.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-slate-800 transition-all duration-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
        >
          <Mail className="h-4 w-4 text-slate-600 group-hover:text-white transition-colors" />
          <span>Email Direct</span>
          <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      )}
    </div>
  );
}
