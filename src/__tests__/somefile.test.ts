import { test } from '../test';
import * as assert from 'assert/strict';
import { add } from './utils';

test('This is a test', () => {
    assert.equal(1, 1.0);
});

test('This is a failing test', () => {
    assert.equal(1, 0.0);
});

test('This is a test of an imported file', () => {
    assert.equal(add(1, 3), 4);
});