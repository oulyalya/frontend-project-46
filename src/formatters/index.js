import formatPlain from './formatPlain.js';
import formatStylish from './formatStylish.js';

const getFormatter = {
  stylish: formatStylish,
  plain: formatPlain,
  json: JSON.stringify,
};

export default getFormatter;
