import ReactDOM from 'react-dom';
import './index.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  DefaultOptions,
} from '@apollo/client';
import React from 'react';
import { Provider } from 'react-redux';
import { App } from './components/App';
import { store } from './store/store';

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  defaultOptions,
});

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById('root'),
);
