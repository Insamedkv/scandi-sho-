import React from 'react';
import { AttributesItems } from '../interface';
import { ProductParametersProps, ProductParametersState } from './interface';

export class ProductParameter extends React.Component<ProductParametersProps, ProductParametersState> {
  constructor(props: ProductParametersProps) {
    super(props);

    this.state = {
      choosenAttribute: this.props.attributes.items[0],
      initialChoosenElementIndex: 0,
    };
    this.setDisplayingAttribute = this.setDisplayingAttribute.bind(this);
  }

  setDisplayingAttribute(item: AttributesItems, index: number): void {
    this.setState({
      choosenAttribute: item,
      initialChoosenElementIndex: index,
    });
  }

  componentDidMount(): void {
    const { id } = this.props.attributes;
    this.props.chooseAttributes(id, this.state.choosenAttribute);
  }

  render(): JSX.Element {
    const { id } = this.props.attributes;
    return (
      <>
        <div className='product__page-description-attribute__name'>{this.props.attributes.name}:</div>
        <div className='allign-attribute__value'>
          {this.props.attributes.items.map((item, index) => (
            <div
              className={`product__page-description-attribute__value ${index === this.state.initialChoosenElementIndex
                ? 'attribute__value-choosen' : ''}`}
              key={item.id}
              style={{ backgroundColor: `${this.props.attributes.type === 'swatch' ? item.value : 'none'} ` }}
              onClick={() => {
                this.setDisplayingAttribute(item, index);
                this.props.chooseAttributes(id, item);
              }}>
              {this.props.attributes.type === 'swatch' ? '' : item.value}
            </div>
          ))}
        </div>
      </>
    );
  }
}
