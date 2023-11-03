import { Card, Flex, Typography, Tag, Rate } from 'antd';

import './movieItem.scss';

function MovieItem({ movie }) {
  const { title, release, genre, descr, poster } = movie;

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

          <Typography.Text className="card-date" type="secondary">
            {release}
          </Typography.Text>

          <Tag className="card-genre">{genre}</Tag>

          <Typography.Text className="card-descr">{descr}</Typography.Text>

          <Rate className="card-rate" allowHalf defaultValue={5} count={10} />
        </Flex>
      </Flex>
    </Card>
  );
}

MovieItem.defaultProps = {
  poster: 'src/sourсes/img-not-found.png',
};

export default MovieItem;
