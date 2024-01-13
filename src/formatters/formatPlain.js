import {
  STATES, CONSOLE_COLOR_RED, CONSOLE_COLOR_GREEN, CONSOLE_COLOR_YELLOW,
} from '../consts.js'; // ADDED, REMOVED, UNCHANGED, UPDATED

const formatString = ({
  key, state, oldVal, newVal,
}) => {
  switch (state) {
    case STATES.ADDED:
      return `Property '${CONSOLE_COLOR_GREEN(key)}' was ${CONSOLE_COLOR_GREEN(state)} with value: ${CONSOLE_COLOR_GREEN(newVal)}`;
    case STATES.REMOVED:
      return `Property '${CONSOLE_COLOR_RED(key)}' was ${CONSOLE_COLOR_RED(state)}`;
    case STATES.UPDATED:
      return `Property '${CONSOLE_COLOR_YELLOW(key)}' was ${CONSOLE_COLOR_YELLOW(state)}. From ${CONSOLE_COLOR_YELLOW(oldVal)} to ${CONSOLE_COLOR_YELLOW(newVal)}`;
    case STATES.UNCHANGED:
    default:
      return '';
  }
};

const formatPlain = (arr) => {
  const string = arr
    .map((str) => formatString(str))
    .filter((el) => el !== '')
    .join('\n');

  return string;
};

export default formatPlain;
