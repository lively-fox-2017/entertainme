import React, { Component } from 'react';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';

import Movie from './components/Movie'
import logo from './logo.svg';
import './App.css';

const client = new ApolloClient({
  link: new HttpLink({uri: 'http://localhost:3000/movie'}),
  cache: new InMemoryCache()
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <Movie />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
