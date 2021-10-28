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
import { ICoinData, IMarketData } from '../../types/coin-data';
import { Currency } from '../currency/currency';
import { getMarkets } from '../../api/gecko-markets';
import { symbolKey } from '../../utils/symbols';
import { Filter } from '../filter/filter';
import { getCoins } from '../../api/gecko-coins';
import { SingleSearch } from '../crypto-single/crypto-single';

export const CryptoTable: React.FC = () => {
  const [marketData, setMarketData] = useState<IMarketData[] | null>(null);
  const [allData, setAllData] = useState<ICoinData[] | null>(null);
  const [selected, setSelected] = useState<string>('');
  const [currency, setCurrency] = useState<string>('aud');
  const [showTable, setShowTable] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
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
      : firstClick.current && getMarketData();
  }, [currency]);

  useEffect(() => {
    if (marketData && marketData.length <= 1 && showTable) {
      getMarketData();
    }
    marketData &&
      setMarketData(
        marketData.filter(
          (match) => selected === match.name || selected === match.symbol,
        ),
      ),
      setPage(0);
  }, [selected]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const getMarketData = async () => {
    setLoading(true);
    try {
      const result = await getMarkets(currency);
      setMarketData(result);
      setLoading(false);
      firstClick.current = true;
      setShowTable(true);
    } catch (error) {
      setError(true);
      setLoading(false);
      console.error(error, 'market api call failed');
    }
  };

  const getAllData = async () => {
    setLoading(true);
    try {
      const result = await getCoins();
      setAllData(result);
      setLoading(false);
      setShowSearch(true);
    } catch (error) {
      setError(true);
      setLoading(false);
      console.error(error, 'coint list api call failed');
    }
  };

  return (
    <div className="mainDiv">
      <div className="selectDiv">
        <Button
          className="buttonClass"
          onClick={() => {
            getMarketData();
          }}
        >
          List most Popular Cryptos
        </Button>
      </div>
      <div className="tableOutput">
        {error && (
          <Alert severity="error">
            Unable to fetch data. Check url spelling. Coingeckos free API call
            limit may be exceeded (50 per minute).
          </Alert>
        )}
        {!error && marketData && (
          <Button
            className="buttonClass"
            onClick={() => setShowTable(showTable ? false : true)}
          >
            {showTable ? 'Hide Table' : 'Show Table'}
          </Button>
        )}
        {loading ? (
          <CircularProgress
            style={{
              display: 'flex',
              margin: '20px auto',
              justifyContent: 'center',
              color: 'black',
            }}
            size={60}
          />
        ) : (
          !error &&
          marketData &&
          showTable && (
            <TableContainer>
              <Currency currency={currency} setCurrency={setCurrency} />
              <Filter
                data={marketData}
                selected={selected}
                setSelected={setSelected}
              />
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
                  {marketData
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
                count={marketData.length}
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
      <Button className="buttonClass" onClick={() => getAllData()}>
        Search for any Crypto
      </Button>
      {showSearch && allData && <SingleSearch allData={allData} />}
    </div>
  );
};
