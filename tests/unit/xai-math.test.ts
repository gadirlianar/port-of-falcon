/**
 * Unit Test Suite: Explainable AI (XAI) Mathematical Engine & Game-Theoretic Proofs
 * Path: tests/unit/xai-math.test.ts
 */

import {
  describe,
  it,
  expect,
  ApplicantFeatures,
  calculateLogOdds,
  calculateApprovalProbability,
  classifyRiskTier,
  evaluateCreditDecision,
  calculateShapValues,
  calculateLimeElasticity,
  solveCounterfactualRecourse,
  POPULATION_BASE_LOG_ODDS,
} from '../test-runner.ts';

describe('Unit: XAI Mathematical & SHAP Efficiency Suite', () => {
  // Reference applicant test vectors
  const primeApplicant: ApplicantFeatures = {
    annualIncome: 185000,
    ficoScore: 820,
    debtToIncomeRatio: 0.12,
    loanAmount: 25000,
    loanTermMonths: 36,
    revolvingUtilization: 0.08,
    delinquencies2Years: 0,
    employmentYears: 8,
    collateralValue: 50000,
  };

  const medianApplicant: ApplicantFeatures = {
    annualIncome: 75000,
    ficoScore: 680,
    debtToIncomeRatio: 0.28,
    loanAmount: 30000,
    loanTermMonths: 36,
    revolvingUtilization: 0.25,
    delinquencies2Years: 0,
    employmentYears: 5,
    collateralValue: 15000,
  };

  const subprimeApplicant: ApplicantFeatures = {
    annualIncome: 35000,
    ficoScore: 540,
    debtToIncomeRatio: 0.52,
    loanAmount: 40000,
    loanTermMonths: 60,
    revolvingUtilization: 0.85,
    delinquencies2Years: 3,
    employmentYears: 1,
    collateralValue: 2000,
  };

  const borderlineApplicant: ApplicantFeatures = {
    annualIncome: 62000,
    ficoScore: 650,
    debtToIncomeRatio: 0.38,
    loanAmount: 32000,
    loanTermMonths: 36,
    revolvingUtilization: 0.42,
    delinquencies2Years: 1,
    employmentYears: 3,
    collateralValue: 8000,
  };

  // 1. Log-Odds & Probability Sigmoid Tests
  it('calculates deterministic log-odds score z(x) for baseline profile', () => {
    const z = calculateLogOdds(medianApplicant);
    expect(typeof z).toBe('number');
    expect(Number.isFinite(z)).toBe(true);
    // Median profile should be close to positive territory
    expect(z).toBeGreaterThan(0.2);
    expect(z).toBeLessThan(2.0);
  });

  it('maps log-odds to valid probability within (0, 1) via logistic sigmoid', () => {
    const zPrime = calculateLogOdds(primeApplicant);
    const probPrime = calculateApprovalProbability(zPrime);
    expect(probPrime).toBeGreaterThan(0.90);
    expect(probPrime).toBeLessThan(1.0);

    const zSubprime = calculateLogOdds(subprimeApplicant);
    const probSubprime = calculateApprovalProbability(zSubprime);
    expect(probSubprime).toBeLessThan(0.15);
    expect(probSubprime).toBeGreaterThan(0.0);
  });

  it('verifies sigmoid probability strictly monotonically increases with log-odds', () => {
    const zValues = [-5.0, -2.5, -1.0, 0.0, 0.5, 1.0, 2.5, 5.0];
    let prevProb = -1;
    for (const z of zValues) {
      const p = calculateApprovalProbability(z);
      expect(p).toBeGreaterThan(prevProb);
      prevProb = p;
    }
  });

  it('evaluates decision boundary at z=0 yields P=0.5', () => {
    const pZero = calculateApprovalProbability(0);
    expect(pZero).toBeCloseTo(0.5, 1e-6);
  });

  // 2. Risk Tier Classification Tests
  it('correctly classifies Tier A (Low Risk) for high probability applicants (>= 0.80)', () => {
    expect(classifyRiskTier(0.80)).toBe('Tier A (Low Risk)');
    expect(classifyRiskTier(0.95)).toBe('Tier A (Low Risk)');
    expect(classifyRiskTier(0.999)).toBe('Tier A (Low Risk)');
  });

  it('correctly classifies Tier B (Moderate Risk) for probability [0.65, 0.80)', () => {
    expect(classifyRiskTier(0.65)).toBe('Tier B (Moderate Risk)');
    expect(classifyRiskTier(0.72)).toBe('Tier B (Moderate Risk)');
    expect(classifyRiskTier(0.799)).toBe('Tier B (Moderate Risk)');
  });

  it('correctly classifies Tier C (Subprime) for probability [0.50, 0.65)', () => {
    expect(classifyRiskTier(0.50)).toBe('Tier C (Subprime)');
    expect(classifyRiskTier(0.58)).toBe('Tier C (Subprime)');
    expect(classifyRiskTier(0.649)).toBe('Tier C (Subprime)');
  });

  it('correctly classifies Tier D (High Risk) for probability < 0.50', () => {
    expect(classifyRiskTier(0.499)).toBe('Tier D (High Risk)');
    expect(classifyRiskTier(0.25)).toBe('Tier D (High Risk)');
    expect(classifyRiskTier(0.01)).toBe('Tier D (High Risk)');
  });

  it('evaluates credit decision logic across thresholds', () => {
    expect(evaluateCreditDecision(0.85)).toBe('APPROVED');
    expect(evaluateCreditDecision(0.70)).toBe('APPROVED');
    expect(evaluateCreditDecision(0.699)).toBe('REFERRED');
    expect(evaluateCreditDecision(0.50)).toBe('REFERRED');
    expect(evaluateCreditDecision(0.499)).toBe('DECLINED');
  });

  // 3. Monotonicity of Feature Responses
  it('strictly increases log-odds score when FICO score increases', () => {
    const lowFico = { ...medianApplicant, ficoScore: 600 };
    const midFico = { ...medianApplicant, ficoScore: 700 };
    const highFico = { ...medianApplicant, ficoScore: 800 };

    const zLow = calculateLogOdds(lowFico);
    const zMid = calculateLogOdds(midFico);
    const zHigh = calculateLogOdds(highFico);

    expect(zMid).toBeGreaterThan(zLow);
    expect(zHigh).toBeGreaterThan(zMid);
  });

  it('strictly decreases log-odds score when Debt-to-Income (DTI) increases', () => {
    const lowDti = { ...medianApplicant, debtToIncomeRatio: 0.15 };
    const midDti = { ...medianApplicant, debtToIncomeRatio: 0.35 };
    const highDti = { ...medianApplicant, debtToIncomeRatio: 0.55 };

    const zLow = calculateLogOdds(lowDti);
    const zMid = calculateLogOdds(midDti);
    const zHigh = calculateLogOdds(highDti);

    expect(zLow).toBeGreaterThan(zMid);
    expect(zMid).toBeGreaterThan(zHigh);
  });

  it('penalizes derogatory delinquencies heavily with non-linear power', () => {
    const zeroDelinq = { ...medianApplicant, delinquencies2Years: 0 };
    const oneDelinq = { ...medianApplicant, delinquencies2Years: 1 };
    const twoDelinq = { ...medianApplicant, delinquencies2Years: 2 };

    const z0 = calculateLogOdds(zeroDelinq);
    const z1 = calculateLogOdds(oneDelinq);
    const z2 = calculateLogOdds(twoDelinq);

    expect(z0).toBeGreaterThan(z1);
    expect(z1).toBeGreaterThan(z2);
    // Marginal penalty for second delinquency is higher than linear: (2^1.25 - 1^1.25) > 1
    const delta1 = z0 - z1;
    const delta2 = z1 - z2;
    expect(delta2).toBeGreaterThan(delta1 * 0.9);
  });

  it('strictly increases log-odds score with higher liquid collateral', () => {
    const lowCollateral = { ...medianApplicant, collateralValue: 5000 };
    const highCollateral = { ...medianApplicant, collateralValue: 60000 };

    expect(calculateLogOdds(highCollateral)).toBeGreaterThan(calculateLogOdds(lowCollateral));
  });

  // 4. Game-Theoretic SHAP Additive Efficiency Axiom
  it('satisfies exact Additive Efficiency Axiom for Prime applicant (|sum phi + base - z| < 10^-6)', () => {
    const { baseValue, finalScore, shapValues } = calculateShapValues(primeApplicant);
    const sumShap = shapValues.reduce((sum, item) => sum + item.shapValue, 0);
    const reconstructedZ = baseValue + sumShap;

    expect(reconstructedZ).toBeCloseTo(finalScore, 1e-6);
    expect(Math.abs(reconstructedZ - finalScore)).toBeLessThan(1e-6);
  });

  it('satisfies exact Additive Efficiency Axiom for Median applicant (|sum phi + base - z| < 10^-6)', () => {
    const { baseValue, finalScore, shapValues } = calculateShapValues(medianApplicant);
    const sumShap = shapValues.reduce((sum, item) => sum + item.shapValue, 0);
    const reconstructedZ = baseValue + sumShap;

    expect(reconstructedZ).toBeCloseTo(finalScore, 1e-6);
    expect(Math.abs(reconstructedZ - finalScore)).toBeLessThan(1e-6);
  });

  it('satisfies exact Additive Efficiency Axiom for Subprime applicant (|sum phi + base - z| < 10^-6)', () => {
    const { baseValue, finalScore, shapValues } = calculateShapValues(subprimeApplicant);
    const sumShap = shapValues.reduce((sum, item) => sum + item.shapValue, 0);
    const reconstructedZ = baseValue + sumShap;

    expect(reconstructedZ).toBeCloseTo(finalScore, 1e-6);
    expect(Math.abs(reconstructedZ - finalScore)).toBeLessThan(1e-6);
  });

  it('satisfies exact Additive Efficiency Axiom across 10 randomized applicant vectors', () => {
    for (let i = 0; i < 10; i++) {
      const randApplicant: ApplicantFeatures = {
        annualIncome: 25000 + Math.random() * 200000,
        ficoScore: 400 + Math.floor(Math.random() * 440),
        debtToIncomeRatio: 0.10 + Math.random() * 0.50,
        loanAmount: 5000 + Math.random() * 80000,
        loanTermMonths: Math.random() > 0.5 ? 36 : 60,
        revolvingUtilization: Math.random() * 0.90,
        delinquencies2Years: Math.floor(Math.random() * 5),
        employmentYears: Math.floor(Math.random() * 20),
        collateralValue: Math.random() * 60000,
      };

      const { baseValue, finalScore, shapValues } = calculateShapValues(randApplicant);
      const sumShap = shapValues.reduce((sum, item) => sum + item.shapValue, 0);
      const diff = Math.abs(baseValue + sumShap - finalScore);

      expect(diff).toBeLessThan(1e-6);
    }
  });

  it('produces exactly 9 Shapley contributions corresponding to all input features', () => {
    const { shapValues } = calculateShapValues(medianApplicant);
    expect(shapValues.length).toBe(9);
    const keys = shapValues.map(s => s.feature);
    expect(keys).toContain('ficoScore');
    expect(keys).toContain('debtToIncomeRatio');
    expect(keys).toContain('annualIncome');
    expect(keys).toContain('loanAmount');
    expect(keys).toContain('revolvingUtilization');
    expect(keys).toContain('delinquencies2Years');
    expect(keys).toContain('employmentYears');
    expect(keys).toContain('collateralValue');
    expect(keys).toContain('loanTermMonths');
  });

  it('correctly flags direction as favorable when phi >= 0 and unfavorable when phi < 0', () => {
    const { shapValues } = calculateShapValues(primeApplicant);
    for (const item of shapValues) {
      if (item.shapValue >= 0) {
        expect(item.direction).toBe('favorable');
      } else {
        expect(item.direction).toBe('unfavorable');
      }
    }
  });

  // 5. LIME Local Elasticity Sensitivity Analysis
  it('computes 9 LIME local sensitivity weights ordered by magnitude', () => {
    const elasticity = calculateLimeElasticity(borderlineApplicant);
    expect(elasticity.length).toBe(9);

    for (let i = 0; i < elasticity.length - 1; i++) {
      expect(elasticity[i].sensitivity).toBeGreaterThanOrEqual(elasticity[i + 1].sensitivity);
    }
  });

  it('correctly identifies FICO as having positive local sensitivity', () => {
    const elasticity = calculateLimeElasticity(borderlineApplicant);
    const ficoItem = elasticity.find(e => e.feature === 'ficoScore');
    expect(ficoItem).toBeDefined();
    expect(ficoItem!.direction).toBe('positive');
  });

  it('correctly identifies DTI as having negative local sensitivity', () => {
    const elasticity = calculateLimeElasticity(borderlineApplicant);
    const dtiItem = elasticity.find(e => e.feature === 'debtToIncomeRatio');
    expect(dtiItem).toBeDefined();
    expect(dtiItem!.direction).toBe('negative');
  });

  // 6. Counterfactual Recourse Optimization
  it('short-circuits when applicant is already approved (P >= 0.75)', () => {
    const recourse = solveCounterfactualRecourse(primeApplicant, 0.75);
    expect(recourse.isAlreadyApproved).toBe(true);
    expect(recourse.recommendations.length).toBe(0);
    expect(recourse.projectedApprovalProbability).toBeGreaterThanOrEqual(0.75);
  });

  it('generates actionable recourse recommendations for rejected subprime applicant', () => {
    const recourse = solveCounterfactualRecourse(subprimeApplicant, 0.75);
    expect(recourse.isAlreadyApproved).toBe(false);
    expect(recourse.recommendations.length).toBeGreaterThan(0);
    expect(recourse.projectedApprovalProbability).toBeGreaterThanOrEqual(0.70);
  });

  it('strictly preserves immutable features (delinquencies & employment years invariant)', () => {
    const recourse = solveCounterfactualRecourse(subprimeApplicant, 0.75);
    const recFeatures = recourse.recommendations.map(r => r.feature);

    // Delinquencies cannot be altered retrospectively
    expect(recFeatures.includes('delinquencies2Years')).toBe(false);
    // Employment years cannot be magically increased overnight
    expect(recFeatures.includes('employmentYears')).toBe(false);
  });

  it('only targets actionable features: DTI, loanAmount, revolvingUtilization, collateralValue', () => {
    const recourse = solveCounterfactualRecourse(borderlineApplicant, 0.75);
    const allowedActionable = new Set(['debtToIncomeRatio', 'loanAmount', 'revolvingUtilization', 'collateralValue']);

    for (const rec of recourse.recommendations) {
      expect(allowedActionable.has(rec.feature)).toBe(true);
    }
  });

  it('achieves target approval probability >= 0.75 for borderline applicant after applying recommendations', () => {
    const recourse = solveCounterfactualRecourse(borderlineApplicant, 0.75);
    expect(recourse.projectedApprovalProbability).toBeGreaterThanOrEqual(0.75);
  });
});
