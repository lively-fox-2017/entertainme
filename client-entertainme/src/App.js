import React, { Component } from 'react';
import { ApolloProvider, graphql } from 'react-apollo';
import gql from 'graphql-tag';

import logo from './logo.svg';
import MovieListFragment from './components/MovieListFragment';
import './App.css';
import apolloClient from './ApolloClient';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <div className="App">
          <header className="App-header">
             <h1 className="title">
               GraphQL Client Implementation
             </h1>
          </header>
          <MovieListFragment/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;

// export default graphql(gql`
//   query movies{
//     id
//   }
//   `)(App)
