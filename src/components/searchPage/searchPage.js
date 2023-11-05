import { Component } from 'react';
import { Input, Pagination } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';

import MovieService from '../../services/movieService';
import MovieList from '../movieList/movieList';

import './searchPage.scss';

class SearchPage extends Component {
  state = {
    moviesData: [],
    isLoading: false,
    error: null,
    input: '',
    curPage: 1,
    noResults: false,
    totalRes: 0,
  };

  getMovies = () => {
    const movieService = new MovieService();
    const { input, curPage } = this.state;

    this.setState({ moviesData: [], isLoading: true, noResults: false });

    movieService
      .getSearchMovies(input, curPage)
      .then(([totalRes, movieData]) => {
        if (movieData.length === 0) {
          return this.setState({ isLoading: false, noResults: true });
        } else {
          this.setState({ moviesData: movieData, isLoading: false, totalRes: totalRes });
        }
      })
      .catch((e) => this.setState({ isLoading: false, error: e }));
  };

  debouncedGetMovies = debounce(this.getMovies, 500);

  onChangeInput = (text) => {
    this.setState({ input: text });
    this.debouncedGetMovies();
  };

  clearInput = () => {
    this.setState({ input: '' });
  };

  onChangePage = (page) => {
    this.setState({ curPage: page });
    this.debouncedGetMovies();
  };

  render() {
    const { moviesData, isLoading, error, curPage, noResults, totalRes, estimation } = this.state;
    const suffix = this.state.input ? <CloseOutlined onClick={this.clearInput} /> : <span />;
    const pagination =
      moviesData.length > 0 ? (
        <Pagination
          className="pagination"
          onChange={this.onChangePage}
          defaultCurrent={1}
          current={curPage}
          total={totalRes}
          defaultPageSize={20}
          showSizeChanger={false}
        />
      ) : null;

    return (
      <>
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
          estimation={estimation}
        />
        {pagination}
      </>
    );
  }
}

export default SearchPage;
