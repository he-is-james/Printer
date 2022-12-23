import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import PropTypes from 'prop-types';

function SearchBar({ searchTags }) {
  const [search, setSearch] = useState('');

  return (
    <Box>
      <TextField label="Search" variant="outlined" value={search} onChange={(e) => setSearch(e.target.value)} />
      <Button variant="contained" onClick={() => { searchTags(search); }}>Search tags</Button>
    </Box>
  );
}

SearchBar.propTypes = {
  searchTags: PropTypes.func.isRequired,
};

export default SearchBar;
