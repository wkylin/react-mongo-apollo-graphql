import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import moment from 'moment';

const PostCard = ({post: {body, createdAt, id, username, likeCount, likes, commentCount}}) => {
  return (
    <>
      <Card>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
          />
          <Card.Header>{username}</Card.Header>
          <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
          <Card.Description>
            {body}
          </Card.Description>
        </Card.Content>
      </Card>
    </>
)
}

export default PostCard;