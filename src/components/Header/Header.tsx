import styles from './Header.module.css';
import { NATIONAL_CURRENCY, FAV_CURRENCY_ONE, FAV_CURRENCY_TWO } from '../../constants';

interface IHeaderProps {
  exchangeRates: {
    FAV_CURRENCY_ONE: number;
    FAV_CURRENCY_TWO: number;
  };
}

export const Header: React.FC<IHeaderProps> = ({ exchangeRates }) => {
  const rates = {
    FAV_CURRENCY_ONE: exchangeRates.FAV_CURRENCY_ONE.toFixed(2),
    FAV_CURRENCY_TWO: (exchangeRates.FAV_CURRENCY_ONE / exchangeRates.FAV_CURRENCY_TWO).toFixed(2),
  };

  return (
    <div className={styles.header}>
      <div className={styles.block}>
        <div className={styles.row}>{FAV_CURRENCY_ONE} | {NATIONAL_CURRENCY}</div>
        <div className={styles.row}>1 / {rates.FAV_CURRENCY_ONE}</div>
      </div>

      <div className={styles.block}>
        <div className={styles.row}>{FAV_CURRENCY_TWO} | {NATIONAL_CURRENCY}</div>
        <div className={styles.row}>1 / {rates.FAV_CURRENCY_TWO}</div>
      </div>
    </div>
  );
};
