import React, { Component } from 'react'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'

import MainContainer from './containers/MainContainer'

const client = new ApolloClient({
  link: new HttpLink({uri: 'http://localhost:3000/'}),
  cache: new InMemoryCache()
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <MainContainer/>
      </ApolloProvider>
    );
  }
}

export default App;
