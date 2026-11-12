/**
 * Port of Falcon — Tier III Data Center Telemetry Physics & Simulation Engine
 * Modeled on ANSI/TIA-942 and ASHRAE TC 9.9 standards
 * Path: src/lib/telemetry-engine.ts
 */

import type { SystemStatus, FaultInjectionType } from '../types/telemetry.ts';

/**
 * Optical Link Budget & Attenuation Model (<0.15 dB TIA-568.3-D standard).
 */
export function calculateOpticalLinkBudget(options: {
  fiberLengthKm?: number;
  connectorPairs?: number;
  spliceLossDb?: number;
  faultInjected?: 'optical_microbend' | null;
  txPowerDbm?: number;
}): {
  insertionLossDb: number;
  txPowerDbm: number;
  rxPowerDbm: number;
  isCompliant: boolean;
  status: SystemStatus;
  berEstimate: number;
} {
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
}): {
  coldAisleTempC: number;
  hotAisleTempC: number;
  deltaT: number;
  relativeHumidityPercent: number;
  dewPointC: number;
  airflowCfm: number;
  differentialPressurePa: number;
  status: SystemStatus;
} {
  const baseInlet = options.ambientC ?? 20.4;
  const itLoad = options.itLoadKw ?? 7.4; // kW
  const thermalFault = options.faultInjected === 'thermal_surge';
  const chokeFault = options.faultInjected === 'airflow_choke';

  // Inlet temp
  const coldAisleTempC = thermalFault ? 29.4 : baseInlet;

  // Temperature rise delta T = P_IT / (rho * Cp * V_dot)
  const nominalAirflowCfm = chokeFault ? 450 : 1150;
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
