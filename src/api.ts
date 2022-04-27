import axios from 'axios';

interface ICurrencyData {
  success: boolean,
  timestamp: number,
  base: string,
  date: string,
  rates: any
};

interface IConvertionData {
  motd: any,
  success: boolean,
  query: {
    from: string,
    to: string,
    amount: number,
  },
  info: {
    rate: number,
  },
  historical: boolean,
  date: string,
  result: number,
};

// const BASE_URL = 'http://api.exchangeratesapi.io/v1/latest?';
const BASE_URL = 'https://api.exchangerate.host/';
const key = process.env.REACT_APP_API_KEY

export const fetchCurrencyData = async (): Promise<{ base: string; currencies: string[], rates: any; }> => {
  const currencyData = await axios.get<ICurrencyData>(`${BASE_URL}latest?`);
  const { base, rates, } = currencyData.data
  // const rates = currencyData.data

  const currencies = Object.keys(rates);
  // console.log(base, currencies, rates);
  return { base, currencies, rates }
};


export const convertCurrencies = async (from: string, to: string, amount: number): Promise<number> => {
  const convertionData = await axios.get<IConvertionData>(`${BASE_URL}convert?from=${from}&to=${to}&amount=${amount}`);
  const { result } = convertionData.data;
  return result
}
