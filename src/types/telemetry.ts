/**
 * Port of Falcon — Tier III Data Center Telemetry Type Definitions
 * Modeled on ANSI/TIA-942 and ASHRAE TC 9.9 standards
 * Path: src/types/telemetry.ts
 */

export type BayType = 'compute' | 'optical-core' | 'storage' | 'edge-cloud';

export type SystemStatus = 'nominal' | 'warning' | 'critical';

export type FaultInjectionType = 'thermal_surge' | 'optical_microbend' | 'airflow_choke' | null;

export interface RackSensorData {
  rackId: string;
  name: string;
  bayType: BayType;
  coldAisleTempC: number;          // 18.0 - 27.0 °C (ASHRAE Recommended)
  hotAisleTempC: number;           // 30.0 - 40.0 °C
  relativeHumidityPercent: number; // 40.0 - 60.0 % (Allowable 20 - 80 %)
  dewPointC: number;               // 5.5 - 15.0 °C
  fiberInsertionLossDb: number;    // Strict < 0.15 dB (TIA/EIA-568.3-D compliance)
  opticalTxPowerDbm: number;       // -1.5 to -3.0 dBm
  opticalRxPowerDbm: number;       // -10.0 to -14.0 dBm
  pue: number;                     // 1.20 - 1.35 (Tier III nominal)
  airflowCfm: number;              // 800 - 2400 CFM
  differentialPressurePa: number;  // 10.0 - 25.0 Pa
  uptimeSeconds: number;           // Monotonically increasing simulation uptime
  status: SystemStatus;
  faultInjected?: FaultInjectionType;
}

export interface TelemetryLogEntry {
  id: string;
  timestamp: string;               // ISO-8601 or HH:mm:ss.SSS
  rackId: string;
  level: 'info' | 'warn' | 'crit';
  category: 'thermal' | 'optical' | 'power' | 'airflow' | 'system';
  message: string;
  value?: number;
  unit?: string;
}

export interface ServerBladeNode {
  nodeId: string;
  name: string;
  cpuPercent: number;              // 0 - 100%
  memoryPercent: number;           // 0 - 100%
  storageIops: number;             // e.g. 45,000 IOPS
  powerWatts: number;
  status: SystemStatus;
}

export interface TelemetrySimulationConfig {
  isRunning: boolean;
  refreshIntervalMs: 500 | 1000 | 2500 | 5000;
  activeRackId: string;
  activeFault: FaultInjectionType;
}
