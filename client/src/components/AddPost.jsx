import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Button, TextField, Typography,
} from '@mui/material';

function AddPost({ printerId, printer, updateNumPosts }) {
  const [print, setPrint] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);

  const submitPost = () => {
    console.log(printerId);
    const saved = localStorage.getItem('posts');
    const currentPosts = JSON.parse(saved) || [];
    const newPost = {
      author: printer,
      body: print,
      likes: [],
      tags,
    };
    const updatedPosts = [...currentPosts, newPost];
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setPrint('');
    setTags([]);
    setTag('');
    updateNumPosts();
  };

  const addTag = () => {
    const newTags = [...tags, tag];
    setTags(newTags);
    setTag('');
  };

  return (
    <Box className="AddPost">
      <Typography variant="h6">
        Write a new Print
        {' '}
        {printer}
        :
      </Typography>
      <Box>
        <TextField variant="filled" label="Print" value={print} onChange={(e) => setPrint(e.target.value)} />
        <Button variant="contained" onClick={submitPost}>Print</Button>
      </Box>
      <Box>
        <Typography variant="subtitle2">Tags:</Typography>
        {tags.map((currentTag) => (
          <Typography variant="body2">{currentTag}</Typography>
        ))}
      </Box>
      <Box>
        <TextField variant="filled" label="Tag" value={tag} onChange={(e) => setTag(e.target.value)} />
        <Button variant="contained" onClick={addTag}>Add Tag</Button>
      </Box>
    </Box>
  );
}

AddPost.propTypes = {
  printerId: PropTypes.string.isRequired,
  printer: PropTypes.string.isRequired,
  updateNumPosts: PropTypes.func.isRequired,
};

export default AddPost;
