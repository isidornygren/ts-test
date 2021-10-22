import * as fs from 'fs';
import * as path from 'path';

const dir ='./';

const rootDir = '/home/isidor/Projects/ts-test/src/__tests__';
const files = fs.readdirSync(rootDir).map(p => path.join(rootDir, p));

export type RecursivePaths = Array<RecursivePaths> | string;

export function fetchFiles(currentPath: Readonly<string>): RecursivePaths {
    const stats = fs.lstatSync(currentPath);

    if(stats.isDirectory()) {
        const currentFiles = fs.readdirSync(currentPath).map(p => path.join(currentPath, p));
        return currentFiles.map(fetchFiles);
    }
    return currentPath;
}