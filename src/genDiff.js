import STATES from './consts.js'; // NESTED, ADDED, REMOVED, UNCHANGED, UPDATED
import getFormatter from './formatters/index.js';
import { isObject, getKeys } from './utils.js';

const getState = (data1, data2, key) => {
  const val1 = data1[key];
  const val2 = data2[key];

  let state = STATES.UPDATED;

  if (isObject(val1) && isObject(val2)) {
    state = STATES.NESTED;
  }

  if (!Object.hasOwn(data1, key)) {
    state = STATES.ADDED;
  }

  if (!Object.hasOwn(data2, key)) {
    state = STATES.REMOVED;
  }

  if (val1 === val2) {
    state = STATES.UNCHANGED;
  }

  return state;
};

const buildDiffTree = (data1, data2) => {
  const sortedKeys = getKeys(data1, data2);

  const diffs = sortedKeys.map((key) => {
    const val1 = data1[key];
    const val2 = data2[key];

    const state = getState(data1, data2, key);
    let diffLine;

    if (state === STATES.NESTED) {
      return { key, state, children: buildDiffTree(val1, val2) };
    }

    if (state === STATES.ADDED) {
      diffLine = {
        key, state, oldVal: null, newVal: val2,
      };
    }

    if (state === STATES.REMOVED) {
      diffLine = {
        key, state, oldVal: val1, newVal: null,
      };
    }

    if (state === STATES.UNCHANGED) {
      diffLine = {
        key, state, oldVal: val1, newVal: val2,
      };
    }

    if (state === STATES.UPDATED) {
      diffLine = {
        key, state, oldVal: val1, newVal: val2,
      };
    }

    return diffLine;
  });

  return diffs;
};

const genDiff = (data1, data2, format, isColorCoded) => { // format: plain, stylish, json
  const formatResult = getFormatter(format);
  const diff = buildDiffTree(data1, data2);

  return formatResult(diff, isColorCoded);
};

export default genDiff;
