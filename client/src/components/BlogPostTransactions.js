import React, { useState } from 'react';
import BlogPostForm from './BlogPostForm';
import Modal from './Modal';

function CreateBlogPost() {
  const [showModalForm, setShowModalForm] = useState(false);

  async function handleCreate(post) {
    try {
      const response = await fetch('http://localhost:5000/posts/', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ ...post }),
      });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
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

  async function handleEdit(editedPost) {
    try {
      const response = await fetch(`http://localhost:5000/posts/${post.id}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ ...editedPost }),
      });

      console.log(response.status);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
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
    </>
  );
}

function DeleteBlogPost({ postId }) {
  async function handleDelete() {
    try {
      if (window.confirm('Are you sure you want to delete this post?')) {
        const response = await fetch(`http://localhost:5000/posts/${postId}`, {
          method: 'DELETE',
          credentials: 'include',
        });

        if (response.status === 200) {
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return <button onClick={handleDelete}>Delete</button>;
}

export { CreateBlogPost, EditBlogPost, DeleteBlogPost };
