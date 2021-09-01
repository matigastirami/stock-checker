#! /usr/bin/env node
import { checkAndNotifyStock, parseArgs } from "../helpers/index.js";

(async () => checkAndNotifyStock({ ...parseArgs(process.argv.slice(2)) }))();