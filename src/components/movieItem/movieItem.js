import { Card, Flex, Typography, Tag, Rate } from 'antd';

import './movieItem.scss';

function MovieItem({ movie }) {
  const { title, release, genre, descr, poster, estimation } = movie;

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

          <Tag className="card-genre">{genre}</Tag>

          <Typography.Text className="card-descr">{descr}</Typography.Text>

          <Rate className="card-rate" allowHalf defaultValue={0} count={10} />
        </Flex>
      </Flex>
    </Card>
  );
}

MovieItem.defaultProps = {
  poster: 'src/sourсes/img-not-found.png',
};

export default MovieItem;
