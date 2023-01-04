/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { Container, Box, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddPost from '../components/AddPost';
import PostsDisplay from '../components/PostDisplay';
import Sort from '../components/Sort';
import Search from '../components/Search';

function Home() {
  const { printerId, handle } = useLocation().state;

  const [posts, setPosts] = useState([]);
  const [numPosts, setNumPosts] = useState(0);
  const [search, setSearch] = useState('');
  const [sortSelection, setSortSelection] = useState('');

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

  // Navigation functions to pages
  const navigate = useNavigate();

  // Sign out of the current user's account
  const signOut = async () => {
    const response = await axios.post('http://localhost:4000/user/sign-out', null, { withCredentials: true });
    if (response.status === 200) {
      navigate('/');
    }
  };

  return (
    <Container>
      <Box>
        <AddPost
          printerId={printerId}
          printer={handle}
          setNumPosts={setNumPosts}
        />
      </Box>
      <Box>
        <Search
          search={search}
          setSearch={setSearch}
          searchTags={searchTags}
        />
        <Sort
          setSortSelection={setSortSelection}
        />
        <PostsDisplay
          printerId={printerId}
          posts={posts}
          setPosts={setPosts}
          sortSelection={sortSelection}
        />
      </Box>
      <Button variant="outlined" onClick={signOut}>Sign Out</Button>
    </Container>
  );
}

export default Home;
