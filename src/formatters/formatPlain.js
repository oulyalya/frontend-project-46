import STATES from '../consts.js';
import {
  LOG_RED, LOG_GREEN, LOG_YELLOW,
} from '../colorCoding.js'; // NESTED, ADDED, REMOVED, UNCHANGED, UPDATED

const stringify = (val) => {
  switch (typeof val) {
    case 'object': {
      return !val ? null : '[complex value]';
    }
    case 'string': {
      return `'${val}'`;
    }
    default: {
      return `${val}`;
    }
  }
};

const getPath = (path) => path.flat().join('.');

const formatDiff = (diffArr, isColorCoded) => {
  const iter = (arr, path) => arr.map((line) => {
    const {
      key, state, oldVal, newVal,
    } = line;
    const currentPath = getPath([path, key]);

    switch (state) {
      case STATES.NESTED:
        return iter(line.children, currentPath);
      case STATES.ADDED:
        return `Property '${LOG_GREEN(currentPath, isColorCoded)}' was ${LOG_GREEN(state, isColorCoded)} with value: ${LOG_GREEN(stringify(newVal), isColorCoded)}`;
      case STATES.REMOVED:
        return `Property '${LOG_RED(currentPath, isColorCoded)}' was ${LOG_RED(state, isColorCoded)}`;
      case STATES.UPDATED:
        return `Property '${LOG_YELLOW(currentPath, isColorCoded)}' was ${LOG_YELLOW(state, isColorCoded)}. From ${LOG_YELLOW(stringify(oldVal), isColorCoded)} to ${LOG_YELLOW(stringify(newVal), isColorCoded)}`;
      case STATES.UNCHANGED:
      default:
        return '';
    }
  });

  return iter(diffArr, []);
};

const formatPlain = (arr, isColorCoded) => {
  const string = formatDiff(arr, isColorCoded)
    .flat(Infinity)
    .filter((el) => el !== '')
    .join('\n');

  return string;
};

export default formatPlain;
