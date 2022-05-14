import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from '../styles/Blog.module.scss';

function Blog() {
  let { pageNum } = useParams();
  pageNum = pageNum ? +pageNum : 1;

  const [page, setPage] = useState(pageNum); // YOU NEED TO INIALIZE THIS TO WHATEVER IS IN URL
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);

  const POSTS_PER_PAGE = 10;

  useEffect(() => {
    if (pageNum) {
      setPage(+pageNum);
    } else {
      setPage(1);
    }
  }, [pageNum]);

  useEffect(() => {
    fetchTotalNumPosts();
  });

  useEffect(() => {
    fetchPostsForPage(page);
  }, [page]);

  async function fetchPostsForPage(page) {
    try {
      const response = await fetch(`http://localhost:5000/posts/page/${page}`);
      const posts = await response.json();
      setPosts(posts);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function fetchTotalNumPosts() {
    try {
      const response = await fetch('http://localhost:5000/posts/count');
      const numPosts = await response.json();
      setTotalPosts(numPosts);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <h1>cool blog</h1>
      <div>
        {posts.map((post) => {
          return (
            <div key={post.id}>
              <Post data={post} />
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
  return (
    <div className={styles.post}>
      <h2 className={styles.title}>{data.title}</h2>
      <p>
        Posted by <span className={styles.author}>{data.username}</span> on{' '}
        <span className={styles.date}>{data.created_on}</span>
      </p>
      <p>{data.body}</p>
    </div>
  );
}

export default Blog;
