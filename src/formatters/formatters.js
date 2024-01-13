import formatPlain from './formatPlain.js';
import formatStylish from './formatStylish.js';

const getFormatter = (type) => {
  switch (type) {
    case 'stylish':
      return formatStylish;
    case 'plain':
    default:
      return formatPlain;
  }
};

export default getFormatter;
