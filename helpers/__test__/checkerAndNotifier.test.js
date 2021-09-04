/* eslint-disable no-undef */
import { checkAndNotifyStock, cancelJobs } from '..';
import * as checkerAndNotifier from '../checkerAndNotifier';

describe('checkerAndNotifier tests', () => {
  it('Should return the first number present in a given string', () => {
    const input = "Argentina's population is more or less 45 M people. 58 test";
    const result = checkerAndNotifier.getFirstNumberInText(input);
    expect(result).toBe(45);
  });

  it('Should return the stock for a given product in a specific page', async () => {
    const result = await checkerAndNotifier.getStock(
      {
        p: `file://${process.cwd()}\\helpers\\__test__\\utils\\test.html`,
        s: '.this_is_a_stock',
      },
    );

    expect(result).toBe(10);
  });

  // Skipped until I can solve the unresolved promise problem
  it('Should continue checking every 5 seconds for stock while available is 0', async (done) => {
    const [r1, r2] = Promise.all([
      checkAndNotifyStock({
        p: `file://${process.cwd()}\\helpers\\__test__\\utils\\test.html`,
        s: '.this_is_a_stock',
        lmk: 'this_is_a_test@stock-checker.com',
        sch: '0/5 0 0 ? * * *',
      }),
      () => new Promise((res) => setTimeout(() => {
        checkerAndNotifier.getStock = jest.fn()
          .mockImplementationOnce(() => Promise.resolve(1));

        cancelJobs('Jest');

        res(1);
      }, 11000)),
    ]);

    console.log(r1, r2);
  });
});
