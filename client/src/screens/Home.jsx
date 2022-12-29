/* eslint-disable no-param-reassign */
import { Container, Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import AddPost from '../components/AddPost';
import PostsDisplay from '../components/PostDisplay';
import Sort from '../components/Sort';

function Home() {
  const { id, handle } = useLocation().state;

  // Re-render the posts displayed after adding a new post
  const [numPosts, setNumPosts] = useState(0);
  const [sortSelection, setSortSelection] = useState('');

  const signOut = async () => {
    const response = await axios.post('http://localhost:4000/user/sign-out', null, { withCredentials: true });
    console.log(response);
  };

  const test = async () => {
    await axios.post('http://localhost:4000/user/test', null, { withCredentials: true });
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
      <Button variant="outlined" onClick={test}>Test</Button>
    </Container>
  );
}

export default Home;
