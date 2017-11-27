import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Entertainment from './Entertainment'

class Entertainments extends React.Component {
  render() {
    const { movies, series } = this.props.data;
    return (
      <div>
        <h1>EntertainMe using GraphQL</h1>
        <hr/>
        <div className="row">
          <div className="col-md-6">
            <h2>Movies</h2>
            {
              movies && movies.map((movie) => (
                <Entertainment entertainment={ movie } key={ movie._id } />
              ))
            }
          </div>
          <div className="col-md-6">
            <h2>Series</h2>
            {
              series && series.map((serie) => (
                <Entertainment entertainment={ serie } key={ serie._id } />
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default graphql(gql`
  query {
    movies {
      _id,
      title,
      overview,
      poster_path,
      popularity,
    }
    series {
      _id,
      title,
      overview,
      poster_path,
      popularity,
    }
  }
`)(Entertainments);
