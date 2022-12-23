/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import {
  Box, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import Post from './Post';
import Sort from './Sort';

function PostsDisplay({ printerId, numPosts }) {
  const [posts, setPosts] = useState([]);
  const [updateLikes, setUpdateLikes] = useState(0);
  const [sortSelection, setSortSelection] = useState('');

  const sortMethods = {
    '': () => null,
    a: (a, b) => (a.body.localeCompare(b.body)),
    z: (a, b) => (b.body.localeCompare(a.body)),
    m: (a, b) => (b.likes.length - a.likes.length),
    l: (a, b) => (a.likes.length - b.likes.length),
  };

  const getLikedPosts = () => {
    const saved = localStorage.getItem('users');
    const { postsLiked } = JSON.parse(saved)[printerId];
    return postsLiked;
  };

  const getPosts = () => {
    const saved = localStorage.getItem('posts');
    const currentPosts = JSON.parse(saved) || [];
    const likedPosts = getLikedPosts();
    likedPosts.sort();
    let i = 0;
    currentPosts.forEach((post, index) => {
      if (index === likedPosts[i]) {
        post.userLiked = true;
        i += 1;
      } else {
        post.userLiked = false;
      }
    });
    setPosts(currentPosts);
    return currentPosts;
  };

  const updateTags = (currentPosts) => {
    const lastPostId = currentPosts.length - 1;
    if (lastPostId >= 0) {
      const currentTags = JSON.parse(localStorage.getItem('tags')) || {};
      currentPosts[lastPostId].tags.forEach((tag) => {
        if (currentTags[tag]) {
          currentTags[tag].push(lastPostId);
        } else {
          currentTags[tag] = [lastPostId];
        }
      });
      localStorage.setItem('tags', JSON.stringify(currentTags));
    }
  };

  const likePost = (postId, userLiked) => {
    if (!userLiked) {
      const updatedPosts = posts.map((post, index) => {
        if (index === postId) {
          post.likes = [...post.likes, printerId];
          post.userLiked = true;
        }
        return post;
      });
      setPosts(updatedPosts);
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      setUpdateLikes(updateLikes + 1);
      const currentLikedPosts = JSON.parse(localStorage.getItem('users'));
      currentLikedPosts[printerId].postsLiked.push(postId);
      localStorage.setItem('users', JSON.stringify(currentLikedPosts));
    } else {
      const removeLike = posts.map((post, index) => {
        if (index === postId) {
          const toRemove = post.likes.indexOf(printerId);
          post.likes.splice(toRemove, 1);
          post.userLiked = false;
        }
        return post;
      });
      localStorage.setItem('posts', JSON.stringify(removeLike));
      setUpdateLikes(updateLikes - 1);
      const currentLikedPosts = JSON.parse(localStorage.getItem('users'));
      const removeUserLike = currentLikedPosts[printerId].postsLiked.indexOf(postId);
      currentLikedPosts[printerId].postsLiked.splice(removeUserLike, 1);
      localStorage.setItem('users', JSON.stringify(currentLikedPosts));
    }
  };

  useEffect(() => {
    const currentPosts = getPosts();
    updateTags(currentPosts);
  }, [numPosts]);

  return (
    <Box>
      <Sort setSortSelection={setSortSelection} />
      <Box>
        <Typography variant="h5">
          Posts:
        </Typography>
        {posts.sort(sortMethods[sortSelection]).map((post, index) => (
          <Post
            id={index}
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
