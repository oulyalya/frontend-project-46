/* eslint-disable no-unused-vars */
/* eslint no-underscore-dangle: 0 */

import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import path from 'path';

import getFilesDiff from '../src/index.js';

const jsonFilename1 = 'file1.json';
const jsonFilename2 = 'file2.json';
const yamlFilename1 = 'file1.yaml';
const yamlFilename2 = 'file2.yaml';

const stylishDiffFilename = 'res_file1-file2_stylish.txt';
const plainDiffFilename = 'res_file1-file2_plain.txt';
const jsonDiffFilename = 'res_file1-file2_json.txt';

const getFixturePath = (filename) => path.resolve(process.cwd(), '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  [jsonFilename1, jsonFilename2, 'stylish', stylishDiffFilename],
  [yamlFilename1, yamlFilename2, 'stylish', stylishDiffFilename],
  [jsonFilename1, yamlFilename2, 'plain', plainDiffFilename],
  [yamlFilename1, jsonFilename2, 'plain', plainDiffFilename],
  [jsonFilename1, yamlFilename2, 'json', jsonDiffFilename],
  [yamlFilename1, jsonFilename2, 'json', jsonDiffFilename],
])('getFilesDiff(%s, %s) "%s"', (filename1, filename2, formatName, diffFilename) => {
  const expected = readFile(diffFilename).trim();
  const actual = getFilesDiff(getFixturePath(filename1), getFixturePath(filename2), formatName)
    .trim();

  expect(actual).toBe(expected);
});
