import STATES from '../consts.js';
import { isObject } from '../utils.js';
import { COLOR_LOG } from '../colorCoding.js'; // NESTED, ADDED, REMOVED, UNCHANGED, UPDATED

const formatStylish = (arr, isColorCoded) => {
  const replacer = ' ';
  const spacesCount = 4;

  const IndentTypes = {
    ADDED: 'added',
    REMOVED: 'removed',
    BRACKET: 'bracket',
    DEFAULT: 'default',
  };

  const getIndent = (depth, type) => {
    const indentSize = depth * spacesCount;
    const indentDefault = `${replacer.repeat(indentSize)}`;

    let result;

    switch (type) {
      case IndentTypes.ADDED:
        result = COLOR_LOG(`${(indentDefault.slice(0, -2))}+ `, 'green', isColorCoded);
        break;
      case IndentTypes.REMOVED:
        result = COLOR_LOG(`${(indentDefault.slice(0, -2))}- `, 'red', isColorCoded);
        break;
      case IndentTypes.BRACKET:
        result = replacer.repeat(indentSize - spacesCount);
        break;
      case IndentTypes.DEFAULT:
      default:
        result = indentDefault;
        break;
    }

    return result;
  };

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
        `${getIndent(depth, IndentTypes.BRACKET)}}`,
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
        result.push(`${getIndent(depth, IndentTypes.ADDED)}${strNew}`);
        break;
      case STATES.REMOVED:
        result.push(`${getIndent(depth, IndentTypes.REMOVED)}${strOld}`);
        break;
      case STATES.UPDATED:
        result.push(`${getIndent(depth, IndentTypes.REMOVED)}${strOld}`);
        result.push(`${getIndent(depth, IndentTypes.ADDED)}${strNew}`);
        break;
      case STATES.UNCHANGED:
      default:
        result.push(`${getIndent(depth)}${strOld}`);
        break;
    }

    return result;
  };

  const getDiffString = (diffArr, depth) => diffArr
    .map((el) => {
      const { key, state, children } = el;

      if (state === STATES.NESTED && Array.isArray(children)) {
        return [
          `${getIndent(depth)}${key}: {`,
          ...getDiffString(children, depth + 1),
          `${getIndent(depth)}}`,
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
