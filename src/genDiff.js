import TYPES from './consts.js'; // NESTED, ADDED, REMOVED, UNCHANGED, UPDATED
import getFormatter from './formatters/index.js';
import { isObject, getKeys } from './utils.js';
import { COLOR_LOG } from './colorCoding.js';

const gettype = (data1, data2, key) => {
  const val1 = data1[key];
  const val2 = data2[key];

  if (isObject(val1) && isObject(val2)) {
    return TYPES.NESTED;
  }

  if (!Object.hasOwn(data1, key)) {
    return TYPES.ADDED;
  }

  if (!Object.hasOwn(data2, key)) {
    return TYPES.REMOVED;
  }

  if (val1 === val2) {
    return TYPES.UNCHANGED;
  }

  return TYPES.UPDATED;
};

const buildDiffTree = (data1, data2) => {
  const sortedKeys = getKeys(data1, data2);

  const diffs = sortedKeys.map((key) => {
    const val1 = data1[key];
    const val2 = data2[key];

    const type = gettype(data1, data2, key);

    if (type === TYPES.NESTED) {
      return { key, type, children: buildDiffTree(val1, val2) };
    }

    if (type === TYPES.ADDED) {
      return {
        key, type, oldVal: null, newVal: val2,
      };
    }

    if (type === TYPES.REMOVED) {
      return {
        key, type, oldVal: val1, newVal: null,
      };
    }

    if (type === TYPES.UNCHANGED) {
      return {
        key, type, oldVal: val1, newVal: val2,
      };
    }

    return {
      key, type, oldVal: val1, newVal: val2,
    };
  });

  return diffs;
};

const genDiff = (data1, data2, format, isColorCoded) => { // format: plain, stylish, json
  const errorMessage = COLOR_LOG(`Unsupported format ${format}`, 'red', true);
  if (!Object.hasOwn(getFormatter, format)) throw new Error(errorMessage);

  const formatResult = getFormatter[format];
  const diff = buildDiffTree(data1, data2);

  return formatResult(diff, isColorCoded);
};

export default genDiff;
