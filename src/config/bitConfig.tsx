const BIT_CONFIG = {
  NETWORK: [
    {
      label: 'Network 1',
      key: 'NET1',
      value: 'NET1',
      group: 'NET'
    },
    {
      label: 'Network 2',
      key: 'NET2',
      value: 'NET2',
      group: 'NET'
    },
    {
      label: 'Network 3',
      key: 'NET3',
      value: 'NET3',
      group: 'NET'
    }
  ],
  ENV: [
    {
      label: 'Temper 1',
      key: 'TEMP1',
      value: 'TEMP1',
      group: 'ENV'
    },
    {
      label: 'Temper 2',
      key: 'TEMP2',
      value: 'TEMP2',
      group: 'ENV'
    }
  ]
};

const defaultBit = ['TEMP2', 'NET1'];

export { BIT_CONFIG , defaultBit };
