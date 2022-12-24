/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import {
  Box, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'axios';
import Post from './Post';
import Sort from './Sort';

function PostsDisplay({ printerId, numPosts }) {
  const [posts, setPosts] = useState([]);
  const [updateLikes, setUpdateLikes] = useState(0);
  const [sortSelection, setSortSelection] = useState('');

  const sortMethods = {
    '': () => {},
    a: (a, b) => (a.body.localeCompare(b.body)),
    z: (a, b) => (b.body.localeCompare(a.body)),
    m: (a, b) => (b.likes.length - a.likes.length),
    l: (a, b) => (a.likes.length - b.likes.length),
  };

  const getLikedPosts = async () => {
    const likedPosts = await axios.get('http://localhost:4000/user/all-liked-posts', { params: { id: printerId } });
    likedPosts.data.sort();
    return likedPosts.data;
  };

  const getPosts = async () => {
    const currentPosts = await axios.get('http://localhost:4000/print/all-prints');
    return currentPosts.data;
  };

  const renderPosts = async () => {
    const currentPosts = await getPosts();
    const likedPosts = await getLikedPosts();
    let i = 0;
    currentPosts.forEach((post) => {
      if (post._id === likedPosts[i]) {
        post.userLiked = true;
        i += 1;
      } else {
        post.userLiked = false;
      }
    });
    setPosts(currentPosts);
  };

  const likePost = async (printId, userLiked) => {
    if (!userLiked) {
      await axios.post('http://localhost:4000/print/update-likes', {
        printId,
        command: { $push: { likes: printerId } },
      });
      await axios.post('http://localhost:4000/user/update-likes', {
        printerId,
        command: { $push: { postsLiked: printId } },
      });
      setUpdateLikes(updateLikes + 1);
    } else {
      await axios.post('http://localhost:4000/print/update-likes', {
        printId,
        command: { $pull: { likes: { $in: printerId } } },
      });
      await axios.post('http://localhost:4000/user/update-likes', {
        printerId,
        command: { $pull: { postsLiked: { $in: printId } } },
      });
      setUpdateLikes(updateLikes - 1);
    }
  };

  useEffect(() => {
    renderPosts();
  }, [numPosts, updateLikes]);

  return (
    <Box>
      <Sort setSortSelection={setSortSelection} />
      <Box>
        <Typography variant="h5">
          Posts:
        </Typography>
        {posts.sort(sortMethods[sortSelection]).map((post) => (
          <Post
            key={post._id}
            id={post._id}
            author={post.author}
            body={post.body}
            tags={post.tags}
            likes={post.likes}
            likePost={likePost}
            userLiked={post.userLiked}
          />
        ))}
      </Box>
    </Box>
  );
}

PostsDisplay.propTypes = {
  printerId: PropTypes.string.isRequired,
  numPosts: PropTypes.number.isRequired,
};

export default PostsDisplay;
