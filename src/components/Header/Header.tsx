import styles from './Header.module.css';

const FAV_CURRENCY_ONE = 'EUR';
const FAV_CURRENCY_TWO = 'USD';

interface IHeaderProps {
  exchangeRates: {
    FAV_CURRENCY_ONE: number;
    FAV_CURRENCY_TWO: number;
  };
  nationalCurrency: string;
}

export const Header: React.FC<IHeaderProps> = ({ exchangeRates, nationalCurrency }) => {
  const rates = {
    FAV_CURRENCY_ONE: exchangeRates.FAV_CURRENCY_ONE.toFixed(2),
    FAV_CURRENCY_TWO: (exchangeRates.FAV_CURRENCY_ONE / exchangeRates.FAV_CURRENCY_TWO).toFixed(2),
  }

  return (
    <div className={styles.header}>
      <div className={styles.block}>
        <div className={styles.row}>{FAV_CURRENCY_ONE} | {nationalCurrency}</div>
        <div className={styles.row}>1 / {rates.FAV_CURRENCY_ONE}</div>
      </div>

      <div className={styles.block}>
        <div className={styles.row}>{FAV_CURRENCY_TWO} | {nationalCurrency}</div>
        <div className={styles.row}>1 / {rates.FAV_CURRENCY_TWO}</div>
      </div>
    </div>
  )
}
