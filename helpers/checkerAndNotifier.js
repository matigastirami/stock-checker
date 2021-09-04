import { getElementInPageBySelector } from "./index.js";
import { scheduleJob, cancelJob } from "node-schedule";
import notifyByEmail from "./mailSender.js";
import { CRONS_CANCEL_EVENT, DEFAULT_CRON_STRING } from "./constants.js";

import { EventEmitter } from 'events';

const cancellable = new EventEmitter();

cancellable.on(CRONS_CANCEL_EVENT, (reason) => {
  console.log(`Scheduled task cancelled. Reason: ${reason || 'No reason specified'}`);
  cancelJob("stockChecker");
});

export const cancelJobs = (reason = null) => {
  cancellable.emit(CRONS_CANCEL_EVENT, reason);
}

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
    try {
      let stock = await getStock({ p, s });

      if (stock > 0) {
        console.log("Available stock");
        //await notifyByEmail(lmk, `Hi, there is/are ${stock} items in stock for the product you were checking for.`);
        cancelJobs('Stock found. Stopping process');
      } else {
        console.log("No stock");
      }
    } catch (error) {
      console.error("FATAL: ", error); 
    }
  });
}