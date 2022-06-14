import React, { useState } from 'react';
import { deletePost } from '../api/posts';
import BlogPostEditor from './BlogPostEditor';
import Modal from './Modal';
import style from '../styles/PostToolbar.module.scss';

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

        return tool ? <div key={idx}>{tool}</div> : null;
      })}
    </div>
  );
}

function CreateBlogPost() {
  const [showModalForm, setShowModalForm] = useState(false);
  return (
    <>
      <button onClick={() => setShowModalForm(true)}>Create new post</button>
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
      <button onClick={() => setShowModalForm(true)}>Edit</button>
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

export default PostToolbar;
