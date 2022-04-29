export interface IState {
  currencyOptions: string[],
  fromCurrency: string,
  toCurrency: string,
  exchangeRate: number,
  headerRates: {
    FAV_CURRENCY_ONE: number,
    FAV_CURRENCY_TWO: number
  },
  amount: {
    from: number,
    to: number
  },
}

export enum CurrencyActionsType {
  INIT = 'INIT',
  CHANGE_FROM_CURRENCY = 'CHANGE_FROM_CURRENCY',
  CHANGE_TO_CURRENCY = 'CHANGE_TO_CURRENCY',
  UPDATE_EXC_RATE = 'UPDATE_EXC_RATE',
  CHANGE_FROM_AMOUNT = 'CHANGE_FROM_AMOUNT',
  CHANGE_TO_AMOUNT = 'CHANGE_TO_AMOUNT',
}

interface CurrenctActions {
  type: CurrencyActionsType,
  payload: any,
}

export const initialState: IState = {
  currencyOptions: [],
  fromCurrency: '',
  toCurrency: '',
  exchangeRate: 0,
  headerRates: {
    FAV_CURRENCY_ONE: 0,
    FAV_CURRENCY_TWO: 0
  },
  amount: {
    from: 0,
    to: 0
  },
};

export const reducer = (state: IState, action: CurrenctActions): IState => {
  const { type, payload } = action;

  switch (type) {
    case CurrencyActionsType.INIT:
      console.log(typeof payload.exchangeRate)
      return ({
        ...state,
        fromCurrency: payload.fromCurrency,
        toCurrency: payload.toCurrency,
        currencyOptions: payload.currencyOptions[0],
        headerRates: payload.headerRates,
        exchangeRate: payload.exchangeRate,
        amount: {
          from: 1,
          to: payload.exchangeRate,
        },
      });

    case CurrencyActionsType.CHANGE_FROM_CURRENCY:
      return {
        ...state,
        fromCurrency: payload,
      }

    case CurrencyActionsType.CHANGE_TO_CURRENCY:
      return {
        ...state,
        toCurrency: payload,
      }

    case CurrencyActionsType.UPDATE_EXC_RATE:
      return {
        ...state,
        exchangeRate: payload,
        amount: {
          from: state.amount.from,
          to: state.amount.from * payload,
        }
      }

    case CurrencyActionsType.CHANGE_FROM_AMOUNT:
      return {
        ...state,
        amount: {
          from: payload,
          to: Number(payload * state.exchangeRate),
        }
      }

    case CurrencyActionsType.CHANGE_TO_AMOUNT:
      return {
        ...state,
        amount: {
          from: payload / state.exchangeRate,
          to: payload,
        }
      }

    default:
      return state;
  }
};
