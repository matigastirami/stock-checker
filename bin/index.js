#! /usr/bin/env node
import { argvObject } from "../helpers/index.js";
import puppeteer from "puppeteer";

const { p, s } = argvObject;

const navigate = async (url, selector) => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
  const page = await browser.newPage();
  await page.goto(url);
  let found = await page.$eval(selector, (el) => el.innerHTML);
  browser.close();
  return found;
};

const getFirstNumberInText = (text) => {
  let rg = new RegExp("\\d+", "gi");
  let result = rg.exec(text);
  return Number(result[0]) !== 0;
};

const checkStock = async () => {
  const result = await navigate(p, s);

  let availableStock = getFirstNumberInText(result);

  if (availableStock) {
    console.log("Available stock");
  } else {
    console.log("No stock");
  }
};

checkStock();
