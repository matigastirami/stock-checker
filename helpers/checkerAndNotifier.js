import { getElementInPageBySelector } from "./";
import { scheduleJob, cancelJob } from "node-schedule";
import notifyByEmail from "./mailSender.js";
import { DEFAULT_CRON_STRING } from "./constants.js";

export const getFirstNumberInText = (text) => {
  let rg = new RegExp("\\d+", "gi");
  let result = rg.exec(text);
  return Number(result[0]);
};

export const getStock = async ({ p, s }) => {
  const result = await getElementInPageBySelector(p, s);
  return getFirstNumberInText(result);
};

export const checkAndNotifyStock = async ({ p, s, sch, lmk }) => {
  
  const rule = sch ?? DEFAULT_CRON_STRING;
  
  scheduleJob("stockChecker", rule, async () => {
    let stock = await getStock({ p, s });
  
    if (stock > 0) {
      console.log("Available stock");
      cancelJob("stockChecker"); // name of the scheduler created to stop
      await notifyByEmail(lmk, `Hi, there is/are ${stock} items in stock for the product you were checking for.`);
    } else {
      console.log("No stock");
    }
  });
}