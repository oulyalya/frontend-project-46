export const CONSOLE_TEXT_COLOR = {
  red: '\x1b[31m%s\x1b[0m',
  green: '\x1b[32m%s\x1b[0m',
};

export const COLOR_LOG = (str, color, isColorCoded) => {
  if (!isColorCoded) return str;

  switch (color) {
    case 'red':
      return `\x1b[31m${str}\x1b[0m`;
    case 'green':
      return `\x1b[32m${str}\x1b[0m`;
    case 'yellow':
      return `\x1b[33m${str}\x1b[0m`;
    default:
      return str;
  }
};
