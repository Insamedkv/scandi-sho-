import { AddProductFunc, CategoryProducts, ProductValues } from '../../../../../utility/generalInterfaces';

export interface ItemCardProps {
  product: CategoryProducts,
  currency?: string,
  category?: string,
  addProduct?: AddProductFunc,
}

export interface ItemCardState {
  symbol: string,
  amount: number,
  initCurrency: string,
  buyFromMain?: ProductValues,
}
