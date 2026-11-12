'use client';

import React from 'react';
import {
  Server,
  Cpu,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  ExternalLink,
  Activity,
  Award,
} from 'lucide-react';
import SocialConnectors from './SocialConnectors';
import { FALCON_PROFILE } from '@/lib/constants';

export interface AuthorityBadgeItem {
  id: string;
  institution: string;
  role: string;
  authorityTag: string;
  metricLabel: string;
  metricValue: string;
  spec: string;
  icon: React.ElementType;
  accent: string;
}

export const AUTHORITY_BADGES: AuthorityBadgeItem[] = [
  {
    id: 'azintelecom',
    institution: 'AzInTelecom LLC',
    role: 'Data Center Infrastructure Operations',
    authorityTag: 'VERIFIED_AZINTELECOM_ENGINEER',
    metricLabel: 'Tier III Reliability SLA',
    metricValue: '99.982%',
    spec: 'ANSI/TIA-942 · Optical Link Loss < 0.15 dB · ASHRAE TC 9.9',
    icon: Server,
    accent: '#0E7490', // High-contrast dark cyan (contrast 5.3:1)
  },
  {
    id: 'asoiu',
    institution: 'Azerbaijan State Oil and Industry University (ASOIU)',
    role: 'Computer Engineering / Systems Engineering',
    authorityTag: 'ASOIU_CREDENTIALED',
    metricLabel: 'Academic Rigor',
    metricValue: 'Systems Eng',
    spec: 'High-Concurrency Networks · Systems Architecture',
    icon: Cpu,
    accent: '#4338CA', // Indigo deep (contrast > 7:1)
  },
  {
    id: 'xai-author',
    institution: 'Credit-XAI Empirical Benchmark',
    role: 'Lead Interpretability Researcher & Author',
    authorityTag: 'LEAD_XAI_RESEARCHER',
    metricLabel: 'Shapley Efficiency',
    metricValue: '100% Additive',
    spec: 'FastSHAP (0.026ms) vs TreeSHAP · EU AI Act Compliant',
    icon: ShieldCheck,
    accent: '#047857', // High-contrast emerald (contrast > 5.5:1)
  },
  {
    id: 'location',
    institution: 'Baku, Azerbaijan (Bakı, Azərbaycan)',
    role: 'Primary Station & Network Coordinates',
    authorityTag: 'STATION_BAKU_AZ',
    metricLabel: 'Coordinates',
    metricValue: "40°24'N 49°52'E",
    spec: 'Timezone: UTC+04:00 (AZT) · Regional Telemetry Hub',
    icon: MapPin,
    accent: '#B45309', // High-contrast amber-700 (contrast > 5:1)
  },
];

export interface ProfessionalBioAuthorityProps {
  className?: string;
  showBadges?: boolean;
  showSocials?: boolean;
}

export default function ProfessionalBioAuthority({
  className = '',
  showBadges = true,
  showSocials = true,
}: ProfessionalBioAuthorityProps) {
  // Defensive fallbacks to avoid rendering undefined (F9-B1)
  const name = FALCON_PROFILE?.name || 'Anar Gadirli';
  const roleTitle = FALCON_PROFILE?.title || 'Systems Engineer & Explainable AI Researcher';
  const org = FALCON_PROFILE?.organization || 'AzInTelecom LLC';
  const location = FALCON_PROFILE?.location || 'Baku, Azerbaijan';

  return (
    <div
      aria-label="Professional Bio & Authority Markers"
      className={`relative w-full ${className}`}
    >
      {/* Decorative backdrop glow with print:hidden (F9-B5) */}
      <div
        className="pointer-events-none absolute -top-10 -right-10 w-96 h-96 bg-cyan-100/40 rounded-full blur-3xl print:hidden -z-10"
        aria-hidden="true"
      />

      {/* Editorial Authority Lead Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Heading & Institutional Identity */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 border border-slate-200 px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-slate-800 w-fit">
            <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>AZINTELECOM TIER III · VERIFIED CREDENTIALS</span>
          </div>

          <h3 className="mt-4 font-display text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-slate-950 leading-tight">
            Physical Rigor. <br />
            Algorithmic Depth.
          </h3>

          <div className="mt-3 font-mono text-xs text-slate-500 tracking-wide uppercase">
            <span className="font-bold text-slate-800">{roleTitle}</span>
            <span className="block mt-0.5 text-cyan-800 font-semibold">
              {org} · {location}
            </span>
          </div>

          {/* Social Connectors Bar */}
          {showSocials && (
            <div className="mt-6 pt-6 border-t border-slate-200">
              <SocialConnectors variant="inverted" showEmail={true} />
            </div>
          )}
        </div>

        {/* Right Column: In-Depth Editorial Bio Paragraph */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <p className="font-sans text-base sm:text-lg leading-relaxed text-slate-800 font-normal break-words">
            Leading mission-critical infrastructure operations at{' '}
            <strong className="font-bold text-slate-950">AzInTelecom LLC</strong> with certified{' '}
            <strong className="font-bold text-slate-950">Tier III</strong> reliability standards
            and pioneering empirical{' '}
            <strong className="font-bold text-slate-950">Explainable AI (XAI)</strong> research
            rooted at{' '}
            <strong className="font-bold text-slate-950">
              Azerbaijan State Oil and Industry University (ASOIU)
            </strong>
            .
          </p>

          <p className="mt-4 font-sans text-sm sm:text-base leading-relaxed text-slate-600 font-normal break-words">
            Operating inside one of the Caspian region&apos;s premier enterprise facilities, Anar maintains
            sub-0.15 dB optical fiber link budgets, high-density server rack deployments, and 24/7
            environmental containment. Simultaneously, his published research on credit-xai-benchmark
            establishes empirical Pareto benchmarks between microsecond inference latency and mathematical
            explanation faithfulness in regulated algorithmic finance under EU AI Act and GDPR Article 22 mandates.
          </p>

          {/* Authority Metadata Pills with high-contrast text */}
          <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-[11px] text-slate-700">
            <span className="rounded-lg bg-slate-100 border border-slate-300 px-2.5 py-1 font-bold text-slate-900">
              TAG: VERIFIED_AZINTELECOM_ENGINEER
            </span>
            <span className="rounded-lg bg-slate-100 border border-slate-300 px-2.5 py-1 font-bold text-slate-900">
              SLA: 99.982% CONCURRENTLY MAINTAINABLE
            </span>
            <span className="rounded-lg bg-slate-100 border border-slate-300 px-2.5 py-1 font-bold text-slate-900">
              NODE: BAKU, AZERBAIJAN (40°24&apos;N 49°52&apos;E)
            </span>
          </div>
        </div>
      </div>

      {/* Authority Badges Matrix (4 Key Pillars) */}
      {showBadges && (
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {AUTHORITY_BADGES.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white/90 p-5 transition-all duration-300 hover:border-slate-400 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-slate-900 shadow-xs transition-colors group-hover:bg-slate-950 group-hover:text-white"
                      style={{ color: badge.accent }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-[9px] font-bold tracking-widest uppercase text-slate-500">
                      {badge.authorityTag}
                    </span>
                  </div>

                  <h4 className="mt-4 font-display text-base font-bold text-slate-950 leading-tight">
                    {badge.institution}
                  </h4>
                  <p className="mt-1 font-mono text-xs text-slate-600 leading-snug">
                    {badge.role}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-[10px] uppercase text-slate-500">
                      {badge.metricLabel}
                    </span>
                    <span className="font-display text-sm font-black text-slate-950">
                      {badge.metricValue}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-[10px] text-slate-500 leading-tight">
                    {badge.spec}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
