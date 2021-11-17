import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CategoryStore, ProductPrices } from '../../../../../utility/generalInterfaces';
import buyCart from '../../../../../assets/a-buy.svg';
import currenciesSymbols from '../../../../../utility/currencies';
import { ItemCardProps, ItemCardState } from './interface';
import './ItemCard.css';

class ItemCard extends React.Component<ItemCardProps, ItemCardState> {
  constructor(props: ItemCardProps) {
    super(props);

    this.state = {
      symbol: '',
      amount: 0,
      initCurrency: '',
    };

    this.setDisplayingCurrency = this.setDisplayingCurrency.bind(this);
  }

  setDisplayingCurrency() {
    const price = this.props.product.prices.find((prices: ProductPrices) => prices.currency === this.props.currency);
    const currencySymbol = currenciesSymbols[price!.currency];
    this.setState({
      symbol: currencySymbol,
      amount: price!.amount,
      initCurrency: price!.currency,
    });
  }

  componentDidMount() {
    this.setDisplayingCurrency();
  }

  componentDidUpdate() {
    if (this.state.initCurrency !== this.props.currency) {
      this.setDisplayingCurrency();
    }
  }

  render(): JSX.Element {
    return (
      <Link to={`${this.props.category}/${this.props.product.id}`} className='content__grid-item'>
          <div className={`${this.props.product.inStock ? '' : 'content__grid-item__out'}`}>
            <img src={this.props.product.gallery[0]}
              className='content__grid-item__photo'
              alt={this.props.product.name} />
            {this.props.product.inStock ? <img src={buyCart} className='content__grid-item__cart' alt='cart'/> : ''}
            <div className='content__grid-item__name'>{this.props.product.name}</div>
            <div className='content__grid-item__price'>{this.state.symbol} {this.state.amount}</div>
          </div>
      </Link>

    );
  }
}

const mapStateToProps = (state: CategoryStore) => ({
  currency: state.category.currency,
  category: state.category.value,
});

export default connect(mapStateToProps)(ItemCard);
