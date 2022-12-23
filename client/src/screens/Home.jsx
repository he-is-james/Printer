import { Container, Box, Typography } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';

function Home() {
  const { id, handle, postsLiked } = useLocation().state;
  console.log(id);
  console.log(handle);
  console.log(postsLiked);
  return (
    <Container>
      <Box>
        <Typography variant="h5">Search Tags:</Typography>
      </Box>
      <Box>
        <Typography variant="h5">Write a new print:</Typography>
      </Box>
      <Box>
        <Typography variant="h5">Prints</Typography>

      </Box>
    </Container>
  );
}

export default Home;
