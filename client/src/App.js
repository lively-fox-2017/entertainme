import React, { Component } from 'react';
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import gql from 'graphql-tag'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import logo from './logo.svg';
import './App.css';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:3000/movieTV/graphQL'
  }),
  cache: new InMemoryCache()
});

class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      tv: []
    }
  }

  componentWillMount() {
    client.query({
      query: gql`
        query MyQuery {
          movies {
            _id
            title
            popularity
            poster_path
            tag
          }
          tv {
            _id
            title
            popularity
            poster_path
            tag
          }
        }`
    }).then(({data}) => {
      // console.log(data.movies);
      this.setState({
        movies: data.movies,
        tv: data.tv
      })
    })
  }

  render() {
    console.log(this.state.movies)
    return (
      <ApolloProvider client={ client }>
        <div className="App">
          <header>
            <img src={logo} className="App-logo" alt="logo" />
            <h2 style={{'color': 'red'}}>Welcome to React Movies and TV Series</h2>
          </header>
          <div className="col-md-5">
          { this.state.movies ?
            this.state.movies.map((movie, index) => {
              return (
                <div key={ index }>
                  <h3 className="bg-primary" style={{'padding': 10+'px'}}>{ movie.title }</h3>
                  <div className="text-right">
                    <img src="https://cdn.dribbble.com/users/819721/screenshots/3329752/cc-star_800600.gif" alt="" width="80px" />
                    <span style={{'fontSize':24, 'paddingRight':10+'px'}}>{ movie.popularity }</span>
                  </div>
                  <img src={ movie.poster_path } alt="" width="100%" height="600px"/>
                  <div className="text-left">Tags { movie.tag.join(", ") }</div>
                  <p style={{'fontSize':22+'px', 'backgroundColor':'#eaeaea'}}>No Overview</p>
                </div>
              )
          })
          : 'loading..' }
          </div>
          <div className="col-md-2" style={{'height': 100+'vh'}}>
          </div>
          <div className="col-md-5">
          { this.state.tv ?
            this.state.tv.map((tvone, index) => {
              return (
                <div key={ index }>
                  <h3 className="bg-primary" style={{'padding': 10+'px'}}>{ tvone.title }</h3>
                  <div className="text-right">
                    <img src="https://cdn.dribbble.com/users/819721/screenshots/3329752/cc-star_800600.gif" alt="" width="80px" />
                    <span style={{'fontSize':24, 'paddingRight':10+'px'}}>{ tvone.popularity }</span>
                  </div>
                  <img src={ tvone.poster_path } alt="" width="100%" height="600px"/>
                  <div className="text-left">Tags { tvone.tag.join(", ") }</div>
                  <p style={{'fontSize':22+'px', 'backgroundColor':'#eaeaea'}}>No Overview</p>
                </div>
              )
          })
          : 'loading..' }
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
