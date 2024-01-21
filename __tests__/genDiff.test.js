/* eslint-disable no-unused-vars */
/* eslint no-underscore-dangle: 0 */

import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import genDiff from '../src/genDiff.js';

const jsonFilename1 = 'file1.json';
const jsonFilename2 = 'file2.json';
const yamlFilename1 = 'file1.yaml';
const yamlFilename2 = 'file2.yaml';

const stylishDiffFilename = 'res_file1-file2_stylish';
const plainDiffFilename = 'res_file1-file2_plain';
const jsonDiffFilename = 'res_file1-file2_json';

const stylishDiffColoredFilename = 'res_file1-file2_stylish_color';
const plainDiffColoredFilename = 'res_file1-file2_plain_color';
const jsonDiffColoredFilename = 'res_file1-file2_json_color';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const data1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const data2 = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};

const diff12 = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const diff21 = `{
  + follow: false
    host: hexlet.io
  + proxy: 123.234.53.22
  - timeout: 20
  + timeout: 50
  - verbose: true
}`;

test.each([
  jsonFilename1, jsonFilename2, yamlFilename1, yamlFilename2,
])('test reading fixtures: %s', (filename) => {
  const fn = () => {
    console.log(readFile(filename));
    return true;
  };

  expect(fn()).toBe(true);
});

test.skip('genDiff plain', () => {
  expect(genDiff(data1, data2, 'stylish')).toMatch(diff12);
  expect(genDiff(data2, data1, 'stylish')).toEqual(diff21);
});
