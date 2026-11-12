# Test Infrastructure & Verification Specification

**Project**: Port of Falcon — Anar Gadirli Portfolio & Telemetry Web Application  
**Standard**: ANSI/TIA-942-B, ASHRAE TC 9.9, ANSI/TIA-568.3-D, Lundberg SHAP (NeurIPS 2017)  
**Execution Environment**: Node.js v22.14.0 (macOS arm64), zero external test-runner dependencies  

---

## 1. Test Philosophy & Principles

The testing framework for **Port of Falcon** is designed with the following core principles:

1. **Opaque-Box & Requirement-Driven**:
   Tests validate observable system behaviors, contract compliance, mathematical properties, and physical simulations against authoritative requirements defined in `ORIGINAL_REQUEST.md` and `PROJECT.md`. Tests do not rely on fragile internal implementation trivia.

2. **Zero External Network Dependency**:
   All unit, boundary, integration, and scenario tests execute 100% offline. Zero network calls to external APIs or mock servers are permitted.

3. **Sub-Second Execution Speed**:
   By using a high-performance, native TypeScript test harness without heavyweight runner overhead (avoiding Jest/Vitest daemon startup times), the entire multi-tier test suite of over 300 assertions executes in under 1 second.

4. **Zero-Tolerance for Facade Tests**:
   Tests must never pass trivially without executing real logic. Mathematical proofs (such as SHAP additive efficiency $\sum_{i=1}^9 \phi_i + \text{base} \equiv z(x)$) are validated against machine-precision tolerances ($|\epsilon| < 10^{-6}$). Physical boundaries (such as optical insertion loss $< 0.15\text{ dB}$) are verified at critical boundary points ($0.149\text{ dB}$ vs $0.150\text{ dB}$).

5. **Strict Exit Code Semantics**:
   The test runner returns exit code `0` strictly when all executed assertions pass, and exit code `1` immediately upon any assertion failure, ensuring seamless CI/CD gate enforcement.

---

## 2. Feature Inventory (F1 to F24)

Every feature in Port of Falcon is systematically cataloged and mapped across 4 testing tiers:

| Feature ID | Category | Feature Name | Description | Milestone | Tier Mapping |
|------------|----------|--------------|-------------|-----------|--------------|
| **F1** | Core Infrastructure | Project Scaffolding | Next.js 15+ App Router, TypeScript strict, Tailwind CSS 3.4.17, PostCSS | M1 | T1, T2, T3 |
| **F2** | Design Tokens | Falcon Design System & Tokens | Obsidian `#020617`, Cyan `#0EA5E9`, Indigo `#6366F1`, font scales, HUD colors | M1 | T1, T2, T3 |
| **F3** | Visual Architecture | Editorial Brutalist Hero Section | Fullscreen hero with giant fluid typography `text-[13vw]`-`17.5vw`, gradient text clipping | M1 | T1, T2, T3, T4 |
| **F4** | Visual Architecture | Hero Avatar & Dual Gradient Mask | Center-anchored avatar with vertical and horizontal fade masks (`maskImage`) | M1 | T1, T2, T3 |
| **F5** | Interaction Physics | Magnetic Cursor Parallax | Fluid cursor-following physics with touch-device fallback (`matchMedia`) | M1 | T1, T2, T3, T4 |
| **F6** | Authority Branding | Hero Tagline & Metadata Badges | "You met me in the Falcon era...", AzInTelecom Tier III status pill, Baku location | M1 | T1, T2, T3 |
| **F7** | Motion Engineering | Dual-Lane Marquee Showcase | Horizontal scrolling marquee with counter-translating lanes, infinite velocity loop | M2 | T1, T2, T3, T4 |
| **F8** | Brutalist Contrast | Core Disciplines Inverted Section | High-contrast white card `rounded-t-[60px]`, giant numerals `clamp(3rem, 10vw, 140px)` | M2 | T1, T2, T3, T4 |
| **F9** | Professional Bio | Professional Bio & Authority Markers | AzInTelecom data center ops, ASOIU, systems engineering credentials | M2 | T1, T2, T3 |
| **F10** | External Connectors | External Social Connectors | Outbound links to GitHub (`gadirlianar`) and LinkedIn (`in/gadirlianar`) | M2 | T1, T2, T3, T4 |
| **F11** | Motion Engineering | Stacked Card Deck Navigation | Overlapping card deck with `rounded-t-[60px]`, negative top margins `-mt-14`, sticky stacking | M3 | T1, T2, T3, T4 |
| **F12** | Layout Framework | Dual-Device Mockup Framework | Side-by-side desktop browser frame (66%) and mobile frame (34%) | M3 | T1, T2, T3, T4 |
| **F13** | Project Showcase | Featured Project: Solaris-Energy | Interactive solar analytics showcase with 3D perspective and performance metrics | M3 | T1, T2, T3 |
| **F14** | Project Showcase | Featured Project: Store-MA | Interactive high-concurrency e-commerce showcase with Playwright CIEDE2000 metrics | M3 | T1, T2, T3 |
| **F15** | Project Showcase | Featured Project: Credit-XAI Benchmark | Showcase container linking to deep interactive evaluation component | M3 | T1, T2, T3, T4 |
| **F16** | Machine Learning | Calibrated Credit Risk Scoring Model | Real-time parametric evaluation engine calculating log-odds approval probability | M4 | Unit, T1, T2, T3, T4 |
| **F17** | Explainable AI | Exact Additive SHAP Waterfall Plot | Game-theoretic Shapley values satisfying efficiency $\sum \phi_i + \text{base} = \text{score}$ | M4 | Unit, T1, T2, T3, T4 |
| **F18** | Explainable AI | LIME Local Elasticity Sensitivity | Feature perturbation gradients evaluating local model stability | M4 | Unit, T1, T2, T3, T4 |
| **F19** | Explainable AI | Counterfactual Recourse Optimization | Minimal-cost actionable parameter solver for loan approval recourse with 1-click apply | M4 | Unit, T1, T2, T3, T4 |
| **F20** | Telemetry Physics | Environmental Telemetry Sensors | Cold aisle (18-27°C), hot aisle (30-40°C), RH% (40-60%), dew point calculations | M5 | Unit, T1, T2, T3, T4 |
| **F21** | Telemetry Physics | Optical Fiber Link Integrity Monitor | Strict insertion loss <0.15 dB (TIA/EIA compliance), Tx/Rx optical power, BER diagnostics | M5 | Unit, T1, T2, T3, T4 |
| **F22** | Telemetry Physics | Power & Airflow Diagnostics | Dynamic PUE (1.20-1.35), CFM volumetric airflow, static pressure differential ($\Delta P$) | M5 | Unit, T1, T2, T3, T4 |
| **F23** | Telemetry Controls | Interactive Telemetry HUD Controls | Live stream toggle, refresh rate selector, rack bay selector, manual fault injection | M5 | T1, T2, T3, T4 |
| **F24** | Verification Track | E2E Integration & Verification | 100% E2E test suite pass (Tiers 1-4) and adversarial coverage hardening | M6 | T1, T2, T3, T4 |

---

## 3. Test Architecture & Execution

### 3.1 Directory Structure
```
tests/
├── test-runner.ts                     # Standalone high-performance test harness
├── unit/
│   ├── xai-math.test.ts               # Unit: SHAP efficiency, log-odds, LIME, recourse
│   └── telemetry-physics.test.ts      # Unit: ASHRAE thermal, TIA optical loss, PUE, airflow
└── e2e/
    ├── tier1-feature-coverage.test.ts # Tier 1: Functional coverage across F1-F24 (>=120 tests)
    ├── tier2-boundary-corner.test.ts  # Tier 2: Boundary limits across F1-F24 (>=120 tests)
    ├── tier3-cross-feature.test.ts    # Tier 3: Combinatorial feature interactions (>=25 tests)
    └── tier4-real-world.test.ts       # Tier 4: End-to-end user workflows (>=15 scenarios)
```

### 3.2 Invocation Commands

- **Full Suite Run**:
  ```bash
  node --experimental-strip-types tests/test-runner.ts
  ```
  *(or via `npm test` / `npx tsx tests/test-runner.ts`)*

- **Selective Tier Execution via CLI Flags**:
  ```bash
  node --experimental-strip-types tests/test-runner.ts --unit     # Run unit mathematical & physics tests
  node --experimental-strip-types tests/test-runner.ts --tier=1  # Run Tier 1 Feature Coverage
  node --experimental-strip-types tests/test-runner.ts --tier=2  # Run Tier 2 Boundary & Corner Cases
  node --experimental-strip-types tests/test-runner.ts --tier=3  # Run Tier 3 Cross-Feature Interactions
  node --experimental-strip-types tests/test-runner.ts --tier=4  # Run Tier 4 Real-World Scenarios
  ```

---

## 4. 4-Tier Coverage Specifications & Thresholds

### Tier 1: Feature Coverage (Threshold: $\ge 5$ tests per feature, $\ge 120$ tests total)
Validates core functional expectations, contract definitions, interface types, DOM structures, and behavioral baselines for each feature F1 through F24.
- **Coverage**: 24 distinct test suites, each asserting at least 5 discrete properties. Total $\ge 120$ assertions.

### Tier 2: Boundary & Corner Cases (Threshold: $\ge 5$ tests per feature, $\ge 120$ tests total)
Validates extreme boundary conditions, clamping behavior, floating-point tolerances, edge inputs, and fault conditions for each feature F1 through F24.
- **Key Boundary Proofs**:
  - Optical insertion loss exact threshold: $0.149\text{ dB}$ (compliant `PASS`) vs $0.150\text{ dB}$ (non-compliant `FAIL`).
  - Credit score extremes: FICO 300 / DTI 65% ($P \approx 0.012$) vs FICO 850 / DTI 5% ($P \ge 0.990$).
  - Cold aisle temperature limits: $18.0^\circ\text{C}$ (nominal) vs $27.1^\circ\text{C}$ (warning).
  - Relative humidity: $39.9\%$ (warning) vs $19.9\%$ (critical ESD alert).
  - Responsive font clamping: Viewports from 320px to 3840px with zero horizontal scroll overflow.
- **Coverage**: 24 distinct boundary suites, each asserting at least 5 edge cases. Total $\ge 120$ assertions.

### Tier 3: Cross-Feature Combinations (Threshold: $\ge 25$ interaction tests)
Validates multi-feature interactions where changes in one subsystem propagate to dependent subsystems.
- **Key Combinatorial Interactions**:
  - `F16 + F17`: Financial feature slider adjustments recalculate SHAP waterfall in real-time, preserving exact additive efficiency $\sum \phi_i + \text{base} \equiv z(x)$.
  - `F16 + F19`: Model decision flipping to `DECLINED` automatically triggers Counterfactual Recourse, and clicking "Apply Recourse" updates sliders and flips decision to `APPROVED`.
  - `F20 + F23`: Injecting `thermal_surge` in HUD updates thermal gauges, increases cooling power, and writes critical alerts to the audit log.
  - `F21 + F23`: Injecting `optical_microbend` spikes insertion loss to $0.398\text{ dB}$, immediately flipping the TIA-568.3-D badge to `FAIL`.
  - `F8 + F11`: Inverted brutalist white card seamlessly connects to stacked card deck via `-mt-14` negative margin and `rounded-t-[60px]`.
- **Coverage**: $\ge 25$ combinatorial tests.

### Tier 4: Real-World Scenarios (Threshold: $\ge 15$ operational scenarios)
Validates full end-to-end user workflows reflecting authentic operational use cases.
- **Key Real-World Scenarios**:
  1. *Subprime Loan Applicant Recourse Remediation Workflow*
  2. *Data Center Optical Microbend Detection & Restoration Workflow*
  3. *Thermal Runaway Mitigation & Heat Dissipation Workflow*
  4. *Mobile Viewport Traversal & Touch Parallax Fallback*
  5. *High-Frequency Telemetry Stress Loop (100 Ticks / 500ms cadence)*
  6. *Regulatory Adverse Action Notice Generation (ECOA / Regulation B)*
  7. *Applicant Preset Cycling Across 4 Financial Archetypes*
  8. *Multi-Rack Facility Health Audit (AZ-01 to AZ-04)*
  9. *Desktop Fullscreen Brutalist Experience (1920x1080 Viewport)*
  10. *External Authority Verification (GitHub & LinkedIn)*
  11. *Airflow Containment Diagnostic & Differential Pressure Recovery*
  12. *FastSHAP vs TreeSHAP Latency & Crossover Analysis*
  13. *Zero-Network Offline Integrity Workflow*
  14. *Dual-Device High-DPI Rendering & Chassis Alignment*
  15. *Continuous Full Lifecycle Smoke Test Across All 6 Sections*
- **Coverage**: $\ge 15$ full end-to-end scenario tests.

### Unit Tier: Pure Mathematical & Physics Simulation Verification
Dedicated analytical test suites executing closed-form mathematical equations and physical simulation models with machine precision.
- **XAI Mathematical Proofs**:
  - Additive SHAP efficiency axiom: $|\sum_{i=1}^9 \phi_i + \text{base} - z(x)| < 10^{-6}$ across multiple feature vectors.
  - Logistic sigmoid monotonicity and risk tier classification bounds.
  - LIME local elasticity gradient accuracy and directional sensitivity.
  - Counterfactual recourse optimization: strict invariance of immutable features (`delinquencies2Years`, `employmentYears`).
- **Telemetry Physics Proofs**:
  - ASHRAE TC 9.9 thermal gradient across 42U rack slots.
  - Optical power budget: $Rx = Tx - \text{Loss}$, receiver sensitivity floor $-14.4\text{ dBm}$.
  - Dynamic PUE calculation: $\text{PUE} = 1.0 + \frac{P_{\text{cooling}} + P_{\text{losses}}}{P_{\text{IT}}}$.
  - Volumetric airflow (CFM) scaling with thermal dissipation.

---

## 5. Verification Commands & Expected Output

Executing the test runner:
```bash
node --experimental-strip-types tests/test-runner.ts
```

Expected Output Format:
```
================================================================================
 PORT OF FALCON — TEST SUITE VERIFICATION REPORT
================================================================================
 PASS  Unit: XAI Mathematical & SHAP Efficiency Suite (32 tests)
 PASS  Unit: AzInTelecom Telemetry Physics Suite (30 tests)
 PASS  Tier 1: Feature Coverage (F1-F24) Suite (120 tests)
 PASS  Tier 2: Boundary & Corner Cases Suite (120 tests)
 PASS  Tier 3: Cross-Feature Combinations Suite (28 tests)
 PASS  Tier 4: Real-World Operational Scenarios Suite (16 tests)
--------------------------------------------------------------------------------
 Summary Table:
  Category    | Total Tests | Passed | Failed | Duration
  ------------+-------------+--------+--------+---------
  Unit Tests  |     62      |   62   |   0    |   18ms
  Tier 1      |    120      |  120   |   0    |   34ms
  Tier 2      |    120      |  120   |   0    |   38ms
  Tier 3      |     28      |   28   |   0    |   14ms
  Tier 4      |     16      |   16   |   0    |   19ms
  ------------+-------------+--------+--------+---------
  ALL SUITES  |    346      |  346   |   0    |  123ms
================================================================================
 ALL TESTS PASSED. EXIT CODE 0.
```
