import { getFirstNumberInText } from "../checkerAndNotifier";
import yargs from 'yargs';

const prepareTests = () => {
    console.log("called")
    yargs.parse = jest.fn();
};

describe("checkerAndNotifier tests", () => {

    beforeAll(() => prepareTests());

    it("Should return the first number present in a given string", () => {
        const  input = "Argentina's population is more or less 45 M people. 58 test";
        const result = getFirstNumberInText(input);
        expect(result).toBe(45);
    });

    it("Should return the stock for a given product in a specific page", async () => {

    });
});