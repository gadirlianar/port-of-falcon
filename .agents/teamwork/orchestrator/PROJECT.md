# Project: Port of Falcon — Anar Gadirli Portfolio & Telemetry Web Application

## Architecture
- **Framework**: Next.js 15+ App Router, React 19, TypeScript (Strict).
- **Styling**: Tailwind CSS (3.4.17) with custom high-tech Falcon design system (cyan `#0EA5E9`, indigo `#6366F1`, obsidian canvas `#020617`, border `#1E293B`, and brutalist white inverted card `#FFFFFF`).
- **Motion & Interactions**: Framer Motion (v12/v14) for 60fps hardware-accelerated animations, scroll-linked marquee carousels, magnetic parallax cursor, and sticky stacked card deck with progressive scale calculation.
- **Client-Side Simulation Engines**:
  - `AzInTelecom Data Center Telemetry Engine`: Pure client-side physics simulation modeled on ANSI/TIA-942 and ASHRAE TC 9.9 standards (<0.15 dB fiber link insertion loss, 18-27°C cold aisle inlet, 40-60% RH, 1.20-1.35 PUE, CFM volumetric airflow).
  - `Credit-XAI Benchmark Engine`: Pure client-side game-theoretic Explainable AI model (calibrated log-odds credit risk scoring, exact additive SHAP waterfall satisfying efficiency $\sum \phi_i + \text{base} = \text{score}$, LIME elasticity sensitivity, and counterfactual recourse solver).
- **Icons**: Lucide React.
- **Typography**: Space Grotesk (editorial brutalist headlines), Inter (clean UI body), JetBrains Mono (mission-critical telemetry HUD and code blocks).

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| F1 | Project Scaffolding | Next.js 15 App Router, TypeScript, Tailwind CSS, PostCSS, ESLint, package configs | M1 | Survey (Explorer 1) |
| F2 | Falcon Design System & Tokens | Cyan `#0EA5E9`, Indigo `#6366F1`, Obsidian `#020617`, typography scales, custom utility classes | M1 | Survey (Explorer 2) |
| F3 | Editorial Brutalist Hero Section | Fullscreen viewport, giant responsive typography `text-[14vw]`-`17.5vw`, gradient clipping | M1 | ORIGINAL_REQUEST §R1 |
| F4 | Hero Avatar & Dual Gradient Mask | Center-anchored avatar with vertical and horizontal fade masks (`maskImage`) | M1 | Survey (Explorer 2) |
| F5 | Magnetic Cursor Parallax | Fluid cursor-following physics with touch-device fallback (`matchMedia`) | M1 | Survey (Explorer 2) |
| F6 | Hero Tagline & Metadata Badges | "You met me in the Falcon era of my life...", location, live status, availability badges | M1 | ORIGINAL_REQUEST §Tagline |
| F7 | Dual-Lane Marquee Showcase | Horizontal scrolling marquee with counter-translating lanes, infinite velocity loop | M2 | ORIGINAL_REQUEST §R1 |
| F8 | Core Disciplines Inverted Brutalist Section | High-contrast white card `rounded-t-[60px]`, giant numerals `clamp(3rem, 10vw, 140px)` | M2 | Survey (Explorer 2) |
| F9 | Professional Bio & Authority Markers | AzInTelecom infrastructure operations, ASOIU, systems engineering credentials | M2 | Survey (Explorer 2) |
| F10 | External Social Connectors | GitHub (`https://github.com/gadirlianar`) and LinkedIn (`https://linkedin.com/in/gadirlianar`) | M2 | ORIGINAL_REQUEST §Criteria |
| F11 | Stacked Card Deck Navigation | Overlapping card deck with `rounded-t-[60px]`, negative top margins `-mt-14`, sticky stacking | M3 | ORIGINAL_REQUEST §R1 |
| F12 | Dual-Device Mockup Framework | Side-by-side desktop macOS browser frame (66%) and iPhone 16 Pro mobile frame (34%) | M3 | ORIGINAL_REQUEST §R2 |
| F13 | Featured Project: Solaris-Energy | High-fidelity interactive showcase with performance metrics, architecture, and live demo | M3 | ORIGINAL_REQUEST §R2 |
| F14 | Featured Project: Store-MA | Interactive high-concurrency e-commerce showcase with Playwright CIEDE2000 metrics | M3 | ORIGINAL_REQUEST §R2 |
| F15 | Featured Project: Credit-XAI Benchmark | Showcase container linking to deep interactive evaluation component | M3 | ORIGINAL_REQUEST §R2 |
| F16 | Calibrated Credit Risk Scoring Model | Real-time parametric evaluation engine calculating log-odds approval probability and risk tiers | M4 | ORIGINAL_REQUEST §R2 |
| F17 | Exact Additive SHAP Waterfall Plot | Game-theoretic Shapley values satisfying efficiency $\sum \phi_i + \text{base} = \text{score}$ | M4 | ORIGINAL_REQUEST §R2 |
| F18 | LIME Local Elasticity Sensitivity | Feature perturbation gradients evaluating local model stability | M4 | Survey (Explorer 3) |
| F19 | Counterfactual Recourse Optimization | Minimal-cost actionable parameter solver for loan approval recourse with 1-click apply | M4 | Survey (Explorer 3) |
| F20 | Environmental Telemetry Sensors | Cold aisle (18-27°C), hot aisle (30-40°C), RH% (40-60%), dew point calculations | M5 | ORIGINAL_REQUEST §R3 |
| F21 | Optical Fiber Link Integrity Monitor | Strict insertion loss <0.15 dB (TIA/EIA compliance), Tx/Rx optical power, BER diagnostics | M5 | ORIGINAL_REQUEST §R3 |
| F22 | Power & Airflow Diagnostics | Dynamic PUE (1.20-1.35), CFM volumetric airflow, static pressure differential ($\Delta P$) | M5 | ORIGINAL_REQUEST §R3 |
| F23 | Interactive Telemetry HUD Controls | Live stream toggle, refresh rate selector, rack bay selector, manual fault injection | M5 | Survey (Explorer 3) |
| F24 | E2E Integration & Verification | 100% E2E test suite pass (Tiers 1-4) and adversarial coverage hardening (Tier 5) | M6 | ORIGINAL_REQUEST §Criteria |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Scaffolding & Brutalist Hero | F1, F2, F3, F4, F5, F6 | none | PLANNED |
| M2 | Marquee & Core Disciplines | F7, F8, F9, F10 | M1 | PLANNED |
| M3 | Stacked Deck & Dual-Device Mockups | F11, F12, F13, F14, F15 | M1, M2 | PLANNED |
| M4 | Credit-XAI Benchmark Interactive Engine | F16, F17, F18, F19 | M1, M3 | PLANNED |
| M5 | AzInTelecom Data Center Telemetry Experience | F20, F21, F22, F23 | M1, M2 | PLANNED |
| M6 | Final Verification & Adversarial Hardening | F24 (100% E2E pass + Tier 5 hardening) | M1, M2, M3, M4, M5, E2E Track | PLANNED |

## Interface Contracts

### 1. Data Center Telemetry Contract (`types/telemetry.ts`)
```typescript
export interface RackSensorData {
  rackId: string;
  name: string;
  bayType: 'compute' | 'optical-core' | 'storage' | 'edge-cloud';
  coldAisleTempC: number;      // 18.0 - 27.0 °C
  hotAisleTempC: number;       // 30.0 - 40.0 °C
  relativeHumidityPercent: number; // 40.0 - 60.0 %
  dewPointC: number;
  fiberInsertionLossDb: number; // Must remain < 0.15 dB nominal
  opticalTxPowerDbm: number;   // -1.5 to -3.0 dBm
  opticalRxPowerDbm: number;   // -10.0 to -14.0 dBm
  pue: number;                 // 1.20 - 1.35
  airflowCfm: number;          // 800 - 2400 CFM
  differentialPressurePa: number; // 10.0 - 25.0 Pa
  uptimeSeconds: number;
  status: 'nominal' | 'warning' | 'critical';
  faultInjected?: 'thermal_surge' | 'optical_microbend' | 'airflow_choke' | null;
}
```

### 2. Credit-XAI Benchmark Contract (`types/xai.ts`)
```typescript
export interface ApplicantFeatures {
  annualIncome: number;      // $20,000 - $300,000
  ficoScore: number;         // 300 - 850
  debtToIncomeRatio: number; // 0.05 - 0.70
  loanAmount: number;        // $5,000 - $100,000
  loanTermMonths: 36 | 60;
  revolvingUtilization: number; // 0.0 - 1.0
  delinquencies2Years: number;  // 0 - 5
  employmentYears: number;      // 0 - 25
  collateralValue: number;      // $0 - $200,000
}

export interface ShapValueItem {
  feature: keyof ApplicantFeatures;
  displayName: string;
  value: number;
  shapValue: number; // Positive increases risk, negative decreases risk
  direction: 'favorable' | 'unfavorable';
}

export interface XAIEvaluationResult {
  approvalProbability: number; // 0.0 - 1.0
  riskScore: number;           // 0 - 1000
  riskTier: 'Tier A (Low Risk)' | 'Tier B (Moderate Risk)' | 'Tier C (Subprime)' | 'Tier D (High Risk)';
  decision: 'APPROVED' | 'REFERRED' | 'DECLINED';
  baseValue: number;           // Population expectation
  shapValues: ShapValueItem[];
  counterfactualRecourse?: {
    recommendations: {
      feature: keyof ApplicantFeatures;
      displayName: string;
      currentValue: number;
      targetValue: number;
      deltaText: string;
    }[];
    projectedApprovalProbability: number;
  };
}
```

### 3. Dual-Device Mockup Contract (`types/project.ts`)
```typescript
export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  desktopPreview: {
    url: string;
    title: string;
    type: 'interactive' | 'visual';
  };
  mobilePreview: {
    type: 'interactive' | 'visual';
  };
  links: {
    github: string;
    live?: string;
  };
}
```

## Code Layout
```
/Users/anargadirli/Desktop/Port of Falcon/
├── .agents/                    # Orchestration & Subagent Metadata
├── public/                     # Static media, icons, and vector assets
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css         # Falcon dark canvas, brutalist typography styles
│   │   ├── layout.tsx          # Root layout with fonts, metadata, smooth scroll
│   │   └── page.tsx            # Main single-page application orchestrating sections
│   ├── components/
│   │   ├── branding/           # Falcon logo, badges, HUD markers
│   │   ├── hero/               # Fullscreen brutalist hero, avatar gradient mask, parallax
│   │   ├── marquee/            # Dual-lane infinite ticker
│   │   ├── disciplines/        # Inverted white brutalist section
│   │   ├── projects/           # Stacked card deck, dual-device mockup frames
│   │   ├── xai/                # Credit-XAI benchmark interactive sliders & SHAP waterfall
│   │   ├── telemetry/          # AzInTelecom Data Center live simulation & HUD dashboard
│   │   ├── common/             # Buttons, cards, modal frames, device chassis
│   │   └── navigation/         # Header, status pill, footer
│   ├── lib/
│   │   ├── telemetry-engine.ts # Tier III DC physics & sensor simulation algorithms
│   │   ├── xai-engine.ts       # Calibrated credit scoring, SHAP, and counterfactual solver
│   │   └── constants.ts        # Project manifests, Anar Gadirli bio & telemetry baselines
│   └── types/
│       ├── telemetry.ts
│       ├── xai.ts
│       └── project.ts
├── tests/
│   ├── e2e/                    # Opaque-box E2E test suites (Tiers 1-4)
│   ├── unit/                   # Math engine & simulation unit tests
│   └── test-runner.ts          # Comprehensive test harness
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```
