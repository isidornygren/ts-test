import { Options, TestFunction, TestResult } from './types';

export function runTest(testFunc: () => void, funcName: string): TestResult {
    try {
        testFunc();
        return {
            succeeded: true,
            funcName,
        };
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return {
            succeeded: false,
            funcName,
        };
    }
}

export function runTests(files: ReadonlyArray<string>, options: Options): void {
    // eslint-disable-next-line no-console
    console.time("Time");
    //eslint-disable-next-line no-undefined
    const regexp = options.regexp ? new RegExp(options.regexp) : undefined;

    function isTestPair(
        funcPair: [string, TestFunction] | [string, unknown]
    ): funcPair is [string, TestFunction] {
        const [funcName, maybeTestFunc] = funcPair;
        return typeof maybeTestFunc === "function" && (regexp ? regexp.test(funcName) : true);
    }

    Promise.all(
        files.map(async (file) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const fileData = await import(file);
            // eslint-disable-next-line no-console
            console.log(file);
            return Object.entries(fileData)
                .filter(isTestPair)
                .map(([funcName, testFunc]: Readonly<[string, TestFunction]>) => {
                    return runTest(testFunc, funcName);
                });
        })
    ).then(
        (testResults: ReadonlyArray<ReadonlyArray<TestResult>>) => {
            // eslint-disable-next-line no-console
            console.timeEnd("Time");
            const totalTests = testResults.flat().length;
            const successfulTests = testResults
                .flat()
                .filter((testResult) => testResult.succeeded).length;
            const failedTests = testResults
                .flat()
                .filter((testResult) => !testResult.succeeded).length;

            const didFail = failedTests > 0;
            const color = didFail ? "\x1b[31m" : "\x1b[32m";
            // eslint-disable-next-line no-console
            console.log("Test files passed:", `${color}${successfulTests}/${totalTests}\x1b[0m`);

            if (didFail) {
                process.exit(1);
            }
        },
        (error) => {
            // If it failed to import any test files
            throw new Error(error);
        }
    );
}
