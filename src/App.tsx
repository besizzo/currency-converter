import { useState, useEffect } from 'react';
import './App.css';
import { Header } from './components/Header';
import { CurrencyContainer } from './components/CurrencyContainer';
import { fetchCurrencyData, fetchConversionRate } from './api';

const NATIONAL_CURRENCY = "UAH";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>();
  const [toCurrency, setToCurrency] = useState<string>();
  const [exchangeRate, setExchangeRate] = useState(1);
  const [amount, setAmount] = useState(1);
  const [isFromCurrency, setIsFromCurrency] = useState(true);

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
      const { base, currencies } = await fetchCurrencyData();
      setFromCurrency(base);
      setCurrencyOptions([...currencies]);
      setToCurrency(NATIONAL_CURRENCY);
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
      <Header />
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
