import styles from './CurrencyContainer.module.css';
import { CurrencyRow } from '../CurrencyRow';

interface IContainerProps {
  currencyOptions: string[],
  fromCurrency: string,
  toCurrency: string,
  onFromCurrencyChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  onToCurrencyChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  fromAmount: number,
  onFromAmountChange: (amount: number) => void,
  toAmount: number,
  onToAmountChange: (amount: number) => void,
};

export const CurrencyContainer: React.FC<IContainerProps> = ({
  currencyOptions,
  fromCurrency,
  toCurrency,
  onFromCurrencyChange,
  onToCurrencyChange,
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
        onCurrencyChange={onFromCurrencyChange}
        amount={fromAmount}
        onAmountChange={onFromAmountChange}
      />
      <div className={styles.equals}> = </div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onCurrencyChange={onToCurrencyChange}
        amount={toAmount}
        onAmountChange={onToAmountChange}
      />
    </div>
  );
}