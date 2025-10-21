import puppeteer from 'puppeteer';

describe('show/hide event details', () => {
  let browser;
  let page;

  beforeAll(async () => {
    try { // TROUBLESHOOTING
      console.log('Launching Puppeteer...'); // TROUBLESHOOTING
      browser = await puppeteer.launch({
        headless: true,
        slowMo: 250, // slow down to 250ms
        timeout: 0, // removes any puppeteer/browser timeout limitations (this isn't hte same as the timeout of jest)
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        args: ['--no-sandbox', '--disable-setuid-sandbox'], // TROUBLESHOOTING
        userDataDir: `./tmp/chrome_profile_${Date.now()}` // TROUBLESHOOTING
      });
      console.log('Browser launched successfully'); // TROUBLESHOOTING

      page = await browser.newPage();
      console.log('Navigating to page...');
      await page.goto('http://localhost:5173/');
      console.log('Page loaded, waiting for event selector...'); // TROUBLESHOOTING
      await page.waitForSelector('.event', { timeout: 10000 });
      console.log('Event selector found'); // TROUBLESHOOTING
    } catch (err) {// TROUBLESHOOTING
      console.error('Puppeteer failed to launch or load', err); // TROUBLESHOOTING
      throw err;
    }
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });

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
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // adjust if needed
      timeout: 0
    });
    page = await browser.newPage();
    await page.goto('http://localhost:5173/');
    await page.waitForSelector('#city-search');
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });

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
    await page.waitForSelector('#city-search ul li');

    // Click first suggestion
    await page.click('#city-search ul li');

    // Check that input value has updated to “Berlin, Germany”
    const inputValue = await page.$eval('#city-search input', el => el.value);
    expect(inputValue).toBe('Berlin, Germany');

    // Verify that only Berlin events are shown
    const events = await page.$$eval('#event-list .event', elements => elements.length);
    expect(events).toBeGreaterThan(0);

    // Verify all events are located in Berlin
    const locations = await page.$$eval('#event-list .event p', els => els.map(e => e.textContent));
    const allInBerlin = locations.every(loc => loc.includes('Berlin'));
    expect(allInBerlin).toBe(true);
  });
});
