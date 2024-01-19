import {
  STATES, //  CONSOLE_COLOR_RED, CONSOLE_COLOR_GREEN,
} from '../consts.js'; // ADDED, REMOVED, UNCHANGED, UPDATED

const formatStylish = (arr, replacer = '    ', spacesCount = 1, depth = 1) => {
  const indentSize = spacesCount * depth;

  const indentDefault = `${replacer.repeat(indentSize)}`;
  const indentAdded = `${(replacer.repeat(indentSize).slice(0, -2))}+ `;
  // const indentAdded = CONSOLE_COLOR_GREEN(`${(replacer.repeat(indentSize).slice(0, -2))}+ `);
  const indentRemoved = `${(replacer.repeat(indentSize).slice(0, -2))}- `;
  // const indentRemoved = CONSOLE_COLOR_RED(`${(replacer.repeat(indentSize).slice(0, -2))}- `);
  const indentBracket = `${replacer.repeat(indentSize - spacesCount)}`;

  const formatLine = (line) => {
    const result = [];

    const {
      key, state, oldVal, newVal,
    } = line;

    const strOld = `${key}: ${oldVal}`;
    const strNew = `${key}: ${newVal}`;

    switch (state) {
      case STATES.ADDED:
        result.push(`${indentAdded}${strNew}`);
        break;
      case STATES.REMOVED:
        result.push(`${indentRemoved}${strOld}`);
        break;
      case STATES.UPDATED:
        result.push(`${indentRemoved}${strOld}`);
        result.push(`${indentAdded}${strNew}`);
        break;
      case STATES.UNCHANGED:
      default:
        result.push(`${indentDefault}${strOld}`);
        break;
    }

    return result;
  };

  const formattedLines = arr.flatMap((el) => formatLine(el));

  return [
    `${indentBracket}{`,
    ...formattedLines,
    `${indentBracket}}`,
  ].join('\n');
};

export default formatStylish;
