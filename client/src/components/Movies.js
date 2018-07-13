import React, {Component} from 'react'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Movies extends Component{
  constructor(props) {
    super(props)
    // console.log(props.data);
    props.data.refetch()

  }
  render(){
    console.log(this.props.data);
    if (this.props.data.movies !== undefined) {
      var movies = [...this.props.data.movies,...this.props.data.tv_series]
      console.log(movies);
    }

    return (
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>title</th>
              <th>popularity</th>
              <th>overview</th>
            </tr>
          </thead>
          <tbody>
            {movies && movies.map((movie,index) => (
              <tr key={index}>
                <td>{movie.title}</td>
                <td>{movie.popularity}</td>
                <td>{movie.overview}</td>
                {/* {movie.title}, {movie.popularity}, {movie.overview} */}
              </tr>
            ))}
          </tbody>
        </table>
        {/* <ul>
          {movies && movies.map((movie,index) => (
            <li key={index}>
              {movie.title}, {movie.popularity}, {movie.overview}
            </li>
          ))}
        </ul> */}
      </div>
    );
  }
}

export default graphql(gql`
  query {
    movies {
      poster_path
      overview
      title
      popularity
      tag
    }
    tv_series {
      poster_path
      overview
      title
      popularity
      tag
    }
  }
`)(Movies);
