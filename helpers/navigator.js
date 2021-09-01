import puppeteer from 'puppeteer';

const getElementInPageBySelector = async (url, selector) => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: ['--start-maximized'],
  });
  const page = await browser.newPage();
  await page.goto(url);
  const foundElement = await page.$eval(selector, (el) => el.innerHTML);
  browser.close();
  return foundElement;
};

export default getElementInPageBySelector;
