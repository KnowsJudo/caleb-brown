export interface ICoinData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export interface IMarketData {
  market: string;
}

export interface ICurrency {
  currency: string;
  setCurrency: (currency: string) => void;
}

export interface IFilter {
  data: ICoinData[];
  setData: (data: ICoinData[]) => void;
  getData: () => Promise<void>;
}

export interface IConvert {
  [key: string]: string;
}
