import React, { useState } from 'react';
import style from '../styles/BlogPostForm.module.scss';

function BlogPostForm({ onSubmit, currPost = { title: '', body: '' } }) {
  const [post, setPost] = useState(currPost);

  function handleChange(e) {
    const { name, value } = e.target;
    setPost((prevPostState) => {
      return {
        ...prevPostState,
        [name]: value,
      };
    });
  }

  function onSubmitWrapper(e) {
    e.preventDefault();
    onSubmit(post);
  }

  return (
    <form className={style.form} onSubmit={onSubmitWrapper}>
      <label htmlFor='title'>Title</label>
      <input
        type='text'
        id='title'
        name='title'
        value={post.title}
        onChange={handleChange}
        required
        pattern='.*\S+.*'
        title='Must enter at least 1 non-whitespace character'
      />
      <label htmlFor='body'>Body</label>
      <textarea
        className={style.bodyInput}
        id='body'
        name='body'
        value={post.body}
        onChange={handleChange}
        required
      />
      <button type='submit'>Submit</button>
    </form>
  );
}

export default BlogPostForm;
