import formatPlain from './formatPlain.js';
import formatStylish from './formatStylish.js';

const getFormatter = (type) => {
  switch (type) {
    case 'plain':
      return formatPlain;
    case 'stylish':
    default:
      return formatStylish;
  }
};

export default getFormatter;
