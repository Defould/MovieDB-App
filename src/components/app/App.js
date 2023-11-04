import { Component } from 'react';
import { Input, Tabs } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';

import './App.css';

import MovieService from '../../services/movieService';
import MovieList from '../movieList/movieList';

class App extends Component {
  state = {
    moviesData: [],
    isLoading: false,
    error: null,
    input: '',
    curPage: 1,
    noResults: false,
    totalResults: null,
  };

  getMovies = () => {
    const movieService = new MovieService();
    const { input, curPage } = this.state;

    this.setState({ moviesData: [], isLoading: true, noResults: false });

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

  debouncedGetMovies = debounce(this.getMovies, 1000);

  onChangeInput = (text) => {
    this.setState({ input: text });
    this.debouncedGetMovies();
  };

  clearInput = () => {
    this.setState({ input: '' });
  };

  onChangePage = (page) => {
    this.setState({ curPage: page });
    this.getMovies();
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
    const { moviesData, isLoading, error, noResults } = this.state;
    const suffix = this.state.input ? <CloseOutlined onClick={this.clearInput} /> : <span />;

    return (
      <div className="app">
        <Tabs defaultActiveKey="1" items={this.items} onChange={this.onChange} />
        <Input
          className="search"
          onChange={(e) => this.onChangeInput(e.target.value)}
          value={this.state.input}
          placeholder="Type to search..."
          suffix={suffix}
        />

        <MovieList
          moviesData={moviesData}
          isLoading={isLoading}
          error={error}
          noResults={noResults}
          onChangePage={this.onChangePage}
        />
      </div>
    );
  }
}

export default App;
