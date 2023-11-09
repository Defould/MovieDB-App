import { Component } from 'react';
import { Input, Pagination } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';

import MovieService from '../../services/movieService';
import MovieList from '../movieList/movieList';

import './searchPage.scss';

class SearchPage extends Component {
  componentDidMount() {
    this.getSession();
  }

  state = {
    moviesData: [],
    isLoading: false,
    error: null,
    input: '',
    curPage: 1,
    noResults: false,
    totalRes: 0,
    rate: 0,
  };

  getSession = () => {
    const session = new MovieService();
    session
      .getGuestSession()
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
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
          //продебажить
          // const moviesList = JSON.parse(localStorage.getItem('ratedMovies'));
          // const moviesData = movieData.map((movie) => {
          //   const ratedMovie = moviesList.find((m) => m.id === movie.id);
          //   if (ratedMovie) {
          //     return { ...movie, rate: ratedMovie.rate };
          //   }
          //   return movie;
          // });
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
    const { moviesData, isLoading, error, curPage, noResults, totalRes, estimation, rate } = this.state;
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
          rate={rate}
        />
        {pagination}
      </>
    );
  }
}

export default SearchPage;
