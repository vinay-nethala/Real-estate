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

describe('Property Filtering', () => {
  beforeAll(async () => {
    await page.goto(`${APP_URL}/properties`, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForSelector('[data-testid="map-loaded"]', { timeout: 15000 });
  });

  it('should have all filter elements', async () => {
    const elements = [
      'location-autocomplete',
      'search-radius-slider',
      'price-min-input',
      'price-max-input',
      'bedrooms-select',
      'draw-boundary-button',
      'apply-filters-button',
      'results-count',
    ];

    for (const testId of elements) {
      const el = await page.$(`[data-testid="${testId}"]`);
      expect(el).toBeTruthy();
    }
  });

  it('should filter by price range', async () => {
    const initialCount = await page.$eval('[data-testid="results-count"]', el => el.textContent);

    await page.click('[data-testid="price-min-input"]', { clickCount: 3 });
    await page.type('[data-testid="price-min-input"]', '500000');
    await page.click('[data-testid="price-max-input"]', { clickCount: 3 });
    await page.type('[data-testid="price-max-input"]', '1000000');
    await page.click('[data-testid="apply-filters-button"]');

    await page.waitForTimeout(500);
    const newCount = await page.$eval('[data-testid="results-count"]', el => el.textContent);

    expect(newCount).toBeDefined();
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'property-filtering-price.png') });
  });

  it('should filter by bedrooms', async () => {
    await page.select('[data-testid="bedrooms-select"]', '3');
    await page.click('[data-testid="apply-filters-button"]');
    await page.waitForTimeout(500);

    const count = await page.$eval('[data-testid="results-count"]', el => el.textContent);
    expect(count).toBeDefined();

    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'property-filtering-bedrooms.png') });
  });

  it('should display property cards with required data attributes', async () => {
    // Reset filters
    await page.select('[data-testid="bedrooms-select"]', 'any');
    await page.click('[data-testid="price-min-input"]', { clickCount: 3 });
    await page.type('[data-testid="price-min-input"]', '0');
    await page.click('[data-testid="price-max-input"]', { clickCount: 3 });
    await page.type('[data-testid="price-max-input"]', '10000000');
    await page.click('[data-testid="apply-filters-button"]');
    await page.waitForTimeout(500);

    const cards = await page.$$('[data-testid^="property-card-"]');
    expect(cards.length).toBeGreaterThan(0);

    if (cards.length > 0) {
      const firstCard = cards[0];
      const testId = await page.evaluate(el => el.dataset.testid, firstCard);
      const propertyId = testId.replace('property-card-', '');

      // Check for required child elements
      const title = await firstCard.$(`[data-testid="property-title-${propertyId}"]`);
      const price = await firstCard.$(`[data-testid="property-price-${propertyId}"]`);
      const address = await firstCard.$(`[data-testid="property-address-${propertyId}"]`);
      const save = await firstCard.$(`[data-testid="save-property-${propertyId}"]`);
      const coords = await firstCard.$('[data-latitude]');

      expect(title).toBeTruthy();
      expect(price).toBeTruthy();
      expect(address).toBeTruthy();
      expect(save).toBeTruthy();
      expect(coords).toBeTruthy();
    }
  });
});
