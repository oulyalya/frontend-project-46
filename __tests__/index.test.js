/* eslint-disable no-unused-vars */
/* eslint no-underscore-dangle: 0 */

import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import path from 'path';

import getFilesDiff from '../index.js';

const jsonFilename1 = 'file1.json';
const jsonFilename2 = 'file2.json';
const yamlFilename1 = 'file1.yaml';
const yamlFilename2 = 'file2.yaml';

const stylishDiffFilename = 'res_file1-file2_stylish.txt';
const plainDiffFilename = 'res_file1-file2_plain.txt';
const jsonDiffFilename = 'res_file1-file2_json.txt';

const stylishDiffColoredFilename = 'res_file1-file2_stylish_colored.txt';
const plainDiffColoredFilename = 'res_file1-file2_plain_colored.txt';
const jsonDiffColoredFilename = 'res_file1-file2_json_colored.txt';

const getFixturePath = (filename) => path.resolve(process.cwd(), '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  [jsonFilename1, jsonFilename2, 'stylish', stylishDiffFilename],
  [yamlFilename1, yamlFilename2, 'stylish', stylishDiffFilename],
  [jsonFilename1, yamlFilename2, 'plain', plainDiffFilename],
  [yamlFilename1, jsonFilename2, 'plain', plainDiffFilename],
])('test getFilesDiff(%s, %s) "%s"', (filename1, filename2, formatName, diffFilename) => {
  const expected = readFile(diffFilename).trim();
  const actual = getFilesDiff(getFixturePath(filename1), getFixturePath(filename2), formatName)
    .trim();

  expect(actual).toBe(expected);
});

test.skip.each([
  // [jsonFilename1, jsonFilename2, 'stylish', stylishDiffColoredFilename],
  // [yamlFilename1, yamlFilename2, 'stylish', stylishDiffColoredFilename],
  [jsonFilename1, yamlFilename2, 'plain', plainDiffColoredFilename],
  [yamlFilename1, jsonFilename2, 'plain', plainDiffColoredFilename],
])('test color coded getFilesDiff(%s, %s) "%s"', (filename1, filename2, formatName, diffFilename, isColored = true) => {
  const expected = readFile(diffFilename).trim();
  const actual = getFilesDiff(
    getFixturePath(filename1),
    getFixturePath(filename2),
    formatName,
    isColored,
  ).trim();

  expect(actual).toBe(expected);
});

test.each([
  [jsonFilename1, jsonFilename2, 'json', jsonDiffFilename],
  [jsonFilename1, yamlFilename2, 'json', jsonDiffFilename],
  [yamlFilename1, jsonFilename2, 'json', jsonDiffFilename],
])('test getFilesDiff(%s, %s) "%s"', (filename1, filename2, formatName, diffFilename) => {
  const expected = readFile(diffFilename).trim();
  const actual = getFilesDiff(getFixturePath(filename1), getFixturePath(filename2), formatName)
    .trim();

  expect(actual).toBe(expected);
});
