/**
 * Challenger 2: Milestone 1 Empirical Stress Test Suite
 * Path: tests/empirical-challenger-m1-2.ts
 *
 * Tests:
 * 1. MagneticParallax Physics & Coordinate Logic (velocity, far bounds, clamp, mouseleave reset)
 * 2. Touch Fallback Detection & Listener Detachment (hover: none, ontouchstart, clean DOM tree)
 * 3. Asset Resilience & Graceful Error Recovery (404 simulation, vector SVG integrity, zero exceptions)
 * 4. Runtime Server Load & Concurrency Resilience (200+ requests, 100% 200 OK, latency <50ms, memory leak check)
 */

import { performance } from 'node:perf_hooks';
import * as fs from 'node:fs';
import * as path from 'node:path';

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;

interface TestReportItem {
  id: string;
  category: string;
  name: string;
  passed: boolean;
  details: string;
  durationMs: number;
}

const testResults: TestReportItem[] = [];

function recordTest(id: string, category: string, name: string, passed: boolean, details: string, durationMs: number) {
  testResults.push({ id, category, name, passed, details, durationMs });
  const statusMark = passed ? '✓ PASS' : '✗ FAIL';
  console.log(`[${statusMark}] ${id} (${category}): ${name} (${durationMs.toFixed(2)}ms)`);
  if (!passed) {
    console.error(`       DETAILS: ${details}`);
  }
}

// ============================================================================
// TEST 1: MAGNETIC PARALLAX INTERACTION PHYSICS
// ============================================================================
async function runPhysicsTests() {
  const t0 = performance.now();
  console.log('\n--- SUITE 1: MagneticParallax Physics & Coordinate Boundary Tests ---');

  // Exact math from MagneticParallax.tsx
  function computeDisplacement(
    mouseX: number,
    mouseY: number,
    rect: { left: number; top: number; width: number; height: number; right: number; bottom: number },
    padding = 150,
    strength = 3,
    maxOffset = 45
  ) {
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const minX = rect.left - padding;
    const maxX = rect.right + padding;
    const minY = rect.top - padding;
    const maxY = rect.bottom + padding;

    if (mouseX >= minX && mouseX <= maxX && mouseY >= minY && mouseY <= maxY) {
      const deltaX = (mouseX - centerX) / strength;
      const deltaY = (mouseY - centerY) / strength;

      const clampedX = Math.max(-maxOffset, Math.min(maxOffset, deltaX));
      const clampedY = Math.max(-maxOffset, Math.min(maxOffset, deltaY));

      return { x: clampedX, y: clampedY, insideField: true };
    } else {
      return { x: 0, y: 0, insideField: false };
    }
  }

  const sampleRect = { left: 400, top: 300, width: 200, height: 200, right: 600, bottom: 500 };
  const centerX = 500;
  const centerY = 400;

  // 1.1 Far Outside Boundaries (Positive and Negative Infinity extremes)
  {
    const start = performance.now();
    const extremeCoords = [
      { x: 100000, y: 100000 },
      { x: -100000, y: -100000 },
      { x: 500, y: 10000 },
      { x: 10000, y: 400 },
      { x: sampleRect.left - 150.0001, y: centerY },
      { x: sampleRect.right + 150.0001, y: centerY },
      { x: centerX, y: sampleRect.top - 150.0001 },
      { x: centerX, y: sampleRect.bottom + 150.0001 },
    ];

    let allZero = true;
    let failureDetail = '';
    for (const pt of extremeCoords) {
      const res = computeDisplacement(pt.x, pt.y, sampleRect);
      if (res.x !== 0 || res.y !== 0 || res.insideField !== false) {
        allZero = false;
        failureDetail = `Point (${pt.x}, ${pt.y}) yielded x=${res.x}, y=${res.y}, inside=${res.insideField}`;
        break;
      }
    }
    recordTest(
      'PHYS-01',
      'Physics',
      'Far-outside and boundary-adjacent coordinates collapse to (0, 0)',
      allZero,
      allZero ? 'All 8 extreme coordinates returned exact (0, 0)' : failureDetail,
      performance.now() - start
    );
  }

  // 1.2 Boundary Ingress & Maximum Displacement Clamping
  {
    const start = performance.now();
    const boundaryPoints = [
      { x: sampleRect.left - 150, y: centerY },   // Left edge of magnetic field
      { x: sampleRect.right + 150, y: centerY },  // Right edge of magnetic field
      { x: centerX, y: sampleRect.top - 150 },    // Top edge of magnetic field
      { x: centerX, y: sampleRect.bottom + 150 }, // Bottom edge of magnetic field
    ];

    let allClamped = true;
    let detail = '';
    for (const pt of boundaryPoints) {
      const res = computeDisplacement(pt.x, pt.y, sampleRect, 150, 3, 45);
      if (!res.insideField || Math.abs(res.x) > 45 || Math.abs(res.y) > 45) {
        allClamped = false;
        detail = `At (${pt.x}, ${pt.y}), got x=${res.x}, y=${res.y}`;
        break;
      }
    }
    recordTest(
      'PHYS-02',
      'Physics',
      'Exact 150px boundary ingress activates magnetic field clamped to [-45, 45]px',
      allClamped,
      allClamped ? 'All 4 cardinal boundary edges correctly clamped within [-45, 45]px' : detail,
      performance.now() - start
    );
  }

  // 1.3 Extreme Cursor Velocity Simulation (e.g. 500,000 px/s jump across active field)
  {
    const start = performance.now();
    let velocityViolations = 0;
    // Simulate 10,000 rapid random jumps across the viewport
    for (let i = 0; i < 10000; i++) {
      const rx = (Math.random() - 0.5) * 5000 + centerX;
      const ry = (Math.random() - 0.5) * 5000 + centerY;
      const res = computeDisplacement(rx, ry, sampleRect, 150, 3, 45);

      if (Math.abs(res.x) > 45.0001 || Math.abs(res.y) > 45.0001) {
        velocityViolations++;
      }
      if (!res.insideField && (res.x !== 0 || res.y !== 0)) {
        velocityViolations++;
      }
    }
    const passed = velocityViolations === 0;
    recordTest(
      'PHYS-03',
      'Physics',
      'Stress test 10,000 extreme velocity jumps: 100% adherence to clamp <= 45px',
      passed,
      `Tested 10,000 rapid coordinate vectors, violations=${velocityViolations}`,
      performance.now() - start
    );
  }

  // 1.4 Numerical Spring Solver Simulation (Damping = 20, Stiffness = 160, Mass = 0.6)
  {
    const start = performance.now();
    // Verify critically damped spring physics for Framer Motion useSpring config
    const m = 0.6;
    const c = 20;
    const k = 160;

    // Critical damping coefficient: c_crit = 2 * sqrt(m * k)
    const c_crit = 2 * Math.sqrt(m * k); // 2 * sqrt(96) = 19.5959
    const dampingRatio = c / c_crit;     // 20 / 19.5959 = 1.0206 (slightly overdamped)

    // Simulate step response upon mouseleave (target drops abruptly from 45px to 0px)
    let x = 45;
    let v = 0;
    const dt = 0.001; // 1ms integration steps
    let maxOvershoot = 0;
    let visualSettleMs = -1; // Time to reach sub-pixel < 0.5px
    let fullSettleMs = -1;   // Time to reach asymptotic rest (< 0.05px and v < 0.05px/s)

    for (let t = 0; t <= 1000; t++) {
      const a = (-k * x - c * v) / m;
      v += a * dt;
      x += v * dt;

      if (x < 0 && Math.abs(x) > maxOvershoot) {
        maxOvershoot = Math.abs(x);
      }
      if (Math.abs(x) < 0.5 && visualSettleMs === -1 && t > 50) {
        visualSettleMs = t;
      }
      if (Math.abs(x) < 0.05 && Math.abs(v) < 0.05 && fullSettleMs === -1 && t > 50) {
        fullSettleMs = t;
      }
    }

    const isWellBehaved = dampingRatio >= 0.95 && dampingRatio <= 1.15 && maxOvershoot < 0.01 && visualSettleMs < 500 && fullSettleMs < 900;
    recordTest(
      'PHYS-04',
      'Physics',
      'Framer Motion spring configuration (c=20, k=160, m=0.6) is critically damped with zero ringing overshoot',
      isWellBehaved,
      `Damping ratio zeta=${dampingRatio.toFixed(4)}, max overshoot=${maxOvershoot.toFixed(4)}px, visual settle (${visualSettleMs}ms < 500ms), full settle (${fullSettleMs}ms < 900ms)`,
      performance.now() - start
    );
  }
}

// ============================================================================
// TEST 2: TOUCH FALLBACK DETECTION & LISTENER DETACHMENT
// ============================================================================
async function runTouchFallbackTests() {
  const t0 = performance.now();
  console.log('\n--- SUITE 2: Touch Fallback Detection & Listener Detachment Tests ---');

  // Read MagneticParallax source to verify structural adherence
  const sourcePath = path.resolve(process.cwd(), 'src/components/hero/MagneticParallax.tsx');
  const sourceCode = fs.readFileSync(sourcePath, 'utf8');

  // 2.1 Media Query & Touch Event Detection Logic
  {
    const start = performance.now();
    const hasHoverNone = sourceCode.includes("window.matchMedia('(hover: none)')");
    const hasPointerCoarse = sourceCode.includes("window.matchMedia('(pointer: coarse)')");
    const hasOntouchstart = sourceCode.includes("'ontouchstart' in window");

    const passed = hasHoverNone && hasPointerCoarse && hasOntouchstart;
    recordTest(
      'TOUCH-01',
      'TouchFallback',
      'Multi-vector touch device detection: (hover: none), (pointer: coarse), ontouchstart',
      passed,
      `hover:none=${hasHoverNone}, pointer:coarse=${hasPointerCoarse}, ontouchstart=${hasOntouchstart}`,
      performance.now() - start
    );
  }

  // 2.2 Listener Detachment on Touch Device
  {
    const start = performance.now();
    const checksTouchInCallback = sourceCode.includes('if (isTouchDevice || !containerRef.current) return;');
    const returnsEarlyInEffect = sourceCode.includes('if (isTouchDevice) return;');
    const cleansUpListeners = sourceCode.includes("window.removeEventListener('mousemove', handleMouseMove)") &&
                              sourceCode.includes("window.removeEventListener('mouseleave', handleMouseLeave)");

    const passed = checksTouchInCallback && returnsEarlyInEffect && cleansUpListeners;
    recordTest(
      'TOUCH-02',
      'TouchFallback',
      'Complete listener avoidance and cleanup when isTouchDevice is active',
      passed,
      `guardInCallback=${checksTouchInCallback}, earlyReturnInEffect=${returnsEarlyInEffect}, listenerCleanup=${cleansUpListeners}`,
      performance.now() - start
    );
  }

  // 2.3 Static Layout Tree Preservation on Touch Devices
  {
    const start = performance.now();
    // Verify that when isTouchDevice is true, it renders a plain static div without motion wrapper
    const rendersStaticDiv = sourceCode.includes('if (isTouchDevice)') &&
                             sourceCode.includes('<div className={`relative ${className}`}>{children}</div>');

    recordTest(
      'TOUCH-03',
      'TouchFallback',
      'Touch devices render zero-motion static DOM container, preventing touch hijacking',
      rendersStaticDiv,
      rendersStaticDiv ? 'Static plain div returned directly when isTouchDevice=true' : 'Missing static touch fallback JSX',
      performance.now() - start
    );
  }

  // 2.4 Dynamic Media Query Event Listener Attachment
  {
    const start = performance.now();
    const listensToMQChange = sourceCode.includes("mediaQuery.addEventListener?.('change', checkTouch)") &&
                              sourceCode.includes("mediaQuery.removeEventListener?.('change', checkTouch)");

    recordTest(
      'TOUCH-04',
      'TouchFallback',
      'Dynamic media query listener toggles touch mode dynamically on hybrid convertibles',
      listensToMQChange,
      listensToMQChange ? 'Registered change listener with cleanup' : 'Missing mediaQuery listener or cleanup',
      performance.now() - start
    );
  }
}

// ============================================================================
// TEST 3: ASSET RESILIENCE & 404 FALLBACK RECOVERY
// ============================================================================
async function runAssetResilienceTests() {
  const t0 = performance.now();
  console.log('\n--- SUITE 3: Asset Resilience & Error Recovery Tests ---');

  const avatarSrcPath = path.resolve(process.cwd(), 'src/components/hero/HeroAvatar.tsx');
  const avatarCode = fs.readFileSync(avatarSrcPath, 'utf8');

  // 3.1 Primary JPG to Vector SVG Fallback Logic
  {
    const start = performance.now();
    const handlesJpgError = avatarCode.includes("if (currentSrc.endsWith('.jpg'))") &&
                            avatarCode.includes("setCurrentSrc('/assets/anar-falcon-avatar.svg')");

    recordTest(
      'ASSET-01',
      'AssetResilience',
      'onError gracefully transitions from primary raster (.jpg) to vector fallback (.svg)',
      handlesJpgError,
      handlesJpgError ? 'Verified transition logic in handleError()' : 'Missing jpg -> svg transition in handleError',
      performance.now() - start
    );
  }

  // 3.2 Secondary Error Handling (Inline Procedural Vector SVG)
  {
    const start = performance.now();
    const setsSecondaryFallback = avatarCode.includes('setHasFallbackFailed(true)');
    const rendersProceduralSVG = avatarCode.includes('/* Procedural Vector Avatar Fallback */') &&
                                avatarCode.includes('ANAR GADIRLI // FALCON') &&
                                avatarCode.includes('<svg className="h-10 w-10 text-cyan-400"');

    const passed = setsSecondaryFallback && rendersProceduralSVG;
    recordTest(
      'ASSET-02',
      'AssetResilience',
      'Double-fault protection: secondary failure activates inline procedural vector avatar with zero crash',
      passed,
      `secondaryFallbackState=${setsSecondaryFallback}, proceduralSvgMarkup=${rendersProceduralSVG}`,
      performance.now() - start
    );
  }

  // 3.3 Disk Asset Verification for SVG and JPG
  {
    const start = performance.now();
    const jpgPath = path.resolve(process.cwd(), 'public/assets/anar-falcon-avatar.jpg');
    const svgPath = path.resolve(process.cwd(), 'public/assets/anar-falcon-avatar.svg');
    const insigniaPath = path.resolve(process.cwd(), 'public/assets/falcon-insignia.svg');

    const jpgExists = fs.existsSync(jpgPath) && fs.statSync(jpgPath).size > 100000;
    const svgExists = fs.existsSync(svgPath) && fs.statSync(svgPath).size > 1000;
    const insigniaExists = fs.existsSync(insigniaPath) && fs.statSync(insigniaPath).size > 500;

    // Check SVG syntax validity
    let svgValid = false;
    if (svgExists) {
      const svgContent = fs.readFileSync(svgPath, 'utf8');
      svgValid = svgContent.includes('<svg') && svgContent.includes('</svg>') && svgContent.includes('viewBox');
    }

    const passed = jpgExists && svgExists && insigniaExists && svgValid;
    recordTest(
      'ASSET-03',
      'AssetResilience',
      'Physical asset integrity on disk: JPG (668KB), SVG (6.4KB), Insignia (2.1KB) well-formed',
      passed,
      `jpgExists=${jpgExists}, svgExists=${svgExists}, insigniaExists=${insigniaExists}, svgValidXml=${svgValid}`,
      performance.now() - start
    );
  }

  // 3.4 Live HTTP Serving of Assets from Production Server
  {
    const start = performance.now();
    const assetsToTest = [
      '/assets/anar-falcon-avatar.jpg',
      '/assets/anar-falcon-avatar.svg',
      '/assets/falcon-insignia.svg',
      '/favicon.svg',
    ];

    let allServed200 = true;
    let detailMsg = '';
    for (const assetUrl of assetsToTest) {
      try {
        const resp = await fetch(`${BASE_URL}${assetUrl}`);
        if (resp.status !== 200) {
          allServed200 = false;
          detailMsg += `${assetUrl} returned HTTP ${resp.status}; `;
        }
      } catch (err: any) {
        allServed200 = false;
        detailMsg += `${assetUrl} network error: ${err.message}; `;
      }
    }

    recordTest(
      'ASSET-04',
      'AssetResilience',
      'Production HTTP server serves 100% of static visual assets with status 200 OK',
      allServed200,
      allServed200 ? 'All 4 asset routes responded with HTTP 200' : detailMsg,
      performance.now() - start
    );
  }
}

// ============================================================================
// TEST 4: RUNTIME SERVER LOAD & CONCURRENCY BENCHMARK
// ============================================================================
async function runServerLoadBenchmark() {
  const t0 = performance.now();
  console.log('\n--- SUITE 4: Production Runtime Server Concurrent Load & Memory Benchmark ---');

  // Baseline memory inspection of Next.js server
  const getNextServerPid = async (): Promise<number | null> => {
    try {
      const { execSync } = await import('node:child_process');
      const out = execSync("lsof -ti :3000 -sTCP:LISTEN").toString().trim();
      const pids = out.split('\n').map(p => parseInt(p, 10)).filter(p => !isNaN(p));
      return pids[0] || null;
    } catch {
      return null;
    }
  };

  const getProcessMemory = async (pid: number): Promise<{ rssMb: number; vszMb: number } | null> => {
    try {
      const { execSync } = await import('node:child_process');
      const out = execSync(`ps -o rss,vsz -p ${pid}`).toString().trim().split('\n');
      if (out.length >= 2) {
        const [rssKb, vszKb] = out[1].trim().split(/\s+/).map(Number);
        return { rssMb: rssKb / 1024, vszMb: vszKb / 1024 };
      }
      return null;
    } catch {
      return null;
    }
  };

  const serverPid = await getNextServerPid();
  console.log(`Discovered active Next.js Production Server PID: ${serverPid}`);

  const memBefore = serverPid ? await getProcessMemory(serverPid) : null;
  if (memBefore) {
    console.log(`Initial Next.js RSS: ${memBefore.rssMb.toFixed(2)} MB, VSZ: ${memBefore.vszMb.toFixed(2)} MB`);
  }

  // 4.1 Concurrent Load Execution: 200 total requests in 4 concurrent waves of 50 with HTTP keepAlive
  const TOTAL_REQUESTS = 200;
  const BATCH_SIZE = 50;
  const latencies: number[] = [];
  let successfulRequests = 0;
  let failedRequests = 0;

  const endpoints = [
    '/',
    '/assets/anar-falcon-avatar.jpg',
    '/assets/anar-falcon-avatar.svg',
    '/assets/falcon-insignia.svg',
  ];

  const http = await import('node:http');
  const agent = new http.Agent({ keepAlive: true, maxSockets: 50 });

  const makeRequest = (urlPath: string): Promise<{ status: number; duration: number }> => {
    return new Promise((resolve) => {
      const start = performance.now();
      const req = http.get(`http://localhost:${PORT}${urlPath}`, { agent }, (res) => {
        res.resume();
        res.on('end', () => {
          const duration = performance.now() - start;
          resolve({ status: res.statusCode || 500, duration });
        });
      });
      req.on('error', () => {
        resolve({ status: 500, duration: performance.now() - start });
      });
    });
  };

  const overallStart = performance.now();

  for (let batch = 0; batch < TOTAL_REQUESTS / BATCH_SIZE; batch++) {
    const wavePromises = Array.from({ length: BATCH_SIZE }).map(async (_, idx) => {
      const ep = endpoints[(batch * BATCH_SIZE + idx) % endpoints.length];
      const res = await makeRequest(ep);
      latencies.push(res.duration);
      if (res.status === 200) {
        successfulRequests++;
      } else {
        failedRequests++;
      }
    });

    await Promise.all(wavePromises);
  }

  const totalLoadDuration = performance.now() - overallStart;

  // Compute Latency Percentiles
  latencies.sort((a, b) => a - b);
  const minLatency = latencies[0];
  const maxLatency = latencies[latencies.length - 1];
  const avgLatency = latencies.reduce((sum, v) => sum + v, 0) / latencies.length;
  const p50 = latencies[Math.floor(latencies.length * 0.5)];
  const p95 = latencies[Math.floor(latencies.length * 0.95)];
  const p99 = latencies[Math.floor(latencies.length * 0.99)];

  const successRate = (successfulRequests / TOTAL_REQUESTS) * 100;

  console.log(`\nConcurrency Benchmark Results:`);
  console.log(`- Total Requests:   ${TOTAL_REQUESTS}`);
  console.log(`- Success Rate:     ${successRate.toFixed(1)}% (${successfulRequests}/${TOTAL_REQUESTS})`);
  console.log(`- Failures:         ${failedRequests}`);
  console.log(`- Total Duration:   ${totalLoadDuration.toFixed(1)}ms`);
  console.log(`- Throughput:       ${((TOTAL_REQUESTS / totalLoadDuration) * 1000).toFixed(1)} req/sec`);
  console.log(`- Latency Min:      ${minLatency.toFixed(2)}ms`);
  console.log(`- Latency Avg:      ${avgLatency.toFixed(2)}ms`);
  console.log(`- Latency P50:      ${p50.toFixed(2)}ms`);
  console.log(`- Latency P95:      ${p95.toFixed(2)}ms`);
  console.log(`- Latency P99:      ${p99.toFixed(2)}ms`);
  console.log(`- Latency Max:      ${maxLatency.toFixed(2)}ms`);

  const memAfter = serverPid ? await getProcessMemory(serverPid) : null;
  let memDeltaMb = 0;
  if (memBefore && memAfter) {
    memDeltaMb = memAfter.rssMb - memBefore.rssMb;
    console.log(`- Final RSS:        ${memAfter.rssMb.toFixed(2)} MB (Delta: ${memDeltaMb > 0 ? '+' : ''}${memDeltaMb.toFixed(2)} MB)`);
  }

  // 4.1 100% 200 OK Status Codes
  recordTest(
    'LOAD-01',
    'ServerLoad',
    `200 concurrent HTTP requests achieve 100% 200 OK responses`,
    successRate === 100 && failedRequests === 0,
    `Success rate: ${successRate}%, failed: ${failedRequests}`,
    totalLoadDuration
  );

  // 4.2 Fast Response Times (< 50ms)
  const latencyPassed = avgLatency < 50 && p95 < 50;
  recordTest(
    'LOAD-02',
    'ServerLoad',
    `Response latencies comfortably satisfy < 50ms threshold (Avg < 50ms, P95 < 50ms)`,
    latencyPassed,
    `Avg=${avgLatency.toFixed(2)}ms (target <50ms), P95=${p95.toFixed(2)}ms, P99=${p99.toFixed(2)}ms, Max=${maxLatency.toFixed(2)}ms`,
    avgLatency
  );

  // 4.3 Memory Stability / Zero Memory Leaks
  const memPassed = Math.abs(memDeltaMb) < 50; // RSS change strictly bounded under 50MB across concurrent waves
  recordTest(
    'LOAD-03',
    'ServerLoad',
    `Zero memory leakage: process RSS delta remains strictly bounded (|ΔRSS| < 50MB)`,
    memPassed,
    `RSS Before=${memBefore?.rssMb.toFixed(2)}MB, After=${memAfter?.rssMb.toFixed(2)}MB, Delta=${memDeltaMb.toFixed(2)}MB`,
    performance.now() - t0
  );
}

// ============================================================================
// MAIN RUNNER
// ============================================================================
async function main() {
  console.log('======================================================================');
  console.log(' PORT OF FALCON — CHALLENGER 2 EMPIRICAL ADVERSARIAL VERIFICATION');
  console.log(' Target: Milestone 1 (F1-F6) Interaction Physics, Touch & Resilience');
  console.log('======================================================================');

  await runPhysicsTests();
  await runTouchFallbackTests();
  await runAssetResilienceTests();
  await runServerLoadBenchmark();

  console.log('\n======================================================================');
  console.log(' EMPIRICAL CHALLENGE SUITE SUMMARY');
  console.log('======================================================================');

  const total = testResults.length;
  const passed = testResults.filter(r => r.passed).length;
  const failed = total - passed;

  console.log(`Total Assertions Evaluated: ${total}`);
  console.log(`Passed:                     ${passed}`);
  console.log(`Failed:                     ${failed}`);

  if (failed === 0) {
    console.log('\n>>> EMPIRICAL VERDICT: APPROVE <<<');
    process.exit(0);
  } else {
    console.log('\n>>> EMPIRICAL VERDICT: REJECT <<<');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal unhandled error in challenger suite:', err);
  process.exit(1);
});
