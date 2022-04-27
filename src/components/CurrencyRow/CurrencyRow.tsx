import styles from './CurrencyRow.module.css';

interface IRowProps {
  currencyOptions: string[],
  selectedCurrency: string,
  onChange: React.Dispatch<React.SetStateAction<string | undefined>>,
  amount: number,
  onAmountChange: (amount: number) => void,
}

export const CurrencyRow: React.FC<IRowProps> = ({ currencyOptions, selectedCurrency, onChange, amount, onAmountChange }) => {
  const handleOnCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value)
  }

  const handleOnAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onAmountChange(Number(event.target.value))
  }

  return (
    <div className={styles.row}>
      <input type="number" className={styles.input} value={amount} onChange={handleOnAmountChange} />
      <select className={styles.select} value={selectedCurrency} onChange={handleOnCurrencyChange}>
        {currencyOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}
