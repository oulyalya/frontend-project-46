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
    default:
      result = str;
      break;
  }

  return result;
};
