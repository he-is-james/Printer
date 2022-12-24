/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import {
  Box, Typography, TextField, Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'axios';
import Post from './Post';

function PostsDisplay({
  printerId, sortSelection, numPosts,
}) {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');

  // Methods to sort the posts
  // Set each property to be a function that sorts the array of prints
  const sortMethods = {
    '': () => {},
    a: (a, b) => (a.body.localeCompare(b.body)),
    z: (a, b) => (b.body.localeCompare(a.body)),
    m: (a, b) => (b.likes.length - a.likes.length),
    l: (a, b) => (a.likes.length - b.likes.length),
  };

  // Get liked posts of the user
  const getLikedPosts = async () => {
    try {
      // Send the printer id to get all of their liked posts
      const likedPosts = await axios.get('http://localhost:4000/user/all-liked-posts', { params: { printerId } });
      return likedPosts.data;
    } catch (err) {
      alert('Unable to get liked posts');
      return err;
    }
  };

  // Get all prints made on Printer
  const getPosts = async () => {
    try {
      // Calls MongoDB to get all the prints made
      const currentPosts = await axios.get('http://localhost:4000/print/all-prints');
      return currentPosts.data;
    } catch (err) {
      alert('Unable to get posts');
      return err;
    }
  };

  // Display the prints and set if the user liked the post already or not
  const renderPosts = async () => {
    try {
      // Get prints and user liked prints
      const currentPosts = await getPosts();
      const likedPosts = await getLikedPosts();
      // Set the print to be already liked by the user if the print id is in the liked prints array
      currentPosts.forEach((post) => {
        if (likedPosts.includes(post._id)) {
          post.userLiked = true;
        } else {
          post.userLiked = false;
        }
      });
      setPosts(currentPosts);
    } catch (err) {
      alert('Unable to render posts');
    }
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

  // Re-render the prints if a post is added
  useEffect(() => {
    renderPosts();
  }, [numPosts]);

  // Search for posts with the same tag
  const searchTags = async () => {
    try {
      // Acquire all the prints if nothing is searched
      if (search === '') {
        renderPosts();
      } else {
        // Search the prints to see if any of them have the tag in their tags array
        const response = await axios.get('http://localhost:4000/print/search-tags', { params: { tag: search } });
        const foundPosts = response.data;
        // Set the print to be already liked by the user
        // if the print id is in the liked prints array
        const likedPosts = await getLikedPosts();
        foundPosts.forEach((post) => {
          if (likedPosts.includes(post._id)) {
            post.userLiked = true;
          } else {
            post.userLiked = false;
          }
        });
        setPosts(foundPosts);
      }
    } catch (err) {
      alert('Unable to search tags');
    }
  };

  return (
    <Box>
      <Box>
        <TextField label="Search" variant="outlined" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Button variant="contained" onClick={() => { searchTags(); }}>Search tags</Button>
      </Box>
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
  sortSelection: PropTypes.string.isRequired,
  numPosts: PropTypes.number.isRequired,
};

export default PostsDisplay;
