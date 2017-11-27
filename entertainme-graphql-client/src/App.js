import React, { Component } from 'react';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import './App.css';
import Entertainme from './components/Entertainme';

const client = new ApolloClient({
  link: new HttpLink({uri: `http://localhost:3000/graphql`}),
  cache: new InMemoryCache()
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={ client }>
        <Entertainme/>
      </ApolloProvider>
    );
  }
}

export default App;
