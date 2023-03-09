import React, { useState } from 'react';
import deletePost from '../../api/deletePost';
import BlogPostEditor from './BlogPostEditor';
import Icon from '../../../../components/Icon';
import Modal from '../../../../components/Modal';
import style from './PostTools.module.scss';

function CreateBlogPost() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className={style.createPostBtn} onClick={() => setShowModal(true)}>
        <Icon name='create' size='24' />
      </button>
      <Modal
        active={showModal}
        handleClose={() => setShowModal(false)}
        title='Creating new post'
        content={<BlogPostEditor />}
      />
    </>
  );
}

function EditBlogPost({ originalPost }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className={style.editPostBtn}
        title='Edit post'
        onClick={() => setShowModal(true)}
      >
        <Icon name='edit' size='24' />
      </button>
      <Modal
        active={showModal}
        handleClose={() => setShowModal(false)}
        title='Editing post'
        content={<BlogPostEditor editingPost={originalPost} />}
      />
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
