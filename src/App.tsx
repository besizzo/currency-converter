import { useState, useEffect } from 'react';
import './App.css';
import { Header } from './components/Header';
import { CurrencyContainer } from './components/CurrencyContainer';
import { fetchCurrencyData, fetchConversionRate } from './api';

const NATIONAL_CURRENCY = "UAH";
const FAV_CURRENCY_ONE = 'EUR';
const FAV_CURRENCY_TWO = 'USD';

function App() {
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>();
  const [toCurrency, setToCurrency] = useState<string>();
  const [exchangeRate, setExchangeRate] = useState(1);
  const [amount, setAmount] = useState(1);
  const [isFromCurrency, setIsFromCurrency] = useState(true);
  const [headerRates, setHeaderRates] = useState({ FAV_CURRENCY_ONE: 1, FAV_CURRENCY_TWO: 1 });

  let fromAmount: number, toAmount: number;
  if (isFromCurrency) {
    fromAmount = amount
    toAmount = Number((amount * exchangeRate).toFixed(2))

  } else {
    toAmount = amount
    fromAmount = Number((amount / exchangeRate).toFixed(2))
  }

  useEffect(() => {
    const getCurrencies = async () => {
      const { base, currencies, rates } = await fetchCurrencyData();
      setFromCurrency(base);
      setCurrencyOptions([...currencies]);
      setToCurrency(NATIONAL_CURRENCY);
      setHeaderRates({ FAV_CURRENCY_ONE: rates[NATIONAL_CURRENCY], FAV_CURRENCY_TWO: rates[FAV_CURRENCY_TWO] })
    }
    getCurrencies();
  }, []);

  useEffect(() => {
    if (!fromCurrency || !toCurrency) return

    const getConversion = async () => {
      const { info } = await fetchConversionRate(fromCurrency, toCurrency, amount);
      setExchangeRate(info.rate);
    }

    getConversion();
  }, [fromCurrency, toCurrency])

  // const isNaN = (value: number) => value !== value;

  function handleFromAmountChange(amount: number) {
    setAmount(amount);
    setIsFromCurrency(true);
  }

  function handleToAmountChange(amount: number) {
    setAmount(amount);
    setIsFromCurrency(false);
  }

  return (
    <div className="App">
      <Header exchangeRates={headerRates} nationalCurrency={NATIONAL_CURRENCY} />
      {fromCurrency && toCurrency && <CurrencyContainer
        currencyOptions={currencyOptions}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        setFromCurrency={setFromCurrency}
        setToCurrency={setToCurrency}
        fromAmount={fromAmount}
        onFromAmountChange={handleFromAmountChange}
        toAmount={toAmount}
        onToAmountChange={handleToAmountChange}
      />}
    </div>
  );
}

export default App;
