import React, { useState } from 'react';
import { deletePost } from '../api/posts';
import BlogPostEditor from './BlogPostEditor';
import Modal from './Modal';
import style from '../styles/PostToolbar.module.scss';
import Icon from './Icon';

function PostToolbar({ tools, post }) {
  return (
    <div className={style.toolbar}>
      {tools.map((toolName, idx) => {
        let tool;
        switch (toolName) {
          case 'create':
            tool = <CreateBlogPost />;
            break;
          case 'edit':
            tool = <EditBlogPost originalPost={post} />;
            break;
          case 'delete':
            tool = <DeleteBlogPost post={post} />;
            break;
          default:
            tool = null;
        }

        return tool ? <span key={idx}>{tool}</span> : null;
      })}
    </div>
  );
}

function CreateBlogPost() {
  const [showModalForm, setShowModalForm] = useState(false);
  return (
    <>
      <button className={style.toolButton} onClick={() => setShowModalForm(true)}>
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
        className={style.toolButton}
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

function DeleteBlogPost({ post }) {
  async function handleDelete() {
    if (window.confirm('Are you sure you want to delete this post?')) {
      /**
        TODO: if the post has images, need to delete those from cloud
         **/

      const isDeleted = await deletePost(post.id);
      if (isDeleted) {
        window.location.reload();
      } else {
        alert('An error occurred');
      }
    }
  }

  return (
    <button className={style.toolButton} title='Delete post' onClick={handleDelete}>
      <Icon name='delete' size='24' />
    </button>
  );
}

export default PostToolbar;
