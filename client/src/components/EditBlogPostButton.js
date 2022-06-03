import React, { useState } from 'react';
import BlogPostEditor from './BlogPostEditor';
import Modal from './Modal';

function EditBlogPostButton({ originalPost }) {
  const [showModalForm, setShowModalForm] = useState(false);

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
        <BlogPostEditor editingPost={originalPost} />
      </Modal>
    </div>
  );
}

async function isAuthenticated() {
  try {
    const response = await fetch('/api/auth/verify', {
      method: 'GET',
      credentials: 'include',
    });

    const { isAuthenticated } = await response.json();
    return isAuthenticated;
  } catch (error) {
    console.error(error);
  }
}
export default EditBlogPostButton;
