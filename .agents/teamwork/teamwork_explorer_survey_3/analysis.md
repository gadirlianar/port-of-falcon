# Domain Specification & Technical Architecture Report
**Telemetry Experience & Explainable AI (XAI) Benchmark**

**Author**: Explorer 3 (Spec Miner)  
**Date**: 2026-11-12  
**Target Milestone**: Milestone 3 (Credit-XAI Benchmark) & Milestone 4 (AzInTelecom Telemetry Experience)  
**Project**: Port of Falcon (Anar Gadirli Portfolio)  
**Status**: Completed Reconnaissance & Formal Specification

---

## 1. Executive Summary & Context

According to `ORIGINAL_REQUEST.md`, the portfolio must prominently showcase Anar Gadirli's background in **Data Center infrastructure operations** and **Explainable AI (XAI) research** within a high-tech Falcon aesthetic (dark canvas, cyan `#0EA5E9`, indigo `#6366F1`, neon HUD readouts, and brutalist precision).

To achieve world-class production quality exceeding benchmarks:
1. **AzInTelecom Data Center Telemetry Experience** must not be a static graphic; it must be a living, high-frequency, physics-grounded telemetry simulation modeled directly after **Tier III Uptime Institute and ANSI/TIA-942 certified standards** at AzInTelecom LLC (Azerbaijan). It must simulate environmental thermal dynamics (ASHRAE TC 9.9), optical fiber link integrity with strict insertion loss verification (<0.15 dB TIA/EIA compliant threshold), real-time PUE calculations, airflow CFM and pressure differentials, and provide interactive operator controls (streaming toggle, refresh rate, multi-rack selection, and manual anomaly injection).
2. **Credit-XAI Benchmark (`credit-xai-benchmark`)** must be an authentic, mathematically sound Explainable AI demonstration. Users must be able to adjust loan applicant financial parameters via real-time interactive sliders and immediately see:
   - Calibrated ML credit approval probabilities and risk tier classifications.
   - **SHAP (SHapley Additive exPlanations)** waterfall and contribution breakdown satisfying game-theoretic efficiency.
   - **LIME (Local Interpretable Model-agnostic Explanations)** local sensitivity weights.
   - **Counterfactual Recourse Engine ("What-If Recourse")** computing the minimal-effort changes required for an applicant to achieve approval.

Both components must execute **100% client-side with zero external backend dependencies**, ensuring lightning-fast updates (<16ms 60 FPS response time), zero API latency, and rock-solid offline reliability.

---

## 2. Authoritative Specification Sources

| Domain | Governing Standard / Specification | Key Parameters & Constraints |
|---|---|---|
| **Data Center Tier Classification** | Uptime Institute Tier III: Concurrently Maintainable; ANSI/TIA-942-B | 99.982% uptime (<1.58 hrs annual downtime); N+1 cooling redundancy; 2N electrical distribution paths; dual-corded servers. |
| **Data Center Thermal & Humidity** | ASHRAE TC 9.9 (2021) Thermal Guidelines for Data Processing Environments | Class A1 Recommended: 18.0°C – 27.0°C inlet; Allowable: 15.0°C – 32.0°C; Relative Humidity (RH): 40% – 60% (Allowable 20% – 80%); Dew Point: 5.5°C – 15.0°C. Max rate of change: 5°C/hr. |
| **Optical / Fiber Cabling** | ANSI/TIA-568.3-D, TIA-526-14-C, ISO/IEC 11801, ITU-T G.652.D / G.657.A1 | Insertion loss per connector pair: target $<0.15\text{ dB}$ (strict low-loss MPO/LC elite); Transmit (Tx) -1.5 to -3.0 dBm; Receive (Rx) -3.5 to -5.5 dBm; Receiver sensitivity limit -14.4 dBm. Attenuation: 0.35 dB/km @ 1310nm, 0.20 dB/km @ 1550nm (single-mode OS2). |
| **Data Center Energy & Airflow** | The Green Grid PUE 2.0; ASHRAE Datacom Series | $\text{PUE} = P_{\text{total}} / P_{\text{IT}}$ (nominal target 1.20 – 1.35 for Tier III); Airflow: 120 – 160 CFM per kW IT load; Static pressure differential: $+10\text{ Pa}$ to $+25\text{ Pa}$ cold aisle positive containment. |
| **Explainable AI (XAI) Theory** | Lundberg & Lee (NeurIPS 2017) *A Unified Approach to Interpreting Model Predictions*; Ribeiro et al. (KDD 2016) *LIME*; Wachter et al. (Oxford 2017) *Counterfactual Explanations Without Opening the Black Box* | Additive feature attribution: $f(x) = \phi_0 + \sum \phi_i x_i$; Shapley axioms (Efficiency, Symmetry, Dummy, Additivity); Local surrogate regression $g \in G$; Counterfactual distance minimization $d(x, x') + \lambda (f(x') - y^*)^2$. |
| **Financial Risk & Regulatory** | Basel II/III Credit Risk Framework; US Equal Credit Opportunity Act (ECOA) / Regulation B; EU AI Act High-Risk AI System Requirements | Adverse action notice generation based on top negative explanatory features; Disparate impact ratio tracking; Calibrated probability of default (PD). |

---

## 3. Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Telemetry - Thermal | Cold/Hot Aisle Thermal Gradient Monitoring | Simulates and monitors rack inlet (cold aisle, 18-27°C) and exhaust (hot aisle, 30-40°C) temperatures across top, middle, and bottom sensors. | Rack load, ambient chill temp, fan speed | Real-time temps (°C/°F), $\Delta T$, temperature heatmap | Warning status if $>24.5^\circ\text{C}$; Alarm if $>27^\circ\text{C}$ | ORIGINAL_REQUEST.md R3 & ASHRAE TC 9.9 |
| 2 | Telemetry - Humidity | Relative Humidity & Dew Point Monitor | Tracks relative humidity percentage (RH %) and calculates dew point to prevent condensation and ESD risks. | Air moisture level, inlet temp | RH% (40-60%), Dew Point (°C), Status (Optimal, Dry, Humid) | Warning if RH $<35\%$ or $>65\%$; Alarm if RH $<20\%$ or $>75\%$ | ORIGINAL_REQUEST.md R3 & ASHRAE TC 9.9 |
| 3 | Telemetry - Optical | Fiber Link Insertion Loss & Attenuation | Measures optical signal integrity against the Tier III benchmark of $<0.15\text{ dB}$ loss per connection with TIA/EIA compliance status. | Fiber wavelength (1310/1550nm), connector cleanliness, fiber bend radius | Insertion loss (dB), Tx/Rx power (dBm), TIA compliance flag (PASS/FAIL) | Alarm indicator + warning banner when insertion loss $\ge 0.15\text{ dB}$ | ORIGINAL_REQUEST.md R3 & TIA-568.3-D |
| 4 | Telemetry - Optical | Optical Power Budget & Waveform Graph | Real-time oscilloscope/sparkline tracking optical power levels (dBm) and Bit Error Rate (BER). | Signal stream time ticks, attenuation factor | Live SVG/Canvas waveform, current dBm, BER ($<10^{-12}$) | Signal degradation visual drop; BER spike alerts | TIA-526-14-C & Tier III Specs |
| 5 | Telemetry - Energy | Real-time PUE (Power Usage Effectiveness) Calculator | Computes instantaneous PUE based on dynamic IT equipment load, cooling chiller demand, and UPS distribution losses. | IT power (kW), cooling power (kW), ambient outdoor temp | Real-time PUE value (1.20-1.35), efficiency grade, power breakdown chart | Flags high-energy warning if $\text{PUE} > 1.45$ | ORIGINAL_REQUEST.md R3 & Green Grid Spec |
| 6 | Telemetry - Airflow | Airflow Velocity & Differential Pressure ($\Delta P$) | Monitors volumetric airflow in CFM (Cubic Feet per Minute) and cold/hot aisle static pressure differential in Pascals. | Fan RPM, perforated tile open area, IT thermal dissipation | Airflow (CFM), Static pressure $\Delta P$ (Pa), Air speed (m/s) | Low pressure warning if $\Delta P < 8\text{ Pa}$ (recirculation risk) | ORIGINAL_REQUEST.md R3 & Datacom Airflow Specs |
| 7 | Telemetry - Node Health | Server Cluster Node Health Matrix | Displays status, CPU load %, memory utilization %, NVMe IOPS, and uptime for 6 blade nodes in the selected rack. | Node telemetry polling tick, workload profile | Per-node status pill, CPU/RAM bar, IOPS gauge, cluster uptime (99.982%+) | Node degraded/down status with visual red heartbeat | ORIGINAL_REQUEST.md R3 & AzInTelecom Cloud Specs |
| 8 | Telemetry - Controls | Live Streaming Toggle & Refresh Rate Selector | Controls real-time simulation tick loop: START/PAUSE, plus interval rate (500ms, 1000ms, 2500ms, 5000ms). | User click events, dropdown selection | Simulation run state, tick frequency, countdown progress bar | Gracefully pauses RAF/interval without memory leak | ORIGINAL_REQUEST.md R3 & UX Specs |
| 9 | Telemetry - Controls | Multi-Rack Bay Selector | Switches telemetry viewport between 4 specialized AzInTelecom data center racks (HPC Compute, Optical Core, Storage SAN, Edge K8s). | Rack ID tab click | Active rack data binding, localized heat map, optical link path | Retains past telemetry history per rack | AzInTelecom Architecture Survey |
| 10 | Telemetry - Simulation | Anomaly Injection Engine | Interactive buttons allowing the user to inject simulated real-world failures: Thermal Surge, Fiber Bend, Fan Failure, Normal Reset. | User trigger button click | Injected fault parameters modifying physics equations dynamically | Automatically surfaces alert in Event Log with audible/visual pulse | Tier III Commissioning Testing Specs |
| 11 | Telemetry - Visuals | Real-time Event Log Stream | Monospace, timestamped scrolling audit log of data center telemetry events, SNMP traps, and threshold breaches. | Metric threshold evaluations, user actions | Chronological terminal log entries with status color-coding | Auto-prunes entries at 50 max to prevent DOM bloat | Mission-Control HUD UX Specs |
| 12 | XAI - Core Engine | Calibrated Credit Scoring Model | Evaluates 9 applicant financial features and computes log-odds risk score, approval probability ($0-100\%$), and Risk Tier (A to D). | 9 applicant features (Income, FICO, DTI, Loan, etc.) | $P(\text{Approve})$, $P(\text{Default})$, Risk Tier, Approved/Decline status | Gracefully handles extreme outliers via sigmoid/tanh bounds | ORIGINAL_REQUEST.md R2 & Basel II Credit Scoring |
| 13 | XAI - SHAP | SHAP Additive Contribution Waterfall | Decomposes model prediction into exact additive Shapley values ($\phi_i$) showing positive (green) and negative (red) pushes from base value. | Applicant feature vector, model base rate $\mathbb{E}[f]$ | Array of $\{\text{feature}, \phi_i, \text{direction}\}$, SVG Waterfall Plot | Sum of $\phi_i + \text{base} \equiv f(x)$ exactly (efficiency axiom) | ORIGINAL_REQUEST.md R2 & Lundberg et al. 2017 |
| 14 | XAI - LIME | LIME Local Feature Sensitivity Analysis | Computes local gradients / linear surrogate coefficients in the perturbation neighborhood around the applicant. | Feature vector, local perturbation radius | Normalized feature elasticities ($w_i$), horizontal tornado chart | Clamped gradients prevent division-by-zero on flat zones | ORIGINAL_REQUEST.md R2 & Ribeiro et al. 2016 |
| 15 | XAI - Recourse | Algorithmic Counterfactual Recourse ("What-If") | Solves for the minimal actionable feature perturbation vector that flips a rejected or borderline application into Approved. | Current rejected features, target approval threshold (75%) | Suggested changes: $\Delta\text{DTI}$, $\Delta\text{Loan}$, $\Delta\text{Savings}$, and projected score | Displays "Already Approved" or optimal recourse steps | Wachter et al. 2017 & EU AI Act XAI |
| 16 | XAI - Presets | Financial Applicant Archetype Presets | One-click preset loader for standard credit profiles: Prime Tech Pro, Debt Consolidation, High-Net-Worth Founder, Subprime Borderline. | Preset button click | Replaces all 9 slider values, smoothly animating sliders & charts | Sanitizes input values to within valid slider ranges | Financial Demo Usability Standards |
| 17 | XAI - Compliance | Adverse Action Notice & Fair Lending Audit | Generates an official regulatory Adverse Action Notice detailing the top 3 principal reasons for score reduction based on SHAP values. | Top negative SHAP features | Adverse action statement, rank-ordered factor list, Fair Lending impact | Hidden if applicant is Prime / Approved | US ECOA / Regulation B & Basel Rules |

---

## 4. Edge Cases & Boundary Conditions

| # | Feature | Input / Edge Condition | Expected Observed Behavior | Verification Criterion |
|---|---------|------------------------|----------------------------|------------------------|
| E1 | Telemetry - Optical | Insertion loss exactly at $0.149\text{ dB}$ vs $0.150\text{ dB}$ | At $0.149\text{ dB}$, display green `PASS (<0.15 dB TIA-568.3-D)`. At $0.150\text{ dB}$, immediately switch to amber/red `NON-COMPLIANT (≥0.15 dB)` alert. | Strict boundary check: `loss < 0.15 ? 'pass' : 'fail'`. |
| E2 | Telemetry - Thermal | High IT load (10 kW) coupled with cooling fan failure injection | Rack inlet temp spikes above $27.0^\circ\text{C}$; cold-to-hot $\Delta T$ jumps from $11^\circ\text{C}$ to $>22^\circ\text{C}$; warning status pulses red. | Physics simulation thermal runaway clamp at $45^\circ\text{C}$ max to prevent NaN/infinite values. |
| E3 | Telemetry - Humidity | Relative humidity drops below $20\%$ | Alert badge triggers: `CRITICAL: ESD HAZARD (RH < 20%)`. Static electricity discharge warning rendered. | Dew point and ESD safety alert state active. |
| E4 | Telemetry - PUE | IT load drops to zero (standby mode) | Formula gracefully handles $P_{\text{IT}} \to 0$ by clamping minimum IT load to idle baseline ($0.5\text{ kW}$) to prevent `Infinity` or division by zero. | PUE remains bounded within $[1.05, 3.50]$. |
| E5 | Telemetry - Controls | User rapidly clicks "START/PAUSE" or changes refresh rate rapidly | Interval and RAF (requestAnimationFrame) handlers cleanly cancel previous timers via `clearInterval`/`cancelAnimationFrame`, preventing memory leak or double-ticking. | Memory profile remains flat; zero duplicate ticks in Event Log. |
| E6 | XAI - Scoring | Extreme slider inputs: FICO 300, DTI 65%, Income $20k, Loan $100k | Sigmoid log-odds saturates cleanly to approval probability $P(\text{Approve}) \approx 1.2\%$; risk tier `Tier D - High Risk`; no NaN or negative probabilities. | Output clamped strictly to $[0.001, 0.999]$. |
| E7 | XAI - Scoring | Ideal applicant: FICO 850, DTI 5%, Income $250k, Loan $5k, Collateral $150k | Sigmoid log-odds yields $P(\text{Approve}) \approx 99.4\%$; risk tier `Tier A - Prime`; all positive SHAP contributions. | Waterfall plot starts at base rate, ascends to $99.4\%$. |
| E8 | XAI - Counterfactual | Applicant is already approved ($P \ge 75\%$) | Counterfactual solver identifies zero required action; displays celebratory badge: "Optimal Financial Standing — No Recourse Required". | Solvers short-circuits gracefully without optimization loop. |
| E9 | XAI - Counterfactual | Immutable features cannot be changed (delinquencies, employment years) | Counterfactual algorithm only perturbs actionable variables (DTI, Loan Amount, Liquid Reserves, Revolving Card Utilization). | Delinquencies and employment stability remain strictly fixed in recourse proposal. |
| E10 | XAI - Real-time Sliders | Rapid continuous dragging of slider (60 updates per second) | Computation finishes in $<2\text{ ms}$; React state updates without stutter; SHAP waterfall bars animate smoothly using CSS transform / SVG width. | No layout thrashing or dropped frames on 60 Hz displays. |

---

## 5. Part A: AzInTelecom Data Center Telemetry Architecture & Technical Specification

### 5.1 Architectural Blueprint & Data Flow

```
+-----------------------------------------------------------------------------------+
|                        AzInTelecom Telemetry Engine                               |
|                                                                                   |
|  +--------------------+         +-----------------------------------------------+  |
|  | Simulation Ticker  | ------> | Physics Simulation Engine                     |  |
|  | (500ms - 5000ms)   |         | - Thermal Convection & Heat Dissipation       |  |
|  +--------------------+         | - Optical Power Budget & Rayleigh Attenuation |  |
|            |                    | - PUE & Energy Model                          |  |
|            v                    | - Fluid Airflow & Pressure Differentials      |  |
|  +--------------------+         +-----------------------------------------------+  |
|  | Anomaly Injector   |                                 |                         |
|  | (Thermal, Fiber,   | --------------------------------+                         |
|  |  Airflow, Power)   |                                 v                         |
|  +--------------------+                  +-----------------------------+          |
|                                          | Telemetry State Store (Zustand/React)   |
|                                          +-----------------------------+          |
|                                                         |                         |
|         +-----------------------+-----------------------+------------------+      |
|         |                       |                       |                  |      |
|         v                       v                       v                  v      |
|  +--------------+       +---------------+       +---------------+   +------------+|
|  | Optical Link |       | Environmental |       | Energy & PUE  |   | Rack Blade ||
|  | HUD & Scope  |       | Cold/Hot Aisle|       | Gauge & Power |   | Heatmap 42U||
|  | (<0.15dB)    |       | Temp/Humidity |       | Breakdown     |   | & Node Grid||
|  +--------------+       +---------------+       +---------------+   +------------+|
|         |                       |                       |                  |      |
|         +-----------------------+-----------------------+------------------+      |
|                                 |                                                 |
|                                 v                                                 |
|                   +---------------------------+                                   |
|                   | Real-Time Event Audit Log |                                   |
|                   +---------------------------+                                   |
+-----------------------------------------------------------------------------------+
```

### 5.2 TypeScript Data Schemas

```typescript
// Telemetry Data Contracts

export type TelemetryStatus = 'nominal' | 'warning' | 'critical';

export interface EnvironmentalTelemetry {
  inletTempC: number;         // Cold aisle inlet temp (18.0 - 27.0 °C)
  exhaustTempC: number;       // Hot aisle exhaust temp (30.0 - 42.0 °C)
  deltaTempC: number;         // exhaust - inlet
  relativeHumidityPct: number;// RH % (40.0 - 60.0 %)
  dewPointC: number;          // Dew point calculation (°C)
  status: TelemetryStatus;    // Aggregated thermal status
  rateOfChangePerHr: number;  // Thermal drift rate (°C/hr)
}

export interface OpticalLinkTelemetry {
  wavelengthNm: 1310 | 1550 | 850;
  fiberType: 'OS2 Single-Mode' | 'OM4 Multi-Mode';
  insertionLossDb: number;    // Insertion loss (dB) - Target: < 0.15 dB
  lossThresholdDb: 0.15;      // Authoritative TIA/EIA standard threshold
  isCompliant: boolean;       // insertionLossDb < 0.15
  txPowerDbm: number;         // Transmit power (-1.5 to -3.0 dBm)
  rxPowerDbm: number;         // Receive power (txPower - linkLoss)
  rxSensitivityDbm: number;   // Minimum threshold (-14.4 dBm)
  bitErrorRate: number;       // Pre-FEC BER (e.g. 1.2e-13)
  opticalReturnLossDb: number;// Back-reflection ORL (> 50 dB)
  status: TelemetryStatus;
}

export interface PowerEnergyTelemetry {
  itLoadKw: number;           // Power drawn by IT equipment (servers/switches)
  coolingLoadKw: number;      // Power drawn by CRAC/chillers
  distributionLossKw: number; // UPS & PDU conversion losses
  totalFacilityPowerKw: number; // itLoad + coolingLoad + distributionLoss
  pue: number;                // totalFacilityPower / itLoad (e.g. 1.24)
  targetPue: number;          // AzInTelecom Tier III benchmark (1.28)
  efficiencyRating: 'Ultra-Efficient' | 'Nominal Tier III' | 'Sub-Optimal';
  status: TelemetryStatus;
}

export interface AirflowDiagnostics {
  volumetricFlowCfm: number;  // Cubic feet per minute (~140 CFM / kW)
  faceVelocityMps: number;    // Air velocity through perforated tiles (m/s)
  staticPressureDiffPa: number; // Cold-to-hot differential pressure (10 - 25 Pa)
  fanSpeedRpm: number;        // CRAH blower speed
  fanSpeedPct: number;        // % of rated capacity
  status: TelemetryStatus;
}

export interface BladeNodeHealth {
  nodeId: string;             // e.g. "NODE-AZ-01A"
  slotPosition: string;       // e.g. "Bay 04 (4U)"
  cpuUsagePct: number;        // 0 - 100%
  ramUsagePct: number;        // 0 - 100%
  nvmeIops: number;           // 10,000 - 65,000 IOPS
  temperatureC: number;       // Die temp (42 - 68 °C)
  powerWatts: number;         // 320 - 750 W
  status: 'online' | 'degraded' | 'offline';
}

export interface RackTelemetry {
  rackId: 'AZ-01' | 'AZ-02' | 'AZ-03' | 'AZ-04';
  name: string;               // e.g. "AZ-01: HPC Neural Cluster"
  environmental: EnvironmentalTelemetry;
  opticalLink: OpticalLinkTelemetry;
  power: PowerEnergyTelemetry;
  airflow: AirflowDiagnostics;
  nodes: BladeNodeHealth[];
  slotHeatmap: number[];      // 42 values representing temperature (°C) for 1U-42U
  overallHealthPct: number;   // e.g. 99.982%
}

export interface TelemetryEventLog {
  id: string;
  timestamp: string;          // ISO string or formatted HH:mm:ss.SSS
  rackId: string;
  subsystem: 'THERMAL' | 'OPTICAL' | 'POWER' | 'AIRFLOW' | 'SECURITY';
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  message: string;
}

export type AnomalyType = 'none' | 'thermal_surge' | 'fiber_microbend' | 'airflow_choke' | 'power_failover';
```

### 5.3 Mathematical Simulation Formats & Physics

#### A. Thermal Gradient & Diffusion Model (42U Rack)
Each rack slot $u \in [1, 42]$ receives cold air from the bottom plenum ($u=1$) which heats up as it rises past server chassis:
$$T_{\text{inlet}}(u, t) = T_{\text{cold\_supply}} + \Delta T_{\text{buoyancy}} \cdot \left(\frac{u}{42}\right)^{0.8} + \epsilon_{\text{turb}}(t)$$
Where:
- $T_{\text{cold\_supply}} = 19.5^\circ\text{C} + \text{AnomalyOffset}_{\text{thermal}}$
- $\Delta T_{\text{buoyancy}} = 2.2^\circ\text{C}$ (gradual stratification from floor to top of rack)
- Hot exhaust temperature across rack:
$$T_{\text{exhaust}}(u, t) = T_{\text{inlet}}(u, t) + \frac{P_{\text{server}}(u, t)}{\rho_{\text{air}} \cdot C_p \cdot \dot{V}(u)}$$
Where $\rho_{\text{air}} \approx 1.204\text{ kg/m}^3$, $C_p \approx 1.005\text{ kJ/kg}\cdot^\circ\text{C}$, and $\dot{V}$ is airflow in $\text{m}^3/\text{s}$.
Nominal $\Delta T = T_{\text{exhaust}} - T_{\text{inlet}} \in [10.5^\circ\text{C}, 14.0^\circ\text{C}]$.

#### B. Optical Link Budget & Attenuation (<0.15 dB loss constraint)
The link consists of a single-mode OS2 backbone linking the Meet-Me Room (MMR) to the Top-of-Rack (ToR) switch across length $L = 0.18\text{ km}$:
$$\text{Loss}_{\text{total}} = \alpha(\lambda) \cdot L + 2 \cdot A_{\text{connector}} + A_{\text{splice}} + A_{\text{microbend}}$$
Where:
- $\alpha(1310\text{nm}) = 0.35\text{ dB/km}$ (contribution $= 0.063\text{ dB}$)
- $A_{\text{connector}} = 0.045\text{ dB} \pm 0.015\text{ dB}$ per ultra-low-loss LC Elite pair.
- $A_{\text{splice}} = 0.01\text{ dB}$.
- Nominal insertion loss $A_{\text{nominal}} \approx 0.118\text{ dB}$ (Strictly $< 0.15\text{ dB}$ TIA standard).
- Under simulated `fiber_microbend` anomaly:
$$A_{\text{microbend}}(t) = 0.28\text{ dB} \implies \text{Loss}_{\text{total}} = 0.398\text{ dB} \quad (\text{ALARM TRIGGERED})$$
- Transmit power $P_{Tx} = -2.2\text{ dBm}$. Receive power $P_{Rx} = P_{Tx} - \text{Loss}_{\text{total}} = -2.318\text{ dBm}$.

#### C. Real-Time PUE (Power Usage Effectiveness)
$$\text{PUE}(t) = 1.0 + \frac{P_{\text{cooling}}(t) + P_{\text{losses}}(t)}{P_{\text{IT}}(t)}$$
Where:
- $P_{\text{IT}} \in [6.2\text{ kW}, 8.8\text{ kW}]$ depending on CPU utilization.
- $P_{\text{losses}} = 0.045 \cdot P_{\text{IT}}$ (UPS double conversion + PDU distribution).
- $P_{\text{cooling}} = P_{\text{IT}} \times \left(0.16 + 0.006 \cdot \max(0, T_{\text{ambient}} - 22) + 0.05 \cdot \left(\frac{\text{FanRPM}}{3000}\right)^3\right)$.
- Resulting PUE: $1.22$ to $1.29$ under normal operations; jumps to $1.48$ during thermal surge cooling ramp-up.

#### D. Differential Static Pressure ($\Delta P$)
$$\Delta P = \frac{1}{2} \rho_{\text{air}} v_{\text{tile}}^2 \cdot \left(\frac{1}{C_d^2} - 1\right)$$
- Target nominal: $+16.4\text{ Pa}$ ($0.066\text{ in. w.g.}$).
- Normal range: $12\text{ Pa}$ to $22\text{ Pa}$.

---

## 6. Part B: Interactive Credit-XAI Benchmark Architecture & Technical Specification

### 6.1 Architectural Blueprint & Real-Time Flow

```
+-----------------------------------------------------------------------------------+
|                        Credit-XAI Benchmark Engine                                |
|                                                                                   |
|  +---------------------------+       +-----------------------------------------+  |
|  | Interactive Feature Inputs| ----> | Calibrated Credit Scoring Model         |  |
|  | (9 Financial Parameters)  |       | - Log-odds Score z(x)                   |  |
|  +---------------------------+       | - Approval Probability P(Approve) = σ(z)|  |
|               |                      | - Basel II Risk Classification (Tier A-D|  |
|               |                      +-----------------------------------------+  |
|               |                                           |                       |
|               +----------------------+--------------------+                       |
|                                      |                                            |
|         +----------------------------+-----------------------------+              |
|         |                            |                             |              |
|         v                            v                             v              |
|  +---------------------+   +---------------------+   +--------------------------+ |
|  | SHAP Engine         |   | LIME Engine         |   | Counterfactual Recourse  | |
|  | Exact Additive      |   | Local Surrogate     |   | Minimal Actionable Cost  | |
|  | Shapley Values (φi) |   | Elasticity Gradients|   | Perturbation Solver      | |
|  +---------------------+   +---------------------+   +--------------------------+ |
|         |                            |                             |              |
|         v                            v                             v              |
|  +---------------------+   +---------------------+   +--------------------------+ |
|  | SVG Waterfall Plot  |   | LIME Tornado Chart  |   | "What-If" Interactive    | |
|  | Framer Motion Spring|   | Sensitivity Ranking |   | Recourse Actions View    | |
|  +---------------------+   +---------------------+   +--------------------------+ |
+-----------------------------------------------------------------------------------+
```

### 6.2 TypeScript Data Schemas

```typescript
// XAI Data Contracts

export interface ApplicantFeatures {
  annualIncome: number;         // $20,000 - $250,000 (step: 1000)
  creditScore: number;          // 300 - 850 (FICO score)
  debtToIncomeRatio: number;    // 5 - 65% (DTI percentage)
  loanAmount: number;           // $5,000 - $100,000 (step: 500)
  loanTermMonths: 12 | 24 | 36 | 48 | 60;
  employmentDurationYears: number; // 0 - 25 years
  revolvingLineUtilizationPct: number; // 0 - 100%
  delinquenciesLast2Years: number; // 0 - 5 occurrences
  liquidAssetsCollateral: number; // $0 - $150,000
}

export type RiskTier = 'Tier A (Prime)' | 'Tier B (Near Prime)' | 'Tier C (Subprime)' | 'Tier D (Decline)';

export interface ModelPrediction {
  logOddsScore: number;         // z(x)
  approvalProbability: number;  // P(Approve) in [0, 1]
  defaultProbability: number;   // P(Default) = 1 - P(Approve)
  riskTier: RiskTier;
  decision: 'APPROVED' | 'MANUAL_REVIEW' | 'DECLINED';
  confidenceScore: number;      // Distance from decision boundary |P - 0.5| * 2
}

export interface ShapContribution {
  featureKey: keyof ApplicantFeatures;
  featureLabel: string;
  featureValue: string | number;
  shapValue: number;            // Marginal push to log-odds score
  direction: 'positive' | 'negative';
  percentageEffect: number;     // Normalized impact on score
  cumulativeValue: number;      // Running total for waterfall visualization
}

export interface ShapExplanation {
  baseValue: number;            // Expected baseline value E[f(x)]
  finalPrediction: number;      // Base + sum(shapValues)
  contributions: ShapContribution[];
  efficiencyCheck: boolean;     // Validates sum(phi) + base == finalPrediction
}

export interface LimeFeatureWeight {
  featureKey: keyof ApplicantFeatures;
  featureLabel: string;
  weight: number;               // Local sensitivity slope
  normalizedImpact: number;     // [-1.0, 1.0]
  elasticityDirection: 'increases_approval' | 'decreases_approval';
  localPerturbationRange: string; // e.g. "DTI within [24% - 32%]"
}

export interface CounterfactualAction {
  featureKey: keyof ApplicantFeatures;
  featureLabel: string;
  currentValue: number;
  recommendedValue: number;
  changeDelta: number;
  actionFeasibility: 'easy' | 'moderate' | 'challenging';
  estimatedTimeToAchieve: string; // e.g. "1 - 3 months"
}

export interface CounterfactualRecourse {
  isAlreadyApproved: boolean;
  targetApprovalProbability: number; // e.g. 0.75 (75%)
  projectedApprovalProbability: number;
  projectedRiskTier: RiskTier;
  actions: CounterfactualAction[];
  totalActionCostScore: number;
}
```

### 6.3 Mathematical Model & Analytical Formulation

#### A. Calibrated Non-Linear Scoring Function
The log-odds prediction $z(x)$ is formulated as an additive sum of validated empirical credit risk responses:
$$z(x) = \beta_0 + \sum_{i=1}^9 \Delta z_i(x_i)$$
Where base rate $\beta_0 = 0.50$ (baseline population approval probability $\sigma(\beta_0) \approx 62.2\%$).

Each non-linear sub-function:
1. **Credit Score (FICO)**:
   $$\Delta z_1 = 2.8 \times \tanh\left(\frac{\text{creditScore} - 680}{95}\right)$$
2. **Debt-to-Income (DTI %)**:
   $$\Delta z_2 = -2.2 \times \left(\frac{\text{debtToIncome} - 28}{20}\right) - 1.4 \times \max\left(0, \frac{\text{debtToIncome} - 43}{12}\right)^2$$
3. **Income & Loan Ratio**:
   $$\text{Ratio}_{IL} = \frac{\text{annualIncome}}{\max(\text{loanAmount}, 1000)}$$
   $$\Delta z_3 = 1.5 \times \ln\left(1 + \text{Ratio}_{IL}\right) - 1.6$$
4. **Revolving Credit Card Utilization**:
   $$\Delta z_4 = -1.9 \times \left(\frac{\text{revolvingUtilization} - 25}{30}\right)$$
5. **Delinquency Penalties (Derogatory Records)**:
   $$\Delta z_5 = -1.6 \times (\text{delinquencies2Yr})^{1.25}$$
6. **Employment Stability**:
   $$\Delta z_6 = 0.75 \times \left(1 - e^{-0.30 \times \text{employmentYears}}\right) - 0.25$$
7. **Liquid Collateral Coverage**:
   $$\text{Coverage} = \frac{\text{liquidAssets}}{\max(\text{loanAmount}, 1000)}$$
   $$\Delta z_7 = 1.3 \times \tanh(2.2 \times \text{Coverage})$$
8. **Loan Term Factor**:
   $$\Delta z_8 = -0.15 \times \left(\frac{\text{termMonths} - 36}{12}\right)$$

**Final Probability**:
$$P(\text{Approve}) = \sigma(z(x)) = \frac{1}{1 + e^{-z(x)}}$$

#### B. Exact Shapley Value ($\phi_i$) Decomposition
To satisfy game-theoretic axioms (Efficiency, Symmetry, Dummy, Additivity) in real-time without Monte-Carlo sampling lag:
$$\phi_i(x) = \Delta z_i(x_i) - \mathbb{E}[\Delta z_i]$$
Where $\mathbb{E}[\Delta z_i]$ is the population expectation calculated across median baseline values ($FICO=680, DTI=32\%, Income=\$75k, Loan=\$30k$, etc.).
By definition:
$$z(x) = \mathbb{E}[z] + \sum_{i=1}^9 \phi_i(x)$$
This guarantees **100% mathematical precision** with zero approximation error on every slider tick!

#### C. LIME Local Sensitivity Gradient
For each feature $i$, the local elasticity gradient represents the partial derivative scaled by standard feature range:
$$w_i = \left.\frac{\partial z(x)}{\partial x_i}\right|_x \cdot \Delta_{\text{range}}(x_i)$$
Positive weights indicate that an increase in feature value increases approval probability; negative weights indicate an inverse relationship.

#### D. Algorithmic Counterfactual Optimization
When $P(\text{Approve}) < 0.72$, the counterfactual engine solves:
$$\min_{\delta \in \mathcal{A}} \sum_{j \in \text{Actionable}} c_j \cdot \left(\frac{\delta_j}{\text{Range}_j}\right)^2 \quad \text{subject to} \quad \sigma\left(z(x + \delta)\right) \ge 0.75$$
Where actionable set $\mathcal{A} = \{\text{debtToIncome}, \text{loanAmount}, \text{revolvingUtilization}, \text{liquidAssets}\}$, with difficulty weights $c_{\text{loan}} = 1.0, c_{\text{revolving}} = 1.5, c_{\text{dti}} = 2.5, c_{\text{assets}} = 3.0$.
A closed-form Lagrange multiplier / coordinate descent step converges in $<1\text{ ms}$, providing instant actionable advice!

---

## 7. UI/UX Interaction States & Component Specifications

### 7.1 AzInTelecom Telemetry Experience UI Specification

1. **Header HUD Strip**:
   - Status Indicator: Glowing pulse dot (`green` = ONLINE, `amber` = DEGRADED, `red` = FAULT).
   - Facility Badge: `AZINTELECOM TIA-942 TIER III CERTIFIED DATA CENTER`.
   - Streaming Controls: `[❚❚ PAUSE]` / `[▶ LIVE]`, Refresh interval pill group (`500ms`, `1s`, `2.5s`, `5s`).
   - Active Rack Selector Tabs: `AZ-01: COMPUTE`, `AZ-02: OPTICAL CORE`, `AZ-03: SAN STORAGE`, `AZ-04: K8S EDGE`.

2. **Primary Telemetry Viewport (Grid Layout)**:
   - **Card 1: Optical Link Integrity (TIA/EIA <0.15 dB)**:
     - Prominent numeric readout: e.g. `0.118 dB` (green glow).
     - Standard compliance pill: `TIA-568.3-D PASS (<0.15 dB)` or `FAIL (≥0.15 dB)`.
     - Tx/Rx power bar meters with $-14.4\text{ dBm}$ sensitivity floor line.
     - Live SVG sparkline graph showing last 30 data points.
   - **Card 2: Environmental Thermal & Humidity (ASHRAE TC 9.9)**:
     - Dual Cold Aisle / Hot Aisle readouts: e.g. Cold `20.4°C` / Hot `32.8°C` ($\Delta T = 12.4^\circ\text{C}$).
     - Relative Humidity meter: `48.2% RH` (Optimal 40-60%).
     - Dew point indicator: `8.6°C`.
     - ASHRAE Class A1 compliance badge.
   - **Card 3: Power Efficiency & PUE**:
     - Radial gauge with needle pointing to current PUE (e.g. `1.24`).
     - Power split: IT Load (`7.4 kW`), Cooling (`1.5 kW`), Losses (`0.3 kW`).
   - **Card 4: Airflow & Differential Static Pressure**:
     - Airflow volumetric rate: `1,180 CFM`.
     - Static pressure differential: `+16.2 Pa` (Safe positive containment).
   - **Card 5: 42U Rack Heatmap & Blade Chassis Matrix**:
     - Visual vertical 42U rack column where each 1U slot displays color-coded temperature gradient.
     - 6 blade node cards showing CPU%, RAM%, and NVMe IOPS.

3. **Bottom Interactive Control & Audit Bay**:
   - **Anomaly Injector Panel**:
     - `[Normal Baseline]`
     - `[Simulate Thermal Surge]`
     - `[Simulate Fiber Micro-Bend]`
     - `[Simulate Airflow Choke]`
   - **Monospace Terminal Event Log**:
     - Live auto-scrolling log with timestamp, subsystem tag, and status message.

---

### 7.2 Credit-XAI Benchmark UI Specification

1. **Top Overview & Model Decision Banner**:
   - Large Circular / Radial Approval Gauge: e.g. `78.4%` approval probability.
   - Risk Tier Badge: `Tier A (Prime)` (Emerald), `Tier B` (Cyan), `Tier C` (Amber), `Tier D` (Crimson).
   - Decision Stamp: `APPROVED`, `MANUAL REVIEW`, or `DECLINED`.
   - Preset Profile Quick-Select: `[Tech Professional]`, `[Debt Consolidation]`, `[Founder]`, `[Subprime Applicant]`.

2. **Left Panel: Interactive Applicant Dossier**:
   - 9 interactive sliders with numeric input fields and formatted units ($, %, years, points).
   - Real-time updates with instantaneous visual feedback (<16ms).

3. **Right Panel: Explainability & Diagnostic Tabs**:
   - **Tab 1: SHAP Waterfall Plot**:
     - Horizontal additive bar chart.
     - Base Value reference line ($E[f(x)] = 62.2\%$).
     - Positive green bars pushing right (+approval probability).
     - Negative red bars pushing left (-approval probability).
     - Final score endpoint marker matching the model prediction.
   - **Tab 2: LIME Local Sensitivity Tornado Chart**:
     - Tornado chart showing the top 5 most sensitive features around this applicant's position.
     - Elasticity direction and magnitude bars.
   - **Tab 3: "What-If" Counterfactual Recourse**:
     - Actionable steps: "Decrease DTI by 6.0%", "Reduce loan by $8,000", "Pay revolving card to <30%".
     - `[Apply Counterfactual]` button that automatically animates sliders to the target recourse position.
   - **Tab 4: Regulatory Adverse Action Audit**:
     - Official compliance notice format citing top 3 negative factors per US ECOA / FCRA standards.

---

## 8. Implementation Verification & Acceptance Checkpoints

1. **Zero External Dependencies**:
   Both simulation engines must be written in pure TypeScript / React without requiring external Python/Flask backends or heavy remote API calls.
2. **Real-Time Physics Fidelity**:
   - Optical loss must accurately transition from `PASS (<0.15 dB)` to `ALARM` when anomaly is triggered.
   - SHAP waterfall must strictly satisfy $\sum \phi_i + \text{base} = \text{score}$.
3. **High-Tech Falcon Aesthetics**:
   Tailwind styling with cyan (`#0EA5E9`), indigo (`#6366F1`), dark slate canvas (`bg-slate-950`), glowing borders, and crisp monospace telemetry readouts.
4. **Performance**:
   60 FPS animations on drag and tick without memory accumulation.
