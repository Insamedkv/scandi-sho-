import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CategoryStore, Product, ProductPrices } from '../../../../../utility/generalInterfaces';
import buyCart from '../../../../../assets/a-buy.svg';
import currenciesSymbols from '../../../../../utility/currencies';
import { ItemCardProps, ItemCardState } from './interface';
import './ItemCard.css';
import { getCategoryItemById } from '../../../../../utility/queries/queries';
import { client } from '../../../../..';
import { addProduct } from '../../../../../store/slice/cartSlice';

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
    const itemQuery = getCategoryItemById(this.props.product.id);
    client.query(itemQuery).then((res: Product) => {
      this.setState({
        buyFromMain: res.data.product,
      });
    });
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
            {this.props.product.inStock ?
              <img src={buyCart}
                className='content__grid-item__cart'
                alt='cart'
                onClick={(e) => {
                  this.props.addProduct!(this.state.buyFromMain!);
                  e.preventDefault();
                }}
              />
              : ''
            }
            <div className='content__grid-item__name'>{this.props.product.brand} {this.props.product.name}</div>
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

const mapDispatchToProps = { addProduct };

export default connect(mapStateToProps, mapDispatchToProps)(ItemCard);
