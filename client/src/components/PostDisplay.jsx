/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import React from 'react';
import {
  Box, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'axios';
import Post from './Post';

function PostsDisplay({
  printerId, posts, setPosts, sortSelection,
}) {
  // Methods to sort the posts
  // Set each property to be a function that sorts the array of prints
  const sortMethods = {
    '': () => {},
    a: (a, b) => (a.body.localeCompare(b.body)),
    z: (a, b) => (b.body.localeCompare(a.body)),
    m: (a, b) => (b.likes.length - a.likes.length),
    l: (a, b) => (a.likes.length - b.likes.length),
  };

  // Update the likes on a print
  const likePost = async (printId, userLiked) => {
    try {
      // If the user has not liked the post
      if (!userLiked) {
        // Add the printer id to the likes array on print and
        // the print id on the users liked prints array
        await axios.post('http://localhost:4000/print/update-likes', {
          printId,
          command: { $push: { likes: printerId } },
        });
        await axios.post('http://localhost:4000/user/update-likes', {
          printerId,
          command: { $push: { postsLiked: printId } },
        });
        // Update locally that the user has liked the post
        const updatedPosts = posts.map((post) => {
          if (post._id === printId) {
            post.likes = [...post.likes, printerId];
            post.userLiked = true;
          }
          return post;
        });
        setPosts(updatedPosts);
      // If the user has liked the post
      } else {
        // Remove the printer id from the likes array on print and
        // the print id from the users liked prints array
        await axios.post('http://localhost:4000/print/update-likes', {
          printId,
          command: { $pull: { likes: { $in: printerId } } },
        });
        await axios.post('http://localhost:4000/user/update-likes', {
          printerId,
          command: { $pull: { postsLiked: { $in: printId } } },
        });
        // Update locally that the user has unliked the post
        const removeLike = posts.map((post) => {
          if (post._id === printId) {
            const toRemove = post.likes.indexOf(printerId);
            post.likes.splice(toRemove, 1);
            post.userLiked = false;
          }
          return post;
        });
        setPosts(removeLike);
      }
    } catch (err) {
      alert('Unable to update likes');
    }
  };

  return (
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
  );
}

PostsDisplay.propTypes = {
  printerId: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  setPosts: PropTypes.func.isRequired,
  sortSelection: PropTypes.string.isRequired,
};

export default PostsDisplay;
