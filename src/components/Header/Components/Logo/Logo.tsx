import React from 'react';
import logo from '../../../../assets/a-logo.svg';
import './Logo.css';

export class Logo extends React.Component {
  render(): JSX.Element {
    return (<img src={logo} alt='logo' className='header__logo'/>);
  }
}
