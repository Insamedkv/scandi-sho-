import { CategoryProducts } from '../../../../utility/generalInterfaces';

export interface CategoryItemsGridProps {
  category: string
}

export interface CategoryItemsGridState {
  category: CategoryProductsDescription,
  initCategory?: string,
}

interface CategoryProductsDescription {
  products: CategoryProducts[],
}

export interface CategoryItems {
  data: CategoryData,
  loading: boolean,
  initCategory?: string,
}

interface CategoryData {
  category: CategoryProductsDescription,
  initCategory?: string,
}
