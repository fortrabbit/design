import { execFileSync } from 'node:child_process';
import { chromium } from 'playwright';
import { mkdirSync, readFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));
const out = join(dir, 'display');
const claims = JSON.parse(readFileSync(join(dir, 'claims.json'), 'utf8'));
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const jobs = [];
for (const claim of claims) {
  for (const size of ['1200x628', '1200x1200', '960x1200']) {
    jobs.push({ hash: `terminal-${size}-${claim}`, file: `terminal-${size}-${slug(claim)}.png` });
  }
}
jobs.push({ hash: 'logo-1200x1200', file: 'logo-1200x1200.png' }, { hash: 'logo-1200x300', file: 'logo-1200x300.png' });

rmSync(out, { recursive: true, force: true });
mkdirSync(out);

const browser = await chromium.launch();
for (const { hash, file } of jobs) {
  const [width, height] = hash.split('-')[1].split('x').map(Number);
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(`file://${join(dir, 'template.html')}#${encodeURIComponent(hash)}`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(out, file) });
  await page.close();
  console.log(file);
}
await browser.close();

// Flat colors quantize without visible loss; Google re-encodes for serving, the smaller files only help the repo.
execFileSync('pngquant', ['--force', '--ext', '.png', '--quality', '80-100', '--skip-if-larger', ...jobs.map(({ file }) => join(out, file))]);
