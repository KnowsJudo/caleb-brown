import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { IConvert, ICurrency } from '../../types/coin-data';

const possibleCurrencies: IConvert[] = [
  { aud: 'Australian Dollars' },
  { usd: 'US Dollars' },
  { eur: 'Euros' },
  { jpy: 'Japanese Yen' },
  { gbp: 'British Pounds' },
  { cad: 'Canadian Dollars' },
  { nzd: 'New Zealand Dollars' },
  { hkd: 'Hong Kong Dollars' },
];

export const Currency: React.FC<ICurrency> = (props) => {
  return (
    <div className="currencyDiv">
      <FormControl>
        <InputLabel>Currency:</InputLabel>
        <Select
          value={props.currency}
          onChange={(e) => props.setCurrency(e.target.value as string)}
        >
          {possibleCurrencies.map((next: IConvert, ind) => (
            <MenuItem value={Object.keys(next).toString()} key={ind}>
              {Object.values(next)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
