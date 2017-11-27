import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:3000/graphql' }),
  cache: new InMemoryCache()
});

class App extends Component {
  constructor(){
      super()
      this.state={
        movies: [],
        series:[]
      }
  }

  componentWillMount(){
    client.query({ query: gql`{
      movies{
        _id
    		title
        overview
    		popularity
    		poster_path
    	},
    	series{
        _id
    		title
        overview
    		popularity
    		poster_path
    	}
    }` }).then(({data}) => {
      this.setState({movies:data.movies,series:data.series})
    });
  }

  render() {
    return (
      <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome 2 Entertainment</h1>
        </header>
        <div className='container' >
          <div className='row'>
            <h2>Movies</h2>
            <div className='col-md-6 col-md-offset-3'>
            { this.state.movies.map((item,idx)=>{
                return(
                  <div className="panel panel-default">
                    <div className="panel-body">
                      <h3>{item.title}</h3>
                      <img className="img-responsive" src={item.poster_path} alt=""/>
                        <br/>
                        <p>{item.overview}</p>
                        <p>Review: {item.popularity}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='row'>
            <h2>TV Series</h2>
            <div className='col-md-6 col-md-offset-3'>
            { this.state.series.map((item,idx)=>{
                return(
                  <div className="panel panel-default">
                    <div className="panel-body">
                      <h3>{item.title}</h3>
                      <img className="img-responsive" src={item.poster_path} alt=""/>
                        <br/>
                        <p>{item.overview}</p>
                        <p>Review: {item.popularity}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      </ApolloProvider>
    );
  }
}

export default App;
