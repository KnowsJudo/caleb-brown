import axios from 'axios';
import { IMarketData } from '../types/coin-data';

export const getMarkets: (currency: string) => Promise<IMarketData[]> = (
  currency: string,
) => {
  const promise = axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&per_page=250`,
  );
  return promise.then((res) => res.data as IMarketData[]);
};
