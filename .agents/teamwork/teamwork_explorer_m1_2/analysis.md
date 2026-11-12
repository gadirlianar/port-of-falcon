# Milestone 1 Architectural Specification: Hero Section & Motion Physics

**Author:** Explorer 2 (Milestone 1 — Component Architecture, Motion Physics & Styling)  
**Date:** 2026-11-12  
**Target:** Production-ready personal portfolio for **Anar Gadirli**  
**Features Covered:** F2 (Design System & Tokens), F3 (Editorial Brutalist Hero), F4 (Hero Avatar & Dual Gradient Mask), F5 (Magnetic Parallax Cursor), F6 (Hero Tagline & Metadata Badges)  
**Workspace:** `/Users/anargadirli/Desktop/Port of Falcon`  
**State Folder:** `/Users/anargadirli/Desktop/Port of Falcon/.agents/teamwork/teamwork_explorer_m1_2`

---

## 1. Executive Summary & Architectural Decomposition

Milestone 1 establishes the foundational visual authority and motion physics for the **Port of Falcon** portfolio application. Drawing direct inspiration from the ultra-polished editorial brutalist benchmark (`omerzh.uk`) while elevating the visual identity to reflect Anar Gadirli's background in **AzInTelecom Tier III Data Center infrastructure operations**, **Explainable AI (XAI)**, and **systems engineering**, the Hero section orchestrates six modular components:

```
src/
├── components/
│   ├── branding/
│   │   └── FalconGlyph.tsx         # Aerospace geometric vector insignia (SVG)
│   └── hero/
│       ├── BrutalistHero.tsx       # Root orchestrator: fullscreen, z-index layering, overflow clip
│       ├── HeroNav.tsx             # Edge-to-edge top header with brand mark & Tier III status pill
│       ├── HeroAvatar.tsx          # Dual-gradient masked avatar with ambient cybernetic halo
│       ├── MagneticParallax.tsx    # 60fps spring physics cursor-follow with touch fallback
│       └── HeroTagline.tsx         # Bottom status metadata & "Falcon Era" signature quote
```

### Component Hierarchy & Layering Matrix
```
+-----------------------------------------------------------------------------------------+
| BrutalistHero (section: min-h-screen, h-screen, overflow-x-clip, bg-[#020617])           |
|                                                                                         |
|  [Layer 30 - Top Nav: HeroNav]                                                          |
|  [FalconGlyph + ANAR GADIRLI // PORT OF FALCON]           [TIER III NOMINAL]  [Nav Links] |
|                                                                                         |
|  [Layer 10 - Typographic Display: behind / under avatar]                                |
|    "A N A R   G A D I R L I"  (text-[13vw]-text-[17.5vw], titanium metallic clip)       |
|    "SYSTEMS ENGINEER • EXPLAINABLE AI RESEARCHER • DATA CENTER OPERATIONS"              |
|                                                                                         |
|  [Layer 20 - Centerpiece Focus: MagneticParallax -> HeroAvatar]                         |
|    Ambient Cyan/Indigo Glow Halo (blur-3xl)                                             |
|    Masked Avatar: Vertical fade (75%-100%) x Horizontal fade (0-12%, 88-100%)          |
|                                                                                         |
|  [Layer 30 - Bottom Bar: HeroTagline]                                                   |
|  [AZINTELECOM LLC // BAKU]               ["You met me in the Falcon era of my life..."] |
|  [40.4093° N, 49.8671° E]                [— ANAR GADIRLI]                               |
+-----------------------------------------------------------------------------------------+
```

---

## 2. Feature F2: Falcon Design System & Token Specifications

### 2.1 Color Matrix & CSS Variables
The design system establishes a high-contrast obsidian pitch canvas with electric cyan and cyber indigo accents, calibrated for high-performance dark-mode rendering:

```css
:root {
  /* Canvas & Surfaces */
  --falcon-pitch: #020617;         /* Deepest obsidian backdrop (Slate 950) */
  --falcon-surface: #0B0F19;       /* Elevated cards & containers */
  --falcon-surface-sub: #111827;   /* Secondary container layer */
  --falcon-hud: #070A10;           /* Telemetry terminal surface */
  --falcon-inverted: #FFFFFF;      /* Inverted brutalist section card */

  /* Falcon Accent Matrix */
  --falcon-cyan: #0EA5E9;          /* Primary accent: Electric Sky/Cyan 500 */
  --falcon-cyan-neon: #00F0FF;     /* Active pulse, telemetry lasers */
  --falcon-cyan-light: #38BDF8;    /* Glowing border / text highlights */
  --falcon-cyan-dim: rgba(14, 165, 233, 0.15); /* Glassmorphic glow */
  
  --falcon-indigo: #6366F1;        /* Secondary accent: Cyber Indigo 500 */
  --falcon-indigo-light: #818CF8;  /* Indigo highlight */
  --falcon-indigo-deep: #4338CA;   /* Nebula depth gradient */

  /* Mission-Critical Status Accents */
  --status-nominal: #10B981;       /* Emerald: Tier III active, link loss <0.15 dB */
  --status-warning: #F59E0B;       /* Amber: Marginal signal, high rack temp */
  --status-critical: #EF4444;      /* Crimson: Link drop, thermal spike */

  /* Text & Titanium Gradients */
  --text-primary: #F8FAFC;         /* High-contrast crisp white */
  --text-secondary: #D7E2EA;       /* Benchmark silvery titanium slate */
  --text-muted: #94A3B8;           /* Muted descriptive copy */
  --text-dim: #64748B;             /* Low-emphasis micro-labels */
  --border-monoline: rgba(215, 226, 234, 0.15); /* Hairline brutalist divider */
}
```

### 2.2 Typography Scale & Families
- **Display Heading**: Space Grotesk (`font-display`), 900 Black weight, uppercase, tracking-tighter (`-0.05em`), leading-none (`0.85 - 0.9`).
- **Telemetry & Technical Monospace**: JetBrains Mono (`font-mono`), 500 Medium / 600 SemiBold, tracking-wider (`0.05em - 0.25em`).
- **Interface & Body**: Inter (`font-sans`), 400 Regular / 500 Medium, tracking-normal.

---

## 3. Feature F3: Editorial Brutalist Hero Section (`BrutalistHero.tsx`)

### 3.1 Architectural Constraints & Mechanics
1. **Fullscreen Viewport Containment**: Section height is locked to `min-h-screen h-screen` (or `h-[100dvh]` on mobile to prevent address bar jitter) with `relative flex flex-col justify-between overflow-x-clip bg-[#020617]`.
2. **Giant Responsive Headline**: Sized fluidly using `text-[13vw] sm:text-[14vw] md:text-[15.5vw] lg:text-[17.5vw]` with `font-black leading-none tracking-tighter uppercase whitespace-nowrap select-none text-center`.
3. **Zero Horizontal Overflow (`overflow-x: clip`)**:
   - `overflow-x: clip` prevents horizontal scrollbars while preserving `position: sticky` contexts in downstream child sections (unlike `overflow: hidden` which destroys sticky positioning in modern CSS).
   - Text is set to `w-full text-center whitespace-nowrap` inside a container with `w-full overflow-hidden`.
4. **Signature Titanium Gradient Text Clip**:
   - Primary Benchmark Formula: `linear-gradient(180deg, #646973 0%, #bbccd7 100%)`
   - High-Tech Falcon Titanium-Cyan Hybrid: `linear-gradient(180deg, #FFFFFF 0%, #bbccd7 40%, #0EA5E9 100%)`
   - Applied via CSS: `background-clip: text`, `-webkit-background-clip: text`, `-webkit-text-fill-color: transparent`, `color: transparent`.

### 3.2 Exact Code Implementation: `src/components/hero/BrutalistHero.tsx`

```tsx
'use client';

import React from 'react';
import HeroNav from './HeroNav';
import HeroAvatar from './HeroAvatar';
import MagneticParallax from './MagneticParallax';
import HeroTagline from './HeroTagline';

export interface BrutalistHeroProps {
  className?: string;
  name?: string;
  subtitle?: string;
}

export default function BrutalistHero({
  className = '',
  name = 'ANAR GADIRLI',
  subtitle = 'SYSTEMS ENGINEER • EXPLAINABLE AI RESEARCHER • DATA CENTER OPERATIONS',
}: BrutalistHeroProps) {
  return (
    <section
      aria-label="Hero Section"
      className={`relative flex min-h-screen h-[100dvh] w-full flex-col justify-between overflow-x-clip bg-[#020617] text-[#F8FAFC] select-none ${className}`}
    >
      {/* Background Subtle Cybernetic Grid / Vignette */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_40%,rgba(14,165,233,0.08)_0%,transparent_70%)]" 
        aria-hidden="true"
      />
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-20 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* Layer 30: Top Navigation & Status Pill */}
      <HeroNav />

      {/* Layer 10: Giant Editorial Brutalist Heading (Z-10) */}
      <div className="relative z-10 my-auto flex w-full flex-col items-center justify-center px-4 overflow-hidden pointer-events-none">
        <h1 
          className="w-full text-center font-display font-black uppercase leading-[0.88] tracking-tighter whitespace-nowrap text-[13vw] sm:text-[14vw] md:text-[15.5vw] lg:text-[17.5vw] transition-transform duration-300"
          style={{
            background: 'linear-gradient(180deg, #646973 0%, #bbccd7 60%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
            textShadow: '0 20px 40px rgba(0,0,0,0.5)',
          }}
        >
          {name}
        </h1>
        
        <p className="mt-3 md:mt-4 text-center font-mono text-[10px] sm:text-xs md:text-sm tracking-[0.22em] sm:tracking-[0.3em] uppercase text-cyan-400/90 font-medium px-4">
          {subtitle}
        </p>
      </div>

      {/* Layer 20: Centerpiece Magnetic Avatar (Z-20) */}
      <div className="pointer-events-auto absolute left-1/2 top-1/2 z-20 w-[270px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[350px] sm:translate-y-0 md:w-[440px] lg:w-[500px] xl:w-[540px]">
        <MagneticParallax padding={150} strength={3}>
          <HeroAvatar />
        </MagneticParallax>
      </div>

      {/* Layer 30: Bottom Bar with Metadata & Falcon Era Tagline (Z-30) */}
      <HeroTagline />
    </section>
  );
}
```

---

## 4. Feature F4: Hero Avatar & Dual Gradient Mask (`HeroAvatar.tsx`)

### 4.1 Mask Physics & Blending Mathematics
The benchmark avatar blurs seamlessly into the background without harsh bounding box borders using two orthogonal linear alpha masks:
1. **Vertical Alpha Mask**:
   $$\text{Mask}_v(y) = \begin{cases} 1.0 & 0\% \le y \le 75\% \\ \frac{100\% - y}{25\%} & 75\% < y \le 100\% \end{cases}$$
   Fades the bottom 25% of the portrait smoothly into the `#020617` obsidian background.
2. **Horizontal Alpha Mask**:
   $$\text{Mask}_h(x) = \begin{cases} \frac{x}{12\%} & 0\% \le x \le 12\% \\ 1.0 & 12\% < x < 88\% \\ \frac{100\% - x}{12\%} & 88\% \le x \le 100\% \end{cases}$$
   Softens both lateral edges to eliminate rectangular silhouette artifacts.

### 4.2 Cross-Browser Composite vs Nested Container Architecture
While WebKit supports `-webkit-mask-composite: source-in;`, Firefox and standard specifications use `mask-composite: intersect;`. Because browser engines historically differ in composite keywords, our design provides two options:
- **Option A (Inline Style)**: Direct dual-gradient declaration with vendor prefixes.
- **Option B (Zero-Bug Nested Wrapper)**: An outer container applying the vertical mask enclosing an inner container applying the horizontal mask. Mathematically:
  $$\alpha_{\text{total}}(x, y) = \text{Mask}_v(y) \times \text{Mask}_h(x)$$
  This guarantees 100% bug-free rendering across Safari (iOS/macOS), Chrome, Edge, and Firefox without relying on vendor composite keywords!

### 4.3 Ambient Cyan/Indigo Glow Halo
Positioned at `z-[-1]` behind the avatar:
```tsx
<div 
  className="absolute -inset-6 -z-10 rounded-full bg-gradient-to-tr from-cyan-500/25 via-sky-500/20 to-indigo-600/25 blur-3xl opacity-80 animate-pulse duration-[5000ms]"
  aria-hidden="true" 
/>
```

### 4.4 Exact Code Implementation: `src/components/hero/HeroAvatar.tsx`

```tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export interface HeroAvatarProps {
  imageSrc?: string;
  altText?: string;
  className?: string;
}

export default function HeroAvatar({
  imageSrc = '/assets/anar-falcon-avatar.svg',
  altText = 'Anar Gadirli — Falcon Era Avatar',
  className = '',
}: HeroAvatarProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`relative aspect-square w-full select-none ${className}`}>
      {/* Ambient Cybernetic Cyan/Indigo Glow Halo */}
      <div 
        className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-gradient-to-tr from-cyan-500/30 via-sky-400/20 to-indigo-600/30 blur-3xl opacity-75 animate-pulse"
        style={{ animationDuration: '4s' }}
        aria-hidden="true"
      />

      {/* Secondary Concentric Orbital Ring (High-Tech Falcon HUD motif) */}
      <div 
        className="pointer-events-none absolute -inset-2 -z-10 rounded-full border border-cyan-500/15 opacity-50"
        aria-hidden="true"
      />

      {/* Dual Gradient Masked Container (Zero-Bug Nested Architecture) */}
      {/* Outer wrapper: Vertical mask (75% to 100%) */}
      <div 
        className="relative h-full w-full"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, #000 75%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, #000 75%, transparent 100%)',
        }}
      >
        {/* Inner wrapper: Horizontal mask (0-12% and 88-100%) */}
        <div 
          className="relative h-full w-full overflow-hidden"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)',
          }}
        >
          {!imgError ? (
            <Image
              src={imageSrc}
              alt={altText}
              fill
              priority
              sizes="(max-width: 640px) 270px, (max-width: 1024px) 440px, 540px"
              className="object-cover object-center scale-[1.02] filter contrast-[1.08] brightness-[0.98]"
              onError={() => setImgError(true)}
            />
          ) : (
            /* Procedural Vector Avatar Fallback */
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-slate-900 via-slate-950 to-[#020617] p-8 text-center border border-cyan-500/20 rounded-2xl">
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/30">
                  <svg className="h-10 w-10 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-cyan-300">
                  ANAR GADIRLI // FALCON
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

---

## 5. Feature F5: Magnetic Parallax Cursor Interaction (`MagneticParallax.tsx`)

### 5.1 Fluid Cursor Physics & Mathematical Modeling
The magnetic interaction gives the avatar physical mass and attraction toward the user's cursor:
1. **Target Bounding Zone**:
   Let element rectangle be defined by $(L, T, W, H)$ with center $C = (L + \frac{W}{2}, T + \frac{H}{2})$.
   Capture padding: $P = 150\text{px}$.
   Active capture bounding box:
   $$X_{\min} = L - P, \quad X_{\max} = L + W + P$$
   $$Y_{\min} = T - P, \quad Y_{\max} = T + H + P$$
2. **Attraction Displacement**:
   When cursor position $(M_x, M_y)$ falls within the capture zone:
   $$\Delta x = M_x - C_x, \quad \Delta y = M_y - C_y$$
   $$\text{Target}_x = \frac{\Delta x}{\text{strength}}, \quad \text{Target}_y = \frac{\Delta y}{\text{strength}} \quad (\text{with strength} = 3)$$
   Max displacement is clamped: $|\text{Target}| \le \text{maxOffset}$ (typically $45\text{px}$).
3. **Inertia Reset**:
   When the cursor exits the zone or triggers `mouseleave` on `window`, the displacement targets reset to $(0, 0)$ with a smooth spring decay ($Damping = 20, Stiffness = 160$).
4. **Touch Device Fallback**:
   Evaluated at mount and viewport change:
   `window.matchMedia('(hover: none) and (pointer: coarse)')`
   On touch screens (smartphones, tablets), mouse listeners are bypassed, avoiding touch event hijacking, jitter, or console warnings.

### 5.2 Exact Code Implementation: `src/components/hero/MagneticParallax.tsx`

```tsx
'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useSpring } from 'framer-motion';

export interface MagneticParallaxProps {
  children: React.ReactNode;
  padding?: number;     // Active magnetic bounding radius in pixels (default 150)
  strength?: number;    // Divisor for mouse delta (higher = subtler movement, default 3)
  maxOffset?: number;   // Maximum translation clamp in pixels (default 45)
  className?: string;
}

export default function MagneticParallax({
  children,
  padding = 150,
  strength = 3,
  maxOffset = 45,
  className = '',
}: MagneticParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // High-performance Framer Motion springs for 60/120fps organic movement
  const springConfig = { damping: 20, stiffness: 160, mass: 0.6 };
  const springX = useSpring(0, springConfig);
  const springY = useSpring(0, springConfig);

  // Detect touch screens to prevent event listener overhead or sticky touch jumps
  useEffect(() => {
    const checkTouch = () => {
      const isTouch =
        window.matchMedia('(hover: none)').matches ||
        window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window;
      setIsTouchDevice(isTouch);
    };

    checkTouch();
    const mediaQuery = window.matchMedia('(hover: none)');
    mediaQuery.addEventListener?.('change', checkTouch);
    return () => mediaQuery.removeEventListener?.('change', checkTouch);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isTouchDevice || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Define bounding capture zone with padding
      const minX = rect.left - padding;
      const maxX = rect.right + padding;
      const minY = rect.top - padding;
      const maxY = rect.bottom + padding;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      if (mouseX >= minX && mouseX <= maxX && mouseY >= minY && mouseY <= maxY) {
        // Cursor is within magnetic field
        const deltaX = (mouseX - centerX) / strength;
        const deltaY = (mouseY - centerY) / strength;

        // Clamp to maximum allowed displacement
        const clampedX = Math.max(-maxOffset, Math.min(maxOffset, deltaX));
        const clampedY = Math.max(-maxOffset, Math.min(maxOffset, deltaY));

        springX.set(clampedX);
        springY.set(clampedY);
      } else {
        // Cursor is outside magnetic field -> return smoothly to center
        springX.set(0);
        springY.set(0);
      }
    },
    [isTouchDevice, padding, strength, maxOffset, springX, springY]
  );

  const handleMouseLeave = useCallback(() => {
    springX.set(0);
    springY.set(0);
  }, [springX, springY]);

  useEffect(() => {
    if (isTouchDevice) return;

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isTouchDevice, handleMouseMove, handleMouseLeave]);

  if (isTouchDevice) {
    // Render static centered element without transform listeners on touch devices
    return <div className={`relative ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      ref={containerRef}
      style={{
        x: springX,
        y: springY,
      }}
      className={`relative will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
```

---

## 6. Feature F6: Hero Tagline & Metadata Badges

### 6.1 Top Navigation & Status Pill (`src/components/hero/HeroNav.tsx`)

#### Functional Elements:
1. **Brand Wordmark & Glyph**:
   `FalconGlyph` accompanied by `ANAR GADIRLI // PORT OF FALCON` in `font-mono text-xs uppercase tracking-widest text-slate-200`.
2. **AzInTelecom Tier III Live Status Pill**:
   Demonstrates mission-critical active data center monitoring:
   `AZINTELECOM TIER III · NOMINAL`
   Framed with `border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-[10px] tracking-wider rounded-full px-2.5 py-1`.
   Includes animated emerald ping dot:
   `<span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>`
3. **Smooth Navigation Anchor Links**:
   `#about`, `#telemetry`, `#xai`, `#projects`, `#contact`.
   Styled with `hover:text-cyan-400 transition-colors uppercase tracking-widest font-mono text-xs`.

#### Exact Code Implementation: `src/components/hero/HeroNav.tsx`

```tsx
'use client';

import React from 'react';
import Link from 'next/link';
import FalconGlyph from '../branding/FalconGlyph';

export interface HeroNavProps {
  className?: string;
}

export default function HeroNav({ className = '' }: HeroNavProps) {
  const navItems = [
    { label: 'ABOUT', href: '#about' },
    { label: 'TELEMETRY', href: '#telemetry' },
    { label: 'XAI', href: '#xai' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <header
      className={`relative z-30 flex items-center justify-between px-6 pt-6 sm:px-8 sm:pt-8 md:px-12 md:pt-10 ${className}`}
    >
      {/* Brand Identity & Live Status */}
      <div className="flex items-center gap-3 md:gap-4">
        <Link href="/" className="group flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1">
          <FalconGlyph className="h-6 w-6 text-cyan-400 transition-transform duration-300 group-hover:scale-110 group-hover:text-cyan-300" />
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 group-hover:text-white transition-colors">
            ANAR GADIRLI <span className="text-cyan-400">//</span> PORT OF FALCON
          </span>
        </Link>

        {/* Live AzInTelecom Tier III Telemetry Status Pill */}
        <div 
          className="hidden lg:flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[10px] tracking-wider text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
          title="Tier III Data Center Infrastructure Nominal SLA"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span>AZINTELECOM TIER III · NOMINAL</span>
        </div>
      </div>

      {/* Navigation Anchor Links */}
      <nav aria-label="Main Navigation">
        <ul className="flex items-center gap-4 sm:gap-6 md:gap-8 font-mono text-xs md:text-sm uppercase tracking-wider text-[#D7E2EA]">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="relative py-1 text-slate-300 transition-colors hover:text-cyan-400 focus-visible:text-cyan-400 outline-none group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
```

---

### 6.2 Hero Bottom Bar & Tagline (`src/components/hero/HeroTagline.tsx`)

#### Exact Code Implementation: `src/components/hero/HeroTagline.tsx`

```tsx
'use client';

import React from 'react';

export interface HeroTaglineProps {
  className?: string;
  tagline?: string;
  location?: string;
  facility?: string;
}

export default function HeroTagline({
  className = '',
  tagline = 'You met me in the Falcon era of my life — where every challenge becomes altitude.',
  location = 'BAKU, AZERBAIJAN // 40.4093° N, 49.8671° E',
  facility = 'AZINTELECOM LLC // DATA CENTER INFRASTRUCTURE',
}: HeroTaglineProps) {
  return (
    <footer
      className={`relative z-30 mt-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 px-6 pb-6 sm:px-8 sm:pb-8 md:px-12 md:pb-10 ${className}`}
    >
      {/* Left: Facility & Telemetry Credentials */}
      <div className="max-w-[320px] font-mono text-[11px] sm:text-xs uppercase leading-relaxed text-slate-400">
        <div className="flex items-center gap-2 text-cyan-400 font-bold mb-0.5 tracking-wider">
          <span className="inline-block h-1.5 w-1.5 bg-cyan-400 rounded-sm" />
          <span>{facility}</span>
        </div>
        <p className="text-slate-400 tracking-wide text-[10px] sm:text-[11px]">
          TIER III UPTIME &bull; OPTICAL FIBER INTEGRITY &bull; {location}
        </p>
      </div>

      {/* Right: Signature Falcon Era Tagline Quote */}
      <div className="max-w-[320px] sm:max-w-[420px] md:max-w-[480px] text-left sm:text-right font-light leading-snug tracking-wide text-[#D7E2EA]">
        <blockquote className="italic text-xs sm:text-sm text-slate-200">
          &ldquo;{tagline}&rdquo;
        </blockquote>
        <cite className="not-italic block mt-1 font-mono text-[10px] tracking-widest text-cyan-400/80 uppercase">
          &mdash; ANAR GADIRLI
        </cite>
      </div>
    </footer>
  );
}
```

---

### 6.3 Falcon Insignia Glyph (`src/components/branding/FalconGlyph.tsx`)

A bespoke, razor-sharp vector glyph synthesizing an aerospace falcon silhouette with high-tech geometric cybernetics:

```tsx
'use client';

import React from 'react';

export interface FalconGlyphProps {
  className?: string;
  size?: number;
}

export default function FalconGlyph({ className = 'w-6 h-6', size }: FalconGlyphProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-label="Falcon Insignia"
    >
      <defs>
        <linearGradient id="falconCyanGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00F0FF" />
          <stop offset="50%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
      </defs>

      {/* Center Aerodynamic Apex */}
      <polygon
        points="16,2 19,13 16,11 13,13"
        fill="url(#falconCyanGrad)"
      />

      {/* Primary Swept Wings (Brutalist Angular Lines) */}
      <polygon
        points="16,11 28,5 24,18 19,16"
        fill="url(#falconCyanGrad)"
        fillOpacity="0.9"
      />
      <polygon
        points="16,11 4,5 8,18 13,16"
        fill="url(#falconCyanGrad)"
        fillOpacity="0.9"
      />

      {/* Secondary Stepped Feathers (Cybernetic Vanes) */}
      <polygon
        points="19,16 26,22 21,23 17,19"
        fill="#38BDF8"
        fillOpacity="0.8"
      />
      <polygon
        points="13,16 6,22 11,23 15,19"
        fill="#38BDF8"
        fillOpacity="0.8"
      />

      {/* Tail Fin Stabilizer */}
      <polygon
        points="16,19 18,30 16,28 14,30"
        fill="url(#falconCyanGrad)"
      />
    </svg>
  );
}
```

---

## 7. Layout Architecture, Overflow Containment & Fluid Viewport Scaling

### 7.1 The Zero Horizontal Overflow Guarantee (`overflow-x: clip`)
In editorial brutalist design, typography must stretch aggressively to the edges of the screen. Under standard CSS, this frequently leads to horizontal micro-scrollbars ($100\text{vw} + 12\text{px}$), causing horizontal wobble on mobile devices.

To completely prevent horizontal overflow while preserving downstream sticky positioning:
1. **Container Styling**:
   ```css
   .hero-container {
     position: relative;
     width: 100%;
     min-height: 100vh;
     min-height: 100dvh;
     overflow-x: clip; /* Eliminates horizontal spill without creating a new scroll container */
     background-color: #020617;
   }
   ```
2. **Heading Container**:
   ```tsx
   <div className="relative z-10 w-full overflow-hidden text-center pointer-events-none">
     <h1 className="w-full text-center whitespace-nowrap text-[13vw] sm:text-[14vw] md:text-[15.5vw] lg:text-[17.5vw] leading-[0.88] tracking-tighter">
       ANAR GADIRLI
     </h1>
   </div>
   ```
3. **Viewport Breakpoint Matrix**:
   | Viewport | Width Range | Headline Size | Avatar Dimensions | Parallax State | Bottom Tagline Layout |
   |---|---|---|---|---|---|
   | **Mobile SE / Narrow** | `< 400px` | `text-[13vw]` | `w-[260px]`, centered | Disabled (`hover: none`) | Stacked vertically |
   | **Mobile Standard** | `400px - 640px` | `text-[13.5vw]` | `w-[320px]`, centered | Disabled (`hover: none`) | Stacked vertically |
   | **Tablet (iPad)** | `640px - 1024px` | `text-[14.5vw]` | `w-[400px]`, bottom-anchored | Active or touch-fallback | 2-column flex row |
   | **Desktop Standard** | `1024px - 1536px` | `text-[16vw]` | `w-[480px]`, bottom-anchored | Active (150px / strength 3) | 2-column flex row |
   | **Ultrawide (4K)** | `> 1536px` | `text-[17.5vw]` | `w-[540px]`, bottom-anchored | Active (150px / strength 3) | 2-column flex row |

---

## 8. Implementation Blueprint & Verification Checklist

### 8.1 File Creation Plan for Milestone 1 Worker
1. `src/components/branding/FalconGlyph.tsx` — Vector insignia
2. `src/components/hero/HeroNav.tsx` — Top header, brand wordmark, live Tier III status pill, navigation
3. `src/components/hero/HeroAvatar.tsx` — Dual-masked avatar with ambient halo and fallback
4. `src/components/hero/MagneticParallax.tsx` — 60fps spring physics and touch fallback
5. `src/components/hero/HeroTagline.tsx` — Facility status & Falcon Era quote
6. `src/components/hero/BrutalistHero.tsx` — Fullscreen root orchestrator
7. Integration in `src/app/page.tsx` rendering `<BrutalistHero />`

### 8.2 Verification Checklist
- [ ] **Build Validation**: Clean compilation via `npm run build` with zero TypeScript or ESLint errors.
- [ ] **Horizontal Overflow Audit**: Test on 320px, 375px, 768px, 1024px, 1440px, and 2560px viewports; verify `window.innerWidth === document.documentElement.clientWidth` (zero horizontal scroll).
- [ ] **Mask Quality**: Verify the dual mask fades the avatar cleanly into `#020617` at the bottom (75%-100%) and lateral edges (0-12%, 88-100%).
- [ ] **Magnetic Cursor Physics**: Verify mouse movement within 150px bounding box smoothly translates the avatar with strength 3; verify inertia resets to (0, 0) on exit.
- [ ] **Mobile Fallback**: Emulate touch screen or `(hover: none)`; verify mouse listeners are skipped and avatar stays centered without jumps or errors.
- [ ] **Typography & Branding**: Confirm "ANAR GADIRLI" metallic titanium gradient text clip, AzInTelecom Tier III status pill pulse, and Falcon Era quote render crisply.
