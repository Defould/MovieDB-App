import { useContext } from 'react';
import { Offline, Online } from 'react-detect-offline';
import { Spin, Alert } from 'antd';

import { GuestId, GenresList } from '../context/movieContext';
import MovieService from '../../services/movieService';
import MovieItem from '../movieItem/movieItem';

import './movieList.scss';

const MovieList = ({ moviesData, isLoading, error, noResults }) => {
  let movieService = new MovieService();

  const guestId = useContext(GuestId);
  const genresList = useContext(GenresList);

  const addRating = (sessionId, id, rating) => {
    movieService
      .rateMovie(sessionId, id, rating)
      .then((res) => res.json())
      .then((res) => console.log(res))
      .cath((e) => console.log(e));
  };

  // console.log(moviesData);
  const movieList = moviesData.map((movie) => (
    <MovieItem key={movie.id} movie={movie} addRating={addRating} genresList={genresList} guestId={guestId} />
  ));

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

  return (
    <>
      <Online>
        <div className="movie-list">
          {spin}
          {errorDetect}
          {notFound}
          {movieList}
        </div>
      </Online>
      <Offline>
        <div className="movie-list">{noInternet}</div>
      </Offline>
    </>
  );
};

export default MovieList;
