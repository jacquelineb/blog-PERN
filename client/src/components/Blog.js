import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from '../styles/Blog.module.scss';

import { CreateBlogPost, EditBlogPost } from './BlogPostForm';

function Blog({ isAuth }) {
  let { pageNum } = useParams();
  pageNum = pageNum ? +pageNum : 1;

  const POSTS_PER_PAGE = 10;
  const [page, setPage] = useState(pageNum);
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    if (pageNum) {
      setPage(+pageNum);
    } else {
      setPage(1);
    }
  }, [pageNum]);

  useEffect(() => {
    async function fetchTotalNumPosts() {
      try {
        console.log('fetching num posts');
        const response = await fetch('http://localhost:5000/posts/count');
        const numPosts = await response.json();
        setTotalPosts(numPosts);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchTotalNumPosts();
  }, []);

  useEffect(() => {
    async function fetchPostsForPage(page) {
      try {
        const response = await fetch(
          `http://localhost:5000/posts?limit=${POSTS_PER_PAGE}&offset=${
            POSTS_PER_PAGE * (page - 1)
          }`
        );
        const posts = await response.json();
        setPosts(posts);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchPostsForPage(page);
  }, [page]);

  return (
    <>
      <h1>cool blog</h1>
      {isAuth ? <CreateBlogPost /> : null}
      <div className={styles.postsContainer}>
        {posts.map((post) => {
          return (
            <div className={styles.postContainer} key={post.id} data-post-id={post.id}>
              <Post data={post} />
              {isAuth ? <EditBlogPost post={post} /> : null}
            </div>
          );
        })}
      </div>

      <div>
        {page > 1 ? (
          <div>
            <Link to={`/page/${page - 1}`}>newer posts</Link>
          </div>
        ) : null}
        {page < Math.ceil(totalPosts / POSTS_PER_PAGE) ? (
          <div>
            <Link to={`/page/${page + 1}`}>older posts</Link>
          </div>
        ) : null}
        <p>
          Page {page} of {Math.ceil(totalPosts / POSTS_PER_PAGE)}
        </p>
      </div>
    </>
  );
}

function Post({ data }) {
  const { id, title, body, username, created_on } = data;

  return (
    <div className={styles.post}>
      <h2 className={styles.title}>{title}</h2>
      <p>
        Posted by <span className={styles.author}>{username}</span> on{' '}
        <span className={styles.date}>{created_on}</span>
      </p>
      {body.split('\n').map((paragraph, i) => {
        return paragraph ? <p key={`${id}-${i}`}>{paragraph}</p> : null;
      })}
    </div>
  );
}

export default Blog;
