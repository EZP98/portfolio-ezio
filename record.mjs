import puppeteer from 'puppeteer';
import { PuppeteerScreenRecorder } from 'puppeteer-screen-recorder';

const outputDir = '/Users/eziopappalardo/Documents/portfolio-ezio/public/templates';

async function record(name, url) {
  console.log(`Recording ${name}...`);
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const recorder = new PuppeteerScreenRecorder(page, {
    fps: 30,
    videoFrame: { width: 1280, height: 800 },
  });

  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise(r => setTimeout(r, 2000));

  await recorder.start(`${outputDir}/${name}.mp4`);

  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  const steps = 80;
  const stepSize = (scrollHeight - 800) / steps;

  for (let i = 0; i <= steps; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), i * stepSize);
    await new Promise(r => setTimeout(r, 100));
  }

  await new Promise(r => setTimeout(r, 500));
  await recorder.stop();
  await browser.close();
  console.log(`Done: ${name}`);
}

// Record only slate (updated profile image)
await record('slate', 'https://slate-6ls.pages.dev');
console.log('All done!');
