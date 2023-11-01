import { Card, Flex, Typography, Tag, Rate } from 'antd';

import './movieItem.scss'

function MovieItem(props) {
  const { title, release, genre, descr, poster, estimation } = props;
  <Card
    hoverable
    className='card'
    bodyStyle={{
      padding: 0,
      overflow: 'hidden',
    }}
  >
    <Flex justify="space-start">
      <img
        alt="avatar"
        src={poster}
        className='card-img'
      />
      <Flex
        vertical
        align="flex-start"
        justify="space-between"
        style={{
          padding: 12,
        }}
      >
        <Typography.Title level={2} className='card-title'>
          {title}
        </Typography.Title>

        <Typography.Text type="secondary">{release}</Typography.Text>

        <Tag>{genre}</Tag>

        <Typography.Text>
          {descr}
        </Typography.Text>

        <Rate allowHalf defaultValue={0} count={10} />
      </Flex>
    </Flex>
  </ Card>
}

export default MovieItem;
