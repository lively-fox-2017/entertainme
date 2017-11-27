import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import axios from 'axios'

class Movie extends Component {
  constructor(){
      super()   
  }
  componentDidMount(){
    this.props.data.refetch()
  }
  render() {
    const movies = this.props.data.movie
    return (
      <div>
        <button onClick={() => this.props.data.refetch()}>
        Refresh
        </button>
        <ul>
        {movies && movies.map(movie => (
          <li key={movie._id}>
            {movie.title}
          </li>
        ))}
        </ul>      
        </div>
    )
  }
}
  
export default graphql(gql`
query {
  movie {
    _id
    title
  }
}
`)(Movie);