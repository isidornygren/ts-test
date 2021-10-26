import { add } from "./utils";
import { strict as assert } from 'assert';
import { runTest } from "../test";

export function testLocalImportEqual(): void {
    assert.equal(add(2, 2), 4);
}

export function testEqual(): void {
    assert.equal(4, 4);
}

export function testNotEqual(): void {
    assert.notEqual(4, 5);
}

export function testSuccessfulTest(): void {
    assert.deepEqual(
        // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
        runTest(() => {}, "successfulTest"),
        {
            funcName: "successfulTest",
            succeeded: true,
        }
    );
}

export function testFailedTest(): void {
    assert.deepEqual(
        runTest(() => {
            throw new Error("Failed successfully");
        }, "failedTest"),
        {
            funcName: "failedTest",
            succeeded: false,
        }
    );
}
