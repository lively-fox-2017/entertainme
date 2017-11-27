import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import logo from '../assets/images/logo.svg'
import '../assets/css/App.css'
import '../assets/css/bootstrap.min.css'

class MainContainer extends Component {

  constructor(props) {
    super(props)

    props.data.refetch()
  }

  render() {
    const moviesData = this.props.data.movies
    const tvsData = this.props.data.tvs
    console.log(moviesData)
    console.log(tvsData)
    return (
      <div className='App container-fluid'>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className='row'>
          <div className='col-md-6'>
            <h2>Movies</h2>
            {moviesData && moviesData.movies.map((element, index) => (
              <div key={index} className="card border-success bottom-gap">
                <div className="card-body cols-md-12">
                  <blockquote className="card-blockquote">
                    <h3>{element.title}</h3>
                    <img className="img-responsive" src={element.poster_path} />
                    <p>{element.overview}</p>
                    <p>{element.popularity}</p>
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
          <div className='col-md-6'>
            <h2>Tv Series</h2>
            {tvsData && tvsData.tvs.map((element, index) => (
              <div key={index} className="card border-success bottom-gap">
                <div className="card-body cols-md-12">
                  <blockquote className="card-blockquote">
                    <h3>{element.title}</h3>
                    <img className="img-responsive" src={element.poster_path} />
                    <p>{element.overview}</p>
                    <p>{element.popularity}</p>
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

}

export default graphql(gql`
  query Entertainme {
    movies {
      source
      movies {
        _id
        poster_path
        overview
        title
        popularity
        updatedAt
        createdAt
      }
    },
    tvs {
      source
      tvs {
        _id
        poster_path
        overview
        title
        popularity
        updatedAt
        createdAt
      }
    }
  }
`)(MainContainer)
