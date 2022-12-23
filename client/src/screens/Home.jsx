import { Container, Box, Typography } from '@mui/material';
import React from 'react';
// import { useLocation } from 'react-router-dom';

function Home() {
  // const { handle, password } = useLocation().state;
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
