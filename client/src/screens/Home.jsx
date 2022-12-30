/* eslint-disable no-param-reassign */
import { Container, Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddPost from '../components/AddPost';
import PostsDisplay from '../components/PostDisplay';
import Sort from '../components/Sort';

function Home() {
  const { id, handle } = useLocation().state;

  // Re-render the posts displayed after adding a new post
  const [numPosts, setNumPosts] = useState(0);
  const [sortSelection, setSortSelection] = useState('');

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
        <AddPost printerId={id} printer={handle} setNumPosts={setNumPosts} />
      </Box>
      <Box>
        <Sort setSortSelection={setSortSelection} />
        <PostsDisplay printerId={id} sortSelection={sortSelection} numPosts={numPosts} />
      </Box>
      <Button variant="outlined" onClick={signOut}>Sign Out</Button>
    </Container>
  );
}

export default Home;
