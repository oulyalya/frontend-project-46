export const isObject = (el) => (
  typeof el === 'object'
    && el !== null
    && !Array.isArray(el)
);

export const getKeys = (obj1, obj2) => {
  const keys1 = isObject(obj1) ? Object.keys(obj1) : [];
  const keys2 = isObject(obj2) ? Object.keys(obj2) : [];

  return [...new Set([...keys1, ...keys2])].sort();
};
