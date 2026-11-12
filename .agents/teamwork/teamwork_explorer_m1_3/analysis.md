# Technical Investigation & Architecture Specification Report
**Milestone 1: Interface Contracts, Asset Pipeline, Global Constants & Root Layout Architecture**

- **Author**: Explorer 3 (Types, Assets & Integration Contracts)
- **Role**: Teamwork Explorer (Investigator & Synthesizer)
- **Date**: 2026-11-12
- **Milestone**: Milestone 1 (F1: Scaffolding to F6: Hero Badges)
- **Scope Documents**: `/Users/anargadirli/Desktop/Port of Falcon/PROJECT.md`, `/Users/anargadirli/Desktop/Port of Falcon/ORIGINAL_REQUEST.md`
- **Working Directory**: `/Users/anargadirli/Desktop/Port of Falcon`
- **State Folder**: `/Users/anargadirli/Desktop/Port of Falcon/.agents/teamwork/teamwork_explorer_m1_3/`

---

## 1. Executive Summary

Milestone 1 establishes the structural, visual, and mathematical bedrock for the entire **Port of Falcon** portfolio application. While peer explorers focus on configuration scaffolding (Explorer 1) and Hero motion physics (Explorer 2), **Explorer 3** delivers the shared interfaces, asset assets, global data constants, root layout, and integration boundaries that guarantee seamless interoperability across all subsequent milestones (Milestones 2 through 6).

This report delivers five critical production-ready deliverables:
1. **Shared TypeScript Interface Contracts**: Complete code definitions for `src/types/telemetry.ts` (Tier III Data Center physics), `src/types/xai.ts` (Explainable AI & additive SHAP), and `src/types/project.ts` (dual-device mockups and showcase), matching `PROJECT.md` specifications verbatim while providing extensible support for real-time simulation loops.
2. **Asset Strategy & Vector Pipeline**:
   - A photorealistic, cinematic Octane-rendered portrait of Anar Gadirli in his Falcon aerospace flight jacket with optical piping and lapel pin (generated and saved at `/Users/anargadirli/.gemini/antigravity/brain/ca9f17df-bfa4-457f-9ac8-08c6318f896c/anar_falcon_avatar_generated_1794466072594.jpg`).
   - Pure, standalone vector SVG implementations for `public/assets/falcon-insignia.svg`, `public/assets/anar-falcon-avatar.svg`, and `public/favicon.svg` (stored in this folder as ready-to-copy proposals).
   - Precise CSS specifications for the dual gradient mask (`-webkit-mask-image` and `mask-image`) and cyan/indigo ambient halo.
3. **Global Application Constants (`src/lib/constants.ts`)**: Exhaustive data manifests including Anar Gadirli's verified credentials, AzInTelecom profile, official GitHub (`https://github.com/gadirlianar`) and LinkedIn (`https://linkedin.com/in/gadirlianar`), ANSI/TIA-942 and ASHRAE TC 9.9 telemetry baselines, Credit-XAI scoring baselines, and project manifests.
4. **Root Layout & Application Shell**: Full implementation specifications for `src/app/layout.tsx` (Google Fonts Space Grotesk, JetBrains Mono, Inter, SEO metadata, dark canvas), `src/app/page.tsx` (Hero Section integration and milestone staging anchors), and `src/lib/utils.ts` (`cn` helper and metric formatters).
5. **Acceptance Criteria & Verification Checklist**: Comprehensive verification suite ensuring zero-error compilation, layout responsiveness, and full compliance with user requirements.

---

## 2. Shared TypeScript Interface Contracts

To prevent downstream integration divergence and eliminate type drift between Milestones 1, 2, 3, 4, and 5, the following three contract files must be established at the project root under `src/types/`.

### 2.1 Data Center Telemetry Contract (`src/types/telemetry.ts`)
This contract models the physical telemetry stream of AzInTelecom's Tier III Data Center in Baku, governed by ANSI/TIA-942, ANSI/TIA-568.3-D (optical link integrity), and ASHRAE TC 9.9 thermal guidelines.

```typescript
/**
 * Port of Falcon — Tier III Data Center Telemetry Type Definitions
 * Modeled on ANSI/TIA-942 and ASHRAE TC 9.9 standards
 * Path: src/types/telemetry.ts
 */

export type BayType = 'compute' | 'optical-core' | 'storage' | 'edge-cloud';

export type SystemStatus = 'nominal' | 'warning' | 'critical';

export type FaultInjectionType = 'thermal_surge' | 'optical_microbend' | 'airflow_choke' | null;

export interface RackSensorData {
  rackId: string;
  name: string;
  bayType: BayType;
  coldAisleTempC: number;          // 18.0 - 27.0 °C (ASHRAE Recommended)
  hotAisleTempC: number;           // 30.0 - 40.0 °C
  relativeHumidityPercent: number; // 40.0 - 60.0 % (Allowable 20 - 80 %)
  dewPointC: number;               // 5.5 - 15.0 °C
  fiberInsertionLossDb: number;    // Strict < 0.15 dB (TIA/EIA-568.3-D compliance)
  opticalTxPowerDbm: number;       // -1.5 to -3.0 dBm
  opticalRxPowerDbm: number;       // -10.0 to -14.0 dBm
  pue: number;                     // 1.20 - 1.35 (Tier III nominal)
  airflowCfm: number;              // 800 - 2400 CFM
  differentialPressurePa: number;  // 10.0 - 25.0 Pa
  uptimeSeconds: number;           // Monotonically increasing simulation uptime
  status: SystemStatus;
  faultInjected?: FaultInjectionType;
}

export interface TelemetryLogEntry {
  id: string;
  timestamp: string;               // ISO-8601 or HH:mm:ss.SSS
  rackId: string;
  level: 'info' | 'warn' | 'crit';
  category: 'thermal' | 'optical' | 'power' | 'airflow' | 'system';
  message: string;
  value?: number;
  unit?: string;
}

export interface ServerBladeNode {
  nodeId: string;
  name: string;
  cpuPercent: number;              // 0 - 100%
  memoryPercent: number;           // 0 - 100%
  storageIops: number;             // e.g. 45,000 IOPS
  powerWatts: number;
  status: SystemStatus;
}

export interface TelemetrySimulationConfig {
  isRunning: boolean;
  refreshIntervalMs: 500 | 1000 | 2500 | 5000;
  activeRackId: string;
  activeFault: FaultInjectionType;
}
```

### 2.2 Credit-XAI Benchmark Contract (`src/types/xai.ts`)
This contract models the Explainable AI (XAI) risk evaluation engine, providing strict typing for financial applicant vectors, additive Shapley values, and counterfactual recourse solvers.

```typescript
/**
 * Port of Falcon — Explainable AI (XAI) Benchmark Type Definitions
 * Grounded in Shapley Additive exPlanations (NeurIPS 2017) and Local Interpretable Model-agnostic Explanations
 * Path: src/types/xai.ts
 */

export interface ApplicantFeatures {
  annualIncome: number;            // $20,000 - $300,000
  ficoScore: number;               // 300 - 850
  debtToIncomeRatio: number;       // 0.05 - 0.70 (5% - 70%)
  loanAmount: number;              // $5,000 - $100,000
  loanTermMonths: 36 | 60;         // 36 or 60 months
  revolvingUtilization: number;    // 0.0 - 1.0 (0% - 100%)
  delinquencies2Years: number;      // 0 - 5 occurrences
  employmentYears: number;          // 0 - 25 years
  collateralValue: number;          // $0 - $200,000
}

export interface ShapValueItem {
  feature: keyof ApplicantFeatures;
  displayName: string;
  value: number;
  shapValue: number;               // In log-odds units: positive increases risk, negative decreases risk
  direction: 'favorable' | 'unfavorable';
}

export interface CounterfactualRecourseItem {
  feature: keyof ApplicantFeatures;
  displayName: string;
  currentValue: number;
  targetValue: number;
  deltaText: string;
}

export interface XAIEvaluationResult {
  approvalProbability: number;     // 0.0 - 1.0 (0% - 100%)
  riskScore: number;               // 0 - 1000 (standard credit scoring scale)
  riskTier: 'Tier A (Low Risk)' | 'Tier B (Moderate Risk)' | 'Tier C (Subprime)' | 'Tier D (High Risk)';
  decision: 'APPROVED' | 'REFERRED' | 'DECLINED';
  baseValue: number;               // Population expectation log-odds
  shapValues: ShapValueItem[];
  counterfactualRecourse?: {
    recommendations: CounterfactualRecourseItem[];
    projectedApprovalProbability: number;
  };
}

export interface ApplicantPreset {
  id: string;
  name: string;
  subtitle: string;
  features: ApplicantFeatures;
}

export interface LimeElasticityItem {
  feature: keyof ApplicantFeatures;
  displayName: string;
  sensitivity: number;             // Local gradient / elasticity
  direction: 'positive' | 'negative';
}
```

### 2.3 Dual-Device Mockup & Showcase Contract (`src/types/project.ts`)
This contract supports the featured engineering projects (`credit-xai-benchmark`, `solaris-energy`, `store-ma`), side-by-side dual-device chassis previews, and the brutalist inverted disciplines section.

```typescript
/**
 * Port of Falcon — Project & Visual Showcase Type Definitions
 * Path: src/types/project.ts
 */

export interface MetricItem {
  label: string;
  value: string;
}

export interface DesktopPreviewConfig {
  url: string;
  title: string;
  type: 'interactive' | 'visual';
}

export interface MobilePreviewConfig {
  type: 'interactive' | 'visual';
}

export interface ProjectLinks {
  github: string;
  live?: string;
  docs?: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  metrics: MetricItem[];
  tags: string[];
  desktopPreview: DesktopPreviewConfig;
  mobilePreview: MobilePreviewConfig;
  links: ProjectLinks;
}

export interface DisciplineItem {
  index: string;                   // '01', '02', '03'
  title: string;
  eyebrow: string;
  description: string;
  skills: string[];
  highlightMetric: {
    value: string;
    label: string;
  };
}

export interface MarqueeCard {
  id: string;
  title: string;
  tag: string;
  metric: string;
  imageSrc: string;
  lane: 1 | 2;
}

export interface SocialLink {
  name: string;
  url: string;
  handle: string;
  badgeText: string;
}
```

---

## 3. Asset Strategy, Visual Assets & Artwork Pipeline

### 3.1 Centerpiece Hero Avatar Artwork
In `omerzh.uk`, the hero avatar is an atmospheric, monochrome portrait with a dual-axis gradient fade. For Anar Gadirli, the centerpiece visual must embody the Falcon persona: authoritative, high-tech, and grounded in systems engineering.

#### Deliverable A: Photorealistic Cinematic Portrait
A photorealistic portrait has been generated using `generate_image` and is staged at:
`/Users/anargadirli/.gemini/antigravity/brain/ca9f17df-bfa4-457f-9ac8-08c6318f896c/anar_falcon_avatar_generated_1794466072594.jpg`

- **Visual Attributes**:
  - Depicts Anar Gadirli with a sharp, confident, and intelligent expression.
  - Wearing a bespoke obsidian flight jacket with neon cyan (`#0EA5E9`) and deep indigo (`#6366F1`) optical piping along the shoulders and standup collar.
  - Metallic Falcon insignia pin on the left lapel.
  - Atmospheric dark server rack/hardware laboratory backdrop with glowing telemetry readouts.
- **Worker Deployment Instructions**:
  The Worker will copy and optimize this image to `public/assets/anar-falcon-avatar.jpg` and `public/assets/anar-falcon-avatar.webp`:
  ```bash
  mkdir -p public/assets
  cp /Users/anargadirli/.gemini/antigravity/brain/ca9f17df-bfa4-457f-9ac8-08c6318f896c/anar_falcon_avatar_generated_1794466072594.jpg public/assets/anar-falcon-avatar.jpg
  ```

#### Deliverable B: Standalone High-Precision Scalable Vector Avatar
To ensure zero external dependencies, immediate offline availability, and crisp rendering on ultra-high-DPI displays (Apple Retina 5K/XDR), Explorer 3 has created `proposed_anar_falcon_avatar.svg`.

- **Key Geometry**:
  - High-tech tactical cyber-visor with glowing HUD telemetry text (`FALCON-OS v4.2`, `0.11 dB`, `99.998% SLA`).
  - Fiber-optic jacket conduits with SVG laser glow filter (`stdDeviation="4"`).
  - Telemetry range rings and Baku coordinates (`LAT 40.4093°N // LON 49.8671°E`).
- **Worker Deployment Instructions**:
  ```bash
  cp .agents/teamwork/teamwork_explorer_m1_3/proposed_anar_falcon_avatar.svg public/assets/anar-falcon-avatar.svg
  ```

### 3.2 Dual Gradient Mask Mechanics
To reproduce the seamless blending observed in the `omerzh.uk` benchmark, the avatar must apply both a vertical gradient mask (fading out the bottom body) and a horizontal gradient mask (feathering the lateral edges).

```css
/* Dual Gradient Mask CSS definition */
.hero-avatar-mask {
  -webkit-mask-image: 
    linear-gradient(to bottom, #000 72%, transparent 100%),
    linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%);
  -webkit-mask-composite: source-in;
  mask-image: 
    linear-gradient(to bottom, #000 72%, transparent 100%),
    linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%);
  mask-composite: intersect;
}
```

Behind the masked avatar, an ambient cyan/indigo glow halo is rendered:
```tsx
<div className="absolute -inset-4 -z-10 rounded-full bg-gradient-to-tr from-cyan-500/25 to-indigo-600/25 blur-3xl opacity-80 pointer-events-none" />
```

### 3.3 Falcon Insignia Glyph (`public/assets/falcon-insignia.svg`)
A high-tech emblem combining an aerodynamic interceptor silhouette with swept wings, laser feathers, and a central diamond core:
- SVG file created and verified at `.agents/teamwork/teamwork_explorer_m1_3/proposed_falcon_insignia.svg`.
- Gradient: `#00F0FF` -> `#0EA5E9` -> `#6366F1`.
- Worker Deployment:
  ```bash
  cp .agents/teamwork/teamwork_explorer_m1_3/proposed_falcon_insignia.svg public/assets/falcon-insignia.svg
  ```

### 3.4 Favicon & Browser Icons
- SVG Favicon created at `.agents/teamwork/teamwork_explorer_m1_3/proposed_favicon.svg`.
- Worker Deployment:
  ```bash
  cp .agents/teamwork/teamwork_explorer_m1_3/proposed_favicon.svg public/favicon.svg
  sips -s format ico .agents/teamwork/teamwork_explorer_m1_3/proposed_favicon.svg --resampleWidth 48 --out public/favicon.ico
  ```

---

## 4. Global Application Constants (`src/lib/constants.ts`)

The constants file anchors the entire application, housing Anar Gadirli's verified credentials, AzInTelecom Data Center physical baselines, Credit-XAI parameters, and project manifests.

```typescript
/**
 * Port of Falcon — Global Application Constants & Data Manifests
 * Path: src/lib/constants.ts
 */

import { RackSensorData } from '@/types/telemetry';
import { ApplicantFeatures, ApplicantPreset } from '@/types/xai';
import { ProjectItem, DisciplineItem, SocialLink } from '@/types/project';

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
```

---

## 5. Root Layout, Page Structure & Utilities

### 5.1 Root Layout (`src/app/layout.tsx`)
Configures Google Fonts (`Space_Grotesk`, `JetBrains_Mono`, `Inter`), dark obsidian backdrop, and SEO/OpenGraph metadata.

```typescript
import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, JetBrains_Mono, Inter } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const viewport: Viewport = {
  themeColor: '#020617',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Anar Gadirli // Port of Falcon — Systems Engineering & Explainable AI',
  description:
    'Production portfolio and mission-critical telemetry command center of Anar Gadirli. Highlighting Tier III Data Center operations at AzInTelecom, Explainable AI (SHAP/LIME) benchmark research, and systems engineering with a high-tech Falcon aesthetic.',
  keywords: [
    'Anar Gadirli',
    'Port of Falcon',
    'AzInTelecom',
    'Data Center Operations',
    'Tier III Data Center',
    'Explainable AI',
    'TreeSHAP',
    'LIME',
    'Systems Engineer',
    'Baku Azerbaijan',
    'Optical Attenuation',
    'Telemetry',
  ],
  authors: [{ name: 'Anar Gadirli', url: 'https://github.com/gadirlianar' }],
  creator: 'Anar Gadirli',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://anargadirli.dev',
    title: 'Anar Gadirli // Port of Falcon',
    description:
      'You met me in the Falcon era of my life — where every challenge becomes altitude. Systems Engineering & Explainable AI.',
    siteName: 'Port of Falcon',
    images: [
      {
        url: '/assets/anar-falcon-avatar.jpg',
        width: 1024,
        height: 1024,
        alt: 'Anar Gadirli — Port of Falcon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anar Gadirli // Port of Falcon',
    description:
      'Tier III Data Center Operations (AzInTelecom) & Explainable AI (SHAP/LIME) Research.',
    creator: '@gadirlianar',
    images: ['/assets/anar-falcon-avatar.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark scroll-smooth ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable}`}
    >
      <body className="bg-[#020617] text-[#F8FAFC] antialiased selection:bg-cyan-500/30 selection:text-cyan-200 min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
```

### 5.2 Page Entrypoint (`src/app/page.tsx`)
Integrates `<BrutalistHero />` and provides accessible screen-reader anchors for upcoming sections so nav links (`#about`, `#disciplines`, `#projects`, `#xai`, `#telemetry`, `#contact`) never break or throw 404s.

```typescript
import { BrutalistHero } from '@/components/hero/BrutalistHero';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#020617] text-[#F8FAFC] overflow-x-clip">
      {/* Milestone 1: Editorial Brutalist Hero Section */}
      <BrutalistHero />

      {/* Anchor targets and staging placeholders for Milestones 2-5 */}
      <div id="about" className="sr-only" aria-hidden="true" />
      <div id="disciplines" className="sr-only" aria-hidden="true" />
      <div id="projects" className="sr-only" aria-hidden="true" />
      <div id="xai" className="sr-only" aria-hidden="true" />
      <div id="telemetry" className="sr-only" aria-hidden="true" />
      <div id="contact" className="sr-only" aria-hidden="true" />
    </main>
  );
}
```

### 5.3 Utility Functions (`src/lib/utils.ts`)

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatMetric(val: number, decimals = 1, unit = ''): string {
  if (isNaN(val) || !isFinite(val)) return '—';
  const formatted = val.toFixed(decimals);
  return unit ? `${formatted} ${unit}` : formatted;
}

export function formatOpticalLoss(lossDb: number): string {
  if (isNaN(lossDb)) return '— dB';
  return `${lossDb.toFixed(3)} dB`;
}

export function formatTemp(tempC: number): string {
  if (isNaN(tempC)) return '— °C';
  return `${tempC.toFixed(1)}°C`;
}

export function formatHumidity(rh: number): string {
  if (isNaN(rh)) return '— %';
  return `${rh.toFixed(1)}% RH`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercent(val: number, decimals = 1): string {
  if (isNaN(val)) return '—%';
  return `${(val * 100).toFixed(decimals)}%`;
}

export function formatUptime(seconds: number): string {
  if (!seconds || seconds <= 0) return '0m';
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}
```

---

## 6. Acceptance Criteria & Verification Checklist for Milestone 1

The following criteria must be satisfied for Milestone 1 gate approval:

| # | Category | Criterion | Verification Method |
|---|----------|-----------|---------------------|
| 1 | Compilation | `npm run build` exits with code 0 without errors or lint warnings. | Run `npm run build` in shell. |
| 2 | Strict Types | `npx tsc --noEmit` exits with 0 and zero unresolved imports or type errors. | Run `npx tsc --noEmit`. |
| 3 | Contract Integrity | `src/types/telemetry.ts`, `src/types/xai.ts`, and `src/types/project.ts` exist and match `PROJECT.md` interface specifications. | File existence check + AST validation. |
| 4 | Asset Integrity | `public/assets/falcon-insignia.svg`, `public/assets/anar-falcon-avatar.jpg` (or `.svg`), and `public/favicon.svg` exist and load without 404. | HTTP/File check + dev server rendering. |
| 5 | Responsive Hero Typography | Headline "ANAR GADIRLI" scales cleanly (`text-[13vw]` to `text-[17.5vw]`) across 375px, 768px, and 1440px viewports with zero horizontal scroll overflow. | Browser resize testing + `document.body.scrollWidth === window.innerWidth`. |
| 6 | Parallax Physics | Magnetic mouse interaction smoothly tracks pointer within radius on desktop; disables gracefully on touchscreen (`hover: none`). | Pointermove testing + touch event simulation. |
| 7 | Dual Gradient Mask | Avatar renders with bottom vertical fade (72% to 100%) and horizontal lateral fade without box clipping. | CSS inspection of `maskImage` / `WebkitMaskImage`. |
| 8 | Credentials & Links | Exact quote *"You met me in the Falcon era of my life — where every challenge becomes altitude."* is present; GitHub and LinkedIn links point to `https://github.com/gadirlianar` and `https://linkedin.com/in/gadirlianar` with `rel="noopener noreferrer"`. | DOM selector inspection. |
| 9 | Operational Badges | AzInTelecom Tier III status pill (`AZINTELECOM TIER III · NOMINAL`) and Baku location badge render with glowing pulse dot. | Visual inspection. |

---

## 7. Artifact Index in State Directory

The following ready-to-copy files have been authored in `.agents/teamwork/teamwork_explorer_m1_3/`:
- `proposed_telemetry.ts`: Full `src/types/telemetry.ts` implementation
- `proposed_xai.ts`: Full `src/types/xai.ts` implementation
- `proposed_project.ts`: Full `src/types/project.ts` implementation
- `proposed_constants.ts`: Full `src/lib/constants.ts` implementation
- `proposed_utils.ts`: Full `src/lib/utils.ts` implementation
- `proposed_layout.tsx`: Full `src/app/layout.tsx` implementation
- `proposed_page.tsx`: Full `src/app/page.tsx` implementation
- `proposed_falcon_insignia.svg`: Vector SVG for Falcon insignia
- `proposed_favicon.svg`: Vector SVG for browser favicon
- `proposed_anar_falcon_avatar.svg`: Standalone vector SVG for Anar Gadirli Falcon avatar
- External generated portrait: `/Users/anargadirli/.gemini/antigravity/brain/ca9f17df-bfa4-457f-9ac8-08c6318f896c/anar_falcon_avatar_generated_1794466072594.jpg`
