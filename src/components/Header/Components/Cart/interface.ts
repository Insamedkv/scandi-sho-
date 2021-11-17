import { CartValues } from '../../../../store/slice/cartSlice';

export interface CartProps {
  cart: CartValues[],
  currency?: string,
}

export interface CartState {
  isOpen: boolean,
  itemsIds: string[],
  finalSum: number,
  symbol: string,
  initCurrency: string,
}
