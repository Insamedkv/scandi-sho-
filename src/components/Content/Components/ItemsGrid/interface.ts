import { CategoryProducts } from '../../../../utility/generalInterfaces';
import { CategoryName } from '../../../Header/Components/Categories/interface';

export interface CategoryItemsGridProps {
  category: string
}

export interface CategoryItemsGridState {
  category: CategoryProductsDescription,
  categories: CategoryName[],
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
