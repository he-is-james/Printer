import { Container, Box } from '@mui/material';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AddPost from '../components/AddPost';
import PostsDisplay from '../components/PostDisplay';
import SearchBar from '../components/SearchBar';

function Home() {
  const { id, handle } = useLocation().state;
  console.log(id);

  // Re-render the posts displayed after adding a new post
  const [numPosts, setNumPosts] = useState(0);

  const updateNumPosts = () => {
    setNumPosts(numPosts + 1);
  };

  const searchTags = (tag) => {
    // const currentPosts = getPosts();
    // if (search === '') {
    //   setPosts(currentPosts);
    // } else {
    //   const currentTags = JSON.parse(localStorage.getItem('tags')) || {};
    //   const postsWithTag = currentTags[search];
    //   const searchedPosts = [];
    //   console.log(postsWithTag);
    //   postsWithTag.forEach((id) => {
    //     searchedPosts.push(currentPosts[id]);
    //   });
    //   console.log(searchedPosts);
    //   setPosts(searchedPosts);
    // }
    console.log(tag);
  };

  return (
    <Container>
      <Box>
        <SearchBar searchTags={searchTags} />
      </Box>
      <Box>
        <AddPost printerId={id} printer={handle} updateNumPosts={updateNumPosts} />
      </Box>
      <Box>
        <PostsDisplay printerId={id} numPosts={numPosts} />
      </Box>
    </Container>
  );
}

export default Home;
