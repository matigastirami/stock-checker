import yargs from 'yargs';

const parseArgs = (input) => yargs()
  .option('p', {
    alias: 'product',
    describe: 'Product to find',
    type: 'string',
    demandOption: true,
  })
  .option('s', {
    alias: 'selector',
    describe: 'CSS selector',
    type: 'string',
    demandOption: true,
  })
  .option('sch', {
    alias: 'scheduler',
    describe: 'Scheduler to check the stock (Cron format)',
    type: 'string',
    demandOption: false,
  })
  .option('lmk', {
    alias: 'letMeKnow',
    describe: 'Email to notify when the stock is available',
    type: 'string',
    demandOption: true,
  })
  .help(true)
  .parse(input);

export default parseArgs;
