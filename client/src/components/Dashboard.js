import React, { useState } from 'react';

function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
      <CreatePostForm />
    </>
  );
}

function CreatePostForm() {
  const [post, setPost] = useState({ title: '', body: '' });

  function handleChange(e) {
    const { name, value } = e.target;
    setPost((prevPostState) => {
      return {
        ...prevPostState,
        [name]: value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
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
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          id='title'
          name='title'
          onChange={handleChange}
          required
          pattern='.*\S+.*'
          title='Must enter at least 1 non-whitespace character'
        />
      </div>
      <div>
        <label htmlFor='body'>Body</label>
        <textarea id='body' name='body' onChange={handleChange} required />
      </div>

      <button type='submit'>Submit</button>
    </form>
  );
}

export default Dashboard;
