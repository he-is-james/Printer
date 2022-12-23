import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Card, Typography,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function Post({
  id, author, body, tags, likes, likePost, userLiked,
}) {
  return (
    <Card>
      <Typography variant="subtitle1">{author}</Typography>
      <Typography variant="body1">{body}</Typography>
      <Box>
        {tags.map((tag) => (
          <Typography variant="body2">{tag}</Typography>
        ))}
      </Box>
      <Typography variant="body1">
        Likes:
        {' '}
        {likes.length}
      </Typography>
      <Box onClick={() => { likePost(id, userLiked); }}>
        {userLiked
          ? <FavoriteIcon />
          : <FavoriteBorderIcon />}
      </Box>
    </Card>
  );
}

Post.propTypes = {
  id: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  likes: PropTypes.arrayOf(PropTypes.string).isRequired,
  likePost: PropTypes.func.isRequired,
  userLiked: PropTypes.bool.isRequired,
};

export default Post;
