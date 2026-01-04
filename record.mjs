import puppeteer from 'puppeteer';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const templates = [
  { name: 'slate', url: 'https://slate-6ls.pages.dev' },
  { name: 'orbit', url: 'https://orbit-zq4.pages.dev' },
  { name: 'nova', url: 'https://nova-edz.pages.dev' },
  { name: 'ferrero', url: 'https://ferrero-rocher-portfolio.pages.dev' },
  { name: 'obsidian', url: 'https://obsidian-cud.pages.dev' },
  { name: 'aurora', url: 'https://aurora-76x.pages.dev' },
];

const outputDir = './public/templates';
const framesDir = './temp-frames';

// Smooth easing
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

async function recordTemplate(template) {
  console.log(`Recording ${template.name}...`);

  const templateFramesDir = path.join(framesDir, template.name);
  if (fs.existsSync(templateFramesDir)) {
    fs.rmSync(templateFramesDir, { recursive: true });
  }
  fs.mkdirSync(templateFramesDir, { recursive: true });

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto(template.url, { waitUntil: 'networkidle2', timeout: 60000 });
  await sleep(2000);

  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  const scrollDistance = Math.min(pageHeight - 900, 600); // Scroll leggero

  // 15 secondi totali a 30fps = 450 frames
  const heroFrames = 90;    // 3 secondi hero statico
  const scrollFrames = 300; // 10 secondi scroll lento
  const endFrames = 60;     // 2 secondi pausa fine
  const totalFrames = heroFrames + scrollFrames + endFrames;

  for (let i = 0; i < totalFrames; i++) {
    let scrollY = 0;

    if (i < heroFrames) {
      // Primi 3 secondi: hero statico
      scrollY = 0;
    } else if (i < heroFrames + scrollFrames) {
      // 10 secondi: scroll lento con easing
      const scrollProgress = (i - heroFrames) / scrollFrames;
      const eased = easeInOutQuad(scrollProgress);
      scrollY = eased * scrollDistance;
    } else {
      // Ultimi 2 secondi: pausa in basso
      scrollY = scrollDistance;
    }

    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await sleep(16);

    await page.screenshot({
      path: path.join(templateFramesDir, `frame-${String(i).padStart(4, '0')}.png`),
      type: 'png'
    });
  }

  await browser.close();

  const outputPath = path.join(outputDir, `${template.name}.mp4`);
  try {
    execSync(`ffmpeg -y -framerate 30 -i "${templateFramesDir}/frame-%04d.png" -c:v libx264 -pix_fmt yuv420p -crf 20 "${outputPath}"`, { stdio: 'pipe' });
    console.log(`Done: ${template.name}`);
  } catch (e) {
    console.error(`Error: ${template.name}`, e.message);
  }

  fs.rmSync(templateFramesDir, { recursive: true });
}

async function main() {
  if (!fs.existsSync(framesDir)) {
    fs.mkdirSync(framesDir, { recursive: true });
  }

  for (const template of templates) {
    await recordTemplate(template);
  }

  if (fs.existsSync(framesDir)) {
    fs.rmSync(framesDir, { recursive: true });
  }

  console.log('All done!');
}

main().catch(console.error);
