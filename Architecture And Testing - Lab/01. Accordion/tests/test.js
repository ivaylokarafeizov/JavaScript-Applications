const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

let browser, page;

describe('E2E tests', function () {
  this.timeout(6000);

  before(async () => {
    browser = await chromium.launch({ headless: false, slowMo: 500 });
  });

  after(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
  });

  afterEach(async () => {
    await page.close();
  });

  it('loads titles', async () => {
    await page.goto('http://localhost:5500/');
    await page.waitForSelector('.accordion .head span');

    const content = await page.textContent('#main');

    expect(content).to.contains('Scalable Vector Graphics');
    expect(content).to.contains('Open standard');
    expect(content).to.contains('Unix');
    expect(content).to.contains('ALGOL');
  });

  it('button “More” functionality', async () => {
    await page.goto('http://localhost:5500/');

    await page.click('text=More');
    await page.waitForSelector('.extra p');

    const text = await page.textContent('.extra p');

    expect(text).to.be.contain(
      'Scalable Vector Graphics (SVG) is an Extensible Markup Language'
    );
  });

  it('button “Less” functionality', async () => {
    await page.goto('http://localhost:5500/');
    await page.click('text=More');
    await page.waitForSelector('.extra p');
    await page.click('text=Less');

    const visible = await page.isVisible('.extra p');

    expect(visible).to.be.false;
  });
});
