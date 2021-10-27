import React, { useEffect, useState, useRef } from 'react';
import { TablePagination } from '@material-ui/core';
import { Button } from '@material-ui/core';
import {
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { ICoinData } from '../../types/coin-data';
import { Currency } from '../currency/currency';
import { coinGecko } from '../../api/coin-gecko';
import { symbolKey } from '../../utils/symbols';
import { Filter } from '../filter/filter';

export const CryptoTable: React.FC = () => {
  const [data, setData] = useState<ICoinData[] | null>(null);
  const [currency, setCurrency] = useState<string>('aud');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  //reference to stop first API call on initial render
  const firstRender = useRef<boolean>(true);
  const firstClick = useRef<boolean>(false);

  useEffect(() => {
    //checks not initial render and data has been requested before updating API call
    firstRender.current
      ? (firstRender.current = false)
      : firstClick.current && getData();
  }, [currency]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const getData = async () => {
    setLoading(true);
    try {
      const result = await coinGecko(currency);
      setData(result);
      setLoading(false);
      firstClick.current = true;
    } catch (error) {
      setError(true);
      setLoading(false);
      console.error(error, 'api call failed');
    }
  };

  return (
    <div>
      <div className="selectDiv">
        <Button
          className="fetchBtn"
          onClick={() => {
            getData();
          }}
        >
          List most Popular Cryptos
        </Button>
        <Currency currency={currency} setCurrency={setCurrency} />
      </div>
      <div className="tableOutput">
        {error && (
          <Alert severity="error">
            Unable to fetch data. Check url spelling. Coingeckos free API call
            limit may be exceeded (50 per minute).
          </Alert>
        )}
        {loading ? (
          <CircularProgress
            style={{
              display: 'flex',
              margin: 'auto',
              justifyContent: 'center',
            }}
            size={60}
          />
        ) : (
          !error &&
          data && (
            <TableContainer>
              <Filter data={data} setData={setData} getData={getData} />
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }} align="right">
                      ID
                    </TableCell>
                    <TableCell style={{ fontWeight: 'bold' }} align="right">
                      Symbol
                    </TableCell>
                    <TableCell style={{ fontWeight: 'bold' }} align="right">
                      Current Price
                    </TableCell>
                    <TableCell style={{ fontWeight: 'bold' }} align="right">
                      Change in last 24 hours
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data
                    //select data shown in table based on page index and rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow key={row.name}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell align="right">{row.id}</TableCell>
                        <TableCell align="right">{row.symbol}</TableCell>
                        <TableCell align="right">
                          {`${symbolKey[currency]}${row.current_price.toFixed(
                            2,
                          )}`}
                        </TableCell>
                        <TableCell align="right">
                          {`${row.price_change_percentage_24h.toFixed(2)}%`}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>{' '}
              <TablePagination
                component="div"
                count={data.length}
                onPageChange={handleChangePage}
                page={page}
                rowsPerPage={rowsPerPage}
                //event handler for row display input. parseint string => number
                onRowsPerPageChange={(e) =>
                  setRowsPerPage(parseInt(e.target.value))
                }
                rowsPerPageOptions={[10, 25, 50, 100]}
              />
            </TableContainer>
          )
        )}
      </div>
    </div>
  );
};
