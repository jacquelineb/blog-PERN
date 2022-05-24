import React from 'react';
import { EditBlogPost, DeleteBlogPost } from './BlogPostTransactions';
import { formatDate } from '../utils/index';
import style from '../styles/BlogPosts.module.scss';

function BlogPosts({ posts, authUser }) {
  return (
    <div className={style.BlogPostsContainer}>
      {posts.map((post) => {
        return (
          <div className={style.postContainer} key={post.id} data-post-id={post.id}>
            <BlogPost post={post} />
            {authUser ? (
              <div className={style.btnsContainer}>
                <EditBlogPost post={post} />
                <DeleteBlogPost postId={post.id} />
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
        {body.split('\n').map((paragraph, i) => {
          return paragraph ? <p key={`${id}-${i}`}>{paragraph}</p> : <br />;
        })}
      </div>
    </div>
  );
}

export default BlogPosts;
