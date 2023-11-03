import { Component } from 'react';
import { Input, Tabs } from 'antd';

import './App.css';

import MovieService from '../../services/movieService';
// import MovieList from '../movieList/movieList';

class App extends Component {
  componentDidMount() {
    this.initState();
  }
  state = {
    moviesData: [],
    isLoading: true,
    error: null,
    input: 'return',
    curPage: 1,
    noResults: false,
    totalResults: null,
  };

  initState = () => {
    const movieService = new MovieService();
    const { input, curPage } = this.state;

    movieService
      .getSearchMovies(input, curPage)
      .then((movieData) => {
        if (movieData.length === 0) {
          return this.setState({ isLoading: false, noResults: true });
        } else {
          this.setState({ moviesData: movieData, isLoading: false });
        }
      })
      .catch((e) => this.setState({ isLoading: false, error: e }));
  };

  onChangeInput = (text) => {
    this.setState({ input: text });
  };

  items = [
    {
      key: '1',
      label: 'Search',
    },
    {
      key: '2',
      label: 'Rated',
    },
  ];

  render() {
    return (
      <div className="app">
        <Tabs defaultActiveKey="1" items={this.items} onChange={this.onChange} />
        <Input
          className="search"
          onChange={(e) => this.onChangeInput(e.target.value)}
          value={this.state.input}
          placeholder="Type to search..."
        />
        {/* <MovieList props={this.state} /> */}
      </div>
    );
  }
}

export default App;
