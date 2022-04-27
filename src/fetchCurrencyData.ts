import axios from 'axios';

interface ICurrencyData {
  success: boolean,
  timestamp: number,
  base: string,
  date: string,
  rates: any
}

const BASE_URL = 'http://api.exchangeratesapi.io/v1/latest?';
const key = process.env.REACT_APP_API_KEY




export const fetchCurrencyData = async (): Promise<{ base: string; currency: string[], rates: any; }> => {
  const currencyData = await axios.get<ICurrencyData>(`${BASE_URL}${key}`);
  const { base, rates, } = currencyData.data
  // const rates = currencyData.data

  const currency = Object.keys(rates);
  console.log(base, currency, rates);
  return { base, currency, rates }
};
