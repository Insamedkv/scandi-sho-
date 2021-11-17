import { CartValues } from '../../../../../store/slice/cartSlice';
import { AddProductFunc, RemoveProductFunc } from '../../../../../utility/generalInterfaces';

export interface CartItemProps {
  oneCategoryItems: CartValues[]
  currency?: string,
  addProduct: AddProductFunc,
  removeProduct: RemoveProductFunc,
}

export interface CartItemState {
  initialDescription: CartValues,
  symbol: string,
  amount: number,
  initCurrency: string,
  initialChoosenElementIndex: number,
  pictureNumber: number,
}
