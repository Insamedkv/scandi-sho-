import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Content from './Content/Content';
import Header from './Header/Header';

export class App extends React.Component {
  render(): JSX.Element {
    return (
      <Router>
        <Header />
        <Content />
      </Router>
    );
  }
}
