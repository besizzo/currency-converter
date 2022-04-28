import axios from 'axios';

const BASE_URL = 'https://api.exchangerate.host/';
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

export const fetchCurrencyData = async (): Promise<{ base: string; currencies: string[], rates: any, }> => {
  const currencyData = await axios.get<ICurrencyData>(`${BASE_URL}latest?`);
  const { base, rates } = currencyData.data;
  const currencies = Object.keys(rates);

  return { base, currencies, rates };
};


export const fetchConversionRate = async (from: string, to: string, amount: number): Promise<{ info: { rate: number } }> => {
  const convertionData = await axios.get<IConvertionData>(`${BASE_URL}convert?from=${from}&to=${to}&amount=${amount}`);
  const { info } = convertionData.data;

  return { info };
}
