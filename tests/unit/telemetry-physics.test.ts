/**
 * Unit Test Suite: AzInTelecom Data Center Telemetry Physics & TIA/ASHRAE Verification
 * Path: tests/unit/telemetry-physics.test.ts
 */

import {
  describe,
  it,
  expect,
  calculateOpticalLinkBudget,
  simulateEnvironmentalPhysics,
  calculatePue,
} from '../test-runner.ts';

describe('Unit: AzInTelecom Telemetry Physics Suite', () => {
  // 1. Environmental Controls & ASHRAE TC 9.9 Standards
  it('simulates nominal cold aisle inlet temperature within ASHRAE TC 9.9 recommended envelope (18.0 - 27.0 °C)', () => {
    const env = simulateEnvironmentalPhysics({ ambientC: 20.4 });
    expect(env.coldAisleTempC).toBeGreaterThanOrEqual(18.0);
    expect(env.coldAisleTempC).toBeLessThanOrEqual(27.0);
    expect(env.coldAisleTempC).toBeCloseTo(20.4, 0.1);
  });

  it('calculates hot aisle exhaust temperature and heat dissipation delta T', () => {
    const env = simulateEnvironmentalPhysics({ ambientC: 20.4, itLoadKw: 7.4 });
    expect(env.hotAisleTempC).toBeGreaterThan(env.coldAisleTempC);
    expect(env.deltaT).toBeGreaterThan(10.0);
    expect(env.deltaT).toBeLessThan(18.0);
    expect(env.hotAisleTempC).toBeCloseTo(env.coldAisleTempC + env.deltaT, 0.1);
  });

  it('simulates nominal relative humidity within optimal 40.0% - 60.0% range', () => {
    const env = simulateEnvironmentalPhysics({});
    expect(env.relativeHumidityPercent).toBeGreaterThanOrEqual(40.0);
    expect(env.relativeHumidityPercent).toBeLessThanOrEqual(60.0);
  });

  it('calculates dew point temperature within acceptable 5.5 °C - 15.0 °C window', () => {
    const env = simulateEnvironmentalPhysics({ ambientC: 20.4 });
    expect(env.dewPointC).toBeGreaterThanOrEqual(5.5);
    expect(env.dewPointC).toBeLessThanOrEqual(15.0);
    expect(env.dewPointC).toBeLessThan(env.coldAisleTempC);
  });

  it('reports nominal status when all environmental parameters are within ASHRAE class A1', () => {
    const env = simulateEnvironmentalPhysics({ ambientC: 20.4 });
    expect(env.status).toBe('nominal');
  });

  // 2. Optical Fiber Link Insertion Loss & TIA/EIA Standards
  it('simulates nominal single-mode fiber insertion loss strictly < 0.15 dB (ANSI/TIA-568.3-D)', () => {
    const opt = calculateOpticalLinkBudget({});
    expect(opt.insertionLossDb).toBeLessThan(0.15);
    expect(opt.insertionLossDb).toBeGreaterThan(0.08);
    expect(opt.isCompliant).toBe(true);
    expect(opt.status).toBe('nominal');
  });

  it('verifies optical transmit (Tx) and receive (Rx) power relationship: Rx = Tx - Loss', () => {
    const opt = calculateOpticalLinkBudget({ txPowerDbm: -2.1 });
    expect(opt.txPowerDbm).toBe(-2.1);
    expect(opt.rxPowerDbm).toBeCloseTo(opt.txPowerDbm - opt.insertionLossDb, 0.001);
    expect(opt.rxPowerDbm).toBeLessThan(opt.txPowerDbm);
  });

  it('verifies nominal receive power is well above -14.4 dBm receiver sensitivity floor', () => {
    const opt = calculateOpticalLinkBudget({});
    expect(opt.rxPowerDbm).toBeGreaterThan(-14.4);
  });

  it('verifies Bit Error Rate (BER) is strictly below 10^-12 under nominal link conditions', () => {
    const opt = calculateOpticalLinkBudget({});
    expect(opt.berEstimate).toBeLessThan(1e-12);
  });

  it('strictly evaluates compliance boundary: loss < 0.15 dB is compliant, loss >= 0.15 dB is non-compliant', () => {
    const compliant = calculateOpticalLinkBudget({ connectorPairs: 2, spliceLossDb: 0.01 });
    expect(compliant.insertionLossDb).toBeLessThan(0.15);
    expect(compliant.isCompliant).toBe(true);

    const nonCompliant = calculateOpticalLinkBudget({ faultInjected: 'optical_microbend' });
    expect(nonCompliant.insertionLossDb).toBeGreaterThanOrEqual(0.15);
    expect(nonCompliant.isCompliant).toBe(false);
  });

  // 3. Power, Cooling & Airflow Diagnostics
  it('calculates dynamic PUE within Tier III benchmark range [1.20, 1.35]', () => {
    // 7.4 kW IT load, 1.48 kW cooling load, 0.30 kW losses
    const pue = calculatePue(7.4, 1.48, 0.30);
    expect(pue).toBeGreaterThanOrEqual(1.20);
    expect(pue).toBeLessThanOrEqual(1.35);
  });

  it('clamps minimum IT load to prevent PUE Infinity when IT load approaches 0', () => {
    const pueZero = calculatePue(0, 1.0, 0.2);
    expect(Number.isFinite(pueZero)).toBe(true);
    expect(pueZero).toBeGreaterThan(1.0);
    expect(pueZero).toBeLessThanOrEqual(3.5);
  });

  it('simulates nominal volumetric airflow within 800 - 2400 CFM for standard rack', () => {
    const env = simulateEnvironmentalPhysics({});
    expect(env.airflowCfm).toBeGreaterThanOrEqual(800);
    expect(env.airflowCfm).toBeLessThanOrEqual(2400);
  });

  it('simulates positive containment static pressure differential within +10 to +25 Pa', () => {
    const env = simulateEnvironmentalPhysics({});
    expect(env.differentialPressurePa).toBeGreaterThanOrEqual(10.0);
    expect(env.differentialPressurePa).toBeLessThanOrEqual(25.0);
  });

  // 4. Fault Injection Scenarios
  it('triggers critical status and thermal spike when thermal_surge fault is injected', () => {
    const env = simulateEnvironmentalPhysics({ faultInjected: 'thermal_surge' });
    expect(env.coldAisleTempC).toBeGreaterThan(27.0); // Breaches ASHRAE recommended
    expect(env.status).toBe('critical');
    expect(env.hotAisleTempC).toBeGreaterThan(40.0);
  });

  it('triggers non-compliant flag and critical status when optical_microbend fault is injected', () => {
    const opt = calculateOpticalLinkBudget({ faultInjected: 'optical_microbend' });
    expect(opt.insertionLossDb).toBeGreaterThan(0.35); // 0.398 dB
    expect(opt.isCompliant).toBe(false);
    expect(opt.status).toBe('critical');
    expect(opt.berEstimate).toBeGreaterThan(1e-12);
  });

  it('triggers warning status and low pressure differential when airflow_choke is injected', () => {
    const env = simulateEnvironmentalPhysics({ faultInjected: 'airflow_choke' });
    expect(env.airflowCfm).toBeLessThan(800); // Dropped to 450 CFM
    expect(env.differentialPressurePa).toBeLessThan(10.0); // Dropped to 6.2 Pa
    expect(env.status).toBe('warning');
  });

  it('restores all metrics to nominal baseline when fault is reset to null', () => {
    const envNominal = simulateEnvironmentalPhysics({ faultInjected: null });
    expect(envNominal.status).toBe('nominal');
    expect(envNominal.coldAisleTempC).toBeLessThanOrEqual(27.0);
    expect(envNominal.differentialPressurePa).toBeGreaterThanOrEqual(10.0);

    const optNominal = calculateOpticalLinkBudget({ faultInjected: null });
    expect(optNominal.status).toBe('nominal');
    expect(optNominal.isCompliant).toBe(true);
    expect(optNominal.insertionLossDb).toBeLessThan(0.15);
  });
});
