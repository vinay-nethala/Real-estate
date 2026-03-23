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

describe('Saved Searches', () => {
  it('should show empty state when no searches are saved', async () => {
    // Clear localStorage
    await page.goto(`${APP_URL}/saved-searches`, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.evaluate(() => localStorage.removeItem('savedSearches'));
    await page.reload({ waitUntil: 'networkidle2' });

    const noSaved = await page.$('[data-testid="no-saved-searches"]');
    expect(noSaved).toBeTruthy();
  });

  it('should save a search from properties page', async () => {
    await page.goto(`${APP_URL}/properties`, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForSelector('[data-testid="map-loaded"]', { timeout: 15000 });

    // Set some filters
    await page.click('[data-testid="price-min-input"]', { clickCount: 3 });
    await page.type('[data-testid="price-min-input"]', '500000');
    await page.select('[data-testid="bedrooms-select"]', '2');

    // Save the search
    await page.click('[data-testid="save-search-button"]');
    await page.waitForTimeout(500);

    // Type name and save
    const saveInput = await page.$('input[placeholder="Search name..."]');
    if (saveInput) {
      await saveInput.type('Test Search');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(500);
    }
  });

  it('should display saved search on saved searches page', async () => {
    await page.goto(`${APP_URL}/saved-searches`, { waitUntil: 'networkidle2' });
    await page.waitForTimeout(500);

    const searches = await page.$$('[data-testid^="saved-search-"]');
    expect(searches.length).toBeGreaterThan(0);

    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'saved-searches.png') });
  });

  it('should load a saved search and restore filters', async () => {
    const loadButtons = await page.$$('[data-testid^="load-search-"]');
    if (loadButtons.length > 0) {
      await loadButtons[0].click();
      await page.waitForNavigation({ waitUntil: 'networkidle2' });

      expect(page.url()).toContain('/properties');

      // Verify filters are restored
      const bedroomsValue = await page.$eval('[data-testid="bedrooms-select"]', el => el.value);
      expect(bedroomsValue).toBe('2');

      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'saved-search-loaded.png') });
    }
  });

  it('should delete a saved search', async () => {
    await page.goto(`${APP_URL}/saved-searches`, { waitUntil: 'networkidle2' });
    const deleteButtons = await page.$$('[data-testid^="delete-search-"]');
    const initialCount = deleteButtons.length;

    if (deleteButtons.length > 0) {
      await deleteButtons[0].click();
      await page.waitForTimeout(500);

      const remaining = await page.$$('[data-testid^="saved-search-"]');
      expect(remaining.length).toBe(initialCount - 1);
    }
  });
});
