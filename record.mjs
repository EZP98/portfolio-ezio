import puppeteer from 'puppeteer';
import { PuppeteerScreenRecorder } from 'puppeteer-screen-recorder';

const outputDir = '/Users/eziopappalardo/Documents/portfolio-ezio/public/templates';

// MacBook Air resolution for realistic desktop view
const VIDEO_WIDTH = 1440;
const VIDEO_HEIGHT = 900;

// Easing function for smooth acceleration/deceleration
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

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
  await new Promise(r => setTimeout(r, 1500)); // Wait for animations

  await recorder.start(`${outputDir}/${name}.mp4`);

  // Get scroll distance (only scroll ~60% of page for lighter feel)
  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  const maxScroll = Math.min((scrollHeight - VIDEO_HEIGHT) * 0.6, 2000);

  // 5 seconds at 30fps = 150 frames
  const totalFrames = 150;
  const frameDelay = 1000 / 30; // ~33ms per frame

  for (let frame = 0; frame <= totalFrames; frame++) {
    const progress = frame / totalFrames;
    const easedProgress = easeInOutCubic(progress);
    const scrollY = easedProgress * maxScroll;

    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await new Promise(r => setTimeout(r, frameDelay));
  }

  await new Promise(r => setTimeout(r, 500));
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
