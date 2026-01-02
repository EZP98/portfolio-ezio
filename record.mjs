import puppeteer from 'puppeteer';
import { PuppeteerScreenRecorder } from 'puppeteer-screen-recorder';

const outputDir = '/Users/eziopappalardo/Documents/portfolio-ezio/public/templates';

// Template card dimensions: ~384x400 (3 columns in 1200px container)
// Scale 2x for quality: 768x800
const VIDEO_WIDTH = 768;
const VIDEO_HEIGHT = 800;

async function record(name, url) {
  console.log(`Recording ${name}...`);
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: VIDEO_WIDTH, height: VIDEO_HEIGHT });

  const recorder = new PuppeteerScreenRecorder(page, {
    fps: 30,
    videoFrame: { width: VIDEO_WIDTH, height: VIDEO_HEIGHT },
  });

  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise(r => setTimeout(r, 2000));

  await recorder.start(`${outputDir}/${name}.mp4`);

  // Smooth slow scroll
  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  const steps = 150; // More steps = smoother
  const stepSize = (scrollHeight - VIDEO_HEIGHT) / steps;

  for (let i = 0; i <= steps; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), i * stepSize);
    await new Promise(r => setTimeout(r, 80)); // Slower scroll
  }

  await new Promise(r => setTimeout(r, 1000));
  await recorder.stop();
  await browser.close();
  console.log(`Done: ${name}`);
}

const templates = [
  { name: 'slate', url: 'https://slate-6ls.pages.dev' },
  { name: 'orbit', url: 'https://orbit-zq4.pages.dev' },
  { name: 'nova', url: 'https://nova-edz.pages.dev' },
  { name: 'ferrero', url: 'https://ferrero-rocher-portfolio.pages.dev' },
  { name: 'obsidian', url: 'https://obsidian-cud.pages.dev' },
  { name: 'aurora', url: 'https://aurora-76x.pages.dev' },
];

for (const t of templates) {
  await record(t.name, t.url);
}

console.log('All done!');
