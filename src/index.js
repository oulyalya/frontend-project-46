import path from 'path';
import { readFileSync } from 'fs';
import genDiff from './genDiff.js';
import getParser from './parsers.js';
import { CONSOLE_TEXT_COLOR } from './colorCoding.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const readFile = (filepath) => {
  try {
    return readFileSync(getAbsolutePath(filepath), 'utf-8');
  } catch (err) {
    console.log(CONSOLE_TEXT_COLOR.red, `Error reading ${filepath}`);
    console.log(CONSOLE_TEXT_COLOR.red, 'No such file or directory');
    return err;
  }
};

const parseFile = (filepath) => {
  const fileExtension = path.extname(filepath).slice(1);
  const parser = getParser[fileExtension];

  try {
    const string = readFile(filepath);
    return parser(string);
  } catch (err) {
    return null;
  }
};

function getFilesDiff(filepath1, filepath2, format = 'stylish', isColorCoded = false) { // format: plain, stylish, json
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  if (!data1 || !data2) {
    return null;
  }

  return genDiff(data1, data2, format, isColorCoded);
}

export default getFilesDiff;
