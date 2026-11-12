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
