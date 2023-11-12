import React from 'react';
import { Card, Flex, Rate, Tag, Typography } from 'antd';

import MovieService from '../../services/movieService';

import './movieItem.scss';

function MovieItem({ movie, genresList, guestId }) {
  const { title, release, genre, descr, poster, estimation, rate } = movie;
  const movieService = new MovieService();

  const genreNames =
    genresList.length > 0
      ? genre.map((genreId) => {
        const matchingGenre = genresList.find((genre) => genre.id === genreId);
        return matchingGenre ? matchingGenre.name : 'Unknown genre';
      })
      : ['Unknown genre'];

  function getColorEstimation(estimation) {
    if (estimation >= 0 && estimation < 3) {
      return '#E90000';
    } else if (estimation >= 3 && estimation < 5) {
      return '#E97E00';
    } else if (estimation >= 5 && estimation < 7) {
      return '#E9D100';
    } else {
      return '#66E900';
    }
  }

  const handleRatingChange = (rating) => {
    if (guestId) {
      movieService.rateMovie(guestId, movie.id, rating);
      console.log(`movie rated with session: ${guestId} rating: ${rating} movieId: ${movie.id}`);
    } else {
      console.warn('Невозможно оценить фильм. Создайте гостевую сессию.');
    }
  };

  return (
    <Card
      hoverable
      className="card"
      bodyStyle={{
        padding: 0,
        overflow: 'hidden',
      }}
    >
      <Flex justify="space-start">
        <img alt={title} src={poster} className="card-img" />
        <Flex
          vertical
          align="flex-start"
          style={{
            padding: 12,
          }}
        >
          <Typography.Text className="card-title">{title}</Typography.Text>

          <div className="estimation" style={{ border: `2px solid ${getColorEstimation(estimation.toFixed(1))}` }}>
            {estimation.toFixed(1)}
          </div>

          <Typography.Text className="card-date" type="secondary">
            {release}
          </Typography.Text>

          <div className="card-genre">
            {genreNames.map((genreName, index) => (
              <Tag key={index}>{genreName || 'Неизвестный жанр'}</Tag>
            ))}
          </div>

          <Typography.Text className="card-descr">{descr}</Typography.Text>

          <Rate className="card-rate" allowHalf defaultValue={rate} count={10} onChange={handleRatingChange} />
        </Flex>
      </Flex>
    </Card>
  );
}

export default MovieItem;
