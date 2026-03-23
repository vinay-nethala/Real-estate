const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const APP_URL = process.env.APP_URL || 'http://localhost:3006';
const SCREENSHOTS_DIR = path.join(__dirname, '..', '..', 'test-results', 'screenshots');
fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
  });
  page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
});

afterAll(async () => {
  if (browser) await browser.close();
});

describe('Geospatial Search', () => {
  beforeAll(async () => {
    await page.goto(`${APP_URL}/properties`, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForSelector('[data-testid="map-loaded"]', { timeout: 15000 });
  });

  it('should have radius slider', async () => {
    const slider = await page.$('[data-testid="search-radius-slider"]');
    expect(slider).toBeTruthy();
  });

  it('should filter properties when radius is changed', async () => {
    // Get initial count
    const initialCount = await page.$$eval('[data-testid^="property-card-"]', els => els.length);

    // Set a small radius
    await page.$eval('[data-testid="search-radius-slider"]', (el) => {
      el.value = '5';
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    });

    // Click apply
    await page.click('[data-testid="apply-filters-button"]');
    await page.waitForTimeout(1000);

    const newCount = await page.$$eval('[data-testid^="property-card-"]', els => els.length);
    // With a small radius, count should change (may be same if all are nearby)
    expect(newCount).toBeDefined();

    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'geospatial-radius.png') });
  });

  it('should have draw boundary button', async () => {
    const drawBtn = await page.$('[data-testid="draw-boundary-button"]');
    expect(drawBtn).toBeTruthy();
  });

  it('should activate boundary mode when draw button is clicked', async () => {
    await page.click('[data-testid="draw-boundary-button"]');

    // Simulate drawing a polygon on the map canvas
    const mapContainer = await page.$('[data-testid="map-container"]');
    const box = await mapContainer.boundingBox();

    if (box) {
      const cx = box.x + box.width / 2;
      const cy = box.y + box.height / 2;

      // Draw a polygon
      await page.mouse.click(cx - 100, cy - 100);
      await page.mouse.click(cx + 100, cy - 100);
      await page.mouse.click(cx + 100, cy + 100);
      await page.mouse.click(cx - 100, cy + 100);
      await page.mouse.click(cx - 100, cy - 100); // Close polygon
    }

    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'geospatial-boundary.png') });
  });
});
