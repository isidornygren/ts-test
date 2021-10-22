import * as fs from 'fs';
import * as path from 'path';

import { fetchFiles, importRecursive } from './utils';
import { runTests } from './test';

const rootDir = '/home/isidor/Projects/ts-test/src/__tests__';
const files = fs.readdirSync(rootDir).map(p => path.join(rootDir, p));

const fetchedFiles = files.map(fetchFiles);

// Import all testable files, this should mean that all tests are loaded hopefully.
importRecursive(fetchedFiles).then(() => {
    runTests();
}, () => {
    // Failure to import files
});

