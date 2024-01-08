import yaml from 'js-yaml';

const getParser = (extension) => {
  switch (extension) {
    case '.yml':
    case '.yaml':
      return yaml.load;
    case '.json':
      return JSON.parse;
    default:
      throw new Error(`Unsupported file extension <${extension}>`);
  }
};

export default getParser;
