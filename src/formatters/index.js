import formatPlain from './formatPlain.js';
import formatStylish from './formatStylish.js';
import { COLOR_LOG } from '../colorCoding.js';

const getFormatter = (format) => {
  const message = COLOR_LOG(`Unsupported format ${format}`, 'red', true);

  switch (format) {
    case 'stylish':
      return formatStylish;
    case 'plain':
      return formatPlain;
    case 'json':
      return JSON.stringify;
    default:
      throw new Error(message);
  }
};

export default getFormatter;
