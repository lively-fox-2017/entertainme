import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class MovieListFragment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.data.tvSeries && this.props.data.tvSeries.map((item) => (
          <div key={item.id} className="media mt-1">
            <img className="d-flex mr-3 col-md-2" src={item.poster_path} alt=""/>
            <div className="media-body text-left">
            <section className="hero">
              <div className="hero-body">
                <div className="container">
                  <h1 className="title">
                    {item.title}
                  </h1>
                  <h2 className="subtitle">
                    {item.overview}
                  </h2>
                  <h5> {item.tag}</h5>
                  <h5>Popularity: {item.popularity}</h5>
                </div>
              </div>
            </section>
            </div>
          </div>
        ))}

        {this.props.data.movies && this.props.data.movies.map((item) => (
          <div key={item.id} className="media mt-1">
            <img className="d-flex mr-3 col-md-2" src={item.poster_path} alt=""/>
            <div className="media-body text-left">
            <section className="hero">
              <div className="hero-body">
                <div className="container">
                  <h1 className="title">
                    {item.title}
                  </h1>
                  <h2 className="subtitle">
                    {item.overview}
                  </h2>
                  <h5> {item.tag}</h5>
                  <h5>Popularity: {item.popularity}</h5>
                </div>
              </div>
            </section>
            </div>
          </div>
        ))}

      </div>
    );
  }
}

// export default MovieListFragment;
export default graphql(gql`
  query{
    tvSeries{
      id,
      title,
      poster_path,
      tag,
      overview,
      popularity
    }
    movies{
      id,
      title,
      poster_path,
      tag,
      overview,
      popularity
    }
  }
  `)(MovieListFragment)
