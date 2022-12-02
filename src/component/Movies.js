import React from 'react';
import Movie from './Movie';

class Movies extends React.Component {
  render() {
    let cityMovies = this.props.movies.map((movie, index) => {
      return (
      <Movie
        key={index}
        movieData={movie}
      />
    )
      });

    return (
      <>
        <h2>{this.props.cityName} movies</h2>
        <ul>
          {cityMovies}
        </ul>
        <Movie

        />
      </>
    );
  }
}

export default Movies;
