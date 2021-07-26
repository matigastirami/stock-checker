#! /usr/bin/env node
import { argvObject, getElementInPageBySelector } from "../helpers/index.js";

const { p, s } = argvObject;

const getFirstNumberInText = (text) => {
  let rg = new RegExp("\\d+", "gi");
  let result = rg.exec(text);
  return Number(result[0]);
};

const getStock = async () => {
  const result = await getElementInPageBySelector(p, s);
  return getFirstNumberInText(result);
};

const showStockStatus = async () => {
  let stock = await getStock();

  if (stock > 0) {
    console.log("Available stock");
  } else {
    console.log("No stock");
  }
};

(async () => showStockStatus())();
