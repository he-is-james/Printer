import React from 'react';
import PropTypes from 'prop-types';
import { Button, Box } from '@mui/material';

function Sort({ setSortSelection }) {
  return (
    <Box>
      <Button variant="outlined" onClick={setSortSelection('a')}>A-Z</Button>
      <Button variant="outlined" onClick={setSortSelection('z')}>A-Z</Button>
      <Button variant="outlined" onClick={setSortSelection('m')}>Most Likes</Button>
      <Button variant="outlined" onClick={setSortSelection('l')}>Least Likes</Button>
    </Box>
  );
}

Sort.propTypes = {
  setSortSelection: PropTypes.func.isRequired,
};

export default Sort;
