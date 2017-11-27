import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Entertainme extends Component {
  componentDidMount() {
    const { refetch } = this.props.data;
    refetch();
  }

  render() {
    const { movies } = this.props.data;
    const { tvs } = this.props.data;

    return (
      <div style={ styles.container }>
      {
        movies && movies.map(movie => (
        <div style={ styles.wrapper }>
          <img style={ styles.img } src={movie.poster_path} alt={movie.title}/>
          <div style={ styles.info }>
            <p style={ styles.tag }>Movies</p>
            <p style={ styles.title }>{movie.title}</p>
            <p style={ styles.rating }>Rating: 
              <span style={ styles.ratingScore }>{movie.popularity}</span>
            </p>
            <p style={ styles.desc }>{movie.overview}</p>
          </div>
        </div>
        ))
      }
      {
        tvs && tvs.map(tv => (
          <div style={ styles.wrapper }>
            <img style={ styles.img } src={tv.poster_path} alt={tv.title}/>
            <div style={ styles.info }>
              <p style={ styles.tag }>Series</p>
              <p style={ styles.title }>{tv.title}</p>
              <p style={ styles.rating }>Rating: 
                <span style={ styles.ratingScore }>{tv.popularity}</span>
              </p>
              <p style={ styles.desc }>{tv.overview}</p>
            </div>
          </div>
        ))
      }
      </div>
    );
  }
}

const styles = {
  container: {
    background: '#000',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    padding: '32px 0'
  },
  wrapper: {
    display: 'flex',
    width: '45%',
    padding: '16px',
    marginBottom: '8px',
  },
  img: {
    width: '100%',
    padding: '16px',
    height: 'auto',
  },
  info: {
    width: '100%',
    padding: '16px 0'
  },
  tag: {
    color: '#F8BBD0',
    paddingBottom: '8px',
    borderBottom: '1px solid #F8BBD0',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    fontSize: '12px'
  },
  title: {
    color: '#EC407A',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  rating: {
    color: '#F8BBD0',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px'
  },
  ratingScore: {
    color: '#EC407A',
  },
  desc: {
    color: '#dfdfdf',
    letterSpacing: '1.2px',
    fontSize: '14px',
    fontWeight: '200'
  }
}

const query = `
query {
  movies {
    _id
    title
    overview
    poster_path
    popularity
  }
  tvs {
    _id
    title
    overview
    poster_path
    popularity
  }
}
`
export default graphql(gql`${query}`)(Entertainme);