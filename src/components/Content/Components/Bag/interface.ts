import { CartValues } from '../../../../store/slice/cartSlice';

export interface BagProps {
  cart: CartValues[],
  currency?: string
}

export interface BagState {
  itemsIds: string[],
  symbol: string,
  initCurrency: string,
}
