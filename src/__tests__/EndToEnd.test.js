import puppeteer from 'puppeteer';

let browser;
let page;

beforeAll(async () => {

  browser = await puppeteer.launch({
    headless: true,
    slowMo: 250, // slow down to 250ms
    timeout: 0, // removes any puppeteer/browser timeout limitations (this isn't the same as the timeout of jest)
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    userDataDir: `./tmp/chrome_profile_${Date.now()}`
  });

  page = await browser.newPage();
  await page.goto('http://localhost:5173/');
  await page.waitForSelector('#event-list .event', { timeout: 60000 }); //Increased Puppeteer timeout for EndToEnd test
});

afterAll(async () => {
  if (browser) {
    await browser.close();
  }
});

describe('show/hide event details', () => {

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });

});

describe('Filter events by city', () => {

  // Scenario 1: When user hasn’t searched for a specific city, show upcoming events from all cities
  test('When user hasn’t searched for a specific city, show upcoming events from all cities', async () => {
    const events = await page.$$eval('#event-list .event', elements => elements.length);
    expect(events).toBe(32);
  });

  // Scenario 2: User should see a list of suggestions when they search for a city
  test('User should see a list of suggestions when they search for a city', async () => {
    await page.click('#city-search input');
    await page.type('#city-search input', 'Berlin');
    await page.waitForSelector('#city-search ul li');
    const suggestions = await page.$$eval('#city-search ul li', els => els.map(e => e.textContent));
    expect(suggestions.length).toBeGreaterThan(0);
    expect(suggestions[0]).toMatch(/Berlin/i);
  });

  // Scenario 3: User can select a city from the suggested list
  test('User can select a city from the suggested list', async () => {
    // Type “Berlin”
    await page.click('#city-search input', { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type('#city-search input', 'Berlin');
    await page.waitForSelector('#city-search .suggestions li');

    // Click first suggestion
    await page.click('#city-search .suggestions li');

    // Check that input value has updated to “Berlin, Germany”
    const inputValue = await page.$eval('#city-search input', el => el.value);
    expect(inputValue).toBe('Berlin, Germany');

    // Wait for events to load
    await page.waitForSelector('#event-list .event', { visible: true });
    const locations = await page.$$eval('#event-list .event p:first-of-type', els => els.map(e => e.textContent)
    );

    // Ensure all events are in Berlin
    const allInBerlin = locations.every(loc => loc.includes('Berlin'));
    expect(allInBerlin).toBe(true);
  });
});
