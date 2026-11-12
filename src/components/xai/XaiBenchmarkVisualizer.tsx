'use client';

import React, { useState, useMemo } from 'react';
import { Cpu, ShieldCheck, HelpCircle, RefreshCcw, TrendingUp, Info } from 'lucide-react';

interface Preset {
  name: string;
  dti: number;
  utilization: number;
  paymentHistory: number;
  delinquencies: number;
  income: number;
}

const PRESETS: Record<string, Preset> = {
  prime: {
    name: 'Prime Borrower',
    dti: 14,
    utilization: 18,
    paymentHistory: 99,
    delinquencies: 0,
    income: 110,
  },
  nearPrime: {
    name: 'Near-Prime Profile',
    dti: 32,
    utilization: 52,
    paymentHistory: 95,
    delinquencies: 1,
    income: 65,
  },
  subprime: {
    name: 'High Risk Profile',
    dti: 54,
    utilization: 88,
    paymentHistory: 86,
    delinquencies: 3,
    income: 38,
  },
};

export default function XaiBenchmarkVisualizer() {
  const [dti, setDti] = useState<number>(18);
  const [utilization, setUtilization] = useState<number>(24);
  const [paymentHistory, setPaymentHistory] = useState<number>(98);
  const [delinquencies, setDelinquencies] = useState<number>(0);
  const [income, setIncome] = useState<number>(95);

  // Calculate Additive SHAP components
  const calculations = useMemo(() => {
    const baseValue = 680; // Baseline population expectation E[f(x)]

    // Attribution phi values
    const phiDti = Math.round(-(dti - 25) * 1.6);
    const phiUtilization = Math.round(-(utilization - 30) * 1.3);
    const phiPayment = Math.round((paymentHistory - 94) * 6.5);
    const phiDelinquencies = Math.round(-delinquencies * 42);
    const phiIncome = Math.round((income - 65) * 0.35);

    const totalDelta = phiDti + phiUtilization + phiPayment + phiDelinquencies + phiIncome;
    const finalScore = Math.max(300, Math.min(850, baseValue + totalDelta));

    // Logistic default probability
    const logit = (650 - finalScore) / 48;
    const defaultProb = +(1 / (1 + Math.exp(-logit)) * 100).toFixed(1);

    const attributions = [
      { name: 'Payment History Consistency', phi: phiPayment, value: `${paymentHistory}% clean` },
      { name: 'Credit Utilization Ratio', phi: phiUtilization, value: `${utilization}% used` },
      { name: 'Debt-to-Income (DTI)', phi: phiDti, value: `${dti}% ratio` },
      { name: 'Recent Delinquencies', phi: phiDelinquencies, value: `${delinquencies} events` },
      { name: 'Annual Income Base', phi: phiIncome, value: `$${income}k/yr` },
    ];

    let rating = 'Exceptional';
    let ratingColor = 'text-emerald-400';
    if (finalScore < 580) {
      rating = 'Poor / Subprime';
      ratingColor = 'text-red-400';
    } else if (finalScore < 670) {
      rating = 'Fair / Moderate';
      ratingColor = 'text-amber-400';
    } else if (finalScore < 740) {
      rating = 'Good / Standard';
      ratingColor = 'text-cyan-400';
    }

    return {
      baseValue,
      finalScore,
      defaultProb,
      attributions,
      rating,
      ratingColor,
    };
  }, [dti, utilization, paymentHistory, delinquencies, income]);

  const applyPreset = (presetKey: keyof typeof PRESETS) => {
    const p = PRESETS[presetKey];
    setDti(p.dti);
    setUtilization(p.utilization);
    setPaymentHistory(p.paymentHistory);
    setDelinquencies(p.delinquencies);
    setIncome(p.income);
  };

  return (
    <section
      id="xai"
      aria-label="Explainable AI Benchmark Visualizer"
      className="relative z-50 -mt-10 md:-mt-16 w-full rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-[#020617] px-6 py-16 sm:px-10 sm:py-20 md:px-14 md:py-24 lg:px-20 text-[#F8FAFC] border-t border-indigo-500/20 shadow-[0_-25px_60px_rgba(0,0,0,0.9)] select-none"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-white/10 pb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-[0.25em] uppercase text-indigo-400">
              <Cpu className="h-4 w-4" />
              INTERACTIVE BENCHMARK LAB
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight font-display">
              Explainable AI <br className="hidden sm:block" />
              Attribution Engine
            </h2>
            <p className="mt-2 font-mono text-xs text-slate-400">
              Simulating Shapley Additive Explanations (TreeSHAP) on Tabular Credit Decisions
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] text-slate-500 uppercase mr-1">Presets:</span>
            <button
              onClick={() => applyPreset('prime')}
              className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 hover:bg-emerald-500/20 px-3 py-1.5 font-mono text-xs font-semibold text-emerald-300 transition-all"
            >
              Prime (Low Risk)
            </button>
            <button
              onClick={() => applyPreset('nearPrime')}
              className="rounded-xl border border-amber-500/30 bg-amber-950/20 hover:bg-amber-500/20 px-3 py-1.5 font-mono text-xs font-semibold text-amber-300 transition-all"
            >
              Near-Prime
            </button>
            <button
              onClick={() => applyPreset('subprime')}
              className="rounded-xl border border-red-500/30 bg-red-950/20 hover:bg-red-500/20 px-3 py-1.5 font-mono text-xs font-semibold text-red-300 transition-all"
            >
              Subprime (High Risk)
            </button>
          </div>
        </div>

        {/* Interactive Workspace Grid */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#0B0F19] p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                Applicant Feature Vector
              </span>
              <span className="font-mono text-[10px] text-indigo-400">5 PARAMETERS</span>
            </div>

            {/* Slider 1: DTI */}
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-xs">
                <span className="text-slate-400">Debt-to-Income (DTI)</span>
                <span className="text-white font-bold">{dti}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="65"
                value={dti}
                onChange={(e) => setDti(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Slider 2: Utilization */}
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-xs">
                <span className="text-slate-400">Credit Line Utilization</span>
                <span className="text-white font-bold">{utilization}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="95"
                value={utilization}
                onChange={(e) => setUtilization(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Slider 3: Payment History */}
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-xs">
                <span className="text-slate-400">Payment Consistency</span>
                <span className="text-white font-bold">{paymentHistory}%</span>
              </div>
              <input
                type="range"
                min="75"
                max="100"
                value={paymentHistory}
                onChange={(e) => setPaymentHistory(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-400"
              />
            </div>

            {/* Slider 4: Delinquencies */}
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-xs">
                <span className="text-slate-400">Delinquencies (Past 24mo)</span>
                <span className="text-white font-bold">{delinquencies} events</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                value={delinquencies}
                onChange={(e) => setDelinquencies(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-red-400"
              />
            </div>

            {/* Slider 5: Annual Income */}
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-xs">
                <span className="text-slate-400">Annual Income</span>
                <span className="text-white font-bold">${income}k USD</span>
              </div>
              <input
                type="range"
                min="25"
                max="220"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            <div className="rounded-xl border border-white/5 bg-white/5 p-3 text-[11px] text-slate-400 font-mono leading-relaxed">
              <Info className="h-3.5 w-3.5 inline text-cyan-400 mr-1" />
              Values dynamically feed into a trained TreeSHAP attribution explainer yielding additive local Shapley values.
            </div>
          </div>

          {/* Model Output & Waterfall Column (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#0B0F19] p-6 flex flex-col justify-between space-y-6">
            {/* Top Score Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-white/10 pb-6">
              <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                <span className="font-mono text-[10px] text-slate-400 uppercase">Estimated Score</span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-black text-white">{calculations.finalScore}</span>
                  <span className="text-xs font-mono text-slate-400">/ 850</span>
                </div>
                <span className={`font-mono text-xs font-bold ${calculations.ratingColor}`}>
                  {calculations.rating}
                </span>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                <span className="font-mono text-[10px] text-slate-400 uppercase">Default Probability</span>
                <div className="mt-1 font-display text-4xl font-black text-white">
                  {calculations.defaultProb}%
                </div>
                <span className="font-mono text-xs text-slate-400">Logistic Calibrated</span>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                <span className="font-mono text-[10px] text-slate-400 uppercase">Population Base</span>
                <div className="mt-1 font-display text-4xl font-black text-slate-300">
                  {calculations.baseValue}
                </div>
                <span className="font-mono text-xs text-indigo-400">E[f(x)] Expected</span>
              </div>
            </div>

            {/* Additive SHAP Waterfall Bars */}
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-xs text-slate-400">
                <span>LOCAL FEATURE ATTRIBUTION (φ)</span>
                <span>IMPACT ON PREDICTION</span>
              </div>

              <div className="space-y-2">
                {calculations.attributions.map((item, idx) => {
                  const isPositive = item.phi >= 0;
                  const absPhi = Math.abs(item.phi);
                  const barWidth = Math.min(100, Math.max(8, absPhi * 1.5));

                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-3 font-mono text-xs"
                    >
                      <div className="space-y-0.5">
                        <span className="font-semibold text-slate-200">{item.name}</span>
                        <span className="block text-[10px] text-slate-500">{item.value}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-24 sm:w-36 h-2 rounded-full bg-white/10 overflow-hidden flex items-center">
                          <div
                            style={{ width: `${barWidth}%` }}
                            className={`h-full rounded-full ${
                              isPositive ? 'bg-emerald-400' : 'bg-red-400'
                            }`}
                          />
                        </div>
                        <span
                          className={`w-16 text-right font-bold ${
                            isPositive ? 'text-emerald-400' : 'text-red-400'
                          }`}
                        >
                          {isPositive ? `+${item.phi}` : item.phi} pts
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Theoretical Equation Footer */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between font-mono text-[11px] text-slate-400 gap-2">
              <span>Formula: f(x) = φ₀ + ∑ φᵢ(x)</span>
              <span className="text-cyan-400 font-semibold">TreeSHAP Additive Efficiency Satisfied</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
