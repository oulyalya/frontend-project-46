export const CONSOLE_TEXT_COLOR = {
  red: '\x1b[31m%s\x1b[0m',
  green: '\x1b[32m%s\x1b[0m',
};

export const CONSOLE_COLOR_RED = (str) => `\x1b[31m${str}\x1b[0m`;
export const CONSOLE_COLOR_GREEN = (str) => `\x1b[32m${str}\x1b[0m`;
export const CONSOLE_COLOR_YELLOW = (str) => `\x1b[33m${str}\x1b[0m`;
export const CONSOLE_COLOR_NAVY = (str) => `\x1b[34m${str}\x1b[0m`;
export const CONSOLE_COLOR_PURPLE = (str) => `\x1b[35m${str}\x1b[0m`;
export const CONSOLE_COLOR_BLUE = (str) => `\x1b[36m${str}\x1b[0m`;
export const CONSOLE_COLOR_WHITE = (str) => `\x1b[37m${str}\x1b[0m`;

export const STATES = {
  ADDED: 'added',
  REMOVED: 'removed',
  UNCHANGED: 'unchanged',
  UPDATED: 'updated',
};
