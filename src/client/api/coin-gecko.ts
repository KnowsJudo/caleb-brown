import axios from 'axios';
import { ICoinData } from '../types/coin-data';

export const coinGecko: (currency: string) => Promise<ICoinData[]> = (
  currency: string,
) => {
  const promise = axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&per_page=250`,
  );
  return promise.then((res) => res.data as ICoinData[]);
};
