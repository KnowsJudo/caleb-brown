import axios from 'axios';
import { ICoinData } from '../types/coin-data';

export const getCoins: () => Promise<ICoinData[]> = () => {
  const promise = axios.get('https://api.coingecko.com/api/v3/coins/list');
  return promise.then((res) => res.data as ICoinData[]);
};
