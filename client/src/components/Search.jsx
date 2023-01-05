import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import PropTypes from 'prop-types';

function Search({ search, setSearch, searchTags }) {
  return (
    <Box>
      <TextField label="Search" variant="outlined" value={search} onChange={(e) => setSearch(e.target.value)} />
      <Button variant="contained" onClick={() => { searchTags(); }}>Search tags</Button>
    </Box>
  );
}

Search.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  searchTags: PropTypes.func.isRequired,
};

export default Search;
