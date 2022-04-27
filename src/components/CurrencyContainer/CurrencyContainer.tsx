import styles from './CurrencyContainer.module.css';
import { CurrencyRow } from '../CurrencyRow';

interface IContainerProps {
  currencyOptions: string[],
  fromCurrency: string,
  toCurrency: string,
  setFromCurrency: React.Dispatch<React.SetStateAction<string | undefined>>
  setToCurrency: React.Dispatch<React.SetStateAction<string | undefined>>
  fromAmount: number,
  onFromAmountChange: (amount: number) => void,
  toAmount: number,
  onToAmountChange: (amount: number) => void,
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
  return (
    <div className={styles.container}>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChange={event => setFromCurrency(event)}
        amount={fromAmount}
        onAmountChange={onFromAmountChange}
      />
      <div className={styles.equals}> = </div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChange={event => setToCurrency(event)}
        amount={toAmount}
        onAmountChange={onToAmountChange}
      />
    </div>
  );
}