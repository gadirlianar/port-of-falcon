/**
 * Port of Falcon — Global Application Constants & Data Manifests
 * Path: src/lib/constants.ts
 */

import type { RackSensorData } from '@/types/telemetry';
import type { ApplicantFeatures, ApplicantPreset } from '@/types/xai';
import type { ProjectItem, DisciplineItem, SocialLink } from '@/types/project';

export const FALCON_PROFILE = {
  name: 'Anar Gadirli',
  callsign: 'Falcon',
  title: 'Systems Engineer & Explainable AI Researcher',
  organization: 'AzInTelecom LLC',
  location: 'Baku, Azerbaijan',
  coordinates: '40.4093° N, 49.8671° E',
  education: 'Azerbaijan State Oil and Industry University (ASOIU)',
  github: 'https://github.com/gadirlianar',
  linkedin: 'https://linkedin.com/in/gadirlianar',
  email: 'anargadirli55@gmail.com',
  tagline: 'You met me in the Falcon era of my life — where every challenge becomes altitude.',
  shortBio: 'Leading mission-critical infrastructure operations at AzInTelecom LLC with Tier III reliability standards and pioneering empirical Explainable AI research.',
  heroEyebrow: 'SYSTEMS ENGINEER // EXPLAINABLE AI RESEARCHER // AZINTELECOM TIER III',
  heroLocationBadge: 'BAKU, AZ // 40°24\'N 49°52\'E',
  heroStatusBadge: 'AZINTELECOM TIER III · NOMINAL',
} as const;

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/gadirlianar',
    handle: '@gadirlianar',
    badgeText: 'SOURCE CODE & BENCHMARKS',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/gadirlianar',
    handle: 'in/gadirlianar',
    badgeText: 'PROFESSIONAL NETWORK',
  },
];

export const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Disciplines', href: '#disciplines' },
  { label: 'Projects', href: '#projects' },
  { label: 'XAI Lab', href: '#xai' },
  { label: 'Telemetry', href: '#telemetry' },
  { label: 'Contact', href: '#contact' },
] as const;

/* =========================================================================
 * Tier III Data Center Telemetry Baselines
 * ANSI/TIA-942-B, ASHRAE TC 9.9, and ANSI/TIA-568.3-D Standards
 * ========================================================================= */

export const TELEMETRY_STANDARDS = {
  tierRating: 'Tier III Concurrently Maintainable',
  uptimeTargetPercent: 99.982,
  uptimeAchievedPercent: 99.998,
  fiberLossThresholdDb: 0.15, // Max allowable insertion loss
  standardRef: 'ANSI/TIA-568.3-D & ASHRAE TC 9.9',
  coldAisleMinC: 18.0,
  coldAisleMaxC: 27.0,
  coldAisleNominalC: 20.5,
  hotAisleMinC: 30.0,
  hotAisleMaxC: 40.0,
  hotAisleNominalC: 34.2,
  rhMinPercent: 40.0,
  rhMaxPercent: 60.0,
  rhNominalPercent: 48.5,
  pueNominal: 1.24,
  airflowNominalCfm: 1420,
  diffPressureNominalPa: 16.4,
} as const;

export const INITIAL_RACKS: RackSensorData[] = [
  {
    rackId: 'rack-alpha-01',
    name: 'Rack Alpha-01 (HPC Compute & GPU Cluster)',
    bayType: 'compute',
    coldAisleTempC: 20.4,
    hotAisleTempC: 34.6,
    relativeHumidityPercent: 48.2,
    dewPointC: 9.1,
    fiberInsertionLossDb: 0.112,
    opticalTxPowerDbm: -2.1,
    opticalRxPowerDbm: -11.4,
    pue: 1.24,
    airflowCfm: 1480,
    differentialPressurePa: 16.8,
    uptimeSeconds: 8432900,
    status: 'nominal',
    faultInjected: null,
  },
  {
    rackId: 'rack-beta-04',
    name: 'Rack Beta-04 (Optical Core Matrix & DWDM)',
    bayType: 'optical-core',
    coldAisleTempC: 19.8,
    hotAisleTempC: 32.1,
    relativeHumidityPercent: 46.5,
    dewPointC: 8.2,
    fiberInsertionLossDb: 0.089,
    opticalTxPowerDbm: -1.8,
    opticalRxPowerDbm: -10.8,
    pue: 1.21,
    airflowCfm: 1250,
    differentialPressurePa: 18.2,
    uptimeSeconds: 12940200,
    status: 'nominal',
    faultInjected: null,
  },
  {
    rackId: 'rack-gamma-09',
    name: 'Rack Gamma-09 (High-Density NVMe SAN)',
    bayType: 'storage',
    coldAisleTempC: 21.2,
    hotAisleTempC: 35.8,
    relativeHumidityPercent: 50.1,
    dewPointC: 10.3,
    fiberInsertionLossDb: 0.128,
    opticalTxPowerDbm: -2.4,
    opticalRxPowerDbm: -12.1,
    pue: 1.27,
    airflowCfm: 1620,
    differentialPressurePa: 15.6,
    uptimeSeconds: 6219400,
    status: 'nominal',
    faultInjected: null,
  },
  {
    rackId: 'rack-delta-12',
    name: 'Rack Delta-12 (Edge Kubernetes Gateway)',
    bayType: 'edge-cloud',
    coldAisleTempC: 20.1,
    hotAisleTempC: 33.4,
    relativeHumidityPercent: 47.8,
    dewPointC: 8.7,
    fiberInsertionLossDb: 0.104,
    opticalTxPowerDbm: -2.0,
    opticalRxPowerDbm: -11.1,
    pue: 1.23,
    airflowCfm: 1340,
    differentialPressurePa: 17.1,
    uptimeSeconds: 9812400,
    status: 'nominal',
    faultInjected: null,
  },
];

/* =========================================================================
 * Credit-XAI Benchmark Baselines
 * Game-Theoretic SHAP and Calibrated Credit Risk Model
 * ========================================================================= */

export const XAI_BASE_VALUE = 0.585; // Population expectation log-odds

export const DEFAULT_APPLICANT: ApplicantFeatures = {
  annualIncome: 88000,
  ficoScore: 715,
  debtToIncomeRatio: 0.28,
  loanAmount: 25000,
  loanTermMonths: 36,
  revolvingUtilization: 0.32,
  delinquencies2Years: 0,
  employmentYears: 6,
  collateralValue: 45000,
};

export const APPLICANT_PRESETS: ApplicantPreset[] = [
  {
    id: 'preset-prime',
    name: 'Prime Systems Lead',
    subtitle: 'High FICO, strong cashflow, prime borrower',
    features: {
      annualIncome: 145000,
      ficoScore: 785,
      debtToIncomeRatio: 0.18,
      loanAmount: 35000,
      loanTermMonths: 36,
      revolvingUtilization: 0.14,
      delinquencies2Years: 0,
      employmentYears: 9,
      collateralValue: 90000,
    },
  },
  {
    id: 'preset-balanced',
    name: 'Corporate Mid-Level',
    subtitle: 'Healthy metrics, moderate debt balance',
    features: { ...DEFAULT_APPLICANT },
  },
  {
    id: 'preset-consolidation',
    name: 'Debt Consolidation',
    subtitle: 'High revolving credit utilization, stable salary',
    features: {
      annualIncome: 74000,
      ficoScore: 660,
      debtToIncomeRatio: 0.44,
      loanAmount: 30000,
      loanTermMonths: 60,
      revolvingUtilization: 0.78,
      delinquencies2Years: 1,
      employmentYears: 4,
      collateralValue: 15000,
    },
  },
  {
    id: 'preset-subprime',
    name: 'High-Risk Subprime',
    subtitle: 'Elevated DTI, recent delinquency, low collateral',
    features: {
      annualIncome: 38000,
      ficoScore: 570,
      debtToIncomeRatio: 0.58,
      loanAmount: 18000,
      loanTermMonths: 60,
      revolvingUtilization: 0.89,
      delinquencies2Years: 3,
      employmentYears: 1,
      collateralValue: 0,
    },
  },
];

/* =========================================================================
 * Featured Projects Manifest
 * ========================================================================= */

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'project-xai',
    slug: 'credit-xai-benchmark',
    title: 'Credit-XAI Benchmark',
    category: 'Explainable AI & Financial Risk',
    year: '2025',
    summary: 'Empirical benchmark evaluating TreeSHAP, FastSHAP, and LIME on calibrated credit risk models, providing exact game-theoretic feature attribution and algorithmic counterfactual recourse.',
    metrics: [
      { label: 'Inference Latency', value: '< 1.4ms' },
      { label: 'SHAP Fidelity', value: '100% Additive' },
      { label: 'Recourse Solvers', value: 'Sub-15ms' },
    ],
    tags: ['Explainable AI', 'TreeSHAP', 'LIME', 'Game Theory', 'TypeScript', 'Next.js'],
    desktopPreview: {
      url: 'falcon://xai.anargadirli.dev',
      title: 'Credit-XAI Interactive Waterfall Engine',
      type: 'interactive',
    },
    mobilePreview: {
      type: 'interactive',
    },
    links: {
      github: 'https://github.com/gadirlianar/credit-xai-benchmark',
      live: '#xai',
    },
  },
  {
    id: 'project-solaris',
    slug: 'solaris-energy',
    title: 'Solaris-Energy Telemetry',
    category: 'Smart Grid & Renewable Energy',
    year: '2024',
    summary: 'High-frequency telemetry ingestion platform monitoring solar photovoltaic arrays, battery state-of-health (SoH), and grid frequency stability with predictive curtailment analysis.',
    metrics: [
      { label: 'Telemetry Throughput', value: '120k eps' },
      { label: 'Forecast Accuracy', value: '98.4%' },
      { label: 'PUE Optimization', value: '-12.8%' },
    ],
    tags: ['Time-Series', 'Grid Telemetry', 'IoT Sensors', 'Kafka', 'React 19'],
    desktopPreview: {
      url: 'falcon://solaris.anargadirli.dev',
      title: 'Solaris Energy Real-time Grid Monitor',
      type: 'visual',
    },
    mobilePreview: {
      type: 'visual',
    },
    links: {
      github: 'https://github.com/gadirlianar/solaris-energy',
    },
  },
  {
    id: 'project-store-ma',
    slug: 'store-ma',
    title: 'Store-MA High-Concurrency Engine',
    category: 'Distributed Systems & Microservices',
    year: '2024',
    summary: 'Distributed microservices commerce engine with multi-tier Redis caching, idempotency locks, and sub-10ms checkout response times validated with automated CI/CD load testing.',
    metrics: [
      { label: 'Checkout Latency', value: '8.4ms' },
      { label: 'Peak Load', value: '25,000 rps' },
      { label: 'Visual Regression', value: '0.00 CIEDE' },
    ],
    tags: ['Microservices', 'Distributed Locks', 'Redis Cluster', 'Playwright', 'Next.js'],
    desktopPreview: {
      url: 'falcon://store-ma.anargadirli.dev',
      title: 'Store-MA Concurrency Workbench',
      type: 'visual',
    },
    mobilePreview: {
      type: 'visual',
    },
    links: {
      github: 'https://github.com/gadirlianar/store-ma',
    },
  },
];

/* =========================================================================
 * Core Disciplines (Inverted Brutalist Section)
 * ========================================================================= */

export const CORE_DISCIPLINES: DisciplineItem[] = [
  {
    index: '01',
    title: 'Data Center Infrastructure Operations',
    eyebrow: 'AZINTELECOM TIER III · ANSI/TIA-942 · HIGH RELIABILITY',
    description: 'Mission-critical data center management spanning cold/hot aisle containment, optical fiber link attenuation budgets (<0.15 dB loss), redundant power distribution (2N+1 UPS), and dynamic PUE optimization.',
    skills: ['Optical Time-Domain Reflectometry (OTDR)', 'Single-Mode Fiber (OS2)', 'ASHRAE TC 9.9 Standards', 'PUE Diagnostics', 'N+1 Redundancy'],
    highlightMetric: {
      value: '< 0.15 dB',
      label: 'Strict Fiber Insertion Loss',
    },
  },
  {
    index: '02',
    title: 'Explainable AI & Machine Learning Research',
    eyebrow: 'SHAP · LIME · GAME-THEORETIC MODEL RECOURSE',
    description: 'Transforming opaque black-box machine learning models into mathematically faithful, interpretable decision engines. Implementation of exact additive Shapley values and algorithmic counterfactual recourse.',
    skills: ['TreeSHAP', 'LIME Elasticity', 'Counterfactual Recourse', 'Credit Risk Scoring', 'Fair Lending ECOA Compliance'],
    highlightMetric: {
      value: '100% Exact',
      label: 'Additive Shapley Efficiency',
    },
  },
  {
    index: '03',
    title: 'High-Concurrency Systems Engineering',
    eyebrow: 'DISTRIBUTED ARCHITECTURE · STREAMING TELEMETRY · 60 FPS UX',
    description: 'Designing fault-tolerant, high-throughput microservices and real-time visualization dashboards capable of processing high-frequency sensor streams with sub-millisecond local latency.',
    skills: ['Next.js 15 App Router', 'React 19 Concurrency', 'Hardware-Accelerated Framer Motion', 'TypeScript Strict', 'Tailwind Systems'],
    highlightMetric: {
      value: '60 FPS',
      label: 'Hardware Accelerated UI',
    },
  },
];
