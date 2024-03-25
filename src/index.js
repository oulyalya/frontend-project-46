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

const getExtension = (filePath) => path.extname(filePath).slice(1);

const parseData = (data, extension) => {
  const parser = getParser[extension];

  try {
    return parser(data);
  } catch (err) {
    return null;
  }
};

function getFilesDiff(filepath1, filepath2, format = 'stylish', isColorCoded = false) { // format: plain, stylish, json
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);

  const extension1 = getExtension(filepath1);
  const extension2 = getExtension(filepath2);

  const parsedData1 = parseData(data1, extension1);
  const parsedData2 = parseData(data2, extension2);

  if (!parsedData1 || !parsedData2) {
    return null;
  }

  return genDiff(parsedData1, parsedData2, format, isColorCoded);
}

export default getFilesDiff;
