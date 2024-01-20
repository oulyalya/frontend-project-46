import {
  STATES, CONSOLE_COLOR_RED, CONSOLE_COLOR_GREEN, CONSOLE_COLOR_YELLOW,
} from '../consts.js'; // ADDED, REMOVED, UNCHANGED, UPDATED

const formatString = ({key, state, oldVal, newVal}, isColorCoded) => {
  switch (state) {
    case STATES.ADDED:
      return `Property '${CONSOLE_COLOR_GREEN(key, isColorCoded)}' was ${CONSOLE_COLOR_GREEN(state, isColorCoded)} with value: ${CONSOLE_COLOR_GREEN(newVal, isColorCoded)}`;
    case STATES.REMOVED:
      return `Property '${CONSOLE_COLOR_RED(key, isColorCoded)}' was ${CONSOLE_COLOR_RED(state, isColorCoded)}`;
    case STATES.UPDATED:
      return `Property '${CONSOLE_COLOR_YELLOW(key, isColorCoded)}' was ${CONSOLE_COLOR_YELLOW(state, isColorCoded)}. From ${CONSOLE_COLOR_YELLOW(oldVal)} to ${CONSOLE_COLOR_YELLOW(newVal, isColorCoded)}`;
    case STATES.UNCHANGED:
    default:
      return '';
  }
};

const formatPlain = (arr, isColorCoded) => {
  const string = arr
    .map((strObj) => formatString(strObj, isColorCoded))
    .filter((el) => el !== '')
    .join('\n');

  return string;
};

export default formatPlain;
