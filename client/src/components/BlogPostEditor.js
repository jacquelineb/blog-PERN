import React, { useRef, useEffect } from 'react';
import EditorJS from '@editorjs/editorjs';
import Image from '@editorjs/image';
import style from '../styles/BlogPostEditorJs.module.scss';
import '../styles/Editor.css';
import { uploadFileToS3Bucket } from '../utils';
import { createPost, editPost } from '../api/post.js';

function BlogPostEditor({ originalPost = null }) {
  const titleRef = useRef(originalPost ? originalPost.title : '');
  const bodyEditor = useRef();
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!bodyEditor.current) {
      bodyEditor.current = new EditorJS({
        holder: 'bodyEditor',
        readOnly: false,
        tools: {
          image: {
            class: Image,
            config: {
              uploader: {
                uploadByFile(file) {
                  return Promise.resolve({
                    success: 1,
                    file: {
                      url: URL.createObjectURL(file),
                      tempFileData: file, // Temporarily save file in case I need to upload to cloud
                    },
                  });
                },
              },
            },
          },
        },
        data: {
          blocks: originalPost ? originalPost.body : [],
          time: '',
          version: '',
        },
      });
    }
  }, [originalPost]);

  async function handleCreate() {
    console.log('in here');
    try {
      const title = titleRef.current.value;
      const body = (await bodyEditor.current.save()).blocks;

      // Get each paragraph containing an image and upload those images to S3
      const imageParagraphs = body.filter((paragraph) => paragraph.type === 'image');
      const promises = imageParagraphs.map(async (imageParagraph) => {
        const imageFile = imageParagraph.data.file.tempFileData;
        delete imageParagraph.data.file.tempFileData;
        return uploadFileToS3Bucket(imageFile);
      });

      // Update the urls to point to their corresponding uploaded file
      const imageUrls = await Promise.all(promises);
      imageParagraphs.forEach((imageParagraph, i) => {
        imageParagraph.data.file.url = imageUrls[i]; // will modify urls in body too
      });

      // Save to db
      await createPost(title, body);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleEdit() {
    try {
      const title = titleRef.current.value;
      const body = (await bodyEditor.current.save()).blocks;

      // New image blocks are blocks that have an image that hasn't been uploaded to the cloud yet
      // They have a data.file.tempFileData field which contains the file needed to be uploaded.
      const newImageBlocks = body.filter(
        (block) => block.type === 'image' && block.data.file.tempFileData
      );

      // Upload the new images to the cloud
      const imageUploadPromises = newImageBlocks.map(async (imageBlock) => {
        const imageFile = imageBlock.data.file.tempFileData;
        delete imageBlock.data.file.tempFileData;
        return uploadFileToS3Bucket(imageFile);
      });

      // Update the urls to point to their corresponding uploaded file
      const imageUrls = await Promise.all(imageUploadPromises);
      newImageBlocks.forEach((imageBlock, i) => {
        imageBlock.data.file.url = imageUrls[i]; // will modify urls in body too
      });

      // Save to db
      await editPost(originalPost.id, title, body);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={style.BlogPostEditorContainer}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          !originalPost ? handleCreate() : handleEdit();
        }}
      >
        <input
          className={style.title}
          defaultValue={titleRef.current}
          type='text'
          placeholder='Title'
          pattern='.*\S+.*'
          title='Must enter at least 1 non-whitespace character'
          ref={titleRef}
          required
        />
        <div id='bodyEditor'></div> {/* Editor.js */}
        <button type='submit'>Save</button>
      </form>
    </div>
  );
}

export default BlogPostEditor;
