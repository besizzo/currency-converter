import { useState, useEffect, useCallback } from 'react';
import './App.css';
import { Header } from './components/Header';
import { CurrencyContainer } from './components/CurrencyContainer';
import { useEffectOnFirstChange } from './useEffectOnFirstChange';
import { fetchCurrencyData, fetchConversionRate } from './api';

const NATIONAL_CURRENCY = "UAH";
export const FAV_CURRENCY_ONE = 'EUR';
export const FAV_CURRENCY_TWO = 'USD';

function App() {
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>();
  const [toCurrency, setToCurrency] = useState<string>();
  const [exchangeRate, setExchangeRate] = useState(0);
  const [headerRates, setHeaderRates] = useState({ FAV_CURRENCY_ONE: 0, FAV_CURRENCY_TWO: 0 });
  const [amount, setAmount] = useState({ from: 0, to: 0 });

  useEffect(() => {
    const getCurrencies = async () => {
      try {
        const { base, currencies, rates } = await fetchCurrencyData();

        setFromCurrency(base);
        setToCurrency(NATIONAL_CURRENCY);
        setCurrencyOptions([...currencies]);
        setHeaderRates({ FAV_CURRENCY_ONE: rates[NATIONAL_CURRENCY], FAV_CURRENCY_TWO: rates[FAV_CURRENCY_TWO] });
      } catch (e) {
        console.log(e);
      }
    };

    getCurrencies();
  }, []);

  useEffect(() => {
    if (!fromCurrency || !toCurrency) return;

    const getConversion = async () => {
      const { info } = await fetchConversionRate(fromCurrency, toCurrency);
      setExchangeRate(info.rate);
    };
    getConversion();
  }, [fromCurrency, toCurrency]);

  const handleFromAmountChange = useCallback((amount: number) => {
    setAmount({ from: amount, to: Number((amount * exchangeRate).toFixed(2)) });
  }, [exchangeRate]);

  function handleToAmountChange(amount: number) {
    setAmount({ from: Number((amount / exchangeRate).toFixed(2)), to: amount });
  };

  useEffectOnFirstChange(() => {
    handleFromAmountChange(1);
  }, [exchangeRate]);


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
