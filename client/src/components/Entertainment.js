import React from 'react';

export default class Entertainment extends React.Component {
  render() {
    const {
      title,
      overview,
      poster_path,
      popularity,
    } = this.props.entertainment;
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="thumbnail">
            <img
              src={ poster_path || 'http://via.placeholder.com/320x480' }
              alt={ title }
              style={ styles.entertainment_poster }
            />
            <div className="caption">
              <h3>{ title }</h3>
              <p className="text-muted">{ overview || 'No overview' }</p>
              <p>Rating: <strong>{ popularity || 'No reviews' }</strong></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  entertainment_poster: {
    height: '480px',
    width: '320px',
  }
};
