import styles from './CurrencyRow.module.css';

interface IRowProps {
  currencyOptions: string[],
  selectedCurrency: string,
  onCurrencyChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  amount: number,
  onAmountChange: (amount: number) => void,
};

export const CurrencyRow: React.FC<IRowProps> = ({
  currencyOptions,
  selectedCurrency,
  onCurrencyChange,
  amount,
  onAmountChange
}) => {
  const handleOnCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onCurrencyChange(event);
  };

  const handleOnAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onAmountChange(event.target.valueAsNumber);
  };

  return (
    <div className={styles.row}>
      <input
        type="number"
        className={styles.input}
        value={Number(amount.toFixed(2))}
        onChange={handleOnAmountChange} />
      <select
        className={styles.select}
        value={selectedCurrency}
        onChange={handleOnCurrencyChange}>
        {currencyOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
