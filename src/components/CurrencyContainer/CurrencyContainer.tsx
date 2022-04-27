import React, { useState, useEffect } from 'react';
import styles from './CurrencyContainer.module.css';
import { CurrencyRow } from '../CurrencyRow';

interface IContainerProps {
  currencyOptions: string[],
  fromCurrency: string,
  toCurrency: string,
  setFromCurrency: React.Dispatch<React.SetStateAction<string | undefined>>
  setToCurrency: React.Dispatch<React.SetStateAction<string | undefined>>
  fromAmount: number,
  onFromAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  toAmount: number,
  onToAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

export const CurrencyContainer: React.FC<IContainerProps> = ({
  currencyOptions,
  fromCurrency,
  toCurrency,
  setFromCurrency,
  setToCurrency,
  fromAmount,
  onFromAmountChange,
  toAmount,
  onToAmountChange,
}) => {




  // function handleFromAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
  //   if (isNaN(event.target.valueAsNumber)) return
  //   setAmount(event.target.valueAsNumber)
  //   setAmountInFromCurrency(true)
  // }

  // function handleToAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
  //   if (isNaN(event.target.valueAsNumber)) return
  //   setAmount(event.target.valueAsNumber)
  //   setAmountInFromCurrency(false)
  // }

  return (
    <div className={styles.container}>
      <CurrencyRow
        // onAmountChange={handleFromAmountChange}
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChange={event => setFromCurrency(event)}
        amount={fromAmount}
        onAmountChange={onFromAmountChange}
      />
      <div className={styles.equals}> = </div>
      <CurrencyRow
        // onAmountChange={handleToAmountChange}
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChange={event => setToCurrency(event)}
        amount={toAmount}
        onAmountChange={onToAmountChange}
      />
    </div>
  );

}