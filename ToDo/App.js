/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { ApolloProvider } from 'react-apollo';
import client from './src/apollo';

import Home from './src/components/home/home.component';

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Home />
      </ApolloProvider>  
    );
  }
}

