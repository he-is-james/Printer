import React, { useEffect, useState } from 'react';
import AddPost from './components/AddPost';
import PostsDisplay from './components/PostDisplay';

function App() {
  const [handle, setHandle] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [numPosts, setNumPosts] = useState(0);

  const signUpUser = () => {
    const users = getUsers();
    if (!users[handle]){
      const newUsers = users;
      newUsers[handle] = {
        password,
        postsLiked: []
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

  const getUsers = () => {
    const saved = localStorage.getItem('users');
    const currentUsers = JSON.parse(saved) || {};
    return currentUsers;
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
    <div className="App">
      {!authenticated &&
        <div className='Sign In'>
          <text>Sign In</text>
          <form>
            <input type="text" placeholder='Handle' value={handle} onChange={(e) => setHandle(e.target.value)}/>
            <input type="text" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="button" onClick={signUpUser}>Sign Up</button>
            <button type="button" onClick={loginUser}>Login User</button>
          </form>
        </div>
      }
      {authenticated && 
        <div className='Authenticated'>
          <AddPost printer={handle} updateNumPosts={updateNumPosts}/>
          <PostsDisplay printer={handle} numPosts={numPosts}/>
          <button type="button" onClick={logoutUser}>Logout</button>
        </div>
      }
    </div>
  );
}

export default App;
