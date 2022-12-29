import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Box, Typography, TextField, Button,
} from '@mui/material';
import axios from 'axios';

function SignIn() {
  const [handle, setHandle] = useState('');
  const [password, setPassword] = useState('');

  // Navigation functions to pages
  const navigate = useNavigate();

  const navigateToHome = (userData) => {
    navigate('/home', { state: userData });
  };

  const navigateToSignUp = () => {
    navigate('/sign-up');
  };

  // Sign in the user
  const signIn = async () => {
    const response = await axios.post('http://localhost:4000/user/sign-in', { handle, password }, { withCredentials: true });
    if (response.data) {
      const userData = {
        // eslint-disable-next-line no-underscore-dangle
        id: response.data._id,
        handle: response.data.handle,
      };
      navigateToHome(userData);
    } else {
      alert('Handle or password is incorrect');
    }
  };

  return (
    <Container>
      <Box>
        <Typography variant="h3">Sign In</Typography>
        <Box>
          <TextField label="Handle" variant="outlined" value={handle} onChange={(e) => setHandle(e.target.value)} />
          <TextField label="Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Box>
        <Button variant="contained" onClick={signIn}>Sign In</Button>
        <Box>
          <Typography variant="body1">Don&apos;t have an account?</Typography>
          <Button variant="outlined" onClick={navigateToSignUp}>Sign up</Button>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;
