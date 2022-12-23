import React, { useState } from 'react';
import {
  Container, Box, Typography, TextField, Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const [handle, setHandle] = useState('');
  const [password, setPassword] = useState('');

  // Navigation functions to pages
  const navigate = useNavigate();

  const navigateToHome = (userData) => {
    navigate('/home', { state: userData });
  };

  // Sign up a new user
  const signUp = async () => {
    const response = await axios.post('http://localhost:4000/user/sign-up', { handle, password });
    if (response.status === 200) {
      const userData = {
        // eslint-disable-next-line no-underscore-dangle
        id: response.data._id,
        handle: response.data.handle,
      };
      navigateToHome(userData);
    } else {
      alert('Error creating an account');
    }
  };

  return (
    <Container>
      <Typography variant="h3">Sign Up</Typography>
      <Box>
        <TextField label="Handle" variant="outlined" value={handle} onChange={(e) => setHandle(e.target.value)} />
        <TextField label="Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Box>
      <Button variant="contained" onClick={signUp}>Sign Up</Button>
    </Container>
  );
}

export default SignUp;
