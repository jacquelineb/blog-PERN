import React, { useState } from 'react';
import BlogPostForm from './BlogPostForm';
import Modal from './Modal';

function CreateBlogPost() {
  const [showModalForm, setShowModalForm] = useState(false);

  async function handleSubmit(post) {
    try {
      const response = await fetch('/posts/', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ ...post }),
      });

      return response;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <button
        onClick={async () => {
          (await isAuthenticated()) ? setShowModalForm(true) : window.location.reload();
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
        <BlogPostForm onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
}

function EditBlogPost({ post }) {
  const [showModalForm, setShowModalForm] = useState(false);

  async function handleSubmit(editedPost) {
    try {
      const response = await fetch(`/posts/${post.id}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ ...editedPost }),
      });

      return response;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <button
        onClick={async () => {
          (await isAuthenticated()) ? setShowModalForm(true) : window.location.reload();
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
        <BlogPostForm onSubmit={handleSubmit} currPost={post} />
      </Modal>
    </div>
  );
}

function DeleteBlogPost({ postId }) {
  async function handleDelete() {
    try {
      if (window.confirm('Are you sure you want to delete this post?')) {
        const response = await fetch(`/posts/${postId}`, {
          method: 'DELETE',
          credentials: 'include',
        });

        if (response.status === 200) {
          window.location.reload();
        } else {
          alert('An error occurred');
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return <button onClick={handleDelete}>Delete</button>;
}

async function isAuthenticated() {
  try {
    const response = await fetch('/auth/verify', {
      method: 'GET',
      credentials: 'include',
    });

    const { isAuthenticated } = await response.json();
    return isAuthenticated;
  } catch (error) {
    console.error(error);
  }
}

export { CreateBlogPost, EditBlogPost, DeleteBlogPost };
