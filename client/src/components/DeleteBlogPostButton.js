import React from 'react';
import { deletePost } from '../api/post';

function DeleteBlogPostButton({ post }) {
  async function handleDelete() {
    try {
      if (window.confirm('Are you sure you want to delete this post?')) {
        /**
        TODO: if the post has images, need to delete those from cloud
         **/

        const response = await deletePost(post.id);
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

export default DeleteBlogPostButton;
