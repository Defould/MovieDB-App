import { Component } from 'react';

import MovieService from '../services/movieService';
import MovieList from '../movieList/movieList';

class App extends Component {
  constructor() {
    super();

    this.initState();
  }
  state = {
    moviesData: []
  }

  initState = () => {
    const movieService = new MovieService();

    movieService.getSearchMovies()
      .then(moviesData => {
        this.setState({ moviesData: moviesData });
      })
      .catch(e => {
        throw new Error(e)
      })
  }

  render() {
    return (
      <MovieList moviesData={this.state.moviesData} />
    )
  }
     
}

export default App;
