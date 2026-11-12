import { spawn } from 'node:child_process';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';

const VIEWPORTS = [
  { name: 'iPhone SE (320px)', width: 320, height: 568 },
  { name: 'Android (360px)', width: 360, height: 640 },
  { name: 'iPhone Std (375px)', width: 375, height: 667 },
  { name: 'iPhone Max (414px)', width: 414, height: 896 },
  { name: 'iPad Port (768px)', width: 768, height: 1024 },
  { name: 'iPad Air (820px)', width: 820, height: 1180 },
  { name: 'iPad Pro (1024px)', width: 1024, height: 768 },
  { name: 'Laptop (1280px)', width: 1280, height: 800 },
  { name: 'Desktop (1440px)', width: 1440, height: 900 },
  { name: 'FHD 1080p (1920px)', width: 1920, height: 1080 },
  { name: 'QHD 1440p (2560px)', width: 2560, height: 1440 },
  { name: 'UHD 4K (3840px)', width: 3840, height: 2160 },
];

const TARGET_URL = 'http://localhost:3000/';
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const DEBUG_PORT = 9348;
const USER_DATA_DIR = path.join(os.tmpdir(), `chrome-clip-${Date.now()}`);

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function analyzeHeadlineClipping() {
  fs.mkdirSync(USER_DATA_DIR, { recursive: true });

  const chromeProcess = spawn(
    CHROME_PATH,
    [
      '--headless=new',
      `--remote-debugging-port=${DEBUG_PORT}`,
      `--user-data-dir=${USER_DATA_DIR}`,
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-gpu',
    ],
    { stdio: ['ignore', 'pipe', 'pipe'] }
  );

  await delay(1200);

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
  await delay(2000);

  console.log('='.repeat(95));
  console.log(' EMPIRICAL HEADLINE TEXT TRUNCATION & CLIPPING AUDIT');
  console.log(' Headline element: <h1 class="... text-[13vw] sm:text-[14vw] md:text-[15.5vw] lg:text-[17.5vw] ...">');
  console.log(' Container element: <div class="relative z-10 ... px-4 overflow-hidden ...">');
  console.log('='.repeat(95));
  console.log(
    'Viewport'.padEnd(22) +
    'clientWidth'.padEnd(14) +
    'scrollWidth'.padEnd(14) +
    'font-size'.padEnd(12) +
    'Clipped (px)'.padEnd(15) +
    '% Clipped'.padEnd(12) +
    'Status'
  );
  console.log('-'.repeat(95));

  const results = [];

  for (const vp of VIEWPORTS) {
    await send('Emulation.setDeviceMetricsOverride', {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
      mobile: vp.width < 768,
      screenOrientation: { angle: 0, type: 'portraitPrimary' },
    });
    await delay(300);

    const res = await send('Runtime.evaluate', {
      expression: `(() => {
        const h1 = document.querySelector('h1');
        const container = h1 ? h1.parentElement : null;
        const clientW = h1 ? h1.clientWidth : 0;
        const scrollW = h1 ? h1.scrollWidth : 0;
        const containerW = container ? container.clientWidth : 0;
        const style = h1 ? window.getComputedStyle(h1) : null;
        const fontSize = style ? style.fontSize : 'N/A';
        const clipped = Math.max(0, scrollW - clientW);
        const pct = scrollW > 0 ? ((clipped / scrollW) * 100).toFixed(1) : '0';
        
        // Measure first letter "A" and last letter "I" bounding boxes relative to viewport
        let firstLetterLeft = null;
        let lastLetterRight = null;
        try {
          const textNode = h1.firstChild;
          if (textNode) {
            const range1 = document.createRange();
            range1.setStart(textNode, 0);
            range1.setEnd(textNode, 1);
            const rect1 = range1.getBoundingClientRect();
            firstLetterLeft = Math.round(rect1.left);

            const range2 = document.createRange();
            const len = textNode.textContent.length;
            range2.setStart(textNode, len - 1);
            range2.setEnd(textNode, len);
            const rect2 = range2.getBoundingClientRect();
            lastLetterRight = Math.round(rect2.right);
          }
        } catch {}

        return {
          clientW,
          scrollW,
          containerW,
          fontSize,
          clipped,
          pct,
          firstLetterLeft,
          lastLetterRight
        };
      })()`,
      returnByValue: true,
    });

    const v = res.result.value;
    const isClipped = v.clipped > 2;
    const status = isClipped ? '❌ CLIPPED' : '✅ CONTAINED';

    console.log(
      vp.name.padEnd(22) +
      `${v.clientW}px`.padEnd(14) +
      `${v.scrollW}px`.padEnd(14) +
      `${v.fontSize}`.padEnd(12) +
      `${v.clipped}px`.padEnd(15) +
      `${v.pct}%`.padEnd(12) +
      status
    );

    results.push({ vp, v, isClipped });
  }

  console.log('-'.repeat(95));

  ws.close();
  chromeProcess.kill('SIGKILL');
  await delay(200);
  try {
    fs.rmSync(USER_DATA_DIR, { recursive: true, force: true });
  } catch {}

  return results;
}

analyzeHeadlineClipping().catch(console.error);
