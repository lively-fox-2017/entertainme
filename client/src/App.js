import React, { Component } from 'react';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Entertainments from './components/Entertainments';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:3000/graphql' }),
  cache: new InMemoryCache(),
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={ client }>
        <div className="container">
          <Entertainments />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
