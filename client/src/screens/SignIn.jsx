import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Box, Typography, TextField, Button,
} from '@mui/material';
import axios from 'axios';
import AddPost from '../components/AddPost';
import PostsDisplay from '../components/PostDisplay';

function SignIn() {
  const [handle, setHandle] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [numPosts, setNumPosts] = useState(0);

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
    const response = await axios.get('http://localhost:4000/user/sign-in', { params: { handle, password } });
    if (response.data) {
      const userData = {
        // eslint-disable-next-line no-underscore-dangle
        id: response.data._id,
        handle: response.data.handle,
        postsLiked: response.data.postsLiked,
      };
      navigateToHome(userData);
    } else {
      alert('Handle or password is incorrect');
    }
  };

  const getUsers = () => {
    const saved = localStorage.getItem('users');
    const currentUsers = JSON.parse(saved) || {};
    return currentUsers;
  };

  const signUpUser = () => {
    const users = getUsers();
    if (!users[handle]) {
      const newUsers = users;
      newUsers[handle] = {
        password,
        postsLiked: [],
      };
      localStorage.setItem('users', JSON.stringify(newUsers));
      setAuthenticated(true);
    } else {
      alert('Sorry, that user handle already exists!');
    }
  };

  const loginUser = () => {
    const users = getUsers();
    if (users[handle] && users[handle].password === password) {
      setAuthenticated(true);
    } else {
      alert('Your handle or password is incorrect!');
    }
  };

  const logoutUser = () => {
    setHandle('');
    setPassword('');
    setAuthenticated(false);
  };

  useEffect(() => {
    localStorage.removeItem('posts');
    localStorage.removeItem('users');
    localStorage.removeItem('tags');
  }, []);

  const updateNumPosts = () => {
    setNumPosts(numPosts + 1);
  };

  return (
    <Container>
      {!authenticated
        && (
        <Box>
          <Typography variant="h3">Sign In</Typography>
          <Box>
            <TextField label="Handle" variant="outlined" value={handle} onChange={(e) => setHandle(e.target.value)} />
            <TextField label="Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Box>
          <Box>
            <Button variant="contained" onClick={signUpUser}>Sign Up</Button>
            <Button variant="contained" onClick={loginUser}>Login User</Button>
          </Box>
          <Button variant="contained" onClick={signIn}>Sign In</Button>
          <Box>
            <Typography variant="body1">Don&apos;t have an account?</Typography>
            <Button variant="outlined" onClick={navigateToSignUp}>Sign up</Button>
          </Box>
        </Box>
        )}
      {authenticated
        && (
        <Box>
          <AddPost printer={handle} updateNumPosts={updateNumPosts} />
          <PostsDisplay printer={handle} numPosts={numPosts} />
          <Button variant="contained" onClick={logoutUser}>Logout</Button>
        </Box>
        )}
    </Container>
  );
}

export default SignIn;
