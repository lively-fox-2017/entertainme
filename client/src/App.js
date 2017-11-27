import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { ApolloProvider} from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

import Main from './components/main'

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
  cache: new InMemoryCache()
});



class App extends Component {
  constructor(props) {
    super()
    this.state = {
      movies: [],
      series: []
    }
  }
  componentWillMount() {
    client.query({
      query: gql`
      query {
        movies {
          name
          poster_path
          _id
        }
        series {
          name
          popularity
          poster_path
          _id
        }
      }
      `,
    })
      .then(data => {
          this.setState({
            movies: data.data.movies,
            series: data.data.series
          }, () => {
            console.log(this.state)
          })
        })
      .catch(error => 
        console.error(error));
  }

  render() {
    return (
      <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Main/>
        {JSON.stringify(this.state.movies)}
        {JSON.stringify(this.state.series)}
      </div>
      </ApolloProvider>
    );
  }
}

export default App;
