import axios from 'axios';
import { ICoinDetails } from '../types/coin-data';

export const getCoinDetails: (id: string) => Promise<ICoinDetails> = (
  id: string,
) => {
  const promise = axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}?tickers=false&community_data=false&developer_data=false`,
  );
  return promise.then((res) => res.data as ICoinDetails);
};
