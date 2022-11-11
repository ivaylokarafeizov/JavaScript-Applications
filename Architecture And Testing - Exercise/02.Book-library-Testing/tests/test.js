const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

let browser, page;

describe('Book library tests', function () {
  this.timeout(60000);

  before(async () => {
    browser = await chromium.launch({ headless: false, slowMo: 500 });
  });

  after(async () => await browser.close());

  beforeEach(async () => (page = await browser.newPage()));

  afterEach(async () => await page.close());

  it('load books', async () => {
    await page.goto('http://localhost:5500');
    await page.click('#loadBooks');

    const books = await page.$$eval('tbody > tr > td', (r) =>
      r.map((td) => td.textContent)
    );

    expect(books).to.includes("Harry Potter and the Philosopher's Stone");
    expect(books).to.includes('J.K.Rowling');
    expect(books).to.includes('C# Fundamentals');
    expect(books).to.includes('Svetlin Nakov');
  });

  it('add book', async () => {
    await page.goto('http://localhost:5500');
    await page.click('#loadBooks');
    await page.fill('input[name=title]', 'How to Win Friends');
    await page.fill('input[name=author]', 'Dale Carnegie');
    await page.click('form > button');
    await page.click('#loadBooks');

    const books = await page.$$eval('tbody > tr > td', (r) =>
      r.map((td) => td.textContent)
    );

    expect(books).to.includes('How to Win Friends');
    expect(books).to.includes('Dale Carnegie');
  });

  it('add book with empty fields', async () => {
    await page.goto('http://localhost:5500');
    await page.click('#loadBooks');
    await page.fill('input[name=title]', '');
    await page.fill('input[name=author]', '');
    await page.click('form > button');
    await page.click('#loadBooks');

    const books = await page.$$eval('tbody > tr > td', (r) =>
      r.map((td) => td.textContent)
    );

    expect(books).includes("Harry Potter and the Philosopher's Stone");
    expect(books).includes('J.K.Rowling');
    expect(books).includes('C# Fundamentals');
    expect(books).includes('Svetlin Nakov');
  });

  it('edit book', async () => {
    await page.goto('http://localhost:5500');
    await page.click('#loadBooks');
    await page.click('tbody > tr > td > button:nth-child(1)');
    await page.fill(
      'input[name=title]',
      "Harry Potter and the Philosopher's Stone edited"
    );
    await page.fill('input[name=author]', 'J.K.Rowling edited');
    await page.click('text=Save');
    await page.click('#loadBooks');

    const books = await page.$$eval('tbody > tr > td', (r) =>
      r.map((td) => td.textContent)
    );

    expect(books).includes("Harry Potter and the Philosopher's Stone edited");
    expect(books).includes('J.K.Rowling edited');
  });

  it('delete book', async () => {
    await page.goto('http://localhost:5500');
    await page.click('#loadBooks');

    await page.click('text=Delete');
    await page.click('#loadBooks');

    const books = await page.$$eval('tbody > tr > td', (r) =>
      r.map((td) => td.textContent)
    );

    expect(books[0]).to.equal('C# Fundamentals');
    expect(books[1]).to.equal('Svetlin Nakov');
  });
});
