import puppeteer from 'puppeteer';
import { PuppeteerScreenRecorder } from 'puppeteer-screen-recorder';

const outputDir = '/Users/eziopappalardo/Documents/portfolio-ezio/public/templates';

// MacBook Air resolution for realistic desktop view
const VIDEO_WIDTH = 1440;
const VIDEO_HEIGHT = 900;

async function record(name, url) {
  console.log(`Recording ${name}...`);
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: VIDEO_WIDTH, height: VIDEO_HEIGHT });

  const recorder = new PuppeteerScreenRecorder(page, {
    fps: 60, // Higher fps for smoother video
    videoFrame: { width: VIDEO_WIDTH, height: VIDEO_HEIGHT },
  });

  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise(r => setTimeout(r, 1500));

  await recorder.start(`${outputDir}/${name}.mp4`);

  // Inject smooth scroll animation into page
  const scrollDistance = await page.evaluate(() => {
    const maxScroll = Math.min(
      (document.body.scrollHeight - window.innerHeight) * 0.5,
      1800
    );
    return maxScroll;
  });

  // Smooth scroll animation using requestAnimationFrame
  // Down for 2.5s, pause 0.5s, up for 2s = 5s total loop
  await page.evaluate((distance) => {
    return new Promise((resolve) => {
      function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      }

      function smoothScroll(from, to, duration) {
        return new Promise((res) => {
          const start = performance.now();
          function animate(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeInOutQuad(progress);
            const current = from + (to - from) * eased;
            window.scrollTo(0, current);
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              res();
            }
          }
          requestAnimationFrame(animate);
        });
      }

      async function run() {
        await smoothScroll(0, distance, 2500);       // Scroll down (2.5s)
        await new Promise(r => setTimeout(r, 500)); // Pause at bottom
        await smoothScroll(distance, 0, 2000);       // Scroll up (2s)
        resolve();
      }
      run();
    });
  }, scrollDistance);

  await new Promise(r => setTimeout(r, 300));
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
