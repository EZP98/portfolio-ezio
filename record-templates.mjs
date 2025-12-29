import puppeteer from 'puppeteer';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const templates = [
  { name: 'hanzo', url: 'https://hanzo-template.pages.dev' },
  { name: 'folio-ep', url: 'https://folio-ep.pages.dev' },
  { name: 'artemis', url: 'https://artemis-portfolio-bbr.pages.dev' },
  { name: 'ferrero', url: 'https://ferrero-rocher-portfolio.pages.dev' },
  { name: 'portfolio-dark', url: 'https://portfolio-dark.pages.dev' },
  { name: 'landing', url: 'https://landing-template-bp5.pages.dev' },
];

const outputDir = './public/templates';
const framesDir = './temp-frames';

async function recordTemplate(template) {
  console.log(`Recording ${template.name}...`);

  // Create frames directory
  const templateFramesDir = path.join(framesDir, template.name);
  if (fs.existsSync(templateFramesDir)) {
    fs.rmSync(templateFramesDir, { recursive: true });
  }
  fs.mkdirSync(templateFramesDir, { recursive: true });

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 }); // Un po' più alto

  await page.goto(template.url, { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000); // Wait for animations

  // Get page height
  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  const scrollDistance = Math.min(pageHeight - 1000, 3000); // Max 3000px scroll

  const totalFrames = 450; // 15 seconds at 30fps - molto lento
  const scrollPerFrame = scrollDistance / totalFrames;

  // Capture frames while scrolling
  for (let i = 0; i < totalFrames; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), i * scrollPerFrame);
    await sleep(33); // ~30fps
    await page.screenshot({
      path: path.join(templateFramesDir, `frame-${String(i).padStart(4, '0')}.png`),
      type: 'png'
    });
  }

  await browser.close();

  // Convert frames to video using ffmpeg
  const outputPath = path.join(outputDir, `${template.name}.mp4`);
  try {
    execSync(`ffmpeg -y -framerate 30 -i "${templateFramesDir}/frame-%04d.png" -c:v libx264 -pix_fmt yuv420p -crf 23 "${outputPath}"`, { stdio: 'pipe' });
    console.log(`✓ Created ${outputPath}`);
  } catch (e) {
    console.error(`Error creating video for ${template.name}:`, e.message);
  }

  // Cleanup frames
  fs.rmSync(templateFramesDir, { recursive: true });
}

async function main() {
  if (!fs.existsSync(framesDir)) {
    fs.mkdirSync(framesDir, { recursive: true });
  }

  for (const template of templates) {
    await recordTemplate(template);
  }

  // Cleanup
  if (fs.existsSync(framesDir)) {
    fs.rmSync(framesDir, { recursive: true });
  }

  console.log('Done!');
}

main().catch(console.error);
