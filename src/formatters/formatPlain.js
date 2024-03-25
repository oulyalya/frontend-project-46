import TYPES from '../consts.js';
import { COLOR_LOG } from '../colorCoding.js'; // NESTED, ADDED, REMOVED, UNCHANGED, UPDATED

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
      key, type, oldVal, newVal,
    } = line;
    const currentPath = getPath([path, key]);

    switch (type) {
      case TYPES.NESTED:
        return iter(line.children, currentPath);
      case TYPES.ADDED:
        return `Property '${COLOR_LOG(currentPath, 'green', isColorCoded)}' was ${COLOR_LOG(type, 'green', isColorCoded)} with value: ${COLOR_LOG(stringify(newVal), 'green', isColorCoded)}`;
      case TYPES.REMOVED:
        return `Property '${COLOR_LOG(currentPath, 'red', isColorCoded)}' was ${COLOR_LOG(type, 'red', isColorCoded)}`;
      case TYPES.UPDATED:
        return `Property '${COLOR_LOG(currentPath, 'yellow', isColorCoded)}' was ${COLOR_LOG(type, isColorCoded)}. From ${COLOR_LOG(stringify(oldVal), 'yellow', isColorCoded)} to ${COLOR_LOG(stringify(newVal), 'yellow', isColorCoded)}`;
      case TYPES.UNCHANGED:
      default:
        return '';
    }
  });

  return iter(diffArr, []);
};

const formatPlain = (arr, isColorCoded) => formatDiff(arr, isColorCoded)
  .flat(Infinity)
  .filter((el) => el !== '')
  .join('\n');

export default formatPlain;
