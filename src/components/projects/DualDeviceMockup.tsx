'use client';

import React from 'react';
import { ExternalLink, ShieldCheck, Zap, TrendingUp, Cpu, Server, Check, ArrowRight } from 'lucide-react';

export interface DualDeviceMockupProps {
  projectId: 'credit-xai' | 'solaris' | 'store-ma' | 'lulukay';
  title: string;
}

export default function DualDeviceMockup({ projectId, title }: DualDeviceMockupProps) {
  return (
    <div className="relative flex w-full flex-col lg:flex-row items-center justify-center gap-6 p-4 sm:p-6">
      {/* Desktop Frame (65-70% width on large screens) */}
      <div className="relative w-full lg:w-[68%] rounded-2xl border border-white/15 bg-[#0B0F19] shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Browser Top Chrome */}
        <div className="flex h-9 items-center justify-between border-b border-white/10 bg-[#070A10] px-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="flex items-center gap-2 rounded-md bg-white/5 px-3 py-1 font-mono text-[10px] text-slate-400">
            <ShieldCheck className="h-3 w-3 text-cyan-400" />
            <span>https://{projectId}.falcon.internal</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500 text-xs font-mono">
            <span>200 OK</span>
          </div>
        </div>

        {/* Browser Content Area based on Project */}
        <div className="p-4 sm:p-6 min-h-[260px] sm:min-h-[300px] flex flex-col justify-between bg-gradient-to-b from-[#0B0F19] to-[#020617]">
          {projectId === 'credit-xai' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div>
                  <span className="font-mono text-[10px] uppercase text-cyan-400 tracking-wider font-semibold">
                    Explainable AI Research Engine
                  </span>
                  <h4 className="text-base font-bold text-white">TreeSHAP Credit Score Attribution</h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 font-mono text-[11px] font-bold text-emerald-400 border border-emerald-500/30">
                    AUROC 0.892
                  </span>
                  <span className="rounded-full bg-cyan-500/20 px-2.5 py-0.5 font-mono text-[11px] font-bold text-cyan-400 border border-cyan-500/30">
                    FIDELITY 0.984
                  </span>
                </div>
              </div>

              {/* Simulated SHAP Waterfall Bars */}
              <div className="space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span>FEATURE CONTRIBUTION</span>
                  <span>SHAP VALUE (Δ SCORE)</span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between rounded bg-white/5 p-2">
                    <span className="text-slate-300">Debt-to-Income (DTI &lt; 18%)</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-28 rounded-full bg-emerald-500/30 overflow-hidden">
                        <div className="h-full w-4/5 bg-emerald-400" />
                      </div>
                      <span className="text-emerald-400 font-bold">+42 pts</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded bg-white/5 p-2">
                    <span className="text-slate-300">Clean Payment History (99.4%)</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-28 rounded-full bg-emerald-500/30 overflow-hidden">
                        <div className="h-full w-3/4 bg-emerald-400" />
                      </div>
                      <span className="text-emerald-400 font-bold">+38 pts</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded bg-white/5 p-2">
                    <span className="text-slate-300">High Credit Line Utilization (72%)</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-28 rounded-full bg-red-500/30 overflow-hidden">
                        <div className="h-full w-1/2 bg-red-400" />
                      </div>
                      <span className="text-red-400 font-bold">-26 pts</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-3 font-mono text-xs">
                <span className="text-slate-300">Model Output: <strong>Grade A (764/850)</strong></span>
                <span className="text-cyan-400 font-bold">Default Risk: 2.1% (Low)</span>
              </div>
            </div>
          )}

          {projectId === 'solaris' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="font-mono text-[10px] uppercase text-amber-400 tracking-wider font-semibold">
                    Clean-Tech Grid Dashboard
                  </span>
                  <h4 className="text-base font-bold text-white">Solaris Array Telemetry & Inverter Matrix</h4>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-amber-500/20 px-2.5 py-0.5 font-mono text-[11px] font-bold text-amber-300 border border-amber-500/30">
                  <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                  LIVE 142.8 kW
                </span>
              </div>

              {/* Solar Array Grid */}
              <div className="grid grid-cols-3 gap-3 font-mono">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <span className="text-[10px] text-slate-400 uppercase">Inverter Bus</span>
                  <p className="text-lg font-bold text-white">384.2 V</p>
                  <span className="text-[10px] text-emerald-400 font-semibold">Optimal Range</span>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <span className="text-[10px] text-slate-400 uppercase">Daily Yield</span>
                  <p className="text-lg font-bold text-white">894 kWh</p>
                  <span className="text-[10px] text-cyan-400 font-semibold">+14.2% vs target</span>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <span className="text-[10px] text-slate-400 uppercase">CO2 Offset</span>
                  <p className="text-lg font-bold text-white">1.42 Tons</p>
                  <span className="text-[10px] text-emerald-400 font-semibold">Certified</span>
                </div>
              </div>

              <div className="h-16 w-full rounded-lg bg-white/5 border border-white/10 p-2 flex items-end gap-1">
                {[30, 45, 60, 80, 95, 100, 92, 85, 78, 65, 50, 40].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className="flex-1 rounded-t bg-gradient-to-t from-amber-500 to-yellow-300 opacity-80"
                  />
                ))}
              </div>
            </div>
          )}

          {projectId === 'store-ma' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="font-mono text-[10px] uppercase text-indigo-400 tracking-wider font-semibold">
                    E-Commerce Core
                  </span>
                  <h4 className="text-base font-bold text-white">Store-MA Distributed Checkout</h4>
                </div>
                <span className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 font-mono text-[11px] font-bold text-indigo-300 border border-indigo-500/30">
                  TPS: 2,400 req/s
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 space-y-2">
                  <div className="flex justify-between text-slate-400">
                    <span>Order Ingestion</span>
                    <span className="text-emerald-400 font-bold">12ms latency</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Inventory Lock</span>
                    <span className="text-emerald-400 font-bold">Atomic ACID</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Payment Gateway</span>
                    <span className="text-cyan-400 font-bold">Stripe Webhooks</span>
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-3 flex flex-col justify-between">
                  <span className="text-slate-400 text-[10px] uppercase">Cart State Synced</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white">€1,240.00</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-bold">
                    <Check className="h-3.5 w-3.5" /> 3 items verified in stock
                  </div>
                </div>
              </div>
            </div>
          )}

          {projectId === 'lulukay' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="font-mono text-[10px] uppercase text-pink-400 tracking-wider font-semibold">
                    Artisanal Brand Experience
                  </span>
                  <h4 className="text-base font-bold text-white">Lulukay Chocolate Digital Atelier</h4>
                </div>
                <span className="rounded-full bg-pink-500/20 px-2.5 py-0.5 font-mono text-[11px] font-bold text-pink-300 border border-pink-500/30">
                  Bespoke Edition
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-amber-900/30 bg-amber-950/20 p-3 text-center">
                  <span className="font-serif italic text-amber-200 text-sm">Noir 85%</span>
                  <p className="font-mono text-[10px] text-amber-400 mt-1">Ecuador Single Origin</p>
                </div>
                <div className="rounded-xl border border-amber-900/30 bg-amber-950/20 p-3 text-center">
                  <span className="font-serif italic text-amber-200 text-sm">Praliné Noisette</span>
                  <p className="font-mono text-[10px] text-amber-400 mt-1">Piedmont Hazelnut</p>
                </div>
                <div className="rounded-xl border border-amber-900/30 bg-amber-950/20 p-3 text-center">
                  <span className="font-serif italic text-amber-200 text-sm">Fleur de Sel</span>
                  <p className="font-mono text-[10px] text-amber-400 mt-1">Guérande Caramel</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Device Mockup (iPhone Frame, ~32% width) */}
      <div className="relative w-[220px] sm:w-[240px] shrink-0 rounded-[36px] border-4 border-slate-700 bg-[#070A10] p-2 shadow-2xl overflow-hidden lg:-ml-10 z-20">
        {/* Dynamic Island Notch */}
        <div className="mx-auto h-4 w-20 rounded-full bg-black mb-2" />

        <div className="rounded-[28px] bg-[#0B0F19] p-3 text-white border border-white/5 space-y-3 font-mono text-[10px]">
          <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
            <span className="text-slate-400 font-bold uppercase">{projectId}</span>
            <span className="text-emerald-400">99.9% LIVE</span>
          </div>

          <div className="space-y-1.5 rounded-lg bg-white/5 p-2">
            <span className="text-slate-500 uppercase text-[9px]">Mobile Viewport</span>
            <p className="font-sans font-semibold text-slate-200 text-xs">{title}</p>
            <div className="flex items-center justify-between text-cyan-400 font-mono text-[9px] pt-1">
              <span>Touch Gestures</span>
              <span>Smooth 120Hz</span>
            </div>
          </div>

          <div className="rounded-lg border border-cyan-500/20 bg-cyan-950/30 p-2 flex items-center justify-between">
            <span className="text-slate-300">Quick Action</span>
            <ArrowRight className="h-3 w-3 text-cyan-400" />
          </div>
        </div>

        {/* Home Indicator */}
        <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-slate-600" />
      </div>
    </div>
  );
}
