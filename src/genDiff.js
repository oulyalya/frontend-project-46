import _ from 'lodash';
import { STATES } from './consts.js'; // ADDED, REMOVED, UNCHANGED, UPDATED
import getFormatter from './formatters/formatters.js';

const genDiff = (data1, data2, format) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const sortedKeys = [...new Set([...keys1, ...keys2])].sort();

  const formatResult = getFormatter(format);

  const makeDiffLine = (key, state, oldVal, newVal) => (
    {
      key, state, oldVal, newVal,
    }
  );

  const buildDiff = (obj1, obj2) => sortedKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return makeDiffLine(key, STATES.ADDED, null, obj2[key]);
    }

    if (!_.has(obj2, key)) {
      return makeDiffLine(key, STATES.REMOVED, obj1[key], null);
    }

    if (obj1[key] !== obj2[key]) {
      return makeDiffLine(key, STATES.UPDATED, obj1[key], obj2[key]);
    }

    return makeDiffLine(key, STATES.UNCHANGED, obj1[key], obj2[key]);
  });

  const diff = buildDiff(data1, data2);

  return formatResult(diff);
};

export default genDiff;
