/* eslint-disable no-undef */
import { CancelablePromise } from 'cancelable-promise';
import * as checkerAndNotifier from '../checkerAndNotifier';
// import notifyByEmail from '../mailSender';

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
  it.skip('Should continue checking every 5 seconds for stock while available is 0', async () => {
    const getStockSpy = jest.spyOn(checkerAndNotifier, 'getStock');

    const checker = new CancelablePromise(() => checkerAndNotifier
      .checkAndNotifyStock({
        p: `file://${process.cwd()}\\helpers\\__test__\\utils\\test.html`,
        s: '.this_is_a_stock',
        lmk: 'test@test.com',
        sch: '0/5 0 0 ? * * *',
      }));

    await checker;

    setTimeout(() => {
      expect(getStockSpy).toHaveBeenCalledTimes(0);
    }, 16000);
  });
});
