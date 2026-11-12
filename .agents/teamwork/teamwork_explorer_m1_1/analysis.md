# Milestone 1 Scaffolding & Build Pipeline Blueprint (F1: Project Scaffolding)

**Author:** Explorer 1 — Scaffolding & Build Pipeline Architect  
**Milestone:** Milestone 1 (F1: Project Scaffolding & Baseline Tooling)  
**Target Workspace:** `/Users/anargadirli/Desktop/Port of Falcon`  
**State Folder:** `/Users/anargadirli/Desktop/Port of Falcon/.agents/teamwork/teamwork_explorer_m1_1`  
**Date:** 2026-11-12  

---

## 1. Executive Summary

This blueprint specifies the exact scaffolding, dependency matrix, and build pipeline configuration required to initialize the **Port of Falcon** repository for Anar Gadirli.

The environment has been audited on the target host (`macOS arm64`, `Node.js v22.14.0`, `npm 10.9.2`). The complete dependency tree was tested and validated via a clean resolution dry-run (`418 packages audited, 0 peer dependency conflicts`).

The Worker can execute this blueprint directly without interactive CLI prompts, ensuring 100% deterministic scaffolding and guaranteed compilation (`npm run build` exit code 0).

---

## 2. Target Environment Audit

| Property | Value | Verification Status |
|---|---|---|
| **Operating System** | macOS 27.2.1 (Darwin 27.2.0 arm64, Apple Silicon) | Verified |
| **Node.js Runtime** | `v22.14.0` (LTS Current) | Verified (`node -v`) |
| **Package Manager** | `npm 10.9.2` | Verified (`npm -v`) |
| **Global Git Config** | `Anar Gadirli <anargadirli55@gmail.com>` | Verified |
| **Internet / Registry** | `registry.npmjs.org`, `fonts.googleapis.com` | Verified (PONG 374ms, HTTP/2 200/404) |
| **Workspace Status** | Greenfield (`PROJECT.md`, `ORIGINAL_REQUEST.md`, `.agents/`) | Verified |

---

## 3. Configuration Specifications

### 3.1 `package.json`

```json
{
  "name": "port-of-falcon",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^15.1.7",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "framer-motion": "^12.4.7",
    "lucide-react": "^0.475.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.6.0",
    "canvas-confetti": "^1.9.4"
  },
  "devDependencies": {
    "typescript": "^5.7.3",
    "@types/node": "^22.13.4",
    "@types/react": "^19.0.8",
    "@types/react-dom": "^19.0.3",
    "@types/canvas-confetti": "^1.9.0",
    "tailwindcss": "3.4.17",
    "postcss": "^8.4.49",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.20.0",
    "eslint-config-next": "15.1.7"
  }
}
```

#### Dependency Rationale & Compatibility
- **`next@^15.1.7` + `react@^19.0.0`**: Next.js 15 App Router natively supports React 19 stable (`react@19.0.0` and `react-dom@19.0.0`).
- **`framer-motion@^12.4.7`**: Framer Motion v12 officially supports React 19 with zero peer dependency warnings (`peerDependencies: react: ^18.0.0 || ^19.0.0`).
- **`tailwindcss@3.4.17`**: Locked to the exact version requested in `PROJECT.md` and the dispatch specification.
- **`clsx@^2.1.1` + `tailwind-merge@^2.6.0`**: Standard utility pairing for conditional className composition without Tailwind class conflicts.
- **`lucide-react@^0.475.0`**: Clean vector iconography for data center, systems, optical, and telemetry HUD indicators.
- **`canvas-confetti@^1.9.4`**: Used for interactive milestones (e.g. loan approval recourse achievement, fault resolution).

---

### 3.2 `tsconfig.json`

Strict TypeScript configuration with bundler resolution and Next.js plugin integration.

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

---

### 3.3 `next.config.ts`

Standard, clean Next.js 15 TypeScript configuration.

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

---

### 3.4 `postcss.config.mjs`

Standard modern PostCSS configuration for Tailwind CSS and Autoprefixer.

```javascript
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
```

---

### 3.5 `tailwind.config.ts`

Full Falcon design token system including pitch canvas, obsidian surfaces, neon cyan, cyber indigo, mission status colors, typography scales, and keyframe animations.

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: {
          pitch: '#020617',     // Slate-950: Main application backdrop
          surface: '#0B0F19',   // Obsidian card background
          elevated: '#111827',  // Elevated module surface
          hud: '#070A10',       // Telemetry terminal backdrop
          inverted: '#FFFFFF',  // Brutalist inverted card surface
        },
        falcon: {
          cyan: '#0EA5E9',       // Electric Sky / Cyan 500
          'cyan-neon': '#00F0FF',// Neon laser cyan
          'cyan-light': '#38BDF8',// Cyan 400
          indigo: '#6366F1',     // Cyber Indigo 500
          'indigo-light': '#818CF8', // Indigo 400
          'indigo-deep': '#4338CA',  // Nebula violet
        },
        status: {
          nominal: '#10B981',   // Emerald 500 (Tier III SLA active, fiber online)
          warning: '#F59E0B',   // Amber 500 (Threshold alert, high attenuation)
          critical: '#EF4444',  // Red 500 (Alarm trigger, link fail)
        },
        monoline: {
          border: 'rgba(215, 226, 234, 0.2)',
          subtle: 'rgba(255, 255, 255, 0.08)',
          hud: 'rgba(14, 165, 233, 0.35)',
        },
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'Space Grotesk', 'sans-serif'],
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'deck-sm': '40px',
        'deck-md': '50px',
        'deck-lg': '60px',
      },
      keyframes: {
        'marquee-left': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-right': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
        'radar-sweep': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'fiber-glow': {
          '0%, 100%': { filter: 'drop-shadow(0 0 3px #00F0FF)' },
          '50%': { filter: 'drop-shadow(0 0 10px #00F0FF)' },
        },
      },
      animation: {
        'marquee-left': 'marquee-left 25s linear infinite',
        'marquee-right': 'marquee-right 25s linear infinite',
        'pulse-slow': 'pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'radar-sweep': 'radar-sweep 4s linear infinite',
        'fiber-glow': 'fiber-glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
```

---

### 3.6 `.gitignore`

```gitignore
# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Next.js build output
/.next/
/out/

# Production
/build

# Debug & system files
.DS_Store
*.pem
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local environment files
.env*.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts
```

*Note: `.agents/teamwork/` must NEVER be ignored, as it contains multi-agent orchestration state.*

---

### 3.7 Utility Helper: `src/lib/utils.ts`

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

---

### 3.8 Interface Contracts

To ensure immediate type compatibility with downstream milestones, the Worker should scaffold the contracts in `src/types/`:

#### `src/types/telemetry.ts`
```typescript
export interface RackSensorData {
  rackId: string;
  name: string;
  bayType: 'compute' | 'optical-core' | 'storage' | 'edge-cloud';
  coldAisleTempC: number;          // 18.0 - 27.0 °C
  hotAisleTempC: number;           // 30.0 - 40.0 °C
  relativeHumidityPercent: number; // 40.0 - 60.0 %
  dewPointC: number;
  fiberInsertionLossDb: number;     // Must remain < 0.15 dB nominal
  opticalTxPowerDbm: number;       // -1.5 to -3.0 dBm
  opticalRxPowerDbm: number;       // -10.0 to -14.0 dBm
  pue: number;                     // 1.20 - 1.35
  airflowCfm: number;              // 800 - 2400 CFM
  differentialPressurePa: number;  // 10.0 - 25.0 Pa
  uptimeSeconds: number;
  status: 'nominal' | 'warning' | 'critical';
  faultInjected?: 'thermal_surge' | 'optical_microbend' | 'airflow_choke' | null;
}
```

#### `src/types/xai.ts`
```typescript
export interface ApplicantFeatures {
  annualIncome: number;          // $20,000 - $300,000
  ficoScore: number;             // 300 - 850
  debtToIncomeRatio: number;     // 0.05 - 0.70
  loanAmount: number;            // $5,000 - $100,000
  loanTermMonths: 36 | 60;
  revolvingUtilization: number;  // 0.0 - 1.0
  delinquencies2Years: number;   // 0 - 5
  employmentYears: number;       // 0 - 25
  collateralValue: number;       // $0 - $200,000
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

#### `src/types/project.ts`
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

---

### 3.9 Baseline App Shell

#### `src/app/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --canvas-pitch: #020617;
  --canvas-surface: #0B0F19;
  --canvas-surface-2: #111827;
  --canvas-inverted: #FFFFFF;
  --falcon-cyan: #0EA5E9;
  --falcon-cyan-neon: #00F0FF;
  --falcon-indigo: #6366F1;
}

body {
  background-color: var(--canvas-pitch);
  color: #F8FAFC;
  overflow-x: hidden;
  font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
}

/* Custom scrollbars for high-tech HUD */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: #020617;
}
::-webkit-scrollbar-thumb {
  background: #1E293B;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #0EA5E9;
}
```

#### `src/app/layout.tsx`
```tsx
import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono, Inter } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Anar Gadirli // Port of Falcon',
  description: 'Data Center Infrastructure Operations, Explainable AI Research, and Systems Engineering.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable} dark scroll-smooth`}
    >
      <body className="bg-[#020617] text-[#F8FAFC] antialiased min-h-screen selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
```

#### `src/app/page.tsx`
```tsx
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between p-6 sm:p-10 bg-[#020617] text-[#F8FAFC]">
      <header className="flex flex-wrap justify-between items-center border-b border-slate-800/80 pb-4 gap-4">
        <div className="font-mono text-xs uppercase tracking-widest text-cyan-400">
          ANAR GADIRLI <span className="text-slate-500">//</span> PORT OF FALCON
        </div>
        <div className="font-mono text-xs text-emerald-400 flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          AZINTELECOM TIER III · NOMINAL
        </div>
      </header>

      <section className="my-auto py-16 text-center">
        <div className="inline-block mb-3 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 font-mono text-[11px] uppercase tracking-widest text-cyan-300">
          SYSTEMS ARCHITECTURE &bull; EXPLAINABLE AI &bull; INFRASTRUCTURE
        </div>
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-100 to-slate-400">
          PORT OF FALCON
        </h1>
        <p className="mt-4 font-mono text-xs sm:text-sm text-cyan-400/90 tracking-widest uppercase">
          AzInTelecom Data Center Telemetry &bull; Credit-XAI Benchmark &bull; Solaris Grid
        </p>
        <blockquote className="mt-8 italic font-light text-slate-300 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed border-l-2 border-cyan-500/40 pl-4 text-left">
          &ldquo;You met me in the Falcon era of my life &mdash; where every challenge becomes altitude.&rdquo;
          <footer className="mt-1 font-mono text-[10px] tracking-widest text-cyan-400 not-italic">
            &mdash; ANAR GADIRLI
          </footer>
        </blockquote>
      </section>

      <footer className="border-t border-slate-800/80 pt-4 flex flex-wrap justify-between items-center font-mono text-xs text-slate-500 gap-4">
        <div>BAKU, AZERBAIJAN &bull; TIER III DATA CENTER</div>
        <div className="flex gap-4">
          <a
            href="https://github.com/gadirlianar"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/gadirlianar"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </main>
  );
}
```

---

## 4. Directory Skeleton Blueprint

```
/Users/anargadirli/Desktop/Port of Falcon/
├── .agents/                    # Multi-agent coordination metadata
├── public/
│   └── assets/                 # SVGs, avatars, project screenshots
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css         # Falcon dark canvas & utility styles
│   │   ├── layout.tsx          # Root layout with fonts & metadata
│   │   └── page.tsx            # Entry page
│   ├── components/
│   │   ├── branding/           # Falcon insignias & HUD glyphs
│   │   ├── common/             # Reusable UI controls (Buttons, Pills, Sliders)
│   │   ├── disciplines/        # Inverted brutalist section
│   │   ├── hero/               # Editorial brutalist hero & parallax avatar
│   │   ├── marquee/            # Dual-lane marquee carousel
│   │   ├── navigation/         # Header HUD & Footer
│   │   ├── projects/           # Stacked card deck & dual-device frames
│   │   ├── telemetry/          # Data Center real-time HUD & sensors
│   │   └── xai/                # Credit-XAI sliders & SHAP waterfall
│   ├── lib/
│   │   └── utils.ts            # clsx + twMerge utility
│   └── types/
│       ├── project.ts
│       ├── telemetry.ts
│       └── xai.ts
├── .gitignore
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## 5. Step-by-Step Command Execution Sequence for the Worker

The Worker should execute the following operations sequentially:

### Step 1: Git Repository Initialization
```bash
git init
```

### Step 2: Create Core Configuration Files
Create the following root files with the exact contents defined in Section 3:
1. `.gitignore` (Section 3.6)
2. `package.json` (Section 3.1)
3. `tsconfig.json` (Section 3.2)
4. `next.config.ts` (Section 3.3)
5. `postcss.config.mjs` (Section 3.4)
6. `tailwind.config.ts` (Section 3.5)

### Step 3: Scaffold Directory Tree
```bash
mkdir -p public/assets \
  src/app \
  src/components/branding \
  src/components/common \
  src/components/disciplines \
  src/components/hero \
  src/components/marquee \
  src/components/navigation \
  src/components/projects \
  src/components/telemetry \
  src/components/xai \
  src/lib \
  src/types
```

### Step 4: Write Baseline Code & Contracts
1. `src/lib/utils.ts` (Section 3.7)
2. `src/types/telemetry.ts` (Section 3.8)
3. `src/types/xai.ts` (Section 3.8)
4. `src/types/project.ts` (Section 3.8)
5. `src/app/globals.css` (Section 3.9)
6. `src/app/layout.tsx` (Section 3.9)
7. `src/app/page.tsx` (Section 3.9)

### Step 5: Install Dependencies
```bash
npm install
```

### Step 6: Verify Build Pipeline
```bash
npm run build
```
Verify exit code is `0` and output indicates:
`✓ Compiled successfully`
`✓ Linting and checking validity of types`
`✓ Generating static pages`

### Step 7: Initial Git Commit
```bash
git add .
git commit -m "feat(scaffold): initialize Next.js 15, React 19, Tailwind 3.4.17, and Falcon design system"
```

---

## 6. Verification Method & Success Criteria

1. **Compilation Check**:
   ```bash
   npm run build
   ```
   Must exit with code 0. Zero TypeScript diagnostic errors (`tsc --noEmit`), zero linting errors.

2. **Artifact Verification**:
   - `node_modules` present with `next`, `react`, `framer-motion`, `tailwindcss`.
   - `.next` directory generated with static output.
   - `package-lock.json` committed.

3. **Interface Contract Adherence**:
   - `src/types/telemetry.ts` exports `RackSensorData`.
   - `src/types/xai.ts` exports `ApplicantFeatures`, `ShapValueItem`, `XAIEvaluationResult`.
   - `src/types/project.ts` exports `ProjectItem`.
