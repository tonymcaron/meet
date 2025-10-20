import puppeteer from 'puppeteer';

describe('show/hide event details', () => {
  let browser;
  let page;

  beforeAll(async () => {
    try { // TROUBLESHOOTING
      console.log('Launching Puppeteer...'); // TROUBLESHOOTING
      browser = await puppeteer.launch({
        headless: false,
        slowMo: 250, // slow down to 250ms
        timeout: 0, // removes any puppeteer/browser timeout limitations (this isn't hte same as the timeout of jest)
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        args: ['--no-sandbox', '--disable-setuid-sandbox'], // TROUBLESHOOTING
        userDataDir: `./tmp/chrome_profile_${Date.now()}` // TROUBLESHOOTING
      });
      console.log('Browser launched successfully'); // TROUBLESHOOTING

      page = await browser.newPage();
      console.log('Navigating to page...');
      await page.goto('http://localhost:5173/');  // If Vercel app is running in a different port, update it here
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