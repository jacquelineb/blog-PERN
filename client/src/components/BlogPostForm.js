import React, { useState } from 'react';

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
    <>
      <form onSubmit={onSubmitWrapper}>
        <div>
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
        </div>
        <div>
          <label htmlFor='body'>Body</label>
          <textarea id='body' name='body' value={post.body} onChange={handleChange} required />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </>
  );
}

export default BlogPostForm;
