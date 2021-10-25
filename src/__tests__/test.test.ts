import { deepEqual, equal, notEqual } from "assert/strict";
import { add } from "./utils";
import { runTest } from "../test";

export function testLocalImportEqual(): void {
    equal(add(2, 2), 4);
}

export function testEqual(): void {
    equal(4, 4);
}

export function testNotEqual(): void {
    notEqual(4, 5);
}

export function testSuccessfullTest(): void {
    deepEqual(
        // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
        runTest(() => {}, "successfullTest"),
        {
            funcName: "successfullTest",
            succeeded: true,
        }
    );
}

export function testFailedTest(): void {
    deepEqual(
        runTest(() => {
            throw new Error("Failed successfully");
        }, "failedTest"),
        {
            funcName: "failedTest",
            succeeded: false,
        }
    );
}
