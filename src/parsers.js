import yaml from 'js-yaml';

const getParser = {
  yml: yaml.load,
  yaml: yaml.load,
  json: JSON.parse,
};

export default getParser;
