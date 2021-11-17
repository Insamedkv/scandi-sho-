import { ProductAttributes } from '../../../../../../utility/generalInterfaces';

export interface ChoosenParamsListProps {
  attributes: ProductAttributes []
}

export interface ChoosenParamsListState {
  choosenAttribute: ProductAttributes [],
  initialChoosenElementIndex: number,
}
