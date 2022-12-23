import React, { useState } from 'react';
import PropTypes from 'prop-types';

function AddPost({ printer, updateNumPosts }) {
  const [print, setPrint] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);

  const submitPost = () => {
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
    <div className="AddPost">
      <text>
        Write a new Post
        {' '}
        {printer}
        :
      </text>
      <form className="NewPost">
        <input type="text" placeholder="Print" value={print} onChange={(e) => setPrint(e.target.value)} />
        <button type="button" onClick={submitPost}>Print</button>
      </form>
      <text>Tags:</text>
      {tags.map((currentTag) => (
        <div>{currentTag}</div>
      ))}
      <form className="NewTag">
        <input type="text" placeholder="Tag" value={tag} onChange={(e) => setTag(e.target.value)} />
        <button type="button" onClick={addTag}>Add Tag</button>
      </form>
    </div>
  );
}

AddPost.propTypes = {
  printer: PropTypes.string.isRequired,
  updateNumPosts: PropTypes.func.isRequired,
};

export default AddPost;
