import React, { useEffect, useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import { IFilter } from '../../types/coin-data';

export const Filter: React.FC<IFilter> = (props) => {
  const [nameOptions, setNameOptions] = useState<string[]>([]);
  const [symbolOptions, setSymbolOptions] = useState<string[]>([]);
  //   const [selected, setSelected] = useState('');

  useEffect(() => {
    setNameOptions(() => props.data.map((next) => next.name));
  }, []);

  useEffect(() => {
    setSymbolOptions(() => props.data.map((next) => next.symbol));
  }, []);

  //   const handleAuto = (value: string) => {
  //     if (totalOptions.length >= 1) {
  //       props.setData(
  //         props.data.filter(
  //           (match) => match.name === value || match.symbol === value,
  //         ),
  //       );
  //     }
  //     if (props.data.length === 1) {
  //       useCallback(() => {
  //         props.setData(
  //           props.data.filter(
  //             (match) => match.name === value || match.symbol === value,
  //           ),
  //         );
  //       }, [props.data.length]);
  //     } else {
  //       props.getData();
  //     }
  //   };

  return (
    <div>
      <Autocomplete
        autoComplete
        options={nameOptions.concat(symbolOptions).sort()}
        onChange={(event, value) =>
          props.data.length > 1
            ? props.setData(
                props.data.filter(
                  (match) => match.name === value || match.symbol === value,
                ),
              )
            : props.getData()
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
