import { Offline, Online } from 'react-detect-offline';
import { Pagination, Spin, Alert } from 'antd';

import MovieItem from '../movieItem/movieItem';

import './movieList.scss';

const MovieList = ({ moviesData, isLoading, error, noResults }) => {
  const movieList = moviesData.map((movie) => <MovieItem key={movie.id} movie={movie} />);

  return (
    <>
      <Online>
        <div className="movie-list">
          {isLoading && (
            <Spin tip="Loading" size="large">
              <div className="spin" />
            </Spin>
          )}
          {error && (
            <Alert
              className="alert"
              message="Something went wrong"
              description="We are detected error already fixing it, please try later"
              type="error"
              closable
            />
          )}
          {noResults ? (
            <Alert
              className="alert"
              message="Not found"
              description="There are no movies satisfying the request"
              type="info"
              closable
            />
          ) : (
            movieList
          )}
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </Online>
      <Offline>
        <div className="movie-list">
          <Alert
            className="alert"
            message="Oooops"
            description="Шt looks like there is no internet, please check your connection"
            type="error"
            closable
          />
        </div>
      </Offline>
    </>
  );
};

export default MovieList;
