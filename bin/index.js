#! /usr/bin/env node
import { argvObject, getElementInPageBySelector } from "../helpers/index.js";
import { scheduleJob, cancelJob } from "node-schedule";
import notifyByEmail from "../helpers/mailSender.js";

const { p, s, sch, lmk } = argvObject;

const getFirstNumberInText = (text) => {
  let rg = new RegExp("\\d+", "gi");
  let result = rg.exec(text);
  return Number(result[0]);
};

const getStock = async () => {
  const result = await getElementInPageBySelector(p, s);
  return getFirstNumberInText(result);
};

const checkAndNotifyStock = async (schedulerTime, receiverMail) => {
  const rule = schedulerTime || "*/5 * * * *";
  
  scheduleJob("stockChecker", rule, async () => {
    let stock = await getStock();
  
    if (stock > 0) {
      console.log("Available stock");
      cancelJob("stockChecker"); //name of the scheduler created to stop
      await notifyByEmail(receiverMail, `Hi, there is/are ${stock} items in stock for the product you were checking for.`);
    } else {
      console.log("No stock");
    }
  });
};

(async () => checkAndNotifyStock(sch, lmk))();
