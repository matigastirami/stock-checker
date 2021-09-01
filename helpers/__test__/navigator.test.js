/* eslint-disable no-undef */
import getElementInPageBySelector from '../navigator';

describe('Navigator tests', () => {
  it('Must return the text in page given an url and a selector', async () => {
    const resultText = (await getElementInPageBySelector(
      `file://${process.cwd()}\\helpers\\__test__\\utils\\test.html`,
      '.this_is_a_stock',
    ))
      .trim();

    expect(resultText).toBe('Available: 10');
  });
});
