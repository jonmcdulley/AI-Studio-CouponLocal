// prerender.js
// Runs after `vite build`. Spins up the built `dist/` folder as a static
// server, visits each route in a real headless browser, waits for React to
// render, then saves the fully-rendered HTML (with the correct canonical
// tag, title, and meta description per page) back into dist/ as static
// files. This is what Google's crawler and "view source" will see.

import puppeteer from 'puppeteer';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, 'dist');

// Add every route that needs its own indexed HTML file here.
const ROUTES = ['/', '/about', '/blog', '/compare'];

const PORT = 4173;

async function run() {
  // 1. Serve the built dist/ folder locally so the headless browser can
  //    load it exactly like a real visitor would.
  const app = express();
  app.use(express.static(distDir));
  // SPA fallback so client-side routes resolve to index.html when hit directly
  app.get('*', (req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
  const server = app.listen(PORT, () => {
    console.log(`[prerender] local static server running on :${PORT}`);
  });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const route of ROUTES) {
    const page = await browser.newPage();
    const url = `http://localhost:${PORT}${route}`;
    console.log(`[prerender] rendering ${url}`);

    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

    // Give React + useCanonical a moment to finish updating the DOM
    // (title, canonical tag, meta description) after initial mount.
    await new Promise((r) => setTimeout(r, 800));

    const html = await page.content();

    // Decide output path: '/' -> dist/index.html
    // '/about' -> dist/about/index.html (so Vercel serves it at /about)
    const outPath =
      route === '/'
        ? path.join(distDir, 'index.html')
        : path.join(distDir, route.replace(/^\//, ''), 'index.html');

    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html, 'utf-8');
    console.log(`[prerender] wrote ${outPath}`);

    await page.close();
  }

  await browser.close();
  server.close();
  console.log('[prerender] done.');
}

run().catch((err) => {
  console.error('[prerender] failed:', err);
  process.exit(1);
});
