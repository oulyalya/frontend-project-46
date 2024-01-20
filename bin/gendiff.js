#!/usr/bin/env node

import { program } from 'commander';
import getFilesDiff from '../index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .option('-c, --color', 'enable color coding')
  .helpOption('-h, --help', 'output usage information')
  .action((filepath1, filepath2, options) => {
    console.log(
      getFilesDiff(filepath1, filepath2, options.format, options.color),
    );
  });

program.parse();
