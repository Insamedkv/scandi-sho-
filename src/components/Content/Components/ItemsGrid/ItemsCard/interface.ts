import { CategoryProducts } from '../../../../../utility/generalInterfaces';

export interface ItemCardProps {
  product: CategoryProducts,
  currency?: string,
  category?: string,
}

export interface ItemCardState {
  symbol: string,
  amount: number,
  initCurrency: string,
}
