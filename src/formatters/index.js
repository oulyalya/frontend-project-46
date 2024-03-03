import formatPlain from './formatPlain.js';
import formatStylish from './formatStylish.js';
import { LOG_RED } from '../colorCoding.js';

const getFormatter = (type) => {
  const message = LOG_RED(`Unsupported format ${type}`, true);

  switch (type) {
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
