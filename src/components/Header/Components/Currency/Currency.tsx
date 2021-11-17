import React from 'react';
import { connect } from 'react-redux';
import { client } from '../../../..';
import { changeCurrency } from '../../../../store/slice/categorySlice';
import currenciesSymbols from '../../../../utility/currencies';
import { CategoryStore } from '../../../../utility/generalInterfaces';
import { GET_CURRENCIES } from '../../../../utility/queries/queries';
import { CurrencyProps, CurrencyState } from './interface';
import './Currency.css';

class Currency extends React.Component<CurrencyProps, CurrencyState> {
  wrapperRef: React.RefObject<HTMLDivElement>;

  constructor(props: CurrencyProps) {
    super(props);

    this.wrapperRef = React.createRef();

    this.state = {
      isOpen: false,
      selectedItem: '',
      data: {
        currencies: [],
      },
    };

    this.showList = this.showList.bind(this);
    this.selectListItem = this.selectListItem.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  showList(): void {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  }

  selectListItem(item: string): void {
    this.setState((prevState) => ({
      selectedItem: item,
      isOpen: !prevState.isOpen,
    }));
  }

  handleClickOutside(event: any) {
    if (this.wrapperRef && !this.wrapperRef.current?.contains(event.target)) {
      if (this.state.isOpen === true) this.showList();
    }
  }

  componentDidMount(): void {
    client.query(GET_CURRENCIES).then((res: CurrencyState) => {
      this.setState({
        data: res.data,
        selectedItem: res.data.currencies[0],
      });
    });
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  render(): JSX.Element {
    return (
      <div ref={this.wrapperRef} className='header__payment-container'>
        <div className='header__payment-selected' onClick={this.showList}>
          <div>{currenciesSymbols[this.state.selectedItem!]}</div>
          <div className={`header__payment-arrow ${this.state.isOpen ? 'rotate-arrow' : ''}`}></div>
        </div>
        <div className='header__payment-list-container'>
          <ul className={`header__payment-list ${this.state.isOpen ? 'show-list' : 'hide-list'}`}>
            {this.state.data.currencies.map((el) => (
              <li className='header__payment-list-element'
                key={el}
                onClick={() => {
                  this.selectListItem(el);
                  this.props.changeCurrency(el);
                }}
              >
                {currenciesSymbols[el]} {el}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: CategoryStore) => ({
  currency: state.category.currency,
});

const mapDispatchToProps = { changeCurrency };

export default connect(mapStateToProps, mapDispatchToProps)(Currency);
