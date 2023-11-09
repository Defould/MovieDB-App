import { Card, Flex, Rate, Tag, Typography } from 'antd';

import { useGenres } from '../context/GenreContext';

import './movieItem.scss';

function MovieItem({ movie }) {
  const { title, release, genre, descr, poster, estimation, rate } = movie;
  const genres = useGenres();

  const genreNames =
    genre.length > 0
      ? genre.map((genreId) => {
        const matchingGenre = genres.find((genre) => genre.id === genreId);
        return matchingGenre ? matchingGenre.name : 'Unknown Genre';
      })
      : ['Unknown Genre'];

  function onRated(rate) {
    let moviesList = JSON.parse(localStorage.getItem('ratedMovies'));

    if (!moviesList) {
      moviesList = [];
    }

    const movieData = { ...movie, rate };
    const index = moviesList.findIndex((movieItem) => movieItem.id === movieData.id);

    if (index !== -1) {
      moviesList[index] = movieData;
    } else {
      moviesList.push(movieData);
    }

    localStorage.setItem('ratedMovies', JSON.stringify(moviesList));
  }

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
              <Tag key={index}>{genreName || 'Unknown Genre'}</Tag>
            ))}
          </div>

          <Typography.Text className="card-descr">{descr}</Typography.Text>

          <Rate className="card-rate" allowHalf defaultValue={rate} count={10} onChange={onRated} />
        </Flex>
      </Flex>
    </Card>
  );
}

export default MovieItem;
