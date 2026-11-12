import { spawn } from 'node:child_process';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';

const VIEWPORTS = [
  // Ultra-narrow mobile
  { name: 'Ultra-narrow Mobile (iPhone SE)', width: 320, height: 568, category: 'mobile' },
  { name: 'Standard Android (360px)', width: 360, height: 640, category: 'mobile' },
  { name: 'iPhone Standard (375px)', width: 375, height: 667, category: 'mobile' },
  { name: 'iPhone Max / Plus (414px)', width: 414, height: 896, category: 'mobile' },

  // Tablets
  { name: 'iPad Portrait (768px)', width: 768, height: 1024, category: 'tablet' },
  { name: 'iPad Air (820px)', width: 820, height: 1180, category: 'tablet' },
  { name: 'iPad Pro / Landscape (1024px)', width: 1024, height: 768, category: 'tablet' },

  // Laptops & Desktops
  { name: 'Compact Laptop (1280px)', width: 1280, height: 800, category: 'desktop' },
  { name: 'MacBook Pro / Desktop (1440px)', width: 1440, height: 900, category: 'desktop' },
  { name: 'FHD 1080p Desktop (1920px)', width: 1920, height: 1080, category: 'desktop' },
  { name: 'QHD 1440p Monitor (2560px)', width: 2560, height: 1440, category: 'desktop' },
  { name: 'UHD 4K Display (3840px)', width: 3840, height: 2160, category: 'desktop' },
];

const TARGET_PORT = process.env.PORT || 3000;
const TARGET_URL = `http://localhost:${TARGET_PORT}/`;
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const DEBUG_PORT = 9345;
const USER_DATA_DIR = path.join(os.tmpdir(), `chrome-test-profile-${Date.now()}`);

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runViewportAudit() {
  console.log('='.repeat(80));
  console.log(` EMPIRICAL CHALLENGER 1: VIEWPORT STRESS TEST HARNESS`);
  console.log(` Target URL: ${TARGET_URL}`);
  console.log(` Engine: Google Chrome Headless via Chrome DevTools Protocol (CDP)`);
  console.log('='.repeat(80));

  fs.mkdirSync(USER_DATA_DIR, { recursive: true });

  // 1. Launch Headless Chrome
  console.log(`[1/4] Launching Google Chrome on debug port ${DEBUG_PORT}...`);
  const chromeProcess = spawn(
    CHROME_PATH,
    [
      '--headless=new',
      `--remote-debugging-port=${DEBUG_PORT}`,
      `--user-data-dir=${USER_DATA_DIR}`,
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-gpu',
      '--disable-extensions',
    ],
    { stdio: ['ignore', 'pipe', 'pipe'] }
  );

  // Wait for Chrome to listen
  await delay(1200);

  // 2. Create new page target pointing to TARGET_URL
  console.log(`[2/4] Opening page target for ${TARGET_URL}...`);
  const newPage = await new Promise((resolve, reject) => {
    const req = http.request(
      `http://127.0.0.1:${DEBUG_PORT}/json/new?${encodeURIComponent(TARGET_URL)}`,
      { method: 'PUT' },
      (res) => {
        let d = '';
        res.on('data', (c) => (d += c));
        res.on('end', () => resolve(JSON.parse(d)));
      }
    );
    req.on('error', reject);
    req.end();
  });

  const ws = new WebSocket(newPage.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));

  let reqId = 1;
  function send(method, params = {}) {
    const id = reqId++;
    return new Promise((resolve, reject) => {
      const handler = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === id) {
          ws.removeEventListener('message', handler);
          if (msg.error) reject(new Error(JSON.stringify(msg.error)));
          else resolve(msg.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Page.navigate', { url: TARGET_URL });

  // Wait for full layout and CSS stylesheet resolution
  console.log(`[3/4] Hydrating page assets & font tokens (2000ms)...`);
  await delay(2000);

  // 3. Loop across all 12 viewports
  console.log(`[4/4] Executing stress tests across ${VIEWPORTS.length} viewports...\n`);

  const results = [];

  for (const vp of VIEWPORTS) {
    const isMobile = vp.category === 'mobile';

    // Set viewport dimensions
    await send('Emulation.setDeviceMetricsOverride', {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
      mobile: isMobile,
      screenOrientation: { angle: 0, type: 'portraitPrimary' },
    });

    // Force layout flush and allow Framer Motion springs to settle
    await delay(350);

    // Evaluate empirical layout metrics inside page context
    const evalResult = await send('Runtime.evaluate', {
      expression: `(() => {
        const docElem = document.documentElement;
        const body = document.body;
        const innerW = window.innerWidth;
        const innerH = window.innerHeight;
        const docScrollW = docElem.scrollWidth;
        const bodyScrollW = body.scrollWidth;
        const maxScrollW = Math.max(docScrollW, bodyScrollW);
        const overflowPixels = Math.max(0, maxScrollW - innerW);

        // Sections and Containers
        const main = document.querySelector('main');
        const hero = document.querySelector('section[aria-label="Hero Section"]');
        const h1 = document.querySelector('h1');
        const subtitle = hero ? hero.querySelector('p') : null;
        
        // Find avatar container: look for .aspect-square
        const avatarWrapper = document.querySelector('.aspect-square');
        const avatarAbsoluteContainer = avatarWrapper ? avatarWrapper.closest('.absolute') : null;

        const nav = document.querySelector('header');
        const footer = document.querySelector('footer');

        // Computed styles
        const mainStyle = main ? window.getComputedStyle(main) : null;
        const heroStyle = hero ? window.getComputedStyle(hero) : null;
        const h1Style = h1 ? window.getComputedStyle(h1) : null;

        // Bounding rects
        const h1Rect = h1 ? h1.getBoundingClientRect() : null;
        const subRect = subtitle ? subtitle.getBoundingClientRect() : null;
        const avatarRect = avatarAbsoluteContainer ? avatarAbsoluteContainer.getBoundingClientRect() : null;
        const navRect = nav ? nav.getBoundingClientRect() : null;
        const footerRect = footer ? footer.getBoundingClientRect() : null;

        // Check if h1 wraps onto multiple lines
        let h1LineCount = 1;
        if (h1 && h1Rect) {
          const fontSize = parseFloat(h1Style.fontSize) || 16;
          const lineHeight = parseFloat(h1Style.lineHeight) || (fontSize * 0.88);
          h1LineCount = Math.max(1, Math.round(h1Rect.height / lineHeight));
        }

        // Check if h1 overflows its parent or screen
        const h1OverflowsScreen = h1Rect ? (h1Rect.width > innerW + 1 || h1Rect.left < -1 || h1Rect.right > innerW + 1) : false;
        const h1InternalScroll = h1 ? (h1.scrollWidth > h1.clientWidth + 2) : false;

        // Z-Index layer checks
        const navZ = nav ? parseInt(window.getComputedStyle(nav).zIndex, 10) : null;
        const avatarZ = avatarAbsoluteContainer ? parseInt(window.getComputedStyle(avatarAbsoluteContainer).zIndex, 10) : null;
        const h1ParentZ = (h1 && h1.parentElement) ? parseInt(window.getComputedStyle(h1.parentElement).zIndex, 10) : null;
        const footerZ = footer ? parseInt(window.getComputedStyle(footer).zIndex, 10) : null;

        // Bounding overlaps
        const avatarOverlapsNav = (avatarRect && navRect) ? (avatarRect.top < navRect.bottom) : false;
        const avatarOverlapsFooter = (avatarRect && footerRect) ? (avatarRect.bottom > footerRect.top) : false;

        // Check nav links wrap / overflow
        const navUl = nav ? nav.querySelector('ul') : null;
        const navUlScrollW = navUl ? navUl.scrollWidth : 0;
        const navUlClientW = navUl ? navUl.clientWidth : 0;
        const navLinksOverflow = navUlScrollW > navUlClientW + 1;

        // Check status pill visibility
        const statusPill = nav ? nav.querySelector('div[title*="Tier III"]') : null;
        const statusPillVisible = statusPill ? (window.getComputedStyle(statusPill).display !== 'none') : false;

        return JSON.stringify({
          innerW,
          innerH,
          docScrollW,
          bodyScrollW,
          maxScrollW,
          overflowPixels,
          mainOverflowX: mainStyle ? mainStyle.overflowX : 'unknown',
          heroOverflowX: heroStyle ? heroStyle.overflowX : 'unknown',
          h1: {
            text: h1 ? h1.innerText.trim() : null,
            fontSize: h1Style ? h1Style.fontSize : null,
            whiteSpace: h1Style ? h1Style.whiteSpace : null,
            width: h1Rect ? Math.round(h1Rect.width) : null,
            height: h1Rect ? Math.round(h1Rect.height) : null,
            left: h1Rect ? Math.round(h1Rect.left) : null,
            right: h1Rect ? Math.round(h1Rect.right) : null,
            h1LineCount,
            h1OverflowsScreen,
            h1InternalScroll,
          },
          subtitle: {
            text: subtitle ? subtitle.innerText.trim() : null,
            width: subRect ? Math.round(subRect.width) : null,
            scrollW: subtitle ? subtitle.scrollWidth : null,
          },
          zIndexes: {
            navZ,
            avatarZ,
            h1ParentZ,
            footerZ,
          },
          collisions: {
            avatarOverlapsNav,
            avatarOverlapsFooter,
            navLinksOverflow,
          },
          statusPillVisible,
        });
      })()`,
      returnByValue: true,
    });

    const m = JSON.parse(evalResult.result.value);

    // Evaluate verdicts
    const zeroOverflow = m.overflowPixels <= 0;
    const clipApplied = m.mainOverflowX === 'clip' || m.mainOverflowX === 'hidden' || m.heroOverflowX === 'clip';
    const h1NoWrap = m.h1.h1LineCount === 1;
    const h1Contained = !m.h1.h1OverflowsScreen && !m.h1.h1InternalScroll;
    const zIndexHierarchyCorrect = (m.zIndexes.navZ === 30) && (m.zIndexes.footerZ === 30) && (m.zIndexes.avatarZ === 20) && (m.zIndexes.h1ParentZ === 10);
    const noNavBlowout = !m.collisions.navLinksOverflow;

    const passed = zeroOverflow && clipApplied && h1NoWrap && h1Contained && zIndexHierarchyCorrect && noNavBlowout;

    results.push({
      vp,
      m,
      checks: {
        zeroOverflow,
        clipApplied,
        h1NoWrap,
        h1Contained,
        zIndexHierarchyCorrect,
        noNavBlowout,
      },
      passed,
    });

    // Console Output for this viewport
    const statusTag = passed ? '✅ PASS' : '❌ FAIL';
    console.log(`--- [${statusTag}] ${vp.name} (${vp.width}x${vp.height}) ---`);
    console.log(`  • Viewport: ${m.innerW}px | scrollWidth: ${m.maxScrollW}px | Overflow: ${m.overflowPixels}px (overflow-x: main=${m.mainOverflowX}, hero=${m.heroOverflowX})`);
    console.log(`  • Headline H1: "${m.h1.text}" | font-size: ${m.h1.fontSize} | box: ${m.h1.width}x${m.h1.height}px | lines: ${m.h1.h1LineCount} | whitespace: ${m.h1.whiteSpace}`);
    console.log(`  • Headline bounds check: screen-contained=${!m.h1.h1OverflowsScreen} | internal-scroll=${m.h1.h1InternalScroll} (left: ${m.h1.left}px, right: ${m.h1.right}px)`);
    console.log(`  • Z-Index layers: nav=${m.zIndexes.navZ}, avatar=${m.zIndexes.avatarZ}, headline=${m.zIndexes.h1ParentZ}, footer=${m.zIndexes.footerZ}`);
    console.log(`  • Layout collisions: avatar/nav=${m.collisions.avatarOverlapsNav}, avatar/footer=${m.collisions.avatarOverlapsFooter}, nav-links-overflow=${m.collisions.navLinksOverflow}`);
    console.log(`  • Status Pill: ${m.statusPillVisible ? 'VISIBLE (Tier III Live)' : 'HIDDEN (< lg breakpoint)'}\n`);
  }

  // Teardown
  try {
    ws.close();
  } catch {}
  try {
    chromeProcess.kill('SIGKILL');
  } catch {}
  await delay(300);
  try {
    fs.rmSync(USER_DATA_DIR, { recursive: true, force: true });
  } catch {}

  // Summary
  console.log('='.repeat(80));
  console.log(' EMPIRICAL STRESS TEST SUMMARY TABLE:');
  console.log('='.repeat(80));
  console.log(
    'Viewport'.padEnd(35) +
    'Dimensions'.padEnd(14) +
    'Overflow'.padEnd(12) +
    'H1 Font'.padEnd(14) +
    'H1 Lines'.padEnd(10) +
    'Status'
  );
  console.log('-'.repeat(80));

  let totalPassed = 0;
  for (const r of results) {
    if (r.passed) totalPassed++;
    const dim = `${r.vp.width}x${r.vp.height}`;
    const over = `${r.m.overflowPixels}px`;
    const fsize = r.m.h1.fontSize || 'N/A';
    const lines = `${r.m.h1.h1LineCount}`;
    const tag = r.passed ? 'PASS' : 'FAIL';
    console.log(
      r.vp.name.padEnd(35) +
      dim.padEnd(14) +
      over.padEnd(12) +
      fsize.padEnd(14) +
      lines.padEnd(10) +
      tag
    );
  }
  console.log('-'.repeat(80));
  console.log(`Total: ${totalPassed} / ${results.length} viewports PASSED.`);
  console.log('='.repeat(80));

  return results;
}

runViewportAudit().catch((err) => {
  console.error('Fatal audit failure:', err);
  process.exit(1);
});
