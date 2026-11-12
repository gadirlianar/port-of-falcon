# Benchmark & Aesthetics Specification: Port of Falcon
**Author:** Explorer 2 (Spec Miner: Benchmark & Aesthetics)  
**Date:** 2026-11-12  
**Target:** Production-ready personal portfolio for **Anar Gadirli**  
**Benchmark Reference:** [https://omerzh.uk](https://omerzh.uk) (Omar Zahidli)  
**Workspace:** `/Users/anargadirli/Desktop/Port of Falcon`

---

## 1. Executive Summary & Benchmark Dissection

The benchmark portfolio (`omerzh.uk`) presents an ultra-polished editorial brutalist aesthetic combining:
1. **Fullscreen brutalist hero** with massive viewport-width typography (`text-[14vw]` up to `17.5vw`), metallic gradient text clip (`linear-gradient(180deg, #646973, #bbccd7)`), magnetic mouse-follow avatar with a double gradient mask, and clean corner metadata.
2. **Horizontal marquee showcase** featuring two opposing rows of widescreen product preview cards (`420x270px`, `rounded-2xl`) translated smoothly on scroll (`requestAnimationFrame` scroll delta interpolation).
3. **Kinetic "About Me" section** featuring character-by-character scroll opacity scrub (`Fu(scrollYProgress, [i/len, (i+1)/len], [0.2, 1.0])`) flanked by 4 floating glassmorphic tech squircle badges (`rounded-[28%]`, `box-shadow: 0 30px 80px rgba(...)`) with subtle tilt and responsive positioning.
4. **Stark Inverted Brutalist Section ("Services")** transitioning into a pure white card with massive rounded top corners (`rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-white`), giant index numerals (`01`, `02`, `03` in `clamp(3rem, 10vw, 140px)`), and thin hairline borders (`1px solid rgba(12, 12, 12, 0.15)`).
5. **Sticky Stacked Overlapping Card Deck ("Projects")** overlapping the previous section with negative top margin (`-mt-10 sm:-mt-12 md:-mt-14`), pinned at `sticky top-24 md:top-32 h-[85vh]`, scaling progressively as subsequent cards stack over them (`scale: useTransform(progress, [r/total, 1], [1, 1 - (total - 1 - r) * 0.03])`), with an internal split showing desktop captures and a glowing phone frame mockup.

### The Falcon Ascension: Elevating the Benchmark
While `omerzh.uk` delivers business analysis and no-code consulting with purple/amber accents, **Port of Falcon** elevates this baseline into an elite aerospace and systems engineering experience reflecting Anar Gadirli's background:
- **AzInTelecom Tier III Data Center Infrastructure** operations and mission-critical telemetry.
- **Explainable AI (XAI)** empirical research benchmark evaluating real-time inference latency vs. explanation faithfulness (TreeSHAP, FastSHAP, KernelSHAP, LIME).
- **High-Tech Falcon Identity**: Tagline *"You met me in the Falcon era of my life — where every challenge becomes altitude."*
- **Color Matrix**: Deep obsidian pitch canvas (`#020617` / `#0B0F19`), electric cyan (`#0EA5E9`), cyber indigo (`#6366F1`), and neon telemetry status accents.
- **Side-by-Side Dual-Device Mockups**: Simultaneous desktop browser viewport (16:10 with macOS traffic lights, active address capsule) and mobile smartphone chassis (9:19.5 with Dynamic Island pill) for all featured projects (`credit-xai-benchmark`, `Solaris-Energy`, `Store-MA`).

---

## 2. Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Hero & Navigation | Fullscreen Brutalist Header & Top Nav | Edge-to-edge top bar with brand wordmark, telemetry status pill, and uppercase navigation anchor links | Viewport width, scroll position | Fixed/absolute nav bar, hover opacity transitions (0.7) | Graceful wrap on small viewports (<360px) | `omerzh.uk` JS inspection (`FS` component, `_S` array) |
| 2 | Hero & Typography | Giant Editorial Brutalist Heading | Viewport-scaled fluid typography (`text-[14vw]` - `17.5vw`) with metallic titanium-to-cyan gradient clip | Window resize event, font loading | Centered, single-line uppercase title with zero horizontal scroll overflow | `overflowX: clip` on container prevents page stretch | `omerzh.uk` JS/CSS (`.hero-heading`, Kanit font) |
| 3 | Hero & Motion | Magnetic Mouse-Follow Parallax Avatar | Centerpiece visual emblem tracking cursor within defined bounding radius (`padding: 150px`, `strength: 3`) | Mouse position `(clientX, clientY)`, element rect | `transform: translate3d(x, y, 0)` with ease-out transition (0.3s) | Inertia reset to `(0,0)` on mouseleave (0.5s ease-in-out); disabled on touch screens | `omerzh.uk` JS (`jS` component) |
| 4 | Hero & Layout | Double Linear Gradient Mask | Dual horizontal and vertical alpha mask on avatar/emblem for seamless blending into dark background | WebKit mask properties | Soft fade at base (78% to 100%) and edges (0-14%, 86-100%) | Degrades to clean opacity cut if `mask-image` unsupported | `omerzh.uk` JS (`FS` mask inline styles) |
| 5 | Showcase & Motion | Dual-Lane Scroll-Linked Marquee Carousel | Two opposing horizontal rows of widescreen project cards translating dynamically with scroll delta | `window.scrollY`, viewport height, requestAnimationFrame | Lane 1 translates `+(m - 200)px`; Lane 2 translates `-(m - 200)px` | Clamped boundaries; paused or throttled when out of viewport | `omerzh.uk` JS (`US` & `yp` components) |
| 6 | About Section | Character-by-Character Scroll Reveal (`HS`) | Splits biographical paragraph into individual letters, scrubbing opacity from 0.2 to 1.0 as user scrolls | `useScroll` target progress `[0, 1]` | Synchronized reading illumination effect | Progressive disclosure; screen readers read intact `aria-label` | `omerzh.uk` JS (`HS` & `WS` components) |
| 7 | About Section | Floating Glassmorphic Kinetic Badges | 4 squircle badges (`rounded-[28%]`) positioned at cardinal corners, with subtle rotation and parallax entry | Scroll trigger, delay `0.1s - 0.3s`, offset `x: ±80px` | Glassmorphic cards with cyan/indigo glow and tech logos | Hidden on ultra-narrow viewports (<480px) to prevent overlap | `omerzh.uk` JS (`KS`, `$S`, `IS` components) |
| 8 | Brutalist Inversion | Inverted White Section with Negative Margins | Stark contrast white card (`bg-white text-slate-950`) with rounded top (`rounded-t-[60px]`) and negative top margin | Section position in DOM | Visual shock/contrast transition between dark obsidian chapters | High-contrast accessibility compliance (>14:1 ratio) | `omerzh.uk` JS (`GS` services component) |
| 9 | Brutalist List | Giant Numbered Index Items | Big numeral counters (`01`, `02`, `03` in `clamp(3rem, 10vw, 140px)`) next to technical capabilities | Array data `(item, index)` | Left-aligned 2-digit index with hairline dividers (`border-t`, `border-b`) | Responsive reduction to `3rem` on mobile | `omerzh.uk` JS (`GS` item list) |
| 10 | Card Deck | Sticky Stacked Overlapping Card Deck | Overlapping project cards pinned at `top-24 md:top-32 h-[85vh]` with negative margin (`-mt-14 md:-mt-16`) | `useScroll` scroll progress `scrollYProgress` | Card scales down (`scale: 1 - (total-1-r)*0.03`) as next card slides over | Pinned layout falls back to normal block stack if sticky unsupported | `omerzh.uk` JS (`QS` & `XS` components) |
| 11 | Card Deck | Progressive Top Stacking Offset | Subsequent cards offset downward by `${index * 28}px` (or `${index * 32}px`), forming a visible deck header | Card index `r` | Visually layered deck edge visible behind active card | Prevents overflow clipping within `85vh` viewport | `omerzh.uk` JS (`XS` inline style `top`) |
| 12 | Dual Mockup | Side-by-Side Dual-Device Viewports | Desktop browser frame (16:10, macOS traffic lights, active URL) paired with Mobile device frame (9:19.5, Dynamic Island) | Project preview data, interactive state | Widescreen side-by-side presentation (62%/38% split) | Stacks vertically on mobile/tablet viewports (<1024px) | ORIGINAL_REQUEST.md (R2), enhanced from `omerzh.uk` |
| 13 | Interactive XAI | Real-Time Credit XAI Benchmark Simulator | Interactive credit applicant feature sliders (income, utilization, debt-ratio) with instant SHAP attribution bars | Slider inputs (5 features), Model selector | Dynamic risk score (0-100%), approval tier, SHAP positive/negative waterfall | Values clamped within valid domain ranges; NaN safeguards | ORIGINAL_REQUEST.md (R2), `gadirlianar/credit-xai-benchmark` |
| 14 | Telemetry HUD | Tier III Data Center Telemetry HUD | Real-time simulated telemetry dashboard for AzInTelecom Data Center: rack temps, optical fiber loss (<0.15 dB), uptime | Timer interval (1.5s), simulated jitter generator | Dynamic live metrics, pulse animations, signal loss gauge, airflow CFM | Warning states trigger color change (cyan -> amber -> red) | ORIGINAL_REQUEST.md (R3), AzInTelecom profile |
| 15 | Visual Identity | Falcon Aerospace Cybernetics Theme | Cohesive styling using electric cyan `#0EA5E9`, cyber indigo `#6366F1`, obsidian canvas `#020617`, and falcon emblems | CSS variables, Tailwind classes | Futuristic, high-precision command-center aesthetic | Maintained across all interactive states | ORIGINAL_REQUEST.md, Anar Gadirli bio & tagline |
| 16 | External Links | Verified Social & Research Outbound Links | External links to GitHub, LinkedIn, and IEEE research paper with security attributes | URL strings, hover states | Styled pill anchor buttons with `target="_blank"` and `rel="noopener noreferrer"` | Visual external indicator icon, focus-visible outlines | ORIGINAL_REQUEST.md Acceptance Criteria |

---

## 3. Edge Cases

| # | Feature | Input / Condition | Observed / Required Behavior |
|---|---------|-------------------|-----------------------------|
| 1 | Giant Hero Heading | Small mobile viewport (320px width, e.g. iPhone SE) | Font size scales via `clamp(2.5rem, 14vw, 17.5vw)` to avoid line wrapping; `leading-none` and `tracking-tighter` maintain compact vertical footprint without clipping. |
| 2 | Magnetic Parallax Avatar | Touchscreen or mobile device with no mouse pointer (`hover: none`) | Event listener detects touch capability or `window.matchMedia('(hover: none)')`; translates gracefully to static centered position without throw errors or jumpy touches. |
| 3 | Horizontal Marquee Carousel | User rapidly scrolling or viewport resized mid-scroll | `requestAnimationFrame` with passive scroll listener throttles coordinate calculation; `will-change: transform` prevents paint flashing or frame drops. |
| 4 | Stacked Card Deck (`QS`) | Container scrolled past the final project card | Sticky container unpins cleanly at `end end` offset; trailing content flows naturally without overlap or lingering z-index traps. |
| 5 | Stacked Card Deck (`XS`) | User on small mobile screens (<640px) | Card height adapts from fixed `h-[85vh]` to `min-h-[85vh] h-auto`, dual-device mockups stack vertically with desktop on top and mobile beneath. |
| 6 | Inverted White Section | Transition between Dark `#020617` and White `#FFFFFF` | Overlapping negative top margin (`-mt-10 md:-mt-14`) combined with `rounded-t-[60px]` creates a smooth curved cut into the preceding section without seam artifacts. |
| 7 | Dual-Device Mockup | High DPI / Retina display (DPR >= 2.0) | SVG browser chrome and mobile chassis borders render crisp subpixel vector lines; internal mockups use sharp SVG vector UI or optimized WebP. |
| 8 | Character Scrub (`HS`) | Screen reader or accessibility tools | Full text preserved in `p[aria-label]`; individual animated character spans marked with `aria-hidden="true"` so screen readers announce clean, unbroken text. |
| 9 | XAI Interactive Sliders | User drags multiple sliders simultaneously or inputs extreme values | State updates clamped strictly within mathematical bounds (e.g. utilization 0-100%, DTI 0.0-1.5); microsecond recalculation updates SHAP waterfall instantly. |
| 10 | Data Center Telemetry Stream | User navigates tab away (background tab) | Telemetry simulation pauses or throttles tick rate when `document.hidden === true` to conserve CPU/battery, resuming instantly on focus. |

---

## 4. Design System & Token Specifications

### 4.1 Color Architecture & Matrix

```
Canvas & Surfaces:
  --canvas-pitch:      #020617   /* Slate-950: Main application backdrop */
  --canvas-surface:    #0B0F19   /* Card background, deep obsidian */
  --canvas-surface-2:  #111827   /* Elevated modules, secondary cards */
  --canvas-hud:        #070A10   /* Telemetry telemetry terminal surface */
  --canvas-inverted:   #FFFFFF   /* Stark brutalist inverted section surface */
  --text-inverted:     #020617   /* Deep black text on inverted white surface */

Falcon Primary Accents:
  --falcon-cyan:       #0EA5E9   /* Primary Accent: Electric Sky/Cyan 500 */
  --falcon-cyan-neon:  #00F0FF   /* Laser cyan for active status & pulse */
  --falcon-cyan-light: #38BDF8   /* Cyan 400 for glowing highlights */
  --falcon-cyan-dim:   rgba(14, 165, 233, 0.15) /* Glassmorphic backdrops */

Falcon Secondary Accents:
  --falcon-indigo:       #6366F1 /* Secondary Accent: Cyber Indigo 500 */
  --falcon-indigo-light: #818CF8 /* Indigo 400 for secondary hover */
  --falcon-indigo-deep:  #4338CA /* Nebula violet for depth gradients */

High-Tech Status Accents:
  --status-nominal:    #10B981   /* Emerald green (Tier III SLA active, fiber online) */
  --status-warning:    #F59E0B   /* Amber orange (Threshold alert, high attenuation) */
  --status-critical:   #EF4444   /* Crimson red (Alarm trigger, link fail) */

Text & Monoline Hierarchy:
  --text-primary:      #F8FAFC   /* Slate-50: Main headlines, critical data */
  --text-secondary:    #D7E2EA   /* Silvery slate: Omerzh benchmark body text */
  --text-muted:        #94A3B8   /* Slate-400: Subtitles, metadata tags */
  --text-dim:          #64748B   /* Slate-500: Inactive indices, micro-labels */
  --border-monoline:   rgba(215, 226, 234, 0.2) /* Delicate brutalist border */
  --border-cyan-hud:   rgba(14, 165, 233, 0.35) /* HUD card border */
```

### 4.2 Typography Hierarchy & Fluid Calculations

| Role | Font Family | Weight | Size Definition (Mobile -> Desktop) | Tracking / Leading | Example Usage |
|---|---|---|---|---|---|
| **Giant Hero Display** | `Kanit` / `Space Grotesk` | 900 (Black) | `text-[13vw] sm:text-[14vw] md:text-[16vw] lg:text-[17.5vw]` | `tracking-tighter`, `leading-none`, uppercase | "ANAR GADIRLI" / "PORT OF FALCON" |
| **Section Title** | `Kanit` / `Space Grotesk` | 900 (Black) | `clamp(3rem, 12vw, 160px)` | `tracking-tight`, `leading-none`, uppercase | "PROJECTS", "ABOUT", "SERVICES", "TELEMETRY" |
| **Index Numerals** | `Kanit` / `JetBrains Mono` | 900 (Black) | `clamp(3rem, 10vw, 140px)` | `leading-none` | "01", "02", "03" |
| **Card Project Name** | `Kanit` / `Space Grotesk` | 600 (SemiBold) | `clamp(1.25rem, 2.4vw, 2.25rem)` | `tracking-wide`, uppercase | "CREDIT XAI BENCHMARK" |
| **Section Eyebrow** | `JetBrains Mono` | 600 (Medium) | `text-xs sm:text-sm` (11px - 14px) | `tracking-[0.25em]`, uppercase | "TIER III DATA CENTER · 99.998% UPTIME" |
| **Body Paragraph** | `Inter` / `Space Grotesk` | 400 (Regular) | `clamp(1rem, 1.8vw, 1.35rem)` | `leading-relaxed` | About me kinetic scroll text |
| **Telemetry HUD Monospace** | `JetBrains Mono` | 500 (Medium) | `text-xs sm:text-sm` (12px - 14px) | `tracking-widest`, monospace | `OPTICAL LOSS: 0.11 dB · TIA/EIA COMPLIANT` |
| **Button / Pill Text** | `Kanit` / `Space Grotesk` | 600 (SemiBold) | `text-xs sm:text-sm` (12px - 14px) | `tracking-widest`, uppercase | "VIEW REPOSITORY", "LIVE TELEMETRY" |

### 4.3 Corner Radii & Negative Margins Matrix

- **Deck Header Curve**: `rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]`
- **Section Negative Margins**:
  - Small viewports: `-mt-10` (-40px)
  - Medium viewports: `-mt-12` (-48px)
  - Large viewports: `-mt-14` (-56px) or `-mt-16` (-64px)
- **Project Card Container**: `rounded-[32px] sm:rounded-[40px] md:rounded-[48px]`
- **Desktop Browser Viewport**: `rounded-2xl` (16px) or `rounded-xl` (12px)
- **Mobile Smartphone Chassis**: `rounded-[32px] sm:rounded-[36px] md:rounded-[42px]` with inner screen `rounded-[26px] sm:rounded-[30px] md:rounded-[36px]`
- **Pill Badges & Buttons**: `rounded-full` (9999px)

---

## 5. Precise Component Architectural Specifications

### 5.1 Hero Section Specification
```tsx
/* Hero Structural Anatomy */
<section className="relative flex min-h-screen h-screen flex-col overflow-x-clip bg-[#020617] text-[#F8FAFC]">
  {/* Top Navigation */}
  <header className="relative z-30 flex items-center justify-between px-6 pt-6 md:px-10 md:pt-8">
    <div className="flex items-center gap-3">
      <FalconInsigniaGlyph className="w-6 h-6 text-cyan-400" />
      <span className="font-mono text-xs uppercase tracking-widest text-slate-300">
        ANAR GADIRLI <span className="text-cyan-400">//</span> PORT OF FALCON
      </span>
      <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        AZINTELECOM TIER III · NOMINAL
      </div>
    </div>
    
    <nav>
      <ul className="flex items-center gap-4 sm:gap-6 md:gap-8 font-mono text-xs md:text-sm uppercase tracking-wider text-[#D7E2EA]">
        <li><a href="#about" className="hover:text-cyan-400 transition-colors">About</a></li>
        <li><a href="#telemetry" className="hover:text-cyan-400 transition-colors">Telemetry</a></li>
        <li><a href="#xai" className="hover:text-cyan-400 transition-colors">XAI</a></li>
        <li><a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a></li>
        <li><a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a></li>
      </ul>
    </nav>
  </header>

  {/* Giant Editorial Brutalist Heading */}
  <div className="relative z-10 my-auto overflow-hidden text-center select-none pointer-events-none">
    <h1 className="hero-heading w-full whitespace-nowrap text-center text-[13vw] sm:text-[14vw] md:text-[15.5vw] font-black uppercase leading-none tracking-tighter">
      ANAR GADIRLI
    </h1>
    <p className="mt-2 text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-cyan-400/80">
      SYSTEMS ENGINEER &bull; EXPLAINABLE AI RESEARCHER &bull; DATA CENTER OPERATIONS
    </p>
  </div>

  {/* Magnetic Parallax Falcon Centerpiece Avatar */}
  <div className="absolute left-1/2 top-1/2 z-20 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[360px] sm:translate-y-0 md:w-[440px] lg:w-[500px]">
    <MagneticWrapper padding={150} strength={3}>
      <div className="relative aspect-square w-full">
        <img
          src="/assets/anar-falcon-avatar.webp"
          alt="Anar Gadirli - Falcon Era"
          className="block h-auto w-full object-cover"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, #000 75%, transparent 100%), linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)",
            WebkitMaskComposite: "source-in",
            maskImage: "linear-gradient(to bottom, #000 75%, transparent 100%), linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)"
          }}
        />
        {/* Ambient Cyan/Indigo Glow Halo */}
        <div className="absolute -inset-4 -z-10 rounded-full bg-gradient-to-tr from-cyan-500/20 to-indigo-600/20 blur-3xl" />
      </div>
    </MagneticWrapper>
  </div>

  {/* Bottom Bar with Falcon Era Tagline */}
  <footer className="relative z-30 mt-auto flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
    <div className="max-w-[200px] sm:max-w-[260px] font-mono text-[11px] sm:text-xs uppercase leading-relaxed text-slate-400">
      <span className="text-cyan-400 font-bold block mb-1">AZINTELECOM LLC // BAKU</span>
      DATA CENTER INFRASTRUCTURE &bull; TIER III RELIABILITY &bull; OPTICAL INTEGRITY
    </div>

    <div className="max-w-[260px] sm:max-w-[340px] text-right font-light uppercase leading-snug tracking-wide text-[#D7E2EA] text-xs sm:text-sm">
      <p className="italic text-slate-300">
        &ldquo;You met me in the Falcon era of my life &mdash; where every challenge becomes altitude.&rdquo;
      </p>
      <span className="block mt-1 font-mono text-[10px] tracking-widest text-cyan-400/70">
        &mdash; ANAR GADIRLI
      </span>
    </div>
  </footer>
</section>
```

### 5.2 Horizontal Marquee Showcase Specification
```tsx
/* Marquee Anatomy */
<section className="flex flex-col gap-4 py-20 bg-[#020617] overflow-hidden">
  {/* Row 1: Leftward scroll */}
  <div className="flex w-max gap-4 animate-marquee-left">
    {projectScreensRow1.map((item, idx) => (
      <div key={idx} className="relative h-[260px] w-[420px] shrink-0 rounded-2xl overflow-hidden border border-cyan-500/20 bg-slate-900 shadow-xl group">
        <img src={item.src} alt={item.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
          <span className="font-mono text-xs uppercase text-cyan-300">{item.title}</span>
        </div>
      </div>
    ))}
  </div>

  {/* Row 2: Rightward scroll */}
  <div className="flex w-max gap-4 animate-marquee-right">
    {projectScreensRow2.map((item, idx) => (
      <div key={idx} className="relative h-[260px] w-[420px] shrink-0 rounded-2xl overflow-hidden border border-indigo-500/20 bg-slate-900 shadow-xl group">
        <img src={item.src} alt={item.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
          <span className="font-mono text-xs uppercase text-indigo-300">{item.title}</span>
        </div>
      </div>
    ))}
  </div>
</section>
```

### 5.3 Inverted Brutalist Section ("Core Disciplines")
Following the `omerzh.uk` signature pattern of an inverted high-contrast white card:
```tsx
<section id="services" className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-white px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32 text-[#020617]">
  <h2 className="mb-16 text-center font-black uppercase leading-none tracking-tight text-[#020617] text-[clamp(3rem,12vw,160px)]">
    DISCIPLINES
  </h2>

  <ul className="mx-auto max-w-5xl divide-y divide-black/15 border-b border-black/15">
    {disciplines.map((item, idx) => (
      <li key={idx} className="flex items-center gap-6 py-8 sm:gap-10 sm:py-10 md:gap-16 md:py-12">
        <span className="w-[1.25em] shrink-0 font-black leading-none text-[#020617] text-[clamp(3rem,10vw,140px)]">
          {String(idx + 1).padStart(2, "0")}
        </span>
        <div className="flex flex-col gap-2 sm:gap-3 text-[#020617]">
          <h3 className="font-medium uppercase text-[clamp(1.1rem,2.2vw,2.2rem)] font-mono">
            {item.title}
          </h3>
          <p className="max-w-2xl font-light leading-relaxed text-black/70 text-[clamp(0.9rem,1.6vw,1.25rem)]">
            {item.description}
          </p>
        </div>
      </li>
    ))}
  </ul>
</section>
```
**Disciplines to Feature:**
1. `01 // TIER III DATA CENTER INFRASTRUCTURE`: Mission-critical environmental regulation, optical fiber link integrity (<0.15 dB loss), rack telemetry, and power distribution at AzInTelecom LLC.
2. `02 // EXPLAINABLE AI RESEARCH & LATENCY BENCHMARKING`: Empirical microsecond benchmarking of TreeSHAP, FastSHAP, KernelSHAP, and LIME for compliant high-risk automated credit risk scoring.
3. `03 // HIGH-CONCURRENCY SYSTEMS & ARCHITECTURES`: Low-latency microservices, fault-tolerant network topologies, and high-performance interactive interfaces built with Next.js, PyTorch, and strict TypeScript.
4. `04 // FRONTEND ATELIER & MOTION ENGINEERING`: Avant-garde digital experiences engineered with GSAP 3, Lenis inertial physics, Framer Motion, and forensic pixel regression testing.

### 5.4 Stacked Card Deck Navigation Specification
```tsx
<section id="projects" className="relative z-20 -mt-10 sm:-mt-12 md:-mt-14 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-[#020617] px-5 pb-24 pt-20 sm:px-8 sm:pt-24 md:px-10 md:pt-32">
  <div className="text-center mb-16 sm:mb-20 md:mb-28">
    <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-[clamp(3rem,12vw,160px)]">
      PROJECTS
    </h2>
    <p className="mt-3 font-mono text-xs uppercase tracking-widest text-cyan-400">
      SYSTEMS &bull; BENCHMARKS &bull; ATELIER ARCHITECTURES
    </p>
  </div>

  <div ref={containerRef} className="mx-auto max-w-7xl">
    {projects.map((proj, idx) => (
      <StackedCard
        key={proj.id}
        project={proj}
        index={idx}
        total={projects.length}
        progress={scrollYProgress}
      />
    ))}
  </div>
</section>
```

#### Stacking Math & Transform Equations:
```typescript
const u = 1 - (total - 1 - index) * 0.035; // Target scale down for underneath cards
const cardScale = useTransform(progress, [index / total, 1], [1, u]);
const topOffset = `${index * 32}px`; // Progressive cascade header visible
```

### 5.5 Side-by-Side Dual-Device Mockup Specification
For each card in the deck, the project is showcased with **side-by-side viewports**:

```tsx
<article className="sticky top-24 md:top-32 h-[85vh] origin-top rounded-[36px] sm:rounded-[44px] md:rounded-[52px] border-2 border-cyan-500/30 bg-[#0B0F19] p-5 sm:p-7 md:p-9 shadow-2xl backdrop-blur-xl flex flex-col justify-between overflow-hidden">
  {/* Card Header */}
  <div className="flex flex-wrap items-end justify-between gap-4 pb-4 border-b border-slate-800">
    <div className="flex items-end gap-4 sm:gap-6">
      <span className="font-black leading-none text-cyan-400 text-[clamp(2.5rem,8vw,120px)]">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-slate-400">
          {project.category}
        </p>
        <h3 className="font-bold uppercase text-[#F8FAFC] text-[clamp(1.2rem,2.2vw,2.2rem)] font-mono">
          {project.name}
        </h3>
      </div>
    </div>

    {/* Outbound Link Badges */}
    <div className="flex items-center gap-3">
      {project.githubUrl && (
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 font-mono text-xs uppercase tracking-wider text-slate-300 hover:border-cyan-400 hover:text-cyan-300 transition-colors">
          GitHub
        </a>
      )}
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-cyan-500 px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-950 hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(14,165,233,0.5)]">
          Live System &rarr;
        </a>
      )}
    </div>
  </div>

  {/* Card Body: Side-by-Side Dual-Device Viewport */}
  <div className="flex-1 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center overflow-hidden">
    
    {/* Device 1: Desktop Browser Viewport (Column span 7 or 8) */}
    <div className="lg:col-span-8 h-full flex flex-col rounded-2xl border border-slate-700/60 bg-slate-950 shadow-2xl overflow-hidden">
      {/* Browser Chrome Header */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/20" />
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/20" />
          <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/20" />
        </div>
        <div className="flex-1 mx-4 max-w-sm rounded-md bg-slate-950 px-3 py-1 font-mono text-[11px] text-slate-400 flex items-center justify-between border border-slate-800">
          <span className="truncate">https://{project.domain}</span>
          <span className="text-emerald-400 text-[10px]">🔒 SSL</span>
        </div>
      </div>
      {/* Desktop Screen Canvas */}
      <div className="flex-1 relative overflow-hidden bg-slate-950 p-4">
        {project.desktopInteractiveComponent || (
          <img src={project.desktopImage} alt={`${project.name} Desktop View`} className="w-full h-full object-cover object-top rounded-lg" />
        )}
      </div>
    </div>

    {/* Device 2: Mobile Smartphone Chassis (Column span 4 or 5) */}
    <div className="lg:col-span-4 h-full flex items-center justify-center p-2">
      <div className="relative w-[240px] sm:w-[260px] md:w-[280px] aspect-[9/19] rounded-[38px] border-[5px] border-slate-800 bg-slate-950 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col ring-1 ring-cyan-500/20">
        {/* Dynamic Island Pill */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-30 flex items-center justify-end pr-1.5">
          <span className="w-2 h-2 rounded-full bg-slate-900 border border-slate-700" />
        </div>
        {/* Mobile Screen Canvas */}
        <div className="flex-1 pt-7 pb-2 px-2 overflow-hidden bg-slate-900">
          {project.mobileInteractiveComponent || (
            <img src={project.mobileImage} alt={`${project.name} Mobile View`} className="w-full h-full object-cover object-top rounded-[24px]" />
          )}
        </div>
        {/* Home Indicator Bar */}
        <div className="w-24 h-1 bg-slate-600 rounded-full mx-auto my-1.5" />
      </div>
    </div>

  </div>

  {/* Card Footer: Metrics & Tech Badges */}
  <div className="pt-4 mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 font-mono text-xs">
    <div className="flex items-center gap-4 text-cyan-400">
      {project.metrics.map((m, idx) => (
        <span key={idx} className="flex items-center gap-1.5">
          <span className="text-slate-500">&bull;</span>
          <strong className="text-slate-200">{m.label}:</strong> {m.value}
        </span>
      ))}
    </div>
    <div className="flex items-center gap-2">
      {project.technologies.map((t, idx) => (
        <span key={idx} className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 text-[10px] tracking-wider uppercase border border-slate-700/50">
          {t}
        </span>
      ))}
    </div>
  </div>
</article>
```

---

## 6. Detailed Project Portfolio Manifest

### Project 1: `credit-xai-benchmark`
- **ID**: `credit-xai-benchmark`
- **Official Title**: Trade-Offs Between Real-Time Inference Latency and Explanation Faithfulness in Credit Risk Scoring
- **Category**: `RESEARCH &bull; EXPLAINABLE AI &bull; FINANCIAL REGULATION`
- **Domain**: `credit-xai.anargadirli.dev`
- **Institution**: Azerbaijan State Oil and Industry University (ASOIU)
- **Author**: Anar Gadirli (`anargadirli55@gmail.com`)
- **Key Metrics**:
  - `FastSHAP p95`: **0.026 ms** (16,697 QPS throughput)
  - `TreeSHAP Faithfulness`: **$\mathcal{F} = 0.9824$** (Top-1 drop $\Delta P = 0.0818$)
  - `Dataset Scale`: **150,000 credit records** (Give Me Some Credit)
  - `Amortization Break-even`: **135 queries** vs. KernelSHAP, **460 queries** vs. TreeSHAP
  - `Compliance`: EU AI Act (Regulation 2024/1689 Annex III) & GDPR Articles 13-15
- **Technologies**: Python 3.12, PyTorch, XGBoost, LightGBM, TreeSHAP, FastSHAP, KernelSHAP, LIME, IEEE LaTeX
- **Desktop Viewport Visual**: Scientific latency-faithfulness Pareto frontier chart, SHAP waterfall explanation bars for loan approval/rejection.
- **Mobile Viewport Visual**: Responsive applicant credit risk assessment card with instant SHAP attribution sliders.
- **Repo URL**: `https://github.com/gadirlianar/credit-xai-benchmark`

### Project 2: `Solaris-Energy`
- **ID**: `solaris-energy`
- **Official Title**: Solaris Energy — High-Performance Clean Tech Platform
- **Category**: `CLEAN ENERGY &bull; WEB ARCHITECTURE &bull; MOTION SYSTEMS`
- **Domain**: `solaris-energy.vercel.app`
- **Key Metrics**:
  - `Lighthouse Metrics`: **96 Perf / 100 A11y / 100 Best Practices / 100 SEO**
  - `Dependencies`: Zero external runtime asset dependencies
  - `Typography`: Host Grotesk geometric grotesque with tight tracking
  - `Animation Physics`: 3D perspective carousels, story sliders, count-up physics
- **Technologies**: Next.js App Router, TypeScript, Tailwind CSS, Motion/React, Lucide React
- **Desktop Viewport Visual**: Solar energy generation telemetry dashboard, bento grid of residential and commercial solar installations.
- **Mobile Viewport Visual**: Clean mobile client monitoring app showing solar inverter wattage, battery state, and grid feed-in.
- **Repo URL**: `https://github.com/gadirlianar/Solaris-Energy`

### Project 3: `Store-MA` (MAVRIC Technical Footwear)
- **ID**: `store-ma`
- **Official Title**: MAVRIC // Technical Footwear & Digital Atelier
- **Category**: `TECHNICAL ATELIER &bull; GSAP PHYSICS &bull; E-COMMERCE`
- **Domain**: `mavric-store.anargadirli.dev`
- **Key Metrics**:
  - `Architecture`: Next.js 16 (App Router), React 19 Strict, Tailwind CSS v4
  - `Verification`: Playwright CIEDE2000 forensic pixel visual regression suite
  - `Interactivity`: Dynamic X-Ray footwear lens mask, Lenis inertial scrolling, 3D card perspective
- **Technologies**: Next.js 16, React 19, GSAP 3, Lenis, Tailwind CSS v4, TypeScript
- **Desktop Viewport Visual**: Technical footwear atelier hero with floating 3D sneaker wings, hanging price tags, and anatomical X-Ray slider.
- **Mobile Viewport Visual**: Mobile slide-over bag drawer with free-shipping meter and 1-tap checkout simulation.
- **Repo URL**: `https://github.com/gadirlianar/Store-MA`

---

## 7. Responsive Breakpoint & Performance Specifications

### 7.1 Breakpoint Grid Matrix
- **Mobile (`< 640px`)**:
  - Hero heading scales down to `text-[13vw]`.
  - Stacked cards adjust from fixed `h-[85vh]` to flex auto with `min-h-[85vh]` to prevent text truncation.
  - Dual mockups stack vertically: Desktop browser frame on top (100% width), Mobile smartphone frame below (centered).
  - Floating tech badges in About section hidden or scaled to `w-[80px]` with reduced opacity.
- **Tablet (`640px - 1024px`)**:
  - Hero heading `text-[14vw]`.
  - Sticky stacking active at `top-28`.
  - Marquee card widths adjusted to `340px`.
- **Desktop (`>= 1024px`)**:
  - Full dual-device side-by-side layout: Desktop viewport (col-span-8, 66%), Mobile chassis (col-span-4, 34%).
  - Sticky deck top pinned at `top-24 md:top-32 h-[85vh]`.
  - Marquee cards `420px x 260px`.
  - Hero heading `text-[16vw] - text-[17.5vw]`.

### 7.2 Performance & Rendering Optimizations
1. **Will-Change**: Applied strictly to `will-change: transform` during active scroll interpolation on marquee rows and card scale transforms.
2. **Layout Shifts (CLS)**: Zero layout shift; images given explicit aspect ratios (`aspect-[16/10]` for desktop viewports, `aspect-[9/19]` for mobile chassis).
3. **Paint Containment**: Sections styled with `overflow-x: clip` to prevent horizontal micro-jitters without breaking sticky container contexts (avoiding `overflow: hidden` on parent scrollers which kills `position: sticky`).
4. **Font Loading**: High-speed Google font preconnect with `display: swap` for `Kanit` and `Space Grotesk`.

---

## 8. Verification & Acceptance Checklist

- [x] Full analysis of `omerzh.uk` reverse-engineered from authoritative production JS and CSS bundles.
- [x] Exact Tailwind classes, responsive fluid font sizes (`text-[14vw]` - `17.5vw`), and gradient text clipping extracted.
- [x] Stacking card deck physics (`useScroll`, `useTransform`, `rounded-t-[60px]`, negative top margins `-mt-10 sm:-mt-12 md:-mt-14`) documented.
- [x] Dual-device mockup architecture (16:10 browser viewport + 9:19.5 phone frame) specified in code.
- [x] Anar Gadirli's verified credentials, AzInTelecom role, and 3 core repositories (`credit-xai-benchmark`, `Solaris-Energy`, `Store-MA`) fully integrated.
- [x] Falcon branding color tokens (#0EA5E9 Cyan, #6366F1 Indigo, #020617 Pitch Canvas) and tagline defined.
