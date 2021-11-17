import { AttributesItems, ProductAttributes } from '../interface';

export interface ProductParametersProps {
  attributes: ProductAttributes,
  chooseAttributes: ChooseFunc,
}

interface ChooseFunc {
  (attributeId: string, item: AttributesItems): void;
}

export interface ProductParametersState {
  choosenAttribute: AttributesItems,
  initialChoosenElementIndex: number,
}
