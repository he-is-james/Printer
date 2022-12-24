import { Container, Box } from '@mui/material';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AddPost from '../components/AddPost';
import PostsDisplay from '../components/PostDisplay';
import SearchBar from '../components/SearchBar';
import Sort from '../components/Sort';

function Home() {
  const { id, handle } = useLocation().state;

  const [sortSelection, setSortSelection] = useState('');

  // Re-render the posts displayed after adding a new post
  const [numPosts, setNumPosts] = useState(0);

  const updateNumPosts = () => {
    setNumPosts(numPosts + 1);
  };

  const searchTags = (tag) => {
    console.log(tag);
  };

  return (
    <Container>
      <Box>
        <SearchBar searchTags={searchTags} />
      </Box>
      <Box>
        <AddPost printerId={id} printer={handle} updateNumPosts={updateNumPosts} />
      </Box>
      <Box>
        <Sort setSortSelection={setSortSelection} />
        <PostsDisplay printerId={id} sortSelection={sortSelection} numPosts={numPosts} />
      </Box>
    </Container>
  );
}

export default Home;
