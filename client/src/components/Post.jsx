import React from 'react';
import PropTypes from 'prop-types';

function Post({
  id, author, body, tags, likes, likePost, userLiked,
}) {
  return (
    <div className="Post">
      <div className="Printer">
        {author}
      </div>
      <div className="Print">
        {body}
      </div>
      <div className="Tags">
        {tags.map((tag) => (
          <div className="Tag">
            {tag}
          </div>
        ))}
      </div>
      <div className="Likes">
        Likes:
        {' '}
        {likes.length}
      </div>
      <div className="Heart">
        {userLiked ? 'Liked' : 'Not liked'}
      </div>
      <button type="button" onClick={() => { likePost(id, userLiked); }}>Like</button>
    </div>
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
