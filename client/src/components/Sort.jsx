import React from 'react';
import PropTypes from 'prop-types';

function Sort({ setSortSelection }) {
  return (
    <div className="Sort">
      <form>
        <button type="button" onClick={() => { setSortSelection('a'); }}>A-Z</button>
        <button type="button" onClick={() => { setSortSelection('z'); }}>Z-A</button>
        <button type="button" onClick={() => { setSortSelection('m'); }}>Most Likes</button>
        <button type="button" onClick={() => { setSortSelection('l'); }}>Least Likes</button>
      </form>
    </div>
  );
}

Sort.propTypes = {
  setSortSelection: PropTypes.func.isRequired,
};

export default Sort;
