import STATES from './consts.js'; // NESTED, ADDED, REMOVED, UNCHANGED, UPDATED
import getFormatter from './formatters/index.js';
import { isObject, getKeys } from './utils.js';

const buildDiffTree = (data1, data2) => {
  const sortedKeys = getKeys(data1, data2);

  const diffs = sortedKeys.map((key) => {
    const val1 = data1[key];
    const val2 = data2[key];

    if (isObject(val1) && isObject(val2)) {
      return { key, state: STATES.NESTED, children: buildDiffTree(val1, val2) };
    }

    if (!Object.hasOwn(data1, key)) {
      return {
        key, state: STATES.ADDED, oldVal: null, newVal: val2,
      };
    }

    if (!Object.hasOwn(data2, key)) {
      return {
        key, state: STATES.REMOVED, oldVal: val1, newVal: null,
      };
    }

    if (val1 === val2) {
      return {
        key, state: STATES.UNCHANGED, oldVal: val1, newVal: val2,
      };
    }

    return {
      key, state: STATES.UPDATED, oldVal: val1, newVal: val2,
    };
  });

  return diffs;
};

const genDiff = (data1, data2, format, isColorCoded) => { // format: plain, stylish, json
  const formatResult = getFormatter(format);
  const diff = buildDiffTree(data1, data2);

  return formatResult(diff, isColorCoded);
};

export default genDiff;
