import React, { useState, useEffect } from 'react';
import './App.css';
import { Header } from './components/Header';
import { CurrencyContainer } from './components/CurrencyContainer';
import { fetchCurrencyData, convertCurrencies } from './api';

const NATIONAL_CURRENCY = "UAH";
const BASE_CURRENCY = 'EUR';

function App() {
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>();
  const [toCurrency, setToCurrency] = useState<string>();
  const [exchangeRate, setExchangeRate] = useState(1);
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let fromAmount: number, toAmount: number, currencyRates: any;
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  useEffect(() => {
    const getCurrencies = async () => {
      const { base, currencies, rates } = await fetchCurrencyData();
      setFromCurrency(base);
      setCurrencyOptions([...currencies]);
      setToCurrency(NATIONAL_CURRENCY);
      // setExchangeRate(rates[NATIONAL_CURRENCY]);
    }
    getCurrencies();
  }, []);

  useEffect(() => {
    if (!fromCurrency || !toCurrency) return
    // const getRates = async () => {
    //   const { rates } = await fetchCurrencyData();
    //   console.log(exchangeRates)

    // }
    const getConversion = async () => {
      const convertedAmount = await convertCurrencies(fromCurrency, toCurrency, amount);
      setAmount(convertedAmount);
    }
    getConversion();



    //const updatedRate = exchangeRate / currencyRates[toCurrency];

    // getRates();
    // setExchangeRate(exchangeRate / currencyRates[toCurrency])
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange(amount: number) {
    setAmount(amount);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(amount: number) {
    setAmount(amount);
    setAmountInFromCurrency(false);
  }




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
