import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProduct, RemoveProduct, removeProduct } from '../../../../../store/slice/cartSlice';
import currenciesSymbols from '../../../../../utility/currencies';
import { CategoryStore, ProductPrices } from '../../../../../utility/generalInterfaces';
import arrow from '../../../../../assets/a-left.svg';
import { ChoosenParamsList } from './ChoosenParams/ChoosenParams';
import { CartItemProps, CartItemState } from './interface';

class CartItem extends React.Component<CartItemProps, CartItemState > {
  constructor(props: CartItemProps) {
    super(props);

    this.state = {
      initialDescription: this.props.categoryItem,
      symbol: '',
      amount: 0,
      initCurrency: '',
      initialChoosenElementIndex: 0,
      pictureNumber: 0,
    };

    this.setDisplayingCurrency = this.setDisplayingCurrency.bind(this);
    this.setChoosenParams = this.setChoosenParams.bind(this);
    this.switchPictureToLeft = this.switchPictureToLeft.bind(this);
    this.switchPictureToRight = this.switchPictureToRight.bind(this);
  }

  setDisplayingCurrency() {
    const price = this.state.initialDescription.prices.find((prices: ProductPrices) => prices.currency === this.props.currency);
    const currencySymbol = currenciesSymbols[price!.currency];
    this.setState({
      symbol: currencySymbol,
      amount: price!.amount,
      initCurrency: price!.currency,
    });
  }

  setChoosenParams(id: number) {
    this.setState({
      initialChoosenElementIndex: id,
    });
  }

  switchPictureToLeft(e: any) {
    const { direction } = e.target.dataset;
    const numberOfPictures = this.state.initialDescription.gallery.length - 1;
    const currentPictureNumber = this.state.pictureNumber;
    if (direction === 'left' && currentPictureNumber === 0) {
      this.setState({ pictureNumber: numberOfPictures });
      return;
    }
    this.setState((prevState) => ({
      pictureNumber: prevState.pictureNumber - 1,
    }));
  }

  switchPictureToRight(e: any) {
    const { direction } = e.target.dataset;
    const numberOfPictures = this.state.initialDescription.gallery.length - 1;
    const currentPictureNumber = this.state.pictureNumber;
    if (direction === 'right' && currentPictureNumber === numberOfPictures) {
      this.setState({ pictureNumber: 0 });
      return;
    }
    this.setState((prevState) => ({
      pictureNumber: prevState.pictureNumber + 1,
    }));
  }

  componentDidMount() {
    this.setDisplayingCurrency();
  }

  componentDidUpdate() {
    if (this.state.initialChoosenElementIndex === -1) {
      this.setState({
        initialChoosenElementIndex: 0,
      });
    }

    if (this.state.initCurrency !== this.props.currency) {
      this.setDisplayingCurrency();
    }
  }

  render(): JSX.Element {
    const { initialDescription } = this.state;
    const itemsInCategory = this.props.categoryItem.amount;
    const photosAmount = this.state.initialDescription.gallery.length;
    let itemIds = {};
    if (this.props.categoryItem !== undefined) {
      itemIds = {
        itemsIds: this.props.categoryItem.itemIds,
        productId: initialDescription.id,
      };
    }
    return (this.props.categoryItem || null) && (
      <>
        <div
          className={`
            ${itemsInCategory! > 0 ? 'show-cart-list' : 'hide-list'}
            ${window.location.hash === '#/bag' ? 'show-bag-list' : ''}
          `}
        >
          <div className='header__cart-description'>
            <div className='header__cart-list__brand'>{initialDescription.brand}</div>

            <div className='header__cart-list__name'>{initialDescription.name}</div>

            <div className='header__cart-list__price'>
              {this.state.symbol} {(this.state.amount).toFixed(2)}
            </div>

            
              <div key={this.props.categoryItem.itemIds?.join()}
                className={`${this.props.categoryItem.attributes.length > 0 ? 'header__cart-list__params' : ''}`}>
                <ChoosenParamsList attributes={this.props.categoryItem.attributes} />
              </div>
          </div>
          <div className={`${window.location.hash === '#/bag' ? 'bag__cart-list__amount__preview' : 'header__cart-list__amount__preview'}`}>
            <div className='header__cart-list__amount'>
              <button className='header__cart-list__amount-control'
                onClick={() => this.props.addProduct(this.props.categoryItem)}>
                +
              </button>

              <div className='header__cart-list__amount-value'>
                {this.props.categoryItem.amount}
              </div>

              <button className='header__cart-list__amount-control'
                onClick={() => {
                  this.props.removeProduct(itemIds as RemoveProduct)
                  if (this.props.categoryItem.amount === 1) {
                    this.setState((prevState) => ({
                      initialChoosenElementIndex: prevState.initialChoosenElementIndex - 1,
                    }))
                  }
                }}>
                -
              </button>
            </div>
            <Link to={`/${initialDescription.category}/${initialDescription.id}`} className='header__cart__product__preview-wrapper'>
              <div className='header__cart__product__preview-little'>
                <div
                  className={`header__cart__product__preview_arrows 
                  ${photosAmount === 1 ? 'header__cart__product__preview_arrows-hide' : ''}`}
                >
                  <img className='product__preview-little__left'
                    src={arrow}
                    data-direction='left'
                    alt='left-arrow'
                    onClick={(e) => {
                      e.preventDefault();
                      this.switchPictureToLeft(e);
                    }}
                  />
                  <img className='product__preview-little__right'
                    src={arrow}
                    data-direction='right'
                    alt='right-arrow'
                    onClick={(e) => {
                      e.preventDefault();
                      this.switchPictureToRight(e);
                    }}
                  />
                </div>
                <img
                  alt='little-preview'
                  className={`${window.location.hash === '#/bag' ? 'product__preview__bag-little__image' : 'product__preview-little__image'}`}
                  src={this.props.categoryItem.gallery[this.state.pictureNumber]}
                />
              </div>
            </Link>
          </div>
        </div>
        <hr></hr>
      </>
    );
  }
}

const mapStateToProps = (state: CategoryStore) => ({
  currency: state.category.currency,
});

const mapDispatchToProps = { addProduct, removeProduct };

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
