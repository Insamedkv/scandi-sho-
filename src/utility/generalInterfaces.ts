import { CategoryStoreState } from '../store/slice/categorySlice';

export interface CategoryProducts {
  brand: string,
  gallery: string[],
  id: string,
  inStock: boolean,
  name: string,
  prices: ProductPrices[],
}

export interface Product {
  data: ProductData,
  loading: boolean,
}

interface ProductData {
  isLoaded: boolean,
  product: ProductValues,
  gallery: string[],
}

export interface AddProductFunc {
  (item: ProductValues): void;
}

export interface RemoveProductFunc {
  (itemIds: RemoveProduct): void;
}

export interface ProductPrices {
  amount: number,
  currency: string,
}

export interface CategoryStore {
  category: CategoryStoreState,
}

export interface ProductValues {
  brand: string,
  gallery: string[],
  description: string,
  id: string;
  inStock: boolean,
  name: string,
  prices: ProductPrices[],
  attributes: ProductAttributes[],
  category: string,
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

export interface RemoveProduct {
  itemsIds: string[],
  productId: string,
}
