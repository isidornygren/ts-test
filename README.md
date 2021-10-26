# Typescript minimal testing suite

Buzzwords: opinionated, minimal, lightweight, boilerplate, style agnostic

## Command line interface

```
Arguments:
  globs                  Glob files to run tests on (default: ["./**/*.test.(ts|js)"])

Options:
  -V, --version          output the version number
  -r, --regexp <regexp>  Regular expression to filter test functions (default: "test*")
  -h, --help             display help for command
```

## How to setup tests

Tests can be located anywhere in your project. However, this testing library will by default look for any files with a `*.test.(js|ts)` suffix in any `__tests__` directories in the current directory (and any child directories), this can be changed by passing a glob argument to this library.

The test files can include exported functions which will be tested by running this project. The functions can be named whatever you want. This testing library will by default only run tests beginning with `test`, this can be changed by using the `-r` flag.

For a test to fail, it should throw an error. For a test to pass, it should not throw an error. Any assertions or throwing functionality is _not_ handled by this library. A functioning assertion library which can be used is the one [included in Node](https://nodejs.org/api/assert.html).

For an example of a test file, look at the [`src/__tests__/test.test.ts`](src/__tests__/test.test.ts) file.

## How to run Typescript tests

You can run tests from typescript files by either compiling the tests first and then running the tests on the compiled files, or you could run this library using ts-node, see the `test-ts` script in [`package.json`](package.json) for an example.
