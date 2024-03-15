import STATES from './consts.js'; // NESTED, ADDED, REMOVED, UNCHANGED, UPDATED
import getFormatter from './formatters/index.js';
import { isObject, getKeys } from './utils.js';

const getState = (data1, data2, key) => {
  const val1 = data1[key];
  const val2 = data2[key];

  if (isObject(val1) && isObject(val2)) {
    return STATES.NESTED;
  }

  if (!Object.hasOwn(data1, key)) {
    return STATES.ADDED;
  }

  if (!Object.hasOwn(data2, key)) {
    return STATES.REMOVED;
  }

  if (val1 === val2) {
    return STATES.UNCHANGED;
  }

  return STATES.UPDATED;
};

const buildDiffTree = (data1, data2) => {
  const sortedKeys = getKeys(data1, data2);

  const diffs = sortedKeys.map((key) => {
    const val1 = data1[key];
    const val2 = data2[key];

    const state = getState(data1, data2, key);

    if (state === STATES.NESTED) {
      return { key, state, children: buildDiffTree(val1, val2) };
    }

    if (state === STATES.ADDED) {
      return {
        key, state, oldVal: null, newVal: val2,
      };
    }

    if (state === STATES.REMOVED) {
      return {
        key, state, oldVal: val1, newVal: null,
      };
    }

    if (state === STATES.UNCHANGED) {
      return {
        key, state, oldVal: val1, newVal: val2,
      };
    }

    return {
      key, state, oldVal: val1, newVal: val2,
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
