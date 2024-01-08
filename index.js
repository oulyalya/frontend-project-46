import path from 'path';
import { readFileSync } from 'fs';
import genDiff from './src/genDiff.js';
import { CONSOLE_TEXT_COLOR } from './src/consts.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => {
  try {
    return readFileSync(getAbsolutePath(filepath), 'utf-8');
  } catch (err) {
    console.error(CONSOLE_TEXT_COLOR.red, 'Error reading ', filepath, '. No such file or directory');
  }
};
const getExtension = (filename) => filename.split('.').at(-1);

function getFilesDiff(filepath1, filepath2, format = 'stylish') {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const fileExtension1 = getExtension(filepath1);
  const fileExtension2 = getExtension(filepath2);

  return genDiff(data1, data2, format);
}

export default getFilesDiff;
