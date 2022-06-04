import React, { useState } from 'react';
import BlogPostEditor from './BlogPostEditor';
import Modal from './Modal';

function EditBlogPost({ originalPost }) {
  const [showModalForm, setShowModalForm] = useState(false);

  return (
    <div>
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
    </div>
  );
}

export default EditBlogPost;
