import React, { useState } from 'react';
import Modal from './Modal';

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

function CreateBlogPost() {
  const [showModalForm, setShowModalForm] = useState(false);

  async function handleCreate(post) {
    const response = await fetch('http://localhost:5000/posts/create', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ ...post }),
    });

    console.log(response);
    // if success, refresh page
    // else show error
  }

  return (
    <div>
      <button
        onClick={() => {
          setShowModalForm(true);
        }}
      >
        Create new post
      </button>
      <Modal
        display={showModalForm}
        handleClose={() => {
          setShowModalForm(false);
        }}
      >
        <p>Create a new post</p>
        <BlogPostForm onSubmit={handleCreate} />
      </Modal>
    </div>
  );
}

function EditBlogPost({ post }) {
  const [showModalForm, setShowModalForm] = useState(false);

  async function handleEdit(post) {
    const response = await fetch(`http://localhost:5000/posts/edit/${post.id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ ...post }),
    });

    console.log(response.status);
    // if success, refresh page
    // else show error
  }

  return (
    <div>
      <button
        onClick={() => {
          setShowModalForm(true);
        }}
      >
        Edit
      </button>

      <Modal
        display={showModalForm}
        handleClose={() => {
          setShowModalForm(false);
        }}
      >
        <p>Editing post</p>
        <BlogPostForm onSubmit={handleEdit} currPost={post} />
      </Modal>
    </div>
  );
}

export { CreateBlogPost, EditBlogPost };
