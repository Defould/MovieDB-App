import React, { useContext, useEffect, useState } from 'react';
import { Pagination } from 'antd';

import { GuestId } from '../context/movieContext';
import MovieService from '../../services/movieService';
import MovieList from '../movieList/movieList';

const RatedPage = () => {
  const [ratedMovies, setRatedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [curPage, setCurPage] = useState(1);
  const [noResults, setNoResults] = useState(false);
  const [totalRes, setTotalRes] = useState(0);
  const defaultPageSize = 20;
  // console.log(ratedMovies);

  const guestId = useContext(GuestId);

  const movieService = new MovieService();

  useEffect(() => {
    getRatedMovies();
  }, [guestId, curPage]);

  const getRatedMovies = () => {
    setIsLoading(true);

    movieService
      .getRatedMovies(guestId, curPage)
      .then(([totalResults, movies]) => {
        setRatedMovies(movies);
        setTotalRes(totalResults);
        setNoResults(totalResults === 0);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Ошибка при получении оцененных фильмов:', error);
        setError('Произошла ошибка при получении оцененных фильмов.');
        setIsLoading(false);
      });
  };

  const onChangePage = (page) => {
    setCurPage(page);
  };

  const pagination = ratedMovies ? (
    <Pagination
      className="pagination"
      onChange={onChangePage}
      defaultCurrent={1}
      current={curPage}
      total={totalRes}
      defaultPageSize={defaultPageSize}
      showSizeChanger={false}
    />
  ) : null;

  return (
    <>
      <MovieList moviesData={ratedMovies} noResults={noResults} />
      {pagination}
    </>
  );
};

export default RatedPage;
