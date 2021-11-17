import { AddProductFunc, ProductValues } from '../../../../../../utility/generalInterfaces';

export interface ProductDescriptionProps {
  values: ProductValues,
  currency?: string
  addProduct: AddProductFunc,
}

export interface ProductDescriptionState {
  symbol: string,
  amount: number,
  initCurrency: string,
  productParams: ProductValues,
}

export interface ProductAttributes {
  id: string,
  type: string,
  name: string,
  items: AttributesItems[]
}

export interface AttributesItems {
  displayValue: string,
  value: string,
  id: string,
}
