'use client';

import React, { useState, useEffect } from 'react';
import { Server, Activity, ShieldCheck, Wifi, Thermometer, Droplets, Zap, RefreshCw, Terminal, CheckCircle2 } from 'lucide-react';

interface RackStatus {
  id: string;
  name: string;
  temp: number;
  load: number;
  status: 'nominal' | 'warning';
}

const INITIAL_RACKS: RackStatus[] = [
  { id: 'R01', name: 'RACK-A01 (CORE-SW)', temp: 21.1, load: 42, status: 'nominal' },
  { id: 'R02', name: 'RACK-A02 (SAN-STG)', temp: 21.4, load: 68, status: 'nominal' },
  { id: 'R03', name: 'RACK-A03 (K8S-01)', temp: 21.8, load: 74, status: 'nominal' },
  { id: 'R04', name: 'RACK-A04 (K8S-02)', temp: 21.2, load: 62, status: 'nominal' },
  { id: 'R05', name: 'RACK-B01 (EDGE-RT)', temp: 20.9, load: 38, status: 'nominal' },
  { id: 'R06', name: 'RACK-B02 (DB-SHRD)', temp: 22.1, load: 81, status: 'nominal' },
  { id: 'R07', name: 'RACK-B03 (VIRT-01)', temp: 21.5, load: 55, status: 'nominal' },
  { id: 'R08', name: 'RACK-B04 (BACKUP)', temp: 20.8, load: 29, status: 'nominal' },
];

export default function DataCenterTelemetry() {
  const [bakuTime, setBakuTime] = useState<string>('');
  const [temp, setTemp] = useState<number>(21.2);
  const [humidity, setHumidity] = useState<number>(46.4);
  const [fiberLoss, setFiberLoss] = useState<number>(0.11);
  const [racks, setRacks] = useState<RackStatus[]>(INITIAL_RACKS);
  const [logs, setLogs] = useState<string[]>([
    '[INIT] Telemetry telemetry-agent v4.2.1 initialized',
    '[OK] AzInTelecom Tier III Facility link verified',
    '[OK] Optical Link SMF-TRUNK-01 attenuation: 0.11 dB (TIA/EIA Standard)',
    '[OK] Cold Aisle CRAC-01 & CRAC-02 environmental equilibrium nominal',
  ]);
  const [isDiagnosticRunning, setIsDiagnosticRunning] = useState<boolean>(false);

  // Live Clock (Baku UTC+04:00)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Baku',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setBakuTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Micro-fluctuations for realistic telemetry
  useEffect(() => {
    const telemetryInterval = setInterval(() => {
      setTemp((prev) => +(21.0 + Math.random() * 0.4).toFixed(1));
      setHumidity((prev) => +(46.0 + Math.random() * 0.8).toFixed(1));
      setFiberLoss((prev) => +(0.10 + Math.random() * 0.03).toFixed(2));
    }, 4000);

    return () => clearInterval(telemetryInterval);
  }, []);

  const runDiagnostic = () => {
    if (isDiagnosticRunning) return;
    setIsDiagnosticRunning(true);
    setLogs((prev) => [
      `[DIAG] Initiating Optical Time-Domain Reflectometry (OTDR) on SMF-04...`,
      ...prev.slice(0, 5),
    ]);

    setTimeout(() => {
      setLogs((prev) => [
        `[OTDR] Backscatter return curve verified: No macro-bends detected. Insertion loss 0.108 dB.`,
        ...prev.slice(0, 5),
      ]);
      setIsDiagnosticRunning(false);
    }, 1800);
  };

  return (
    <section
      id="telemetry"
      aria-label="AzInTelecom Data Center Telemetry"
      className="relative z-40 -mt-10 md:-mt-16 w-full rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-[#070A10] px-6 py-16 sm:px-10 sm:py-20 md:px-14 md:py-24 lg:px-20 text-[#F8FAFC] border-t border-cyan-500/20 shadow-[0_-25px_60px_rgba(0,0,0,0.8)] select-none"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header HUD */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-cyan-500/20 pb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-[0.25em] uppercase text-cyan-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              LIVE TELEMETRY STREAM · TIER III DC
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight font-display text-white">
              AzInTelecom <br className="hidden sm:block" />
              Operations Matrix
            </h2>
            <p className="mt-2 font-mono text-xs text-slate-400">
              Data Center Infrastructure Department • Baku, Azerbaijan • UTC+04:00 ({bakuTime || '00:00:00'})
            </p>
          </div>

          {/* Quick SLA Status Card */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/20 px-3.5 py-2 font-mono text-xs text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              <span>SLA: 99.982% NOMINAL</span>
            </div>
            <button
              onClick={runDiagnostic}
              disabled={isDiagnosticRunning}
              className="flex items-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-950/30 px-3.5 py-2 font-mono text-xs font-semibold text-cyan-300 transition-all hover:bg-cyan-500/20 active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isDiagnosticRunning ? 'animate-spin' : ''}`} />
              <span>{isDiagnosticRunning ? 'CALIBRATING...' : 'RUN OTDR SCAN'}</span>
            </button>
          </div>
        </div>

        {/* Telemetry Sensor Gauges */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Cold Aisle Temp */}
          <div className="rounded-2xl border border-white/10 bg-[#0B0F19] p-5">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-mono text-xs uppercase tracking-wider">Cold Aisle Thermal</span>
              <Thermometer className="h-4 w-4 text-cyan-400" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-3xl font-black text-white">{temp}°C</span>
              <span className="font-mono text-xs text-emerald-400 font-bold">Optimal</span>
            </div>
            <div className="mt-2 text-slate-500 text-[11px] font-mono">
              Target: 20.0°C – 22.0°C (ASHRAE TC 9.9)
            </div>
          </div>

          {/* Relative Humidity */}
          <div className="rounded-2xl border border-white/10 bg-[#0B0F19] p-5">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-mono text-xs uppercase tracking-wider">Relative Humidity</span>
              <Droplets className="h-4 w-4 text-indigo-400" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-3xl font-black text-white">{humidity}%</span>
              <span className="font-mono text-xs text-emerald-400 font-bold">In-Bounds</span>
            </div>
            <div className="mt-2 text-slate-500 text-[11px] font-mono">
              Target: 40% – 55% RH (Non-condensing)
            </div>
          </div>

          {/* Optical Fiber Link Loss */}
          <div className="rounded-2xl border border-white/10 bg-[#0B0F19] p-5">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-mono text-xs uppercase tracking-wider">Optical Link Loss</span>
              <Wifi className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-3xl font-black text-emerald-400">{fiberLoss} dB</span>
              <span className="font-mono text-xs text-emerald-400 font-bold">&lt; 0.15 dB PASS</span>
            </div>
            <div className="mt-2 text-slate-500 text-[11px] font-mono">
              Standard: TIA/EIA-568 Single-Mode Trunk
            </div>
          </div>

          {/* Power Usage Effectiveness */}
          <div className="rounded-2xl border border-white/10 bg-[#0B0F19] p-5">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-mono text-xs uppercase tracking-wider">Facility PUE</span>
              <Zap className="h-4 w-4 text-amber-400" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-3xl font-black text-white">1.28</span>
              <span className="font-mono text-xs text-cyan-400 font-bold">Tier III Eff.</span>
            </div>
            <div className="mt-2 text-slate-500 text-[11px] font-mono">
              Dual-grid A/B Feed Uptime: 100%
            </div>
          </div>
        </div>

        {/* Rack Status Matrix & Live Console */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Rack Status Grid (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#0B0F19] p-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Server className="h-4 w-4 text-cyan-400" />
                SERVER RACK CLUSTERS & HARDWARE HEALTH
              </h3>
              <span className="font-mono text-[10px] text-emerald-400 font-bold">8 / 8 NODES ONLINE</span>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {racks.map((rack) => (
                <div
                  key={rack.id}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-3 hover:border-cyan-500/30 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      <span className="font-mono text-xs font-semibold text-slate-200">{rack.name}</span>
                    </div>
                    <span className="font-mono text-[10px] text-slate-400">
                      Load: {rack.load}% · Temp: {rack.temp}°C
                    </span>
                  </div>

                  {/* Load mini progress bar */}
                  <div className="h-2 w-16 rounded-full bg-white/10 overflow-hidden">
                    <div
                      style={{ width: `${rack.load}%` }}
                      className={`h-full ${rack.load > 75 ? 'bg-amber-400' : 'bg-cyan-400'}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Terminal Console Logs (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-cyan-500/20 bg-[#04060A] p-6 font-mono text-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3 text-slate-400">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-cyan-400" />
                  <span className="text-slate-300 font-bold">OPERATIONS_LOG.sh</span>
                </div>
                <span className="text-[10px] text-cyan-400">STREAMING</span>
              </div>

              <div className="mt-4 space-y-2 text-[11px] text-slate-400 overflow-y-auto max-h-[190px]">
                {logs.map((log, idx) => (
                  <div key={idx} className="leading-relaxed">
                    <span className="text-cyan-400">$</span> {log}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-500">
              <span>Baku DC NOC Agent: anar.gadirli</span>
              <span className="text-emerald-400 font-bold">AUTH VERIFIED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
