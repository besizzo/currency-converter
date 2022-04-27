import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Header } from './components/Header';
import { CurrencyContainer } from './components/CurrencyContainer';
import { fetchCurrencyData } from './fetchCurrencyData';

const BASE_URL = 'http://api.exchangeratesapi.io/v1/latest?';
const key = process.env.REACT_APP_API_KEY

function App() {
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>();
  const [toCurrency, setToCurrency] = useState<string>();
  const [exchangeRate, setExchangeRate] = useState(1);
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let fromAmount: number, toAmount: number;
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  useEffect(() => {
    const getRates = async () => {
      const { base, currency, rates } = await fetchCurrencyData();
      console.log(base)
      setFromCurrency(base);
      setCurrencyOptions([...currency]);
      setToCurrency("UAH");
    }
    getRates();
    console.log(fromCurrency, toCurrency)




    // fetch(`${BASE_URL}${key}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     const firstCurrency = Object.keys(data.rates)[0];
    //     setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
    //     setFromCurrency(data.base);
    //     setToCurrency(firstCurrency);
    //     setExchangeRate(data.rates[firstCurrency]);
    //   });
  }, []);

  function handleFromAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAmount(event.target.valueAsNumber);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAmount(event.target.valueAsNumber);
    setAmountInFromCurrency(false);
  }

  // useEffect(()=>{
  //   console.log(fromCurrency, toCurrency)
  // }, [fromCurrency, toCurrency])
  // useEffect(() => {
  //   if (fromCurrency != null && toCurrency != null) {
  //     fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
  //       .then((res) => res.json())
  //       .then((data) => setExchangeRate(data.rates[toCurrency]));
  //   }
  // }, [fromCurrency, toCurrency]);


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
