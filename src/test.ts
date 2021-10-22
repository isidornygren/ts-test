export type TestFunction = () => void;

interface TestContainer {
    testFunction: TestFunction,
    description: string,
}

/**
 * Singleton that handles all the tests
 * Could probably be a class with some fancy features
 */
const tests: Array<TestContainer> = [];

export function test(description: string, testFunction: TestFunction): void{
    tests.push({ testFunction, description });
}

export function runTests(): void {
    const failedTests: Array<TestContainer> = [];
    const successfulTests: Array<TestContainer> = [];

    // eslint-disable-next-line no-console
    console.time('Time');

    tests.forEach((testContainer: Readonly<TestContainer>) => {
        try {
            testContainer.testFunction();
            successfulTests.push(testContainer);
        } catch(error) {
            // eslint-disable-next-line no-console
            console.log(error);
            failedTests.push(testContainer);
        }
    });
    const didFail = failedTests.length > 0;
    const color = didFail ? '\x1b[31m' : '\x1b[32m';
    // eslint-disable-next-line no-console
    console.log('Test files passed:', `${color}${successfulTests.length}/${tests.length}\x1b[0m`);
    // eslint-disable-next-line no-console
    console.timeEnd('Time');

    if(didFail) {
        process.exit(1);
    }
}