import { argvObject, getElementInPageBySelector } from "../helpers/index.js";
import { scheduleJob, cancelJob } from "node-schedule";
import notifyByEmail from "../helpers/mailSender.js";
import { DEFAULT_CRON_STRING } from "../helpers/constants.js";

export const getFirstNumberInText = (text) => {
  let rg = new RegExp("\\d+", "gi");
  let result = rg.exec(text);
  return Number(result[0]);
};

export const getStock = async () => {
  const { p, s } = argvObject;
  const result = await getElementInPageBySelector(p, s);
  return getFirstNumberInText(result);
};

export default async function checkAndNotifyStock() {
  const { sch, lmk } = argvObject;
  
  const rule = sch ?? DEFAULT_CRON_STRING;
  
  scheduleJob("stockChecker", rule, async () => {
    let stock = await getStock();
  
    if (stock > 0) {
      console.log("Available stock");
      cancelJob("stockChecker"); //name of the scheduler created to stop
      await notifyByEmail(lmk, `Hi, there is/are ${stock} items in stock for the product you were checking for.`);
    } else {
      console.log("No stock");
    }
  });
}