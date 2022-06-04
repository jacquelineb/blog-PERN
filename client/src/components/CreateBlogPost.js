import React, { useState } from 'react';
import BlogPostEditor from './BlogPostEditor';
import Modal from './Modal';

function CreateBlogPost() {
  const [showModalForm, setShowModalForm] = useState(false);

  return (
    <div>
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
    </div>
  );
}

export default CreateBlogPost;
