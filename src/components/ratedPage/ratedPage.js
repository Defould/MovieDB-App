import { Component } from 'react';
import { Pagination } from 'antd';

import MovieList from '../movieList/movieList';

class RatedPage extends Component {
  componentDidMount() {
    this.getRatedMovies();
  }

  state = {
    moviesData: [],
    curPage: 1,
    defaultPageSize: 20,
    noResults: true,
    totalRes: 0,
    rate: 0,
  };

  getRatedMovies() {
    const moviesList = JSON.parse(localStorage.getItem('ratedMovies'));

    if (moviesList) {
      const { curPage, defaultPageSize } = this.state;
      const startIndex = (curPage - 1) * defaultPageSize;
      const endIndex = startIndex + defaultPageSize;

      const moviesData = moviesList.slice(startIndex, endIndex);

      this.setState({
        moviesData: moviesData,
        curPage: curPage,
        noResults: false,
        totalRes: moviesList.length,
        rate: moviesList.rate,
      });
    } else {
      return;
    }
  }

  onChangePage = (page) => {
    this.setState({ curPage: page }, () => {
      this.getRatedMovies();
    });
  };

  render() {
    const { moviesData, curPage, noResults, totalRes, rate, defaultPageSize } = this.state;
    const pagination =
      moviesData.length > 0 ? (
        <Pagination
          className="pagination"
          onChange={this.onChangePage}
          defaultCurrent={1}
          current={curPage}
          total={totalRes}
          defaultPageSize={defaultPageSize}
          showSizeChanger={false}
        />
      ) : null;

    return (
      <>
        <MovieList moviesData={moviesData} noResults={noResults} rate={rate} />
        {pagination}
      </>
    );
  }
}

export default RatedPage;
