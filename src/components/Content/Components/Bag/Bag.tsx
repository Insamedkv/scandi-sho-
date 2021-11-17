import React from 'react';
import { connect } from 'react-redux';
import { CartStoreState, CartValues } from '../../../../store/slice/cartSlice';
import { CategoryStoreState } from '../../../../store/slice/categorySlice';
import currenciesSymbols from '../../../../utility/currencies';
import { ProductPrices } from '../../../../utility/generalInterfaces';
import CartItem from '../../../Header/Components/Cart/CartItem/CartItem';
import { BagProps, BagState } from './interface';
import './Bag.css';

class Bag extends React.Component< BagProps, BagState> {
  constructor(props: { cart: CartValues[]; }) {
    super(props);

    this.state = {
      symbol: '',
      initCurrency: this.props.currency!,
      itemsIds: [],
    };
  }

  setDisplayingCurrency() {
    const price = this.props.cart[0].prices.find((prices: ProductPrices) => prices.currency === this.props.currency);
    const currencySymbol = currenciesSymbols[price!.currency];
    this.setState({
      symbol: currencySymbol,
      initCurrency: price!.currency,
    });
  }

  componentDidMount() {
    const { cart } = this.props;
    const itemsIds: string[] = [];
    if (this.state.initCurrency !== this.props.currency) {
      this.setDisplayingCurrency();
    }
    cart.forEach((item) => {
      if (!itemsIds.includes(item.id)) {
        itemsIds.push(item.id);
      }
    });
    this.setState((prevState) => ({
      itemsIds: [...prevState.itemsIds, ...itemsIds],
    }));
  }

  render(): JSX.Element {
    const { cart } = this.props;
    return (
      <>
        {this.state.itemsIds.map((id) => {
          const oneCategoryItems = cart.filter((item) => item.id === id);
          return <CartItem oneCategoryItems={oneCategoryItems} key={id}/>;
        })}
      </>
    );
  }
}

const mapStateToProps = (state: { cart: CartStoreState, category: CategoryStoreState }) => ({
  cart: state.cart.cart,
  currency: state.category.currency,
});

export default connect(mapStateToProps)(Bag);
