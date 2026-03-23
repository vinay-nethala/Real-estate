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

describe('Map Interactions', () => {
  beforeAll(async () => {
    await page.goto(`${APP_URL}/properties`, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForSelector('[data-testid="map-loaded"]', { timeout: 15000 });
  });

  it('should highlight property card when marker is clicked', async () => {
    const markers = await page.$$('[data-testid^="map-marker-"]');

    if (markers.length > 0) {
      // Get the first marker's property ID
      const testId = await page.evaluate(el => el.dataset.testid, markers[0]);
      const propertyId = testId.replace('map-marker-', '');

      await markers[0].click();
      await page.waitForTimeout(500);

      // Check if the corresponding card has highlight class
      const card = await page.$(`[data-testid="property-card-${propertyId}"]`);
      if (card) {
        const hasHighlight = await page.evaluate(
          el => el.classList.contains('property-card-highlight') || el.className.includes('ring'),
          card
        );
        expect(hasHighlight).toBeTruthy();
      }
    }

    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'map-interactions.png') });
  });

  it('should navigate to property detail when card is clicked', async () => {
    const card = await page.$('[data-testid^="property-card-"]');
    if (card) {
      const testId = await page.evaluate(el => el.dataset.testid, card);
      const propertyId = testId.replace('property-card-', '');

      await card.click();
      await page.waitForNavigation({ waitUntil: 'networkidle2' });

      expect(page.url()).toContain(`/property/${propertyId}`);
    }
  });
});
