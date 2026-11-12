/**
 * Port of Falcon — Explainable AI (XAI) Mathematical Engine
 * Grounded in Shapley Additive exPlanations (NeurIPS 2017) and Local Interpretable Model-agnostic Explanations
 * Path: src/lib/xai-engine.ts
 */

import type {
  ApplicantFeatures,
  ShapValueItem,
  LimeElasticityItem,
  XAIEvaluationResult,
  CounterfactualRecourseItem,
} from '../types/xai.ts';

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
  recommendations: CounterfactualRecourseItem[];
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
  const recommendations: CounterfactualRecourseItem[] = [];

  // Action 1: Reduce DTI if > 0.20
  if (modified.debtToIncomeRatio > 0.20 && requiredDeltaZ > 0) {
    const newDti = Math.max(0.18, modified.debtToIncomeRatio - 0.20);
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

  // Action 2: Reduce Revolving Utilization if > 0.15
  if (modified.revolvingUtilization > 0.15 && requiredDeltaZ > 0) {
    const newUtil = Math.max(0.10, modified.revolvingUtilization - 0.35);
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
  if (requiredDeltaZ > 0 && modified.loanAmount > 5000) {
    const reduction = Math.min(modified.loanAmount * 0.40, 20000);
    const newLoan = Math.max(5000, modified.loanAmount - reduction);
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
    const addedCollateral = Math.min(60000, Math.max(15000, modified.loanAmount));
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
 * Comprehensive applicant evaluation pipeline returning full XAIEvaluationResult.
 */
export function evaluateApplicant(features: ApplicantFeatures): XAIEvaluationResult {
  const z = calculateLogOdds(features);
  const approvalProbability = calculateApprovalProbability(z);
  const riskScore = Math.round(approvalProbability * 1000);
  const riskTier = classifyRiskTier(approvalProbability);
  const decision = evaluateCreditDecision(approvalProbability);
  const { baseValue, shapValues } = calculateShapValues(features);
  const counterfactual = solveCounterfactualRecourse(features);

  return {
    approvalProbability,
    riskScore,
    riskTier,
    decision,
    baseValue,
    shapValues,
    counterfactualRecourse: {
      recommendations: counterfactual.recommendations,
      projectedApprovalProbability: counterfactual.projectedApprovalProbability,
    },
  };
}
