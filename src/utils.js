export const isObject = (el) => (
  typeof el === 'object'
    && el !== null
    && !Array.isArray(el)
);

export const getKeys = (...objs) => {
  const keys = objs.map((obj) => {
    if (isObject(obj)) return Object.keys(obj);
    return [];
  }).flat();

  const sortedKeys = [...new Set([...keys])].sort();
  return sortedKeys;
};