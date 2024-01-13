import path from 'path';
import { readFileSync } from 'fs';
import genDiff from './src/genDiff.js';
import getParser from './src/parsers.js';
import { CONSOLE_TEXT_COLOR } from './src/consts.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const readFile = (filepath) => {
  try {
    return readFileSync(getAbsolutePath(filepath), 'utf-8');
  } catch (err) {
    console.error(CONSOLE_TEXT_COLOR.red, `Error reading ${filepath}`);
    console.error(CONSOLE_TEXT_COLOR.red, 'No such file or directory');
    return err;
  }
};

const parseFile = (filepath) => {
  const fileExtension = path.extname(filepath);
  const parser = getParser(fileExtension);
  const string = readFile(filepath);

  return parser(string);
};

function getFilesDiff(filepath1, filepath2, format) {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  return genDiff(data1, data2, format);
}

export default getFilesDiff;
