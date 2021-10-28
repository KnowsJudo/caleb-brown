export interface IMarketData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export interface ICoinData {
  id: string;
  name: string;
  symbol: string;
}

export interface ICoinDetails {
  name: string;
  id: string;
  symbol: string;
  community_score: string;
  image: IImage;
  market_cap_rank: number;
  description: IDescript;
}

export interface IDescript {
  en: string;
}

export interface IImage {
  small: string;
}
export interface ICurrency {
  currency: string;
  setCurrency: (currency: string) => void;
}

export interface IFilter {
  data: IMarketData[];
  selected: string;
  setSelected: (selected: string) => void;
}

export interface IConvert {
  [key: string]: string;
}

export interface ISingle {
  allData: ICoinData[];
}
