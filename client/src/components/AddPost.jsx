import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  Box, Button, TextField, Typography,
} from '@mui/material';

function AddPost({ printer, setNumPosts }) {
  const [print, setPrint] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);

  const submitPrint = async () => {
    const newPost = {
      author: printer,
      body: print,
      likes: [],
      tags,
    };
    try {
      await axios.post('http://localhost:4000/print/new-print', newPost);
      setPrint('');
      setTags([]);
      setTag('');
      setNumPosts((numPosts) => numPosts + 1);
    } catch (err) {
      alert('Unable to create print');
    }
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
        <Button variant="contained" onClick={submitPrint}>Print</Button>
      </Box>
      <Box>
        <Typography variant="subtitle2">Tags:</Typography>
        {tags.map((currentTag) => (
          <Typography key={currentTag} variant="body2">{currentTag}</Typography>
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
  printer: PropTypes.string.isRequired,
  setNumPosts: PropTypes.func.isRequired,
};

export default AddPost;
