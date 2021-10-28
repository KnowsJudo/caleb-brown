import { Button, CircularProgress, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { ICoinDetails, ISingle } from '../../types/coin-data';
import { Alert } from '@material-ui/lab';
import { getCoinDetails } from '../../api/gecko-coin-details';

export const SingleSearch: React.FC<ISingle> = (props) => {
  const [searchedID, setSearchedID] = useState<string>('');
  const [callID, setCallID] = useState<string>('');
  const [outputDetails, setOutputDetails] = useState<ICoinDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<boolean>(false);
  const [apiError, setApiError] = useState<boolean>(false);

  useEffect(() => {
    callID && getSingleData();
  }, [callID]);

  const handleID = () => {
    const id = props.allData.find(
      (match) => searchedID === match.symbol || searchedID === match.id,
    );

    if (!id) {
      setSearchError(true);
      return;
    }
    setSearchError(false);
    setCallID(id.id);
  };

  const getSingleData = async () => {
    setLoading(true);
    try {
      const result = await getCoinDetails(callID);
      setOutputDetails(result);
      setLoading(false);
    } catch (error) {
      setApiError(true);
      setLoading(false);
      console.error(error, 'coin details api call failed');
    }
  };

  return (
    <div className="singleDiv">
      <TextField
        className="searchClass"
        label="Enter Crypto id or symbol"
        onChange={(e) => setSearchedID(e.target.value)}
      ></TextField>
      <Button className="buttonClass" onClick={handleID}>
        Show details
      </Button>
      <div className="singleResultsDiv">
        {searchError ? (
          <Alert severity="info">No Cryptos match that id or symbol </Alert>
        ) : loading ? (
          <CircularProgress
            style={{
              display: 'flex',
              margin: '20px auto',
              justifyContent: 'center',
              color: 'black',
            }}
            size={60}
          />
        ) : apiError ? (
          <Alert severity="error">
            Unable to fetch data. Check url spelling. Coingeckos free API call
            limit may be exceeded (50 per minute).
          </Alert>
        ) : (
          outputDetails && (
            <div className="outputDiv">
              <h2>{outputDetails.name}</h2>
              <img src={outputDetails.image.small as string} alt="coin image" />
              <ul>
                <li>ID: {outputDetails.id}</li>
                <li>Symbol: {outputDetails.symbol}</li>
                <li>Community Score: {outputDetails.community_score}</li>
                <li>Market Cap Rank: {outputDetails.market_cap_rank}</li>
                <li>Description: {outputDetails.description.en}</li>
              </ul>
            </div>
          )
        )}
      </div>
    </div>
  );
};
