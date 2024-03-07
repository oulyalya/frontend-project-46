export const CONSOLE_TEXT_COLOR = {
  red: '\x1b[31m%s\x1b[0m',
  green: '\x1b[32m%s\x1b[0m',
};

export const COLOR_LOG = (str, color, isColorCoded) => {
  if (!isColorCoded) return str;

  let result;
  
  switch (color) {
    case 'red':
      result = `\x1b[31m${str}\x1b[0m`;
      break;

    case 'green':
      result = `\x1b[32m${str}\x1b[0m`;
      break;

    case 'yellow':
      result = `\x1b[33m${str}\x1b[0m`;
      break;

    case 'navy':
      result = `\x1b[34m${str}\x1b[0m`;
      break;

    case 'purple':
      result = `\x1b[35m${str}\x1b[0m`;
      break;

    case 'blue':
      result = `\x1b[36m${str}\x1b[0m`;
      break;

    case 'white':
      result = `\x1b[37m${str}\x1b[0m`;
      break;

    default:
      result = str;
      break;
  }

  return result;
};

export const LOG_RED = (str, isColorCoded) => {
  if (!isColorCoded) return str;
  return `\x1b[31m${str}\x1b[0m`;
};

export const LOG_GREEN = (str, isColorCoded) => {
  if (!isColorCoded) return str;
  return `\x1b[32m${str}\x1b[0m`;
};

export const LOG_YELLOW = (str, isColorCoded) => {
  if (!isColorCoded) return str;
  return `\x1b[33m${str}\x1b[0m`;
};

export const LOG_NAVY = (str, isColorCoded) => {
  if (!isColorCoded) return str;
  return `\x1b[34m${str}\x1b[0m`;
};

export const LOG_PURPLE = (str, isColorCoded) => {
  if (!isColorCoded) return str;
  return `\x1b[35m${str}\x1b[0m`;
};

export const LOG_BLUE = (str, isColorCoded) => {
  if (!isColorCoded) return str;
  return `\x1b[36m${str}\x1b[0m`;
};

export const LOG_WHITE = (str, isColorCoded) => {
  if (!isColorCoded) return str;
  return `\x1b[37m${str}\x1b[0m`;
};
