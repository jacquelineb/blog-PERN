import React, { useRef, useEffect } from 'react';
import { createPost, editPost } from '../api/posts.js';
import { uploadFileToS3Bucket } from '../api/storage.js';
import convertObjectUrlToFile from '../utils/convertObjectUrlToFile.js';
import createEditor from '../utils/createEditor.js';
import style from '../styles/BlogPostEditorJs.module.scss';
import '../styles/Editor.css';

function BlogPostEditor({ editingPost = null }) {
  const titleRef = useRef();
  const bodyEditor = useRef();
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!bodyEditor.current) {
      bodyEditor.current = createEditor(editingPost ? editingPost.body : []);
    }
  }, [editingPost]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const title = titleRef.current.value;
      const body = (await bodyEditor.current.save()).blocks;

      // Promises to upload any locally uploaded images to cloud
      // and update the url to point to location on cloud
      const promises = [];
      for (const block of body) {
        // Locally uploaded images have a url created via URL.createObjectURL()
        if (block.type === 'image' && block.data.file.url.startsWith('blob:')) {
          const promise = (async () => {
            const imageFile = await convertObjectUrlToFile(block.data.file.url);
            const urlToUploadedFile = await uploadFileToS3Bucket(imageFile);
            block.data.file.url = urlToUploadedFile;
          })();
          promises.push(promise);
        }
      }

      await Promise.all(promises);
      let postUploaded;
      if (!editingPost) {
        postUploaded = await createPost(title, body);
      } else {
        postUploaded = await editPost(editingPost.id, title, body);
      }

      if (postUploaded) {
        window.location.reload();
      } else {
        alert('An error occurred.');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={style.BlogPostEditorContainer}>
      <form onSubmit={handleSubmit}>
        <input
          className={style.title}
          defaultValue={editingPost ? editingPost.title : ''}
          type='text'
          placeholder='Title'
          pattern='.*\S+.*'
          title='Must enter at least 1 non-whitespace character'
          ref={titleRef}
          required
        />
        <div className={style.bodyEditor} id='bodyEditor'></div> {/* Editor.js */}
        <button className={style.submitBtn} type='submit'>
          {!editingPost ? 'Post' : 'Update'}
        </button>
      </form>
    </div>
  );
}

export default BlogPostEditor;
