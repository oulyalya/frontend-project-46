/* eslint-disable no-undef */

import genDiff from '../src/genDiff.js';

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

test('genDiff plain', () => {
  expect(genDiff(data1, data2, 'stylish')).toMatch(diff12);
  expect(genDiff(data2, data1, 'stylish')).toEqual(diff21);
});
