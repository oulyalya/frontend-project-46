const diff = [
  {
    key: 'common',
    state: 'nested',
    children: [
      {
        key: 'follow',
        state: 'added',
        oldVal: null,
        newVal: false,
      },
      {
        key: 'setting1',
        state: 'unchanged',
        oldVal: 'Value 1',
        newVal: 'Value 1',
      },
      {
        key: 'setting2',
        state: 'removed',
        oldVal: 200,
        newVal: null,
      },
      {
        key: 'setting3',
        state: 'updated',
        oldVal: true,
        newVal: null,
      },
      {
        key: 'setting4',
        state: 'added',
        oldVal: null,
        newVal: 'blah blah',
      },
      {
        key: 'setting5',
        state: 'added',
        oldVal: null,
        newVal: {
          key5: 'value5',
        },
      },
      {
        key: 'setting6',
        state: 'nested',
        children: [
          {
            key: 'doge',
            state: 'nested',
            children: [
              {
                key: 'wow',
                state: 'updated',
                oldVal: '',
                newVal: 'so much',
              },
            ],
          },
          {
            key: 'key',
            state: 'unchanged',
            oldVal: 'value',
            newVal: 'value',
          },
          {
            key: 'ops',
            state: 'added',
            oldVal: null,
            newVal: 'vops',
          },
        ],
      },
    ],
  },
  {
    key: 'group1',
    state: 'nested',
    children: [
      {
        key: 'baz',
        state: 'updated',
        oldVal: 'bas',
        newVal: 'bars',
      },
      {
        key: 'foo',
        state: 'unchanged',
        oldVal: 'bar',
        newVal: 'bar',
      },
      {
        key: 'nest',
        state: 'updated',
        oldVal: {
          key: 'value',
        },
        newVal: 'str',
      },
    ],
  },
  {
    key: 'group2',
    state: 'removed',
    oldVal: {
      abc: 12345,
      deep: {
        id: 45,
      },
    },
    newVal: null,
  },
  {
    key: 'group3',
    state: 'added',
    oldVal: null,
    newVal: {
      deep: {
        id: {
          number: 45,
        },
      },
      fee: 100500,
    },
  },
];

export default diff;
