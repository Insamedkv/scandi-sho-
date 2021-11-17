import { ProductValues } from '../../../../../utility/generalInterfaces';

export interface ProductPageProps {
  matchParams: ProductPageURLParams,
}

interface ProductPageURLParams {
  category: string,
  id: string,
}

export interface ProductPageState {
  isLoaded: boolean,
  product: ProductValues,
  gallery: string[],
}
