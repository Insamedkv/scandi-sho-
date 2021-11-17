import React from 'react';
import parse from 'html-react-parser';
import { connect } from 'react-redux';
import { CategoryStore } from '../../../../../../utility/generalInterfaces';
import currenciesSymbols from '../../../../../../utility/currencies';
import { addProduct } from '../../../../../../store/slice/cartSlice';
import { ProductParameter } from './ProductParameter/ProductParameter';
import { AttributesItems, ProductDescriptionProps, ProductDescriptionState } from './interface';
import './ProductDescription.css';

class ProductDescription extends React.Component<ProductDescriptionProps, ProductDescriptionState> {
  constructor(props: ProductDescriptionProps) {
    super(props);

    this.state = {
      symbol: '',
      amount: 0,
      initCurrency: '',
      productParams: this.props.values,
    };

    this.setDisplayingCurrency = this.setDisplayingCurrency.bind(this);
    this.setProductAttributes = this.setProductAttributes.bind(this);
  }

  setDisplayingCurrency() {
    const price = this.props.values.prices.find((prices) => prices.currency === this.props.currency);
    if (price?.currency && price.amount) {
      const currencySymbol = currenciesSymbols[price.currency];
      this.setState({
        symbol: currencySymbol,
        amount: price.amount,
        initCurrency: price.currency,
      });
    }
  }

  componentDidMount() {
    this.setDisplayingCurrency();
  }

  componentDidUpdate() {
    if (this.state.initCurrency !== this.props.currency) {
      this.setDisplayingCurrency();
    }
  }

  setProductAttributes(attributeId: string, item: AttributesItems) {
    this.setState((prevState) => ({
      ...prevState,
      productParams: {
        ...prevState.productParams,
        attributes: prevState.productParams.attributes.map((attribute) => {
          if (attribute.id === attributeId) {
            const attributeCopy = { ...attribute };
            attributeCopy.items = [item];
            return attributeCopy;
          }
          return attribute;
        }),
      },
    }));
  }

  render(): JSX.Element {
    const testIds: string[] = [];
    this.state.productParams.attributes.map((attribute) => attribute.items.map((item) => testIds.push(item.id)));

    return (
      <div className='product__page-description'>
        <div className='product__page-description-brand'>{this.props.values.brand}</div>
        <div className='product__page-description-name'>{this.props.values.name}</div>
        {this.props.values.inStock
          ? <>
            {this.props.values.attributes.length > 0
              ? this.props.values.attributes.map(
                (attribute) => <ProductParameter attributes={attribute} chooseAttributes={this.setProductAttributes} key={attribute.id}/>,
              )
              : ''}
            <div className='product__page-description-attribute__name'>Price:</div>
            <div className='product__page-description-price'>{this.state.symbol}{this.state.amount}</div>
            <button className='product__page-to-cart' onClick={() => this.props.addProduct(this.state.productParams)}>ADD TO CART</button>
            <div className='product__page-description-text'>{parse(this.props.values.description)}</div>
          </>
          : ''
        }
      </div>
    );
  }
}

const mapStateToProps = (state: CategoryStore) => ({
  currency: state.category.currency,
});

const mapDispatchToProps = { addProduct };

export default connect(mapStateToProps, mapDispatchToProps)(ProductDescription);
