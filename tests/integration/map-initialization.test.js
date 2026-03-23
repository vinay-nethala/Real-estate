const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const APP_URL = process.env.APP_URL || 'http://localhost:3006';
const RESULTS_DIR = path.join(__dirname, '..', '..', 'test-results');
const SCREENSHOTS_DIR = path.join(RESULTS_DIR, 'screenshots');

// Ensure output dirs exist
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

describe('Map Initialization', () => {
  it('should load the properties page', async () => {
    await page.goto(`${APP_URL}/properties`, { waitUntil: 'networkidle2', timeout: 30000 });
    const container = await page.$('[data-testid="properties-container"]');
    expect(container).toBeTruthy();
  });

  it('should display the map container', async () => {
    const mapContainer = await page.$('[data-testid="map-container"]');
    expect(mapContainer).toBeTruthy();
  });

  it('should indicate map has loaded', async () => {
    await page.waitForSelector('[data-testid="map-loaded"]', { timeout: 15000 });
    const mapLoaded = await page.$('[data-testid="map-loaded"]');
    expect(mapLoaded).toBeTruthy();
  });

  it('should display property list', async () => {
    const propertyList = await page.$('[data-testid="property-list"]');
    expect(propertyList).toBeTruthy();
  });

  it('should display view toggle', async () => {
    const viewToggle = await page.$('[data-testid="view-toggle"]');
    expect(viewToggle).toBeTruthy();
  });

  it('should display map markers for properties', async () => {
    const markers = await page.$$('[data-testid^="map-marker-"]');
    expect(markers.length).toBeGreaterThan(0);
  });

  it('should take a screenshot of loaded map', async () => {
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'map-initialization.png') });
  });
});
