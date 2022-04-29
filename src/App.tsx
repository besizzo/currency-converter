import { useEffect, useReducer } from 'react';
import styles from './App.module.css';
import { reducer, initialState, CurrencyActionsType } from './reducer';
import { Header } from './components/Header';
import { CurrencyRow } from './components/CurrencyRow';
import { fetchCurrencyData, fetchConversionRate } from './api';
import { NATIONAL_CURRENCY, FAV_CURRENCY_TWO } from './constants';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getCurrencies = async () => {
      try {
        const { base, currencies, rates } = await fetchCurrencyData();
        const { info } = await fetchConversionRate(base, NATIONAL_CURRENCY);
        dispatch({
          type: CurrencyActionsType.INIT,
          payload: {
            fromCurrency: base,
            toCurrency: NATIONAL_CURRENCY,
            currencyOptions: [currencies],
            headerRates: {
              FAV_CURRENCY_ONE: rates[NATIONAL_CURRENCY],
              FAV_CURRENCY_TWO: rates[FAV_CURRENCY_TWO],
            },
            exchangeRate: info.rate,
          }
        })
      } catch (error) {
        console.log(error);
      }
    };

    getCurrencies();
  }, []);

  useEffect(() => {
    if (!state.fromCurrency || !state.toCurrency) return;
    console.log('runned')
    const getConversion = async () => {
      const { info } = await fetchConversionRate(state.fromCurrency, state.toCurrency);
      dispatch({
        type: CurrencyActionsType.UPDATE_EXC_RATE,
        payload: info.rate,
      })
    };
    getConversion();

  }, [state.fromCurrency, state.toCurrency]);

  const handleFromAmountChange = (updatedAmount: number) => {
    dispatch({
      type: CurrencyActionsType.CHANGE_FROM_AMOUNT,
      payload: updatedAmount,
    })
  };

  const handleToAmountChange = (updatedAmount: number) => {
    dispatch({
      type: CurrencyActionsType.CHANGE_TO_AMOUNT,
      payload: updatedAmount
    })
  };


  const handleFromCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: CurrencyActionsType.CHANGE_FROM_CURRENCY,
      payload: event.target.value,
    })
  }

  const handleToCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: CurrencyActionsType.CHANGE_TO_CURRENCY,
      payload: event.target.value,
    })
  }

  return (
    <div className="App">
      <Header exchangeRates={state.headerRates} />
      {state.fromCurrency && state.toCurrency &&
        <div className={styles.container}>
          <CurrencyRow
            currencyOptions={state.currencyOptions}
            selectedCurrency={state.fromCurrency}
            onCurrencyChange={handleFromCurrencyChange}
            amount={state.amount.from}
            onAmountChange={handleFromAmountChange}
          />
          <div className={styles.equals}> = </div>
          <CurrencyRow
            currencyOptions={state.currencyOptions}
            selectedCurrency={state.toCurrency}
            onCurrencyChange={handleToCurrencyChange}
            amount={state.amount.to}
            onAmountChange={handleToAmountChange}
          />
        </div>
      }
    </div>
  );
}

export default App;
