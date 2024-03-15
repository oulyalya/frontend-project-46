import STATES from '../consts.js';
import { isObject } from '../utils.js';
import { COLOR_LOG } from '../colorCoding.js'; // NESTED, ADDED, REMOVED, UNCHANGED, UPDATED

const replacer = ' ';
const spacesCount = 4;

const IndentTypes = {
  ADDED: 'added',
  REMOVED: 'removed',
  BRACKET: 'bracket',
  DEFAULT: 'default',
};

const getIndent = (depth, type, isColorCoded) => {
  const indentSize = depth * spacesCount;
  const indentDefault = `${replacer.repeat(indentSize)}`;

  switch (type) {
    case IndentTypes.ADDED:
      return COLOR_LOG(`${(indentDefault.slice(0, -2))}+ `, 'green', isColorCoded);
    case IndentTypes.REMOVED:
      return COLOR_LOG(`${(indentDefault.slice(0, -2))}- `, 'red', isColorCoded);
    case IndentTypes.BRACKET:
      return replacer.repeat(indentSize - spacesCount);
    case IndentTypes.DEFAULT:
    default:
      return indentDefault;
  }
};

const formatStylish = (arr, isColorCoded) => {
  const stringify = (value, parentDepth = 1) => {
    const iter = (currentValue, depth) => {
      if (!isObject(currentValue)) {
        return `${currentValue}`;
      }

      const lines = Object
        .entries(currentValue)
        .map(([key, val]) => `${getIndent(depth)}${key}: ${iter(val, depth + 1)}`);

      return [
        '{',
        ...lines,
        `${getIndent(depth, IndentTypes.BRACKET, isColorCoded)}}`,
      ].join('\n');
    };

    return iter(value, parentDepth);
  };

  const formatLine = (lineObj, depth) => {
    const result = [];

    const {
      key, state, oldVal, newVal,
    } = lineObj;

    const strOld = `${key}: ${stringify(oldVal, depth + 1)}`;
    const strNew = `${key}: ${stringify(newVal, depth + 1)}`;

    switch (state) {
      case STATES.ADDED:
        result.push(`${getIndent(depth, IndentTypes.ADDED, isColorCoded)}${strNew}`);
        break;
      case STATES.REMOVED:
        result.push(`${getIndent(depth, IndentTypes.REMOVED, isColorCoded)}${strOld}`);
        break;
      case STATES.UPDATED:
        result.push(`${getIndent(depth, IndentTypes.REMOVED, isColorCoded)}${strOld}`);
        result.push(`${getIndent(depth, IndentTypes.ADDED, isColorCoded)}${strNew}`);
        break;
      case STATES.UNCHANGED:
      default:
        result.push(`${getIndent(depth, '', isColorCoded)}${strOld}`);
        break;
    }

    return result;
  };

  const getDiffString = (diffArr, depth) => diffArr
    .map((el) => {
      const { key, state, children } = el;

      if (state === STATES.NESTED && Array.isArray(children)) {
        return [
          `${getIndent(depth, '', isColorCoded)}${key}: {`,
          ...getDiffString(children, depth + 1),
          `${getIndent(depth, '', isColorCoded)}}`,
        ].join('\n');
      }

      return formatLine(el, depth).join('\n');
    });

  return [
    '{',
    ...getDiffString(arr, 1),
    '}',
  ].join('\n');
};

export default formatStylish;
