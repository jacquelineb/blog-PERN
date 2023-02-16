import React, { useState } from 'react';
import { deletePost } from '../api/posts';
import BlogPostEditor from './BlogPostEditor';
import Icon from './Icon';
import Modal from './Modal';
import style from '../styles/PostTools.module.scss';

function CreateBlogPost() {
  const [showModalForm, setShowModalForm] = useState(false);
  return (
    <>
      <button className={style.createPostBtn} onClick={() => setShowModalForm(true)}>
        Create new post
      </button>
      <Modal
        display={showModalForm}
        handleClose={() => {
          setShowModalForm(false);
        }}
      >
        <p>Create a new post</p>
        <BlogPostEditor />
      </Modal>
    </>
  );
}

function EditBlogPost({ originalPost }) {
  const [showModalForm, setShowModalForm] = useState(false);
  return (
    <>
      <button
        className={style.editPostBtn}
        title='Edit post'
        onClick={() => setShowModalForm(true)}
      >
        <Icon name='edit' size='24' />
      </button>
      <Modal
        display={showModalForm}
        handleClose={() => {
          setShowModalForm(false);
        }}
      >
        <p>Editing post</p>
        <BlogPostEditor editingPost={originalPost} />
      </Modal>
    </>
  );
}

function DeleteBlogPost({ postId }) {
  async function handleDelete() {
    if (window.confirm('Are you sure you want to delete this post?')) {
      /**
        TODO: if the post has images, need to delete those from cloud
         **/

      const isDeleted = await deletePost(postId);
      if (isDeleted) {
        window.location.reload();
      } else {
        alert('An error occurred');
      }
    }
  }

  return (
    <button className={style.deletePostBtn} title='Delete post' onClick={handleDelete}>
      <Icon name='delete' size='24' />
    </button>
  );
}

export { CreateBlogPost, EditBlogPost, DeleteBlogPost };
