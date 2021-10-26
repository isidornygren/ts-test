import { Command } from "commander";
import fastGlob from "fast-glob";

import { runTests } from "./test";
import { version } from "../package.json";

const program = new Command();

program
  .version(version)
  .description("Typescript minimal test suite")
  .option(
    "-r, --regexp <regexp>",
    "Regular expression to filter test functions",
    "test*"
  )
  .argument("[globs...]", "Glob files to run tests on", ["./**/*.test.(ts|js)"])
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  .action((globs: Array<string>, options) => {
    const entries = fastGlob.sync(globs, { dot: true, absolute: true });
    runTests(entries, options);
  })
  .parse(process.argv);
