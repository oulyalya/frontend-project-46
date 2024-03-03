import {
  STATES, LOG_RED, LOG_GREEN, LOG_YELLOW,
} from '../consts.js'; // NESTED, ADDED, REMOVED, UNCHANGED, UPDATED

const formatString = ({
  key, state, oldVal, newVal,
}, isColorCoded) => {
  switch (state) {
    case STATES.ADDED:
      return `Property '${LOG_GREEN(key, isColorCoded)}' was ${LOG_GREEN(state, isColorCoded)} with value: ${LOG_GREEN(newVal, isColorCoded)}`;
    case STATES.REMOVED:
      return `Property '${LOG_RED(key, isColorCoded)}' was ${LOG_RED(state, isColorCoded)}`;
    case STATES.UPDATED:
      return `Property '${LOG_YELLOW(key, isColorCoded)}' was ${LOG_YELLOW(state, isColorCoded)}. From ${LOG_YELLOW(oldVal)} to ${LOG_YELLOW(newVal, isColorCoded)}`;
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
