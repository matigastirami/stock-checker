#! /usr/bin/env node
const { parseArgs } = require('../helpers');
const puppeteer = require('puppeteer');

// const searchValue = await page.$eval('#search', (el) => el.value);

const { p, s } = require('yargs/yargs')(process.argv.slice(2)).parse();

const navigate = async (url, selector) => {
    const browser = await puppeteer.launch({ headless: false, defaultViewport: null, args: ['--start-maximized'] });
    const page = await browser.newPage();
    await page.goto(url);
    let found = await page.$eval(selector, (el) => el.innerHTML);
    browser.close();
    return found;
}

const checkForStock = (text) => {
    let rg = new RegExp('\\d+', 'gi');
    let result = rg.exec(text);
    return Number(result[0]) !== 0;
}

(async() => {
    const result = await navigate(p, s);

    let availableStock = checkForStock(result);

    if(availableStock) {
        console.log("Available stock");
        return;
    }

    console.log("No stock");
})();
