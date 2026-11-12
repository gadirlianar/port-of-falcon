/**
 * Port of Falcon — Standalone High-Performance Test Runner & Assertion Harness
 * Zero external dependencies. Sub-second execution. Native TypeScript support in Node 22+.
 * Path: tests/test-runner.ts
 */

export interface TestResult {
  name: string;
  passed: boolean;
  durationMs: number;
  error?: Error | unknown;
}

export interface SuiteResult {
  name: string;
  tier: 'unit' | 'tier1' | 'tier2' | 'tier3' | 'tier4' | 'general';
  durationMs: number;
  tests: TestResult[];
}

export type MatcherResult = {
  pass: boolean;
  message: () => string;
};

// Global Test Registry
const suiteRegistry: {
  name: string;
  tier: 'unit' | 'tier1' | 'tier2' | 'tier3' | 'tier4' | 'general';
  fn: () => void | Promise<void>;
}[] = [];

let currentSuite: {
  name: string;
  tier: 'unit' | 'tier1' | 'tier2' | 'tier3' | 'tier4' | 'general';
  tests: { name: string; fn: () => void | Promise<void> }[];
} | null = null;

/**
 * Register a test suite with optional tier classification.
 */
export function describe(name: string, fn: () => void | Promise<void>, tier: 'unit' | 'tier1' | 'tier2' | 'tier3' | 'tier4' | 'general' = 'general') {
  // Infer tier from name if not explicitly passed
  let inferredTier = tier;
  if (tier === 'general') {
    const lower = name.toLowerCase();
    if (lower.includes('unit') || lower.includes('math') || lower.includes('physics')) {
      inferredTier = 'unit';
    } else if (lower.includes('tier 1') || lower.includes('tier1')) {
      inferredTier = 'tier1';
    } else if (lower.includes('tier 2') || lower.includes('tier2')) {
      inferredTier = 'tier2';
    } else if (lower.includes('tier 3') || lower.includes('tier3')) {
      inferredTier = 'tier3';
    } else if (lower.includes('tier 4') || lower.includes('tier4')) {
      inferredTier = 'tier4';
    }
  }

  suiteRegistry.push({ name, tier: inferredTier, fn });
}

/**
 * Register a single test case inside the active suite.
 */
export function it(name: string, fn: () => void | Promise<void>) {
  if (!currentSuite) {
    throw new Error(`Test '${name}' must be defined inside a describe() block.`);
  }
  currentSuite.tests.push({ name, fn });
}

export const test = it;

/**
 * Deep equality comparison helper.
 */
function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== typeof b) return false;

  if (typeof a === 'number' && typeof b === 'number') {
    if (Number.isNaN(a) && Number.isNaN(b)) return true;
    return a === b;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  if (typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    for (const key of keysA) {
      if (!Object.prototype.hasOwnProperty.call(b, key) || !deepEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }

  return false;
}

/**
 * Fluent Assertion Matcher Class.
 */
export class Expectation<T = any> {
  private isNot = false;

  constructor(private actual: T) {}

  get not(): Expectation<T> {
    const inverted = new Expectation(this.actual);
    inverted.isNot = !this.isNot;
    return inverted;
  }

  private assert(condition: boolean, failMessage: () => string) {
    const passed = this.isNot ? !condition : condition;
    if (!passed) {
      throw new Error(failMessage());
    }
  }

  toBe(expected: any) {
    this.assert(
      Object.is(this.actual, expected),
      () => `Expected ${JSON.stringify(this.actual)} ${this.isNot ? 'not to be' : 'to be'} ${JSON.stringify(expected)}`
    );
  }

  toEqual(expected: any) {
    this.assert(
      deepEqual(this.actual, expected),
      () => `Expected ${JSON.stringify(this.actual)} ${this.isNot ? 'not to equal' : 'to equal'} ${JSON.stringify(expected)}`
    );
  }

  toBeCloseTo(expected: number, epsilon: number = 1e-4) {
    const diff = Math.abs((this.actual as unknown as number) - expected);
    this.assert(
      diff <= epsilon,
      () => `Expected ${this.actual} to be within ${epsilon} of ${expected} (difference was ${diff})`
    );
  }

  toBeGreaterThan(limit: number) {
    this.assert(
      (this.actual as unknown as number) > limit,
      () => `Expected ${this.actual} ${this.isNot ? 'not to be' : 'to be'} greater than ${limit}`
    );
  }

  toBeLessThan(limit: number) {
    this.assert(
      (this.actual as unknown as number) < limit,
      () => `Expected ${this.actual} ${this.isNot ? 'not to be' : 'to be'} less than ${limit}`
    );
  }

  toBeGreaterThanOrEqual(limit: number) {
    this.assert(
      (this.actual as unknown as number) >= limit,
      () => `Expected ${this.actual} ${this.isNot ? 'not to be' : 'to be'} >= ${limit}`
    );
  }

  toBeLessThanOrEqual(limit: number) {
    this.assert(
      (this.actual as unknown as number) <= limit,
      () => `Expected ${this.actual} ${this.isNot ? 'not to be' : 'to be'} <= ${limit}`
    );
  }

  toContain(item: any) {
    let contains = false;
    if (typeof this.actual === 'string') {
      contains = this.actual.includes(item);
    } else if (Array.isArray(this.actual)) {
      contains = this.actual.includes(item) || this.actual.some(x => deepEqual(x, item));
    } else if (this.actual instanceof Set) {
      contains = this.actual.has(item);
    }
    this.assert(
      contains,
      () => `Expected collection ${this.isNot ? 'not to contain' : 'to contain'} ${JSON.stringify(item)}`
    );
  }

  toMatch(pattern: RegExp | string) {
    const reg = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
    const matches = reg.test(String(this.actual));
    this.assert(
      matches,
      () => `Expected "${this.actual}" ${this.isNot ? 'not to match' : 'to match'} pattern ${pattern}`
    );
  }

  toBeDefined() {
    this.assert(
      this.actual !== undefined,
      () => `Expected value ${this.isNot ? 'not to be defined' : 'to be defined'}, but received undefined`
    );
  }

  toBeUndefined() {
    this.assert(
      this.actual === undefined,
      () => `Expected value ${this.isNot ? 'to be defined' : 'to be undefined'}, but received ${this.actual}`
    );
  }

  toBeTruthy() {
    this.assert(
      Boolean(this.actual),
      () => `Expected ${JSON.stringify(this.actual)} ${this.isNot ? 'to be falsy' : 'to be truthy'}`
    );
  }

  toBeFalsy() {
    this.assert(
      !this.actual,
      () => `Expected ${JSON.stringify(this.actual)} ${this.isNot ? 'to be truthy' : 'to be falsy'}`
    );
  }

  toThrow(expected?: string | RegExp) {
    if (typeof this.actual !== 'function') {
      throw new Error(`expect(fn).toThrow() requires a function, received ${typeof this.actual}`);
    }
    let threw = false;
    let thrownError: any = null;
    try {
      (this.actual as Function)();
    } catch (err) {
      threw = true;
      thrownError = err;
    }

    if (!threw) {
      this.assert(false, () => `Expected function to throw an error, but it returned normally.`);
      return;
    }

    if (expected) {
      const errMsg = thrownError instanceof Error ? thrownError.message : String(thrownError);
      if (typeof expected === 'string') {
        this.assert(
          errMsg.includes(expected),
          () => `Expected thrown error message to contain "${expected}", but received "${errMsg}"`
        );
      } else if (expected instanceof RegExp) {
        this.assert(
          expected.test(errMsg),
          () => `Expected thrown error message to match ${expected}, but received "${errMsg}"`
        );
      }
    } else {
      this.assert(true, () => ``);
    }
  }
}

export function expect<T = any>(actual: T): Expectation<T> {
  return new Expectation(actual);
}

// ============================================================================
// Authoritative Domain Oracles: XAI Math & Telemetry Physics
// ============================================================================

export interface ApplicantFeatures {
  annualIncome: number;
  ficoScore: number;
  debtToIncomeRatio: number;
  loanAmount: number;
  loanTermMonths: 36 | 60;
  revolvingUtilization: number;
  delinquencies2Years: number;
  employmentYears: number;
  collateralValue: number;
}

export interface ShapValueItem {
  feature: keyof ApplicantFeatures;
  displayName: string;
  value: number;
  shapValue: number;
  direction: 'favorable' | 'unfavorable';
}

export interface LimeElasticityItem {
  feature: keyof ApplicantFeatures;
  displayName: string;
  sensitivity: number;
  direction: 'positive' | 'negative';
}

export const POPULATION_BASE_LOG_ODDS = 0.50; // Base population prior

// Population expectations for median baseline applicant:
// FICO=680, DTI=0.28, Income=$75,000, Loan=$30,000, Revolving=0.25, Delinq=0, Emp=5yr, Collateral=$15,000, Term=36m
export const POPULATION_FEATURE_EXPECTATIONS: Record<keyof ApplicantFeatures, number> = {
  ficoScore: 0.0, // 2.8 * tanh((680-680)/95) = 0
  debtToIncomeRatio: 0.0, // -2.2 * ((28-28)/20) = 0
  annualIncome: 1.5 * Math.log(1 + 75000 / 30000) - 1.6, // ~ 0.283
  loanAmount: 0.0,
  revolvingUtilization: 0.0, // -1.9 * ((25-25)/30) = 0
  delinquencies2Years: 0.0, // -1.6 * (0)^1.25 = 0
  employmentYears: 0.75 * (1 - Math.exp(-0.30 * 5)) - 0.25, // ~ 0.332
  collateralValue: 1.3 * Math.tanh(2.2 * (15000 / 30000)), // ~ 1.042
  loanTermMonths: 0.0, // -0.15 * ((36-36)/12) = 0
};

/**
 * Pure non-linear log-odds credit scoring model: z(x) = beta_0 + sum delta z_i
 */
export function calculateLogOdds(features: ApplicantFeatures): number {
  const safeLoan = Math.max(features.loanAmount, 1000);
  const ratioIL = features.annualIncome / safeLoan;
  const coverage = features.collateralValue / safeLoan;

  // 1. FICO contribution
  const deltaFico = 2.8 * Math.tanh((features.ficoScore - 680) / 95);

  // 2. DTI contribution (penalty accelerates above 43%)
  const dtiPct = features.debtToIncomeRatio > 1.0 ? features.debtToIncomeRatio : features.debtToIncomeRatio * 100;
  const dtiExcess = Math.max(0, (dtiPct - 43) / 12);
  const deltaDti = -2.2 * ((dtiPct - 28) / 20) - 1.4 * Math.pow(dtiExcess, 2);

  // 3. Income-to-Loan Ratio
  const deltaIncome = 1.5 * Math.log(1 + Math.max(0, ratioIL)) - 1.6;

  // 4. Revolving Utilization
  const utilPct = features.revolvingUtilization > 1.0 ? features.revolvingUtilization : features.revolvingUtilization * 100;
  const deltaUtil = -1.9 * ((utilPct - 25) / 30);

  // 5. Delinquencies
  const safeDelinq = Math.max(0, features.delinquencies2Years);
  const deltaDelinq = -1.6 * Math.pow(safeDelinq, 1.25);

  // 6. Employment Stability
  const safeEmp = Math.max(0, features.employmentYears);
  const deltaEmp = 0.75 * (1 - Math.exp(-0.30 * safeEmp)) - 0.25;

  // 7. Collateral Coverage
  const deltaCollateral = 1.3 * Math.tanh(2.2 * Math.max(0, coverage));

  // 8. Loan Term
  const deltaTerm = -0.15 * ((features.loanTermMonths - 36) / 12);

  return POPULATION_BASE_LOG_ODDS + deltaFico + deltaDti + deltaIncome + deltaUtil + deltaDelinq + deltaEmp + deltaCollateral + deltaTerm;
}

/**
 * Standard logistic sigmoid probability function.
 */
export function calculateApprovalProbability(z: number): number {
  return 1 / (1 + Math.exp(-z));
}

/**
 * Basel II / III Risk Tier Classification.
 */
export function classifyRiskTier(prob: number): 'Tier A (Low Risk)' | 'Tier B (Moderate Risk)' | 'Tier C (Subprime)' | 'Tier D (High Risk)' {
  if (prob >= 0.80) return 'Tier A (Low Risk)';
  if (prob >= 0.65) return 'Tier B (Moderate Risk)';
  if (prob >= 0.50) return 'Tier C (Subprime)';
  return 'Tier D (High Risk)';
}

/**
 * Credit decision threshold.
 */
export function evaluateCreditDecision(prob: number): 'APPROVED' | 'REFERRED' | 'DECLINED' {
  if (prob >= 0.70) return 'APPROVED';
  if (prob >= 0.50) return 'REFERRED';
  return 'DECLINED';
}

/**
 * Exact Additive Shapley Value Decomposition satisfying: sum(phi_i) + base = z(x).
 */
export function calculateShapValues(features: ApplicantFeatures): {
  baseValue: number;
  finalScore: number;
  shapValues: ShapValueItem[];
} {
  const safeLoan = Math.max(features.loanAmount, 1000);
  const ratioIL = features.annualIncome / safeLoan;
  const coverage = features.collateralValue / safeLoan;
  const dtiPct = features.debtToIncomeRatio > 1.0 ? features.debtToIncomeRatio : features.debtToIncomeRatio * 100;
  const dtiExcess = Math.max(0, (dtiPct - 43) / 12);
  const utilPct = features.revolvingUtilization > 1.0 ? features.revolvingUtilization : features.revolvingUtilization * 100;
  const safeDelinq = Math.max(0, features.delinquencies2Years);
  const safeEmp = Math.max(0, features.employmentYears);

  // Raw component deltas
  const deltas: Record<keyof ApplicantFeatures, number> = {
    ficoScore: 2.8 * Math.tanh((features.ficoScore - 680) / 95),
    debtToIncomeRatio: -2.2 * ((dtiPct - 28) / 20) - 1.4 * Math.pow(dtiExcess, 2),
    annualIncome: 1.5 * Math.log(1 + Math.max(0, ratioIL)) - 1.6,
    loanAmount: 0.0, // Jointly captured in ratios
    revolvingUtilization: -1.9 * ((utilPct - 25) / 30),
    delinquencies2Years: -1.6 * Math.pow(safeDelinq, 1.25),
    employmentYears: 0.75 * (1 - Math.exp(-0.30 * safeEmp)) - 0.25,
    collateralValue: 1.3 * Math.tanh(2.2 * Math.max(0, coverage)),
    loanTermMonths: -0.15 * ((features.loanTermMonths - 36) / 12),
  };

  const finalScore = POPULATION_BASE_LOG_ODDS + Object.values(deltas).reduce((a, b) => a + b, 0);

  // Exact Shapley values: phi_i = delta_i - expectation_i
  // Baseline = POPULATION_BASE_LOG_ODDS + sum(expectations)
  const baseValue = POPULATION_BASE_LOG_ODDS + Object.values(POPULATION_FEATURE_EXPECTATIONS).reduce((a, b) => a + b, 0);

  const displayNames: Record<keyof ApplicantFeatures, string> = {
    ficoScore: 'FICO Credit Score',
    debtToIncomeRatio: 'Debt-to-Income (DTI)',
    annualIncome: 'Annual Income',
    loanAmount: 'Loan Principal',
    revolvingUtilization: 'Revolving Line Utilization',
    delinquencies2Years: 'Derogatory Delinquencies',
    employmentYears: 'Employment Stability',
    collateralValue: 'Collateral Assets',
    loanTermMonths: 'Repayment Term',
  };

  const shapValues: ShapValueItem[] = (Object.keys(deltas) as (keyof ApplicantFeatures)[]).map(feature => {
    const phi = deltas[feature] - POPULATION_FEATURE_EXPECTATIONS[feature];
    return {
      feature,
      displayName: displayNames[feature],
      value: features[feature],
      shapValue: phi,
      direction: phi >= 0 ? 'favorable' : 'unfavorable',
    };
  });

  return { baseValue, finalScore, shapValues };
}

/**
 * LIME Local Elasticity Sensitivity Gradient.
 */
export function calculateLimeElasticity(features: ApplicantFeatures): LimeElasticityItem[] {
  const eps = 1e-4;
  const baseZ = calculateLogOdds(features);

  const ranges: Record<keyof ApplicantFeatures, number> = {
    ficoScore: 550, // 300 to 850
    debtToIncomeRatio: 0.65,
    annualIncome: 280000,
    loanAmount: 95000,
    revolvingUtilization: 1.0,
    delinquencies2Years: 5,
    employmentYears: 25,
    collateralValue: 200000,
    loanTermMonths: 24,
  };

  const displayNames: Record<keyof ApplicantFeatures, string> = {
    ficoScore: 'FICO Credit Score',
    debtToIncomeRatio: 'Debt-to-Income (DTI)',
    annualIncome: 'Annual Income',
    loanAmount: 'Loan Principal',
    revolvingUtilization: 'Revolving Line Utilization',
    delinquencies2Years: 'Derogatory Delinquencies',
    employmentYears: 'Employment Stability',
    collateralValue: 'Collateral Assets',
    loanTermMonths: 'Repayment Term',
  };

  const results: LimeElasticityItem[] = [];

  for (const key of Object.keys(ranges) as (keyof ApplicantFeatures)[]) {
    const perturbed = { ...features };
    const step = ranges[key] * eps;
    (perturbed as any)[key] = (features as any)[key] + step;
    const perturbedZ = calculateLogOdds(perturbed);
    const gradient = (perturbedZ - baseZ) / step;
    const sensitivity = gradient * ranges[key] * 0.1; // Normalized 10% range shift impact

    results.push({
      feature: key,
      displayName: displayNames[key],
      sensitivity: Math.abs(sensitivity),
      direction: gradient >= 0 ? 'positive' : 'negative',
    });
  }

  // Sort descending by absolute sensitivity
  results.sort((a, b) => b.sensitivity - a.sensitivity);
  return results;
}

/**
 * Counterfactual Recourse Optimization.
 * Holds immutable features (delinquencies, employmentYears) strictly invariant.
 */
export function solveCounterfactualRecourse(
  features: ApplicantFeatures,
  targetProb: number = 0.75
): {
  isAlreadyApproved: boolean;
  projectedApprovalProbability: number;
  recommendations: {
    feature: keyof ApplicantFeatures;
    displayName: string;
    currentValue: number;
    targetValue: number;
    deltaText: string;
  }[];
} {
  const currentZ = calculateLogOdds(features);
  const currentProb = calculateApprovalProbability(currentZ);

  if (currentProb >= targetProb) {
    return {
      isAlreadyApproved: true,
      projectedApprovalProbability: currentProb,
      recommendations: [],
    };
  }

  // Target log-odds: ln(p / (1 - p))
  const targetZ = Math.log(targetProb / (1 - targetProb));
  let requiredDeltaZ = targetZ - currentZ;

  const modified = { ...features };
  const recommendations: {
    feature: keyof ApplicantFeatures;
    displayName: string;
    currentValue: number;
    targetValue: number;
    deltaText: string;
  }[] = [];

  // Action 1: Reduce DTI if > 0.32
  if (modified.debtToIncomeRatio > 0.32 && requiredDeltaZ > 0) {
    const newDti = Math.max(0.28, modified.debtToIncomeRatio - 0.12);
    const oldVal = modified.debtToIncomeRatio;
    modified.debtToIncomeRatio = newDti;
    recommendations.push({
      feature: 'debtToIncomeRatio',
      displayName: 'Debt-to-Income (DTI)',
      currentValue: Math.round(oldVal * 100),
      targetValue: Math.round(newDti * 100),
      deltaText: `Reduce DTI from ${Math.round(oldVal * 100)}% to ${Math.round(newDti * 100)}%`,
    });
    requiredDeltaZ = targetZ - calculateLogOdds(modified);
  }

  // Action 2: Reduce Revolving Utilization if > 0.25
  if (modified.revolvingUtilization > 0.25 && requiredDeltaZ > 0) {
    const newUtil = Math.max(0.15, modified.revolvingUtilization - 0.25);
    const oldVal = modified.revolvingUtilization;
    modified.revolvingUtilization = newUtil;
    recommendations.push({
      feature: 'revolvingUtilization',
      displayName: 'Revolving Line Utilization',
      currentValue: Math.round(oldVal * 100),
      targetValue: Math.round(newUtil * 100),
      deltaText: `Pay down credit cards from ${Math.round(oldVal * 100)}% to ${Math.round(newUtil * 100)}%`,
    });
    requiredDeltaZ = targetZ - calculateLogOdds(modified);
  }

  // Action 3: Reduce Loan Amount if still needed
  if (requiredDeltaZ > 0 && modified.loanAmount > 10000) {
    const reduction = Math.min(modified.loanAmount * 0.25, 15000);
    const newLoan = modified.loanAmount - reduction;
    const oldVal = modified.loanAmount;
    modified.loanAmount = newLoan;
    recommendations.push({
      feature: 'loanAmount',
      displayName: 'Loan Principal',
      currentValue: oldVal,
      targetValue: newLoan,
      deltaText: `Adjust requested loan from $${oldVal.toLocaleString()} to $${newLoan.toLocaleString()}`,
    });
    requiredDeltaZ = targetZ - calculateLogOdds(modified);
  }

  // Action 4: Increase Collateral / Liquid Assets if still needed
  if (requiredDeltaZ > 0) {
    const addedCollateral = Math.min(25000, modified.loanAmount * 0.5);
    const oldVal = modified.collateralValue;
    const newVal = oldVal + addedCollateral;
    modified.collateralValue = newVal;
    recommendations.push({
      feature: 'collateralValue',
      displayName: 'Collateral Assets',
      currentValue: oldVal,
      targetValue: newVal,
      deltaText: `Pledge an additional $${addedCollateral.toLocaleString()} in liquid collateral`,
    });
  }

  const projectedProb = calculateApprovalProbability(calculateLogOdds(modified));

  return {
    isAlreadyApproved: false,
    projectedApprovalProbability: projectedProb,
    recommendations,
  };
}

/**
 * Optical Link Budget & Attenuation Model (<0.15 dB TIA-568.3-D standard).
 */
export function calculateOpticalLinkBudget(options: {
  fiberLengthKm?: number;
  connectorPairs?: number;
  spliceLossDb?: number;
  faultInjected?: 'optical_microbend' | null;
  txPowerDbm?: number;
}) {
  const L = options.fiberLengthKm ?? 0.18; // 180 meters MMR-to-ToR
  const alpha = 0.35; // 0.35 dB/km for OS2 SMF @ 1310nm
  const connectorLoss = (options.connectorPairs ?? 2) * 0.0225; // 0.045 dB total
  const spliceLoss = options.spliceLossDb ?? 0.010;
  const microbend = options.faultInjected === 'optical_microbend' ? 0.280 : 0.0;

  const insertionLossDb = Number((alpha * L + connectorLoss + spliceLoss + microbend).toFixed(3));
  const txPowerDbm = options.txPowerDbm ?? -2.1;
  const rxPowerDbm = Number((txPowerDbm - insertionLossDb).toFixed(3));
  const isCompliant = insertionLossDb < 0.15; // Strict TIA/EIA standard

  return {
    insertionLossDb,
    txPowerDbm,
    rxPowerDbm,
    isCompliant,
    status: isCompliant ? 'nominal' : 'critical',
    berEstimate: isCompliant ? 1e-13 : 8.5e-9,
  };
}

/**
 * ASHRAE TC 9.9 Data Center Environmental & Thermal Physics.
 */
export function simulateEnvironmentalPhysics(options: {
  ambientC?: number;
  coolingCapacityPct?: number;
  itLoadKw?: number;
  faultInjected?: 'thermal_surge' | 'airflow_choke' | null;
}) {
  const baseInlet = options.ambientC ?? 20.4;
  const itLoad = options.itLoadKw ?? 7.4; // kW
  const thermalFault = options.faultInjected === 'thermal_surge';
  const chokeFault = options.faultInjected === 'airflow_choke';

  // Inlet temp
  const coldAisleTempC = thermalFault ? 29.4 : baseInlet;

  // Temperature rise delta T = P_IT / (rho * Cp * V_dot)
  const nominalAirflowCfm = chokeFault ? 450 : 1420;
  const deltaT = Number(((itLoad * 1000) / (1.204 * 1005 * (nominalAirflowCfm * 0.000471947))).toFixed(1));
  const hotAisleTempC = Number((coldAisleTempC + deltaT).toFixed(1));

  // RH%
  const relativeHumidityPercent = thermalFault ? 32.5 : 48.2;

  // Dew point calculation (Magnus formula)
  const a = 17.27;
  const b = 237.7;
  const alphaT = ((a * coldAisleTempC) / (b + coldAisleTempC)) + Math.log(relativeHumidityPercent / 100);
  const dewPointC = Number(((b * alphaT) / (a - alphaT)).toFixed(1));

  // Static pressure Pa
  const differentialPressurePa = chokeFault ? 6.2 : 16.4;

  const isNominal =
    coldAisleTempC >= 18.0 &&
    coldAisleTempC <= 27.0 &&
    relativeHumidityPercent >= 40.0 &&
    relativeHumidityPercent <= 60.0 &&
    differentialPressurePa >= 10.0;

  return {
    coldAisleTempC,
    hotAisleTempC,
    deltaT,
    relativeHumidityPercent,
    dewPointC,
    airflowCfm: nominalAirflowCfm,
    differentialPressurePa,
    status: isNominal ? 'nominal' : (thermalFault ? 'critical' : 'warning'),
  };
}

/**
 * Dynamic PUE calculation.
 */
export function calculatePue(itLoadKw: number, coolingKw: number, lossKw: number): number {
  const safeIt = Math.max(0.5, itLoadKw); // Clamped minimum to avoid Infinity
  const total = safeIt + coolingKw + lossKw;
  return Number((total / safeIt).toFixed(2));
}

// ============================================================================
// Test Suite Execution Engine
// ============================================================================

export async function runTests(filterTier?: string): Promise<{
  success: boolean;
  totalSuites: number;
  totalTests: number;
  passedCount: number;
  failedCount: number;
  durationMs: number;
  suiteResults: SuiteResult[];
}> {
  const startTime = Date.now();
  const suiteResults: SuiteResult[] = [];

  const tierArg = filterTier || process.argv.find(arg => arg.startsWith('--tier=') || arg === '--unit');
  let targetTier: string | null = null;
  if (tierArg === '--unit') targetTier = 'unit';
  else if (tierArg?.includes('tier=')) targetTier = `tier${tierArg.split('=')[1]}`;
  else if (filterTier) targetTier = filterTier;

  // Filter registered suites
  const suitesToRun = targetTier
    ? suiteRegistry.filter(s => s.tier === targetTier)
    : suiteRegistry;

  console.log('\x1b[1m\x1b[36m%s\x1b[0m', '================================================================================');
  console.log('\x1b[1m\x1b[36m%s\x1b[0m', ' PORT OF FALCON — TEST SUITE VERIFICATION REPORT');
  console.log('\x1b[90m%s\x1b[0m', ` Target Filter: ${targetTier ? targetTier.toUpperCase() : 'ALL TIERS (Unit + Tiers 1-4)'}`);
  console.log('\x1b[1m\x1b[36m%s\x1b[0m', '================================================================================');

  let totalTests = 0;
  let passedCount = 0;
  let failedCount = 0;

  for (const suite of suitesToRun) {
    currentSuite = {
      name: suite.name,
      tier: suite.tier,
      tests: [],
    };

    const suiteStartTime = Date.now();
    try {
      await suite.fn();
    } catch (err) {
      console.error(`\x1b[31m[ERROR] Suite '${suite.name}' failed during registration:\x1b[0m`, err);
    }

    const testResults: TestResult[] = [];

    for (const t of currentSuite.tests) {
      totalTests++;
      const testStart = Date.now();
      try {
        await t.fn();
        const duration = Date.now() - testStart;
        testResults.push({ name: t.name, passed: true, durationMs: duration });
        passedCount++;
      } catch (err) {
        const duration = Date.now() - testStart;
        testResults.push({ name: t.name, passed: false, durationMs: duration, error: err });
        failedCount++;
      }
    }

    const suiteDuration = Date.now() - suiteStartTime;
    const suitePassed = testResults.every(r => r.passed);

    suiteResults.push({
      name: suite.name,
      tier: suite.tier,
      durationMs: suiteDuration,
      tests: testResults,
    });

    // Console output for this suite
    const statusPill = suitePassed
      ? '\x1b[42m\x1b[30m PASS \x1b[0m'
      : '\x1b[41m\x1b[37m FAIL \x1b[0m';
    console.log(`\n${statusPill} \x1b[1m${suite.name}\x1b[0m \x1b[90m(${suiteResults[suiteResults.length - 1].tests.length} tests, ${suiteDuration}ms)\x1b[0m`);

    for (const res of testResults) {
      if (res.passed) {
        console.log(`  \x1b[32m✓\x1b[0m \x1b[90m${res.name} (${res.durationMs}ms)\x1b[0m`);
      } else {
        console.log(`  \x1b[31m✗\x1b[0m \x1b[1m\x1b[31m${res.name}\x1b[0m`);
        if (res.error instanceof Error) {
          console.log(`    \x1b[31mError: ${res.error.message}\x1b[0m`);
          if (res.error.stack) {
            const stackFirstLine = res.error.stack.split('\n').slice(1, 3).join('\n');
            console.log(`    \x1b[90m${stackFirstLine}\x1b[0m`);
          }
        } else {
          console.log(`    \x1b[31mError: ${String(res.error)}\x1b[0m`);
        }
      }
    }
  }

  const totalDuration = Date.now() - startTime;

  // Breakdown Summary Table
  console.log('\n\x1b[1m\x1b[36m%s\x1b[0m', '--------------------------------------------------------------------------------');
  console.log('\x1b[1m Execution Summary Table by Tier:\x1b[0m');
  console.log(' \x1b[90mCategory    | Total Tests | Passed | Failed | Duration\x1b[0m');
  console.log(' \x1b[90m------------+-------------+--------+--------+---------\x1b[0m');

  const tiers: ('unit' | 'tier1' | 'tier2' | 'tier3' | 'tier4')[] = ['unit', 'tier1', 'tier2', 'tier3', 'tier4'];
  const tierLabels = {
    unit: 'Unit Tests  ',
    tier1: 'Tier 1 (Feat)',
    tier2: 'Tier 2 (Bnd) ',
    tier3: 'Tier 3 (Comb)',
    tier4: 'Tier 4 (Real)',
  };

  for (const t of tiers) {
    const suitesForTier = suiteResults.filter(s => s.tier === t);
    const tierTests = suitesForTier.flatMap(s => s.tests);
    const tPassed = tierTests.filter(x => x.passed).length;
    const tFailed = tierTests.filter(x => !x.passed).length;
    const tDuration = suitesForTier.reduce((sum, s) => sum + s.durationMs, 0);

    if (tierTests.length > 0) {
      console.log(` ${tierLabels[t]} |    ${String(tierTests.length).padStart(4, ' ')}     |  ${String(tPassed).padStart(4, ' ')}  |  ${String(tFailed).padStart(4, ' ')}  |  ${String(tDuration).padStart(4, ' ')}ms`);
    }
  }

  console.log(' \x1b[90m------------+-------------+--------+--------+---------\x1b[0m');
  console.log(` \x1b[1mALL SUITES  \x1b[0m |    ${String(totalTests).padStart(4, ' ')}     |  ${String(passedCount).padStart(4, ' ')}  |  ${String(failedCount).padStart(4, ' ')}  |  ${String(totalDuration).padStart(4, ' ')}ms`);
  console.log('\x1b[1m\x1b[36m%s\x1b[0m', '================================================================================');

  if (failedCount === 0) {
    console.log(`\x1b[1m\x1b[32m✔ ALL ${totalTests} TESTS PASSED SUCCESSFULLY IN ${totalDuration}ms.\x1b[0m\n`);
  } else {
    console.log(`\x1b[1m\x1b[31m✖ TEST SUITE FAILED: ${failedCount} of ${totalTests} assertions failed.\x1b[0m\n`);
  }

  return {
    success: failedCount === 0,
    totalSuites: suitesToRun.length,
    totalTests,
    passedCount,
    failedCount,
    durationMs: totalDuration,
    suiteResults,
  };
}

// Auto-execution entrypoint when run as main module
const isMain = process.argv[1]?.endsWith('test-runner.ts') || process.argv[1]?.endsWith('test-runner.js');
if (isMain) {
  (async () => {
    try {
      // Import test suites
      await import('./unit/xai-math.test.ts');
      await import('./unit/telemetry-physics.test.ts');
      await import('./e2e/tier1-feature-coverage.test.ts');
      await import('./e2e/tier2-boundary-corner.test.ts');
      await import('./e2e/tier3-cross-feature.test.ts');
      await import('./e2e/tier4-real-world.test.ts');

      const result = await runTests();
      process.exit(result.success ? 0 : 1);
    } catch (err) {
      console.error('\x1b[31m[CRITICAL] Test runner initialization failed:\x1b[0m', err);
      process.exit(1);
    }
  })();
}
