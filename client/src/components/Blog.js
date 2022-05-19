import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from '../styles/Blog.module.scss';
import { CreateBlogPost, EditBlogPost, DeleteBlogPost } from './BlogPostTransactions';
import BlogAdminInfo from './BlogAdminInfo';
import { formatDate } from '../utils/index';

function Blog({ user }) {
  let { pageNum } = useParams();
  pageNum = pageNum ? +pageNum : 1;

  const POSTS_PER_PAGE = 10;
  const [page, setPage] = useState(pageNum);
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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
        const response = await fetch('http://localhost:5000/posts/count');
        const numPosts = await response.json();
        setTotalPosts(numPosts);
      } catch (error) {
        console.error(error);
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
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPostsForPage(page);
  }, [page]);

  return (
    <>
      <BlogAdminInfo />
      <h1>cool blog</h1>
      {isLoading ? null : (
        <>
          {user ? <CreateBlogPost /> : null}
          <div className={styles.postsContainer}>
            {posts.map((post) => {
              return (
                <div className={styles.postContainer} key={post.id} data-post-id={post.id}>
                  <Post data={post} />
                  {user ? (
                    <>
                      <EditBlogPost post={post} />
                      <DeleteBlogPost postId={post.id} />
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>
          <BlogPagination
            currPage={page}
            totalNumPages={Math.ceil(totalPosts / POSTS_PER_PAGE)}
          />
        </>
      )}
    </>
  );
}

function BlogPagination({ currPage, totalNumPages }) {
  return (
    <div>
      {currPage > 1 ? <Link to={`/page/${currPage - 1}`}>newer posts</Link> : null}
      {currPage < totalNumPages ? <Link to={`/page/${currPage + 1}`}>older posts</Link> : null}
      <p>
        Page {currPage} of {totalNumPages}
      </p>
    </div>
  );
}

function Post({ data }) {
  const { id, title, body, username, created_on } = data;
  return (
    <div className={styles.post}>
      <h2 className={styles.title}>{title}</h2>
      <p>
        Posted by <span className={styles.author}>{username}</span> on{' '}
        <span className={styles.date}>{formatDate(created_on)}</span>
      </p>
      {body.split('\n').map((paragraph, i) => {
        return paragraph ? <p key={`${id}-${i}`}>{paragraph}</p> : null;
      })}
    </div>
  );
}

export default Blog;
