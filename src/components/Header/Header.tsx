import React from 'react';
import './Header.css';
import Cart from './Components/Cart/Cart';
import Categories from './Components/Categories/Categories';
import Currency from './Components/Currency/Currency';
import { Logo } from './Components/Logo/Logo';

class Header extends React.Component {
  render(): JSX.Element {
    return (
      <header className="header">
        <Categories />
        <Logo />
        <div className="header__payment">
          <Currency />
          <Cart />
        </div>
      </header>
    );
  }
}

export default Header;
