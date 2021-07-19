const yargs = require('yargs');

const options = yargs
    .option('p', {
        alias: 'product',
        describe: 'Product to find',
        type: "string",
        demandOption: true
    })
    .option('s', {
        alias: 'selector',
        describe: 'CSS selector',
        type: "string",
        demandOption: true
    })
    .help(true)
    .argv;

module.exports = options;