import { useState, useEffect } from 'react';
import './App.css';
import { Header } from './components/Header';
import { CurrencyContainer } from './components/CurrencyContainer';
import { fetchCurrencyData, fetchConversionRate } from './api';

const NATIONAL_CURRENCY = "UAH";
export const FAV_CURRENCY_ONE = 'EUR';
export const FAV_CURRENCY_TWO = 'USD';

function App() {
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>();
  const [toCurrency, setToCurrency] = useState<string>();
  const [exchangeRate, setExchangeRate] = useState(1);
  const [headerRates, setHeaderRates] = useState({ FAV_CURRENCY_ONE: 1, FAV_CURRENCY_TWO: 1 });
  const [amount, setAmount] = useState({ from: 1, to: 1 });

  useEffect(() => {
    const getCurrencies = async () => {
      const { base, currencies, rates } = await fetchCurrencyData();
      setFromCurrency(base);
      setCurrencyOptions([...currencies]);
      setToCurrency(NATIONAL_CURRENCY);
      setHeaderRates({ FAV_CURRENCY_ONE: rates[NATIONAL_CURRENCY], FAV_CURRENCY_TWO: rates[FAV_CURRENCY_TWO] });
    };
    getCurrencies();

  }, []);

  useEffect(() => {
    setAmount({ from: amount.from, to: Number((amount.from * exchangeRate).toFixed(2)) });
  }, [exchangeRate]);

  useEffect(() => {
    if (!fromCurrency || !toCurrency) return;

    const getConversion = async () => {
      const { info } = await fetchConversionRate(fromCurrency, toCurrency, amount.from);
      setExchangeRate(info.rate);
    };
    getConversion();
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(amount: number) {
    setAmount({ from: amount, to: Number((amount * exchangeRate).toFixed(2)) });
  };

  function handleToAmountChange(amount: number) {
    setAmount({ from: Number((amount / exchangeRate).toFixed(2)), to: amount });
  };

  return (
    <div className="App">
      <Header exchangeRates={headerRates} nationalCurrency={NATIONAL_CURRENCY} />
      {fromCurrency && toCurrency && <CurrencyContainer
        currencyOptions={currencyOptions}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        setFromCurrency={setFromCurrency}
        setToCurrency={setToCurrency}
        fromAmount={amount.from}
        onFromAmountChange={handleFromAmountChange}
        toAmount={amount.to}
        onToAmountChange={handleToAmountChange}
      />}
    </div>
  );
}

export default App;
