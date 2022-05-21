import React from 'react';
import styles from '../styles/Blog.module.scss';
import { EditBlogPost, DeleteBlogPost } from './BlogPostTransactions';
import { formatDate } from '../utils/index';
import style from '../styles/BlogPosts.module.scss';

function BlogPosts({ posts, authUser }) {
  console.log(authUser);
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
  const { id, title, body, username, created_on } = post;
  return (
    <div className={style.post}>
      <h2 className={style.title}>{title}</h2>
      <p className={style.postMetaData}>
        Posted by <span className={style.author}>{username}</span> on{' '}
        <span className={styles.date}>{formatDate(created_on)}</span>
      </p>
      <div className={style.body}>
        {body.split('\n').map((paragraph, i) => {
          return paragraph ? <p key={`${id}-${i}`}>{paragraph}</p> : null;
        })}
      </div>
    </div>
  );
}

export default BlogPosts;
