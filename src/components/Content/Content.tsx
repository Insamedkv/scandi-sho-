import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Bag from './Components/Bag/Bag';
import CategoryItemsGrid from './Components/ItemsGrid/CategoryItemsGrid';
import { ProductPage } from './Components/ItemsGrid/ProductPage/ProductPage';
import './Content.css';

class Content extends React.Component {
  render(): JSX.Element {
    return (
      <>
        <Switch>
          <Route path='/:category/:id'
            exact
            render={(props) => <ProductPage matchParams={props.match.params} key={props.match.params.id}/>}>
          </Route>
          <Route path='/bag' exact>
            <Bag />
          </Route>
          <Route path='/'>
            <CategoryItemsGrid />
          </Route>
        </Switch>
      </>
    );
  }
}

export default Content;
