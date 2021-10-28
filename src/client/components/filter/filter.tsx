import React, { useEffect, useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import { IFilter } from '../../types/coin-data';

export const Filter: React.FC<IFilter> = (props) => {
  const [nameOptions, setNameOptions] = useState<string[]>([]);
  const [symbolOptions, setSymbolOptions] = useState<string[]>([]);

  useEffect(() => {
    setNameOptions(() => props.data.map((next) => next.name));
  }, []);

  useEffect(() => {
    setSymbolOptions(() => props.data.map((next) => next.symbol));
  }, []);

  return (
    <div>
      <Autocomplete
        autoComplete
        options={nameOptions.concat(symbolOptions).sort()}
        onChange={(event, value) =>
          value ? props.setSelected(value) : props.setSelected('')
        }
        renderInput={(params) => (
          <TextField {...params} label="Search by Name or Symbol" />
        )}
        style={{
          maxWidth: '40%',
          margin: 'auto auto 20px auto',
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      ></Autocomplete>
    </div>
  );
};
