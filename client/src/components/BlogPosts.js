import React from 'react';
import formatDate from '../utils/formatDate.js';
import CreateBlogPostButton from './CreateBlogPostButton';
import EditBlogPostButton from './EditBlogPostButton';
import DeleteBlogPostButton from './DeleteBlogPostButton';
import style from '../styles/BlogPosts.module.scss';

function BlogPosts({ posts, authUser }) {
  return (
    <div className={style.BlogPostsContainer}>
      {authUser ? <CreateBlogPostButton /> : null}
      {posts.map((post) => {
        return (
          <div className={style.postContainer} key={post.id} data-post-id={post.id}>
            <BlogPost post={post} />
            {authUser ? (
              <div className={style.btnsContainer}>
                <EditBlogPostButton originalPost={post} />
                <DeleteBlogPostButton post={post} />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function BlogPost({ post }) {
  const { id, title, body, created_on } = post;
  return (
    <div className={style.post}>
      <h2 className={style.title}>{title}</h2>
      <p className={style.postMetaData}>
        Posted on <span className={style.date}>{formatDate(created_on)}</span>
      </p>

      <div className={style.body}>
        {body.map((block) => {
          const html =
            block.type === 'paragraph'
              ? `<p>${block.data.text}</p>`
              : block.type === 'image'
              ? `<img src='${block.data.file.url}' />`
              : null;
          return (
            <div key={`${id}-${block.id}`} dangerouslySetInnerHTML={{ __html: html }}></div>
          );
        })}
      </div>
    </div>
  );
}

export default BlogPosts;
