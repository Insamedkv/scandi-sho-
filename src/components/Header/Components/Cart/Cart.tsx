import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import cartIcon from '../../../../assets/a-cart.svg';
import { CartStoreState, CartValues } from '../../../../store/slice/cartSlice';
import { CategoryStoreState } from '../../../../store/slice/categorySlice';
import currenciesSymbols from '../../../../utility/currencies';
import { ProductPrices } from '../../../../utility/generalInterfaces';
import CartItem from './CartItem/CartItem';
import { CartProps, CartState } from './interface';
import './Cart.css';

class Cart extends React.Component<CartProps, CartState> {
  wrapperRef: React.RefObject<HTMLDivElement>;

  constructor(props: { cart: CartValues[]; }) {
    super(props);

    this.wrapperRef = React.createRef();

    this.state = {
      symbol: '',
      initCurrency: this.props.currency!,
      isOpen: false,
      itemsIds: [],
      finalSum: 0,
    };

    this.showCart = this.showCart.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  showCart(): void {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  }

  setDisplayingCurrency() {
    if (this.props.cart.length > 0) {
      const price = this.props.cart[0].prices.find((prices: ProductPrices) => prices.currency === this.props.currency);
      const currencySymbol = currenciesSymbols[price!.currency];
      this.setState({
        symbol: currencySymbol,
        initCurrency: price!.currency,
      });
    }
  }

  handleClickOutside(event: any) {
    if (this.wrapperRef && !this.wrapperRef.current?.contains(event.target)) {
      if (this.state.isOpen === true) this.showCart();
    }
  }

  componentDidUpdate() {
    const { cart } = this.props;
    let totalSum = 0;
    cart.forEach((item) => {
      const price = item.prices.find((prices: ProductPrices) => prices.currency === this.props.currency);
      totalSum += item.amount! * price!.amount;
    });
    if (this.state.finalSum !== totalSum) {
      this.setState({
        finalSum: totalSum,
      });
    }
    if (this.state.initCurrency !== this.props.currency) {
      this.setDisplayingCurrency();
    }
    cart.forEach((item) => {
      if (!this.state.itemsIds.includes(item.id)) {
        this.setState((prevState) => ({
          itemsIds: [...prevState.itemsIds, item.id],
        }));
      }
    });
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  render(): JSX.Element {
    const { cart } = this.props;
    const resAmount = cart.reduce((sum, current) => sum + (current.amount)!, 0);
    return (
      <div className='header__cart-container'>
        <div className='header__cart' onClick={this.showCart}>
          <div className={`header__count ${cart.length === 0 ? 'header__count-none' : ''}`}>{resAmount}</div>
          <img src={cartIcon} alt='cart'/>
        </div>
        <div className={`header__cart-container__overlay ${this.state.isOpen && resAmount > 0 ? 'show-cart-list' : 'hide-list'}`} >
          <div className={`header__cart-list-container ${cart.length === 0 ? 'header__cart-list-container' : ''}`}
            ref={this.wrapperRef}>
            <span className='header__cart-list-bag'>{`My bag, ${resAmount} items`}</span>
            <div className='header__cart-list-item'>
              {cart.map((item) => {
                return <CartItem categoryItem={item} key={item.itemIds?.join()}/>;
              })}
              {/* {this.state.itemsIds.map((id) => {
                const oneCategoryItems = cart.filter((item) => item.id === id);
                return <CartItem oneCategoryItems={oneCategoryItems} key={id}/>;
              })} */}
            </div>
            <div className='header__cart-list-total'>
              <div className='header__cart-list-total__text'>Total</div>
              <div className='header__cart-list-total__text'>{this.state.symbol} {this.state.finalSum.toFixed(2)}</div>
            </div>
            <div className='header__cart-buttons'>
              <Link to='/bag' onClick={this.showCart}>
                <button className='header__cart-buttons__bag'>VIEW BAG</button>
              </Link>
              <button className='header__cart-buttons__out'>CHECK OUT</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: { cart: CartStoreState, category: CategoryStoreState }) => ({
  cart: state.cart.cart,
  currency: state.category.currency,
});

export default connect(mapStateToProps)(Cart);
