import { Offline, Online } from 'react-detect-offline';
import { Pagination, Spin, Alert } from 'antd';

import MovieItem from '../movieItem/movieItem';

import './movieList.scss';

const MovieList = ({ moviesData, isLoading, error, noResults, onChangePage }) => {
  const movieList = moviesData.map((movie) => <MovieItem key={movie.id} movie={movie} />);

  const spin = isLoading ? (
    <Spin className="spin" tip="Loading" size="large">
      <div />
    </Spin>
  ) : null;

  const notFound = noResults ? (
    <Alert
      className="alert"
      message="Not found"
      description="There are no movies satisfying the request"
      type="info"
      closable
    />
  ) : null;

  const errorDetect = error ? (
    <Alert
      className="alert"
      message="Something went wrong"
      description="We are detected error and already fixing it, please try later"
      type="error"
      closable
    />
  ) : null;

  const noInternet = (
    <Alert
      className="alert"
      message="Oooops"
      description="It looks like there is no internet, please check your connection"
      type="error"
      closable
    />
  );

  const pagination =
    moviesData.length > 0 ? (
      <Pagination className="pagination" onChange={onChangePage()} defaultCurrent={1} total={50} defaultPageSize={20} />
    ) : null;

  return (
    <>
      <Online>
        <div className="movie-list">
          {spin}
          {errorDetect}
          {notFound}
          {movieList}
          {pagination}
        </div>
      </Online>
      <Offline>
        <div className="movie-list">{noInternet}</div>
      </Offline>
    </>
  );
};

export default MovieList;